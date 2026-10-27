// ============================================================
// READY-MADE TRAINING IN A FRAME (training-qudurat-*.html)
// The training's original file is kept unchanged in qudurat-trainings/
// and shown in <iframe id="training-frame">. This keeps the frame as tall
// as the training, so the page scrolls as one, and passes the training's
// own scrolling (jump links, "back to top") on to the page.
// ============================================================

(function () {
  const frame = document.getElementById('training-frame');
  if (!frame) return;

  const NAV_OFFSET = 90;                       // room for the sticky navbar
  const frameTop = () => frame.getBoundingClientRect().top + window.scrollY;
  const scrollPage = y => window.scrollTo({ top: Math.max(0, frameTop() + y - NAV_OFFSET), behavior: 'smooth' });

  function setup() {
    const win = frame.contentWindow;
    const doc = frame.contentDocument;
    if (!doc || !doc.body || win.location.href === 'about:blank') return;

    // Height = bottom of the training's content (its .wrap) + the body's bottom padding.
    // Without a .wrap, measure the body's children, not the body: a body with
    // min-height:100vh would grow with the frame and never settle.
    const wrap = doc.querySelector('.wrap');
    const parts = wrap ? [wrap] : [...doc.body.children].filter(el => el.tagName !== 'SCRIPT');
    const fit = () => {
      const pad = parseFloat(win.getComputedStyle(doc.body).paddingBottom) || 0;
      const bottom = Math.max(0, ...parts.map(el => el.getBoundingClientRect().bottom));
      const h = Math.ceil(bottom + pad + 24);
      if (Math.abs(frame.offsetHeight - h) > 2) frame.style.height = h + 'px';
    };
    fit();
    const ro = new win.ResizeObserver(fit);
    parts.forEach(el => ro.observe(el));
    win.addEventListener('resize', fit);

    // Jump links inside the training (e.g. its skills list) scroll the page
    doc.addEventListener('click', e => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = doc.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      if (!target) return;
      e.preventDefault();
      scrollPage(target.getBoundingClientRect().top);
    });

    // The training's own window.scrollTo (e.g. "back to top" on restart) scrolls the page
    win.scrollTo = function (x, y) {
      const top = (x && typeof x === 'object') ? (x.top || 0) : (y || 0);
      scrollPage(top);
    };
  }

  frame.addEventListener('load', setup);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') setup();
})();
