/* Offline support: stale-while-revalidate for the app shell. Bump CACHE to force a clean refresh. */
const CACHE = "workout-planner-v1";
const SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "js/store.js",
  "js/profile.js",
  "manifest.json",
  "404.html",
  "fonts/big-shoulders-display-latin-700-normal.woff2",
  "fonts/big-shoulders-display-latin-800-normal.woff2",
  "fonts/instrument-sans-latin-400-normal.woff2",
  "fonts/instrument-sans-latin-600-normal.woff2",
  "fonts/instrument-sans-latin-700-normal.woff2",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) =>
        Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin)
    return;
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const hit = await c.match(r, { ignoreSearch: true });
      const net = fetch(r)
        .then((res) => {
          if (res.ok) c.put(r, res.clone());
          return res;
        })
        .catch(() => null);
      return (
        hit ||
        (await net) ||
        (r.mode === "navigate" ? c.match("index.html") : Response.error())
      );
    }),
  );
});
