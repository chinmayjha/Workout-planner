/**
 * store.js: state, migration, local-date logging, streaks and savers.
 * Classic script (no modules) so the app still opens straight from index.html.
 */
(function (root) {
  "use strict";

  var KEY = "workout_state_v7";
  var OLD_KEY = "forge_state_v6";
  var MIN_ACTIVE_SECS = 60; // a day counts for the streak at 60s or more
  var SAVER_CAP = 3;
  var SAVER_EVERY = 5; // completed workouts per saver

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  /* Local calendar date as YYYY-MM-DD. Never uses UTC. rollHour shifts the
     day boundary (e.g. 4 means 1 AM still belongs to the previous day). */
  function dateKey(when, rollHour) {
    var d = new Date(when === undefined ? Date.now() : when);
    if (rollHour) d = new Date(d.getTime() - rollHour * 3600000);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  // Whole-day index from a key. Built on Date.UTC so DST can never shift it.
  function dayNum(key) {
    var p = key.split("-");
    return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000;
  }
  function keyFromNum(n) {
    var d = new Date(n * 86400000);
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
  }

  function defaults() {
    return {
      v: 7,
      name: "",
      plan: [], // { id, time, mode: "time" | "reps", reps? }
      rounds: 1,
      rest: 30,
      prep: 5,
      vibrate: true,
      audio: { announce: true, coach: true, chimes: true },
      rollHour: 0,
      base: { workouts: 0, time: 0, calories: 0 }, // totals from before day-logging
      log: {}, // "YYYY-MM-DD": { sessions, secs, cals, completed }
      history: [], // newest first, capped at 60
      streak: { best: 0, savers: 0, progress: 0, completed: 0, frozen: [] },
    };
  }

  function num(v, fallback) {
    return typeof v === "number" && isFinite(v) && v >= 0 ? v : fallback;
  }

  /* Accepts v6 data, v7 data, or junk, and always returns a valid v7 state. */
  function migrate(o) {
    var s = defaults();
    if (!o || typeof o !== "object") return s;
    if (typeof o.name === "string") s.name = o.name.slice(0, 20);
    s.rounds = Math.min(20, Math.max(1, num(o.rounds, s.rounds)));
    s.rest = Math.min(180, num(o.rest, s.rest));
    s.prep = Math.min(30, num(o.prep, s.prep));
    if (typeof o.vibrate === "boolean") s.vibrate = o.vibrate;
    if (Array.isArray(o.plan)) {
      s.plan = o.plan
        .filter(function (p) { return p && typeof p.id === "string"; })
        .slice(0, 50)
        .map(function (p) {
          var item = {
            id: p.id,
            time: Math.min(300, Math.max(5, num(p.time, 30))),
            mode: p.mode === "reps" ? "reps" : "time",
          };
          if (item.mode === "reps" && num(p.reps, 0)) item.reps = Math.min(200, p.reps);
          return item;
        });
    }
    if (o.v === 7) {
      if (o.audio) {
        ["announce", "coach", "chimes"].forEach(function (k) {
          if (typeof o.audio[k] === "boolean") s.audio[k] = o.audio[k];
        });
      }
      s.rollHour = Math.min(8, num(o.rollHour, 0));
      if (o.base) {
        s.base.workouts = num(o.base.workouts, 0);
        s.base.time = num(o.base.time, 0);
        s.base.calories = num(o.base.calories, 0);
      }
      if (o.log && typeof o.log === "object") {
        Object.keys(o.log).forEach(function (k) {
          var e = o.log[k];
          if (/^\d{4}-\d{2}-\d{2}$/.test(k) && e) {
            s.log[k] = {
              sessions: num(e.sessions, 0),
              secs: num(e.secs, 0),
              cals: num(e.cals, 0),
              completed: num(e.completed, 0),
            };
          }
        });
      }
      if (Array.isArray(o.history)) s.history = o.history.slice(0, 60);
      if (o.streak) {
        var t = o.streak;
        s.streak.best = num(t.best, 0);
        s.streak.savers = Math.min(SAVER_CAP, num(t.savers, 0));
        s.streak.progress = Math.min(SAVER_EVERY - 1, num(t.progress, 0));
        s.streak.completed = num(t.completed, 0);
        if (Array.isArray(t.frozen)) {
          s.streak.frozen = t.frozen.filter(function (k) { return /^\d{4}-\d{2}-\d{2}$/.test(k); });
        }
      }
    } else {
      // v6: lifetime totals become the baseline; "sound" splits into three toggles.
      var st = o.stats || {};
      s.base.workouts = num(st.workouts, 0);
      s.base.time = num(st.time, 0) || num(st.minutes, 0) * 60;
      s.base.calories = num(st.calories, 0);
      if (o.sound === false) s.audio = { announce: false, coach: false, chimes: false };
    }
    return s;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return migrate(JSON.parse(raw));
      var old = localStorage.getItem(OLD_KEY);
      if (old) {
        var s = migrate(JSON.parse(old));
        localStorage.setItem(KEY, JSON.stringify(s));
        return s;
      }
    } catch (e) {}
    return defaults();
  }
  function save(s) {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
      return true;
    } catch (e) {
      return false;
    }
  }
  function clearAll() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(OLD_KEY);
    } catch (e) {}
    return defaults();
  }
  function exportJSON(s) {
    return JSON.stringify(s, null, 2);
  }
  function importJSON(text) {
    var o = JSON.parse(text); // throws on bad input; the caller shows the error
    if (!o || typeof o !== "object" || Array.isArray(o)) throw new Error("Not a backup file");
    return migrate(o);
  }

  /* Record one finished or partial session. r: { start, secs, cals, complete,
     exDone, exTotal, rounds, rpe }. Returns the saver earned (true/false). */
  function logSession(s, r) {
    var k = dateKey(r.start, s.rollHour); // credited to the day it started
    var day = s.log[k] || (s.log[k] = { sessions: 0, secs: 0, cals: 0, completed: 0 });
    day.sessions++;
    day.secs += r.secs;
    day.cals += r.cals;
    if (r.complete) day.completed++;
    s.history.unshift({
      t: r.start, d: k, secs: r.secs, cals: r.cals, done: !!r.complete,
      ex: r.exDone, of: r.exTotal, rounds: r.rounds, rpe: r.rpe || null,
    });
    s.history.length = Math.min(s.history.length, 60);
    var earned = false;
    if (r.complete) {
      s.streak.completed++;
      s.streak.progress++;
      if (s.streak.progress >= SAVER_EVERY) {
        s.streak.progress = 0;
        if (s.streak.savers < SAVER_CAP) {
          s.streak.savers++;
          earned = true;
        }
      }
    }
    return earned;
  }

  /* Run on app open and after each session. If you missed N days and hold at
     least N savers, spend N and keep the streak. If you hold fewer, the streak
     is already lost, so nothing is spent. Returns { current, best, used }. */
  function settle(s, today) {
    today = today || dateKey(Date.now(), s.rollHour);
    var t = dayNum(today);
    var active = {};
    Object.keys(s.log).forEach(function (k) {
      if (s.log[k].secs >= MIN_ACTIVE_SECS) active[dayNum(k)] = true;
    });
    var frozen = {};
    s.streak.frozen.forEach(function (k) { frozen[dayNum(k)] = true; });
    var used = [];

    var last = -Infinity;
    Object.keys(active).concat(Object.keys(frozen)).forEach(function (n) {
      if (+n > last && +n <= t) last = +n;
    });
    var missed = last === -Infinity ? 0 : t - 1 - last;
    if (missed > 0 && missed <= s.streak.savers) {
      for (var n = last + 1; n <= t - 1; n++) {
        frozen[n] = true;
        used.push(keyFromNum(n));
      }
      s.streak.savers -= missed;
      s.streak.frozen = s.streak.frozen.concat(used).slice(-120);
    }

    var cur = 0;
    var n2 = active[t] ? t : t - 1; // today isn't missed until it ends
    while (active[n2] || frozen[n2]) {
      if (active[n2]) cur++;
      n2--;
    }
    if (cur > s.streak.best) s.streak.best = cur;
    return { current: cur, best: s.streak.best, used: used };
  }

  var api = {
    KEY: KEY, dateKey: dateKey, dayNum: dayNum, keyFromNum: keyFromNum, defaults: defaults, migrate: migrate,
    load: load, save: save, clearAll: clearAll, exportJSON: exportJSON,
    importJSON: importJSON, logSession: logSession, settle: settle,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Store = api;
})(typeof window !== "undefined" ? window : this);