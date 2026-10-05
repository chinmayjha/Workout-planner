<div align="center">

![Workout Planner Banner](assets/banner.svg)

# Workout Planner

**A fast, zero-dependency workout planner and voice-guided interval timer that runs in any browser.**

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-8B7CFF?style=for-the-badge)](https://workout.chinmayjha.tech)
[![Author](https://img.shields.io/badge/Author-Chinmay_Jha-00E5A0?style=for-the-badge)](https://chinmayjha.tech)

</div>

## Overview

Build a routine from a 25-exercise library, run it with a hands-free timer and voice coach, then watch your streak and 30-day activity heatmap grow. Everything runs in the browser with vanilla HTML, CSS and JavaScript. There is no backend, no account and no tracking: your data stays on your device.

## Features

**Planning**
- Exercise library with search and category filters, drag-and-drop ordering, and per-exercise time.
- Strength moves (push-ups, squats, lunges and similar) can switch to **Reps** mode with a target rep count. Holds and cardio stay timed.
- Adjustable rounds, rest, prep time and an adaptive rest button.

**Workout**
- Prep, work and rest phases with a live timer, progress bar and phase colours.
- Voice coaching split into three switches: **Announcements**, **Form coaching** and **Pacing & chimes** (beeps and a halfway cue on timed exercises of 20s or more).
- Screen wake lock keeps the display on during a workout.
- Ending early still saves your time and calories and takes you to the share screen.
- "How did that feel?" rating (Light / Hard / Brutal) after every session.

**Profile**
- Lifetime stats, current and best streak, and a 30-day heatmap with tap/hover details.
- **Streak Savers:** earn 1 for every 5 completed workouts (max 3). A saver automatically covers missed days so a streak survives, but only when it can cover the whole gap.
- JSON backup (export / import) and a hold-to-confirm "clear all data" button.
- Optional body weight to scale calorie estimates.

**Share**
- Generates a 1080x1920 story image (Canvas API) with your time, calories, exercises and rating. Uses the native share sheet on supported phones and downloads the image elsewhere.

**Keyboard shortcuts**

| Key | Action |
| --- | --- |
| `Space` | Pause / resume (or mark reps done) |
| `→` | Skip phase |
| `M` | Mute / unmute |
| `Esc` | Close a popup, or ask to end the workout |
| `?` | Open help and the form video glossary |

## How streaks work

- A day counts once its sessions add up to at least 60 seconds. Dates use your local timezone.
- Several sessions in one day count as one active day.
- A workout earns Saver progress only if it is completed, lasts at least 60 seconds, and covers at least half its planned time.
- Savers are applied when you open the app, not at midnight.

## Project structure

```
index.html        page markup (Plan, Workout and Profile tabs, modals)
styles.css        all styling
app.js            planner, workout engine, audio, share card, shortcuts
js/store.js       saved data, migration, local-date logging, streak engine
js/profile.js     Profile tab: heatmap, savers, backup, clear data
manifest.json     PWA manifest
assets/           banner, social image and app icons
404.html          not-found page
```

## Your data

Everything is stored in your browser's `localStorage` (`forge_state_v6` for the planner and settings, `workout_state_v7` for sessions and streaks). Nothing is sent anywhere. Use **Profile > Backup** to export before clearing browser data or switching devices.

## Getting started

```bash
git clone https://github.com/chinmayjha/Workout-planner.git
cd Workout-planner
```

Open `index.html` in a browser. No build step or server is required.

## Deployment

The site is hosted on GitHub Pages. To use a custom subdomain, add a `CNAME` record pointing to `chinmayjha.github.io` at your DNS provider and put the domain in the repository's `CNAME` file.

## Adding exercises

Add an object to the `EXERCISES` array in `app.js`:

```javascript
{
  id: "new-exercise",
  name: "Your New Exercise",
  cat: "upper", // upper, lower, core, cardio, full
  cue: "A brief tip for form and execution.",
  time: 45, // default seconds
  tts: "How the voice coach should say the name"
}
```

Add a matching key to `EX_ICONS` for a custom icon. To allow Reps mode, add its `id` to the `REPS_OK` set.

## Roadmap

- New visual identity and workout screen, light/dark theme switch
- Offline support (service worker) and installable app polish
- Landing page and per-exercise pages for search
- Routine presets, a workout generator, saved routines and share links
- Touch-friendly drag reordering and a drift-proof timer

## About the Author

**Chinmay Jha**
_Student • Web Developer • Freelancer_

I am a 17-year-old web developer from India. I started coding at 11, and I specialize in building fun, functional, and highly polished web projects and user interfaces.

Portfolio: [chinmayjha.tech](https://chinmayjha.tech)
GitHub: [@chinmayjha](https://github.com/chinmayjha)
Email: contact@chinmayjha.tech

## License

Released under the [MIT License](LICENSE). Feel free to fork, modify, and use it in your own projects.