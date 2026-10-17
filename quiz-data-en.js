/**
 * Kaukai - Personality Quiz English Dataset
 */
(function() {
const allowedClasses = {
            'Human': ['Warrior', 'Hunter', 'Mage', 'Rogue', 'Priest', 'Warlock', 'Paladin'],
            'Dwarf': ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Paladin', 'Shaman'],
            'Gnome': ['Warrior', 'Mage', 'Rogue', 'Priest', 'Warlock'],
            'NightElf': ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Druid']
        };

        const raceNamesEN = {
            'Human': 'Human',
            'Dwarf': 'Dwarf',
            'Gnome': 'Gnome',
            'NightElf': 'Night Elf'
        };

        const specs = [
            { id: 'war-arms', class: 'Warrior', spec: 'Arms', t1: 'PN', t2: 'FL', t3: 'GD', desc: 'A disciplined master of tactics. You appreciate clear rules, direct conflict resolution, and steady confidence on the field of battle.' },
            { id: 'war-fury', class: 'Warrior', spec: 'Fury', t1: 'VS', t2: 'FL', t3: 'ŠS', desc: 'A force of nature. You thrive on action, passion, and adrenaline, channeling righteous fury into unstoppable offensive momentum.' },
            { id: 'war-prot', class: 'Warrior', spec: 'Protection', t1: 'PN', t2: 'FL', t3: 'Pas', desc: 'The party\'s steadfast bulwark. You are the vanguard who takes the hits so your comrades behind you remain untouched.' },
            { id: 'pal-holy', class: 'Paladin', spec: 'Holy', t1: 'PN', t2: 'PG', t3: 'Pas', desc: 'A selfless guardian of life. Your highest priority is keeping allies safe and upright, giving everything for the welfare of the team.' },
            { id: 'pal-prot', class: 'Paladin', spec: 'Protection', t1: 'PN', t2: 'FL', t3: 'Pas', desc: 'An unyielding fortress. You stand on the front lines out of a deep calling to shield the vulnerable and uphold order.' },
            { id: 'pal-ret', class: 'Paladin', spec: 'Retribution', t1: 'PN', t2: 'FL', t3: 'GD', desc: 'The blade of justice. Guided by strong moral principles, you despise cruelty and relentlessly punish those who prey on the weak.' },
            { id: 'hun-bm', class: 'Hunter', spec: 'Beast Mastery', t1: 'DS', t2: 'SA', t3: 'ŠS', desc: 'Living in harmony with nature. You keep your distance, trust your primal instincts, and value unbreakable loyalty in your companions.' },
            { id: 'hun-mm', class: 'Hunter', spec: 'Marksmanship', t1: 'VS', t2: 'SA', t3: 'GD', desc: 'A true sharpshooter. You prefer working independently, maintaining a safe vantage point, and striking with lethal precision.' },
            { id: 'hun-surv', class: 'Hunter', spec: 'Survival', t1: 'VS', t2: 'MK', t3: 'MR', desc: 'A master of survival. You adapt to any environment, employ cunning traps, and consistently find a way out of tight corners.' },
            { id: 'rog-assa', class: 'Rogue', spec: 'Assassination', t1: 'VS', t2: 'MK', t3: 'MR', desc: 'A cool-headed pragmatist. Results are paramount. You strike swiftly, silently, and precisely where it hurts most.' },
            { id: 'rog-combat', class: 'Rogue', spec: 'Combat', t1: 'VS', t2: 'FL', t3: 'GD', desc: 'A daring swashbuckler who doesn\'t shy away from open duels. You treasure your independence and rely on razor-sharp bladecraft.' },
            { id: 'rog-sub', class: 'Rogue', spec: 'Subtlety', t1: 'VS', t2: 'MK', t3: 'ŠS', desc: 'An invisible observer. Possessing iron patience, you melt into the shadows and strike at the exact moment no one anticipates.' },
            { id: 'pri-disc', class: 'Priest', spec: 'Discipline', t1: 'PI', t2: 'PG', t3: 'GD', desc: 'A pillar of order and anticipation. You solve crises proactively — foreseeing dangers and shielding comrades before calamity strikes.' },
            { id: 'pri-holy', class: 'Priest', spec: 'Holy', t1: 'PN', t2: 'PG', t3: 'Pas', desc: 'Pure empathy and grace. You are the radiant light that restores hope in darkest hours, giving your all for the salvation of allies.' },
            { id: 'pri-shadow', class: 'Priest', spec: 'Shadow', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'A methodical mastermind. You analyze your adversaries\' weaknesses and inexorably dismantle their willpower from range.' },
            { id: 'sha-ele', class: 'Shaman', spec: 'Elemental', t1: 'DS', t2: 'SA', t3: 'ŠS', desc: 'Calm yet explosive. You maintain inner equilibrium, control the battlefield, and unleash a tempest of elemental fury at the decisive moment.' },
            { id: 'sha-enh', class: 'Shaman', spec: 'Enhancement', t1: 'DS', t2: 'FL', t3: 'ŠS', desc: 'A warrior attuned to natural rhythms. In direct melee, you unite physical prowess, spiritual focus, and the ferocious fury of elements.' },
            { id: 'sha-rest', class: 'Shaman', spec: 'Restoration', t1: 'DS', t2: 'PG', t3: 'Pas', desc: 'Guardian of the healing stream. You mend allies\' mistakes, sustain morale, and steer chaos back into safe, calm waters.' },
            { id: 'mag-arc', class: 'Mage', spec: 'Arcane', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'A brilliant intellectual. You love unraveling complex patterns, calculating equations, and mastering the fundamental laws of magic.' },
            { id: 'mag-fire', class: 'Mage', spec: 'Fire', t1: 'PI', t2: 'SA', t3: 'ŠS', desc: 'An explosive prodigy. Teetering on the edge of risk, your choices are daring and your fiery impact is breathtaking.' },
            { id: 'mag-frost', class: 'Mage', spec: 'Frost', t1: 'PI', t2: 'SA', t3: 'GD', desc: 'Cool intellect and command. You never let emotions cloud your judgment, freezing chaos in its tracks to maintain absolute control.' },
            { id: 'loc-aff', class: 'Warlock', spec: 'Affliction', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'A patient strategist. You work methodically from afar — steadily exhausting your adversary\'s strength until victory is inevitable.' },
            { id: 'loc-demo', class: 'Warlock', spec: 'Demonology', t1: 'PI', t2: 'MK', t3: 'GD', desc: 'Master of dark forces. You know how to harness chaotic entities and compel dark powers to serve your structured goals.' },
            { id: 'loc-dest', class: 'Warlock', spec: 'Destruction', t1: 'PI', t2: 'SA', t3: 'MR', desc: 'A decisive pragmatist. If an obstacle stands in your path, you eliminate it with maximum speed and cataclysmic power.' },
            { id: 'dru-bal', class: 'Druid', spec: 'Balance', t1: 'DS', t2: 'SA', t3: 'GD', desc: 'Keeper of equilibrium. You observe the grand cosmic cycles, respect universal laws, and ensure the balance of nature is preserved.' },
            { id: 'dru-feral', class: 'Druid', spec: 'Feral', t1: 'DS', t2: 'FL', t3: 'ŠS', desc: 'A versatile shapechanger. Depending on the crisis, you can become an unyielding stone shield or a lightning-fast predator.' },
            { id: 'dru-rest', class: 'Druid', spec: 'Restoration', t1: 'DS', t2: 'PG', t3: 'Pas', desc: 'A sanctuary of peace and rejuvenation. Your presence soothes the party, and your care dissipates tension in the heaviest battles.' }
        ];

        const traitNames = {
            PN: 'Duty & Responsibility',
            VS: 'Freedom & Autonomy',
            PI: 'Intellect & Insight',
            DS: 'Harmony & Serenity',
            FL: 'Frontline & Direct Impact',
            SA: 'Strategy & Control',
            MK: 'Cunning & Resourcefulness',
            PG: 'Support & Backbone',
            ŠS: 'Passion & Resolve',
            Pas: 'Self-Sacrifice for Allies',
            MR: 'Pragmatism & Results',
            GD: 'Honor & Integrity'
        };

        const questions = [
            // PART I: RACES (1–6)
            {
                type: 'race', q: "1. Where do you feel most comfortable and at home?", opts: [
                    { text: "In the bustling city, where action thrives and opportunities are everywhere.", val: ['Human'], label: "A" },
                    { text: "In a workshop or garage, crafting and tinkering with something useful.", val: ['Dwarf', 'Gnome'], label: "B" },
                    { text: "Deep in untouched nature by a campfire, surrounded by total peace and quiet.", val: ['NightElf'], label: "C" }
                ]
            },
            {
                type: 'race', q: "2. How do you view ancient traditions and history?", opts: [
                    { text: "Why dwell on old relics? We should experiment, innovate, and invent the future.", val: ['Gnome'], label: "A" },
                    { text: "Heritage, traditions, and ancestral honor mean everything.", val: ['Dwarf'], label: "B" },
                    { text: "The past matters, but what's essential is looking forward and finding reliable allies.", val: ['Human'], label: "C" }
                ]
            },
            {
                type: 'race', q: "3. When things go completely off the rails, how do you usually respond?", opts: [
                    { text: "I grit my teeth, dig my heels in, and withstand the pressure head-on.", val: ['Dwarf'], label: "A" },
                    { text: "I keep a cool head and immediately look for a clever way out or work-around.", val: ['Gnome'], label: "B" },
                    { text: "I step back into the background, observe the patterns, and await the right moment.", val: ['NightElf'], label: "C" }
                ]
            },
            {
                type: 'race', q: "4. How do you perceive mysterious, inexplicable phenomena?", opts: [
                    { text: "Nature has its own balance and flow — it is best not to interfere without cause.", val: ['NightElf'], label: "A" },
                    { text: "There is no such thing as miracles — merely things we haven't researched or measured yet.", val: ['Gnome'], label: "B" },
                    { text: "A solid moral compass is all that matters; the rest will fall into place.", val: ['Human'], label: "C" }
                ]
            },
            {
                type: 'race', q: "5. When collaborating in a team, what matters most to you personally?", opts: [
                    { text: "Finding common ground and building bridges with all kinds of personalities.", val: ['Human'], label: "A" },
                    { text: "Ironclad loyalty — knowing that we never leave our own behind in trouble.", val: ['Dwarf'], label: "B" },
                    { text: "Mutual respect for personal boundaries and listening to one another thoughtfully.", val: ['NightElf'], label: "C" }
                ]
            },
            {
                type: 'race', q: "6. What is your ace in the hole during a sudden crisis?", opts: [
                    { text: "Quick adaptability to whatever the unexpected throws at me.", val: ['Human'], label: "A" },
                    { text: "A contingency Plan B that nobody else thought of.", val: ['Gnome', 'Dwarf'], label: "B" },
                    { text: "Swift reflexes — slipping out of harm's way before others even realize the danger.", val: ['NightElf'], label: "C" }
                ]
            },

            // PART II: WORLDVIEW & VALUES (7–14)
            {
                type: 'class', q: "7. Rules in your daily life:", opts: [
                    { text: "Rules uphold order. Without them, absolute chaos takes over.", val: "PN", label: "A" },
                    { text: "What matters most are my own decisions and the freedom to choose my path.", val: "VS", label: "B" },
                    { text: "Rules must be humane and flexible, never enforced blindly.", val: "DS", label: "C" }
                ]
            },
            {
                type: 'class', q: "8. Why do you take on a difficult or exhausting chore?", opts: [
                    { text: "Because I am genuinely fascinated to discover how things work from the inside.", val: "PI", label: "A" },
                    { text: "Because it has to be done. If I don't step up — who will?", val: "PN", label: "B" },
                    { text: "I want to be self-sufficient and never owe a favor to anyone.", val: "VS", label: "C" }
                ]
            },
            {
                type: 'class', q: "9. How do you regard leaders and authority figures?", opts: [
                    { text: "I only respect leaders who lead from the front and set a personal example.", val: "PN", label: "A" },
                    { text: "I don't need a manager — I know what needs to be done and when.", val: "VS", label: "B" },
                    { text: "A great leader maintains a calm atmosphere and keeps stress to a minimum.", val: "DS", label: "C" }
                ]
            },
            {
                type: 'class', q: "10. After a grueling day, how do you best recharge?", opts: [
                    { text: "Secluding myself to read, learn, and dive deep into topics I find fascinating.", val: "PI", label: "A" },
                    { text: "Taking a walk in nature or enjoying peaceful quiet to clear my head.", val: "DS", label: "B" },
                    { text: "Engaging in physical training or hard activity to discharge built-up tension.", val: "PN", label: "C" }
                ]
            },
            {
                type: 'class', q: "11. When you witness clear injustice or bullying:", opts: [
                    { text: "I step in immediately and put the offender firmly in their place.", val: "PN", label: "A" },
                    { text: "I defuse the situation calmly and diplomatically without escalating the drama.", val: "DS", label: "B" },
                    { text: "I silently take note, wait for the opportune moment, and settle the score.", val: "VS", label: "C" }
                ]
            },
            {
                type: 'class', q: "12. Which quality do you admire most in a trusted friend?", opts: [
                    { text: "Steadfast reliability — knowing they will never abandon me in a storm.", val: "PN", label: "A" },
                    { text: "A sharp mind — anticipating moves in advance and cutting to the core of problems.", val: "PI", label: "B" },
                    { text: "Inner serenity — feeling calm and grounded in their presence even amidst chaos.", val: "DS", label: "C" }
                ]
            },
            {
                type: 'class', q: "13. Your knowledge, expertise, and gathered tools:", opts: [
                    { text: "My personal property — I share only with my closest circle.", val: "VS", label: "A" },
                    { text: "I collect and archive everything — you never know when unique insight will be crucial.", val: "PI", label: "B" },
                    { text: "I share freely — today I help someone, tomorrow they might help me.", val: "DS", label: "C" }
                ]
            },
            {
                type: 'class', q: "14. If you had to pick one defining life aspiration, which resonates most?", opts: [
                    { text: "Creating a secure, fair, and resilient sanctuary for those I care about.", val: "PN", label: "A" },
                    { text: "Being completely autonomous, unbound by the whims and wills of others.", val: "VS", label: "B" },
                    { text: "Understanding how everything works and mastering my craft with deep expertise.", val: "PI", label: "C" }
                ]
            },

            // PART III: COMBAT STYLE & CRISIS REACTION (15–22)
            {
                type: 'class', q: "15. A sudden crisis strikes your team or shared project:", opts: [
                    { text: "I take the reins myself, confronting the emergency and absorbing the brunt of the pressure.", val: "FL", label: "A" },
                    { text: "I check on the people first, ensuring no one panics or gets overwhelmed.", val: "PG", label: "B" },
                    { text: "I step back, survey the big picture, and draft a structured plan of action.", val: "SA", label: "C" }
                ]
            },
            {
                type: 'class', q: "16. Facing fierce rivalry or an argumentative confrontation, what tactic do you favor?", opts: [
                    { text: "I arm myself with patience and wait methodically for the opponent to make a mistake.", val: "SA", label: "A" },
                    { text: "I strike where they least expect, take what is mine, and slip away.", val: "MK", label: "B" },
                    { text: "I charge head-on and press until the adversary yields.", val: "FL", label: "C" }
                ]
            },
            {
                type: 'class', q: "17. When joining a new team, which role do you naturally fall into?", opts: [
                    { text: "Setting the pace and absorbing the heaviest workload or pressure.", val: "FL", label: "A" },
                    { text: "Patching up mistakes, supporting teammates from behind, and being a safety net.", val: "PG", label: "B" },
                    { text: "Observing from the periphery and advising the team on optimal strategies.", val: "SA", label: "C" }
                ]
            },
            {
                type: 'class', q: "18. If an opponent is visibly stronger than you:", opts: [
                    { text: "I seek their vulnerabilities, use cunning, and deploy unorthodox tricks.", val: "MK", label: "A" },
                    { text: "I fight to the bitter end — even if defeated, I won't sell my skin cheaply.", val: "FL", label: "B" },
                    { text: "I rally allies and friends — together we can topple any giant.", val: "PG", label: "C" }
                ]
            },
            {
                type: 'class', q: "19. How do you resolve heated disputes or disagreements?", opts: [
                    { text: "Directly to their face, boldly and without dancing around the issue.", val: "FL", label: "A" },
                    { text: "Calmly, presenting cold facts and waiting for the other party's logic to falter.", val: "SA", label: "B" },
                    { text: "Finding a constructive compromise where both sides preserve their dignity.", val: "PG", label: "C" }
                ]
            },
            {
                type: 'class', q: "20. During tough negotiations or difficult agreements:", opts: [
                    { text: "I outline my firm terms clearly and hold the line.", val: "FL", label: "A" },
                    { text: "I negotiate cleverly, smooth over rough edges, and secure my goals via alternate routes.", val: "MK", label: "B" },
                    { text: "I arrive thoroughly prepared: data, numbers, and airtight logical structure.", val: "SA", label: "C" }
                ]
            },
            {
                type: 'class', q: "21. If a close friend or colleague lands in serious trouble, how do you react?", opts: [
                    { text: "I step in front to defend them, drawing all incoming heat toward myself.", val: "FL", label: "A" },
                    { text: "I extract them to safety as quickly as possible and nurse them back to strength.", val: "PG", label: "B" },
                    { text: "I execute a diversionary maneuver to pull the attackers' attention elsewhere.", val: "SA", label: "C" }
                ]
            },
            {
                type: 'class', q: "22. How do you prefer to work or play?", opts: [
                    { text: "In my own quiet space, overseeing and controlling everything from a distance.", val: "SA", label: "A" },
                    { text: "On the move, constantly shifting position and seizing transient opportunities.", val: "MK", label: "B" },
                    { text: "Right in the thick of the fray, where the action is hottest.", val: "FL", label: "C" }
                ]
            },

            // PART IV: INTERNAL DILEMMAS & PRINCIPLES (23–30)
            {
                type: 'class', q: "23. How do you handle rising anger or fury?", opts: [
                    { text: "I release it immediately — channeling wrath into raw, explosive momentum.", val: "ŠS", label: "A" },
                    { text: "I grit my teeth and force myself to remain composed, principled, and dignified.", val: "GD", label: "B" },
                    { text: "I swallow the emotion and coldly calculate how to turn the situation to my advantage.", val: "MR", label: "C" }
                ]
            },
            {
                type: 'class', q: "24. Does the end justify the means?", opts: [
                    { text: "I would rather lose with honor than triumph through underhanded means.", val: "GD", label: "A" },
                    { text: "Achieving the goal is what matters. History does not judge victors.", val: "MR", label: "B" },
                    { text: "If it protects my comrades or loved ones, I will set aside my personal pride.", val: "Pas", label: "C" }
                ]
            },
            {
                type: 'class', q: "25. Which of these vulnerabilities hits closest to home for you?", opts: [
                    { text: "I often give so much time and energy to others that I burn myself out.", val: "Pas", label: "A" },
                    { text: "I judge myself harshly whenever reality falls short of my uncompromising standards.", val: "GD", label: "B" },
                    { text: "I bottle up tension inside until it eventually threatens to erupt.", val: "ŠS", label: "C" }
                ]
            },
            {
                type: 'class', q: "26. When you see someone playing dirty or being cynical:", opts: [
                    { text: "I turn their own weapons against them, only sharper and more devastating.", val: "MR", label: "A" },
                    { text: "I deliberately play strictly by the book to prove moral and tactical superiority.", val: "GD", label: "B" },
                    { text: "It infuriates me so deeply that I want to shut them down on the spot.", val: "ŠS", label: "C" }
                ]
            },
            {
                type: 'class', q: "27. What do you do when confronted with rules you consider completely absurd?", opts: [
                    { text: "I grit my teeth and comply anyway — maintaining order is higher than personal comfort.", val: "GD", label: "A" },
                    { text: "I quietly bypass them in ways that no one even notices.", val: "MR", label: "B" },
                    { text: "If the rules harm people or hinder our team, I simply disregard them.", val: "Pas", label: "C" }
                ]
            },
            {
                type: 'class', q: "28. Which feeling weighs heaviest upon your mind?", opts: [
                    { text: "Disappointment when your sincere sacrifices for the greater good are unappreciated or exploited.", val: "Pas", label: "A" },
                    { text: "Persistent internal strain from constantly suppressing your raw emotions.", val: "ŠS", label: "B" },
                    { text: "The realization that in pursuing your ambitions, you pushed close people away.", val: "MR", label: "C" }
                ]
            },
            {
                type: 'class', q: "29. Dark humor and sensitive, taboo subjects:", opts: [
                    { text: "Nothing is taboo — as long as it is witty, sharp, and genuinely funny.", val: "MR", label: "A" },
                    { text: "There are boundaries of respect and decorum that should never be crossed.", val: "GD", label: "B" },
                    { text: "I enjoy a joke, but I observe the room — if someone feels uncomfortable, I stop immediately.", val: "Pas", label: "C" }
                ]
            },
            {
                type: 'class', q: "30. Imagine utter chaos, when everything is slipping out of grasp. What motivates you to never give up?", opts: [
                    { text: "Pure adrenaline and instinct — I react decisively without hesitation.", val: "ŠS", label: "A" },
                    { text: "My honor. Come what may, I will keep my dignity intact to the end.", val: "GD", label: "B" },
                    { text: "Knowing that others rely on me. I steady myself because I refuse to let them down.", val: "Pas", label: "C" }
                ]
            }
        ];

    window.QUIZ_DATA = {
        lang: 'en',
        allowedClasses: allowedClasses,
        raceNames: raceNamesEN,
        specs: specs,
        traitNames: traitNames,
        questions: questions,
        ui: {
            shortVersionPrefix: 'Short Version: ',
            phase1: 'Part 1: Race Selection',
            phase2: 'Part 2: Worldview and Values',
            phase3: 'Part 3: Combat Style and Instincts',
            phase4: 'Part 4: Internal Dilemmas and Principles',
            questionCounter: (current, total) => `Question ${current} of ${total}`,
            pts: 'pts',
            switchVersionFull: 'Try Full Version (30 q.)',
            switchVersionShort: 'Try Short Version (10 q.)'
        }
    };
})();
