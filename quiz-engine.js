/**
 * Kaukai - Unified Quiz Engine
 * Manages quiz state, scoring matrix, tie-breakers, keyboard shortcuts, and DOM rendering.
 */
(function () {
    const data = window.QUIZ_DATA;
    if (!data) {
        console.error("Quiz data not loaded!");
        return;
    }

    const allowedClasses = data.allowedClasses;
    const raceNames = data.raceNames;
    const specs = data.specs;
    const traitNames = data.traitNames;
    const questions = data.questions;
    const ui = data.ui;

    let currentQIndex = 0;
    let isShortVersion = false;
    let activeQuestions = [];
    let selectedAnswers = [];
    let raceScores = { Human: 0, Dwarf: 0, Gnome: 0, NightElf: 0 };
    let traitScores = { PN: 0, VS: 0, PI: 0, DS: 0, FL: 0, SA: 0, MK: 0, PG: 0, ŠS: 0, Pas: 0, MR: 0, GD: 0 };
    let calculatedResult = null;

    function startQuiz(version = 'long') {
        isShortVersion = (version === 'short');
        if (isShortVersion) {
            activeQuestions = [
                questions[0], questions[2], questions[5], // 3 race questions
                questions[11], questions[12], // Phase 2 (2 questions)
                questions[17], questions[19], // Phase 3 (2 questions)
                questions[22], questions[23], questions[24] // Phase 4 (3 questions)
            ];
        } else {
            activeQuestions = questions;
        }
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        currentQIndex = 0;
        selectedAnswers = [];
        resetScores();
        showQuestion();
    }

    function resetScores() {
        raceScores = { Human: 0, Dwarf: 0, Gnome: 0, NightElf: 0 };
        traitScores = { PN: 0, VS: 0, PI: 0, DS: 0, FL: 0, SA: 0, MK: 0, PG: 0, ŠS: 0, Pas: 0, MR: 0, GD: 0 };
    }

    function recalculateScores() {
        resetScores();
        selectedAnswers.forEach(ans => {
            if (ans.type === 'race') {
                ans.val.forEach(r => raceScores[r]++);
            } else if (ans.type === 'class') {
                traitScores[ans.val]++;
            }
        });
    }

    function getPhaseTitle(index) {
        if (index < 3 && isShortVersion) return ui.phase1;
        if (index < 6 && !isShortVersion) return ui.phase1;

        if (isShortVersion) {
            if (index < 5) return ui.phase2;
            if (index < 7) return ui.phase3;
            return ui.phase4;
        } else {
            if (index < 14) return ui.phase2;
            if (index < 22) return ui.phase3;
            return ui.phase4;
        }
    }

    function showQuestion() {
        const q = activeQuestions[currentQIndex];
        document.getElementById('phase-badge').innerText = isShortVersion ? ui.shortVersionPrefix + getPhaseTitle(currentQIndex) : getPhaseTitle(currentQIndex);
        document.getElementById('question-counter').innerText = ui.questionCounter(currentQIndex + 1, activeQuestions.length);

        const cleanText = q.q.replace(/^\d+\.\s*/, '');
        document.getElementById('question-text').innerText = `${currentQIndex + 1}. ${cleanText}`;

        const progressPercent = ((currentQIndex) / activeQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = Math.max(progressPercent, 3) + '%';

        document.getElementById('prev-btn').disabled = (currentQIndex === 0);

        const container = document.getElementById('options-container');
        container.innerHTML = '';

        q.opts.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'option-button';
            btn.innerHTML = `
                <span class="option-letter">${opt.label}</span>
                <span class="option-text">${opt.text}</span>
            `;
            btn.onclick = () => selectOption(q.type, opt.val, opt.label);
            container.appendChild(btn);
        });
    }

    function selectOption(type, val, label) {
        selectedAnswers[currentQIndex] = { type, val, label };

        if (currentQIndex + 1 < activeQuestions.length) {
            currentQIndex++;
            showQuestion();
        } else {
            recalculateScores();
            calculateResult();
        }
    }

    function previousQuestion() {
        if (currentQIndex > 0) {
            currentQIndex--;
            showQuestion();
        }
    }

    window.addEventListener('keydown', (e) => {
        const quizScreen = document.getElementById('quiz-screen');
        if (!quizScreen || quizScreen.style.display !== 'block') return;
        const key = e.key.toUpperCase();
        const q = activeQuestions[currentQIndex];
        if (!q) return;

        let chosen = null;
        if (key === 'A' || key === '1') chosen = q.opts[0];
        else if (key === 'B' || key === '2') chosen = q.opts[1];
        else if (key === 'C' || key === '3') chosen = q.opts[2];

        if (chosen) {
            selectOption(q.type, chosen.val, chosen.label);
        } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
            previousQuestion();
        }
    });

    function calculateResult() {
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        let maxR = -1;
        let topRaces = [];
        Object.keys(raceScores).forEach(r => {
            if (raceScores[r] > maxR) {
                maxR = raceScores[r];
                topRaces = [r];
            } else if (raceScores[r] === maxR) {
                topRaces.push(r);
            }
        });
        let bestRace = topRaces[0];

        let maxS = -1;
        let topSpecs = [];
        specs.forEach(s => {
            let score = traitScores[s.t1] + traitScores[s.t2] + traitScores[s.t3];
            if (score > maxS) {
                maxS = score;
                topSpecs = [s];
            } else if (score === maxS) {
                topSpecs.push(s);
            }
        });

        if (topSpecs.length > 1) {
            let filtered = topSpecs.filter(s => allowedClasses[bestRace].includes(s.class));
            if (filtered.length > 0) topSpecs = filtered;
        }

        let winner = topSpecs[0];
        const ansLabels = selectedAnswers.map(a => a ? a.label : '');

        if (topSpecs.length > 1) {
            const ids = topSpecs.map(s => s.id);

            if (ids.includes('war-arms') && ids.includes('pal-ret')) {
                winner = (ansLabels[6] === 'A' && ansLabels[8] === 'A')
                    ? specs.find(s => s.id === 'pal-ret')
                    : specs.find(s => s.id === 'war-arms');
            } else if (ids.includes('war-prot') && ids.includes('pal-prot')) {
                winner = (ansLabels[23] === 'C' || ansLabels[29] === 'C')
                    ? specs.find(s => s.id === 'pal-prot')
                    : specs.find(s => s.id === 'war-prot');
            } else if (ids.includes('pal-holy') && ids.includes('pri-holy')) {
                winner = (ansLabels[7] === 'B' || ansLabels[11] === 'C')
                    ? specs.find(s => s.id === 'pri-holy')
                    : specs.find(s => s.id === 'pal-holy');
            } else if (ids.includes('rog-assa') && ids.includes('hun-surv')) {
                winner = (ansLabels[17] === 'A' || ansLabels[21] === 'B')
                    ? specs.find(s => s.id === 'hun-surv')
                    : specs.find(s => s.id === 'rog-assa');
            } else if (ids.includes('hun-bm') && ids.includes('sha-ele')) {
                winner = (ansLabels[6] === 'C' || ansLabels[9] === 'B')
                    ? specs.find(s => s.id === 'sha-ele')
                    : specs.find(s => s.id === 'hun-bm');
            } else if (ids.includes('dru-feral') && ids.includes('sha-enh')) {
                winner = (ansLabels[15] === 'C' || ansLabels[18] === 'A')
                    ? specs.find(s => s.id === 'sha-enh')
                    : specs.find(s => s.id === 'dru-feral');
            } else if (ids.includes('dru-rest') && ids.includes('sha-rest')) {
                winner = (ansLabels[28] === 'C')
                    ? specs.find(s => s.id === 'sha-rest')
                    : specs.find(s => s.id === 'dru-rest');
            } else if (ids.includes('pri-shadow') || ids.includes('loc-aff') || ids.includes('loc-dest') || ids.includes('mag-arc')) {
                if (ansLabels[7] === 'A' || ansLabels[11] === 'B') winner = specs.find(s => s.id === 'mag-arc');
                else if (ansLabels[24] === 'C' || ansLabels[27] === 'C') winner = specs.find(s => s.id === 'pri-shadow');
                else if (ansLabels[29] === 'B') winner = specs.find(s => s.id === 'loc-dest');
                else winner = specs.find(s => s.id === 'loc-aff');
            } else {
                winner = topSpecs[0];
            }
        }

        if (!allowedClasses[bestRace].includes(winner.class)) {
            let validRaces = Object.keys(raceScores).filter(r => allowedClasses[r].includes(winner.class));
            validRaces.sort((a, b) => raceScores[b] - raceScores[a]);
            bestRace = validRaces[0];
        }

        calculatedResult = {
            race: raceNames[bestRace],
            raceKey: bestRace,
            winner: winner
        };

        document.getElementById('result-hero-name').innerText = `${raceNames[bestRace]} ${winner.class}`;
        document.getElementById('result-hero-spec').innerText = winner.spec;
        document.getElementById('result-desc').innerText = winner.desc;

        const traitsContainer = document.getElementById('traits-container');
        traitsContainer.innerHTML = '';
        [winner.t1, winner.t2, winner.t3].forEach(t => {
            const pill = document.createElement('div');
            pill.className = 'trait-item';
            pill.innerHTML = `<span>${traitNames[t]}</span> (${traitScores[t]} ${ui.pts})`;
            traitsContainer.appendChild(pill);
        });

        const switchBtn = document.getElementById('switch-version-btn');
        if (isShortVersion) {
            switchBtn.innerText = ui.switchVersionFull;
            switchBtn.onclick = () => switchVersion('long');
        } else {
            switchBtn.innerText = ui.switchVersionShort;
            switchBtn.onclick = () => switchVersion('short');
        }
    }

    function resetQuiz() {
        document.getElementById('result-screen').style.display = 'none';
        startQuiz(isShortVersion ? 'short' : 'long');
    }

    function switchVersion(version) {
        document.getElementById('result-screen').style.display = 'none';
        startQuiz(version);
    }

    // Expose handlers for HTML onclick bindings
    window.startQuiz = startQuiz;
    window.resetQuiz = resetQuiz;
    window.switchVersion = switchVersion;
    window.previousQuestion = previousQuestion;
})();
