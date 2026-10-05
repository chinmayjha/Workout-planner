/**
 * Workout Planner Core Logic (V3 Master)
 * Built by Chinmay Jha (chinmayjha.tech)
 */
(function () {
  "use strict";

  const SVG_VOL_ON =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  const SVG_VOL_OFF =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="1" y2="23"></line><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  const SVG_REST =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>';

  const EX_ICONS = {
    pushup:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-3 4"/></svg>',
    diamondpushup:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-2 4M14 15h2"/></svg>',
    pike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="18" r="2.5"/><path d="M5 22l7-10 7 10M12 8v4"/></svg>',
    tricepdip:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-4 4M12 13l4 4M8 17h8M7 12h3"/></svg>',
    plankshoulder:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4M13 15c-1-3 1-5 4-5"/></svg>',
    squat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-3 4M12 13l4 5M8 22h2M14 22h2M12 8H7"/></svg>',
    lunge:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 18h-3M12 8h-4"/></svg>',
    bulgariansplit:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 14v4M12 8h-4"/></svg>',
    gluteb:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="18" r="2.5"/><path d="M8 18l5-6 6 6M13 12v6"/></svg>',
    calfraise:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="3" r="2.5"/><path d="M12 6v8l-3 6M12 14l3 6M8 20h2M14 20h2M12 6H7"/></svg>',
    wallsit:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="7" r="2.5"/><path d="M6 10v6h6v6M6 10h5M2 2v20"/></svg>',
    plank:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4"/></svg>',
    hollowbody:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20" cy="15" r="2.5"/><path d="M3 12c4 4 10 4 14 0M10 15l-4-6"/></svg>',
    crunch:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="12" r="2.5"/><path d="M4 18l6-1 4-3 1-3M14 14l-3 4"/></svg>',
    russiantwist:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="7" r="2.5"/><path d="M4 18l8-4 8 4M12 14l-3-4M12 14l3-4"/></svg>',
    legraise:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20" cy="18" r="2.5"/><path d="M4 10l8 8 5-1M12 18V6"/></svg>',
    mountain:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="8" r="2.5"/><path d="M3 19l5-3 4-2 4-3M12 14l-4 5"/></svg>',
    jj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-5 6M12 13l5 6M12 8L6 4M12 8l6-4"/></svg>',
    skaters:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="16" cy="6" r="2.5"/><path d="M14 9l-4 4 2 5M10 13l-4 2M14 9l4 2M6 18c2-2 4-2 6 0"/></svg>',
    highknees:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v6M12 13l-4 4v4M12 13l4-4M12 7H8M12 7h4"/></svg>',
    burpee:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v5l-4 4M12 12l4 4M8 20h8M12 7L8 4M12 7l4-3"/></svg>',
    jumpsquat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v7l-4 5M12 14l4 5M12 7H7M12 7h5"/></svg>',
    sprawls:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="18" r="2.5"/><path d="M4 6l4 8 4 1M12 15l4-8"/></svg>',
    bearcrawl:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20" cy="14" r="2.5"/><path d="M4 18l4-4 6-2 4 4M14 12l-2 6M10 14l-2 4"/></svg>',
    inchworm:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="18" r="2.5"/><path d="M4 18l5-8 5 5 4-2"/></svg>',
  };
  function getIcon(ex) {
    return (
      EX_ICONS[ex.id] ||
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/></svg>'
    );
  }

  const CAT_COLOR = {
    upper: "#8B7CFF",
    lower: "#00E5A0",
    core: "#FF6B4A",
    cardio: "#FFC55C",
    full: "#5CC8FF",
  };
  const CATS = [
    ["all", "All"],
    ["upper", "Upper"],
    ["lower", "Lower"],
    ["core", "Core"],
    ["cardio", "Cardio"],
    ["full", "Full Body"],
  ];

  const EXERCISES = [
    {
      id: "pushup",
      name: "Push-Ups",
      cat: "upper",
      type: "dynamic",
      cue: "Keep a straight line from head to heels. Lower until your chest is just above the floor.",
      time: 40,
      reps: 15,
      tts: "Push ups",
    },
    {
      id: "diamondpushup",
      name: "Diamond Push-Ups",
      cat: "upper",
      type: "dynamic",
      cue: "Hands form a diamond under your chest. Keep elbows tight to target your triceps.",
      time: 35,
      reps: 12,
      tts: "Diamond Push ups",
    },
    {
      id: "pike",
      name: "Pike Push-Ups",
      cat: "upper",
      type: "dynamic",
      cue: "Keep your hips high in a V-shape. Lower the top of your head towards the floor.",
      time: 35,
      reps: 10,
      tts: "Pike Push ups",
    },
    {
      id: "tricepdip",
      name: "Tricep Dips",
      cat: "upper",
      type: "dynamic",
      cue: "Keep your back close to the bench. Lower until your elbows reach ninety degrees.",
      time: 35,
      reps: 15,
      tts: "Tricep Dips",
    },
    {
      id: "plankshoulder",
      name: "Plank Shoulder Taps",
      cat: "upper",
      type: "dynamic",
      cue: "Keep your hips still. Tap your opposite shoulder with control.",
      time: 30,
      reps: 20,
      tts: "Plank Shoulder Taps",
    },
    {
      id: "squat",
      name: "Bodyweight Squats",
      cat: "lower",
      type: "dynamic",
      cue: "Keep your chest up and drive through your heels. Squat as if sitting in a chair.",
      time: 45,
      reps: 20,
      tts: "Bodyweight Squats",
    },
    {
      id: "lunge",
      name: "Alternating Lunges",
      cat: "lower",
      type: "dynamic",
      cue: "Step forward and drop your back knee. Keep your front knee directly over your ankle.",
      time: 40,
      reps: 20,
      tts: "Alternating Lunges",
    },
    {
      id: "bulgariansplit",
      name: "Bulgarian Split Squats",
      cat: "lower",
      type: "dynamic",
      cue: "Elevate your back foot. Drop your hips straight down with control.",
      time: 40,
      reps: 12,
      tts: "Bulgarian Split Squats",
    },
    {
      id: "gluteb",
      name: "Glute Bridges",
      cat: "lower",
      type: "dynamic",
      cue: "Drive through your heels. Squeeze your glutes hard at the top of the movement.",
      time: 40,
      reps: 15,
      tts: "Glute Bridges",
    },
    {
      id: "calfraise",
      name: "Calf Raises",
      cat: "lower",
      type: "dynamic",
      cue: "Rise up onto your toes. Lower down slowly and controlled.",
      time: 30,
      reps: 25,
      tts: "Calf Raises",
    },
    {
      id: "wallsit",
      name: "Wall Sit",
      cat: "lower",
      type: "hold",
      cue: "Press your back flat against the wall. Keep thighs parallel to the floor.",
      time: 40,
      reps: 0,
      tts: "Wall Sit",
    },
    {
      id: "plank",
      name: "Forearm Plank",
      cat: "core",
      type: "hold",
      cue: "Keep your belly button pulled in tight. Maintain a straight line.",
      time: 40,
      reps: 0,
      tts: "Forearm Plank",
    },
    {
      id: "hollowbody",
      name: "Hollow Body Hold",
      cat: "core",
      type: "hold",
      cue: "Keep your lower back completely glued to the floor. Extend arms and legs out.",
      time: 45,
      reps: 0,
      tts: "Hollow Body Hold",
    },
    {
      id: "crunch",
      name: "Crunches",
      cat: "core",
      type: "dynamic",
      cue: "Exhale as you curl your shoulders off the floor. Keep neck relaxed.",
      time: 35,
      reps: 20,
      tts: "Crunches",
    },
    {
      id: "russiantwist",
      name: "Russian Twists",
      cat: "core",
      type: "dynamic",
      cue: "Lean back slightly. Rotate entirely from your torso, not just arms.",
      time: 35,
      reps: 20,
      tts: "Russian Twists",
    },
    {
      id: "legraise",
      name: "Leg Raises",
      cat: "core",
      type: "dynamic",
      cue: "Keep your legs straight and lower back flat. Only lower legs as far as you control.",
      time: 35,
      reps: 15,
      tts: "Leg Raises",
    },
    {
      id: "mountain",
      name: "Mountain Climbers",
      cat: "cardio",
      type: "dynamic",
      cue: "Drive knees to your chest quickly. Keep hips low and core engaged.",
      time: 30,
      reps: 30,
      tts: "Mountain Climbers",
    },
    {
      id: "jj",
      name: "Jumping Jacks",
      cat: "cardio",
      type: "dynamic",
      cue: "Keep a steady, bouncing pace. Move arms through full range of motion.",
      time: 35,
      reps: 40,
      tts: "Jumping Jacks",
    },
    {
      id: "skaters",
      name: "Ice Skaters",
      cat: "cardio",
      type: "dynamic",
      cue: "Leap side to side dynamically. Try to balance on one leg softly.",
      time: 30,
      reps: 20,
      tts: "Ice Skaters",
    },
    {
      id: "highknees",
      name: "High Knees",
      cat: "cardio",
      type: "dynamic",
      cue: "Pump arms to drive momentum. Bring knees up to waist height.",
      time: 30,
      reps: 30,
      tts: "High Knees",
    },
    {
      id: "burpee",
      name: "Burpees",
      cat: "cardio",
      type: "dynamic",
      cue: "Drop down, kick back, push up, and explode into a jump.",
      time: 30,
      reps: 10,
      tts: "Burpees",
    },
    {
      id: "jumpsquat",
      name: "Jump Squats",
      cat: "full",
      type: "dynamic",
      cue: "Explode up from the bottom of the squat. Land softly to protect knees.",
      time: 30,
      reps: 15,
      tts: "Jump Squats",
    },
    {
      id: "sprawls",
      name: "Sprawls",
      cat: "full",
      type: "dynamic",
      cue: "Drop hips heavily to the floor. Explode back up to your feet instantly.",
      time: 30,
      reps: 12,
      tts: "Sprawls",
    },
    {
      id: "bearcrawl",
      name: "Bear Crawl",
      cat: "full",
      type: "dynamic",
      cue: "Keep knees hovering just an inch off the floor. Keep back flat.",
      time: 30,
      reps: 20,
      tts: "Bear Crawl",
    },
    {
      id: "inchworm",
      name: "Inchworms",
      cat: "full",
      type: "dynamic",
      cue: "Keep legs straight as you walk hands out. Walk back using small steps.",
      time: 35,
      reps: 8,
      tts: "Inchworms",
    },
  ];

  /* ---------- Global State ---------- */
  let state = {
    name: "",
    plan: [],
    rounds: 1,
    rest: 30,
    prep: 5,
    audioAnnounce: true,
    audioForm: true,
    audioPacing: true,
    vibrate: true,
    stats: { workouts: 0, time: 0, calories: 0 },
    history: {}, // Format: 'YYYY-MM-DD': { workouts, time, cals }
    streak: { current: 0, max: 0, lastDate: null, savers: 0 },
  };
  let searchQuery = "";
  let activeCat = "all";
  let wo = {
    round: 1,
    idx: 0,
    phase: "idle",
    timeLeft: 0,
    phaseTotal: 0,
    elapsedPhase: 0,
    paused: false,
    elapsed: 0,
    timer: null,
    tick: null,
    isMuted: false,
    rpe: "Light",
  };
  let wakeLock = null;

  const LS_KEY = "forge_state_v8";
  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (e) {}
  }
  function saveState() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  /* ---------- Timezone Saftey Fix ---------- */
  function getLocalDate(dateObj = new Date()) {
    const tzOffset = dateObj.getTimezoneOffset() * 60000;
    return new Date(dateObj.getTime() - tzOffset).toISOString().split("T")[0];
  }

  /* ---------- Utilities ---------- */
  function triggerShake(el) {
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 300);
  }
  function setThemeColor(hex) {
    const meta = document.getElementById("themeColorMeta");
    if (meta) meta.setAttribute("content", hex);
  }
  async function requestWakeLock() {
    if ("wakeLock" in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch (err) {}
    }
  }
  function releaseWakeLock() {
    if (wakeLock !== null) {
      wakeLock.release().then(() => (wakeLock = null));
    }
  }
  document.addEventListener("visibilitychange", async () => {
    if (wakeLock !== null && document.visibilityState === "visible")
      requestWakeLock();
  });

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m + ":" + String(s).padStart(2, "0");
  }
  function formatLifetimeTime(totalSeconds) {
    if (!totalSeconds) return "0s";
    if (totalSeconds < 60) return totalSeconds + "s";
    const h = Math.floor(totalSeconds / 3600),
      m = Math.floor((totalSeconds % 3600) / 60),
      s = totalSeconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s}s`;
  }

  /* ---------- Initialization & Layout ---------- */
  function updateGreeting() {
    const nameEl = document.getElementById("greetingName");
    const timeEl = document.getElementById("greetingTime");
    if (nameEl && timeEl) {
      nameEl.textContent = state.name || "Athlete";
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) timeEl.textContent = "morning";
      else if (hour >= 12 && hour < 17) timeEl.textContent = "afternoon";
      else timeEl.textContent = "evening";
    }
  }

  function renderProfile() {
    document.getElementById("profileName").textContent =
      state.name || "Athlete";

    // Rank System
    const w = state.stats.workouts;
    let rank = "Novice";
    if (w >= 50) rank = "Elite";
    else if (w >= 25) rank = "Iron Athlete";
    else if (w >= 10) rank = "Intermediate";
    document.getElementById("profileRank").textContent = rank;

    document.getElementById("ltWorkoutsProf").textContent =
      state.stats.workouts;
    document.getElementById("ltTimeProf").textContent = formatLifetimeTime(
      state.stats.time,
    );
    document.getElementById("ltCaloriesProf").textContent =
      state.stats.calories;

    document.getElementById("streakCurrent").textContent = state.streak.current;
    document.getElementById("streakMax").textContent = state.streak.max;
    document.getElementById("streakSavers").textContent =
      state.streak.savers + "/3";

    // 30-Day Heatmap
    const grid = document.getElementById("heatmapGrid");
    grid.innerHTML = "";
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = getLocalDate(d); // Safely get local date string
      const data = state.history[ds];
      const lvl = data ? (data.workouts > 1 ? 2 : 1) : 0;

      const ttText = data
        ? `${data.workouts} workout${data.workouts > 1 ? "s" : ""}<br>${formatTime(data.time)}`
        : "No Activity";
      grid.innerHTML += `<div class="hm-cell" data-lvl="${lvl}">
        <div class="hm-tooltip">${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}<br>${ttText}</div>
      </div>`;
    }
  }

  function updateLifetimeStats() {
    document.getElementById("ltWorkouts").textContent = state.stats.workouts;
    document.getElementById("ltTime").textContent = formatLifetimeTime(
      state.stats.time,
    );
    document.getElementById("ltCalories").textContent = state.stats.calories;
    renderProfile();
  }

  function showTab(name) {
    if (name !== "workout" && wo.phase !== "idle" && wo.phase !== "complete") {
      const wasPaused = wo.paused;
      wo.paused = true;
      if (
        !confirm(
          "You have a workout in progress. Are you sure you want to end it and return?",
        )
      ) {
        wo.paused = wasPaused;
        return;
      }
      quitWorkoutLogic();
    }
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.toggle("active", p.id === "page-" + name));
    if (name === "profile") renderProfile();
  }
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));

  /* ---------- Modals & Click-Away UX ---------- */
  function openModal(id) {
    document.getElementById(id).style.display = "flex";
    setTimeout(() => {
      document.getElementById(id).classList.add("active");
      document.body.classList.add("no-scroll");
    }, 10);
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove("active");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      document.getElementById(id).style.display = "none";
    }, 300);
  }

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("mousedown", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document
    .getElementById("btnOpenSettings")
    .addEventListener("click", () => openModal("settingsModal"));
  document.querySelectorAll(".modal-close").forEach((btn) =>
    btn.addEventListener("click", function () {
      closeModal(this.closest(".modal-overlay").id);
    }),
  );

  document.getElementById("btnEditName").addEventListener("click", () => {
    closeModal("settingsModal");
    document.getElementById("nameInput").value = state.name;
    openModal("nameModal");
  });
  document.getElementById("btnSaveName").addEventListener("click", () => {
    const v = document.getElementById("nameInput").value.trim();
    if (!v) {
      document.getElementById("nameInput").style.borderColor = "var(--warn)";
      return;
    }
    document.getElementById("nameInput").style.borderColor = "var(--line)";
    state.name = v;
    saveState();
    updateGreeting();
    renderProfile();
    closeModal("nameModal");
  });

  document.getElementById("btnClearData").addEventListener("click", () => {
    if (
      confirm(
        "DANGER: This will permanently delete your streak, history, and custom plans. Are you absolutely sure?",
      )
    ) {
      localStorage.removeItem(LS_KEY);
      window.location.reload();
    }
  });

  /* ---------- Video Glossary ---------- */
  document.getElementById("btnOpenResources").addEventListener("click", () => {
    const list = document.getElementById("glossaryList");
    list.innerHTML = EXERCISES.map(
      (e) => `
      <a href="https://www.youtube.com/results?search_query=how+to+do+perfect+${e.name.replace(/ /g, "+")}" target="_blank" rel="noopener" class="glossary-item hover-elevate">
        <div><strong>${e.name}</strong><div style="font-size:0.75rem; color:var(--muted)">${e.type === "dynamic" ? "Time & Reps" : "Time Based"}</div></div>
        <div style="color:var(--accent)">Watch ↗</div>
      </a>`,
    ).join("");
    openModal("resourcesModal");
  });

  /* ---------- Plan & Library ---------- */
  function renderCats() {
    const wrap = document.getElementById("catChips");
    wrap.innerHTML = CATS.map(
      ([id, label]) =>
        `<button class="chip${id === activeCat ? " active" : ""}" data-cat="${id}">${label}</button>`,
    ).join("");
    wrap.querySelectorAll(".chip").forEach((c) =>
      c.addEventListener("click", () => {
        activeCat = c.dataset.cat;
        renderCats();
        renderLibrary();
      }),
    );
  }

  function renderLibrary() {
    const list = EXERCISES.filter(
      (e) =>
        (activeCat === "all" || e.cat === activeCat) &&
        (e.name.toLowerCase().includes(searchQuery) ||
          e.cue.toLowerCase().includes(searchQuery)),
    );
    document.getElementById("libraryList").innerHTML =
      list
        .map((e) => {
          const inPlan = state.plan.some((p) => p.id === e.id);
          return `<div class="ex-card ${inPlan ? "in-plan" : ""}">
        <div class="ex-icon" style="background:${CAT_COLOR[e.cat]}22;color:${CAT_COLOR[e.cat]}">${getIcon(e)}</div>
        <div class="ex-info"><h4>${e.name}</h4><p>${e.cue}</p></div>
        <button class="ex-add hover-elevate ${inPlan ? " added" : ""}" data-add="${e.id}">${inPlan ? "✓" : "+"}</button>
      </div>`;
        })
        .join("") || '<div class="empty-hint">No exercises found.</div>';

    document
      .getElementById("libraryList")
      .querySelectorAll("[data-add]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.add,
            idx = state.plan.findIndex((p) => p.id === id);
          if (idx > -1) state.plan.splice(idx, 1);
          else {
            if (state.plan.length >= 50) return triggerShake(btn.parentElement);
            const ex = EXERCISES.find((x) => x.id === id);
            state.plan.push({ id, mode: "time", time: ex.time, reps: ex.reps });
          }
          saveState();
          renderLibrary();
          renderPlan();
          renderWorkoutIdle();
        });
      });
  }
  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderLibrary();
  });

  let dragSourceIdx = null;
  document.getElementById("btnClearPlan").addEventListener("click", () => {
    if (confirm("Clear current plan?")) {
      state.plan = [];
      saveState();
      renderPlan();
      renderLibrary();
      renderWorkoutIdle();
    }
  });
  document.getElementById("btnGoToWorkout").addEventListener("click", () => {
    showTab("workout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function renderPlan() {
    document.getElementById("roundsVal").textContent = state.rounds;
    const list = document.getElementById("planList");
    document.getElementById("btnClearPlan").style.display =
      state.plan.length > 0 ? "inline-block" : "none";
    document.getElementById("planActions").style.display =
      state.plan.length > 0 ? "block" : "none";

    if (!state.plan.length) {
      list.innerHTML =
        '<div class="empty-hint">Add exercises above to build your workout.</div>';
      return;
    }

    list.innerHTML = state.plan
      .map((p, i) => {
        const ex = EXERCISES.find((x) => x.id === p.id);
        const valStr = p.mode === "time" ? p.time + "s" : p.reps + "x";
        const toggleHtml =
          ex.type === "dynamic"
            ? `
        <div class="plan-mode-toggle">
          <button class="${p.mode === "time" ? "active" : ""}" data-tg="time" data-idx="${i}">Time</button>
          <button class="${p.mode === "reps" ? "active" : ""}" data-tg="reps" data-idx="${i}">Reps</button>
        </div>`
            : `<div class="plan-mode-toggle"><button class="active locked">Time Only</button></div>`;

        return `<div class="plan-card pop-in" draggable="true" data-idx="${i}" style="animation-delay: ${i * 0.03}s">
        <div class="core-row">
          <div class="ex-icon" style="width:38px;height:38px;flex:0 0 38px;background:${CAT_COLOR[ex.cat]}22;color:${CAT_COLOR[ex.cat]}">${getIcon(ex)}</div>
          <div class="ex-info"><h4 style="font-size:.88rem">${ex.name}</h4></div>
          <div class="plan-time-stepper">
            <button data-mod="-1" data-idx="${i}">−</button><span>${valStr}</span><button data-mod="1" data-idx="${i}">+</button>
          </div>
          <button class="plan-remove" data-remove="${i}">✕</button>
          <div class="drag-handle"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg></div>
        </div>
        ${toggleHtml}
      </div>`;
      })
      .join("");

    list.querySelectorAll("[data-mod]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const i = +btn.dataset.idx,
          dir = +btn.dataset.mod;
        const p = state.plan[i];
        if (p.mode === "time") {
          const next = p.time + dir * 5;
          if (next < 5 || next > 300) return triggerShake(btn.parentElement);
          p.time = next;
        } else {
          const next = p.reps + dir;
          if (next < 1 || next > 100) return triggerShake(btn.parentElement);
          p.reps = next;
        }
        saveState();
        renderPlan();
        renderWorkoutIdle();
      }),
    );

    list.querySelectorAll("[data-tg]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.plan[+btn.dataset.idx].mode = btn.dataset.tg;
        saveState();
        renderPlan();
        renderWorkoutIdle();
      }),
    );

    list.querySelectorAll("[data-remove]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.plan.splice(+btn.dataset.remove, 1);
        saveState();
        renderPlan();
        renderLibrary();
        renderWorkoutIdle();
      }),
    );

    const cards = list.querySelectorAll(".plan-card");
    cards.forEach((card) => {
      card.addEventListener("dragstart", function (e) {
        dragSourceIdx = +this.dataset.idx;
        this.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      card.addEventListener("dragover", function (e) {
        e.preventDefault();
        return false;
      });
      card.addEventListener("dragenter", function () {
        if (+this.dataset.idx !== dragSourceIdx)
          this.classList.add("drag-over");
      });
      card.addEventListener("dragleave", function () {
        this.classList.remove("drag-over");
      });
      card.addEventListener("drop", function (e) {
        e.stopPropagation();
        const trg = +this.dataset.idx;
        if (dragSourceIdx !== null && dragSourceIdx !== trg) {
          const item = state.plan.splice(dragSourceIdx, 1)[0];
          state.plan.splice(trg, 0, item);
          saveState();
          renderPlan();
        }
        return false;
      });
      card.addEventListener("dragend", function () {
        this.classList.remove("dragging");
        cards.forEach((c) => c.classList.remove("drag-over"));
        dragSourceIdx = null;
      });
    });
  }

  /* ---------- Settings & Audio Control ---------- */
  function renderSettings() {
    document.getElementById("restVal").textContent = state.rest + "s";
    document.getElementById("prepVal").textContent = state.prep + "s";
    document
      .getElementById("toggleAnnounce")
      .classList.toggle("on", state.audioAnnounce);
    document
      .getElementById("toggleForm")
      .classList.toggle("on", state.audioForm);
    document
      .getElementById("togglePacing")
      .classList.toggle("on", state.audioPacing);
    document
      .getElementById("toggleVibrate")
      .classList.toggle("on", state.vibrate);
  }

  document.querySelectorAll("[data-step]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const key = btn.dataset.step,
        d = +btn.dataset.d;
      let next;
      if (key === "rounds") {
        next = state.rounds + d;
        if (next < 1 || next > 20) return triggerShake(btn.parentElement);
        state.rounds = next;
      }
      if (key === "rest") {
        next = state.rest + d;
        if (next < 0 || next > 180) return triggerShake(btn.parentElement);
        state.rest = next;
      }
      if (key === "prep") {
        next = state.prep + d;
        if (next < 0 || next > 30) return triggerShake(btn.parentElement);
        state.prep = next;
      }
      saveState();
      renderSettings();
      renderPlan();
      renderWorkoutIdle();
    }),
  );

  document.getElementById("toggleAnnounce").addEventListener("click", () => {
    state.audioAnnounce = !state.audioAnnounce;
    saveState();
    renderSettings();
  });
  document.getElementById("toggleForm").addEventListener("click", () => {
    state.audioForm = !state.audioForm;
    saveState();
    renderSettings();
  });
  document.getElementById("togglePacing").addEventListener("click", () => {
    state.audioPacing = !state.audioPacing;
    saveState();
    renderSettings();
  });
  document.getElementById("toggleVibrate").addEventListener("click", () => {
    state.vibrate = !state.vibrate;
    saveState();
    renderSettings();
  });

  let audioCtx = null;
  function beep(freq, dur) {
    if (!state.audioPacing || wo.isMuted) return;
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(),
        g = audioCtx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, audioCtx.currentTime);
      g.gain.setValueAtTime(0.8, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }
  function vibrate(pattern) {
    if (state.vibrate && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }
  function speakCue(type, text) {
    if (wo.isMuted || !("speechSynthesis" in window)) return;
    if (type === "announce" && !state.audioAnnounce) return;
    if (type === "form" && !state.audioForm) return;
    if (type === "pacing" && !state.audioPacing) return;

    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.05;
    msg.pitch = 1.0;
    window.speechSynthesis.speak(msg);
  }

  document.getElementById("btnMuteActive").addEventListener("click", () => {
    wo.isMuted = !wo.isMuted;
    document.getElementById("btnMuteActive").innerHTML = wo.isMuted
      ? SVG_VOL_OFF
      : SVG_VOL_ON;
    if (wo.isMuted) window.speechSynthesis.cancel();
  });

  /* ---------- Workout Engine ---------- */
  function estTotalSeconds() {
    let work = 0;
    state.plan.forEach((p) => {
      work += p.mode === "time" ? p.time : p.reps * 3;
    }); // Est 3s per rep
    const rest =
      state.plan.length > 1 ? (state.plan.length - 1) * state.rest : 0;
    const restBetweenRounds =
      state.rounds > 1 ? state.rest * (state.rounds - 1) : 0;
    return (work + rest) * state.rounds + restBetweenRounds;
  }
  function estCalories() {
    let cals = 0;
    const rates = { cardio: 10, full: 9, lower: 8, upper: 6, core: 5 };
    state.plan.forEach((p) => {
      const ex = EXERCISES.find((x) => x.id === p.id);
      const estTime = p.mode === "time" ? p.time : p.reps * 3;
      cals += (estTime / 60) * rates[ex.cat];
    });
    return Math.round(cals * state.rounds);
  }

  function renderWorkoutIdle() {
    const has = state.plan.length > 0;
    document.getElementById("idleEmpty").style.display = has ? "none" : "block";
    document.getElementById("idleReady").style.display = has ? "block" : "none";
    if (has) {
      document.getElementById("sumCount").textContent = state.plan.length;
      document.getElementById("sumRounds").textContent = state.rounds;
      document.getElementById("sumCals").innerHTML =
        estCalories() +
        ' <span style="font-size:0.6em;color:var(--muted)">kcal</span>';
      document.getElementById("sumTime").textContent =
        formatTime(estTotalSeconds());
    }
  }

  function setWoState(name) {
    document
      .querySelectorAll(".wo-state")
      .forEach((el) => el.classList.remove("active"));
    document.getElementById("wo-" + name).classList.add("active");
    wo.phase = name;
  }

  function startWorkout() {
    if (!state.plan.length) return;
    wo = {
      round: 1,
      idx: 0,
      phase: "prep",
      timeLeft: state.prep,
      phaseTotal: Math.max(state.prep, 1),
      elapsedPhase: 0,
      paused: false,
      elapsed: 0,
      timer: null,
      tick: null,
      isMuted: false,
      rpe: "Light",
    };
    document.getElementById("btnMuteActive").innerHTML = SVG_VOL_ON;
    if (state.audioPacing && !audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.resume();
      } catch (e) {}
    }

    requestWakeLock();
    setThemeColor("#8B7CFF");
    document.getElementById("activeControls").style.display = "none";
    document.getElementById("btnRepsDone").style.display = "none";
    document.getElementById("bigTimer").textContent = state.prep;
    document.getElementById("activeName").textContent = "Get Ready";

    const ex = EXERCISES.find((x) => x.id === state.plan[0].id) || {};
    const val =
      state.plan[0].mode === "reps" ? state.plan[0].reps + " Reps" : "";
    document.getElementById("activeCue").textContent =
      "First up: " + val + " " + ex.name;

    speakCue(
      "announce",
      "Let's get to work, " +
        (state.name || "Athlete") +
        ". First up, " +
        (state.plan[0].mode === "reps" ? state.plan[0].reps : "") +
        " " +
        ex.tts,
    );

    document.getElementById("phaseTag").textContent = "STARTING";
    document.getElementById("phaseTag").style.color = "var(--accent)";
    document.getElementById("roundTag").textContent = "ROUND 1/" + state.rounds;
    document.getElementById("exVisual").innerHTML = "";
    document.getElementById("exVisual").classList.remove("pulse-alert");

    setWoState("active");
    wo.tick = setInterval(() => {
      if (!wo.paused) wo.elapsed++;
    }, 1000);
    runPhaseTimer();
  }

  function loadPhaseUI() {
    const p = state.plan[wo.idx];
    const ex = EXERCISES.find((x) => x.id === p.id);
    document.getElementById("roundTag").textContent =
      "ROUND " + wo.round + "/" + state.rounds;
    document.getElementById("exVisual").classList.remove("pulse-alert");
    wo.elapsedPhase = 0;

    if (wo.phase === "work") {
      setThemeColor("#FF6B4A");
      wo.timeLeft = p.mode === "time" ? p.time : 0;
      wo.phaseTotal = p.time;

      document.getElementById("phaseTag").textContent = "WORK";
      document.getElementById("phaseTag").style.color = "var(--warn)";
      document.getElementById("bigTimer").style.color = "var(--warn)";
      document.getElementById("progressFill").style.background = "var(--warn)";
      document.getElementById("activeName").textContent = ex.name;
      document.getElementById("activeCue").textContent = ex.cue;
      document.getElementById("exVisual").innerHTML = getIcon(ex);
      document.getElementById("exVisual").style.color = CAT_COLOR[ex.cat];

      document.getElementById("activeControls").style.display = "grid";
      document.getElementById("btnAddRest").style.opacity = ".35";
      document.getElementById("btnAddRest").disabled = true;

      if (p.mode === "reps") {
        document.getElementById("btnRepsDone").style.display = "block";
        document.getElementById("progressFill").style.width = "100%";
        document.getElementById("progressFill").classList.remove("glow");
      } else {
        document.getElementById("btnRepsDone").style.display = "none";
        document.getElementById("progressFill").classList.add("glow");
      }

      speakCue("announce", (p.mode === "reps" ? p.reps + " " : "") + ex.tts);
      setTimeout(() => speakCue("form", ex.cue), 2500);
    } else if (wo.phase === "rest") {
      setThemeColor("#00E5A0");
      wo.timeLeft = state.rest;
      wo.phaseTotal = Math.max(state.rest, 1);
      document.getElementById("phaseTag").textContent = "REST";
      document.getElementById("phaseTag").style.color = "var(--accent2)";
      document.getElementById("bigTimer").style.color = "var(--accent2)";
      document.getElementById("progressFill").style.background =
        "var(--accent2)";
      document.getElementById("progressFill").classList.remove("glow");
      document.getElementById("activeName").textContent = "Breathe";

      const val = p.mode === "reps" ? p.reps + " " : "";
      document.getElementById("activeCue").textContent =
        "Up next: " + val + ex.name;
      document.getElementById("exVisual").innerHTML = SVG_REST;
      document.getElementById("exVisual").style.color = "var(--accent2)";

      document.getElementById("activeControls").style.display = "grid";
      document.getElementById("btnRepsDone").style.display = "none";
      document.getElementById("btnAddRest").style.opacity = "1";
      document.getElementById("btnAddRest").disabled = false;

      speakCue("announce", "Rest. Up next, " + val + ex.tts);
    }

    document.getElementById("bigTimer").textContent =
      p.mode === "reps" && wo.phase === "work" ? "0:00" : wo.timeLeft;
    if (p.mode !== "reps" || wo.phase !== "work") updateProgress();
  }

  function updateProgress() {
    document.getElementById("progressFill").style.width =
      (wo.phaseTotal > 0 ? (wo.timeLeft / wo.phaseTotal) * 100 : 0) + "%";
  }

  function runPhaseTimer() {
    clearInterval(wo.timer);
    wo.timer = setInterval(() => {
      if (wo.paused) return;
      wo.elapsedPhase++;

      const p = wo.phase === "work" ? state.plan[wo.idx] : null;
      const isReps = p && p.mode === "reps";

      if (isReps) {
        document.getElementById("bigTimer").textContent = formatTime(
          wo.elapsedPhase,
        );
      } else {
        wo.timeLeft--;
        document.getElementById("bigTimer").textContent = Math.max(
          0,
          wo.timeLeft,
        );
        updateProgress();

        const visual = document.getElementById("exVisual");

        // Halfway Cue
        if (
          wo.phase === "work" &&
          wo.phaseTotal >= 20 &&
          wo.timeLeft === Math.floor(wo.phaseTotal / 2)
        ) {
          speakCue("pacing", "Halfway there.");
        }

        if (wo.timeLeft > 0 && wo.timeLeft <= 3) {
          beep(600, 0.15);
          vibrate([100, 50, 100]);
          if (wo.phase === "work" && !visual.classList.contains("pulse-alert"))
            visual.classList.add("pulse-alert");
        }
        if (wo.timeLeft <= 0) {
          beep(820, 0.5);
          vibrate([150, 60, 150]);
          visual.classList.remove("pulse-alert");
          advancePhase();
        }
      }
    }, 1000);
  }

  function advancePhase() {
    if (wo.phase === "prep") {
      wo.phase = "work";
      loadPhaseUI();
      return;
    }
    if (wo.phase === "work") {
      if (wo.idx === state.plan.length - 1) {
        if (wo.round === state.rounds) {
          triggerCompletion(true);
          return;
        }
        wo.round++;
        wo.idx = 0;
        wo.phase = "rest";
      } else {
        wo.idx++;
        wo.phase = "rest";
      }
    } else {
      wo.phase = "work";
    }
    loadPhaseUI();
  }

  /* ---------- Streak & Completion Engine ---------- */
  function processStreak() {
    const today = getLocalDate(); // Safely gets local date
    if (state.streak.lastDate === today) return;

    if (state.streak.lastDate) {
      const last = new Date(state.streak.lastDate);
      const curr = new Date(today);
      const diff = Math.floor((curr - last) / 86400000);

      if (diff === 1) {
        state.streak.current++;
      } else if (diff > 1) {
        const missed = diff - 1;
        if (state.streak.savers >= missed) {
          state.streak.savers -= missed;
          state.streak.current++;
        } else {
          state.streak.current = 1;
        }
      }
    } else {
      state.streak.current = 1;
    }

    state.streak.lastDate = today;
    if (state.streak.current > state.streak.max)
      state.streak.max = state.streak.current;
  }

  function triggerCompletion(fullComplete) {
    clearInterval(wo.timer);
    clearInterval(wo.tick);
    releaseWakeLock();
    setThemeColor("#0A0A0F");
    window.speechSynthesis.cancel();

    if (wo.elapsed > 0) {
      state.stats.workouts++;
      state.stats.time += wo.elapsed;
      const earnedCals = Math.round(
        (wo.elapsed / Math.max(estTotalSeconds(), 1)) * estCalories(),
      );
      state.stats.calories += earnedCals;

      // Earn Saver (1 every 5 workouts)
      if (state.stats.workouts % 5 === 0)
        state.streak.savers = Math.min(3, state.streak.savers + 1);

      // History Log (Local Time Zone Safe)
      const today = getLocalDate();
      if (!state.history[today])
        state.history[today] = { workouts: 0, time: 0, calories: 0 };
      state.history[today].workouts++;
      state.history[today].time += wo.elapsed;
      state.history[today].calories += earnedCals;

      processStreak();
      saveState();
      updateLifetimeStats();
    }

    document.getElementById("statTime").textContent = formatTime(wo.elapsed);
    if (!fullComplete) {
      document.getElementById("completeTitle").textContent =
        "Session Ended Early";
      document.getElementById("completeSub").textContent =
        "Stats safely recorded.";
    } else {
      document.getElementById("completeTitle").textContent = "Workout Complete";
      document.getElementById("completeSub").textContent =
        state.plan.length +
        " exercises · " +
        state.rounds +
        " round" +
        (state.rounds > 1 ? "s" : "");
      speakCue(
        "announce",
        "Workout complete. Great job, " + (state.name || "Athlete"),
      );
      fireConfetti(); // Confetti ONLY on 100% completion
    }

    // Modal opens, sets phase to complete ON click
    openModal("rpeModal");
  }

  document.querySelectorAll(".rpe-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      wo.rpe = btn.dataset.rpe;
      closeModal("rpeModal");
      setWoState("complete");
    });
  });

  document.getElementById("btnPause").addEventListener("click", () => {
    wo.paused = !wo.paused;
    document.getElementById("btnPause").textContent = wo.paused
      ? "Resume (Space)"
      : "Pause (Space)";
  });
  document.getElementById("btnAddRest").addEventListener("click", () => {
    if (wo.phase === "rest" && !wo.paused) {
      wo.timeLeft += 15;
      wo.phaseTotal += 15;
      document.getElementById("bigTimer").textContent = wo.timeLeft;
      updateProgress();
      beep(420, 0.12);
    }
  });
  document.getElementById("btnSkip").addEventListener("click", () => {
    if (wo.phase === "idle" || wo.phase === "complete") return;
    wo.paused = false;
    document.getElementById("btnPause").textContent = "Pause (Space)";
    window.speechSynthesis.cancel();
    beep(400, 0.1);
    clearInterval(wo.timer);
    advancePhase();
    runPhaseTimer();
  });
  document.getElementById("btnRepsDone").addEventListener("click", () => {
    if (wo.phase === "work" && state.plan[wo.idx].mode === "reps") {
      beep(820, 0.5);
      vibrate([150, 60, 150]);
      advancePhase();
    }
  });
  document.getElementById("btnQuit").addEventListener("click", () => {
    if (confirm("End your workout early? Progress will be saved."))
      triggerCompletion(false);
  });
  document
    .getElementById("btnStartWorkout")
    .addEventListener("click", startWorkout);
  document.getElementById("btnBackHome").addEventListener("click", () => {
    setWoState("idle");
    renderWorkoutIdle();
  });

  /* ---------- Global Keyboard Shortcuts ---------- */
  document.addEventListener("keydown", (e) => {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    )
      return;
    if (wo.phase === "idle" || wo.phase === "complete") {
      if (e.key === "Escape")
        document
          .querySelectorAll(".modal-overlay.active")
          .forEach((m) => closeModal(m.id));
      return;
    }

    if (e.code === "Space") {
      e.preventDefault();
      if (wo.phase === "work" && state.plan[wo.idx].mode === "reps")
        document.getElementById("btnRepsDone").click();
      else document.getElementById("btnPause").click();
    } else if (e.key === "ArrowRight") {
      document.getElementById("btnSkip").click();
    } else if (e.key === "m" || e.key === "M") {
      document.getElementById("btnMuteActive").click();
    } else if (e.key === "Escape") {
      document.getElementById("btnQuit").click();
    }
  });

  /* ---------- Canvas Confetti Engine ---------- */
  function fireConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ["#8B7CFF", "#00E5A0", "#FF6B4A", "#5CC8FF"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 5 + 3,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let tick = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y < canvas.height) active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      tick++;
      if (active && tick < 300) requestAnimationFrame(render);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render();
  }

  /* ---------- Canvas Story Generator ---------- */
  document
    .getElementById("btnShareStats")
    .addEventListener("click", async (e) => {
      const btn = e.target;
      const ogText = btn.innerHTML;
      btn.textContent = "Generating...";
      await new Promise((r) => setTimeout(r, 50));

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, 1080, 1920);
      const g1 = ctx.createRadialGradient(200, 200, 0, 200, 200, 900);
      g1.addColorStop(0, "rgba(139,124,255,0.18)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, 1080, 1920);
      const g2 = ctx.createRadialGradient(880, 1720, 0, 880, 1720, 900);
      g2.addColorStop(0, "rgba(0,229,160,0.12)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, 1080, 1920);

      ctx.textAlign = "center";
      ctx.font = 'bold 85px "Space Grotesk", sans-serif';
      ctx.fillStyle = "#F2F2F7";
      ctx.fillText("WORKOUT CRUSHED", 540, 260);
      ctx.font = '50px "Outfit", sans-serif';
      ctx.fillStyle = "#8B7CFF";
      ctx.fillText((state.name || "Athlete") + "'s Session", 540, 340);

      const cats = state.plan.map(
        (p) => (EXERCISES.find((x) => x.id === p.id) || {}).cat || "full",
      );
      let dominantCat = "full";
      if (cats.length > 0)
        dominantCat = cats
          .sort(
            (a, b) =>
              cats.filter((v) => v === a).length -
              cats.filter((v) => v === b).length,
          )
          .pop();

      const bNames = {
        upper: "🔥 UPPER BODY",
        lower: "🦵 LOWER BODY",
        core: "💪 CORE DOMINANT",
        cardio: "⚡️ CARDIO BURN",
        full: "🌪 FULL BODY",
      };
      const bCols = {
        upper: "#8B7CFF",
        lower: "#00E5A0",
        core: "#FF6B4A",
        cardio: "#FFC55C",
        full: "#5CC8FF",
      };

      ctx.fillStyle = bCols[dominantCat] + "33";
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(290, 400, 500, 75, 37);
        ctx.fill();
      } else {
        ctx.fillRect(290, 400, 500, 75);
      }
      ctx.fillStyle = bCols[dominantCat];
      ctx.font = 'bold 36px "Outfit", sans-serif';
      ctx.fillText(bNames[dominantCat], 540, 452);

      function drawPanel(x, y, val, lbl, col) {
        ctx.fillStyle = "rgba(22, 22, 31, 0.7)";
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(x, y, 800, 220, 40);
          ctx.fill();
          ctx.strokeStyle = "#25252F";
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          ctx.fillRect(x, y, 800, 220);
        }
        ctx.font = 'bold 100px "Space Grotesk", sans-serif';
        ctx.fillStyle = col;
        ctx.fillText(val, x + 400, y + 130);
        ctx.font = 'bold 32px "Outfit", sans-serif';
        ctx.fillStyle = "#8A8A9A";
        ctx.fillText(lbl, x + 400, y + 185);
      }

      drawPanel(140, 540, formatTime(wo.elapsed), "TOTAL TIME", "#00E5A0");

      const earnedCals = Math.round(
        (wo.elapsed / Math.max(estTotalSeconds(), 1)) * estCalories(),
      );
      drawPanel(140, 800, earnedCals + " kcal", "CALORIES BURNED", "#FF6B4A");

      const exDone =
        (wo.round - 1) * state.plan.length +
        wo.idx +
        (wo.phase === "complete" ? 1 : 0);
      drawPanel(140, 1060, exDone, "EXERCISES COMPLETED", "#8B7CFF");

      const rpeIcons = {
        Light: "🙂 LIGHT",
        Hard: "😅 HARD",
        Brutal: "🥵 BRUTAL",
      };
      ctx.fillStyle = "rgba(22, 22, 31, 0.9)";
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(340, 1320, 400, 80, 20);
        ctx.fill();
        ctx.strokeStyle = "#25252F";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.fillRect(340, 1320, 400, 80);
      }
      ctx.font = 'bold 34px "Outfit", sans-serif';
      ctx.fillStyle = "#F2F2F7";
      ctx.fillText("FEEL: " + (rpeIcons[wo.rpe] || "😅 HARD"), 540, 1373);

      ctx.font = 'bold 32px "Outfit", sans-serif';
      ctx.fillStyle = "rgba(138, 138, 154, 0.5)";
      ctx.fillText("workout.chinmayjha.tech", 540, 1820);

      const link = document.createElement("a");
      link.download = "workout-summary.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      btn.textContent = "Downloaded! ✓";
      setTimeout(() => (btn.innerHTML = ogText), 2500);
    });

  /* ---------- PWA Installer ---------- */
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById("btnInstallApp");
    if (btn) btn.style.display = "block";
  });
  document
    .getElementById("btnInstallApp")
    .addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted")
          document.getElementById("btnInstallApp").style.display = "none";
        deferredPrompt = null;
      }
    });

  /* ---------- Initialization ---------- */
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  loadState();
  updateGreeting();
  updateLifetimeStats();
  renderCats();
  renderLibrary();
  renderPlan();
  renderSettings();
  renderWorkoutIdle();
  if (!state.name) openModal("nameModal");
})();
