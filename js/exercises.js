/**
 * exercises.js: the extended exercise library (gym + bodyweight).
 * Row format:  id | Name | category | mode | cue
 *   category: upper | lower | core | cardio | full
 *   mode:     s = stretch (timed), r = counted in reps (can switch to timed)   t = timed cardio   h = timed hold
 * To add an exercise, add one line. The id must be unique and never change once published.
 */
(function () {
  "use strict";
  var ROWS = [
    "bench|Barbell Bench Press|upper|r|Lower the bar to mid-chest, then press up with your feet planted.",
    "incbench|Incline Bench Press|upper|r|Press from your upper chest with shoulder blades pinched together.",
    "dbpress|Dumbbell Bench Press|upper|r|Press the dumbbells over your chest and lower with control.",
    "incdb|Incline Dumbbell Press|upper|r|Keep elbows about 45 degrees from your body as you press.",
    "dbfly|Dumbbell Fly|upper|r|Arc the weights wide with soft elbows, then squeeze together.",
    "cablefly|Cable Crossover|upper|r|Sweep the handles together in front of your chest.",
    "pecdeck|Pec Deck|upper|r|Keep your back on the pad and squeeze the handles together.",
    "chestdip|Chest Dips|upper|r|Lean forward and lower until your shoulders pass your elbows.",
    "widepush|Wide Push-Ups|upper|r|Hands wider than shoulders; keep your core tight.",
    "declinepush|Decline Push-Ups|upper|r|Feet elevated, body straight; lower your chest between your hands.",
    "pullup|Pull-Ups|upper|r|Pull your chin over the bar, then lower fully with control.",
    "chinup|Chin-Ups|upper|r|Palms facing you; pull up leading with your chest.",
    "invrow|Inverted Rows|upper|r|Keep your body straight and pull your chest to the bar.",
    "latpull|Lat Pulldown|upper|r|Pull the bar to your upper chest, driving elbows down.",
    "cablerow|Seated Cable Row|upper|r|Sit tall and pull the handle to your belly.",
    "bentrow|Barbell Bent-Over Row|upper|r|Hinge with a flat back and row the bar to your lower ribs.",
    "dbrow|One-Arm Dumbbell Row|upper|r|Brace on a bench and pull the weight toward your hip.",
    "facepull|Face Pulls|upper|r|Pull the rope toward your face with elbows high.",
    "shrug|Dumbbell Shrugs|upper|r|Lift your shoulders straight up, pause, then lower slowly.",
    "ohp|Overhead Press|upper|r|Brace your core and press the bar straight overhead.",
    "dbshoulder|Dumbbell Shoulder Press|upper|r|Press overhead without arching your lower back.",
    "arnold|Arnold Press|upper|r|Rotate your palms from facing you to forward as you press.",
    "latraise|Lateral Raises|upper|r|Raise your arms to shoulder height with a slight elbow bend.",
    "frontraise|Front Raises|upper|r|Lift the weights to shoulder height with straight arms.",
    "reardelt|Rear Delt Fly|upper|r|Hinge forward and raise your arms wide, squeezing your upper back.",
    "uprow|Upright Row|upper|r|Pull the weight up your body to chest height, elbows leading.",
    "bicepcurl|Dumbbell Biceps Curl|upper|r|Pin your elbows to your sides and curl with control.",
    "hammer|Hammer Curls|upper|r|Palms face each other; curl without swinging your torso.",
    "bbcurl|Barbell Curl|upper|r|Curl the bar to shoulder height, then lower slowly.",
    "preacher|Preacher Curl|upper|r|Rest your arms on the pad and curl through full range.",
    "cablecurl|Cable Curl|upper|r|Stand tall and keep your elbows still as you curl.",
    "pushdown|Triceps Pushdown|upper|r|Elbows at your sides; push down until your arms are straight.",
    "skull|Skull Crushers|upper|r|Lower the weight toward your forehead, then extend your elbows.",
    "ohext|Overhead Triceps Extension|upper|r|Lower the weight behind your head and press back up.",
    "kickback|Triceps Kickbacks|upper|r|Hinge forward, keep your upper arm still, and straighten your elbow.",
    "closegrip|Close-Grip Bench Press|upper|r|Hands shoulder-width apart with elbows tucked.",
    "wristcurl|Wrist Curls|upper|r|Rest forearms on your thighs and curl the weight with your wrists.",
    "backsquat|Barbell Back Squat|lower|r|Chest up; squat until your thighs are parallel to the floor.",
    "frontsquat|Front Squat|lower|r|Elbows high and torso upright as you descend.",
    "goblet|Goblet Squat|lower|r|Hold a weight at your chest and squat deep.",
    "legpress|Leg Press|lower|r|Lower to about 90 degrees and press through your heels.",
    "hacksquat|Hack Squat|lower|r|Keep your back on the pad and drive up through mid-foot.",
    "legext|Leg Extension|lower|r|Extend your knees fully and squeeze your quads at the top.",
    "legcurl|Lying Leg Curl|lower|r|Curl your heels toward your glutes without lifting your hips.",
    "deadlift|Barbell Deadlift|lower|r|Flat back, bar close to your legs; drive the floor away.",
    "rdl|Romanian Deadlift|lower|r|Push your hips back with soft knees until your hamstrings stretch.",
    "sumodl|Sumo Deadlift|lower|r|Wide stance, toes out; push your knees out and stand tall.",
    "goodmorning|Good Mornings|lower|r|Hinge at the hips with a flat back, then drive hips forward.",
    "stepup|Step-Ups|lower|r|Drive through your front heel to stand on the step, then lower slowly.",
    "walklunge|Walking Lunges|lower|r|Take long steps and keep your torso upright.",
    "revlunge|Reverse Lunges|lower|r|Step back and lower your rear knee toward the floor.",
    "sidelunge|Side Lunges|lower|r|Step wide and sit back into one hip, other leg straight.",
    "hipthrust|Barbell Hip Thrust|lower|r|Back on a bench; drive your hips up and squeeze your glutes.",
    "cablekick|Cable Glute Kickback|lower|r|Kick straight back, squeezing the glute, without arching.",
    "donkey|Donkey Kicks|lower|r|On all fours, press one heel toward the ceiling.",
    "sglb|Single-Leg Glute Bridge|lower|r|One foot planted; drive up and keep your hips level.",
    "seatedcalf|Seated Calf Raise|lower|r|Press through the balls of your feet and pause at the top.",
    "nordic|Nordic Hamstring Curl|lower|r|Anchor your heels and lower your torso slowly.",
    "pistol|Pistol Squat|lower|r|Squat on one leg with the other extended; use support if needed.",
    "jumplunge|Jumping Lunges|lower|r|Switch legs in the air and land softly.",
    "boxjump|Box Jumps|lower|r|Swing your arms, jump onto the box, and step down carefully.",
    "broadjump|Broad Jumps|lower|r|Jump forward as far as you can and land with soft knees.",
    "abwheel|Ab Wheel Rollout|core|r|Roll out with a braced core and pull back without sagging.",
    "hangleg|Hanging Leg Raise|core|r|Hang from a bar and raise your legs without swinging.",
    "cablecrunch|Cable Crunch|core|r|Kneel and curl your ribs toward your hips.",
    "bicycle|Bicycle Crunches|core|r|Bring your elbow to the opposite knee while extending the other leg.",
    "sideplank|Side Plank|core|h|Stack your feet and keep your hips lifted in a straight line.",
    "deadbug|Dead Bugs|core|r|Lower opposite arm and leg while your lower back stays flat.",
    "birddog|Bird Dog|core|r|Extend opposite arm and leg and keep your hips level.",
    "woodchop|Cable Wood Chop|core|r|Rotate from your torso and pull diagonally across your body.",
    "vup|V-Ups|core|r|Lift legs and torso together to reach your toes.",
    "flutter|Flutter Kicks|core|t|Keep your legs low and kick in small, quick strokes.",
    "toetouch|Reclined Toe Touches|core|r|Curl your shoulders off the floor and reach toward your toes.",
    "pallof|Pallof Press|core|r|Press the cable straight out and resist rotating.",
    "supermans|Supermans|core|r|Lift arms and legs off the floor and squeeze your back.",
    "plankjack|Plank Jacks|core|t|From a plank, hop your feet wide and back together.",
    "jumprope|Jump Rope|cardio|t|Stay on your toes and turn the rope with your wrists.",
    "running|Running|cardio|t|Keep a steady rhythm with relaxed shoulders.",
    "sprint|Sprint Intervals|cardio|t|Run at maximum effort with a strong arm drive.",
    "cycling|Cycling|cardio|t|Keep a smooth cadence with your chest up.",
    "rowmachine|Rowing Machine|cardio|t|Drive with your legs, lean back, then pull the handle to your ribs.",
    "battleropes|Battle Ropes|cardio|t|Hips back; make fast alternating waves with the ropes.",
    "stairclimb|Stair Climber|cardio|t|Stand tall and take full steps without leaning on the rails.",
    "shadowbox|Shadow Boxing|cardio|t|Stay light on your feet and throw fast jabs and crosses.",
    "buttkick|Butt Kicks|cardio|t|Jog in place, kicking your heels toward your glutes.",
    "shuffle|Lateral Shuffles|cardio|t|Stay low and shuffle side to side without crossing your feet.",
    "tuckjump|Tuck Jumps|cardio|t|Jump and bring your knees toward your chest, landing softly.",
    "starjump|Star Jumps|cardio|t|Explode up and spread your arms and legs into a star.",
    "kbswing|Kettlebell Swing|full|r|Snap your hips forward and let the bell float to chest height.",
    "thruster|Dumbbell Thrusters|full|r|Squat with weights at your shoulders, then drive up and press.",
    "getup|Turkish Get-Up|full|r|Move slowly from lying to standing, eyes on the weight.",
    "farmer|Farmer's Carry|full|t|Walk tall with a heavy weight in each hand.",
    "medslam|Medicine Ball Slam|full|r|Reach up, then slam the ball down with your whole body.",
    "dbsnatch|Dumbbell Snatch|full|r|Pull the weight from the floor to overhead in one smooth motion.",
    "renegade|Renegade Rows|full|r|Hold a plank and row one dumbbell at a time without twisting.",
    "manmaker|Man Makers|full|r|Push-up, row each side, then stand and press overhead.",
    "cleanpress|Dumbbell Clean and Press|full|r|Clean the weights to your shoulders and press overhead.",
    "armcircle|Arm Circles|flex|s|Make big, slow circles, then reverse direction.",
    "hipcircle|Hip Circles|flex|s|Hands on hips, draw wide slow circles with your pelvis.",
    "legswing|Leg Swings|flex|s|Hold something steady and swing one leg front to back, then side to side.",
    "catcow|Cat-Cow|flex|s|On all fours, arch and round your spine with your breath.",
    "worldgreat|World's Greatest Stretch|flex|s|Deep lunge, elbow to the floor, then rotate and reach up.",
    "thoracic|Thoracic Rotations|flex|s|On all fours, hand behind your head, rotate your elbow to the ceiling.",
    "neckroll|Neck Rolls|flex|s|Roll your head slowly in a half circle, never backward.",
    "ankleroll|Ankle Circles|flex|s|Lift one foot and circle your ankle slowly each way.",
    "childpose|Child's Pose|flex|s|Sit back on your heels, reach forward and breathe slowly.",
    "downdog|Downward Dog|flex|s|Push your hips up and back and press your heels toward the floor.",
    "cobra|Cobra Stretch|flex|s|Lie face down and press up, keeping your hips on the floor.",
    "hamstretch|Hamstring Stretch|flex|s|Extend one leg, hinge forward with a flat back, and breathe.",
    "quadstretch|Standing Quad Stretch|flex|s|Pull your heel to your glute, knees together, and stand tall.",
    "hipflexor|Hip Flexor Stretch|flex|s|Kneel in a lunge and tuck your pelvis as you shift forward.",
    "pigeon|Pigeon Pose|flex|s|Front shin across your body, hips square, fold forward gently.",
    "figure4|Figure-4 Stretch|flex|s|Cross an ankle over your knee and pull the leg toward your chest.",
    "calfstretch|Calf Stretch|flex|s|Press your back heel down with that leg straight, leaning into a wall.",
    "chestopener|Doorway Chest Stretch|flex|s|Forearm on a doorframe, step through until your chest opens.",
    "crossbody|Cross-Body Shoulder Stretch|flex|s|Pull one arm across your chest and keep your shoulders down.",
    "tricepstretch|Overhead Triceps Stretch|flex|s|Reach behind your head and gently press your elbow back.",
    "butterfly|Butterfly Stretch|flex|s|Soles together, knees falling out, sit tall and lean forward.",
  ];
  window.MORE_EXERCISES = ROWS.map(function (line) {
    var p = line.split("|");
    return {
      id: p[0],
      name: p[1],
      cat: p[2],
      reps: p[3] === "r",
      time: p[3] === "t" || p[3] === "s" ? 30 : 40,
      cue: p[4],
      tts: p[1].replace(/-/g, " "),
    };
  });
})();

/* Filters + preset routines. tagExercise() gives every exercise a muscle group (g) and gear (eq). */
(function () {
  "use strict";
  var G = [
    ["chest", "Chest"],
    ["back", "Back"],
    ["shoulders", "Shoulders"],
    ["arms", "Arms"],
    ["legs", "Legs"],
    ["glutes", "Glutes"],
    ["core", "Core"],
    ["cardio", "Cardio"],
    ["full", "Full Body"],
    ["stretch", "Stretch"],
  ];
  var Q = [
    ["bw", "Bodyweight"],
    ["db", "Dumbbell"],
    ["bb", "Barbell"],
    ["mc", "Machine"],
    ["cb", "Cable"],
    ["kb", "Kettlebell"],
    ["other", "Other"],
  ];
  var GR = [
    // first match wins
    [
      "full",
      /renegade|man maker|thruster|clean|snatch|swing|get-up|carry|slam|burpee|sprawl|bear crawl|inchworm/i,
    ],
    ["glutes", /glute|hip thrust|donkey/i],
    [
      "core",
      /plank|crunch|twist|leg raise|hollow|ab wheel|dead bug|bird dog|wood chop|v-up|flutter|toe touch|pallof|superman/i,
    ],
    [
      "shoulders",
      /overhead press|shoulder press|arnold|lateral raise|front raise|rear delt|upright row|pike/i,
    ],
    [
      "legs",
      /leg |squat|lunge|deadlift|calf|step-up|nordic|jump|good morning|hack/i,
    ],
    ["arms", /curl|tricep|skull|kickback|close-grip|wrist|diamond|hammer/i],
    ["chest", /bench|fly|pec deck|crossover|push-up|chest dip/i],
    ["back", /pull-up|chin-up|row|pulldown|face pull|shrug/i],
  ];
  var QR = [
    ["cb", /cable|pushdown|face pull|pulldown|pallof|wood chop/i],
    [
      "mc",
      /pec deck|leg press|leg extension|leg curl|hack squat|seated calf|stair|rowing machine|cycling/i,
    ],
    ["kb", /kettlebell/i],
    [
      "db",
      /dumbbell|arnold|hammer|lateral raise|front raise|rear delt|upright|kickback|shrug|wrist|goblet|thruster|renegade|man maker|farmer|get-up|overhead triceps/i,
    ],
    [
      "bb",
      /barbell|bench press|overhead press|front squat|deadlift|good morning|skull|preacher/i,
    ],
    [
      "other",
      /pull-up|chin-up|inverted|hanging|ab wheel|jump rope|battle|medicine|box jump|dips|step-up|tricep dip/i,
    ],
  ];
  function pick(rules, name, fb) {
    for (var i = 0; i < rules.length; i++)
      if (rules[i][1].test(name)) return rules[i][0];
    return fb;
  }
  function label(list, id) {
    for (var i = 0; i < list.length; i++)
      if (list[i][0] === id) return list[i][1];
    return "";
  }
  window.EX_GROUPS = G;
  window.EX_GEAR = Q;
  window.tagExercise = function (x) {
    x.g =
      x.cat === "flex"
        ? "stretch"
        : pick(
            GR,
            x.name,
            { lower: "legs", core: "core", cardio: "cardio", full: "full" }[
              x.cat
            ] || "arms",
          );
    x.eq = pick(QR, x.name, "bw");
    x.gl = label(G, x.g);
    x.el = label(Q, x.eq);
    return x;
  };
  // [exercise id, seconds]
  window.TEMPLATES = [
    {
      id: "push",
      name: "Push Day",
      desc: "Chest, shoulders, triceps",
      rounds: 3,
      rest: 45,
      items: [
        ["bench", 45],
        ["incdb", 45],
        ["dbshoulder", 45],
        ["latraise", 40],
        ["pushdown", 40],
        ["ohext", 40],
      ],
    },
    {
      id: "pull",
      name: "Pull Day",
      desc: "Back and biceps",
      rounds: 3,
      rest: 45,
      items: [
        ["pullup", 40],
        ["bentrow", 45],
        ["latpull", 45],
        ["facepull", 40],
        ["bicepcurl", 40],
        ["hammer", 40],
      ],
    },
    {
      id: "legs",
      name: "Leg Day",
      desc: "Quads, hamstrings, calves",
      rounds: 3,
      rest: 60,
      items: [
        ["backsquat", 45],
        ["rdl", 45],
        ["legpress", 45],
        ["walklunge", 45],
        ["legcurl", 40],
        ["calfraise", 40],
      ],
    },
    {
      id: "hiit",
      name: "10-Min HIIT",
      desc: "No equipment, max burn",
      rounds: 2,
      rest: 15,
      items: [
        ["jj", 35],
        ["highknees", 35],
        ["burpee", 35],
        ["mountain", 35],
        ["skaters", 35],
        ["jumpsquat", 35],
      ],
    },
    {
      id: "home",
      name: "Home Bodyweight",
      desc: "Full body, zero gear",
      rounds: 3,
      rest: 30,
      items: [
        ["pushup", 40],
        ["squat", 40],
        ["lunge", 40],
        ["plank", 40],
        ["gluteb", 40],
        ["mountain", 30],
      ],
    },
    {
      id: "core",
      name: "Core Crusher",
      desc: "Abs and obliques",
      rounds: 3,
      rest: 20,
      items: [
        ["plank", 35],
        ["bicycle", 35],
        ["legraise", 35],
        ["russiantwist", 35],
        ["deadbug", 35],
        ["sideplank", 30],
      ],
    },
    {
      id: "dbfull",
      name: "Dumbbell Full Body",
      desc: "One pair of dumbbells",
      rounds: 3,
      rest: 40,
      items: [
        ["goblet", 40],
        ["dbpress", 40],
        ["dbrow", 40],
        ["thruster", 40],
        ["hammer", 40],
        ["bicycle", 35],
      ],
    },
    {
      id: "warm",
      name: "Warm-Up (4 min)",
      desc: "Loosen up before you train",
      rounds: 1,
      rest: 5,
      items: [
        ["armcircle", 30],
        ["legswing", 30],
        ["hipcircle", 30],
        ["catcow", 30],
        ["worldgreat", 40],
        ["jj", 30],
      ],
    },
    {
      id: "cool",
      name: "Cool-Down (5 min)",
      desc: "Stretch out afterwards",
      rounds: 1,
      rest: 5,
      items: [
        ["hamstretch", 40],
        ["quadstretch", 30],
        ["hipflexor", 40],
        ["pigeon", 40],
        ["chestopener", 30],
        ["childpose", 45],
      ],
    },
  ];
})();
