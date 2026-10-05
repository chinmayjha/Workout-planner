/**
 * Workout Planner Core Logic
 * Built by Chinmay Jha (chinmayjha.tech)
 */
(function () {
  "use strict";

  const SVG_VOL_ON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  const SVG_VOL_OFF =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="1" y2="23"></line><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  const SVG_REST =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>';

  const EX_ICONS = {
    pushup:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-3 4"/></svg>',
    diamondpushup:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-2 4M14 15h2"/></svg>',
    pike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="2.5"/><path d="M5 22l7-10 7 10M12 8v4"/></svg>',
    tricepdip:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-4 4M12 13l4 4M8 17h8M7 12h3"/></svg>',
    plankshoulder:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4M13 15c-1-3 1-5 4-5"/></svg>',
    squat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-3 4M12 13l4 5M8 22h2M14 22h2M12 8H7"/></svg>',
    lunge:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 18h-3M12 8h-4"/></svg>',
    bulgariansplit:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 14v4M12 8h-4"/></svg>',
    gluteb:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2.5"/><path d="M8 18l5-6 6 6M13 12v6"/></svg>',
    calfraise:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3" r="2.5"/><path d="M12 6v8l-3 6M12 14l3 6M8 20h2M14 20h2M12 6H7"/></svg>',
    wallsit:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="7" r="2.5"/><path d="M6 10v6h6v6M6 10h5M2 2v20"/></svg>',
    plank:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4"/></svg>',
    hollowbody:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="15" r="2.5"/><path d="M3 12c4 4 10 4 14 0M10 15l-4-6"/></svg>',
    crunch:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="12" r="2.5"/><path d="M4 18l6-1 4-3 1-3M14 14l-3 4"/></svg>',
    russiantwist:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="2.5"/><path d="M4 18l8-4 8 4M12 14l-3-4M12 14l3-4"/></svg>',
    legraise:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="18" r="2.5"/><path d="M4 10l8 8 5-1M12 18V6"/></svg>',
    mountain:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="8" r="2.5"/><path d="M3 19l5-3 4-2 4-3M12 14l-4 5"/></svg>',
    jj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-5 6M12 13l5 6M12 8L6 4M12 8l6-4"/></svg>',
    skaters:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="6" r="2.5"/><path d="M14 9l-4 4 2 5M10 13l-4 2M14 9l4 2M6 18c2-2 4-2 6 0"/></svg>',
    highknees:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v6M12 13l-4 4v4M12 13l4-4M12 7H8M12 7h4"/></svg>',
    burpee:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v5l-4 4M12 12l4 4M8 20h8M12 7L8 4M12 7l4-3"/></svg>',
    jumpsquat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v7l-4 5M12 14l4 5M12 7H7M12 7h5"/></svg>',
    sprawls:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="2.5"/><path d="M4 6l4 8 4 1M12 15l4-8"/></svg>',
    bearcrawl:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="14" r="2.5"/><path d="M4 18l4-4 6-2 4 4M14 12l-2 6M10 14l-2 4"/></svg>',
    inchworm:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="2.5"/><path d="M4 18l5-8 5 5 4-2"/></svg>',
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
      cue: "Keep a straight line from head to heels. Lower until your chest is just above the floor.",
      time: 40,
      tts: "Push ups",
    },
    {
      id: "diamondpushup",
      name: "Diamond Push-Ups",
      cat: "upper",
      cue: "Hands form a diamond under your chest. Keep elbows tight to target your triceps.",
      time: 35,
      tts: "Diamond Push ups",
    },
    {
      id: "pike",
      name: "Pike Push-Ups",
      cat: "upper",
      cue: "Keep your hips high in a V-shape. Lower the top of your head towards the floor.",
      time: 35,
      tts: "Pike Push ups",
    },
    {
      id: "tricepdip",
      name: "Tricep Dips",
      cat: "upper",
      cue: "Keep your back close to the bench. Lower until your elbows reach ninety degrees.",
      time: 35,
      tts: "Tricep Dips",
    },
    {
      id: "plankshoulder",
      name: "Plank Shoulder Taps",
      cat: "upper",
      cue: "Keep your hips as still as possible. Tap your opposite shoulder with control.",
      time: 30,
      tts: "Plank Shoulder Taps",
    },
    {
      id: "squat",
      name: "Bodyweight Squats",
      cat: "lower",
      cue: "Keep your chest up and drive through your heels. Squat as if sitting in a chair.",
      time: 45,
      tts: "Bodyweight Squats",
    },
    {
      id: "lunge",
      name: "Alternating Lunges",
      cat: "lower",
      cue: "Step forward and drop your back knee. Keep your front knee directly over your ankle.",
      time: 40,
      tts: "Alternating Lunges",
    },
    {
      id: "bulgariansplit",
      name: "Bulgarian Split Squats",
      cat: "lower",
      cue: "Elevate your back foot on a surface. Drop your hips straight down with control.",
      time: 40,
      tts: "Bulgarian Split Squats",
    },
    {
      id: "gluteb",
      name: "Glute Bridges",
      cat: "lower",
      cue: "Drive through your heels. Squeeze your glutes hard at the top of the movement.",
      time: 40,
      tts: "Glute Bridges",
    },
    {
      id: "calfraise",
      name: "Calf Raises",
      cat: "lower",
      cue: "Rise up onto your toes as high as you can. Lower down slowly and controlled.",
      time: 30,
      tts: "Calf Raises",
    },
    {
      id: "wallsit",
      name: "Wall Sit",
      cat: "lower",
      cue: "Press your back flat against the wall. Keep your thighs perfectly parallel to the floor.",
      time: 40,
      tts: "Wall Sit",
    },
    {
      id: "plank",
      name: "Forearm Plank",
      cat: "core",
      cue: "Keep your belly button pulled in tight. Maintain a straight line from shoulders to ankles.",
      time: 40,
      tts: "Forearm Plank",
    },
    {
      id: "hollowbody",
      name: "Hollow Body Hold",
      cat: "core",
      cue: "Keep your lower back completely glued to the floor. Extend arms and legs out tight.",
      time: 45,
      tts: "Hollow Body Hold",
    },
    {
      id: "crunch",
      name: "Crunches",
      cat: "core",
      cue: "Exhale as you curl your shoulders off the floor. Keep your neck relaxed and look up.",
      time: 35,
      tts: "Crunches",
    },
    {
      id: "russiantwist",
      name: "Russian Twists",
      cat: "core",
      cue: "Lean back slightly to engage your core. Rotate entirely from your torso, not just your arms.",
      time: 35,
      tts: "Russian Twists",
    },
    {
      id: "legraise",
      name: "Leg Raises",
      cat: "core",
      cue: "Keep your legs straight and lower back flat. Only lower legs as far as you can control.",
      time: 35,
      tts: "Leg Raises",
    },
    {
      id: "mountain",
      name: "Mountain Climbers",
      cat: "cardio",
      cue: "Drive your knees to your chest quickly. Keep your hips low and core engaged.",
      time: 30,
      tts: "Mountain Climbers",
    },
    {
      id: "jj",
      name: "Jumping Jacks",
      cat: "cardio",
      cue: "Keep a steady, bouncing pace. Move your arms through a full range of motion.",
      time: 35,
      tts: "Jumping Jacks",
    },
    {
      id: "skaters",
      name: "Ice Skaters",
      cat: "cardio",
      cue: "Leap side to side dynamically. Try to balance on one leg softly upon landing.",
      time: 30,
      tts: "Ice Skaters",
    },
    {
      id: "highknees",
      name: "High Knees",
      cat: "cardio",
      cue: "Pump your arms to drive the momentum. Bring your knees up to waist height.",
      time: 30,
      tts: "High Knees",
    },
    {
      id: "burpee",
      name: "Burpees",
      cat: "cardio",
      cue: "Drop down, kick back, push up, and explode into a jump. Keep a steady rhythm.",
      time: 30,
      tts: "Burpees",
    },
    {
      id: "jumpsquat",
      name: "Jump Squats",
      cat: "full",
      cue: "Explode up from the bottom of the squat. Land softly to protect your knees.",
      time: 30,
      tts: "Jump Squats",
    },
    {
      id: "sprawls",
      name: "Sprawls",
      cat: "full",
      cue: "Drop your hips heavily to the floor. Explode back up to your feet instantly.",
      time: 30,
      tts: "Sprawls",
    },
    {
      id: "bearcrawl",
      name: "Bear Crawl",
      cat: "full",
      cue: "Keep your knees hovering just an inch off the floor. Keep your back flat like a table.",
      time: 30,
      tts: "Bear Crawl",
    },
    {
      id: "inchworm",
      name: "Inchworms",
      cat: "full",
      cue: "Keep your legs straight as you walk your hands out. Walk back up using small steps.",
      time: 35,
      tts: "Inchworms",
    },
  ];

  const HOLDS = new Set(["plank", "hollowbody", "wallsit"]);
  const canRep = (ex) => !HOLDS.has(ex.id);
  const RPE_LABEL = { 1: "Light", 2: "Hard", 3: "Brutal" };
  const RPE_COLOR = { 1: "#00E5A0", 2: "#FFC55C", 3: "#FF6B4A" };

  /* ---------- State & Routing ---------- */
  let state = {
    name: "",
    plan: [],
    rounds: 1,
    rest: 30,
    prep: 5,
    sound: true,
    audio: { announce: true, coach: true, chimes: true },
    vibrate: true,
    stats: { workouts: 0, time: 0, calories: 0 }, // 'time' stores raw seconds
  };
  let searchQuery = "";
  let wo = {
    round: 1,
    idx: 0,
    phase: "idle",
    timeLeft: 0,
    phaseTotal: 0,
    paused: false,
    elapsed: 0,
    timer: null,
    tick: null,
    pauseCount: 0,
  };
  let wakeLock = null;
  let lastSession = {
    complete: true,
    secs: 0,
    cals: 0,
    exDone: 0,
    exTotal: 0,
    rpe: null,
  };

  const LS_KEY = "forge_state_v6";
  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        Object.assign(state, saved);
        state.audio = Object.assign(
          { announce: true, coach: true, chimes: true },
          saved.audio,
        );
        state.plan = (Array.isArray(state.plan) ? state.plan : []).filter((p) =>
          EXERCISES.some((x) => x.id === (p && p.id)),
        );
        if (state.stats.minutes !== undefined && !state.stats.time) {
          state.stats.time = state.stats.minutes * 60;
          delete state.stats.minutes;
        }
      }
    } catch (e) {}
  }
  function saveState() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  /* ---------- Features & Utilities ---------- */
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

  /* ---------- PWA Install Logic ---------- */
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById("btnInstallApp");
    if (installBtn) installBtn.style.display = "block";
  });

  document
    .getElementById("btnInstallApp")
    .addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          document.getElementById("btnInstallApp").style.display = "none";
        }
        deferredPrompt = null;
      }
    });

  /* ---------- Custom Confetti Engine ---------- */
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
      if (active && tick < 300) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }

  function drawFace(ctx, k, x, y, r, col) {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = r / 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    const ex = r * 0.35,
      ey = y - r * 0.2,
      q = r * 0.14;
    [-1, 1].forEach((s) => {
      const cx = x + s * ex;
      ctx.beginPath();
      if (k === 3) {
        ctx.moveTo(cx - q, ey - q);
        ctx.lineTo(cx + q, ey + q);
        ctx.moveTo(cx + q, ey - q);
        ctx.lineTo(cx - q, ey + q);
        ctx.stroke();
      } else {
        ctx.arc(cx, ey, r * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.beginPath();
    if (k === 1)
      ctx.arc(x, y + r * 0.05, r * 0.5, 0.2 * Math.PI, 0.8 * Math.PI);
    else if (k === 2) {
      ctx.moveTo(x - r * 0.4, y + r * 0.35);
      ctx.lineTo(x + r * 0.4, y + r * 0.35);
    } else ctx.arc(x, y + r * 0.65, r * 0.4, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  /* ---------- Canvas Story Image Generator ---------- */
  document
    .getElementById("btnShareStats")
    .addEventListener("click", async (e) => {
      const btn = e.target;
      const originalText = btn.innerHTML;
      btn.textContent = "Generating...";

      // Allow UI to paint before heavy canvas operations
      await new Promise((r) => setTimeout(r, 50));
      if (document.fonts && document.fonts.ready) await document.fonts.ready;

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");

      // Background
      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, 1080, 1920);

      // Purple Gradient Top Left
      const g1 = ctx.createRadialGradient(200, 200, 0, 200, 200, 900);
      g1.addColorStop(0, "rgba(139,124,255,0.18)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, 1080, 1920);

      // Mint Gradient Bottom Right
      const g2 = ctx.createRadialGradient(880, 1720, 0, 880, 1720, 900);
      g2.addColorStop(0, "rgba(0,229,160,0.12)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, 1080, 1920);

      ctx.textAlign = "center";

      // Header
      ctx.font = 'bold 85px "Space Grotesk", sans-serif';
      ctx.fillStyle = "#F2F2F7";
      ctx.fillText(
        lastSession.complete ? "WORKOUT CRUSHED" : "SESSION LOGGED",
        540,
        300,
      );

      ctx.font = '50px "Outfit", sans-serif';
      ctx.fillStyle = "#8B7CFF";
      ctx.fillText((state.name || "Athlete") + "'s Session", 540, 380);

      // Dynamic Badge Logic
      const cats = state.plan.map((p) => {
        const ex = EXERCISES.find((x) => x.id === p.id);
        return ex ? ex.cat : "full";
      });

      let dominantCat = "full";
      const counts = {};
      cats.forEach((c) => (counts[c] = (counts[c] || 0) + 1));
      let best = 0;
      Object.keys(counts).forEach((c) => {
        if (counts[c] > best) {
          best = counts[c];
          dominantCat = c;
        }
      });

      const badgeNames = {
        upper: "🔥 UPPER BODY",
        lower: "🦵 LOWER BODY",
        core: "💪 CORE DOMINANT",
        cardio: "⚡️ CARDIO BURN",
        full: "🌪️ FULL BODY",
      };
      const badgeColors = {
        upper: "#8B7CFF",
        lower: "#00E5A0",
        core: "#FF6B4A",
        cardio: "#FFC55C",
        full: "#5CC8FF",
      };

      // Draw Badge
      ctx.fillStyle = badgeColors[dominantCat] + "33"; // 20% opacity background
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(290, 440, 500, 75, 37);
        ctx.fill();
      } else {
        ctx.fillRect(290, 440, 500, 75); // Fallback for ancient browsers
      }

      ctx.fillStyle = badgeColors[dominantCat];
      ctx.font = 'bold 36px "Outfit", sans-serif';
      ctx.fillText(badgeNames[dominantCat], 540, 492);

      // Glass Panels
      function drawPanel(x, y, val, lbl, color) {
        ctx.fillStyle = "rgba(22, 22, 31, 0.7)";
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(x, y, 800, 240, 40);
          ctx.fill();
          ctx.strokeStyle = "#25252F";
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          ctx.fillRect(x, y, 800, 240);
        }

        ctx.font = 'bold 110px "Space Grotesk", sans-serif';
        ctx.fillStyle = color;
        ctx.fillText(val, x + 400, y + 135);

        ctx.font = 'bold 36px "Outfit", sans-serif';
        ctx.fillStyle = "#8A8A9A";
        ctx.fillText(lbl, x + 400, y + 200);
      }

      const totalSecs = lastSession.secs;
      const m = Math.floor(totalSecs / 60);
      const s = totalSecs % 60;
      const timeStr = m + "m " + s + "s";

      drawPanel(140, 650, timeStr, "TOTAL TIME", "#00E5A0");
      drawPanel(
        140,
        930,
        lastSession.cals + " kcal",
        "CALORIES BURNED",
        "#FF6B4A",
      );
      drawPanel(
        140,
        1210,
        lastSession.complete
          ? String(lastSession.exDone)
          : lastSession.exDone + " / " + lastSession.exTotal,
        "EXERCISES DONE",
        "#8B7CFF",
      );

      if (lastSession.rpe) {
        drawFace(
          ctx,
          lastSession.rpe,
          440,
          1590,
          60,
          RPE_COLOR[lastSession.rpe],
        );
        ctx.font = 'bold 40px "Outfit", sans-serif';
        ctx.fillStyle = RPE_COLOR[lastSession.rpe];
        ctx.fillText(
          "FELT " + RPE_LABEL[lastSession.rpe].toUpperCase(),
          660,
          1604,
        );
      }

      // Watermark
      ctx.font = 'bold 32px "Outfit", sans-serif';
      ctx.fillStyle = "rgba(138, 138, 154, 0.5)";
      ctx.fillText("workout.chinmayjha.tech", 540, 1820);

      const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
      const file = new File([blob], "workout-summary.png", {
        type: "image/png",
      });
      let label = null;
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          label = "Shared ✓";
        } catch (err) {
          if (err && err.name === "AbortError") label = "";
        }
      }
      if (label === null) {
        const link = document.createElement("a");
        link.download = "workout-summary.png";
        link.href = URL.createObjectURL(blob);
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        label = "Downloaded! ✓";
      }
      if (label) btn.textContent = label;
      else btn.innerHTML = originalText;
      setTimeout(() => (btn.innerHTML = originalText), 2500);
    });

  /* ---------- Core Logic ---------- */
  function formatLifetimeTime(totalSeconds) {
    if (!totalSeconds) return "0s";
    if (totalSeconds < 60) return totalSeconds + "s";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  }

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

  function updateLifetimeStats() {
    document.getElementById("ltWorkouts").textContent =
      state.stats.workouts || 0;
    document.getElementById("ltTime").textContent = formatLifetimeTime(
      state.stats.time || 0,
    );
    document.getElementById("ltCalories").textContent =
      state.stats.calories || 0;
  }

  function showTab(name) {
    if (name !== "workout" && wo.phase !== "idle" && wo.phase !== "complete") {
      const wasPaused = wo.paused;
      wo.paused = true;
      if (
        !confirm(
          "You have a workout in progress. Are you sure you want to end it and return to the planner?",
        )
      ) {
        wo.paused = wasPaused;
        return;
      }
      quitWorkoutLogic(true);
    }
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.toggle("active", p.id === "page-" + name));
  }

  document
    .querySelectorAll(".tab")
    .forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));
  let quitPrevPaused = false;
  let lastFocus = null;
  function syncLock() {
    document.body.classList.toggle(
      "modal-open",
      !!document.querySelector(".modal-overlay.active"),
    );
  }
  function openModal(id) {
    const el = document.getElementById(id);
    lastFocus = document.activeElement;
    el.classList.add("active");
    syncLock();
    const f = el.querySelector("button, input");
    if (f) setTimeout(() => f.focus(), 50);
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el.classList.contains("active")) return;
    el.classList.remove("active");
    syncLock();
    if (id === "quitModal") wo.paused = quitPrevPaused;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Click overlay to close modals (the first-run name prompt stays until a name is set)
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("mousedown", (e) => {
      if (e.target === overlay && (overlay.id !== "nameModal" || state.name))
        closeModal(overlay.id);
    });
  });

  document
    .getElementById("btnOpenSettings")
    .addEventListener("click", () => openModal("settingsModal"));
  document
    .getElementById("btnCloseSettings")
    .addEventListener("click", () => closeModal("settingsModal"));
  document.getElementById("btnEditName").addEventListener("click", () => {
    closeModal("settingsModal");
    document.getElementById("nameInput").value = state.name;
    openModal("nameModal");
  });

  document.getElementById("btnSaveName").addEventListener("click", () => {
    const inputEl = document.getElementById("nameInput");
    const val = inputEl.value.trim();
    if (!val) {
      inputEl.style.borderColor = "var(--warn)";
      inputEl.placeholder = "Please enter a name";
      return;
    }
    inputEl.style.borderColor = "var(--line)";
    state.name = val;
    saveState();
    updateGreeting();
    closeModal("nameModal");
  });

  /* ---------- Library & Search ---------- */
  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderLibrary();
  });

  let activeCat = "all";
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
    const list = EXERCISES.filter((e) => {
      return (
        (activeCat === "all" || e.cat === activeCat) &&
        (e.name.toLowerCase().includes(searchQuery) ||
          e.cue.toLowerCase().includes(searchQuery))
      );
    });

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
          const id = btn.dataset.add;
          const idx = state.plan.findIndex((p) => p.id === id);
          if (idx > -1) {
            state.plan.splice(idx, 1);
          } else {
            if (state.plan.length >= 50) return triggerShake(btn.parentElement);
            const ex = EXERCISES.find((x) => x.id === id);
            state.plan.push({ id, time: ex.time });
          }
          saveState();
          renderLibrary();
          renderPlan();
          renderWorkoutIdle();
        });
      });
  }

  /* ---------- Plan & Drag-n-Drop ---------- */
  let dragSourceIdx = null;

  document.getElementById("btnClearPlan").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your current plan?")) {
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
    const clearBtn = document.getElementById("btnClearPlan");
    const actionBtn = document.getElementById("planActions");

    clearBtn.style.display = state.plan.length > 0 ? "inline-block" : "none";
    actionBtn.style.display = state.plan.length > 0 ? "block" : "none";

    if (!state.plan.length) {
      list.innerHTML =
        '<div class="empty-hint">Add exercises above to build your workout.</div>';
      return;
    }

    list.innerHTML = state.plan
      .map((p, i) => {
        const ex = EXERCISES.find((x) => x.id === p.id);
        return `<div class="plan-card pop-in" draggable="true" data-idx="${i}" style="animation-delay: ${i * 0.03}s">
        <div class="ex-icon" style="width:38px;height:38px;flex:0 0 38px;background:${CAT_COLOR[ex.cat]}22;color:${CAT_COLOR[ex.cat]}">${getIcon(ex)}</div>
        <div class="ex-info"><h4 style="font-size:.88rem">${ex.name}</h4></div>
        ${canRep(ex) ? `<button class="mode-btn" data-mode="${i}" type="button" aria-label="Switch ${ex.name} between time and reps">${p.mode === "reps" ? "Reps" : "Time"}</button>` : ""}
        ${canRep(ex) && p.mode === "reps" ? `<span class="reps-est">~${p.time}s</span>` : `<div class="plan-time-stepper"><button data-mod="-5" data-idx="${i}">−</button><span>${p.time}s</span><button data-mod="5" data-idx="${i}">+</button></div>`}
        <button class="plan-remove" data-remove="${i}">✕</button>
        <div class="drag-handle"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg></div>
      </div>`;
      })
      .join("");

    list.querySelectorAll("[data-mod]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const i = +btn.dataset.idx,
          mod = +btn.dataset.mod,
          next = state.plan[i].time + mod;
        if (next < 5 || next > 300) return triggerShake(btn.parentElement);
        state.plan[i].time = next;
        saveState();
        renderPlan();
        renderWorkoutIdle();
      }),
    );

    list.querySelectorAll("[data-mode]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const p = state.plan[+btn.dataset.mode];
        p.mode = p.mode === "reps" ? "time" : "reps";
        saveState();
        renderPlan();
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
        e.dataTransfer.setData("text/plain", dragSourceIdx);
      });
      card.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        return false;
      });
      card.addEventListener("dragenter", function (e) {
        if (+this.dataset.idx !== dragSourceIdx)
          this.classList.add("drag-over");
      });
      card.addEventListener("dragleave", function (e) {
        this.classList.remove("drag-over");
      });
      card.addEventListener("drop", function (e) {
        e.stopPropagation();
        const dropTargetIdx = +this.dataset.idx;
        if (dragSourceIdx !== null && dragSourceIdx !== dropTargetIdx) {
          const item = state.plan.splice(dragSourceIdx, 1)[0];
          state.plan.splice(dropTargetIdx, 0, item);
          saveState();
          renderPlan();
        }
        return false;
      });
      card.addEventListener("dragend", function (e) {
        this.classList.remove("dragging");
        cards.forEach((c) => c.classList.remove("drag-over"));
        dragSourceIdx = null;
      });
    });
  }

  /* ---------- Settings ---------- */
  function updateAudioIcon() {
    const btn = document.getElementById("btnMute");
    btn.innerHTML = state.sound ? SVG_VOL_ON : SVG_VOL_OFF;
  }

  function renderSettings() {
    document.getElementById("restVal").textContent = state.rest + "s";
    document.getElementById("prepVal").textContent = state.prep + "s";
    document.getElementById("toggleSound").classList.toggle("on", state.sound);
    document
      .getElementById("toggleVibrate")
      .classList.toggle("on", state.vibrate);
    updateAudioIcon();
    renderSwitches();
  }

  document.querySelectorAll("[data-step]").forEach((btn) => {
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
    });
  });

  document.getElementById("toggleSound").addEventListener("click", () => {
    state.sound = !state.sound;
    saveState();
    renderSettings();
  });
  document.getElementById("toggleVibrate").addEventListener("click", () => {
    state.vibrate = !state.vibrate;
    saveState();
    renderSettings();
  });

  /* ---------- Sound, Voice & Haptics ---------- */
  let audioCtx = null;
  function beep(freq, dur) {
    if (!state.sound || !state.audio.chimes) return;
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
  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }
  function speakCue(text, kind) {
    if (!text || !state.sound || !("speechSynthesis" in window)) return;
    if (kind && !state.audio[kind]) return;
    stopSpeech();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.05;
    msg.pitch = 1.0;
    window.speechSynthesis.speak(msg);
  }
  document.getElementById("btnMute").addEventListener("click", () => {
    state.sound = !state.sound;
    saveState();
    updateAudioIcon();
    if (!state.sound) stopSpeech();
  });

  /* ---------- Workout Engine ---------- */
  function estTotalSeconds() {
    const work = state.plan.reduce((s, p) => s + p.time, 0);
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
      cals += (p.time / 60) * (rates[ex.cat] || 6);
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
      const t = estTotalSeconds(),
        m = Math.floor(t / 60),
        s = t % 60;
      document.getElementById("sumTime").textContent =
        m + ":" + String(s).padStart(2, "0");
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
      paused: false,
      elapsed: 0,
      timer: null,
      tick: null,
      pauseCount: 0,
    };
    wo.startedAt = Date.now();
    if (state.sound && !audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.resume();
      } catch (e) {}
    }

    requestWakeLock();
    setThemeColor("#8B7CFF"); // Accent Color for Prep

    document.getElementById("activeControls").style.display = "none";
    document.getElementById("bigTimer").textContent = state.prep;
    document.getElementById("activeName").textContent = "Get Ready";

    const firstEx = EXERCISES.find((x) => x.id === state.plan[0].id) || {};
    document.getElementById("activeCue").textContent =
      "First up: " + firstEx.name;
    speakCue(
      "Let's get to work, " +
        (state.name || "Athlete") +
        ". First up, " +
        firstEx.tts,
      "announce",
    );

    document.getElementById("phaseTag").textContent = "STARTING";
    document.getElementById("phaseTag").style.color = "var(--accent)";
    document.getElementById("roundTag").textContent = "ROUND 1/" + state.rounds;
    document.getElementById("exVisual").innerHTML = "";
    document.getElementById("exVisual").classList.remove("pulse-alert");

    setWoState("active");
    wo.phase = "prep";
    wo.tick = setInterval(() => {
      if (!wo.paused) wo.elapsed++;
    }, 1000);
    runPhaseTimer();
  }

  function loadPhaseUI() {
    const ex = EXERCISES.find((x) => x.id === state.plan[wo.idx].id);
    document.getElementById("roundTag").textContent =
      "ROUND " + wo.round + "/" + state.rounds;
    document.getElementById("exVisual").classList.remove("pulse-alert");

    if (wo.phase === "work") {
      setThemeColor("#FF6B4A"); // Warn Color for Work
      wo.timeLeft = state.plan[wo.idx].time;
      wo.phaseTotal = wo.timeLeft;
      wo.halfDone = false;
      wo.reps = canRep(ex) && state.plan[wo.idx].mode === "reps";
      if (wo.reps) {
        wo.timeLeft = 0;
        wo.phaseTotal = 1;
        wo.repsElapsed = 0;
      }
      document.getElementById("btnDone").style.display = wo.reps
        ? "block"
        : "none";
      document.getElementById("phaseTag").textContent = "WORK";
      document.getElementById("phaseTag").style.color = "var(--warn)";
      document.getElementById("bigTimer").style.color = "var(--warn)";
      document.getElementById("progressFill").style.background = "var(--warn)";
      document.getElementById("progressFill").classList.add("glow");
      document.getElementById("activeName").textContent = ex.name;
      document.getElementById("activeCue").textContent = ex.cue;
      document.getElementById("exVisual").innerHTML = getIcon(ex);
      document.getElementById("exVisual").style.color = CAT_COLOR[ex.cat];
      document.getElementById("activeControls").style.display = "grid";
      document.getElementById("btnAddRest").style.opacity = ".35";
      document.getElementById("btnAddRest").disabled = true;
      speakCue(
        [state.audio.announce ? ex.tts : "", state.audio.coach ? ex.cue : ""]
          .filter(Boolean)
          .join(". "),
      );
    } else if (wo.phase === "rest") {
      setThemeColor("#00E5A0"); // Accent2 Color for Rest
      wo.timeLeft = state.rest;
      wo.phaseTotal = Math.max(state.rest, 1);
      wo.reps = false;
      document.getElementById("btnDone").style.display = "none";
      document.getElementById("phaseTag").textContent = "REST";
      document.getElementById("phaseTag").style.color = "var(--accent2)";
      document.getElementById("bigTimer").style.color = "var(--accent2)";
      document.getElementById("progressFill").style.background =
        "var(--accent2)";
      document.getElementById("progressFill").classList.remove("glow");
      document.getElementById("activeName").textContent = "Breathe";
      document.getElementById("activeCue").textContent = "Up next: " + ex.name;
      document.getElementById("exVisual").innerHTML = SVG_REST;
      document.getElementById("exVisual").style.color = "var(--accent2)";
      document.getElementById("activeControls").style.display = "grid";
      document.getElementById("btnAddRest").style.opacity = "1";
      document.getElementById("btnAddRest").disabled = false;
      speakCue("Rest. Up next, " + ex.tts, "announce");
    }
    document.getElementById("bigTimer").textContent =
      wo.reps && wo.phase === "work" ? "0:00" : wo.timeLeft;
    updateProgress();
  }

  function updateProgress() {
    document.getElementById("progressFill").style.width =
      (wo.reps && wo.phase === "work"
        ? 100
        : wo.phaseTotal > 0
          ? (wo.timeLeft / wo.phaseTotal) * 100
          : 0) + "%";
  }

  function runPhaseTimer() {
    clearInterval(wo.timer);
    wo.timer = setInterval(() => {
      if (wo.paused) return;
      if (wo.phase === "work" && wo.reps) {
        wo.repsElapsed++;
        const rm = Math.floor(wo.repsElapsed / 60);
        document.getElementById("bigTimer").textContent =
          rm + ":" + String(wo.repsElapsed % 60).padStart(2, "0");
        return;
      }
      wo.timeLeft--;
      document.getElementById("bigTimer").textContent = Math.max(
        0,
        wo.timeLeft,
      );
      updateProgress();

      if (
        wo.phase === "work" &&
        wo.phaseTotal >= 20 &&
        !wo.halfDone &&
        !wo.reps &&
        wo.timeLeft > 0 &&
        wo.timeLeft <= Math.floor(wo.phaseTotal / 2)
      ) {
        wo.halfDone = true;
        speakCue("Halfway there", "chimes");
      }

      const visual = document.getElementById("exVisual");
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
          finishWorkout();
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

  function finishWorkout() {
    clearInterval(wo.timer);
    clearInterval(wo.tick);
    releaseWakeLock();
    setThemeColor("#0A0A0F"); // Revert theme
    document.getElementById("progressFill").classList.remove("glow");
    document.getElementById("exVisual").classList.remove("pulse-alert");

    const m = Math.floor(wo.elapsed / 60),
      s = wo.elapsed % 60;

    state.stats.workouts = (state.stats.workouts || 0) + 1;
    state.stats.time = (state.stats.time || 0) + wo.elapsed;
    state.stats.calories = (state.stats.calories || 0) + estCalories();
    saveState();
    updateLifetimeStats();
    if (window.Profile)
      Profile.record({
        start: wo.startedAt,
        secs: wo.elapsed,
        cals: estCalories(),
        complete: true,
        exDone: state.plan.length * state.rounds,
        exTotal: state.plan.length * state.rounds,
        rounds: state.rounds,
      });

    document.getElementById("statTime").textContent =
      m + ":" + String(s).padStart(2, "0");
    document.getElementById("completeSub").textContent =
      state.plan.length +
      " exercises · " +
      state.rounds +
      " round" +
      (state.rounds > 1 ? "s" : "");
    setWoState("complete");
    speakCue(
      "Workout complete. Great job, " + (state.name || "Athlete"),
      "announce",
    );

    // Trigger celebratory physics
    fireConfetti();
    document.getElementById("completeTitle").textContent = "Workout Complete";
    const total = state.plan.length * state.rounds;
    lastSession = {
      complete: true,
      secs: wo.elapsed,
      cals: estCalories(),
      exDone: total,
      exTotal: total,
      rpe: null,
    };
    setTimeout(() => openModal("rpeModal"), 800);
  }

  function quitWorkoutLogic(silent) {
    clearInterval(wo.timer);
    clearInterval(wo.tick);
    releaseWakeLock();
    setThemeColor("#0A0A0F"); // Revert theme
    document.getElementById("progressFill").classList.remove("glow");
    document.getElementById("exVisual").classList.remove("pulse-alert");
    stopSpeech();

    if (wo.elapsed >= 30) {
      state.stats.workouts = (state.stats.workouts || 0) + 1;
      state.stats.time = (state.stats.time || 0) + wo.elapsed;
      const earnedCals = Math.round(
        (wo.elapsed / Math.max(estTotalSeconds(), 1)) * estCalories(),
      );
      state.stats.calories = (state.stats.calories || 0) + earnedCals;
      saveState();
      updateLifetimeStats();
      if (window.Profile)
        Profile.record({
          start: wo.startedAt,
          secs: wo.elapsed,
          cals: earnedCals,
          complete: false,
          exDone: (wo.round - 1) * state.plan.length + wo.idx,
          exTotal: state.plan.length * state.rounds,
          rounds: state.rounds,
        });
      if (!silent) {
        const done = (wo.round - 1) * state.plan.length + wo.idx;
        const total = state.plan.length * state.rounds;
        lastSession = {
          complete: false,
          secs: wo.elapsed,
          cals: earnedCals,
          exDone: done,
          exTotal: total,
          rpe: null,
        };
        document.getElementById("completeTitle").textContent = "Session Saved";
        document.getElementById("completeSub").textContent =
          done + " of " + total + " exercises";
        document.getElementById("statTime").textContent =
          Math.floor(wo.elapsed / 60) +
          ":" +
          String(wo.elapsed % 60).padStart(2, "0");
        setWoState("complete");
        setTimeout(() => openModal("rpeModal"), 800);
        return;
      }
    }
    setWoState("idle");
    renderWorkoutIdle();
  }

  document.getElementById("btnPause").addEventListener("click", (e) => {
    wo.paused = !wo.paused;
    e.target.textContent = wo.paused ? "Resume" : "Pause";
    if (wo.paused && wo.phase === "work") wo.pauseCount++;
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
    document.getElementById("btnPause").textContent = "Pause";
    document.getElementById("progressFill").classList.remove("glow");
    document.getElementById("exVisual").classList.remove("pulse-alert");
    stopSpeech();
    beep(400, 0.1);

    clearInterval(wo.timer);
    advancePhase();
    runPhaseTimer();
  });

  document.getElementById("btnQuit").addEventListener("click", openQuitConfirm);
  document
    .getElementById("btnStartWorkout")
    .addEventListener("click", startWorkout);
  document.getElementById("btnBackHome").addEventListener("click", () => {
    setWoState("idle");
    renderWorkoutIdle();
  });

  /* =========================================================
     DEVELOPER INFO MODULE LOGIC
  ========================================================= */
  const developerInfoBtn = document.getElementById("developerInfoBtn");
  const developerModal = document.getElementById("developerModal");
  const developerOverlay = document.getElementById("developerOverlay");
  const closeDeveloperBtn = document.getElementById("closeDeveloperBtn");

  function openDeveloperModal() {
    developerModal.style.display = "block";
    developerOverlay.style.display = "block";
    setTimeout(() => {
      developerModal.classList.add("active");
      developerOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }, 10);
  }
  function closeDeveloperModal() {
    developerModal.classList.remove("active");
    developerOverlay.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      developerModal.style.display = "none";
      developerOverlay.style.display = "none";
    }, 300);
  }

  if (developerInfoBtn)
    developerInfoBtn.addEventListener("click", openDeveloperModal);
  if (closeDeveloperBtn)
    closeDeveloperBtn.addEventListener("click", closeDeveloperModal);
  if (developerOverlay)
    developerOverlay.addEventListener("click", closeDeveloperModal);

  /* ---------- Audio switches, help hub, quit confirm, shortcuts ---------- */
  const SWITCH_MAP = {
    toggleAnnounce: "announce",
    toggleCoach: "coach",
    toggleChimes: "chimes",
  };
  function renderSwitches() {
    const all = { toggleSound: state.sound, toggleVibrate: state.vibrate };
    Object.keys(SWITCH_MAP).forEach(
      (id) => (all[id] = state.audio[SWITCH_MAP[id]]),
    );
    Object.keys(all).forEach((id) => {
      const el = document.getElementById(id);
      el.classList.toggle("on", !!all[id]);
      el.setAttribute("role", "switch");
      el.setAttribute("aria-checked", String(!!all[id]));
      el.setAttribute(
        "aria-label",
        el.parentElement.querySelector(".lbl").textContent.trim(),
      );
    });
  }
  Object.keys(SWITCH_MAP).forEach((id) =>
    document.getElementById(id).addEventListener("click", () => {
      const k = SWITCH_MAP[id];
      state.audio[k] = !state.audio[k];
      saveState();
      renderSwitches();
    }),
  );

  document.getElementById("vidList").innerHTML = EXERCISES.map(
    (e) =>
      `<a class="vid-link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(e.name + " proper form")}" target="_blank" rel="noopener noreferrer"><span>${e.name}</span><span aria-hidden="true">↗</span></a>`,
  ).join("");
  document
    .getElementById("btnDone")
    .addEventListener("click", () =>
      document.getElementById("btnSkip").click(),
    );
  document.querySelectorAll("[data-rpe]").forEach((b) =>
    b.addEventListener("click", () => {
      lastSession.rpe = +b.dataset.rpe;
      if (window.Profile) Profile.rate(lastSession.rpe);
      closeModal("rpeModal");
    }),
  );
  document
    .getElementById("btnRpeSkip")
    .addEventListener("click", () => closeModal("rpeModal"));
  document
    .getElementById("btnHelp")
    .addEventListener("click", () => openModal("helpModal"));
  document
    .getElementById("btnCloseHelp")
    .addEventListener("click", () => closeModal("helpModal"));

  const activeWorkout = () => ["prep", "work", "rest"].includes(wo.phase);
  function openQuitConfirm() {
    if (!activeWorkout()) return;
    if (document.getElementById("quitModal").classList.contains("active"))
      return;
    quitPrevPaused = wo.paused;
    wo.paused = true;
    openModal("quitModal");
  }
  document
    .getElementById("btnKeepGoing")
    .addEventListener("click", () => closeModal("quitModal"));
  document.getElementById("btnConfirmQuit").addEventListener("click", () => {
    closeModal("quitModal");
    quitWorkoutLogic();
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Escape") {
      if (developerModal.classList.contains("active"))
        return closeDeveloperModal();
      const open = document.querySelector(".modal-overlay.active");
      if (open) {
        if (open.id !== "nameModal" || state.name) closeModal(open.id);
        return;
      }
      return openQuitConfirm();
    }
    const t = e.target;
    const tag = (t.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || t.isContentEditable) return;
    const modalOpen =
      document.querySelector(".modal-overlay.active") ||
      developerModal.classList.contains("active");
    if (e.key === "?") {
      if (!modalOpen) openModal("helpModal");
      return;
    }
    if (modalOpen) return;
    if (e.key.toLowerCase() === "m") {
      document.getElementById("btnMute").click();
    } else if (activeWorkout() && e.key === " ") {
      e.preventDefault();
      if (t.blur) t.blur();
      document
        .getElementById(wo.reps && wo.phase === "work" ? "btnDone" : "btnPause")
        .click();
    } else if (activeWorkout() && e.key === "ArrowRight") {
      e.preventDefault();
      document.getElementById("btnSkip").click();
    }
  });

  /* ---------- Init ---------- */
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
