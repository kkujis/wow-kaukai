# WoW Forever "Kaukai" Guild Website - Session Catchup

## 1. Current State & Site Structure

The project has transitioned from a monolithic prototype into a complete, modular, bilingual static web platform:

### Lithuanian Pages (Default / Root)
* `index.html`: The main landing page featuring hero call-to-actions, newcomer guide banner, guild core values, roster tiers, camp tips, progression timeline, SR+1 loot overview, and Discord invite footer.
* `gidas.html`: Comprehensive beginner's onboarding guide covering MMORPG fundamentals, group roles (Tank/Healer/DPS), questing, gathering & crafting professions, death mechanics, game economy, and standardized 3-sentence descriptions for all 9 Alliance classes.
* `duk.html`: Frequently asked questions presented as an interactive single-open accordion. Details the WoW Forever PvE realm, tips for newcomers, in-depth SR+1 loot distribution rules (including Main Tank & Healer safeguards), and Discord guidelines.
* `testas.html`: 10-question short form and 30-question full form personality quiz, now fully decoupled from logic and powered by `quiz-data-lt.js` and `quiz-engine.js`.

### English Mirror Pages (`/en/`)
* `en/index.html`: Complete English translation of the landing page, featuring a dedicated **Community Language Note** clarifying that while in-game chat and Discord voice are predominantly Lithuanian, international and English-speaking players are warmly accommodated.
* `en/guide.html`: Full English translation of the beginner's guide with identical standardized 3-sentence cards for all 9 classes.
* `en/faq.html`: English FAQ covering realm rules, beginner advice, SR+1 loot mechanics, and an explicit explanation of the guild's primary Lithuanian language policy.
* `en/quiz.html`: Full English translation of the 10/30-question personality quiz, powered by `quiz-data-en.js` and `quiz-engine.js`.

### Core Shared Components & Assets
* `navbar.js`: Centralized header script that automatically detects current language and route, mounts `<header id="site-header">`, highlights active links, renders a subtle expandable language dropdown with keyboard navigation (`ArrowUp`/`ArrowDown`/`Escape`), manages the responsive mobile drawer with `aria-expanded`, enforces single-open accordion exclusivity, and safely resolves relative URLs.
* `quiz-engine.js`: Universal modular quiz engine handling state management, question rendering, scoring matrices, spec tie-breakers, and DOM result cards.
* `quiz-data-lt.js`: Lithuanian quiz dataset containing questions, trait names, race names, and spec profiles.
* `quiz-data-en.js`: English quiz dataset containing questions, trait names, race names, and spec profiles.
* `style.css`: Unified stylesheet containing CSS custom properties, glassmorphism cards, typography (`Cinzel` & `Inter`), button variants, roster tiers, class grids, quiz layouts, mobile drawers, and smooth scrolling with fixed-navbar offset (`scroll-padding-top: 95px`).
* `cozy_forest_camp.webp`: Global fixed background image in high-efficiency WebP format (~146 KB vs 876 KB, an 83% payload reduction).
* `kaukai_logo_thumb.webp`: 90x90px 2x Retina circular logo thumbnail (~2.4 KB vs 481 KB, a 99.5% payload reduction).
* `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`: Generated multi-resolution site favicons.
* `CNAME`: Configured for custom domain deployment at `wow-kaukai.lt`.
* `IMPROVEMENTS.md`: Detailed audit of future architectural, performance, SEO, and accessibility enhancements.
* `LONG_TERM_PLAN.md`: Strategic architecture specification for the future JSON Data Layer and template pre-renderer.

---

## 2. Completed Milestones

* **Asset Optimization (Phase 1 Completed)**:
  * Converted `cozy_forest_camp.jpg` to `cozy_forest_camp.webp`, shrinking background image payload by **83%** (from 876 KB to 146 KB).
  * Generated a dedicated 90x90px `kaukai_logo_thumb.webp` and integrated it into `navbar.js`, shrinking the navbar logo payload by **99.5%** (from 481 KB to 2.4 KB).
  * Generated and linked multi-resolution favicons (`favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`).
  * Pruned unreferenced legacy assets (`elwynn_fireplace.jpg` and `landingv3_old.html`), reclaiming over 1 MB of disk space.
* **SEO & Social Sharing Metadata (Phase 1 Completed)**:
  * Implemented OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:type`) and Twitter Cards across all 8 HTML files for rich embeds on Discord, Facebook, and social platforms.
  * Added absolute `canonical` tags to avoid duplicate indexing across GitHub Pages subdomains.
* **DRY Quiz Engine Modularization (Phase 2 Completed)**:
  * Extracted the duplicate ~600-line inline scripts from `testas.html` and `en/quiz.html` into `quiz-engine.js`.
  * Externalized localized quiz questions, spec definitions, and trait text into `quiz-data-lt.js` and `quiz-data-en.js`.
  * Reduced `testas.html` file size from **41.8 KB to 6.4 KB** and `en/quiz.html` from **41.6 KB to 6.4 KB**.
* **Accessibility & Language Dropdown Enhancements (Phase 2 Completed)**:
  * Added W3C keyboard arrow navigation (`ArrowDown`, `ArrowUp`, `Escape`) to the language switcher dropdown in `navbar.js`.
  * Added `aria-expanded` synchronization on mobile hamburger menu and language trigger buttons.
* **Unified Navigation Engine (`navbar.js`)**: Consolidated navigation into a single shared component mounted via `<header id="site-header"></header>` across all 8 pages.
* **Standardized 3-Sentence Class Cards**: Harmonized all 9 Alliance class descriptions across both `gidas.html` and `en/guide.html` into a clean, uniform 3-sentence structure.
* **Community Language Policy**: Added prominent community notices in `en/index.html` and `en/faq.html` detailing the Lithuanian primary voice/chat environment while welcoming English speakers.

* **Content & UX Refinements (General Improvements Completed)**:
  * **Authentic Guild Ranks:** Restored untranslated Lithuanian rank titles (`Kaukai`, `Ginklanešiai`, `Žygeiviai`) on [`en/index.html`](file:///c:/WoW'as/Antigravityenv/en/index.html).
  * **Strict Separation of Concerns (FAQ vs. Guide):** Audited and separated guild/policy questions into [`duk.html`](file:///c:/WoW'as/Antigravityenv/duk.html) & [`en/faq.html`](file:///c:/WoW'as/Antigravityenv/en/faq.html) (expanded to 10 comprehensive Q&As covering server rules, attendance, alts, SR+1 edge cases, and Discord) while placing all gameplay mechanics into [`gidas.html`](file:///c:/WoW'as/Antigravityenv/gidas.html) & [`en/guide.html`](file:///c:/WoW'as/Antigravityenv/en/guide.html) (added 5-man dungeon etiquette, leveling zone tips, and a responsive profession synergy table).
  * **Universal Live Search Filter:** Added instant client-side search bars (`#faqSearchInput` and `#guideSearchInput`) to both the FAQ and Beginner's Guide pages, powered by [`navbar.js`](file:///c:/WoW'as/Antigravityenv/navbar.js) to filter accordion sections and class cards in real time.
  * **Scope Pruning:** Dismissed unnecessary external dependencies (Discord webhook bots, standalone raid modules) per [`GENERAL_IMPROVEMENTS.md`](file:///c:/WoW'as/Antigravityenv/GENERAL_IMPROVEMENTS.md) to keep the platform fast, static, and maintenance-free.
