/**
 * Workout Planner Core Logic (V3.1 Master)
 * Built by Chinmay Jha (chinmayjha.tech)
 */
(function () {
  "use strict";

  const SVG_VOL_ON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  const SVG_VOL_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="1" y2="23"></line><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  const SVG_REST = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>';

  /* ---------- Optimized Dynamic Icon Engine ---------- */
  const EQUIP_ICONS = {
    bodyweight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="4" height="10" rx="1"/><rect x="18" y="7" width="4" height="10" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/></svg>',
    barbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="22" y2="12"/><rect x="4" y="8" width="2" height="8" rx="1"/><rect x="18" y="8" width="2" height="8" rx="1"/><rect x="2" y="10" width="2" height="4" rx="1"/><rect x="20" y="10" width="2" height="4" rx="1"/></svg>',
    machine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/></svg>',
    cable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3"/><line x1="12" y1="9" x2="12" y2="22"/><path d="M8 22h8"/></svg>'
  };

  function getIcon(ex) { return EQUIP_ICONS[ex.equip] || EQUIP_ICONS.bodyweight; }

  const CAT_COLOR = { upper: "#8B7CFF", lower: "#00E5A0", core: "#FF6B4A", cardio: "#FFC55C", full: "#5CC8FF" };
  const CATS = [ ["all", "Target: All"], ["upper", "Upper"], ["lower", "Lower"], ["core", "Core"], ["cardio", "Cardio"], ["full", "Full Body"] ];
  const EQUIP = [ ["all", "Gear: All"], ["bodyweight", "Bodyweight"], ["dumbbell", "Dumbbell"], ["barbell", "Barbell"], ["machine", "Machine"], ["cable", "Cable"] ];

  /* ---------- The Comprehensive Gym Database ---------- */
  const EXERCISES = [
    // --- BARBELL ---
    { id: "bb_bench", name: "Barbell Bench Press", cat: "upper", equip: "barbell", type: "dynamic", cue: "Plant feet firmly, maintain a slight arch in your lower back. Lower to mid-chest.", time: 45, reps: 8, tts: "Barbell Bench Press" },
    { id: "bb_incline", name: "Incline Bench Press", cat: "upper", equip: "barbell", type: "dynamic", cue: "Lower the bar to your upper chest. Press back up without locking elbows.", time: 45, reps: 10, tts: "Incline Bench Press" },
    { id: "bb_ohp", name: "Overhead Press", cat: "upper", equip: "barbell", type: "dynamic", cue: "Squeeze glutes and core. Press bar straight up, clearing your face.", time: 45, reps: 8, tts: "Overhead Press" },
    { id: "bb_row", name: "Barbell Row", cat: "upper", equip: "barbell", type: "dynamic", cue: "Hinge at the hips keeping back flat. Pull the bar to your belly button.", time: 45, reps: 10, tts: "Barbell Row" },
    { id: "bb_squat", name: "Barbell Squat", cat: "lower", equip: "barbell", type: "dynamic", cue: "Chest up, core braced. Squat down until thighs are parallel to the floor.", time: 50, reps: 8, tts: "Barbell Squat" },
    { id: "bb_deadlift", name: "Deadlift", cat: "lower", equip: "barbell", type: "dynamic", cue: "Bar over mid-foot. Hinge hips, grab the bar, drive the floor away.", time: 50, reps: 5, tts: "Deadlift" },
    { id: "bb_rdl", name: "Romanian Deadlift", cat: "lower", equip: "barbell", type: "dynamic", cue: "Keep legs mostly straight. Push hips far back until you feel a hamstring stretch.", time: 45, reps: 10, tts: "Romanian Deadlift" },
    { id: "bb_hipthrust", name: "Hip Thrusts", cat: "lower", equip: "barbell", type: "dynamic", cue: "Drive through heels, squeeze glutes at the top. Keep chin tucked.", time: 45, reps: 12, tts: "Hip Thrusts" },
    { id: "bb_curl", name: "Barbell Bicep Curl", cat: "upper", equip: "barbell", type: "dynamic", cue: "Keep elbows pinned to your sides. Curl without using momentum.", time: 40, reps: 12, tts: "Barbell Bicep Curl" },
    
    // --- DUMBBELL ---
    { id: "db_bench", name: "Dumbbell Bench Press", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Lower dumbbells until you feel a deep stretch in your chest, push back up.", time: 45, reps: 10, tts: "Dumbbell Bench Press" },
    { id: "db_incline", name: "Incline DB Press", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Bench at 30 degrees. Squeeze chest at the top of the movement.", time: 45, reps: 10, tts: "Incline Dumbbell Press" },
    { id: "db_shoulder", name: "DB Shoulder Press", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Keep wrists stacked over elbows. Press straight up and together.", time: 40, reps: 10, tts: "Dumbbell Shoulder Press" },
    { id: "db_latraise", name: "Lateral Raises", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Slight bend in elbows. Raise arms out to the side like pouring water.", time: 40, reps: 15, tts: "Lateral Raises" },
    { id: "db_row", name: "Single Arm DB Row", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Pull dumbbell toward your hip. Keep your back parallel to the floor.", time: 45, reps: 12, tts: "Single Arm Row" },
    { id: "db_curl", name: "Dumbbell Curls", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Supinate your wrists as you curl up. Squeeze the bicep hard.", time: 40, reps: 12, tts: "Dumbbell Curls" },
    { id: "db_hammer", name: "Hammer Curls", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Keep palms facing each other. Lift straight up to target the brachialis.", time: 40, reps: 12, tts: "Hammer Curls" },
    { id: "db_tricep", name: "Overhead Tricep Ext", cat: "upper", equip: "dumbbell", type: "dynamic", cue: "Keep elbows pointed to the ceiling. Lower weight behind your head.", time: 40, reps: 12, tts: "Overhead Tricep Extension" },
    { id: "db_goblet", name: "Goblet Squat", cat: "lower", equip: "dumbbell", type: "dynamic", cue: "Hold weight vertically at chest. Drop elbows between your knees.", time: 45, reps: 12, tts: "Goblet Squat" },
    { id: "db_bulgarian", name: "Bulgarian Split Squat", cat: "lower", equip: "dumbbell", type: "dynamic", cue: "Rear foot elevated. Drop straight down to target quads and glutes.", time: 45, reps: 10, tts: "Bulgarian Split Squat" },
    { id: "db_lunge", name: "Walking Lunges", cat: "lower", equip: "dumbbell", type: "dynamic", cue: "Take long steps. Keep chest up and drop the back knee low.", time: 45, reps: 20, tts: "Walking Lunges" },

    // --- MACHINE ---
    { id: "mach_legpress", name: "Leg Press", cat: "lower", equip: "machine", type: "dynamic", cue: "Place feet shoulder width. Lower sled deep without your lower back rounding.", time: 45, reps: 12, tts: "Leg Press" },
    { id: "mach_legext", name: "Leg Extensions", cat: "lower", equip: "machine", type: "dynamic", cue: "Squeeze your quads at the top and hold for one second.", time: 40, reps: 15, tts: "Leg Extensions" },
    { id: "mach_legcurl", name: "Seated Leg Curl", cat: "lower", equip: "machine", type: "dynamic", cue: "Pull heels back as far as possible. Control the weight on the way up.", time: 40, reps: 15, tts: "Seated Leg Curl" },
    { id: "mach_chest", name: "Chest Press Machine", cat: "upper", equip: "machine", type: "dynamic", cue: "Keep back against the pad. Press handles away, squeezing the chest.", time: 40, reps: 12, tts: "Chest Press Machine" },
    { id: "mach_pecdeck", name: "Pec Deck Fly", cat: "upper", equip: "machine", type: "dynamic", cue: "Keep a slight bend in the elbow. Squeeze handles together like a hug.", time: 40, reps: 15, tts: "Pec Deck Fly" },
    { id: "mach_latpull", name: "Lat Pulldown", cat: "upper", equip: "machine", type: "dynamic", cue: "Lean back slightly. Drive your elbows down towards your back pockets.", time: 45, reps: 12, tts: "Lat Pulldown" },
    { id: "mach_seatedrow", name: "Seated Cable Row", cat: "upper", equip: "machine", type: "dynamic", cue: "Keep chest up and back straight. Squeeze shoulder blades together.", time: 45, reps: 12, tts: "Seated Cable Row" },

    // --- CABLE ---
    { id: "cab_pushdown", name: "Tricep Pushdown", cat: "upper", equip: "cable", type: "dynamic", cue: "Keep elbows glued to your ribs. Push the cable all the way down.", time: 40, reps: 15, tts: "Tricep Pushdown" },
    { id: "cab_facepull", name: "Face Pulls", cat: "upper", equip: "cable", type: "dynamic", cue: "Pull the rope towards your eyes, flaring elbows out to target rear delts.", time: 40, reps: 15, tts: "Face Pulls" },
    { id: "cab_crossover", name: "Cable Crossover", cat: "upper", equip: "cable", type: "dynamic", cue: "Step forward, slight bend in elbows. Bring cables together in front of your chest.", time: 40, reps: 15, tts: "Cable Crossover" },
    { id: "cab_crunch", name: "Cable Crunch", cat: "core", equip: "cable", type: "dynamic", cue: "Kneel down, hold rope behind neck. Crunch down, bringing elbows to knees.", time: 45, reps: 15, tts: "Cable Crunch" },
    { id: "cab_woodchop", name: "Cable Woodchoppers", cat: "core", equip: "cable", type: "dynamic", cue: "Keep arms mostly straight. Twist entirely from your torso to pull the weight.", time: 40, reps: 12, tts: "Cable Woodchoppers" },

    // --- BODYWEIGHT (Legacy + Cardio) ---
    { id: "pushup", name: "Push-Ups", cat: "upper", equip: "bodyweight", type: "dynamic", cue: "Keep a straight line from head to heels. Lower until your chest is just above the floor.", time: 40, reps: 15, tts: "Push ups" },
    { id: "diamondpushup", name: "Diamond Push-Ups", cat: "upper", equip: "bodyweight", type: "dynamic", cue: "Hands form a diamond under your chest. Keep elbows tight to target your triceps.", time: 35, reps: 12, tts: "Diamond Push ups" },
    { id: "pike", name: "Pike Push-Ups", cat: "upper", equip: "bodyweight", type: "dynamic", cue: "Keep your hips high in a V-shape. Lower the top of your head towards the floor.", time: 35, reps: 10, tts: "Pike Push ups" },
    { id: "tricepdip", name: "Tricep Dips", cat: "upper", equip: "bodyweight", type: "dynamic", cue: "Keep your back close to the bench. Lower until your elbows reach ninety degrees.", time: 35, reps: 15, tts: "Tricep Dips" },
    { id: "squat", name: "Bodyweight Squats", cat: "lower", equip: "bodyweight", type: "dynamic", cue: "Keep your chest up and drive through your heels. Squat as if sitting in a chair.", time: 45, reps: 20, tts: "Bodyweight Squats" },
    { id: "lunge", name: "Alternating Lunges", cat: "lower", equip: "bodyweight", type: "dynamic", cue: "Step forward and drop your back knee. Keep your front knee directly over your ankle.", time: 40, reps: 20, tts: "Alternating Lunges" },
    { id: "gluteb", name: "Glute Bridges", cat: "lower", equip: "bodyweight", type: "dynamic", cue: "Drive through your heels. Squeeze your glutes hard at the top of the movement.", time: 40, reps: 15, tts: "Glute Bridges" },
    { id: "calfraise", name: "Calf Raises", cat: "lower", equip: "bodyweight", type: "dynamic", cue: "Rise up onto your toes as high as you can. Lower down slowly and controlled.", time: 30, reps: 25, tts: "Calf Raises" },
    { id: "wallsit", name: "Wall Sit", cat: "lower", equip: "bodyweight", type: "hold", cue: "Press your back flat against the wall. Keep your thighs perfectly parallel to the floor.", time: 40, reps: 0, tts: "Wall Sit" },
    { id: "plank", name: "Forearm Plank", cat: "core", equip: "bodyweight", type: "hold", cue: "Keep your belly button pulled in tight. Maintain a straight line from shoulders to ankles.", time: 40, reps: 0, tts: "Forearm Plank" },
    { id: "hollowbody", name: "Hollow Body Hold", cat: "core", equip: "bodyweight", type: "hold", cue: "Keep your lower back completely glued to the floor. Extend arms and legs out tight.", time: 45, reps: 0, tts: "Hollow Body Hold" },
    { id: "crunch", name: "Crunches", cat: "core", equip: "bodyweight", type: "dynamic", cue: "Exhale as you curl your shoulders off the floor. Keep your neck relaxed and look up.", time: 35, reps: 20, tts: "Crunches" },
    { id: "russiantwist", name: "Russian Twists", cat: "core", equip: "bodyweight", type: "dynamic", cue: "Lean back slightly to engage your core. Rotate entirely from your torso.", time: 35, reps: 20, tts: "Russian Twists" },
    { id: "mountain", name: "Mountain Climbers", cat: "cardio", equip: "bodyweight", type: "dynamic", cue: "Drive your knees to your chest quickly. Keep your hips low and core engaged.", time: 30, reps: 30, tts: "Mountain Climbers" },
    { id: "burpee", name: "Burpees", cat: "cardio", equip: "bodyweight", type: "dynamic", cue: "Drop down, kick back, push up, and explode into a jump. Keep a steady rhythm.", time: 30, reps: 10, tts: "Burpees" }
  ];

  /* ---------- Global State ---------- */
  let state = {
    name: "", plan: [], rounds: 1, rest: 30, prep: 5, 
    audioAnnounce: true, audioForm: true, audioPacing: true, vibrate: true,
    stats: { workouts: 0, time: 0, calories: 0 },
    history: {}, // Format: 'YYYY-MM-DD': { workouts, time, cals }
    streak: { current: 0, max: 0, lastDate: null, savers: 0, progress: 0 }
  };
  let searchQuery = "";
  let activeCat = "all";
  let activeEquip = "all";
  let wo = { round: 1, idx: 0, phase: "idle", timeLeft: 0, phaseTotal: 0, elapsedPhase: 0, paused: false, elapsed: 0, timer: null, tick: null, isMuted: false, rpe: 'Light' };
  let wakeLock = null;

  const LS_KEY = "forge_state_v9";
  function loadState() { 
    try { 
      const raw = localStorage.getItem(LS_KEY); 
      if (raw) {
        Object.assign(state, JSON.parse(raw)); 
        if(state.streak && state.streak.progress === undefined) state.streak.progress = 0;
      }
    } catch (e) {} 
  }
  function saveState() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

  /* ---------- Timezone Saftey Fix ---------- */
  function getLocalDate(dateObj = new Date()) {
    const tzOffset = dateObj.getTimezoneOffset() * 60000;
    return new Date(dateObj.getTime() - tzOffset).toISOString().split('T')[0];
  }

  /* ---------- Utilities ---------- */
  function triggerShake(el) {
    el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 300);
  }
  function setThemeColor(hex) {
    const meta = document.getElementById('themeColorMeta');
    if (meta) meta.setAttribute('content', hex);
  }
  async function requestWakeLock() {
    if ('wakeLock' in navigator) { try { wakeLock = await navigator.wakeLock.request('screen'); } catch (err) {} }
  }
  function releaseWakeLock() { if (wakeLock !== null) { wakeLock.release().then(() => wakeLock = null); } }
  document.addEventListener('visibilitychange', async () => { if (wakeLock !== null && document.visibilityState === 'visible') requestWakeLock(); });

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m + ":" + String(s).padStart(2, "0");
  }
  function formatLifetimeTime(totalSeconds) {
    if (!totalSeconds) return '0s';
    if (totalSeconds < 60) return totalSeconds + 's';
    const h = Math.floor(totalSeconds / 3600), m = Math.floor((totalSeconds % 3600) / 60), s = totalSeconds % 60;
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
    document.getElementById("profileName").textContent = state.name || "Athlete";
    
    // Rank System
    const w = state.stats.workouts;
    let rank = "Novice";
    if (w >= 50) rank = "Elite";
    else if (w >= 25) rank = "Iron Athlete";
    else if (w >= 10) rank = "Intermediate";
    document.getElementById("profileRank").textContent = rank;

    document.getElementById("ltWorkoutsProf").textContent = state.stats.workouts;
    document.getElementById("ltTimeProf").textContent = formatLifetimeTime(state.stats.time);
    document.getElementById("ltCaloriesProf").textContent = state.stats.calories;

    document.getElementById("streakCurrent").textContent = state.streak.current;
    document.getElementById("streakMax").textContent = state.streak.max;
    
    const saversEl = document.getElementById("streakSavers");
    const saversLbl = document.getElementById("streakSaversLbl");
    saversEl.textContent = state.streak.savers + "/3";
    saversLbl.textContent = state.streak.savers >= 3 ? "Max Savers" : `Savers (${state.streak.progress}/5 to next)`;

    // 30-Day Heatmap
    const grid = document.getElementById("heatmapGrid");
    grid.innerHTML = "";
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = getLocalDate(d); 
      const data = state.history[ds];
      const lvl = data ? (data.workouts > 1 ? 2 : 1) : 0;
      
      const ttText = data ? `${data.workouts} workout${data.workouts>1?'s':''}<br>${formatTime(data.time)}` : "No Activity";
      grid.innerHTML += `<div class="hm-cell" data-lvl="${lvl}">
        <div class="hm-tooltip">${d.toLocaleDateString(undefined, {month:'short', day:'numeric'})}<br>${ttText}</div>
      </div>`;
    }
  }

  function updateLifetimeStats() {
    renderProfile();
  }

  function showTab(name) {
    if (name !== "workout" && wo.phase !== "idle" && wo.phase !== "complete") {
      const wasPaused = wo.paused;
      wo.paused = true;
      if (!confirm("You have a workout in progress. Are you sure you want to end it and return?")) { wo.paused = wasPaused; return; }
      quitWorkoutLogic();
    }
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + name));
    if (name === 'profile') renderProfile();
  }
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));

  /* ---------- Modals & Click-Away UX ---------- */
  function openModal(id) { 
    document.getElementById(id).style.display = "flex";
    setTimeout(() => { document.getElementById(id).classList.add("active"); document.body.classList.add("no-scroll"); }, 10);
  }
  function closeModal(id) { 
    document.getElementById(id).classList.remove("active"); document.body.classList.remove("no-scroll");
    setTimeout(() => { document.getElementById(id).style.display = "none"; }, 300);
  }
  
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay && (overlay.id !== "nameModal" || state.name)) closeModal(overlay.id); });
  });

  document.getElementById("btnOpenSettings").addEventListener("click", () => openModal("settingsModal"));
  document.querySelectorAll(".modal-close").forEach(btn => btn.addEventListener("click", function() { closeModal(this.closest('.modal-overlay').id); }));
  
  document.getElementById("btnEditName").addEventListener("click", () => {
    closeModal("settingsModal"); document.getElementById("nameInput").value = state.name; openModal("nameModal");
  });
  document.getElementById("btnSaveName").addEventListener("click", () => {
    const v = document.getElementById("nameInput").value.trim();
    if (!v) { document.getElementById("nameInput").style.borderColor = "var(--warn)"; return; }
    document.getElementById("nameInput").style.borderColor = "var(--line)";
    state.name = v; saveState(); updateGreeting(); renderProfile(); closeModal("nameModal");
  });
  
  document.getElementById("btnClearData").addEventListener("click", () => {
    if (confirm("DANGER: This will permanently delete your streak, history, and custom plans. Are you absolutely sure?")) {
      localStorage.removeItem(LS_KEY); window.location.reload();
    }
  });

  /* ---------- Video Glossary ---------- */
  document.getElementById("btnOpenResources").addEventListener("click", () => {
    const list = document.getElementById("glossaryList");
    list.innerHTML = EXERCISES.map(e => `
      <a href="https://www.youtube.com/results?search_query=how+to+do+perfect+${e.name.replace(/ /g, '+')}" target="_blank" rel="noopener" class="glossary-item hover-elevate">
        <div><strong>${e.name}</strong><div style="font-size:0.75rem; color:var(--muted)">${e.type === 'dynamic' ? 'Time & Reps' : 'Time Based'}</div></div>
        <div style="color:var(--accent)">Watch ↗</div>
      </a>`).join("");
    openModal("resourcesModal");
  });

  /* ---------- Plan & Library (Dual Filter) ---------- */
  function renderCats() {
    const catWrap = document.getElementById("catChips");
    catWrap.innerHTML = CATS.map(([id, label]) => `<button class="chip${id === activeCat ? " active" : ""}" data-cat="${id}">${label}</button>`).join("");
    catWrap.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => { activeCat = c.dataset.cat; renderCats(); renderLibrary(); }));

    const eqWrap = document.getElementById("equipChips");
    eqWrap.innerHTML = EQUIP.map(([id, label]) => `<button class="chip${id === activeEquip ? " active" : ""}" data-eq="${id}">${label}</button>`).join("");
    eqWrap.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => { activeEquip = c.dataset.eq; renderCats(); renderLibrary(); }));
  }

  function renderLibrary() {
    const list = EXERCISES.filter(e => {
      const matchCat = activeCat === "all" || e.cat === activeCat;
      const matchEq = activeEquip === "all" || e.equip === activeEquip;
      const matchSearch = e.name.toLowerCase().includes(searchQuery) || e.cue.toLowerCase().includes(searchQuery);
      return matchCat && matchEq && matchSearch;
    });

    document.getElementById("libraryList").innerHTML = list.map(e => {
      const inPlan = state.plan.some(p => p.id === e.id);
      return `<div class="ex-card ${inPlan ? "in-plan" : ""}">
        <div class="ex-icon" style="background:${CAT_COLOR[e.cat]}22;color:${CAT_COLOR[e.cat]}">${getIcon(e)}</div>
        <div class="ex-info"><h4>${e.name}</h4><p>${e.cue}</p></div>
        <button class="ex-add hover-elevate ${inPlan ? " added" : ""}" data-add="${e.id}">${inPlan ? "✓" : "+"}</button>
      </div>`;
    }).join("") || '<div class="empty-hint">No exercises found.</div>';

    document.getElementById("libraryList").querySelectorAll("[data-add]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.add, idx = state.plan.findIndex(p => p.id === id);
        if (idx > -1) state.plan.splice(idx, 1);
        else {
          if (state.plan.length >= 50) return triggerShake(btn.parentElement);
          const ex = EXERCISES.find(x => x.id === id);
          state.plan.push({ id, mode: ex.type === 'dynamic' ? 'reps' : 'time', time: ex.time, reps: ex.reps });
        }
        saveState(); renderLibrary(); renderPlan(); renderWorkoutIdle();
      });
    });
  }
  document.getElementById("searchInput").addEventListener("input", e => { searchQuery = e.target.value.toLowerCase(); renderLibrary(); });

  let dragSourceIdx = null;
  document.getElementById("btnClearPlan").addEventListener("click", () => { if (confirm("Clear current plan?")) { state.plan = []; saveState(); renderPlan(); renderLibrary(); renderWorkoutIdle(); } });
  document.getElementById("btnGoToWorkout").addEventListener("click", () => { showTab("workout"); window.scrollTo({ top: 0, behavior: "smooth" }); });

  function renderPlan() {
    document.getElementById("roundsVal").textContent = state.rounds;
    const list = document.getElementById("planList");
    document.getElementById("btnClearPlan").style.display = state.plan.length > 0 ? "inline-block" : "none";
    document.getElementById("planActions").style.display = state.plan.length > 0 ? "block" : "none";

    if (!state.plan.length) { list.innerHTML = '<div class="empty-hint">Add exercises above to build your workout.</div>'; return; }

    list.innerHTML = state.plan.map((p, i) => {
      const ex = EXERCISES.find(x => x.id === p.id);
      const valStr = p.mode === 'time' ? p.time + 's' : p.reps + 'x';
      const toggleHtml = ex.type === 'dynamic' ? `
        <div class="plan-mode-toggle" style="display:flex; background:var(--bg); border-radius:8px; overflow:hidden; margin:8px 0 0 54px; border:1px solid var(--line);">
          <button class="${p.mode==='time'?'active':''}" data-tg="time" data-idx="${i}" style="flex:1;font-size:0.75rem;padding:4px 10px;border:none;background:${p.mode==='time'?'var(--line)':'transparent'};color:${p.mode==='time'?'var(--text)':'var(--muted)'};font-weight:600;">Time</button>
          <button class="${p.mode==='reps'?'active':''}" data-tg="reps" data-idx="${i}" style="flex:1;font-size:0.75rem;padding:4px 10px;border:none;background:${p.mode==='reps'?'var(--line)':'transparent'};color:${p.mode==='reps'?'var(--text)':'var(--muted)'};font-weight:600;">Reps</button>
        </div>` : `<div class="plan-mode-toggle" style="display:flex; background:var(--bg); border-radius:8px; overflow:hidden; margin:8px 0 0 54px; border:1px solid var(--line);"><button style="flex:1;font-size:0.75rem;padding:4px 10px;border:none;background:var(--line);color:var(--text);font-weight:600;opacity:0.5;cursor:not-allowed;">Time Only</button></div>`;

      return `<div class="plan-card pop-in" draggable="true" data-idx="${i}" style="animation-delay: ${i * 0.03}s; display:block;">
        <div class="core-row" style="display:flex;align-items:center;gap:10px;width:100%;">
          <div class="ex-icon" style="width:38px;height:38px;flex:0 0 38px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${CAT_COLOR[ex.cat]}22;color:${CAT_COLOR[ex.cat]}">${getIcon(ex)}</div>
          <div class="ex-info" style="flex:1;min-width:0;"><h4 style="font-size:.88rem">${ex.name}</h4></div>
          <div class="plan-time-stepper">
            <button data-mod="-1" data-idx="${i}">−</button><span>${valStr}</span><button data-mod="1" data-idx="${i}">+</button>
          </div>
          <button class="plan-remove" data-remove="${i}">✕</button>
          <div class="drag-handle"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg></div>
        </div>
        ${toggleHtml}
      </div>`;
    }).join("");

    list.querySelectorAll("[data-mod]").forEach(btn => btn.addEventListener("click", () => {
      const i = +btn.dataset.idx, dir = +btn.dataset.mod;
      const p = state.plan[i];
      if (p.mode === 'time') {
        const next = p.time + (dir * 5);
        if (next < 5 || next > 300) return triggerShake(btn.parentElement);
        p.time = next;
      } else {
        const next = p.reps + dir;
        if (next < 1 || next > 100) return triggerShake(btn.parentElement);
        p.reps = next;
      }
      saveState(); renderPlan(); renderWorkoutIdle();
    }));

    list.querySelectorAll("[data-tg]").forEach(btn => btn.addEventListener("click", () => {
      state.plan[+btn.dataset.idx].mode = btn.dataset.tg;
      saveState(); renderPlan(); renderWorkoutIdle();
    }));

    list.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
      state.plan.splice(+btn.dataset.remove, 1); saveState(); renderPlan(); renderLibrary(); renderWorkoutIdle();
    }));

    const cards = list.querySelectorAll(".plan-card");
    cards.forEach(card => {
      card.addEventListener("dragstart", function(e) { dragSourceIdx = +this.dataset.idx; this.style.opacity = 0.4; e.dataTransfer.effectAllowed = "move"; });
      card.addEventListener("dragover", function(e) { e.preventDefault(); return false; });
      card.addEventListener("dragenter", function() { if (+this.dataset.idx !== dragSourceIdx) this.style.borderTop = "2px solid var(--accent)"; });
      card.addEventListener("dragleave", function() { this.style.borderTop = "none"; });
      card.addEventListener("drop", function(e) { e.stopPropagation(); const trg = +this.dataset.idx; if (dragSourceIdx !== null && dragSourceIdx !== trg) { const item = state.plan.splice(dragSourceIdx, 1)[0]; state.plan.splice(trg, 0, item); saveState(); renderPlan(); } return false; });
      card.addEventListener("dragend", function() { this.style.opacity = 1; cards.forEach(c => c.style.borderTop = "none"); dragSourceIdx = null; });
    });
  }

  /* ---------- Settings & Audio Control ---------- */
  function renderSettings() {
    document.getElementById("restVal").textContent = state.rest + "s";
    document.getElementById("prepVal").textContent = state.prep + "s";
    document.getElementById("toggleAnnounce").classList.toggle("on", state.audioAnnounce);
    document.getElementById("toggleForm").classList.toggle("on", state.audioForm);
    document.getElementById("togglePacing").classList.toggle("on", state.audioPacing);
    document.getElementById("toggleVibrate").classList.toggle("on", state.vibrate);
  }
  
  document.querySelectorAll("[data-step]").forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.step, d = +btn.dataset.d; let next;
    if (key === "rounds") { next = state.rounds + d; if(next < 1 || next > 20) return triggerShake(btn.parentElement); state.rounds = next; }
    if (key === "rest") { next = state.rest + d; if(next < 0 || next > 180) return triggerShake(btn.parentElement); state.rest = next; }
    if (key === "prep") { next = state.prep + d; if(next < 0 || next > 30) return triggerShake(btn.parentElement); state.prep = next; }
    saveState(); renderSettings(); renderPlan(); renderWorkoutIdle();
  }));
  
  document.getElementById("toggleAnnounce").addEventListener("click", () => { state.audioAnnounce = !state.audioAnnounce; saveState(); renderSettings(); });
  document.getElementById("toggleForm").addEventListener("click", () => { state.audioForm = !state.audioForm; saveState(); renderSettings(); });
  document.getElementById("togglePacing").addEventListener("click", () => { state.audioPacing = !state.audioPacing; saveState(); renderSettings(); });
  document.getElementById("toggleVibrate").addEventListener("click", () => { state.vibrate = !state.vibrate; saveState(); renderSettings(); });

  let audioCtx = null;
  function beep(freq, dur) {
    if (!state.audioPacing || wo.isMuted) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(freq, audioCtx.currentTime);
      g.gain.setValueAtTime(0.8, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }
  function vibrate(pattern) { if (state.vibrate && navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} } }
  function speakCue(type, text) {
    if (wo.isMuted || !("speechSynthesis" in window)) return;
    if (type === 'announce' && !state.audioAnnounce) return;
    if (type === 'form' && !state.audioForm) return;
    if (type === 'pacing' && !state.audioPacing) return;
    
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.05; msg.pitch = 1.0;
    window.speechSynthesis.speak(msg);
  }
  
  document.getElementById("btnMuteActive").addEventListener("click", () => {
    wo.isMuted = !wo.isMuted;
    document.getElementById("btnMuteActive").innerHTML = wo.isMuted ? SVG_VOL_OFF : SVG_VOL_ON;
    if (wo.isMuted) window.speechSynthesis.cancel();
  });

  /* ---------- Workout Engine ---------- */
  function estTotalSeconds() {
    let work = 0;
    state.plan.forEach(p => { work += p.mode === 'time' ? p.time : (p.reps * 3); }); // Est 3s per rep
    const rest = state.plan.length > 1 ? (state.plan.length - 1) * state.rest : 0;
    const restBetweenRounds = state.rounds > 1 ? state.rest * (state.rounds - 1) : 0;
    return (work + rest) * state.rounds + restBetweenRounds;
  }
  function estCalories() {
    let cals = 0; const rates = { cardio: 10, full: 9, lower: 8, upper: 6, core: 5 };
    state.plan.forEach(p => {
      const ex = EXERCISES.find(x => x.id === p.id);
      const estTime = p.mode === 'time' ? p.time : (p.reps * 3);
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
      document.getElementById("sumCals").innerHTML = estCalories() + ' <span style="font-size:0.6em;color:var(--muted)">kcal</span>';
      document.getElementById("sumTime").textContent = formatTime(estTotalSeconds());
    }
  }

  function setWoState(name) {
    document.querySelectorAll(".wo-state").forEach(el => el.classList.remove("active"));
    document.getElementById("wo-" + name).classList.add("active");
    wo.phase = name;
  }

  function startWorkout() {
    if (!state.plan.length) return;
    wo = { round: 1, idx: 0, phase: "prep", timeLeft: state.prep, phaseTotal: Math.max(state.prep, 1), elapsedPhase: 0, paused: false, elapsed: 0, timer: null, tick: null, isMuted: false, rpe: 'Light' };
    document.getElementById("btnMuteActive").innerHTML = SVG_VOL_ON;
    if (state.audioPacing && !audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume(); } catch (e) {} }

    requestWakeLock(); setThemeColor("#8B7CFF");
    document.getElementById("activeControls").style.display = "none";
    document.getElementById("btnRepsDone").style.display = "none";
    document.getElementById("bigTimer").textContent = state.prep;
    document.getElementById("activeName").textContent = "Get Ready";
    
    const ex = EXERCISES.find(x => x.id === state.plan[0].id) || {};
    const val = state.plan[0].mode === 'reps' ? state.plan[0].reps + " Reps" : "";
    document.getElementById("activeCue").textContent = "First up: " + val + " " + ex.name;
    
    speakCue('announce', "Let's get to work, " + (state.name || "Athlete") + ". First up, " + (state.plan[0].mode === 'reps' ? state.plan[0].reps : "") + " " + ex.tts);

    document.getElementById("phaseTag").textContent = "STARTING";
    document.getElementById("phaseTag").style.color = "var(--accent)";
    document.getElementById("roundTag").textContent = "ROUND 1/" + state.rounds;
    document.getElementById("exVisual").innerHTML = "";
    document.getElementById("exVisual").classList.remove("pulse-alert");

    setWoState("active");
    wo.tick = setInterval(() => { if (!wo.paused) wo.elapsed++; }, 1000);
    runPhaseTimer();
  }

  function loadPhaseUI() {
    const p = state.plan[wo.idx];
    const ex = EXERCISES.find(x => x.id === p.id);
    document.getElementById("roundTag").textContent = "ROUND " + wo.round + "/" + state.rounds;
    document.getElementById("exVisual").classList.remove("pulse-alert");
    wo.elapsedPhase = 0;

    if (wo.phase === "work") {
      setThemeColor("#FF6B4A");
      wo.timeLeft = p.mode === 'time' ? p.time : 0;
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
      
      if (p.mode === 'reps') {
        document.getElementById("btnRepsDone").style.display = "block";
        document.getElementById("progressFill").style.width = "100%";
        document.getElementById("progressFill").classList.remove("glow");
      } else {
        document.getElementById("btnRepsDone").style.display = "none";
        document.getElementById("progressFill").classList.add("glow");
      }
      
      speakCue('announce', (p.mode === 'reps' ? p.reps + " " : "") + ex.tts);
      setTimeout(() => speakCue('form', ex.cue), 2500);

    } else if (wo.phase === "rest") {
      setThemeColor("#00E5A0");
      wo.timeLeft = state.rest; wo.phaseTotal = Math.max(state.rest, 1);
      document.getElementById("phaseTag").textContent = "REST";
      document.getElementById("phaseTag").style.color = "var(--accent2)";
      document.getElementById("bigTimer").style.color = "var(--accent2)";
      document.getElementById("progressFill").style.background = "var(--accent2)";
      document.getElementById("progressFill").classList.remove("glow");
      document.getElementById("activeName").textContent = "Breathe";
      
      const val = p.mode === 'reps' ? p.reps + " " : "";
      document.getElementById("activeCue").textContent = "Up next: " + val + ex.name;
      document.getElementById("exVisual").innerHTML = SVG_REST;
      document.getElementById("exVisual").style.color = "var(--accent2)";
      
      document.getElementById("activeControls").style.display = "grid";
      document.getElementById("btnRepsDone").style.display = "none";
      document.getElementById("btnAddRest").style.opacity = "1";
      document.getElementById("btnAddRest").disabled = false;
      
      speakCue('announce', "Rest. Up next, " + val + ex.tts);
    }
    
    document.getElementById("bigTimer").textContent = p.mode === 'reps' && wo.phase === 'work' ? "0:00" : wo.timeLeft;
    if(p.mode !== 'reps' || wo.phase !== 'work') updateProgress();
  }

  function updateProgress() { document.getElementById("progressFill").style.width = (wo.phaseTotal > 0 ? (wo.timeLeft / wo.phaseTotal) * 100 : 0) + "%"; }

  function runPhaseTimer() {
    clearInterval(wo.timer);
    wo.timer = setInterval(() => {
      if (wo.paused) return;
      wo.elapsedPhase++;
      
      const p = wo.phase === 'work' ? state.plan[wo.idx] : null;
      const isReps = p && p.mode === 'reps';

      if (isReps) {
        document.getElementById("bigTimer").textContent = formatTime(wo.elapsedPhase);
      } else {
        wo.timeLeft--;
        document.getElementById("bigTimer").textContent = Math.max(0, wo.timeLeft);
        updateProgress();

        const visual = document.getElementById("exVisual");
        
        // Halfway Cue
        if (wo.phase === 'work' && wo.phaseTotal >= 20 && wo.timeLeft === Math.floor(wo.phaseTotal / 2)) {
          speakCue('pacing', "Halfway there.");
        }

        if (wo.timeLeft > 0 && wo.timeLeft <= 3) {
          beep(600, 0.15); vibrate([100, 50, 100]);
          if (wo.phase === "work" && !visual.classList.contains("pulse-alert")) visual.classList.add("pulse-alert");
        }
        if (wo.timeLeft <= 0) {
          beep(820, 0.5); vibrate([150, 60, 150]);
          visual.classList.remove("pulse-alert");
          advancePhase();
        }
      }
    }, 1000);
  }

  function advancePhase() {
    if (wo.phase === "prep") { wo.phase = "work"; loadPhaseUI(); return; }
    if (wo.phase === "work") {
      if (wo.idx === state.plan.length - 1) {
        if (wo.round === state.rounds) { triggerCompletion(true); return; }
        wo.round++; wo.idx = 0; wo.phase = "rest";
      } else { wo.idx++; wo.phase = "rest"; }
    } else { wo.phase = "work"; }
    loadPhaseUI();
  }

  /* ---------- Anti-Cheat Streak & Completion Engine ---------- */
  function processStreak() {
    const today = getLocalDate(); 
    let newDay = false;
    
    if (state.streak.lastDate) {
      const last = new Date(state.streak.lastDate);
      const curr = new Date(today);
      const diff = Math.floor((curr - last) / 86400000);
      
      if (diff === 1) { 
        state.streak.current++; 
        newDay = true;
      } else if (diff > 1) {
        const missed = diff - 1;
        if (state.streak.savers >= missed) {
          state.streak.savers -= missed; 
          state.streak.current++;
          newDay = true;
        } else { 
          // Streak Broken! Reset current, savers, AND saver progress.
          state.streak.current = 1; 
          state.streak.savers = 0;
          state.streak.progress = 0; 
          newDay = true;
        }
      } else if (diff < 0) {
        state.streak.lastDate = today; // Time travel safety
      }
    } else { 
      state.streak.current = 1; 
      newDay = true;
    }
    
    state.streak.lastDate = today;
    if (state.streak.current > state.streak.max) state.streak.max = state.streak.current;

    // Gain saver progress for EVERY meaningful workout completed
    if (state.streak.savers < 3) {
      state.streak.progress++;
      if (state.streak.progress >= 5) {
        state.streak.savers++;
        state.streak.progress = 0;
      }
    }
  }

  function triggerCompletion(fullComplete) {
    clearInterval(wo.timer); clearInterval(wo.tick);
    releaseWakeLock(); setThemeColor("#0A0A0F"); window.speechSynthesis.cancel();
    
    // Anti-Cheat: Workout must be at least 60 seconds to count towards Streaks/Savers
    const isMeaningful = wo.elapsed >= 60; 

    if (wo.elapsed > 0) {
      state.stats.workouts++;
      state.stats.time += wo.elapsed;
      const earnedCals = Math.round((wo.elapsed / Math.max(estTotalSeconds(), 1)) * estCalories());
      state.stats.calories += earnedCals;
      
      // History Log 
      const today = getLocalDate();
      if (!state.history[today]) state.history[today] = { workouts: 0, time: 0, calories: 0 };
      state.history[today].workouts++;
      state.history[today].time += wo.elapsed;
      state.history[today].calories += earnedCals;
      
      // Process Streaks only if they actually worked out for real
      if (isMeaningful) {
        processStreak();
      }
      
      saveState(); updateLifetimeStats();
    }
    
    document.getElementById("statTime").textContent = formatTime(wo.elapsed);
    if (!fullComplete) {
      document.getElementById("completeTitle").textContent = "Session Ended Early";
      document.getElementById("completeSub").textContent = isMeaningful ? "Stats safely recorded." : "Session too short to count towards streaks.";
    } else {
      document.getElementById("completeTitle").textContent = "Workout Complete";
      document.getElementById("completeSub").textContent = state.plan.length + " exercises · " + state.rounds + " round" + (state.rounds > 1 ? "s" : "");
      speakCue('announce', "Workout complete. Great job, " + (state.name || "Athlete"));
      if (isMeaningful) fireConfetti(); 
    }

    openModal("rpeModal");
  }

  document.querySelectorAll('.rpe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wo.rpe = btn.dataset.rpe; closeModal('rpeModal'); setWoState('complete');
    });
  });

  document.getElementById("btnPause").addEventListener("click", () => {
    wo.paused = !wo.paused; document.getElementById("btnPause").textContent = wo.paused ? "Resume (Space)" : "Pause (Space)";
  });
  document.getElementById("btnAddRest").addEventListener("click", () => {
    if (wo.phase === "rest" && !wo.paused) { wo.timeLeft += 15; wo.phaseTotal += 15; document.getElementById("bigTimer").textContent = wo.timeLeft; updateProgress(); beep(420, 0.12); }
  });
  document.getElementById("btnSkip").addEventListener("click", () => {
    if (wo.phase === "idle" || wo.phase === "complete") return;
    wo.paused = false; document.getElementById("btnPause").textContent = "Pause (Space)"; window.speechSynthesis.cancel(); beep(400, 0.1);
    clearInterval(wo.timer); advancePhase(); runPhaseTimer();
  });
  document.getElementById("btnRepsDone").addEventListener("click", () => {
    if (wo.phase === "work" && state.plan[wo.idx].mode === 'reps') { beep(820, 0.5); vibrate([150, 60, 150]); advancePhase(); }
  });
  document.getElementById("btnQuit").addEventListener("click", () => { if (confirm
