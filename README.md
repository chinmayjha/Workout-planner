<div align="center">

![Workout Planner Banner](assets/banner.svg)

# ⚡️ Workout Planner

**A premium, immersive, zero-dependency workout planner built for the modern web.**

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-8B7CFF?style=for-the-badge)](https://workout.chinmayjha.tech)
[![Author](https://img.shields.io/badge/Author-Chinmay_Jha-00E5A0?style=for-the-badge)](https://chinmayjha.tech)

*Replace this line with an image or GIF of your active workout dashboard*

</div>

## 📖 Overview
Workout Planner is a highly responsive, glassmorphism-inspired fitness application designed to help users build custom routines, track rest times, and crush their fitness goals. Built entirely with Vanilla web technologies, it features an intelligent adaptive rest algorithm, voice coaching, native drag-and-drop mechanics, and a fluid, app-like experience across all devices.

## ✨ Key Features

*   **📱 Immersive Dynamic Themes:** Transitions your mobile browser's native URL bar theme color instantly to match your active workout phase (Prep, Work, Rest).
*   **⚡️ Wake Lock Integration:** Utilizes the `navigator.wakeLock` API to ensure your phone screen never goes to sleep while a workout timer is actively running.
*   **🎧 Smart Audio Coaching:** Utilizes the native Web Speech API to provide real-time voice cues, phase changes, and detailed form reminders.
*   **📊 Proportional Stats Tracking:** Automatically tracks your total workouts, calories burned, and total time trained down to the exact second. Exiting a workout early calculates and saves your proportional effort.
*   **🫀 Ambient Pulse & Haptics:** Integrates the Web Vibration API and CSS animations for a synchronized pulsing "heartbeat" countdown during the final 3 seconds of intense sets.
*   **🛡️ Workout Safety Lock:** Prevents accidental data loss by locking the UI tabs and triggering a warning dialog if you try to leave an active workout.
*   **🖱️ Drag & Drop Builder:** Effortlessly construct and reorder your daily routine using native HTML5 drag-and-drop functionality, complete with CSS boundary-limit guards.
*   **🎨 Premium Frosted Glass:** Features a custom CSS `-webkit-backdrop-filter` UI that scales perfectly across Desktop and iOS devices, plus 25 unique, minimal SVGs mapped specifically to individual movements.
*   **💾 Zero Backend:** 100% client-side logic requiring no databases, package managers, or external dependencies.

## 🛠️ Tech Stack
This project was built with performance and simplicity in mind.

*   **HTML5:** Semantic architecture, Web App Manifest, and native drag-and-drop.
*   **CSS3:** Custom CSS variables, CSS Grid/Flexbox, frosted glass UI, cross-browser minimal scrollbars, and keyframe animations.
*   **JavaScript (Vanilla ES6):** State management, Web Speech API, Web Vibration API, Wake Lock API, and DOM manipulation.

## 🚀 Getting Started

Since this project has zero dependencies, getting it running locally is incredibly simple.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/chinmayjha/workout-planner.git](https://github.com/chinmayjha/workout-planner.git)
    ```
2.  **Open the project folder:**
    ```bash
    cd workout-planner
    ```
3.  **Run the app:**
    Simply open the `index.html` file in your preferred web browser. No local server is required.

## 🔧 Customization (Adding Exercises)

You can easily expand the application's library by modifying the `EXERCISES` array in `app.js`.

```javascript
{
  id: 'new-exercise',
  name: 'Your New Exercise',
  cat: 'upper', // Options: upper, lower, core, cardio, full
  cue: 'A brief tip for form and execution.',
  time: 45, // Default time in seconds
  tts: 'Phonetic spelling for the voice coach'
}
```

To add a custom SVG for your new exercise, simply add a matching `id` key to the `EX_ICONS` object in `app.js`.

## 👨‍💻 About the Author

**Chinmay Jha**  
*Student • Web Developer • Freelancer*

I am a 17-year-old web developer from India. I started coding at 11, and I specialize in building fun, functional, and highly polished web projects and user interfaces. 

🌐 **Portfolio:** [chinmayjha.tech](https://chinmayjha.tech)  
🐙 **GitHub:** [@chinmayjha](https://github.com/chinmayjha)  
✉️ **Email:** contact@chinmayjha.tech

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to fork, modify, and use it in your own projects!