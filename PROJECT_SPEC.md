# WoW Forever Guild & Web App — Master Developer Specification

This document consolidates all guild strategy specs, website blueprints, quiz matrix logic, and source code for the **WoW Forever: Lietuvos Aljanso Gildija ("Kaukai")** project. Use this file as the primary context or system prompt when continuing development in **Antigravity**.

---

## 1. Project Overview & Guild Identity

* **Guild Name (Candidate):** Kaukai (Backup/Historical: Bildukai)
* **Server Target:** *WoW Forever* (Classic/Vanilla custom server format)
* **Faction:** Alliance (Monopoly Strategy — unifying all Lithuanian Alliance players under one roof while Horde guilds split their player base)
* **Ethos / Slogan:** *"Namai toli nuo namų – tavo ramybės tvirtovė nuotykių pasaulyje"*
* **Target Demographic:** Casual-friendly Lithuanian players, returning veterans, and newcomers.
* **Guild Model:** **Social-Raiding Hybrid** (Carry Core + Apprentice/Social Raiders). A core group of experienced raiders handles progression while onboarding and supporting newer members.

### Core Values
1. **Niekas nelieka už borto:** Free bags for low levels, help with group quests, 5-man dungeon runs.
2. **Kiekvienam pagal norą ir laiką:** No mandatory 4-night commitments for casuals; clear progression path for raiders.
3. **Atvirumas ir tiesus žodis:** Transparent rules, open decision-making, clear loot allocation from day one.

---

## 2. Technical Stack & Architecture

* **Format:** Single-Page Application (SPA) contained in `index.html`.
* **Tech Stack:** Vanilla HTML5, CSS3 (CSS Variables, Flexbox/Grid, Keyframe Animations, Backdrop-Filter), Vanilla JavaScript (ES6, zero external JS dependencies).
* **Typography:** Google Fonts (`Cinzel` for headings, `Open Sans` for body text).
* **Styling Theme:** Alliance Antique Gold (`#c69c6d`), Dark Canvas (`#0f1115`), Container Cards (`#1a1c23`), Fire Glow (`#e67e22`).
* **Visual FX:** Fixed tavern/fireplace background with a dark gradient overlay and pulsing firelight animation (`@keyframes firelight`).
* **Hosting Target:** Free static hosting via GitHub Pages, Netlify, Vercel, or Firebase Hosting.

---

## 3. Website Structure & Navigation

1. **Navigation Bar (`<nav>`):** Fixed header with anchor links (`#hero`, `#vertybes`, `#testas`, `#gidai`, `#taisykles`).
2. **Hero Section (`#hero`):**
   * H1: *"Namai toli nuo namų – tavo ramybės tvirtovė nuotykių pasaulyje"*
   * Subtitle: Conversational, welcoming introduction for Lithuanian Alliance players.
   * Call to Action Buttons: *"Atrask savo klasę"* (scrolls to quiz) & *"Jungtis prie Discord"* (Discord invite link).
3. **Values & Guild Dynamics (`#vertybes`):**
   * 3 Value Cards (No man left behind, Flexible commitment, Openness).
   * Roster Dynamics Table: Social/Leveling vs. Raid Apprentices vs. Core Raiders.
4. **Interactive Class & Race Quiz Engine (`#testas`):**
   * 30-question interactive test (6 Race questions + 24 Class/Trait questions).
   * Progress bar, dynamic question rendering, scoring algorithm, and result calculation display.
5. **Beginner's Survival Guide (`#gidai`):**
   * Economy & Trainers advice (do not buy every spell rank; save silver for mount at 40).
   * Gathering Professions recommendation (Skinning + Mining/Herbalism for early capital).
   * Dungeon Etiquette (Tank pulls first, Need-before-Greed looting).
6. **Progression & Loot Rules (`#taisykles`):**
   * 3-Stage Pipeline: Stage 1 (Levels 1–59), Stage 2 (Early 60 / 20-man raids ZG/AQ20), Stage 3 (40-man MC/Onyxia).
   * Transparent **Soft-Reserve (SR+1)** loot system with protection for main tanks.
7. **Footer:** Final call to action and Discord join button.

---

## 4. 30-Question Quiz Logic & Scoring Matrix

### Logic Overview
* **Questions 1–6 (Race Determination):** Accumulate points across 4 Alliance races (`Human`, `Dwarf`, `Gnome`, `NightElf`).
* **Questions 7–30 (Class & Spec Trait Vectors):** Accumulate points across 12 psychological trait vectors:
  * **Worldview:** `PN` (Pareiga/Atsakomybė), `VS` (Laisvė/Nepriklausomybė), `PI` (Protas/Pažinimas), `DS` (Darna/Ramybė)
  * **Combat:** `FL` (Fronto Linija), `SA` (Strategija), `MK` (Gudrumas/Klasta), `PG` (Palaikymas)
  * **Internal Dilemma:** `ŠS` (Savitvarda), `Pas` (Pasiaukojimas), `MR` (Pragmatizmas/Rezultatas), `GD` (Principai/Dogma)

### Allowed Race/Class Combinations (WoW Forever Format)
* **Human:** Warrior, Hunter (New), Mage, Rogue, Priest, Warlock, Paladin
* **Dwarf:** Warrior, Hunter, Rogue, Priest, Paladin, Shaman (New / Alliance First)
* **Gnome:** Warrior, Mage, Rogue, Priest (New), Warlock
* **Night Elf:** Warrior, Hunter, Rogue, Priest, Druid

### Tie-Breaker Rules
1. Sum trait scores for each of the 27 Classic specs (`score = traitScores[t1] + traitScores[t2] + traitScores[t3]`).
2. Filter winning specs by allowed classes for the winning race.
3. If tie persists, evaluate specific question answer indices (e.g. Arms Warrior vs Ret Paladin, Protection Warrior vs Protection Paladin, Shadow Priest vs Warlock).
4. Enforce Class primacy: if a class is forced (e.g. Shaman or Druid), assign the highest-scoring valid race for that class (e.g. Dwarf for Shaman, Night Elf for Druid).

---

## 5. Next Development Steps for Antigravity

When continuing development in **Antigravity**, consider implementing the following enhancements:

1. **Discord Webhook / Result Copying:**
   * Add a *"Nukopijuoti rezultatą Discordui"* or *"Siųsti į Discord"* button on the result screen so players can post their quiz results (`"Mano rezultatas: Nykštukas Paladinas (Apsauga)!"`) directly to a Discord `#welcome` channel via Webhook.
2. **Mobile Menu & Navigation Polish:**
   * Add a hamburger toggle for smaller mobile screens.
3. **Guild Charter Modal / Popup:**
   * Create an interactive modal displaying detailed raid expectations and officer contact info.
4. **Localization & Content Expansion:**
   * Add sub-pages or tabbed views for class guides, talent builds, and guild event schedules.

---

## 6. Complete Source Code (`index.html`)

```html
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WoW Forever: Lietuvos Aljanso Gildija</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Open+Sans:wght@300;400;600&display=swap');

        :root {
            --bg-color: #0f1115;
            --container-bg: #1a1c23;
            --text-main: #e0e6ed;
            --text-muted: #8b92a5;
            --gold: #c69c6d;
            --gold-hover: #e4bb88;
            --fire-glow: #e67e22;
            --accent-dark: #2a2d37;
            --border-radius: 8px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        @keyframes firelight {
            0% { box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 15px rgba(230, 126, 34, 0.05); border-color: rgba(198, 156, 109, 0.1); }
            50% { box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 45px rgba(230, 126, 34, 0.25); border-color: rgba(198, 156, 109, 0.4); }
            100% { box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 15px rgba(230, 126, 34, 0.05); border-color: rgba(198, 156, 109, 0.1); }
        }

        body {
            background-color: var(--bg-color);
            /* Cozy Elwynn Forest tavern fireplace background */
            background-image: 
                linear-gradient(to bottom, rgba(15, 17, 21, 0.58), rgba(15, 17, 21, 0.90)),
                url('elwynn_fireplace.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            color: var(--text-main);
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            scroll-behavior: smooth;
        }

        h1, h2, h3 {
            font-family: 'Cinzel', serif;
            color: var(--gold);
            font-weight: 700;
        }

        nav {
            background-color: rgba(15, 17, 21, 0.95);
            position: fixed;
            top: 0;
            width: 100%;
            padding: 15px 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(230, 126, 34, 0.2);
            text-align: center;
            box-shadow: 0 2px 15px rgba(0,0,0,0.8);
        }

        nav a {
            color: var(--text-main);
            text-decoration: none;
            margin: 0 15px;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            transition: color 0.3s, text-shadow 0.3s;
        }

        nav a:hover {
            color: var(--gold);
            text-shadow: 0 0 10px var(--fire-glow);
        }

        section {
            padding: 100px 20px 60px;
            max-width: 1000px;
            margin: 0 auto;
        }

        #hero {
            text-align: center;
            padding-top: 150px;
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        #hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            letter-spacing: 1px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.9), 0 0 10px rgba(230, 126, 34, 0.3);
        }

        #hero p {
            font-size: 1.2rem;
            color: #f1f5f9;
            max-width: 700px;
            margin: 0 auto 40px;
            text-shadow: 0 2px 8px rgba(0,0,0,0.9);
            font-weight: 400;
        }

        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            background-color: transparent;
            color: var(--gold);
            border: 2px solid var(--gold);
            padding: 15px 30px;
            font-size: 1.1rem;
            font-family: 'Cinzel', serif;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: var(--border-radius);
            text-transform: uppercase;
            text-decoration: none;
            background: rgba(15, 17, 21, 0.7);
            backdrop-filter: blur(5px);
        }

        .btn-primary {
            background-color: var(--gold);
            color: var(--bg-color);
            border-color: var(--gold);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 25px rgba(230, 126, 34, 0.5);
            border-color: var(--fire-glow);
        }

        .btn-primary:hover {
            background-color: var(--fire-glow);
            color: #fff;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 40px;
        }

        .card {
            background-color: rgba(26, 28, 35, 0.92);
            padding: 30px;
            border-radius: var(--border-radius);
            border: 1px solid #333;
            text-align: left;
            animation: firelight 4s infinite alternate ease-in-out;
            backdrop-filter: blur(10px);
        }

        .card h3 {
            margin-bottom: 15px;
            font-size: 1.3rem;
            color: var(--gold);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            background-color: rgba(26, 28, 35, 0.95);
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid rgba(230, 126, 34, 0.1);
        }

        th {
            background-color: rgba(15, 17, 21, 0.9);
            color: var(--gold);
            font-family: 'Cinzel', serif;
        }

        #quiz-wrapper {
            background-color: rgba(26, 28, 35, 0.92);
            padding: 40px;
            border-radius: var(--border-radius);
            border: 1px solid #333;
            text-align: center;
            animation: firelight 5s infinite alternate ease-in-out;
            backdrop-filter: blur(10px);
        }

        .progress-container { width: 100%; background-color: rgba(15, 17, 21, 0.9); border-radius: 4px; margin-bottom: 30px; height: 10px; display: none; overflow: hidden; }
        .progress-bar { height: 100%; background-color: var(--fire-glow); width: 0%; transition: width 0.4s ease; box-shadow: 0 0 15px var(--fire-glow); }
        .question-number { font-family: 'Cinzel', serif; color: var(--gold); font-size: 1.2rem; margin-bottom: 15px; display: none; }
        .question-text { font-size: 1.3rem; margin-bottom: 30px; font-weight: 600; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
        .options-container { display: flex; flex-direction: column; gap: 15px; }
        
        .option-btn {
            background-color: rgba(15, 17, 21, 0.8);
            color: var(--text-main);
            border: 1px solid rgba(230, 126, 34, 0.2);
            padding: 18px 24px;
            border-radius: var(--border-radius);
            font-size: 1.05rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
        }

        .option-btn:hover {
            background-color: rgba(230, 126, 34, 0.1);
            border-color: var(--fire-glow);
            box-shadow: 0 0 15px rgba(230, 126, 34, 0.2) inset;
        }

        #quiz-screen, #result-screen { display: none; }
        
        .result-title { font-size: 1.2rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
        .result-class { font-size: 2.8rem; color: #fff; text-shadow: 0 0 20px rgba(230, 126, 34, 0.8); margin-bottom: 5px; }
        .result-spec { font-size: 1.5rem; color: var(--gold); margin-bottom: 25px; font-family: 'Cinzel', serif; }
        .result-desc { font-size: 1.1rem; background: rgba(15, 17, 21, 0.9); padding: 25px; border-radius: var(--border-radius); border-left: 4px solid var(--fire-glow); margin-bottom: 30px; text-align: left; }
        .traits-breakdown { display: flex; justify-content: center; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
        .trait-badge { background: rgba(0, 0, 0, 0.6); padding: 8px 15px; border-radius: 20px; border: 1px solid rgba(230, 126, 34, 0.3); font-size: 0.9rem; color: #e0e6ed; }

        footer {
            text-align: center;
            padding: 40px;
            background-color: rgba(26, 28, 35, 0.95);
            border-top: 1px solid rgba(230, 126, 34, 0.2);
            margin-top: 50px;
        }
    </style>
</head>
<body>

    <nav>
        <a href="#hero">Pradžia</a>
        <a href="#vertybes">Apie Mus</a>
        <a href="#testas">Testas</a>
        <a href="#gidai">Gidai</a>
        <a href="#taisykles">Taisyklės</a>
    </nav>

    <section id="hero">
        <h1>Namai toli nuo namų – tavo ramybės tvirtovė nuotykių pasaulyje</h1>
        <p>Žaidžiame be skubėjimo, spaudimo ar dramų. Tai atvira lietuviška bendruomenė, kurioje vietos atsiras kiekvienam – nesvarbu, ar žengi pirmuosius žingsnius, ar ieškai patikimos komandos vakarams.</p>
        <div class="cta-buttons">
            <a href="#testas" class="btn btn-primary">Atrask savo klasę</a>
            <a href="#" class="btn">Jungtis prie Discord</a>
        </div>
    </section>

    <section id="vertybes">
        <h2 style="text-align: center; margin-bottom: 20px; font-size: 2.2rem;">Mūsų Vertybės</h2>
        <div class="grid-3">
            <div class="card">
                <h3>Niekas nelieka už borto</h3>
                <p>Reali pagalba vietoj tuščių žodžių. Naujokams daliname krepšius, padedame su sunkiais kvestais ir kartu einame į pirmuosius požemius. Klaidžioti vienam neteks.</p>
            </div>
            <div class="card">
                <h3>Kiekvienam pagal norą ir laiką</h3>
                <p>Gerbiame asmeninį gyvenimą. Nori ramaus lygio kėlimo – prašom. Nori rimtesnio iššūkio ir reidų – turime aiškų planą be toksiško spaudimo.</p>
            </div>
            <div class="card">
                <h3>Atvirumas ir tiesus žodis</h3>
                <p>Jokių užkulisinių intrigų ar slaptų susitarimų. Taisyklės, sprendimai ir grobio dalybos yra visiškai skaidrios nuo pat pirmos dienos.</p>
            </div>
        </div>

        <h2 style="text-align: center; margin-top: 60px; font-size: 2rem;">Gildijos Dinamika</h2>
        <table>
            <thead>
                <tr>
                    <th>Žaidėjo tipas</th>
                    <th>Ko tikimės?</th>
                    <th>Ką suteikia gildija?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Social / Leveling</strong></td>
                    <td>Pagrindinio mandagumo ir bendravimo.</td>
                    <td>Krepšiai pradžiai, patarimai, kompanija 5-man požemiams, atmosfera be patyčių.</td>
                </tr>
                <tr>
                    <td><strong>Reidų mokiniai</strong></td>
                    <td>Noro mokytis ir klausytis komandų Discorde.</td>
                    <td>Kantrus mechanikų paaiškinimas, vieta mokomuosiuose 20-man reiduose.</td>
                </tr>
                <tr>
                    <td><strong>Reidų branduolys</strong></td>
                    <td>Lankomumo, stabilumo ir personažo paruošimo.</td>
                    <td>Užtikrintas progresas, gildijos banko parama eliksyrais.</td>
                </tr>
            </tbody>
        </table>
    </section>

    <section id="testas">
        <h2 style="text-align: center; margin-bottom: 30px; font-size: 2.2rem;">Klasės ir Rasės Testas</h2>
        <div id="quiz-wrapper">
            <div id="start-screen">
                <p class="intro-text" style="margin-bottom: 30px;">
                    Šis 30 gyvenimiškų situacijų testas sukurtas „World of Warcraft Forever“ pasauliui. 
                    Atsakinėk natūraliai – taip, kaip elgtumeisi realiame gyvenime, ir sužinok savo idealų vaidmenį.
                </p>
                <button class="btn btn-primary" onclick="startQuiz()">Pradėti testą</button>
            </div>

            <div id="quiz-screen">
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                <div class="question-number" id="question-number"></div>
                <div class="question-text" id="question-text"></div>
                <div class="options-container" id="options-container"></div>
            </div>

            <div id="result-screen">
                <h2>Tavo lemtis</h2>
                <div class="result-title" id="result-race">Rasė</div>
                <div class="result-class" id="result-class">Klasė</div>
                <div class="result-spec" id="result-spec">Specializacija</div>
                <div class="traits-breakdown" id="traits-breakdown"></div>
                <div class="result-desc" id="result-desc">Aprašymas...</div>
                <button class="btn btn-primary" onclick="resetQuiz()">Bandyti iš naujo</button>
            </div>
        </div>
    </section>

    <section id="gidai">
        <h2 style="text-align: center; margin-bottom: 40px; font-size: 2.2rem;">Išgyvenimo Gidas Naujokams</h2>
        <div class="grid-3">
            <div class="card">
                <h3>Ekonomika ir Treneriai</h3>
                <p>Nepirkite visų gebėjimų iš eilės. Klasikiniame žaidime auksas yra brangus. Pirkite tik pagrindinius atakos ir išgyvenimo burtus, antraip 40-ame lygyje neturėsite pinigų pirmajam arkliui.</p>
            </div>
            <div class="card">
                <h3>Profesijų Nauda</h3>
                <p>Naujokams geriausia pradėti nuo dviejų žaliavų rinkimo profesijų (<em>Skinning</em>, <em>Mining</em> ar <em>Herbalism</em>). Viską pardavę aukciono namuose, greitai susikrausite pradinį kapitalą.</p>
            </div>
            <div class="card">
                <h3>Požemių Taisyklės</h3>
                <p><strong>Pirmas smūgis – tankui.</strong> Neskubėkite pulti, leiskite tankui surinkti priešų dėmesį. Grobį (Loot) dalinamės sąžiningai: "Need" spaudžiame tik tam daiktui, kurio reikia dabar.</p>
            </div>
        </div>
    </section>

    <section id="taisykles">
        <h2 style="text-align: center; margin-bottom: 40px; font-size: 2.2rem;">Progresijos ir Grobio Taisyklės</h2>
        <div class="card" style="margin-bottom: 20px;">
            <h3>Progresijos Etapai</h3>
            <ul style="margin-left: 20px; margin-top: 10px; color: var(--text-muted);">
                <li style="margin-bottom: 10px;"><strong>1 etapas (1–59 lygiai):</strong> Laisvas lygio kėlimas, tarpusavio pagalba ir 5-man požemiai.</li>
                <li style="margin-bottom: 10px;"><strong>2 etapas (Ankstyvas 60 lygis):</strong> 20 asmenų reidai – tai ideali erdvė aprūpinti naujokus pirmaisiais rimtais daiktais be didelio streso.</li>
                <li><strong>3 etapas (40 asmenų turinys):</strong> Molten Core ir vėlesni etapai. Pradžioje galime jungti jėgas su sąjungininkais, kol pilnai užsipildysime savu branduoliu.</li>
            </ul>
        </div>
        <div class="card">
            <h3>Skaidri Grobio Sistema (SR+1)</h3>
            <p style="margin-top: 10px; color: var(--text-muted);">
                Prieš reidą kiekvienas žaidėjas išsirenka 1 ar 2 norimus daiktus ("Soft-Reserve"). Iškritus daiktui, dėl jo varžosi tik tie, kurie jį rezervavo. Laimėjus, žaidėjas gauna +1 žymą, todėl kituose metimuose pirmenybė teikiama tiems, kurie dar nieko nelaimėjo. Tai garantuoja sąžiningą paskirstymą. Išimtis taikoma tik pagrindiniams tanko daiktams, reikalingiems visos komandos išgyvenamumui.
            </p>
        </div>
    </section>

    <footer>
        <h2>Laukiame Tavęs Azerothe!</h2>
        <p style="color: var(--text-muted); margin: 20px 0;">Jei turi klausimų ar nori tiesiog pasisveikinti, užsuk į mūsų kanalą.</p>
        <a href="#" class="btn btn-primary">Prisijungti prie Discord</a>
    </footer>

    <script>
        const allowedClasses = {
            'Human': ['Karys', 'Medžiotojas', 'Burtininkas', 'Plėšikas', 'Dvasininkas', 'Raganis', 'Paladinas'],
            'Dwarf': ['Karys', 'Medžiotojas', 'Plėšikas', 'Dvasininkas', 'Paladinas', 'Šamanas'],
            'Gnome': ['Karys', 'Burtininkas', 'Plėšikas', 'Dvasininkas', 'Raganis'],
            'NightElf': ['Karys', 'Medžiotojas', 'Plėšikas', 'Dvasininkas', 'Druidas']
        };

        const raceNamesLT = { 'Human': 'Žmogus', 'Dwarf': 'Nykštukas', 'Gnome': 'Gnomas', 'NightElf': 'Naktinis elfas' };

        const specs = [
            { id: 'war-arms', class: 'Karys', spec: 'Ginklai (Arms)', t1: 'PN', t2: 'FL', t3: 'GD', desc: 'Disciplinuotas taktikos meistras. Tau patinka konkrečios taisyklės ir kietas, tiesioginis konfliktų sprendimas.' },
            { id: 'war-fury', class: 'Karys', spec: 'Įniršis (Fury)', t1: 'VS', t2: 'FL', t3: 'ŠS', desc: 'Gyveni emocijomis ir įtampa, o pyktį moki paversti nesustabdoma jėga.' },
            { id: 'war-prot', class: 'Karys', spec: 'Apsauga (Protection)', t1: 'PN', t2: 'FL', t3: 'Pas', desc: 'Komandos uola. Esi tas, kuris atlaiko smūgius tam, kad tavo draugai būtų saugūs.' },
            { id: 'pal-holy', class: 'Paladinas', spec: 'Šventumas (Holy)', t1: 'PN', t2: 'PG', t3: 'Pas', desc: 'Pasiaukojantis užnugaris. Tau svarbiausia padėti kitiems, net jei pačiam tenka atiduoti paskutines jėgas.' },
            { id: 'pal-prot', class: 'Paladinas', spec: 'Apsauga (Protection)', t1: 'PN', t2: 'FL', t3: 'Pas', desc: 'Neįveikiamas skydas. Esi priekyje todėl, kad tau svarbu apsaugoti silpnesnius.' },
            { id: 'pal-ret', class: 'Paladinas', spec: 'Atpildas (Retribution)', t1: 'PN', t2: 'FL', t3: 'GD', desc: 'Teisingumo vykdytojas. Turi aiškias moralines ribas ir be gailesčio baudi žaidžiančius nešvariai.' },
            { id: 'hun-bm', class: 'Medžiotojas', spec: 'Žvėrių valdymas (BM)', t1: 'DS', t2: 'SA', t3: 'ŠS', desc: 'Gyveni savo ritmu, puikiai moki išlaikyti atstumą ir pasikliauji gamtos instinktais.' },
            { id: 'hun-mm', class: 'Medžiotojas', spec: 'Taiklumas (Marksmanship)', t1: 'VS', t2: 'SA', t3: 'GD', desc: 'Snaiperis. Tau patinka dirbti vienam, išlaikyti atstumą ir veikti maksimaliai tiksliai.' },
            { id: 'hun-surv', class: 'Medžiotojas', spec: 'Išlikimas (Survival)', t1: 'VS', t2: 'MK', t3: 'MR', desc: 'Išgyvenimo meistras. Prisitaikai prie bet kokių sąlygų, naudoji gudrybes.' },
            { id: 'rog-assa', class: 'Plėšikas', spec: 'Žudymas (Assassination)', t1: 'VS', t2: 'MK', t3: 'MR', desc: 'Šaltas pragmatikas. Svarbu rezultatas bet kokia kaina, todėl kerti ten, kur labiausiai skauda.' },
            { id: 'rog-combat', class: 'Plėšikas', spec: 'Kova (Combat)', t1: 'VS', t2: 'FL', t3: 'GD', desc: 'Avantiūristas, nebijantis tiesioginės konfrontacijos. Vertini asmeninę laisvę.' },
            { id: 'rog-sub', class: 'Plėšikas', spec: 'Šešėliai (Subtlety)', t1: 'VS', t2: 'MK', t3: 'ŠS', desc: 'Nematomas stebėtojas. Turi geležinę kantrybę, moki dingti iš radaro.' },
            { id: 'pri-disc', class: 'Dvasininkas', spec: 'Drausmė (Discipline)', t1: 'PI', t2: 'PG', t3: 'GD', desc: 'Tvarkos ramstis. Problemas sprendi prevenciškai, apsaugodamas komandą iš anksto.' },
            { id: 'pri-holy', class: 'Dvasininkas', spec: 'Šventumas (Holy)', t1: 'PN', t2: 'PG', t3: 'Pas', desc: 'Empatijos įsikūnijimas. Atiduodi visą save komandos stabilumui.' },
            { id: 'pri-shadow', class: 'Dvasininkas', spec: 'Šešėliai (Shadow)', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'Manipuliatorius. Mėgsti analizuoti žmonių silpnybes ir sekinti oponentus iš tolo.' },
            { id: 'sha-ele', class: 'Šamanas', spec: 'Stichijos (Elemental)', t1: 'DS', t2: 'SA', t3: 'ŠS', desc: 'Ramus, bet sprogstamas. Išlaikai atstumą, kontroliuoji situaciją.' },
            { id: 'sha-enh', class: 'Šamanas', spec: 'Sustiprinimas (Enhancement)', t1: 'DS', t2: 'FL', t3: 'ŠS', desc: 'Kovotojas, jaučiantis ritmą. Tiesioginiame smūgyje sujungi jėgą ir intuiciją.' },
            { id: 'sha-rest', class: 'Šamanas', spec: 'Atkūrimas (Restoration)', t1: 'DS', t2: 'PG', t3: 'Pas', desc: 'Gyvenimo srauto palaikytojas. Užglaistai visų klaidas ir grąžini reikalus į vėžes.' },
            { id: 'mag-arc', class: 'Burtininkas', spec: 'Mistika (Arcane)', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'Intelektualas. Viską skaičiuoji ir stengiesi perprasti sistemą.' },
            { id: 'mag-fire', class: 'Burtininkas', spec: 'Ugnis (Fire)', t1: 'PI', t2: 'SA', t3: 'ŠS', desc: 'Sprogstantis talentas. Balansuoji ant rizikos ribos – rezultatai įspūdingi.' },
            { id: 'mag-frost', class: 'Burtininkas', spec: 'Šaltis (Frost)', t1: 'PI', t2: 'SA', t3: 'GD', desc: 'Šaltas protas ir kontrolė. Neleidi emocijoms imti viršaus.' },
            { id: 'loc-aff', class: 'Raganis', spec: 'Kančia (Affliction)', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'Metodiškas strategas. Po truputį, per atstumą, išsiurbi oponento jėgas.' },
            { id: 'loc-demo', class: 'Raganis', spec: 'Demonologija (Demonology)', t1: 'PI', t2: 'MK', t3: 'GD', desc: 'Situacijos šeimininkas. Mėgsti kontroliuoti chaosą griežta asmenine valia.' },
            { id: 'loc-dest', class: 'Raganis', spec: 'Naikinimas (Destruction)', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'Praktikas. Jei reikia ką nors nušluoti nuo kelio – padarysi tai.' },
            { id: 'dru-bal', class: 'Druidas', spec: 'Balansas (Balance)', t1: 'DS', t2: 'SA', t3: 'GD', desc: 'Harmonijos sergėtojas. Stebi viską iš šono, stengiesi išlaikyti pusiausvyrą.' },
            { id: 'dru-feral', class: 'Druidas', spec: 'Laukinė kova (Feral)', t1: 'DS', t2: 'FL', t3: 'ŠS', desc: 'Prisitaikantis kovotojas. Kartais atsparus tankas, kartais – greitas puolėjas.' },
            { id: 'dru-rest', class: 'Druidas', spec: 'Atkūrimas (Restoration)', t1: 'DS', t2: 'PG', t3: 'Pas', desc: 'Ramybės uostas. Tavo buvimas gydo komandos atmosferą.' }
        ];

        const questions = [
            { type: 'race', q: "1. Kur jautiesi geriausiai?", opts: [
                { text: "Miesto šurmulyje, kur daug galimybių.", val: ['Human'], label: "A" },
                { text: "Garaže ar dirbtuvėse, kur galima sumeistrauti kažką naudingo.", val: ['Dwarf', 'Gnome'], label: "B" },
                { text: "Gamtoje, kur visiškai tylu.", val: ['NightElf'], label: "C" }
            ]},
            { type: 'race', q: "2. Kaip žiūri į senas tradicijas ir istoriją?", opts: [
                { text: "Kam tos senienos? Geriau kažką naujo.", val: ['Gnome'], label: "A" },
                { text: "Tradicijos ir praeitis yra viskas.", val: ['Dwarf'], label: "B" },
                { text: "Svarbu žiūrėti į priekį ir kurti naujus ryšius.", val: ['Human'], label: "C" }
            ]},
            { type: 'race', q: "3. Ką darai prispaudus problemoms?", opts: [
                { text: "Sukandu dantis ir iš jėgos atlaikau spaudimą.", val: ['Dwarf'], label: "A" },
                { text: "Jungiu loginį mąstymą ir išsikapstau.", val: ['Gnome'], label: "B" },
                { text: "Atsitraukiu į šešėlį ir laukiu progos veikti.", val: ['NightElf'], label: "C" }
            ]},
            { type: 'race', q: "4. Kaip vertini nepaaiškinamus dalykus?", opts: [
                { text: "Viskas turi natūralią eigą, geriau nesikišti.", val: ['NightElf'], label: "A" },
                { text: "Viskas paaiškinama, tik trūksta įrankių.", val: ['Gnome'], label: "B" },
                { text: "Tikiu stipriu moraliniu kompasu.", val: ['Human'], label: "C" }
            ]},
            { type: 'race', q: "5. Kas svarbiausia dirbant su kitais?", opts: [
                { text: "Mokėti rasti bendrą kalbą su visais.", val: ['Human'], label: "A" },
                { text: "Lojalumas – savų nepaliekam.", val: ['Dwarf'], label: "B" },
                { text: "Kantrybė ir mokėjimas išlaukti.", val: ['NightElf'], label: "C" }
            ]},
            { type: 'race', q: "6. Koks tavo koziris kritinėje situacijoje?", opts: [
                { text: "Prisitaikymas prie bet kokio netikėtumo.", val: ['Human'], label: "A" },
                { text: "Turiu pasiruošęs netikėtą planą B.", val: ['Gnome', 'Dwarf'], label: "B" },
                { text: "Esu greitas, tiesiog išvengiu pavojaus.", val: ['NightElf'], label: "C" }
            ]},
            { type: 'class', q: "7. Taisyklės tavo gyvenime:", opts: [
                { text: "Taisyklės palaiko tvarką. Be jų – bardakas.", val: "PN", label: "A" },
                { text: "Svarbiausia daryti taip, kaip tau geriau.", val: "VS", label: "B" },
                { text: "Taisyklės turi būti žmogiškos ir logiškos.", val: "DS", label: "C" }
            ]},
            { type: 'class', q: "8. Kodėl apsiimi daryti kažką sunkaus?", opts: [
                { text: "Nes įdomu sužinoti, kaip viskas veikia.", val: "PI", label: "A" },
                { text: "Nes reikia. Jei ne aš, tai kas kitas?", val: "PN", label: "B" },
                { text: "Noriu būti nepriklausomas ir niekam neskolingas.", val: "VS", label: "C" }
            ]},
            { type: 'class', q: "9. Kaip žiūri į vadovus?", opts: [
                { text: "Gerbiu, jei rodo pavyzdį ir aria kartu.", val: "PN", label: "A" },
                { text: "Man vadovų nereikia, žinau ką darau.", val: "VS", label: "B" },
                { text: "Geras vadovas tas, kuris sukuria gerą atmosferą.", val: "DS", label: "C" }
            ]},
            { type: 'class', q: "10. Kaip geriausiai pailsi po streso?", opts: [
                { text: "Užsidarau, ieškau informacijos, skaitau.", val: "PI", label: "A" },
                { text: "Varau į gamtą išvėdinti galvos.", val: "DS", label: "B" },
                { text: "Griebiuosi fizinio ar buitinio darbo.", val: "PN", label: "C" }
            ]},
            { type: 'class', q: "11. Pamatęs neteisybę:", opts: [
                { text: "Lendu aiškintis ir stratau skriaudiką į vietą.", val: "PN", label: "A" },
                { text: "Bandau taikiai užgesinti konfliktą.", val: "DS", label: "B" },
                { text: "Tyliai pasidarau išvadas ir veikiu progai esant.", val: "VS", label: "C" }
            ]},
            { type: 'class', q: "12. Svarbiausia savybė drauge:", opts: [
                { text: "Patikimumas – žinai, kad niekada nepaves.", val: "PN", label: "A" },
                { text: "Protas – mato tai, ko kiti nepastebi.", val: "PI", label: "B" },
                { text: "Ramybė – su juo lengva net chaose.", val: "DS", label: "C" }
            ]},
            { type: 'class', q: "13. Tavo įrankiai ir žinios:", opts: [
                { text: "Tai mano reikalas. Dalinuosi su artimiausiais.", val: "VS", label: "A" },
                { text: "Renku visą info, niekad nežinai, kada prireiks.", val: "PI", label: "B" },
                { text: "Dalinuosi – šiandien aš padėsiu, rytoj man.", val: "DS", label: "C" }
            ]},
            { type: 'class', q: "14. Pagrindinis tikslas:", opts: [
                { text: "Sukurti saugią, teisingą aplinką.", val: "PN", label: "A" },
                { text: "Būti laisvam ir niekam neatsiskaityti.", val: "VS", label: "B" },
                { text: "Būti geriausiam ir žinoti daugiausiai.", val: "PI", label: "C" }
            ]},
            { type: 'class', q: "15. Krizė darbe/namuose:", opts: [
                { text: "Gesinu gaisrą pats, sugerdamas paniką.", val: "FL", label: "A" },
                { text: "Pasirūpinu žmonėmis, kad jie nepanikuotų.", val: "PG", label: "B" },
                { text: "Pažiūriu iš šalies ir sugalvoju planą.", val: "SA", label: "C" }
            ]},
            { type: 'class', q: "16. Kova su konkurentais:", opts: [
                { text: "Sekinu jų kantrybę iš toli.", val: "SA", label: "A" },
                { text: "Lendu ten, kur nesitiki, padarau savo ir dingstu.", val: "MK", label: "B" },
                { text: "Einu kaktomuša, kol jie pasiduoda.", val: "FL", label: "C" }
            ]},
            { type: 'class', q: "17. Tavo vaidmuo komandoje:", opts: [
                { text: "Tempas ir fizinio spaudimo atlaikymas.", val: "FL", label: "A" },
                { text: "Klaidų taisymas ir komandos gelbėjimas.", val: "PG", label: "B" },
                { text: "Stebėjimas ir nurodymas, kur link judėti.", val: "SA", label: "C" }
            ]},
            { type: 'class', q: "18. Jei varžovas stipresnis:", opts: [
                { text: "Ieškau spragų, gudrauju.", val: "MK", label: "A" },
                { text: "Einu iki galo, kol jį palaužiu.", val: "FL", label: "B" },
                { text: "Surenku chebrą ir laimim kartu.", val: "PG", label: "C" }
            ]},
            { type: 'class', q: "19. Kaip sprendi aštrius ginčus?", opts: [
                { text: "Rėžiu tiesiai ir intensyviai.", val: "FL", label: "A" },
                { text: "Ramiai dėstau argumentus išlaukiant.", val: "SA", label: "B" },
                { text: "Bandau rasti kompromisą.", val: "PG", label: "C" }
            ]},
            { type: 'class', q: "20. Sunkiose derybose:", opts: [
                { text: "Griežtai pasakau ko noriu.", val: "FL", label: "A" },
                { text: "Gudrauju ir apeinu aštrius kampus.", val: "MK", label: "B" },
                { text: "Ateinu su faktais ir skaičiais.", val: "SA", label: "C" }
            ]},
            { type: 'class', q: "21. Apginant draugą:", opts: [
                { text: "Užstoju savimi, dėmesį prisiimu ant savęs.", val: "FL", label: "A" },
                { text: "Traukiu draugą į šoną nuraminti.", val: "PG", label: "B" },
                { text: "Nukreipiu temą kitur.", val: "SA", label: "C" }
            ]},
            { type: 'class', q: "22. Kaip mėgsti dirbti?", opts: [
                { text: "Savo kampe, kontroliuojant per atstumą.", val: "SA", label: "A" },
                { text: "Judant ir laisvai keičiant poziciją.", val: "MK", label: "B" },
                { text: "Veiksmo centre.", val: "FL", label: "C" }
            ]},
            { type: 'class', q: "23. Kaip tvarkaisi su pykčiu?", opts: [
                { text: "Sprogstu ir naudoju jį per jėgą.", val: "ŠS", label: "A" },
                { text: "Prisiverčiu išlikti ramus.", val: "GD", label: "B" },
                { text: "Naudoju šaltai, jei tai naudinga.", val: "MR", label: "C" }
            ]},
            { type: 'class', q: "24. Ar tikslas pateisina priemones?", opts: [
                { text: "Geriau pralošiu, bet išliksiu sąžiningas.", val: "GD", label: "A" },
                { text: "Svarbu rezultatas. Panaudosiu viską.", val: "MR", label: "B" },
                { text: "Atiduosiu sveikatą, kad pasiektume tikslą.", val: "Pas", label: "C" }
            ]},
            { type: 'class', q: "25. Tavo didžiausia silpnybė:", opts: [
                { text: "Padedu kitiems pamiršdamas save.", val: "Pas", label: "A" },
                { text: "Graužiu save dėl netobulumo.", val: "GD", label: "B" },
                { text: "Susikaupia per daug įtampos viduje.", val: "ŠS", label: "C" }
            ]},
            { type: 'class', q: "26. Kai kitas elgiasi nešvariai:", opts: [
                { text: "Atšaunu tuo pačiu, tik gudriau.", val: "MR", label: "A" },
                { text: "Žaisiu pagal taisykles ir nugalėsiu.", val: "GD", label: "B" },
                { text: "Mane tai taip užknisa, kad tiesiog suvažinėsiu jį.", val: "ŠS", label: "C" }
            ]},
            { type: 'class', q: "27. Kvailos, bet privalomos taisyklės:", opts: [
                { text: "Tenka sukąsti dantis ir laikytis.", val: "GD", label: "A" },
                { text: "Apeinu jas, kad niekas nepastebėtų.", val: "MR", label: "B" },
                { text: "Laužau jas vardan kitų apsaugos.", val: "Pas", label: "C" }
            ]},
            { type: 'class', q: "28. Kas tave labiausiai ėda?", opts: [
                { text: "Jausmas, kad mane išnaudoja.", val: "Pas", label: "A" },
                { text: "Noras pratrūkti, kurį turiu slopinti.", val: "ŠS", label: "B" },
                { text: "Tai, kad dėl tikslų atstumiu žmones.", val: "MR", label: "C" }
            ]},
            { type: 'class', q: "29. Juodas humoras / nepatogios temos:", opts: [
                { text: "Man nėra jokių tabu.", val: "MR", label: "A" },
                { text: "Yra ribos, kurių nevalia peržengti.", val: "GD", label: "B" },
                { text: "Gilinuosi tik tam, kad padėčiau suprasti.", val: "Pas", label: "C" }
            ]},
            { type: 'class', q: "30. Kai viskas griūna:", opts: [
                { text: "Darau bet ką iš jėgos, vedamas emocijų.", val: "ŠS", label: "A" },
                { text: "Laikausi principų iki galo.", val: "GD", label: "B" },
                { text: "Bandau išgelbėti kitus, nežiūrėdamas savęs.", val: "Pas", label: "C" }
            ]}
        ];

        let currentQIndex = 0;
        let selectedAnswers = [];
        let raceScores = { Human: 0, Dwarf: 0, Gnome: 0, NightElf: 0 };
        let traitScores = { PN: 0, VS: 0, PI: 0, DS: 0, FL: 0, SA: 0, MK: 0, PG: 0, ŠS: 0, Pas: 0, MR: 0, GD: 0 };
        const traitNames = { PN: 'Atsakomybė', VS: 'Laisvė', PI: 'Protas', DS: 'Ramybė', FL: 'Tiesioginis smūgis', SA: 'Strategija', MK: 'Gudrumas', PG: 'Palaikymas', ŠS: 'Savitvarda', Pas: 'Pasiaukojimas', MR: 'Rezultatas', GD: 'Principai' };

        function startQuiz() {
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('quiz-screen').style.display = 'block';
            document.querySelector('.progress-container').style.display = 'block';
            document.getElementById('question-number').style.display = 'block';
            showQuestion();
        }

        function showQuestion() {
            const q = questions[currentQIndex];
            document.getElementById('question-number').innerText = `Klausimas ${currentQIndex + 1} / ${questions.length}`;
            document.getElementById('question-text').innerText = q.q;
            document.getElementById('progress-bar').style.width = ((currentQIndex / questions.length) * 100) + '%';
            const optsContainer = document.getElementById('options-container');
            optsContainer.innerHTML = '';
            q.opts.forEach((opt) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<strong>${opt.label})</strong> ${opt.text}`;
                btn.onclick = () => selectOption(q.type, opt.val, opt.label);
                optsContainer.appendChild(btn);
            });
        }

        function selectOption(type, val, label) {
            selectedAnswers.push(label);
            if(type === 'race') { val.forEach(r => raceScores[r]++); } 
            else if (type === 'class') { traitScores[val]++; }
            
            currentQIndex++;
            if(currentQIndex < questions.length) showQuestion();
            else calculateResult();
        }

        function calculateResult() {
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('result-screen').style.display = 'block';

            let maxR = -1; let topRaces = [];
            Object.keys(raceScores).forEach(r => {
                if(raceScores[r] > maxR) { maxR = raceScores[r]; topRaces = [r]; } 
                else if (raceScores[r] === maxR) { topRaces.push(r); }
            });
            let bestRace = topRaces[0];

            let maxS = -1; let topSpecs = [];
            specs.forEach(s => {
                let score = traitScores[s.t1] + traitScores[s.t2] + traitScores[s.t3];
                if(score > maxS) { maxS = score; topSpecs = [s]; } 
                else if (score === maxS) { topSpecs.push(s); }
            });

            if(topSpecs.length > 1) {
                let filteredSpecs = topSpecs.filter(s => allowedClasses[bestRace].includes(s.class));
                if(filteredSpecs.length > 0) topSpecs = filteredSpecs;
            }

            let winner = topSpecs[0];

            if(topSpecs.length > 1) {
                const ids = topSpecs.map(s => s.id);
                const ans = selectedAnswers;
                if(ids.includes('war-arms') && ids.includes('pal-ret')) winner = (ans[6] === 'A' && ans[8] === 'A') ? specs.find(s=>s.id==='pal-ret') : specs.find(s=>s.id==='war-arms');
                else if(ids.includes('war-prot') && ids.includes('pal-prot')) winner = (ans[23] === 'C' || ans[29] === 'C') ? specs.find(s=>s.id==='pal-prot') : specs.find(s=>s.id==='war-prot');
                else if(ids.includes('pal-holy') && ids.includes('pri-holy')) winner = (ans[7] === 'B' || ans[11] === 'C') ? specs.find(s=>s.id==='pri-holy') : specs.find(s=>s.id==='pal-holy');
                else if(ids.includes('rog-assa') && ids.includes('hun-surv')) winner = (ans[17] === 'A' || ans[21] === 'B') ? specs.find(s=>s.id==='hun-surv') : specs.find(s=>s.id==='rog-assa');
                else if(ids.includes('hun-bm') && ids.includes('sha-ele')) winner = (ans[6] === 'C' || ans[9] === 'B') ? specs.find(s=>s.id==='sha-ele') : specs.find(s=>s.id==='hun-bm');
                else if(ids.includes('dru-feral') && ids.includes('sha-enh')) winner = (ans[15] === 'C' || ans[18] === 'A') ? specs.find(s=>s.id==='sha-enh') : specs.find(s=>s.id==='dru-feral');
                else if(ids.includes('dru-rest') && ids.includes('sha-rest')) winner = (ans[28] === 'C') ? specs.find(s=>s.id==='sha-rest') : specs.find(s=>s.id==='dru-rest');
                else if(ids.includes('pri-shadow') || ids.includes('loc-aff') || ids.includes('loc-dest') || ids.includes('mag-arc')) {
                    if(ans[7] === 'A' || ans[11] === 'B') winner = specs.find(s=>s.id==='mag-arc');
                    else if(ans[24] === 'C' || ans[27] === 'C') winner = specs.find(s=>s.id==='pri-shadow');
                    else if(ans[29] === 'B') winner = specs.find(s=>s.id==='loc-dest');
                    else winner = specs.find(s=>s.id==='loc-aff');
                } else winner = topSpecs[0];
            }

            if(!allowedClasses[bestRace].includes(winner.class)) {
                let validRaces = Object.keys(raceScores).filter(r => allowedClasses[r].includes(winner.class));
                validRaces.sort((a,b) => raceScores[b] - raceScores[a]);
                bestRace = validRaces[0];
            }

            document.getElementById('result-race').innerText = raceNamesLT[bestRace];
            document.getElementById('result-class').innerText = winner.class;
            document.getElementById('result-spec').innerText = winner.spec;
            document.getElementById('result-desc').innerText = winner.desc;

            const traitsContainer = document.getElementById('traits-breakdown');
            traitsContainer.innerHTML = '';
            [winner.t1, winner.t2, winner.t3].forEach(t => {
                const badge = document.createElement('div');
                badge.className = 'trait-badge';
                badge.innerText = `${traitNames[t]} (${traitScores[t]} tšk.)`;
                traitsContainer.appendChild(badge);
            });
        }

        function resetQuiz() {
            currentQIndex = 0; selectedAnswers = [];
            raceScores = { Human: 0, Dwarf: 0, Gnome: 0, NightElf: 0 };
            traitScores = { PN: 0, VS: 0, PI: 0, DS: 0, FL: 0, SA: 0, MK: 0, PG: 0, ŠS: 0, Pas: 0, MR: 0, GD: 0 };
            document.getElementById('result-screen').style.display = 'none';
            startQuiz();
        }
    </script>
</body>
</html>
```
