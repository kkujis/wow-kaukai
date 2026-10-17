# WoW Forever "Kaukai" — Long-Term Architecture & Refactoring Plan

## 1. Executive Summary

As the "Kaukai" guild community expands, the website will need to host new raid tactics, class talent guides, FAQ entries, event announcements, and potential additional languages. 

Currently, content is tightly coupled with HTML markup across multiple files (`index.html`, `gidas.html`, `duk.html`, `testas.html` and their `/en/` counterparts). While simple to start with, this architecture presents significant maintenance friction:
1. **Markup Duplication**: Adding an FAQ question or updating a class guide requires writing identical nested HTML structures in both Lithuanian and English files.
2. **Desynchronization Risk**: Text edits in one language can easily diverge or introduce tag imbalances in the other.
3. **High Editing Overhead**: Officers or content contributors must edit raw HTML instead of clean, human-readable data formats.
4. **Quiz Logic Duplication**: ~600 lines of calculation and DOM scripts are duplicated across `testas.html` and `en/quiz.html`.

This document presents a **strategic long-term refactoring plan** that transitions the project from hardcoded HTML files into a **modular, data-driven static platform** while keeping deployment effortless.

---

## 2. Core Architectural Refactor: Decoupling Content from Markup

### 2.1. The "Data Layer" Architecture
Instead of hardcoding text into HTML elements, all guild content is extracted into structured, easily editable data files under a dedicated `data/` directory:

```
c:\WoW'as\Antigravityenv\
├── data/
│   ├── faq.json             # All FAQ questions, answers & categories (LT + EN)
│   ├── classes.json         # All 9 classes, roles, armor, 3-sentence descriptions
│   ├── guides.json          # Core onboarding guides (Quests, Death, Economy, Professions)
│   ├── ranks.json           # Guild ranks, expectations & rewards
│   ├── progression.json     # 1-59, Level 60, and 40-man raid timeline
│   └── quiz/
│       ├── questions.json   # 30 quiz questions, trait mappings, race options
│       ├── specs.json       # 27 spec profiles, descriptions & trait vectors
│       └── traits.json      # 12 trait names & descriptions
```

### 2.2. Content Data Format Example (`data/classes.json`)
```json
[
  {
    "id": "warrior",
    "armor": "Plate",
    "roles": ["Tank", "Melee DPS"],
    "lt": {
      "name": "Karys (Warrior)",
      "badge": "Tankas / Artima kova • Plokštiniai šarvai",
      "sentences": [
        "Pagrindinis grupės priešakinių linijų kovotojas ir patikimiausias reidų tankas.",
        "Dėvi sunkiausius plokštinius šarvus, valdo priešų grėsmę (threat) arba daro didžiulę žalą artimoje kovoje.",
        "Suteikia komandai nepakeičiamą puolimo jėgos šauksmą (Battle Shout) ir mirtinus ginklų smūgius."
      ]
    },
    "en": {
      "name": "Warrior",
      "badge": "Tank / Melee DPS • Plate Armor",
      "sentences": [
        "The ultimate vanguard fighter and premier raid tank.",
        "Dons the heaviest plate armor, commands enemy threat, or unleashes devastating melee physical damage.",
        "Empowers the party with vital Battle Shout attack power and delivers deadly weapon strikes."
      ]
    }
  }
]
```

**Benefits of the Data Layer**:
* **Effortless Editing**: An officer can add or adjust a class description, loot rule, or FAQ in seconds by editing simple text fields without touching HTML tags.
* **Guaranteed Parity**: Both Lithuanian and English fields sit side-by-side in the same JSON object, immediately highlighting missing translations.
* **Future Language Extensibility**: Adding a 3rd language (e.g. `de` or `ru`) simply requires adding a new language key to the existing JSON structures.

---

## 3. Long-Term Architectural Options for Rendering

To render the Data Layer, we evaluate three technical paths:

| Feature / Metric | Option A: Build-Time Generator (Node.js/SSG) | Option B: Full Astro Framework | Option C: Client-Side Hydration (Zero-Build) |
| :--- | :--- | :--- | :--- |
| **Build Step Required?** | Yes (`npm run build` or GitHub Action) | Yes (`npm run build`) | **No** (pure client-side JS) |
| **Page Load Speed (FCP/LCP)** | **Instant (Pre-rendered HTML)** | **Instant (Pre-rendered HTML)** | Slight delay (fetch + render) |
| **SEO & Social Crawlers** | **100% Native Static HTML** | **100% Native Static HTML** | Dependent on crawler JS execution |
| **Dependency Footprint** | Minimal / Zero-dependency script | Framework dependencies (Astro) | **Zero dependencies** |
| **Ease of Local Preview** | Very High (standard HTML output) | High (Vite dev server) | Very High (open file in browser) |
| **Recommended Verdict** | **⭐ Recommended (Best Balance)** | **Viable for large-scale CMS** | **Fallback if no build step desired** |

### Recommended Path: Option A (Pre-render Generator Script)
* Create a lightweight, dependency-free Node.js build script (`scripts/build.js`).
* Uses simple semantic template files (`templates/index.html`, `templates/gidas.html`, `templates/duk.html`).
* Merges data from `data/*.json` into pre-rendered static HTML files.
* **GitHub Pages Integration**: A 15-line GitHub Action automatically executes the build script upon every commit. Authors can also run `node scripts/build.js` locally in under 100 milliseconds.

---

## 4. High-Value Long-Term Features for Guild Operations

Alongside the architectural data refactor, the following features will significantly elevate the site's utility for the guild:

### 4.1. Real-Time Guide & FAQ Search Bar
* **Concept**: As the FAQ and Beginner's Guide grow with more topics (Addons, Keybindings, Macro guides, Mount saving, Dungeon walk-ins), visitors need instant search capability.
* **Implementation**: A lightweight instant fuzzy-filter input at the top of the FAQ and Guide pages that filters cards in real-time as the user types.

### 4.2. Interactive Quiz Discord Webhook & Sharing
* **Concept**: When players complete the 10- or 30-question personality test, give them an instant *"Dalintis Discorde"* / *"Share to Discord"* button.
* **Mechanism**:
  - Generates a styled Discord-ready Markdown text snippet copied to clipboard:
    ```markdown
    > 🛡️ **Kaukai Personažo Testas**
    > **Herojus:** Nykštukas Paladinas (Apsauga)
    > **Savybės:** Pareiga (PN), Savitvarda (ŠS), Palaikymas (PG)
    > *„Šventasis Aljanso gynėjas ir ištvermingas kovos lauko ramstis...“*
    ```
  - Optional: Direct Discord Webhook integration allowing authenticated posting to a dedicated `#testo-rezultatai` channel.

### 4.3. Interactive Raid Boss Tactics Module
* **Concept**: A visual, mobile-friendly quick-reference guide for entry raids (Zul'Gurub, Ruins of Ahn'Qiraj, Onyxia, Molten Core).
* **Format**: Collapsible boss cards detailing:
  - 1-sentence role summary for Tanks, Healers, and DPS.
  - Critical wipes mechanics (e.g. "Do not dispel Bomb on Baron Geddon inside the raid").
  - Data sourced from a clean `data/raids.json` file.

### 4.4. Automated Image Pipeline
* **Concept**: Automate conversion and generation of modern image formats (`.webp`, responsive `srcset`).
* **Implementation**: Build script automatically resizes `kaukai_logo.jpg` into 45px, 90px (Retina) thumbnails and generates optimized WebP background variations.

---

## 5. Comprehensive Phased Implementation Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: Immediate Polish & Performance
        P1A[OpenGraph & Twitter Card Metadata] --> P1B[Favicon & App Icons]
        P1B --> P1C[WebP Image Optimization & Logo Thumbnail]
        P1C --> P1D[Prune Legacy Unused Assets]
    end

    subgraph Phase 2: Logic Decoupling
        P2A[Extract quiz-engine.js] --> P2B[Separate quiz-data-lt.js & en.js]
        P2B --> P2C[Language Switcher a11y & ARIA Enhancements]
    end

    subgraph Phase 3: Data Layer & Template Engine
        P3A[Create data/ Schema JSON Files] --> P3B[Extract FAQ, Guide & Class Data]
        P3B --> P3C[Implement scripts/build.js Pre-renderer]
        P3C --> P3D[Integrate GitHub Actions Deploy Workflow]
        P3D --> P3E[Add Interactive Search to Guides/FAQ]
    end

    subgraph Phase 4: Community & Guild Tools
        P4A[Quiz Discord Share / Webhook] --> P4B[Raid Boss Quick-Reference Module]
        P4B --> P4C[Raid Schedule / Sign-up Widget]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

### Phase 1: Immediate Polish & Performance (Est. 1–2 hours)
* [ ] Add OpenGraph and Twitter Card metadata across all 8 HTML files.
* [ ] Generate standard `favicon.ico` (32x32) and `apple-touch-icon.png` (180x180) from `kaukai_logo.jpg`.
* [ ] Create optimized 90x90px `kaukai_logo.webp` thumbnail (saving ~470 KB on every page load).
* [ ] Compress `cozy_forest_camp.jpg` to WebP (saving ~700 KB).
* [ ] Archive/prune unused assets (`elwynn_fireplace.jpg` and `landingv3_old.html`).

### Phase 2: Logic Decoupling & DRY Architecture (Est. 2–3 hours)
* [ ] Extract universal quiz state machine and scoring logic into `quiz-engine.js`.
* [ ] Separate language-specific question and spec dictionaries into `quiz-data-lt.js` and `quiz-data-en.js`.
* [ ] Enhance `navbar.js` with full W3C keyboard navigation for the language dropdown (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`).
* [ ] Implement mobile menu body scroll lock (`document.body.classList.toggle('nav-open')`).

### Phase 3: The Data Layer & Pre-render Engine (Est. 3–4 hours)
* [ ] Design JSON schemas for `data/faq.json`, `data/classes.json`, `data/guides.json`, and `data/ranks.json`.
* [ ] Migrate existing page copy from HTML files into the centralized JSON files.
* [ ] Write a clean, zero-dependency Node.js pre-renderer script (`scripts/build.js`) using HTML templates.
* [ ] Set up GitHub Actions CI workflow (`.github/workflows/deploy.yml`) to automatically build and deploy to GitHub Pages on `main` push.
* [ ] Add real-time fuzzy search input to the Beginner's Guide and FAQ pages.

### Phase 4: Interactive Guild Features (Est. 2–4 hours)
* [ ] Add "Copy Result for Discord" formatted markdown generator to the quiz result screen.
* [ ] Implement optional Discord Webhook integration for quiz results.
* [ ] Create interactive Raid Boss Tactics module powered by `data/raids.json`.
* [ ] Add guild event schedule / raid countdown widget.

---

## 6. Decision Points for the Team

1. **Build Tooling Preference**:
   * Do you prefer **Option A (Lightweight zero-dependency Node.js script)** which keeps git commits clean and requires only native `node scripts/build.js`, or would you like to explore a complete framework like **Astro**?
2. **Discord Integration Level**:
   * Would you like the quiz result screen to simply copy formatted text for Discord, or directly trigger a Discord Webhook to post to your server's `#welcome` or `#bot-spam` channel?
3. **Execution Order**:
   * We can immediately execute **Phase 1** (OpenGraph tags, Favicon, WebP image optimizations, logo thumbnailing) right now, followed by **Phase 2** (DRY Quiz engine extraction).
