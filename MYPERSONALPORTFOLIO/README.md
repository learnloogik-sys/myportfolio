# 🚀 Portfolio Website — Workshop Project

A premium, dark-themed, animated portfolio website built with **plain HTML, CSS and
JavaScript** — no frameworks, no build tools. This project was designed for a **3-day
Website Development Workshop** so every part of it doubles as a lesson.

Live demo placeholders use `Kaushaindra Kumar`, Data Analyst Trainer at **Technoglobe
Rewari**. Replace the placeholders with your own details — every spot to edit has an
HTML comment like `<!-- Replace with your own name -->`.

---

## 1. Project Introduction

This is a one-page portfolio site with 14 sections: a loader, sticky navbar, hero,
about, qualifications, experience, projects, skills, resume, contact form, social
links, a floating WhatsApp button, a dummy AI assistant button, and a footer.

The goal isn't just to give you a finished website — it's to teach you **how** every
part works, so you can build your own from scratch afterwards.

---

## 2. Folder Structure Explanation

```
Portfolio/
│── index.html          → the one HTML page that holds all sections
│── css/
│     style.css          → colors, layout, components, animations
│     responsive.css     → rules that adapt the layout to smaller screens
│── js/
│     script.js          → all interactivity (typing effect, forms, menus...)
│── images/               → put your own photos/screenshots here
│── assets/               → optional extra files (icons, brochures, etc.)
│── resume/
│     resume.pdf          → placeholder resume — replace with your real one
│── README.md             → this file
```

**Why split CSS into two files?** `style.css` holds the "desktop-first" design.
`responsive.css` only holds `@media` rules for smaller screens. Keeping them
separate makes it much easier to find and fix a mobile-only bug.

---

## 3. HTML Explanation

`index.html` is organized into clearly labeled sections using HTML comments, e.g.:

```html
<!-- =========================================================
     3. HERO SECTION
========================================================== -->
<section class="hero" id="home"> ... </section>
```

Each `<section>` has a unique `id` (like `id="about"`). The navbar links point to
these IDs using `href="#about"` — clicking a nav link jumps to the matching section.
This is called an **anchor link**.

Key HTML concepts used here: semantic tags (`<header>`, `<section>`, `<footer>`,
`<nav>`), forms (`<input>`, `<textarea>`, `<label>`), and accessibility attributes
(`aria-label`, `alt` text on images).

---

## 4. CSS Explanation

At the top of `style.css` you'll find a block called **design tokens**:

```css
:root {
  --bg: #0a0e17;
  --blue: #3b82f6;
  --cyan: #22d3ee;
  --font-display: 'Space Grotesk', sans-serif;
}
```

These are **CSS variables**. Instead of typing `#3b82f6` fifty times across the
file, we type `var(--blue)`. Change the variable once at the top, and the color
updates everywhere automatically. This is the fastest way to re-theme a site.

The rest of the file is organized by section, in the same order as `index.html`,
with big comment headers so you can `Ctrl+F` your way to any component.

---

## 5. JavaScript Explanation

`script.js` is written as many small functions — one per feature — for example:

```js
function initTypingEffect() { ... }
function initCounters() { ... }
function initContactForm() { ... }
```

All functions are called together at the bottom of the file, inside:

```js
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  // ...
});
```

This means: "wait until the HTML has fully loaded, then run all these functions."
If you want to remove a feature (say, the cursor glow), just delete or comment out
its function call here — you don't need to touch the rest of the file.

---

## 6. How Animations Work

Two animation systems are used together:

1. **AOS (Animate On Scroll)** — a small external library. Any element with
   `data-aos="fade-up"` will fade/slide into view the first time it scrolls onto
   the screen. Change `fade-up` to `fade-left`, `fade-right`, or `zoom-in` to try
   different effects.
2. **Custom CSS `@keyframes`** — used for things AOS doesn't cover, like the
   floating tech icons, the pulsing WhatsApp button, and the typing cursor blink.
   Search `@keyframes` in `style.css` to see them all.

The skill bars and stat counters use a bit of JavaScript called an
**IntersectionObserver** — it detects when an element enters the viewport and
only then starts the counting/filling animation (so it doesn't play too early).

---

## 7. How to Change Name

Search `index.html` for `Kaushaindra Kumar` — it appears in the hero heading, the
about section, and the page `<title>`. Replace every instance with your own name.

---

## 8. How to Change Profile Picture

1. Add your photo to the `images/` folder, e.g. `images/profile.jpg`.
2. In `index.html`, find:
   ```html
   <img src="https://placehold.co/420x420/0d1420/38bdf8?text=Photo" alt="..." class="hero-photo">
   ```
3. Replace the `src` value with `images/profile.jpg`.

---

## 9. How to Add New Projects

Each project is one `<div class="project-card">` block inside the **Projects**
section. To add a third project, copy an existing `.project-card` block, paste it
below the second one, and update the image, title, description, tech tags and
links. The CSS grid will automatically re-flow to fit the new card.

---

## 10. How to Change Resume

Replace `resume/resume.pdf` with your own PDF file, keeping the same file name —
or update every `href="resume/resume.pdf"` in `index.html` if you rename it.

---

## 11. How to Edit Contact Details

In the **Contact** section of `index.html`, update the email, phone and location
text inside `.contact-info-item`. To make the WhatsApp button work, replace its
`href="#"` with `https://wa.me/91XXXXXXXXXX` (your number, no spaces or `+`).

The contact form is a **demo only** — it validates input and shows a success
message, but does not send a real email. To make it functional, connect it to a
form service (like Formspree) or your own backend.

---

## 12. How to Change Colors

Open `css/style.css` and edit the variables at the very top:

```css
--blue: #3b82f6;
--cyan: #22d3ee;
```

Every gradient, button, and glow color is built from these two variables, so
changing them re-themes the entire site.

---

## 13. How to Change Fonts

Fonts are loaded from Google Fonts in the `<head>` of `index.html`. To swap a
font: pick a new one at [fonts.google.com](https://fonts.google.com), update the
`<link>` tag, then update the matching variable in `css/style.css`:

```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## 14. How to Deploy on GitHub Pages

1. Create a new repository on GitHub and push this project to it.
2. Go to the repository's **Settings → Pages**.
3. Under "Source", choose the `main` branch and `/ (root)` folder, then save.
4. GitHub will give you a live URL like `https://yourusername.github.io/repo-name`.

---

## 15. How to Host Free

Besides GitHub Pages, you can also deploy this project for free on:

- **Netlify** — drag and drop the `Portfolio` folder onto netlify.app/drop.
- **Vercel** — import the GitHub repo at vercel.com and deploy with one click.
- **Cloudflare Pages** — connect the repo the same way as Netlify/Vercel.

No build step is needed since this is plain HTML/CSS/JS.

---

## 16. VS Code Extensions Required

- **Live Server** — right-click `index.html` → "Open with Live Server" for
  auto-refresh while editing.
- **Prettier** — auto-formats your HTML/CSS/JS on save.
- **HTML CSS Support** — better autocomplete for class names.
- **Font Awesome IntelliSense** (optional) — icon name suggestions.

---

## 17. Live Server Setup

1. Install the **Live Server** extension in VS Code.
2. Open the `Portfolio` folder in VS Code.
3. Right-click `index.html` in the file explorer.
4. Click **"Open with Live Server."**
5. Your default browser opens the site, and it auto-refreshes every time you save.

---

## 18. Common Errors & Solutions

| Problem | Likely Cause | Fix |
|---|---|---|
| Icons not showing | No internet connection | Font Awesome loads from a CDN — you need internet |
| Animations not playing | AOS script not loaded | Check the `<script src="...aos.js">` tag is above `script.js` |
| Layout looks broken | CSS file not linked | Check the `<link>` tags' file paths in `<head>` |
| Changes not appearing | Browser cache | Hard refresh with `Ctrl+Shift+R` |
| Resume won't download | Wrong file path | Confirm `resume/resume.pdf` actually exists |

---

## 19. Beginner Practice Tasks

1. Change the accent color from blue/cyan to purple/pink.
2. Add a fourth stat card to the About section.
3. Add a third project card to the Projects section.
4. Change the typing effect phrases to describe yourself.
5. Add a new social icon (e.g. Twitter/X) to the Social section.

---

## 20. Homework for Students

- Replace **all** dummy content with your real information.
- Replace the placeholder profile photo and project screenshots.
- Add your real resume PDF.
- Deploy the finished site using GitHub Pages (see Section 14).
- Bonus: add one new animation of your choice using CSS `@keyframes`.

---

Built for a Data Analyst Website Development Workshop, Technoglobe Rewari. 🎓
