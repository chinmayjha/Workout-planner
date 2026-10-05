/** profile.js: Profile tab (streak, savers, 30-day heatmap, backup, wipe). */
(function () {
  "use strict";
  var S = window.Store;
  if (!S) return;
  var st = S.load();
  var APP_KEY = "forge_state_v6";
  function $(id) { return document.getElementById(id); }
  var grid = $("hmGrid"), tip = $("hmTip"), wrap = $("hmWrap");
  var SHIELD = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/></svg>';

  function toast(msg) {
    var t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 3200);
    setTimeout(function () { t.remove(); }, 3700);
  }
  function pretty(k) {
    var p = k.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }
  function mins(s) { return s < 60 ? s + "s" : Math.round(s / 60) + " min"; }

  function renderHeat() {
    var t = S.dayNum(S.dateKey(Date.now(), st.rollHour));
    var frozen = {};
    st.streak.frozen.forEach(function (k) { frozen[k] = 1; });
    var lead = (new Date((t - 29) * 86400000).getUTCDay() + 6) % 7; // Monday first
    var html = "";
    for (var i = 0; i < lead; i++) html += '<span class="hm-cell pad"></span>';
    for (var n = t - 29; n <= t; n++) {
      var k = S.keyFromNum(n), e = st.log[k], secs = e ? e.secs : 0;
      var lvl = secs >= 1200 ? 3 : secs >= 600 ? 2 : secs >= 60 ? 1 : 0;
      var fz = !lvl && frozen[k];
      var label = pretty(k) + ": " + (lvl ? mins(secs) + ", " + Math.round(e.cals) + " kcal" : fz ? "streak saver used" : "no workout");
      html += '<button type="button" class="hm-cell l' + lvl + (fz ? " fz" : "") + (n === t ? " today" : "") +
        '" aria-label="' + label.replace(/"/g, "&quot;") + '"></button>';
    }
    grid.innerHTML = html;
  }

  function renderStreak() {
    var r = S.settle(st);
    if (r.used.length) toast("Streak saver used for " + r.used.map(pretty).join(", "));
    S.save(st);
    $("stCur").textContent = r.current;
    $("stBest").textContent = st.streak.best;
    var sv = st.streak.savers, h = "";
    for (var i = 0; i < 3; i++) h += '<span class="' + (i < sv ? "on" : "") + '">' + SHIELD + "</span>";
    $("stSavers").innerHTML = h;
    $("stSavers").setAttribute("aria-label", sv + " of 3 streak savers");
    $("stNext").textContent = sv >= 3 ? "Streak savers full" : st.streak.progress + " of 5 completed workouts to your next saver";
  }

  function render() {
    var nm = ($("greetingName").textContent || "Athlete").trim();
    $("pfName").textContent = nm;
    $("pfAvatar").textContent = nm.charAt(0).toUpperCase();
    renderStreak();
    renderHeat();
  }

  /* Tooltip: hover for mouse, tap for touch, focus for keyboard */
  function hideTip() { tip.hidden = true; }
  function showTip(el) {
    if (!el || !el.classList.contains("hm-cell") || el.classList.contains("pad")) return hideTip();
    tip.textContent = el.getAttribute("aria-label");
    tip.hidden = false;
    var b = el.getBoundingClientRect(), w = wrap.getBoundingClientRect(), half = tip.offsetWidth / 2;
    tip.style.left = Math.min(Math.max(b.left - w.left + b.width / 2, half), w.width - half) + "px";
    tip.style.top = b.top - w.top - 6 + "px";
  }
  grid.addEventListener("pointerover", function (e) { if (e.pointerType === "mouse") showTip(e.target); });
  grid.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hideTip(); });
  grid.addEventListener("focusin", function (e) { showTip(e.target); });
  grid.addEventListener("focusout", hideTip);
  grid.addEventListener("click", function (e) { showTip(e.target); });
  document.addEventListener("click", function (e) { if (!grid.contains(e.target)) hideTip(); });

  /* Backup */
  $("btnExport").addEventListener("click", function () {
    var app = null;
    try { app = JSON.parse(localStorage.getItem(APP_KEY)); } catch (e) {}
    var blob = new Blob([JSON.stringify({ app: app, activity: st }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "workout-backup-" + S.dateKey() + ".json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  $("btnImport").addEventListener("click", function () { $("importFile").click(); });
  $("importFile").addEventListener("change", function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var o = JSON.parse(rd.result);
        if (!o || typeof o !== "object") throw new Error("bad");
        var a = o.app && typeof o.app === "object" ? o.app : {};
        var m = S.migrate(a);
        var app = {
          name: m.name,
          plan: m.plan.map(function (p) { return { id: p.id, time: p.time }; }),
          rounds: m.rounds, rest: m.rest, prep: m.prep,
          sound: a.sound !== false, vibrate: m.vibrate,
          stats: { workouts: m.base.workouts, time: m.base.time, calories: m.base.calories },
        };
        var act = S.migrate(o.activity);
        localStorage.setItem(APP_KEY, JSON.stringify(app));
        S.save(act);
        location.reload();
      } catch (err) {
        toast("That file isn't a valid backup");
      }
    };
    rd.readAsText(f);
    e.target.value = "";
  });

  /* Danger zone: hold to confirm */
  var wipe = $("btnWipe"), wipeTimer;
  function wipeStart() {
    wipe.classList.add("holding");
    wipeTimer = setTimeout(function () { S.clearAll(); location.reload(); }, 1500);
  }
  function wipeStop() { wipe.classList.remove("holding"); clearTimeout(wipeTimer); }
  wipe.addEventListener("pointerdown", wipeStart);
  ["pointerup", "pointerleave", "pointercancel", "blur", "keyup"].forEach(function (ev) { wipe.addEventListener(ev, wipeStop); });
  wipe.addEventListener("keydown", function (e) {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); wipeStart(); }
  });
  wipe.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  $("pfEdit").addEventListener("click", function () { $("btnEditName").click(); });
  document.querySelector('[data-tab="profile"]').addEventListener("click", render);

  window.Profile = {
    record: function (r) {
      var earned = S.logSession(st, r);
      S.settle(st);
      S.save(st);
      render();
      if (earned) toast("You earned a Streak Saver");
    },
    refresh: render,
  };
  render();
})();