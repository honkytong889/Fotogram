# Fotogram - Personal Photo Album

Fotogram is a modern, responsive, and fully accessible web-based photo gallery application. The project showcases dynamic DOM manipulation, responsive CSS layouts, and keyboard-friendly navigation.

Developed as part of the **Developer Akademie** software development program.

## 🚀 Live Demo
You can view the live project here: `https://github.com/honkytong889/Fotogram`

---

## 📋 Features & Implemented User Stories

*   **User Story 1 (Gallery Grid):** All photo thumbnails are rendered dynamically via JavaScript loops from a centralized image array. Includes a smooth scaling hover effect (`scale(1.05)`).
*   **User Story 2 (Lightbox Dialog):** Clicking a thumbnail opens the image in a high-resolution, centered view utilizing the native `<dialog>` element.
*   **User Story 3 (Accessibility & Navigation):** 
    *   Full fluid navigation via Next/Previous buttons.
    *   Light Dismiss: Clicking the backdrop/background automatically closes the modal.
    *   Keyboard controls: Close with `Esc` key and navigate using `ArrowLeft` / `ArrowRight`.
    *   Accessible focus states (`:focus-visible`) using a distinct color outline for seamless keyboard tabbing.
*   **User Story 4 (Performance):** All image assets are fully compressed and strictly under 500 KB to ensure fast loading times.

---

## 🛠️ Code Conventions & Best Practices

This project strictly adheres to professional engineering guidelines:
*   **Semantic HTML:** Structured using proper landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<figure>`, `<footer>`) instead of unsemantic container soup.
*   **Clean CSS:** Organisiert into clearly documented sections, completely avoiding ID selectors for styling, and bundling all responsive media queries at the bottom of the file.
*   **Modular JavaScript:** Built using clean code patterns, JSDoc function headers, an exact 2-space indentation style, and functions kept under 14 lines of code.

---

## 📂 Project Structure

```text
Photogram/
├── assets/
│   ├── fonts/         # Local Figtree web fonts
│   ├── icon/          # Scalable vector graphics (SVGs) for logos and controls
│   └── img/           # Compressed photo assets (< 500kb each)
├── index.html         # Semantic HTML structure with body onload trigger
├── style.css          # Responsive styling and layout
└── script.js          # Dynamic DOM rendering and layout interaction
```

---

## 🧑‍💻 Author
*   **Student:** Stefan Friggemann

