# WoW Forever "Kaukai" — General Improvements & Specifications

## 1. Executive Summary & Strategic Focus

* **Completed Milestones (Phases 1 & 2):** Formally marked as **100% complete**. All WebP asset conversions, favicon sets, social/OpenGraph cards, canonical links, unified `navbar.js` accessibility, and the decoupled `quiz-engine.js` with localized datasets are successfully deployed.
* **Scope Pruning:** The previously proposed Phase 4 (Discord webhook bots, stand-alone raid tactics modules) is **dismissed as unnecessary** to keep the platform fast, clean, zero-dependency, and easy to maintain.
* **Immediate Working Order:**
  1. **Lithuanian First:** Always draft, refine, and finalize Lithuanian content first using a warm, casual, conversational, and simple tone.
  2. **English Mirroring:** Produce the English equivalent directly afterwards with matching meaning and structure.
  3. **Strict Separation of Concerns:**
     * **D.U.K. (FAQ) — [duk.html](file:///c:/WoW'as/Antigravityenv/duk.html) & [en/faq.html](file:///c:/WoW'as/Antigravityenv/en/faq.html):** Reserved strictly for guild identity, membership, policies, loot rules, attendance, and server expectations.
     * **Gidas (Guide) — [gidas.html](file:///c:/WoW'as/Antigravityenv/gidas.html) & [en/guide.html](file:///c:/WoW'as/Antigravityenv/en/guide.html):** All gameplay-specific mechanics (e.g. profession synergy tables, what to do if stuck leveling, dungeon etiquette) belong here.
  4. **Preserve Lithuanian Guild Ranks:** Guild rank titles on the English pages must not be translated into English ("Armsmen", "Pathfinders"). They must remain as **Kaukai**, **Ginklanešiai**, and **Žygeiviai**.

---

## 2. Guild Ranks Refinement (English Landing Page)

### 2.1. The Issue
In [en/index.html](file:///c:/WoW'as/Antigravityenv/en/index.html), lines 111 and 120 currently translate the guild ranks:
* Rank 2 is rendered as `Armsmen` instead of **Ginklanešiai**.
* Rank 3 is rendered as `Pathfinders` instead of **Žygeiviai**.

### 2.2. The Fix
Guild ranks are core identity titles and **must not be translated**. The English descriptions explain their role, but the title badge itself remains the authentic Lithuanian term:

```html
<!-- Proposed update in en/index.html -->
<div class="roster-list">
    <div class="roster-item">
        <div class="roster-role">Kaukai</div>
        <div class="roster-details">
            <strong>What we expect:</strong>
            <p>Friendliness and active presence. Full-fledged guild members playing for pure enjoyment without raiding obligations.</p>
            <strong>What you get:</strong>
            <p>Advice on any question, friendly dungeon company, and a cozy, relaxed atmosphere.</p>
        </div>
    </div>
    <div class="roster-item">
        <div class="roster-role">Ginklanešiai</div>
        <div class="roster-details">
            <strong>What we expect:</strong>
            <p>Desire to improve, willingness to listen to tactics, and curiosity to master class nuances.</p>
            <strong>What you get:</strong>
            <p>Patient explanations of mechanics and an assured spot in training raids.</p>
        </div>
    </div>
    <div class="roster-item">
        <div class="roster-role">Žygeiviai</div>
        <div class="roster-details">
            <strong>What we expect:</strong>
            <p>Reliability, punctuality on raid nights, and a character prepared for battle.</p>
            <strong>What you get:</strong>
            <p>Smooth progression, guild consumable support, and a team that deeply respects your time.</p>
        </div>
    </div>
</div>
```

---

## 3. D.U.K. (FAQ) Content Specification

The FAQ contains only questions regarding the guild, community, server rules, and raid loot. Gameplay guides are delegated to [gidas.html](file:///c:/WoW'as/Antigravityenv/gidas.html).

### UI Architecture
* **Single unified accordion list** (no category tabs or separate subheadings).
* **Instant Client-Side Search Bar:** A simple Vanilla JS input (`#faqSearchInput`) that filters questions and answers dynamically in real time.

---

### Q1. Serveris ir frakcija / Realm & Faction
* **LT:**
  * *Klausimas:* Kokiame serveryje žaidžiate?
  * *Atsakymas:* Žaidžiame **WoW Forever** serveryje ir atstovaujame **Aljanso** frakcijai. Tai yra **PvE (Player vs Environment)** serveris, todėl atviro pasaulio kovos prieš kitus žaidėjus vyksta tik tada, kai patys to norite įsijungę PvP vėliavėlę. Galite ramiai tyrinėti pasaulį be baimės būti užpultiems.
* **EN:**
  * *Question:* What realm and faction do you play on?
  * *Answer:* We play on the **WoW Forever** realm and represent the **Alliance** faction. This is a **PvE (Player vs Environment)** realm, meaning open-world PvP combat only happens when you voluntarily enable your PvP flag. You can explore the world peacefully without fear of being ganked while questing.

---

### Q2. Gildijos kalba / Primary Language Policy
* **LT:**
  * *Klausimas:* Kokia kalba bendraujama gildijoje? Ar priimate užsieniečius?
  * *Atsakymas:* Pagrindinė mūsų bendravimo kalba žaidimo lange, Discorde ir balso pokalbiuose yra **lietuvių**. Tačiau užsieniečius ir angliškai kalbančius žaidėjus priimame labai šiltai: daugelis mūsų karininkų ir reiderių laisvai kalba angliškai, todėl svarbiausias reidų taktikas ir atsakymus į klausimus visada padedame išversti.
* **EN:**
  * *Question:* What is the primary language spoken in the guild? Are international players welcome?
  * *Answer:* Our guild is predominantly **Lithuanian-speaking**. In-game chat, Discord text, and voice channels are conducted primarily in Lithuanian. However, international and English-speaking players are warmly accommodated! Many of our officers and raiders are fluent in English, and we gladly translate key raid instructions and answer gameplay questions.

---

### Q3. Naujokų priėmimas ir pagalba / Beginners Welcome & Guild Support
* **Placement Audit Note:** Gameplay mechanics (such as saving 100 gold for the level 40 mount, selective spell training, questing routes, and profession synergies) belong strictly in the **Guide** (`gidas.html` / `en/guide.html`). In the **FAQ**, Q3 focuses strictly on how the guild welcomes and supports newcomers, while providing a direct link to the Guide.
* **LT:**
  * *Klausimas:* Ar priimate visiškus naujokus? Kaip padedate pradedantiesiems?
  * *Atsakymas:* 
    Tikrai taip! Naujokai pas mus visada laukiami. Mūsų bendruomenėje vyrauja rami, neskubanti atmosfera be jokio spaudimo lėkti prie 60 lygio:
    * **Pagalba ir patarimai:** Jei kažko nesuprantate – drąsiai klauskite gildijos pokalbyje (`/g`) arba Discorde. Visada atsiras kas kantriai paaiškins.
    * **Bendri žygiai:** Senbuviai ir kiti nariai mielai padeda įveikti sudėtingesnes grupines užduotis ir kartu keliauja į pradedančiųjų 5 žaidėjų požemius.
    * Visą praktinę žaidimo mechanikų informaciją – kaip veikia užduotys, kur keliauti pritrūkus lygio, kokias profesijas pasirinkti ir kaip sutaupyti 100 aukso 40 lygio jojamajam gyvūnui – rasite mūsų [Žaidimo gide](gidas.html).
* **EN:**
  * *Question:* Do you accept complete beginners? How does the guild support newcomers?
  * *Answer:* 
    Absolutely yes! Newcomers are always welcome. Our community fosters a calm, unhurried atmosphere with zero pressure to rush to level 60:
    * **Friendly guidance:** If you don't understand something, ask anytime in guild chat (`/g`) or on Discord. Someone will always gladly explain.
    * **Group adventures:** Veteran members and fellow levelers happily help with tough elite quests and team up for introductory 5-player dungeons.
    * For practical gameplay mechanics — how questing works, where to travel when quests run dry, which profession synergies to pick, and how to save 100 gold for your level 40 mount — check out our dedicated [Beginner's Guide](guide.html).

---

### Q4. Prisijungimas žaidime / Joining In-Game
* **LT:**
  * *Klausimas:* Kaip prisijungti prie „Kaukai“ gildijos žaidime?
  * *Atsakymas:* 
    Prisijungti visai paprasta:
    1. Žaidime pokalbių lange parašykite `/who Kaukai`. Pamatysite prisijungusius narius – brūkštelkite bet kuriam iš jų asmeninę žinutę (`/w Vardas`) su prašymu pakviesti į gildiją.
    2. Arba užsukite į mūsų Discordą ir kanale **`#bendra-pokalbiai`** parašykite savo veikėjo vardą – pakvietimą atsiųsime artimiausiu metu.
* **EN:**
  * *Question:* How do I join the guild in-game?
  * *Answer:* 
    Joining is very easy:
    1. In-game, type `/who Kaukai` in your chat box. You'll see online members — whisper any of them (`/w CharacterName`) and ask for an invite.
    2. Alternatively, join our Discord and post your character's name in the **`#bendra-pokalbiai`** channel, and an officer will send you an invite shortly.

---

### Q5. Aktyvumas ir lankomumas / Activity & Attendance
* **LT:**
  * *Klausimas:* Ar yra kokių nors aktyvumo ar privalomo lankomumo reikalavimų?
  * *Atsakymas:* 
    Mūsų pagrindinis šūkis – **„Poilsis, o ne antras darbas“**. Nereikalaujame kasdienių prisijungimų, privalomo reidavimo ar ataskaitų. Žaidžiate kada norite ir kiek norite.
    *Vienintelis prašymas:* jei planuojate daryti ilgesnę nei 1–2 mėnesių pertrauką, brūkštelkite trumpą žinutę Discorde, kad profilaktinio sąrašo valymo metu netyčia nepašalintume jūsų veikėjo.
* **EN:**
  * *Question:* Are there any activity or mandatory attendance requirements?
  * *Answer:* 
    Our core motto is **"Rest, not a second job"**. We do not enforce daily logins, mandatory raid attendance, or activity quotas. Play whenever you have free time.
    *Our only request:* If you plan to take an extended break longer than 1–2 months, drop a quick note on Discord so your character isn't removed during routine inactive cleanups.

---

### Q6. Papildomi personažai (Alts) / Alternate Characters
* **LT:**
  * *Klausimas:* Ar galiu į gildiją pasikviesti savo kitus veikėjus (Alts)?
  * *Atsakymas:* 
    Taip, visi jūsų papildomi veikėjai laukiami gildijoje! Tiesiog prisijungę su altu, gildijos lange (`/guild`) nustatykite savo žaidėjo pastabą (Player Note) su pagrindinio veikėjo vardu, kad bendražygiai žinotų, kas slepiasi po nauju herojumi.
* **EN:**
  * *Question:* Can I invite my alternate characters (Alts) into the guild?
  * *Answer:* 
    Yes, all of your alts are welcome! Once invited, simply set your player note in the guild window (`/guild`) with your main character's name so guildmates know who you are.

---

### Q7. Elgesio kodeksas / Code of Conduct & Culture
* **LT:**
  * *Klausimas:* Koks yra gildijos elgesio kodeksas ir atmosfera?
  * *Atsakymas:* 
    Mes vertiname jaukią ir ramią stovyklavietės atmosferą prie laužo. Pas mus netoleruojamas toksiškumas, politiniai ginčai, rasizmas ar pyktis dėl daiktų. Požemiuose ir reiduose klaidos yra normalus mokymosi dalykas – mes palaikome vieni kitus, o ne ieškome kaltų.
* **EN:**
  * *Question:* What is the guild's code of conduct and atmosphere?
  * *Answer:* 
    We cherish a cozy, relaxed campfire atmosphere. We have zero tolerance for toxicity, political arguments, racism, harassment, or loot drama. In dungeons and raids, mistakes are viewed as natural learning opportunities — we support one another rather than pointing fingers.

---

### Q8. Reidų grafikas / Raid Schedule
* **LT:**
  * *Klausimas:* Kokiomis dienomis ir kokiu laiku vyks reidai?
  * *Atsakymas:* 
    **TBD (Bus patikslinta).** Kai didesnė gildijos dalis pasieks 60 lygį, Discorde paskelbsime bendrą apklausą ir kartu išrinksime visiems patogiausius vakarus (dažniausiai planuojama 2 vakarus per savaitę, maždaug nuo 19:30–20:00).
* **EN:**
  * *Question:* What days and times do raids take place?
  * *Answer:* 
    **TBD (To Be Decided).** As our core group approaches level 60, we will run a community poll on Discord to choose the most convenient evenings for everyone (typically 2 nights per week, starting around 19:30–20:00 Lithuanian time / CET+1).

---

### Q9. Reidų grobis (SR+1) ir taisyklės / Raid Loot Distribution (SR+1) & Edge Cases
* **LT:**
  * *Klausimas:* Kaip veikia reidų grobio dalijimo sistema (SR+1) ir kas nutinka nenumatytais atvejais?
  * *Atsakymas:* 
    Mes nenaudojame sudėtingų taškų (DKP) ar chaotiško laimės rato. Taikome **Soft-Reserve +1 (SR+1)** – aiškią ir sąžiningą sistemą:
    1. **Rezervacija (Soft-Reserve):** Prieš reidą kiekvienas dalyvis specialioje nuorodoje (Discorde) pasirenka 1 labiausiai norimą daiktą iš to reido bosų.
    2. **Kova dėl rezervacijos:** Iškritus šiam daiktui, kauliuką (`/roll 100`) meta *tik tie*, kurie jį užsirezervavo. Jei daiktą pasirinkote vienintelis – jis garantuotai atitenka jums!
    3. **„+1“ taisyklė:** Kiekvienas laimėtas pagrindinis daiktas prideda „+1“ žymą tam vakarui. Vėliau iškritus kitam daiktui, pirmenybę ridenti turi tie, kurie dar nieko negavo (0 laimėjimų turi pirmenybę prieš +1, o +1 prieš +2).
    4. **Nerezervuoti daiktai (MS > OS):** Jei daikto niekas nerezervavo, ridenti gali visi, kam jis tinka pagal pagrindinę rolę (Main Spec). Jei nereikia niekam – leidžiama antrinei rolei (Off-Spec).
    5. **Išimtis (Main Tank ir Gydytojai):** Pagrindiniam tankui ir gydytojams gali būti taikoma išimtis kritiniams išgyvenamumo daiktams, nes nuo jų priklauso visas reidas.

    **Nenumatyti atvejai:**
    * *Jei rezervuotas daiktas neiškrito:* Rezervacija galioja tik tam konkrečiam reidui – į kitą savaitę ji nesikelia.
    * *Rezervacijų keitimas:* Vos pradėjus kovą su pirmuoju priešu, rezervacijos užrakinamos ir jų keisti nebegalima.
    * *Ankstyvas išėjimas:* Jei žaidėjas turi išeiti iš reido anksčiau, jo rezervacija nustoja galioti visiems bosams, nukautiems po jo išėjimo.
* **EN:**
  * *Question:* How does the raid loot distribution system (SR+1) work, and how are edge cases handled?
  * *Answer:* 
    We don't use complicated point systems (DKP) or chaotic free-for-alls. We run **Soft-Reserve +1 (SR+1)** — a clear, fair system:
    1. **Soft-Reserve:** Before the raid, each attendee selects 1 desired item via a Discord link from that raid's loot table.
    2. **Roll for Reserve:** When that item drops, only those who reserved it roll (`/roll 100`). If you were the sole person to reserve it, it is yours uncontested!
    3. **The "+1" Rule:** Each main item won adds a "+1" mark for that night. On subsequent drops, players who haven't won anything yet take priority (0 wins beat +1, and +1 beats +2).
    4. **Unreserved Items (MS > OS):** Unreserved drops can be rolled by anyone for their primary role (Main Spec). If nobody needs it for their main role, it opens to secondary roles (Off-Spec).
    5. **Core Priority (Main Tank & Healers):** Priority exceptions may be granted to the Main Tank and core Healers on vital survivability items to protect the entire group.

    **Edge Cases:**
    * *If your item doesn't drop:* Reserves are valid for that specific raid only — they do not roll over to future runs.
    * *Changing reserves:* Once the first enemy in the instance is pulled, all reserves are permanently locked.
    * *Leaving early:* If a player leaves early, their reserve is forfeited for any bosses killed after their departure.

---

### Q10. Discord reikalavimas / Discord & Voice Chat
* **LT:**
  * *Klausimas:* Ar būtina naudoti Discord?
  * *Atsakymas:* Discord yra pagrindinė mūsų pranešimų, diskusijų ir reidų registracijos vieta. Reiduose reikalaujame **klausytis** balso kanale, kad girdėtumėte taktikos nurodymus, tačiau pačiam kalbėti per mikrofoną nėra privaloma – rašyti tekstu yra visiškai normalu. Prisijungti prie Discordo rekomenduojame kiekvienam gildijos nariui.
* **EN:**
  * *Question:* Is Discord required?
  * *Answer:* Discord is our primary hub for guild announcements, discussions, and raid sign-ups. During raids, **listening** on voice is required to follow tactical calls, but speaking on a microphone is never mandatory — communicating via text chat is completely fine. We strongly recommend that all members join our Discord.

---

## 4. Gidas (Guide) Gameplay Additions Specification

These gameplay guides belong strictly in [gidas.html](file:///c:/WoW'as/Antigravityenv/gidas.html) and [en/guide.html](file:///c:/WoW'as/Antigravityenv/en/guide.html):

### UI Architecture
* **Instant Client-Side Search Bar (`#guideSearchInput`):** Added directly above the guide accordion list to filter guide topics, mechanics, professions, and individual class cards (`.class-card`) in real time via `navbar.js`.

### 4.1. 5-Man Dungeon Etiquette
Integrated into the **Žaidimo turinys ir vaidmenys (Game Content and Player Roles)** section:
* **LT:**
  * **Leiskite tankui pradėti kovą (Pull):** Niekada nepulkkite monstrų pirmi – palaukite, kol tankas juos sudrausmins.
  * **Stebėkite gydytojo maną:** Prieš puldami naują priešų grupę, įsitikinkite, kad gydytojas turi pakankamai manos (mėlyna juostelė).
  * **Need prieš Greed:** Spauskite *Need* tik ant tų daiktų, kuriuos iš karto užsidėsite savo pagrindinei rolei. Visiems kitiems daiktams (pardavimui) spauskite *Greed*.
* **EN:**
  * **Let the tank pull:** Never attack unengaged monsters first — wait for the tank to initiate and establish threat.
  * **Watch the healer's mana:** Before engaging the next pack, make sure your healer has sufficient mana (the blue bar).
  * **Need vs. Greed:** Only roll *Need* on items that are an immediate upgrade for your current main role. Roll *Greed* on items intended for selling or off-spec.

---

### 4.2. Leveling Guidance: "Ką daryti, jei pritrūko užduočių?"
To be integrated into the **Užduotys (Quests)** section:
* **LT:** Klasikiniame WoW užduotys neveda jūsų viena tiesia linija. Jei atrodo, kad jūsų zonoje užduotys baigėsi arba pasidarė per sunkios (oranžinės ar raudonos):
  * **Keliaukite į kaimynines žemes:** Aljansas turi keletą to paties lygio zonų. Pavyzdžiui, žmonės iš Stormwind gali nuvažiuoti požeminiu traukiniu į nykštukų Ironforge ir vykdyti užduotis Loch Modan ar Darkshore.
  * **Tikrinkite užeigas ir sargybos postus:** Užsukite į kiekvieną kaimelį ir ieškokite geltonų šauktukų (`!`).
  * **Eikite į 5-man požemius:** Požemiai duoda daug patirties ir puikių šarvų.
  * **Klauskite gildijoje:** Tiesiog parašykite gildijos pokalbyje (`/g`) – mielai pasakysime, kur jūsų lygiui geriausia keliauti.
* **EN:** In Classic WoW, quests do not follow a single linear railroad. If you run out of quests or they become too high level (orange/red):
  * **Travel to other racial zones:** The Alliance has multiple zones for every level range. Humans can take the Deeprun Tram to Dwarf lands to explore Loch Modan or Darkshore.
  * **Check taverns and watchposts:** Explore every crossroad and settlement for yellow exclamation marks (`!`).
  * **Run 5-man dungeons:** Dungeons provide huge bursts of quest experience and great gear upgrades.
  * **Ask in guild chat:** Just ask in `/g` — guildmates will gladly suggest the best leveling zone for your current level.

---

### 4.3. Primary Profession Synergies & Secondary Professions Tables
Integrated into the **Profesijos** section as two distinct, structured tables:

#### 1. Primary Profession Synergies (LT & EN):
| Profesijų sinergija (Pair) | Kam labiausiai tinka? (Best Suited For) | Kaip veikia ir kokia nauda? (How It Works & Key Benefits) |
| :--- | :--- | :--- |
| **Žolininkystė + Alchemija** *(Herbalism + Alchemy)* | Visoms klasėms *(All Classes)* | Renkate lauko žoleles ir verdate gyvybės, manos bei apsauginius eliksyrus (potions, flasks). Nepakeičiama 60 lygio reiduose. |
| **Kasyba + Kalvystė** *(Mining + Blacksmithing)* | Kariams, Paladinams *(Warriors, Paladins)* | Kasate rūdą ir kalate sunkius grandininius (Mail) bei plokštinius (Plate) šarvus, skydus, ginklus bei galąstuvus. |
| **Kasyba + Inžinerija** *(Mining + Engineering)* | Visoms klasėms *(ypač PvP ir Tankams)* | Iš rūdos gaminate bombas, granatas (apsvaiginimui ir plotinei žalai), taikiklius bei unikalius prietaisus. Didžiausia komunalinė nauda. |
| **Lupimas + Odadirbystė** *(Skinning + Leatherworking)* | Plėšikams, Druidams, Medžiotojams, Šamanams | Nulupate žvėrių kailius ir siuvate odinius (Leather) bei grandininius (Mail) šarvus, strėlines ir šarvų lopus (Armor Kits). |
| **Siuvimas + Užkerėjimas** *(Tailoring + Enchanting)* | Burtininkams, Raganiams, Dvasininkams | *Nereikia rinkimo profesijos!* Iš humanoidų audinių (Cloth) siuvate krepšius bei rūbus, o sukurtus daiktus išardote (Disenchant) ir užkerite šarvus. |
| **Lupimas + Kasyba / Žolininkystė** *(Dual Gathering)* | Pradedantiesiems ir taupantiems auksą | Dvi rinkimo profesijos. Visas žaliavas parduodate aukcione – greičiausias būdas sutaupyti 100 aukso 40 lygio jojamajam gyvūnui (mount)! |

#### 2. Secondary Professions (Learn all 3! — LT & EN):
| Antrinė profesija (Secondary Profession) | Ko reikia? (Requirements & Materials) | Kam skirta ir kokia nauda? (What It Is Good For & Benefits) |
| :--- | :--- | :--- |
| **Pirmoji pagalba** *(First Aid)* | Audinių atraižų (Linen, Wool, Silk, Mageweave, Runecloth), krentančių iš humanoidų priešų. | **Privaloma kiekvienai klasei!** Leidžia susukti tvarsčius (Bandages) ir per kelias sekundes atstatyti gyvybes nenaudojant manos ir neperkant maisto. Ypač svarbu Kariams, Plėšikams, Medžiotojams ir Raganiams. |
| **Maisto gaminimas** *(Cooking)* | Mėsos iš nukautų žvėrių arba žuvies iš **Žvejybos**, prieskonių bei laužo (Campfire / viryklės). | Iškeptas maistas ne tik greitai atstato gyvybes tarp kovų, bet ir suteikia ilgalaikius **„Well Fed“** sustiprinimus (Stamina, Spirit ar Attack Power), naudingus požemiuose ir reiduose. |
| **Žvejyba** *(Fishing)* | Meškerės (Fishing Pole), jaukų (Lures) ir bet kokio vandens telkinio. | Tiesioginė sinergija su **Maisto gaminimu** (nemokamas maistas) ir **Alchemija** (retos žuvys, pvz., Oily Blackmouth ar Stonescale Eel, būtinos reidų eliksyrams). Ramus ir patikimas būdas užsidirbti aukso! |

---

## 5. Implementation Status (100% Completed)

1. **[Done] Step 1 — Update Ranks in `en/index.html`:** Restored `Ginklanešiai` and `Žygeiviai` as untranslated rank titles.
2. **[Done] Step 2 — Overhaul D.U.K. on `duk.html`:** Deployed the 10 audited, guild-focused Lithuanian questions and the live `#faqSearchInput` search bar.
3. **[Done] Step 3 — Mirror FAQ on `en/faq.html`:** Deployed the matching 10 English questions and live search bar.
4. **[Done] Step 4 — Enhance Beginner's Guides on `gidas.html` & `en/guide.html`:** Added the `#guideSearchInput` search bar, 5-man dungeon etiquette, leveling quest tips, and dedicated Primary Synergy & Secondary Professions tables.
5. **[Done] Step 5 — Add CSS & Search Logic in `style.css` & `navbar.js`:** Styled `.search-container`, `.search-input`, `.guide-table`, and wired up universal real-time filtering across accordion items and class cards.
