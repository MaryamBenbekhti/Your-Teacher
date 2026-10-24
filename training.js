// ============================================================
// TRAININGS (التدريبات)
// Shared by video-list.html (file tiles) and every training-<id>.html page.
// Trainings live in questions-data.js; each one has its own page
// training-<id>.html that sets TRAINING_ID and loads this file.
// ============================================================

const TRAINING_LABELS = {
  cats: {
    qudurat: 'قدرات', tahsili: 'تحصيلي',
    term1: 'الترم الأول', term2: 'الترم الثاني',
  },
  grades: {
    'اول-ابتدائي':  'أول ابتدائي',  'ثاني-ابتدائي': 'ثاني ابتدائي',
    'ثالث-ابتدائي': 'ثالث ابتدائي', 'رابع-ابتدائي': 'رابع ابتدائي',
    'خامس-ابتدائي': 'خامس ابتدائي', 'سادس-ابتدائي': 'سادس ابتدائي',
    'اول-متوسط':    'أول متوسط',    'ثاني-متوسط':   'ثاني متوسط',
    'ثالث-متوسط':   'ثالث متوسط',   'اول-ثانوي':    'أول ثانوي',
    'ثاني-ثانوي':   'ثاني ثانوي',   'ثالث-ثانوي':   'ثالث ثانوي',
  },
  subjects: {
    math: 'رياضيات', arabic: 'عربي', english: 'إنجليزي', science: 'علوم',
    social: 'اجتماعيات', islamic: 'إسلامية', physics: 'فيزياء',
    chemistry: 'كيمياء', biology: 'أحياء',
  },
};

const toArabicNum = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

// "term1--سادس-ابتدائي--math" → "رياضيات — سادس ابتدائي — الترم الأول"
function trainingLabel(key) {
  const [cat, grade, subject] = key.split('--');
  return [
    TRAINING_LABELS.subjects[subject] || subject,
    TRAINING_LABELS.grades[grade]     || grade,
    TRAINING_LABELS.cats[cat]         || cat,
  ].join(' — ');
}

// Subject page (video-list.html) where a key's trainings are listed
function trainingsPageUrl(key) {
  const [cat, grade, subject] = key.split('--');
  return 'video-list.html?cat=' + cat + '&grade=' + encodeURIComponent(grade) +
         '&subject=' + subject + '#trainings';
}

function findTraining(id) {
  for (const [key, sets] of Object.entries(QUESTIONS_DATA)) {
    const set = sets.find(s => s.id === id && s.questions);
    if (set) return { key, set };
  }
  return null;
}

// ── FILE TILES (video-list.html) ─────────────────────────────
function renderTrainingTiles(container, key) {
  const sets = QUESTIONS_DATA[key] || [];
  if (sets.length === 0) return;

  container.innerHTML = `
    <div class="section-header hidden-load" style="text-align:center; margin:60px 0 10px;">
      <span class="badge">📝 تمارين وأسئلة</span>
      <h2 class="main-title">اختبري <span style="color:var(--accent)">نفسك</span></h2>
      <p class="subtitle">اختاري التدريب، وحلّيه مباشرة وبتعرفين على طول إذا كانت إجابتك صح أو غلط</p>
    </div>
    <div class="training-files"></div>
  `;
  const list = container.querySelector('.training-files');

  sets.forEach(set => {
    const a = document.createElement('a');
    a.className = 'quiz-file hidden-load';
    a.href      = 'training-' + set.id + '.html';
    a.innerHTML = `
      <span class="quiz-file-icon" aria-hidden="true">📄</span>
      <span class="quiz-file-name"></span>
      <span class="quiz-file-title"></span>
      <span class="quiz-file-hint"></span>
    `;
    a.querySelector('.quiz-file-name').textContent  = trainingLabel(key);
    a.querySelector('.quiz-file-title').textContent = set.title;
    a.querySelector('.quiz-file-hint').textContent  =
      toArabicNum(set.questions ? set.questions.length : set.count) + ' سؤال • اضغطي لفتح التدريب';
    list.appendChild(a);
  });
}

// ── TRAINING PAGE (training-<id>.html) ───────────────────────
const letters = ['أ', 'ب', 'ج', 'د'];

// Dot plot drawn as SVG: one × per value above a number line
function buildDotPlot(pairs) {
  const ns    = 'http://www.w3.org/2000/svg';
  const max   = Math.max(...pairs.map(p => p[1]));
  const step  = pairs.length > 6 ? 34 : 70;
  const w     = step * (pairs.length - 1) + 80;
  const lineY = 22 * max + 30;
  const svg   = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + (lineY + 40));
  svg.setAttribute('class', 'dot-plot');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'تمثيل بالنقاط: ' +
    pairs.map(p => toArabicNum(p[0]) + ' (' + toArabicNum(p[1]) + ')').join('، '));

  const el = (tag, attrs, text) => {
    const n = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (text !== undefined) n.textContent = text;
    svg.appendChild(n);
  };

  el('line', { x1: 15, y1: lineY, x2: w - 15, y2: lineY, class: 'dp-axis' });
  el('path', { d: 'M8 ' + lineY + ' l10 -6 v12 z', class: 'dp-arrow' });
  el('path', { d: 'M' + (w - 8) + ' ' + lineY + ' l-10 -6 v12 z', class: 'dp-arrow' });

  pairs.forEach(([value, count], i) => {
    const x = 40 + i * step;
    el('line', { x1: x, y1: lineY - 7, x2: x, y2: lineY + 7, class: 'dp-axis' });
    el('text', { x: x, y: lineY + 30, class: 'dp-label' }, toArabicNum(value));
    for (let c = 0; c < count; c++) {
      el('text', { x: x, y: lineY - 12 - c * 22, class: 'dp-mark' }, '×');
    }
  });
  return svg;
}

function renderTraining(container, id) {
  const found = findTraining(id);
  if (!found) {
    container.innerHTML = `
      <div style="text-align:center; padding:80px 20px;">
        <div style="font-size:4rem; margin-bottom:20px;">📄</div>
        <h3 style="font-size:1.5rem; font-weight:800; margin-bottom:10px;">التدريب غير موجود</h3>
        <a href="videos.html" class="btn-black" style="margin-top:30px; display:inline-block;">العودة للشروحات</a>
      </div>`;
    return;
  }

  const { key, set } = found;
  const label   = trainingLabel(key);
  const backUrl = trainingsPageUrl(key);
  const total   = set.questions.length;
  let answered  = 0;
  let correct   = 0;

  document.title = set.title + ' — ' + label + ' | مدربتك';

  container.innerHTML = `
    <div class="hidden-load" style="margin-bottom:30px; font-size:0.9rem; color:#999; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <a href="videos.html" style="color:var(--accent); font-weight:700; text-decoration:none;">الشروحات</a>
      <span style="opacity:0.4;">◂</span>
      <a class="training-back-link" style="color:var(--accent); font-weight:700; text-decoration:none;"></a>
      <span style="opacity:0.4;">◂</span>
      <span style="color:var(--text-dark); font-weight:700;">التدريب</span>
    </div>

    <a class="training-back btn-black">→ العودة للتدريبات</a>

    <div class="section-header hidden-load" style="text-align:center; margin:30px 0 10px;">
      <span class="badge training-label">📄</span>
      <h1 class="main-title training-title"></h1>
      <p class="subtitle">اختاري الإجابة الصحيحة، وبتعرفين على طول إذا كانت صح أو غلط</p>
    </div>

    <div class="quiz-score">
      <span>الدرجة: <strong id="quiz-correct">٠</strong> / ${toArabicNum(total)}</span>
      <span>أجبتِ على <strong id="quiz-answered">٠</strong> من ${toArabicNum(total)}</span>
      <button type="button" class="quiz-reset" id="quiz-reset">إعادة المحاولة ↻</button>
    </div>

    <div class="quiz-body" id="quiz-body"></div>

    <div style="text-align:center; margin-top:40px;">
      <a class="training-back btn-black">→ العودة للتدريبات</a>
    </div>
  `;

  container.querySelector('.training-back-link').textContent = label;
  container.querySelector('.training-back-link').href        = backUrl;
  container.querySelectorAll('.training-back').forEach(a => a.href = backUrl);
  container.querySelector('.training-label').textContent = '📄 ' + label;
  container.querySelector('.training-title').textContent = set.title;

  const body = document.getElementById('quiz-body');

  const updateScore = () => {
    document.getElementById('quiz-correct').textContent  = toArabicNum(correct);
    document.getElementById('quiz-answered').textContent = toArabicNum(answered);
  };

  set.questions.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'quiz-card hidden-load';

    const head = document.createElement('div');
    head.className = 'quiz-question';
    head.innerHTML = `<span class="quiz-num">${toArabicNum(i + 1)}</span><p></p>`;
    head.querySelector('p').textContent = item.q;
    card.appendChild(head);

    if (item.dotplot) {
      const plot = document.createElement('div');
      plot.className = 'dot-plot-box';
      plot.appendChild(buildDotPlot(item.dotplot));
      card.appendChild(plot);
    }

    const opts = document.createElement('div');
    opts.className = 'quiz-options';
    const feedback = document.createElement('p');
    feedback.className = 'quiz-feedback';

    item.options.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="quiz-letter">${letters[idx]}</span><span></span>`;
      btn.lastChild.textContent = text;

      btn.addEventListener('click', () => {
        if (card.classList.contains('answered')) return;
        card.classList.add('answered');
        answered++;
        opts.children[item.answer].classList.add('correct');
        if (idx === item.answer) {
          correct++;
          feedback.textContent = 'إجابة صحيحة! 🎉';
          feedback.classList.add('ok');
        } else {
          btn.classList.add('wrong');
          feedback.textContent = 'إجابة خاطئة — الإجابة الصحيحة: (' + letters[item.answer] + ') ' + item.options[item.answer];
          feedback.classList.add('no');
        }
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        updateScore();
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);
    card.appendChild(feedback);
    body.appendChild(card);
  });

  document.getElementById('quiz-reset').addEventListener('click', () => {
    answered = 0;
    correct  = 0;
    body.querySelectorAll('.quiz-card').forEach(card => card.classList.remove('answered'));
    body.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = false;
      b.classList.remove('correct', 'wrong');
    });
    body.querySelectorAll('.quiz-feedback').forEach(f => {
      f.textContent = '';
      f.classList.remove('ok', 'no');
    });
    updateScore();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// On a training page, render it as soon as this file loads
if (typeof TRAINING_ID !== 'undefined') {
  renderTraining(document.getElementById('training'), TRAINING_ID);
}
