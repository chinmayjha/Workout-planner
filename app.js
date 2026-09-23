(function(){
"use strict";

/* ---------- Icons & Audio SVGs ---------- */
const SVG_VOL_ON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
const SVG_VOL_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="1" y2="23"></line><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';

const EX_ICONS = {
  // Upper
  'pushup': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-3 4"/></svg>',
  'diamondpushup': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="7" r="2.5"/><path d="M4 18l5-3 4 1 5-4M14 15l-2 4M14 15h2"/></svg>',
  'pike': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="2.5"/><path d="M5 22l7-10 7 10M12 8v4"/></svg>',
  'tricepdip': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-4 4M12 13l4 4M8 17h8M7 12h3"/></svg>',
  'plankshoulder': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4M13 15c-1-3 1-5 4-5"/></svg>',
  // Lower
  'squat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-3 4M12 13l4 5M8 22h2M14 22h2M12 8H7"/></svg>',
  'lunge': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 18h-3M12 8h-4"/></svg>',
  'bulgariansplit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-5 4M12 14l6 4M7 18h3M18 14v4M12 8h-4"/></svg>',
  'gluteb': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2.5"/><path d="M8 18l5-6 6 6M13 12v6"/></svg>',
  'calfraise': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3" r="2.5"/><path d="M12 6v8l-3 6M12 14l3 6M8 20h2M14 20h2M12 6H7"/></svg>',
  'wallsit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="7" r="2.5"/><path d="M6 10v6h6v6M6 10h5M2 2v20"/></svg>',
  // Core
  'plank': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="9" r="2.5"/><path d="M3 18l6-2 5-1 4-3M13 15l-2 4"/></svg>',
  'hollowbody': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="15" r="2.5"/><path d="M3 12c4 4 10 4 14 0M10 15l-4-6"/></svg>',
  'crunch': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="12" r="2.5"/><path d="M4 18l6-1 4-3 1-3M14 14l-3 4"/></svg>',
  'russiantwist': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="2.5"/><path d="M4 18l8-4 8 4M12 14l-3-4M12 14l3-4"/></svg>',
  'legraise': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="18" r="2.5"/><path d="M4 10l8 8 5-1M12 18V6"/></svg>',
  // Cardio
  'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="8" r="2.5"/><path d="M3 19l5-3 4-2 4-3M12 14l-4 5"/></svg>',
  'jj': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v5l-5 6M12 13l5 6M12 8L6 4M12 8l6-4"/></svg>',
  'skaters': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="6" r="2.5"/><path d="M14 9l-4 4 2 5M10 13l-4 2M14 9l4 2M6 18c2-2 4-2 6 0"/></svg>',
  'highknees': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v6M12 13l-4 4v4M12 13l4-4M12 7H8M12 7h4"/></svg>',
  'burpee': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v5l-4 4M12 12l4 4M8 20h8M12 7L8 4M12 7l4-3"/></svg>',
  // Full
  'jumpsquat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 7v7l-4 5M12 14l4 5M12 7H7M12 7h5"/></svg>',
  'sprawls': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="2.5"/><path d="M4 6l4 8 4 1M12 15l4-8"/></svg>',
  'bearcrawl': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="14" r="2.5"/><path d="M4 18l4-4 6-2 4 4M14 12l-2 6M10 14l-2 4"/></svg>',
  'inchworm': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="2.5"/><path d="M4 18l5-8 5 5 4-2"/></svg>'
};
function getIcon(ex) { return EX_ICONS[ex.id] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/></svg>'; }

const CAT_COLOR = {upper:'#8B7CFF',lower:'#00E5A0',core:'#FF6B4A',cardio:'#FFC55C',full:'#5CC8FF'};
const CATS = [['all','All'],['upper','Upper'],['lower','Lower'],['core','Core'],['cardio','Cardio'],['full','Full Body']];
const EXERCISES = [
  {id:'pushup',name:'Push-Ups',cat:'upper',cue:'Straight line, elbows at 45 degrees.',time:40, tts:'Push ups'},
  {id:'diamondpushup', name:'Diamond Push-Ups', cat:'upper', cue:'Hands form a diamond, target triceps.', time:35, tts:'Diamond Push ups'},
  {id:'pike',name:'Pike Push-Ups',cat:'upper',cue:'Hips high, target shoulders.',time:35, tts:'Pike Push ups'},
  {id:'tricepdip',name:'Tricep Dips',cat:'upper',cue:'Elbows close, controlled.',time:35, tts:'Tricep Dips'},
  {id:'plankshoulder',name:'Plank Shoulder Taps',cat:'upper',cue:'Hips stay still.',time:30, tts:'Plank Shoulder Taps'},
  {id:'squat',name:'Bodyweight Squats',cat:'lower',cue:'Chest up, knees track toes.',time:45, tts:'Bodyweight Squats'},
  {id:'lunge',name:'Alternating Lunges',cat:'lower',cue:'Front knee over ankle.',time:40, tts:'Alternating Lunges'},
  {id:'bulgariansplit', name:'Bulgarian Split Squats', cat:'lower', cue:'Back foot elevated, drop straight down.', time:40, tts:'Bulgarian Split Squats'},
  {id:'gluteb',name:'Glute Bridges',cat:'lower',cue:'Squeeze glutes at the top.',time:40, tts:'Glute Bridges'},
  {id:'calfraise',name:'Calf Raises',cat:'lower',cue:'Slow and controlled.',time:30, tts:'Calf Raises'},
  {id:'wallsit',name:'Wall Sit',cat:'lower',cue:'Thighs parallel to floor.',time:40, tts:'Wall Sit'},
  {id:'plank',name:'Forearm Plank',cat:'core',cue:'Belly button to spine.',time:40, tts:'Forearm Plank'},
  {id:'hollowbody', name:'Hollow Body Hold', cat:'core', cue:'Lower back glued to the floor.', time:45, tts:'Hollow Body Hold'},
  {id:'crunch',name:'Crunches',cat:'core',cue:'Exhale as you curl up.',time:35, tts:'Crunches'},
  {id:'russiantwist',name:'Russian Twists',cat:'core',cue:'Rotate from the torso.',time:35, tts:'Russian Twists'},
  {id:'legraise',name:'Leg Raises',cat:'core',cue:'Lower back stays flat.',time:35, tts:'Leg Raises'},
  {id:'mountain',name:'Mountain Climbers',cat:'cardio',cue:'Drive knees fast.',time:30, tts:'Mountain Climbers'},
  {id:'jj',name:'Jumping Jacks',cat:'cardio',cue:'Full range, steady pace.',time:35, tts:'Jumping Jacks'},
  {id:'skaters', name:'Ice Skaters', cat:'cardio', cue:'Leap side to side, balance on landing.', time:30, tts:'Ice Skaters'},
  {id:'highknees',name:'High Knees',cat:'cardio',cue:'Pump arms, stay light.',time:30, tts:'High Knees'},
  {id:'burpee',name:'Burpees',cat:'cardio',cue:'Explosive, controlled landing.',time:30, tts:'Burpees'},
  {id:'jumpsquat',name:'Jump Squats',cat:'full',cue:'Soft landing, full extension.',time:30, tts:'Jump Squats'},
  {id:'sprawls', name:'Sprawls', cat:'full', cue:'Drop hips to floor, explode up.', time:30, tts:'Sprawls'},
  {id:'bearcrawl',name:'Bear Crawl',cat:'full',cue:'Knees hover, core tight.',time:30, tts:'Bear Crawl'},
  {id:'inchworm',name:'Inchworms',cat:'full',cue:'Walk hands out slowly.',time:35, tts:'Inchworms'}
];

/* ---------- State ---------- */
let state = {name:'',plan:[],rounds:1,rest:30,prep:5,sound:true,vibrate:true,reminderOn:false,reminderTime:'18:00'};
let searchQuery = '';
const LS_KEY = 'forge_state_v5';
function loadState(){ try{ const raw = localStorage.getItem(LS_KEY); if(raw) state = Object.assign(state, JSON.parse(raw)); }catch(e){} }
function saveState(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); }catch(e){} }

/* ---------- Tabs / modals ---------- */
function showTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===name));
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p.id==='page-'+name));
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.tab)));
function openModal(id){ document.getElementById(id).classList.add('active'); }
function closeModal(id){ document.getElementById(id).classList.remove('active'); }
document.getElementById('btnOpenSettings').addEventListener('click',()=>openModal('settingsModal'));
document.getElementById('btnCloseSettings').addEventListener('click',()=>closeModal('settingsModal'));
document.getElementById('btnEditName').addEventListener('click',()=>{ closeModal('settingsModal'); document.getElementById('nameInput').value=state.name; openModal('nameModal'); });
document.getElementById('btnSaveName').addEventListener('click',()=>{
  const val = document.getElementById('nameInput').value.trim();
  state.name = val || 'Athlete'; saveState();
  closeModal('nameModal');
});

/* ---------- Library & Search ---------- */
let activeCat = 'all';
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderLibrary();
});

function renderCats(){
  const wrap = document.getElementById('catChips');
  wrap.innerHTML = CATS.map(([id,label])=>`<button class="chip${id===activeCat?' active':''}" data-cat="${id}">${label}</button>`).join('');
  wrap.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{activeCat=c.dataset.cat; renderCats(); renderLibrary();}));
}

function renderLibrary(){
  const list = EXERCISES.filter(e => {
    const matchCat = activeCat === 'all' || e.cat === activeCat;
    const matchSearch = e.name.toLowerCase().includes(searchQuery) || e.cue.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
  
  document.getElementById('libraryList').innerHTML = list.map(e=>{
    const inPlan = state.plan.some(p=>p.id===e.id);
    return `<div class="ex-card">
      <div class="ex-icon" style="background:${CAT_COLOR[e.cat]}22;color:${CAT_COLOR[e.cat]}">${getIcon(e)}</div>
      <div class="ex-info"><h4>${e.name}</h4><p>${e.cue}</p></div>
      <button class="ex-add hover-elevate ${inPlan?' added':''}" data-add="${e.id}">${inPlan?'✓':'+'}</button>
    </div>`;
  }).join('') || '<div class="empty-hint">No exercises found.</div>';
  
  document.getElementById('libraryList').querySelectorAll('[data-add]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.dataset.add;
      const idx = state.plan.findIndex(p=>p.id===id);
      if(idx>-1){ state.plan.splice(idx,1); } else { const ex = EXERCISES.find(x=>x.id===id); state.plan.push({id, time: ex.time}); }
      saveState(); renderLibrary(); renderPlan(); renderWorkoutIdle();
    });
  });
}

/* ---------- Plan & Drag-n-Drop ---------- */
let dragSourceIdx = null;

// New Clear All Functionality
document.getElementById('btnClearPlan').addEventListener('click', () => {
    if(confirm("Are you sure you want to clear your current plan?")) {
        state.plan = [];
        saveState(); renderPlan(); renderLibrary(); renderWorkoutIdle();
    }
});

// New Go To Workout Functionality
document.getElementById('btnGoToWorkout').addEventListener('click', () => {
    showTab('workout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function renderPlan(){
  document.getElementById('roundsVal').textContent = state.rounds;
  const list = document.getElementById('planList');
  const clearBtn = document.getElementById('btnClearPlan');
  const actionBtn = document.getElementById('planActions');
  
  clearBtn.style.display = state.plan.length > 0 ? 'inline-block' : 'none';
  actionBtn.style.display = state.plan.length > 0 ? 'block' : 'none';

  if(!state.plan.length){ 
      list.innerHTML = '<div class="empty-hint">Add exercises above to build your workout.</div>'; 
      return; 
  }
  
  // Notice pop-in animation on re-render to make interactions feel alive
  list.innerHTML = state.plan.map((p,i)=>{
    const ex = EXERCISES.find(x=>x.id===p.id);
    return `<div class="plan-card pop-in" draggable="true" data-idx="${i}" style="animation-delay: ${i * 0.03}s">
      <div class="ex-icon" style="width:38px;height:38px;flex:0 0 38px;background:${CAT_COLOR[ex.cat]}22;color:${CAT_COLOR[ex.cat]}">${getIcon(ex)}</div>
      <div class="ex-info"><h4 style="font-size:.88rem">${ex.name}</h4></div>
      
      <div class="plan-time-stepper">
        <button data-mod="-5" data-idx="${i}">−</button>
        <span>${p.time}s</span>
        <button data-mod="5" data-idx="${i}">+</button>
      </div>

      <button class="plan-remove" data-remove="${i}">✕</button>
      <div class="drag-handle">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
      </div>
    </div>`;
  }).join('');
  
  // Time Stepper logic
  list.querySelectorAll('[data-mod]').forEach(btn=>btn.addEventListener('click',(e)=>{
    const i = +btn.dataset.idx, mod = +btn.dataset.mod;
    state.plan[i].time = Math.max(5, Math.min(300, state.plan[i].time + mod));
    saveState(); renderPlan(); renderWorkoutIdle();
  }));

  // Remove logic
  list.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>{
    state.plan.splice(+btn.dataset.remove,1); saveState(); renderPlan(); renderLibrary(); renderWorkoutIdle();
  }));

  // HTML5 Drag and Drop Handlers
  const cards = list.querySelectorAll('.plan-card');
  cards.forEach(card => {
    card.addEventListener('dragstart', function(e) {
      dragSourceIdx = +this.dataset.idx;
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragSourceIdx);
    });
    
    card.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    });
    
    card.addEventListener('dragenter', function(e) {
      if (+this.dataset.idx !== dragSourceIdx) this.classList.add('drag-over');
    });
    
    card.addEventListener('dragleave', function(e) {
      this.classList.remove('drag-over');
    });
    
    card.addEventListener('drop', function(e) {
      e.stopPropagation();
      const dropTargetIdx = +this.dataset.idx;
      if (dragSourceIdx !== null && dragSourceIdx !== dropTargetIdx) {
        const item = state.plan.splice(dragSourceIdx, 1)[0];
        state.plan.splice(dropTargetIdx, 0, item);
        saveState(); renderPlan();
      }
      return false;
    });
    
    card.addEventListener('dragend', function(e) {
      this.classList.remove('dragging');
      cards.forEach(c => c.classList.remove('drag-over'));
      dragSourceIdx = null;
    });
  });
}

/* ---------- Settings ---------- */
function updateAudioIcon() {
  const btn = document.getElementById('btnMute');
  btn.innerHTML = state.sound ? SVG_VOL_ON : SVG_VOL_OFF;
}

function renderSettings(){
  document.getElementById('restVal').textContent = state.rest+'s';
  document.getElementById('prepVal').textContent = state.prep+'s';
  document.getElementById('toggleSound').classList.toggle('on', state.sound);
  document.getElementById('toggleVibrate').classList.toggle('on', state.vibrate);
  document.getElementById('toggleReminder').classList.toggle('on', state.reminderOn);
  document.getElementById('reminderTimeWrap').style.display = state.reminderOn ? 'block' : 'none';
  document.getElementById('reminderTime').value = state.reminderTime;
  updateAudioIcon();
}
document.querySelectorAll('[data-step]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const key = btn.dataset.step, d = +btn.dataset.d;
    if(key==='rounds') state.rounds = Math.max(1, Math.min(20, state.rounds+d));
    if(key==='rest') state.rest = Math.max(0, Math.min(180, state.rest+d));
    if(key==='prep') state.prep = Math.max(0, Math.min(30, state.prep+d));
    saveState(); renderSettings(); renderPlan(); renderWorkoutIdle();
  });
});
document.getElementById('toggleSound').addEventListener('click',()=>{state.sound=!state.sound; saveState(); renderSettings();});
document.getElementById('toggleVibrate').addEventListener('click',()=>{state.vibrate=!state.vibrate; saveState(); renderSettings();});
document.getElementById('toggleReminder').addEventListener('click', async ()=>{
  if(!state.reminderOn){
    if('Notification' in window){
      try{ const perm = await Notification.requestPermission(); if(perm!=='granted'){ document.getElementById('notifDesc').textContent='Permission denied — enable in browser settings.'; return; } }
      catch(e){ document.getElementById('notifDesc').textContent='Notifications unavailable here.'; return; }
    } else { document.getElementById('notifDesc').textContent='Not supported in this browser.'; return; }
  }
  state.reminderOn = !state.reminderOn; saveState(); renderSettings();
});
document.getElementById('reminderTime').addEventListener('change', e=>{ state.reminderTime = e.target.value; saveState(); });

/* ---------- Sound, Voice & Haptics ---------- */
let audioCtx = null;
function beep(freq, dur){
  if(!state.sound) return;
  try{
    if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type='sine'; o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    g.gain.setValueAtTime(0.8, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+dur);
    o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+dur);
  }catch(e){}
}
function vibrate(pattern){ if(state.vibrate && navigator.vibrate){ try{ navigator.vibrate(pattern); }catch(e){} } }
function speakCue(text) {
  if(!state.sound || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.05; msg.pitch = 1.0;
  window.speechSynthesis.speak(msg);
}
document.getElementById('btnMute').addEventListener('click',(e)=>{ 
  state.sound = !state.sound; 
  saveState(); 
  updateAudioIcon(); 
});

/* ---------- Workout Engine ---------- */
let wo = {};
function estTotalSeconds(){
  const work = state.plan.reduce((s,p)=>s+p.time,0);
  const rest = state.plan.length>1 ? (state.plan.length-1)*state.rest : 0;
  const restBetweenRounds = state.rounds>1 ? state.rest*(state.rounds-1) : 0;
  return (work+rest)*state.rounds + restBetweenRounds;
}

// Lightweight Caloric Algorithm (Est. Calories burned)
function estCalories() {
    let cals = 0;
    // Approximated MET values mapped to rough Cals/Min for average person
    const rates = { cardio: 10, full: 9, lower: 8, upper: 6, core: 5 }; 
    state.plan.forEach(p => {
        const ex = EXERCISES.find(x => x.id === p.id);
        const rate = rates[ex.cat] || 6;
        cals += (p.time / 60) * rate;
    });
    return Math.round(cals * state.rounds);
}

function renderWorkoutIdle(){
  const has = state.plan.length>0;
  document.getElementById('idleEmpty').style.display = has ? 'none' : 'block';
  document.getElementById('idleReady').style.display = has ? 'block' : 'none';
  if(has){
    document.getElementById('sumCount').textContent = state.plan.length;
    document.getElementById('sumRounds').textContent = state.rounds;
    document.getElementById('sumCals').innerHTML = estCalories() + ' <span style="font-size:0.6em;color:var(--muted)">kcal</span>';
    
    const t = estTotalSeconds(), m = Math.floor(t/60), s = t%60;
    document.getElementById('sumTime').textContent = m+':'+String(s).padStart(2,'0');
  }
}
function setWoState(name){
  document.querySelectorAll('.wo-state').forEach(el=>el.classList.remove('active'));
  document.getElementById('wo-'+name).classList.add('active');
}

function startWorkout(){
  if(!state.plan.length) return;
  wo = {round:1, idx:0, phase:'prep', timeLeft: state.prep, phaseTotal: Math.max(state.prep,1), paused:false, elapsed:0, timer:null, tick:null, pauseCount:0};
  
  if(state.sound && !audioCtx) {
      try { audioCtx = new (window.AudioContext||window.webkitAudioContext)(); audioCtx.resume(); } catch(e){}
  }
  
  document.getElementById('activeControls').style.display = 'none';
  document.getElementById('bigTimer').textContent = state.prep;
  document.getElementById('activeName').textContent = 'Get Ready';
  
  const firstEx = EXERCISES.find(x=>x.id===state.plan[0].id) || {};
  document.getElementById('activeCue').textContent = 'First up: ' + firstEx.name;
  speakCue("Get ready. First up, " + firstEx.tts);
  
  document.getElementById('phaseTag').textContent = 'STARTING';
  document.getElementById('phaseTag').style.color = 'var(--accent)';
  document.getElementById('roundTag').textContent = 'ROUND 1/'+state.rounds;
  document.getElementById('exVisual').innerHTML = '';
  setWoState('active');
  
  wo.tick = setInterval(()=>{ if(!wo.paused) wo.elapsed++; }, 1000);
  runPhaseTimer();
}

function currentExercise(){ return EXERCISES.find(x=>x.id===state.plan[wo.idx].id); }

function loadPhaseUI(){
  const ex = currentExercise();
  document.getElementById('roundTag').textContent = 'ROUND '+wo.round+'/'+state.rounds;
  
  if(wo.phase==='work'){
    wo.timeLeft = state.plan[wo.idx].time; wo.phaseTotal = wo.timeLeft;
    document.getElementById('phaseTag').textContent='WORK'; document.getElementById('phaseTag').style.color='var(--warn)';
    document.getElementById('bigTimer').style.color='var(--warn)';
    document.getElementById('progressFill').style.background='var(--warn)';
    document.getElementById('progressFill').classList.add('glow');
    document.getElementById('activeName').textContent = ex.name;
    document.getElementById('activeCue').textContent = ex.cue;
    document.getElementById('exVisual').innerHTML = getIcon(ex);
    document.getElementById('exVisual').style.color = CAT_COLOR[ex.cat];
    document.getElementById('activeControls').style.display='grid';
    document.getElementById('btnAddRest').style.opacity='.35'; document.getElementById('btnAddRest').disabled=true;
    
    speakCue(ex.tts + ". " + ex.cue);
    
  } else if(wo.phase==='rest'){
    wo.timeLeft = state.rest; wo.phaseTotal = Math.max(state.rest,1);
    document.getElementById('phaseTag').textContent='REST'; document.getElementById('phaseTag').style.color='var(--accent2)';
    document.getElementById('bigTimer').style.color='var(--accent2)';
    document.getElementById('progressFill').style.background='var(--accent2)';
    document.getElementById('progressFill').classList.remove('glow');
    document.getElementById('activeName').textContent='Breathe';
    
    const nextIdx = wo.idx+1 < state.plan.length ? wo.idx+1 : 0;
    const nextEx = EXERCISES.find(x=>x.id===state.plan[nextIdx].id);
    document.getElementById('activeCue').textContent = 'Up next: '+ nextEx.name;
    document.getElementById('exVisual').innerHTML='';
    document.getElementById('activeControls').style.display='grid';
    document.getElementById('btnAddRest').style.opacity='1'; document.getElementById('btnAddRest').disabled=false;
    
    speakCue("Rest. Up next, " + nextEx.tts);
  }
  document.getElementById('bigTimer').textContent = wo.timeLeft;
  updateProgress();
}

function updateProgress(){ const pct = wo.phaseTotal>0 ? (wo.timeLeft/wo.phaseTotal)*100 : 0; document.getElementById('progressFill').style.width = pct+'%'; }

function runPhaseTimer(){
  clearInterval(wo.timer);
  wo.timer = setInterval(()=>{
    if(wo.paused) return;
    wo.timeLeft--;
    document.getElementById('bigTimer').textContent = Math.max(0,wo.timeLeft);
    updateProgress();
    
    if(wo.timeLeft>0 && wo.timeLeft<=3){ 
      beep(600,.15); 
      vibrate([100, 50, 100]); 
    }
    
    if(wo.timeLeft<=0){ 
      beep(820,.5); 
      vibrate([150,60,150]); 
      advancePhase(); 
    }
  },1000);
}

function advancePhase(){
  if(wo.phase==='prep'){ wo.phase='work'; loadPhaseUI(); return; }
  if(wo.phase==='work'){
    if(wo.idx === state.plan.length-1){
      if(wo.round === state.rounds){ finishWorkout(); return; }
      wo.round++; wo.idx=0; wo.phase='rest';
    } else { wo.idx++; wo.phase='rest'; }
  } else { wo.phase='work'; }
  loadPhaseUI();
}

function finishWorkout(){
  clearInterval(wo.timer); clearInterval(wo.tick);
  document.getElementById('progressFill').classList.remove('glow');
  const m = Math.floor(wo.elapsed/60), s = wo.elapsed%60;
  document.getElementById('statTime').textContent = m+':'+String(s).padStart(2,'0');
  document.getElementById('completeSub').textContent = state.plan.length+' exercises · '+state.rounds+' round'+(state.rounds>1?'s':'');
  
  if('Notification' in window && Notification.permission==='granted'){ 
      try{ new Notification('Workout complete 🎉', {body:'You trained for '+m+'m '+s+'s.'}); }catch(e){} 
  }
  
  setWoState('complete');
  speakCue("Workout complete. Great job, " + state.name);

  if (wo.pauseCount >= 3 && state.rest < 60) {
    setTimeout(()=>{
        if(confirm("You paused quite a bit today. Would you like to automatically increase your default rest time by 15 seconds for future workouts?")) {
            state.rest += 15;
            saveState();
            renderSettings();
        }
    }, 1500);
  }
}

document.getElementById('btnPause').addEventListener('click',(e)=>{ 
  wo.paused = !wo.paused; 
  e.target.textContent = wo.paused ? 'Resume' : 'Pause'; 
  if(wo.paused && wo.phase === 'work') { wo.pauseCount++; }
});

document.getElementById('btnAddRest').addEventListener('click',()=>{
  if(wo.phase==='rest' && !wo.paused){ 
      wo.timeLeft+=15; wo.phaseTotal+=15; 
      document.getElementById('bigTimer').textContent=wo.timeLeft; 
      updateProgress(); beep(420,.12); 
  }
});

document.getElementById('btnQuit').addEventListener('click',()=>{ 
    clearInterval(wo.timer); clearInterval(wo.tick); document.getElementById('progressFill').classList.remove('glow'); window.speechSynthesis.cancel(); setWoState('idle'); renderWorkoutIdle(); 
});
document.getElementById('btnStartWorkout').addEventListener('click', startWorkout);
document.getElementById('btnBackHome').addEventListener('click',()=>{ setWoState('idle'); renderWorkoutIdle(); });


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

if (developerInfoBtn) developerInfoBtn.addEventListener("click", openDeveloperModal);
if (closeDeveloperBtn) closeDeveloperBtn.addEventListener("click", closeDeveloperModal);
if (developerOverlay) developerOverlay.addEventListener("click", closeDeveloperModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && developerModal.classList.contains("active")) {
        closeDeveloperModal();
    }
});

/* ---------- Init ---------- */
/* ---------- Init ---------- */
document.getElementById('currentYear').textContent = new Date().getFullYear(); // Sets the footer year dynamically

loadState();
renderCats(); 
renderLibrary(); 
renderPlan(); 
renderSettings(); 
renderWorkoutIdle();
if(!state.name){ openModal('nameModal'); }

})();