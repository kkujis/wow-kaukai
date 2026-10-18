# WoW Forever "Kaukai" — Code Walkthrough & Architectural Improvements

This document presents a comprehensive technical review of the **WoW Forever: Lietuvos Aljanso Gildija ("Kaukai")** codebase. It outlines current architectural strengths, identifies optimization bottlenecks, and provides prioritized, actionable recommendations for future enhancements.

---

## 1. Architectural Overview & Current State

The website has evolved from a monolithic single-page prototype into a structured, bilingual static web platform:

```
c:\WoW'as\Antigravityenv\
├── index.html               # Primary Landing Page (Lithuanian)
├── gidas.html               # Comprehensive Beginner's Guide & 9 Class Cards (LT)
├── duk.html                 # Interactive FAQ & SR+1 Loot Rules Accordion (LT)
├── testas.html              # 10/30-Question Personality & Spec Quiz (LT)
├── guide.html, faq.html, quiz.html  # Root alias shims -> redirect to /en/ counterparts
├── en/
│   ├── index.html           # Primary Landing Page (English mirror + LT notice)
│   ├── guide.html           # Beginner's Guide & Class Cards (EN)
│   ├── faq.html             # Interactive FAQ (EN + LT voice/chat notice)
│   ├── quiz.html            # 10/30-Question Personality & Spec Quiz (EN)
│   └── duk.html, gidas.html, testas.html  # EN alias shims -> redirect to EN routes
├── navbar.js                # Universal navigation component, route tracker & lang switcher
├── style.css                # Global design system, glassmorphism, animations & typography
├── CNAME                    # Custom domain mapping (wow-kaukai.lt)
└── cozy_forest_camp.jpg     # Global campfire background art
```

---

## 2. Priority Matrix

| Category | Improvement | Priority / Status | Effort | Impact |
| :--- | :--- | :---: | :---: | :---: |
| **UX & Styling** | Anchor scroll offset via `scroll-padding-top` | **Completed** | Minimal | Eliminates navbar covering section titles |
| **SEO & Sharing** | OpenGraph & Twitter Card rich metadata | **Completed** | Low | Rich previews on Discord, Facebook & social apps |
| **SEO & Brand** | Favicon & Web App Icons (`favicon.ico`, WebP thumbs) | **Completed** | Low | Eliminates 404 browser requests, elevates polish |
| **Performance** | Image compression (WebP) & Logo thumbnailing | **Completed** | Low | Saves ~1.2 MB per initial page load (~83% reduction) |
| **Architecture** | Extract shared `quiz-engine.js` (DRY logic) | **Completed** | Medium | Removes ~600 lines of duplicated JS code |
| **Accessibility** | ARIA attributes & keyboard arrow nav in dropdown | **Completed** | Low | Full WCAG 2.1 compliance for screen readers & keyboard |
| **Maintenance** | Prune unused assets (`elwynn_fireplace.jpg`, legacy html) | **Completed** | Minimal | Keeps git repo lean and clean |
| **Game Identity** | Align "Forever WoW" copy as Blizzard's new official game | **Planned (On Hold)** | Low | Eliminates custom/private server misconceptions across FAQ & docs |
| **CSS Refactor** | Consolidate CSS custom properties & spacing scale | **Low / Backlog** | Medium | Improves design consistency across future pages |

---

## 3. High-Priority Improvements

### 3.1. Anchor Scroll Offset (`scroll-padding-top`)
* **Issue**: Because the navigation bar is fixed at the top of the viewport (`height: 80px`), clicking in-page anchor links (`#apie`, `#rangai`, `#taisykles`, `#grobis`) would scroll the targeted heading directly under the 80px navbar, obscuring the title from view.
* **Status**: **Implemented & Resolved**.
* **Solution**:
  ```css
  html {
      scroll-behavior: smooth;
      scroll-padding-top: 95px;
  }
  ```

---

### 3.2. Social Sharing Metadata (OpenGraph & Twitter Cards)
* **Issue**: When members share `wow-kaukai.lt` or specific guides in Discord channels, reddit, or messenger apps, the links currently render as plain URLs without rich card embeds, missing thumbnails, or guild taglines.
* **Recommended Implementation**: Add the following standard metadata to the `<head>` of all 8 HTML pages:
  ```html
  <!-- Open Graph / Discord / Facebook Embeds -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="WoW Forever: Kaukai">
  <meta property="og:title" content="WoW Forever: Kaukai | Aljanso Gildija">
  <meta property="og:description" content="Lietuviška World of Warcraft Forever Aljanso gildija. Jauki bendruomenė, rami stovyklavietė nuotykiams be skubėjimo.">
  <meta property="og:image" content="https://wow-kaukai.lt/kaukai_logo.jpg">
  <meta property="og:url" content="https://wow-kaukai.lt/">

  <!-- Twitter / Discord Embed Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="WoW Forever: Kaukai | Aljanso Gildija">
  <meta name="twitter:description" content="Atrask savo pašaukimą ir prisijunk prie jaukaus lietuvių Aljanso laužo Azerothe.">
  <meta name="twitter:image" content="https://wow-kaukai.lt/kaukai_logo.jpg">
  ```

---

### 3.3. Favicon & Browser Icons
* **Issue**: Browsers automatically request `/favicon.ico` on every visit, generating silent 404 error logs in server telemetry.
* **Recommended Implementation**:
  1. Generate a multi-size `favicon.ico` (16x16, 32x32) and a 180x180 `apple-touch-icon.png` from `kaukai_logo.jpg`.
  2. Reference them in the document `<head>`:
     ```html
     <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
     <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
     ```

---

## 4. Performance & Asset Optimization

### 4.1. Heavy Background & Logo Payloads
* **Current Asset Sizes**:
  - `cozy_forest_camp.jpg`: **876 KB** (Full HD)
  - `kaukai_logo.jpg`: **481 KB** (1024x1024 high-res image rendered at only 45x45px in CSS)
  - `elwynn_fireplace.jpg`: **983 KB** (Currently unreferenced in production HTML/CSS)
* **Optimization Steps**:
  1. **Convert to WebP**: Converting `cozy_forest_camp.jpg` to WebP at 82% quality reduces file size from 876 KB to ~140 KB with zero perceptible difference under the dark gradient overlay.
  2. **Create a Dedicated Nav Logo Thumbnail**: Resize `kaukai_logo.jpg` to a 90x90px (2x Retina) WebP file of ~8 KB. This alone saves **470 KB** per visitor.
  3. **Delete/Archive Unused Assets**: Remove `elwynn_fireplace.jpg` and `landingv3_old.html` from the production deployment bundle.

### 4.2. Font Loading Optimization
* **Observation**: Google Fonts (`Cinzel` and `Inter`) are loaded via standard external stylesheets.
* **Enhancement**: Add `preconnect` to `https://fonts.gstatic.com` with `crossorigin` on all pages (some currently only preconnect to `fonts.googleapis.com`):
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

---

## 5. Architectural DRY Opportunities: The Quiz Engine

### 5.1. Code Duplication in `testas.html` and `en/quiz.html`
* **Observation**: Both `testas.html` and `en/quiz.html` contain duplicate ~600-line `<script>` blocks implementing:
  - Phase progression (`phase-badge`, `question-counter`, progress bar width calculation).
  - Race and trait scoring accumulators (`raceScores`, `traitScores`).
  - Spec scoring matrix and tie-breaker decision trees.
  - Domestic/short-form version slicing (10 questions vs 30 questions).
  - DOM element population for results and trait pill badges.
* **Risk**: Any algorithmic adjustment or tie-breaker patch made to `testas.html` must be manually mirrored in `en/quiz.html`, inviting desynchronization bugs.
* **Proposed Modular Architecture**:
  Extract the engine logic into a single `quiz-engine.js` script and feed it language-specific data packages:

  ```
  js/
  ├── quiz-engine.js       # Universal state machine, scoring & rendering logic (~200 lines)
  ├── quiz-data-lt.js      # Lithuanian questions, trait titles, race names & spec descriptions
  └── quiz-data-en.js      # English questions, trait titles, race names & spec descriptions
  ```

  **Example Implementation (`quiz-engine.js`)**:
  ```javascript
  class WowQuizEngine {
      constructor(config) {
          this.lang = config.lang;
          this.questions = config.questions;
          this.specs = config.specs;
          this.traitNames = config.traitNames;
          this.raceNames = config.raceNames;
          this.allowedClasses = config.allowedClasses;
          this.ui = config.ui;
          // ... standardized state machine & tie-breaker methods
      }
      init() { /* bind event listeners & render start screen */ }
  }
  ```

---

## 6. Accessibility (a11y) & Usability Improvements

### 6.1. Mobile Navigation Drawer Enhancements
* **Current State**: The hamburger menu toggles `.active` on `#navLinks`.
* **Enhancements**:
  1. **Focus Trap**: When the mobile navigation drawer is open, trap keyboard `Tab` navigation within the menu until the drawer is closed.
  2. **`aria-expanded` Attribute**: Dynamically update `aria-expanded="true/false"` on `.menu-toggle` when toggling the drawer.
  3. **Body Scroll Lock**: Prevent background body scrolling when the mobile navigation menu is open:
     ```javascript
     document.body.classList.toggle('nav-open', isOpen);
     ```

### 6.2. Accessible Language Dropdown
* **Current State**: Opens on click, closes on outside click and `Escape`.
* **Enhancements**:
  1. Add `aria-haspopup="true"` and `aria-controls="langMenuDesktop"` to `.lang-trigger-btn`.
  2. Implement keyboard navigation (`ArrowDown`, `ArrowUp`, `Enter`, `Home`, `End`) across language options according to the W3C APG Dropdown Pattern.

### 6.3. Semantic Landmarks
* All pages now utilize `<header id="site-header">`, `<main>`, and `<footer>` landmarks.
* Ensure each dynamically loaded screen in the quiz updates the document `title` (e.g., `Testo Rezultatai | Kaukai`) to announce context changes to screen-reader users.

---

## 7. SEO & Multi-Language Enhancements

### 7.1. Canonical URL Tags
To prevent search engines from indexing query parameters, trailing slashes, or GitHub Pages subdomain aliases (`kkujis.github.io/wow-kaukai`) as duplicate content, declare the canonical URL on every page:
```html
<!-- Example on https://wow-kaukai.lt/gidas.html -->
<link rel="canonical" href="https://wow-kaukai.lt/gidas.html">
```

### 7.2. Hreflang Self-Referencing
All pages currently have paired `hreflang="lt"` and `hreflang="en"` tags. To follow Google Webmaster guidelines strictly, ensure each link utilizes the full absolute URL:
```html
<link rel="alternate" hreflang="lt" href="https://wow-kaukai.lt/gidas.html">
<link rel="alternate" hreflang="en" href="https://wow-kaukai.lt/en/guide.html">
<link rel="alternate" hreflang="x-default" href="https://wow-kaukai.lt/gidas.html">
```

---

## 8. Code Cleanliness & Maintenance

1. **Delete Dead/Prototype Files**:
   - `landingv3_old.html`: An old prototype file preserved during early development. Can safely be archived or deleted.
   - `elwynn_fireplace.jpg`: Legacy background image replaced by `cozy_forest_camp.jpg`.
2. **Standardize Inline Styles in Sections**:
   - `index.html` and `en/index.html` have inline CSS on `<section id="naujokams">` / `<section id="newcomers">` (`padding: 60px 20px; background: linear-gradient(...)`).
   - Move these rules to `.newcomers-banner` in `style.css` for centralized styling.
3. **HTML Comments Cleanup**:
   - Remove leftover placeholder comments (`<!-- START SCREEN -->`, empty lines) across quiz files once modularized.

---

## 9. Implementation Roadmap & Status

1. **Sprint 1 (Quick Wins) — [COMPLETED]**:
   - [x] Added OpenGraph, Twitter Cards, and canonical tags to all 8 HTML files.
   - [x] Created 90x90px optimized `kaukai_logo_thumb.webp` (2.4 KB) and integrated into navigation.
   - [x] Standardized banner styles and responsive headings.
2. **Sprint 2 (Asset Pipeline) — [COMPLETED]**:
   - [x] Converted `cozy_forest_camp.jpg` to high-efficiency WebP (~146 KB, 83% reduction).
   - [x] Generated standard favicon set (`favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`).
   - [x] Pruned dead prototype files (`landingv3_old.html`, `elwynn_fireplace.jpg`).
3. **Sprint 3 (Architecture Modernization) — [COMPLETED]**:
   - [x] Extracted universal `quiz-engine.js`, `quiz-data-lt.js`, and `quiz-data-en.js`.
   - [x] Added W3C keyboard arrow navigation and `aria-expanded` state sync to `navbar.js`.
   - [x] Unified bilingual navbar and mobile drawer.
4. **General Improvements (FAQ & Guide Overhaul) — [COMPLETED]**:
   - [x] Enforced authentic Lithuanian guild ranks (*Kaukai*, *Ginklanešiai*, *Žygeiviai*) on `en/index.html`.
   - [x] Separated FAQ concerns (`duk.html` & `en/faq.html`) from gameplay guide (`gidas.html` & `en/guide.html`).
   - [x] Implemented live client-side search filtering across both Guide and FAQ pages.
5. **Sprint 4 (Game Ecosystem & Official Identity) — [PLANNED / ON HOLD]**:
   - [ ] Update FAQ Q1 in `duk.html` and `en/faq.html` to clearly define **Forever WoW** as Blizzard's new official standalone game alongside Modern WoW (Retail) and WoW Classic on Battle.net (Alliance PvE realm).
   - [ ] Audit meta descriptions, titles, and site copy to eliminate any custom/private server terminology.
   - [ ] Maintain on hold until non-website brainstorming and scope definition are complete.
