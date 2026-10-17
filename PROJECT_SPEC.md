# WoW Forever Guild & Web Platform — Master Developer Specification

This document consolidates all guild strategy specs, website blueprints, quiz matrix logic, shared component architecture, and codebase standards for the **WoW Forever: Lietuvos Aljanso Gildija ("Kaukai")** project. Use this file as the primary architectural reference when continuing development in **Antigravity**.

---

## 1. Project Overview & Guild Identity

* **Guild Name:** Kaukai
* **Server Target:** *WoW Forever* (Classic/Vanilla custom server format, PvE realm)
* **Faction:** Alliance (Monopoly Strategy — unifying all Lithuanian Alliance players under one roof while Horde guilds split their player base)
* **Ethos / Slogan:** *"Namai toli nuo namų – tavo ramybės tvirtovė nuotykių pasaulyje"*
* **Target Demographic:** Casual-friendly Lithuanian players, returning veterans, newcomers, and respectful international adventurers.
* **Guild Model:** **Social-Raiding Hybrid** (Carry Core + Apprentice/Social Raiders). A core group of experienced raiders handles progression while onboarding and supporting newer members.
* **Language Policy:** The guild's primary communication language for in-game chat, official announcements, and Discord voice is Lithuanian. However, English-speaking players are warmly welcomed, with officers and bilingual members providing translations and guidance.

### Core Values
1. **Savų bėdoje nepaliekam:** Free starter bags for low levels, help with group quests, 5-man dungeon runs.
2. **Poilsis, o ne antras darbas:** No mandatory attendance for casuals; clear, structured progression path for raiders without unreasonable pressure.
3. **Tiesiai ir šviesiai:** Transparent rules, open decision-making, and clear loot allocation (SR+1) from day one.

---

## 2. Technical Stack & Architecture

* **Platform:** Multi-Page Static Web Application (MPA) with a bilingual mirror hierarchy.
* **Core Technologies:** Semantic HTML5, Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Backdrop-Filter Glassmorphism, Keyframe Animations), and Vanilla JavaScript (ES6+, zero external runtime dependencies).
* **Typography:** Google Fonts (`Cinzel` for headings and accents, `Inter` / `Open Sans` for readable body typography).
* **Color Palette & Design Tokens:**
  - Background Canvas: `--bg-color: #08090a;`
  - Alliance Antique Gold: `--gold: #c69c6d;`
  - Muted Gold: `--gold-dim: #7a634a;`
  - Primary Text: `--text-main: #d1d5db;`
  - Secondary / Muted Text: `--text-muted: #8b929a;`
  - Subtle Borders: `--border-subtle: rgba(198, 156, 109, 0.15);`
  - Campfire Glow: `rgba(230, 126, 34, 0.2)`
* **Visual FX:** Fixed campfire background (`cozy_forest_camp.jpg`) with a dark gradient overlay and smooth ambient transitions.
* **Hosting & Custom Domain:** GitHub Pages deployment with custom domain configuration via `CNAME` (`wow-kaukai.lt`).
* **Anchor Navigation:** Built-in fixed header offset using `scroll-padding-top: 95px` on `html` for smooth, unclipped scrolling.

---

## 3. Directory Structure & File Map

```
c:\WoW'as\Antigravityenv\
│
├── CNAME                         # Production domain pointer (wow-kaukai.lt)
├── PROJECT_SPEC.md               # Master Developer Specification (this document)
├── catchup.md                    # Cumulative development log & session catchup
├── IMPROVEMENTS.md               # Code audit, optimization recommendations & roadmap
├── LONG_TERM_PLAN.md             # Long-term Data Layer & static compiler architecture
│
├── index.html                    # Root Landing Page (Lithuanian)
├── gidas.html                    # Beginner's Guide & 9 Class Cards (Lithuanian)
├── duk.html                      # FAQ & SR+1 Loot Rules Accordion (Lithuanian)
├── testas.html                   # 10/30-Question Personality & Spec Quiz (Lithuanian)
│
├── guide.html                    # Root URL shim -> redirects to en/guide.html
├── faq.html                      # Root URL shim -> redirects to en/faq.html
├── quiz.html                     # Root URL shim -> redirects to en/quiz.html
│
├── en/                           # English Mirror Directory
│   ├── index.html                # English Landing Page (with Community Language Note)
│   ├── guide.html                # English Beginner's Guide & Class Cards
│   ├── faq.html                  # English FAQ (with Language Policy clarification)
│   ├── quiz.html                 # English Personality & Spec Quiz
│   ├── gidas.html                # EN alias shim -> redirects to guide.html
│   ├── duk.html                  # EN alias shim -> redirects to faq.html
│   └── testas.html               # EN alias shim -> redirects to quiz.html
│
├── navbar.js                     # Centralized navigation engine & language switcher
├── quiz-engine.js                # Universal quiz state machine & scoring algorithm
├── quiz-data-lt.js               # Lithuanian quiz dataset (questions, specs, traits)
├── quiz-data-en.js               # English quiz dataset (questions, specs, traits)
├── style.css                     # Global stylesheet & design system
├── cozy_forest_camp.webp         # High-efficiency WebP background artwork (~146 KB)
├── kaukai_logo_thumb.webp        # 90x90px 2x Retina logo thumbnail for header (~2.4 KB)
├── favicon.ico                   # Multi-resolution favicon icon
├── favicon-32x32.png             # 32x32 PNG favicon
└── apple-touch-icon.png          # 180x180 PNG web app icon
```

---

## 4. Page Specifications & Content Architecture

### 4.1. Landing Pages (`index.html` & `en/index.html`)
1. **Site Header (`<header id="site-header"></header>`):** Dynamically populated by `navbar.js`.
2. **Hero Section (`#hero`):**
   * Primary title: *"Namai toli nuo namų. Ramybės tvirtovė."* / *"A home away from home. A sanctuary of peace."*
   * Subtitle introducing the cozy, unhurried Alliance campfire philosophy.
   * Call to Action Buttons: *"Personažo Testas"* (routes to quiz) and *"Discord"* (link to `https://discord.gg/8Ph2mfPWzE`).
3. **Newcomers Callout Banner (`#naujokams` / `#newcomers`):**
   * Highlighting the beginner-friendly guide with direct button link.
4. **Values & Community Note (`#apie` / `#about`):**
   * In `en/index.html`: Dedicated **Community Language Note** explaining that guild chat and voice are primarily Lithuanian, but English speakers are welcome and supported.
   * 3 Core Value Cards: *Savų bėdoje nepaliekam*, *Poilsis, o ne antras darbas*, *Tiesiai ir šviesiai*.
5. **Guild Ranks (`#rangai` / `#ranks`):**
   * *Kaukai* (Social/Leveling casuals).
   * *Ginklanešiai / Armsmen* (Raid apprentices learning tactics).
   * *Žygeiviai / Pathfinders* (Core progression raiders).
6. **Camp Tips (`#gidai` / `#tips`):**
   * Gold management (save for level 40 mount).
   * Synergistic professions (Herbalism + Alchemy / Mining + Engineering).
   * Dungeon etiquette (tank pulls first, Need before Greed).
7. **Progression Roadmap (`#taisykles` / `#progression`):**
   * Stage 1: Levels 1–59 (Leveling & 5-man dungeons).
   * Stage 2: Early Level 60 (20-man entry raids ZG/AQ20).
   * Stage 3: Major Raids (40-man MC, Onyxia, BWL).
8. **Loot Rules Summary (`#grobis` / `#loot`):**
   * Overview of the **Soft-Reserve +1 (SR+1)** system with protection for Main Tanks and Healers.
9. **Footer:** Final call to action and Discord join button.

---

### 4.2. Beginner's Guide (`gidas.html` & `en/guide.html`)
An educational hub designed for players with zero previous World of Warcraft experience:
* **Kas yra World of Warcraft?**: Core concept of MMORPG, Alliance vs. Horde, and collaborative guild play.
* **Žaidimo turinys ir vaidmenys**: Požemiai (5-man dungeons), Reidai (20/40-man raids), PvP, and the Holy Trinity (Tankas, Gydytojas, DPS).
* **Užduotys (Quests)**: Quest indicators (`!` and `?`), reading quest journals without modern quest markers.
* **Profesijos**: Primary gathering/crafting vs. Secondary professions (First Aid is mandatory).
* **Mirtis žaidime**: Ghost runs, 10% armor durability loss, and resurrection sickness warnings.
* **Ekonomika**: Copper/Silver/Gold conversions, vendor trash (gray items), Auction House, and saving for the level 40 mount.
* **Klasių apžvalga (All 9 Alliance Classes)**: Standardized 3-sentence card layout:
  1. **Warrior (Karys):** Plate vanguard tank or devastating melee DPS; Battle Shout party power.
  2. **Paladin (Paladinas):** Holy plate defender with efficient single-target heals, Divine Shield, and Blessings/Auras.
  3. **Priest (Dvasininkas):** Cloth raid healer with Power Word: Shield, Shadow magic, and Fortitude stamina buff.
  4. **Shaman (Šamanas):** Mail elementalist with Chain Heal, shock spells, and stat-boosting totems (Alliance feature on WoW Forever).
  5. **Mage (Burtininkas):** Cloth master of arcane, fire, and frost with AoE spells, Polymorph, and food/water/portals.
  6. **Warlock (Raganius):** Cloth master of curses and demons with Healthstones, Soulstones, and ritual summons.
  7. **Rogue (Plėšikas):** Stealth assassin with dual poisons, burst damage, Kick interrupts, and lockpicking.
  8. **Hunter (Medžiotojas):** Mail marksman with loyal pet, utility traps, safe pulls, and Trueshot aura.
  9. **Druid (Druidas):** Shapeshifting hybrid (bear tank, cat DPS, healer) with Mark of the Wild, Innervate, and combat battle rez.

---

### 4.3. FAQ & SR+1 Rules (`duk.html` & `en/faq.html`)
Implemented with accessible `<details class="faq-item" name="faq-group">` elements:
* **Server Format:** WoW Forever Alliance PvE realm.
* **Beginner Welcome:** Step-by-step advice for new recruits.
* **Loot Distribution (SR+1):**
  1. *Soft-Reserve*: 1 item reserved per player before raid.
  2. *Reserve Rolls*: Only reserving players roll `/roll 100` (uncontested = instant win).
  3. *+1 Fairness Mark*: Winning an item adds +1; 0 wins takes priority over +1 on subsequent rolls.
  4. *Unreserved Gear*: Main-Spec roll with existing marks, followed by Off-Spec roll.
  5. *Core Safeguard*: Main Tank and core Healers may receive direct allocation on critical survivability items to protect the entire team.
* **Discord & Comms Policy:** Microphone not required; written announcements and tactical updates posted on Discord. English FAQ includes an explicit breakdown of the Lithuanian guild voice/chat environment.

---

### 4.4. Personality Quiz (`testas.html` & `en/quiz.html`)
* **Dual Formats:** Toggle between **Trumpa Versija** (10 questions) and **Pilna Versija** (30 questions).
* **Short Version Balance:** Mathematically balanced across 6 race questions (Q1–Q6) and 4 comprehensive trait questions (Q7–Q10), perfectly awarding 1 point to each of the 12 traits.
* **Interactive Results:** Displays winning Race, Class, Specialization, role description, and breakdown badges for top trait scores, with an instant toggle button to try the alternate version.

---

## 5. Universal Navigation Engine (`navbar.js`)

The navigation bar is generated dynamically via an IIFE in `navbar.js` and mounted to `<header id="site-header"></header>`:

### Core Responsibilities
1. **Dynamic Language & Route Detection**: Inspects `document.documentElement.lang` and `window.location.pathname` to identify active language (`lt` or `en`) and page identity (`index`, `guide`, `quiz`, `faq`).
2. **Path Mapping**: Automatically computes relative cross-language links (e.g., from `gidas.html` to `en/guide.html`, and from `en/faq.html` to `../duk.html`).
3. **Active Route Styling**: Automatically applies `.active` class to the current page's navigation link.
4. **Subtle Language Switcher Dropdown**:
   * Replaces oversized buttons with a compact trigger (`LT ▼` / `EN ▼`) containing the active flag.
   * Renders an expandable menu with crisp SVG flags.
   * Manages outside-click dismissal and `Escape` key close listeners.
   * Employs an expandable `LANGUAGES` array designed for painless future language additions.
5. **Mobile Navigation Drawer**:
   * Hamburger button toggling an animated slide-out drawer on viewports `< 768px`.
   * Automatically closes drawer upon clicking any navigation link.
6. **Accordion Exclusivity**: Listens to `<details>` toggle events across FAQ and Guide pages to ensure only one item remains open at a time.
7. **Environment Resilience**:
   * Resolves relative file links cleanly when tested in local `file://` environments.
   * Wraps history manipulations (`replaceState`) in try/catch and protocol guards to avoid `SecurityError` exceptions.

---

## 6. 30-Question Quiz Logic & Scoring Matrix

### Logic Overview
* **Questions 1–6 (Race Determination):** Accumulate points across 4 Alliance races (`Human`, `Dwarf`, `Gnome`, `NightElf`).
* **Questions 7–30 (Class & Spec Trait Vectors):** Accumulate points across 12 psychological trait vectors:
  * **Worldview:** `PN` (Pareiga/Atsakomybė), `VS` (Laisvė/Nepriklausomybė), `PI` (Protas/Pažinimas), `DS` (Darna/Ramybė)
  * **Combat:** `FL` (Fronto Linija), `SA` (Strategija), `MK` (Gudrumas/Klasta), `PG` (Palaikymas)
  * **Internal Dilemma:** `ŠS` (Savitvarda), `Pas` (Pasiaukojimas), `MR` (Pragmatizmas/Rezultatas), `GD` (Principai/Dogma)

### Allowed Race/Class Combinations (WoW Forever Format)
* **Human:** Warrior, Hunter (Custom), Mage, Rogue, Priest, Warlock, Paladin
* **Dwarf:** Warrior, Hunter, Rogue, Priest, Paladin, Shaman (Custom Alliance Addition)
* **Gnome:** Warrior, Mage, Rogue, Priest (Custom), Warlock
* **Night Elf:** Warrior, Hunter, Rogue, Priest, Druid

### Tie-Breaker Algorithm
1. Sum trait scores for each of the 27 Classic specs (`score = traitScores[t1] + traitScores[t2] + traitScores[t3]`).
2. Filter winning specs by allowed classes for the winning race.
3. If tie persists, evaluate specific question answer indices:
   * Arms Warrior vs. Retribution Paladin (`ans[6] === 'A' && ans[8] === 'A'` -> Paladin)
   * Protection Warrior vs. Protection Paladin (`ans[23] === 'C' || ans[29] === 'C'` -> Paladin)
   * Holy Paladin vs. Holy Priest (`ans[7] === 'B' || ans[11] === 'C'` -> Priest)
   * Assassination Rogue vs. Survival Hunter (`ans[17] === 'A' || ans[21] === 'B'` -> Hunter)
   * Beast Mastery Hunter vs. Elemental Shaman (`ans[6] === 'C' || ans[9] === 'B'` -> Shaman)
   * Feral Druid vs. Enhancement Shaman (`ans[15] === 'C' || ans[18] === 'A'` -> Shaman)
   * Resto Druid vs. Resto Shaman (`ans[28] === 'C'` -> Shaman)
   * Caster ties (Shadow Priest, Affliction/Destro Lock, Arcane Mage): evaluated via answers to Q8, Q12, Q25, Q28, Q30.
4. Enforce Class Primacy: If a winning class is locked (e.g., Shaman or Druid), re-assign the highest-scoring valid race for that class (Dwarf for Shaman, Night Elf for Druid).

---

## 7. Codebase Maintenance & Quality Standards

When making changes to this codebase in future sessions, follow these operational rules:

1. **Header Consistency**: Never write static `<nav>` blocks inside HTML files. Always mount `<header id="site-header"></header>` and include `<script src="navbar.js"></script>` (or `../navbar.js` in `/en/`).
2. **Bilingual Parity**: Any content addition or section alteration made to Lithuanian pages (`index.html`, `gidas.html`, `duk.html`, `testas.html`) must have a corresponding, reviewed translation applied to its English equivalent in `/en/`.
3. **Class Card Formatting**: Maintain the strict 3-sentence pattern for class descriptions across both guides.
4. **Zero Build Step**: The project must remain natively executable in any browser via plain file loading and standard static hosting without requiring bundlers, node dependencies, or compilation steps.
5. **Refer to `IMPROVEMENTS.md`**: Consult [IMPROVEMENTS.md](file:///c:/WoW'as/Antigravityenv/IMPROVEMENTS.md) for planned architectural milestones, including WebP image conversions, OpenGraph tags, and quiz engine extraction.
