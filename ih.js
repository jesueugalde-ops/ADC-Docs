/* ═══ Idioma de la página (el mismo JS sirve a index.html y a index-en.html) ═══ */
var IH_EN = /^en/i.test(document.documentElement.lang || '');
var IH_T = {
  moreTesti: IH_EN ? 'See more testimonials' : 'Ver más testimonios',
  lessTesti: IH_EN ? 'Show fewer testimonials' : 'Mostrar menos testimonios',
  moreStory: IH_EN ? 'Read my full story' : 'Conoce mi historia completa',
  lessStory: IH_EN ? 'Show less' : 'Mostrar menos',
  carousel: IH_EN ? 'Testimonials (swipe to see more)' : 'Testimonios (desliza para ver más)',
  railLabel: IH_EN ? 'Page chapters' : 'Capítulos de la página',
  morePhotos: IH_EN ? 'See more photos' : 'Ver más fotos',
  area: IH_EN ? 'Area ' : 'Área '
};

  function switchTab(tabId, btn) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
  }

  function toggleTestimonios() {
    const extra = document.getElementById('testimonios-extra');
    const btn = document.getElementById('toggle-testimonio-btn');
    const text = document.getElementById('toggle-text');
    const icon = document.getElementById('toggle-icon');
    const abrir = !extra.classList.contains('expanded');

    extra.classList.toggle('expanded', abrir);
    btn.setAttribute('aria-expanded', String(abrir));
    text.innerText = abrir ? IH_T.lessTesti : IH_T.moreTesti;
    icon.firstElementChild.setAttribute('href', abrir ? '#i-chevron-up' : '#i-chevron-down');
  }

  var _opener = null;
  function openModal(id) {
    var ov = document.getElementById(id);
    if (!ov) return;
    _opener = document.activeElement;
    ov.classList.add('active');
    document.body.style.overflow = 'hidden';
    var btn = ov.querySelector('.modal-close');
    if (btn) window.setTimeout(function(){ try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); } }, 60);
  }

  function closeModal(id) {
    var ov = document.getElementById(id);
    if (!ov) return;
    ov.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (_opener && _opener.focus) { try { _opener.focus({ preventScroll: true }); } catch (e) { _opener.focus(); } }
    _opener = null;
  }

  /* Mantiene el foco del teclado dentro del panel abierto */
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Tab') return;
    var ov = document.querySelector('.modal-overlay.active');
    if (!ov) return;
    var f = ov.querySelectorAll('button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* v30 */
  (function(){
    var bs=document.querySelectorAll('.cur-toggle button'),ps=document.querySelectorAll('[data-mxn]');
    bs.forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cur');
      bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
      ps.forEach(function(e){e.innerHTML=e.getAttribute('data-'+c)})})});
    var mb=document.getElementById('more-btn'),mbody=document.getElementById('more-body');
    if(mb){mb.addEventListener('click',function(){var o=mbody.hidden;mbody.hidden=!o;mb.setAttribute('aria-expanded',String(o));
      document.getElementById('more-txt').textContent=o?IH_T.lessStory:IH_T.moreStory;
      document.getElementById('more-ic').firstElementChild.setAttribute('href',o?'#i-chevron-up':'#i-chevron-down')})}
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.active').forEach(function(m){closeModal(m.id)})}});
    document.querySelectorAll('.modal-overlay').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeModal(m.id)})});
    var svg=document.getElementById('rd');
    if(svg){var NS='http://www.w3.org/2000/svg',N=12,R=110;
      var pt=function(i,v){var a=-Math.PI/2+i*2*Math.PI/N;return [Math.cos(a)*R*v/10,Math.sin(a)*R*v/10]};
      [2,4,6,8,10].forEach(function(l){var p=document.createElementNS(NS,'polygon');
        p.setAttribute('points',Array.from({length:N},function(_,i){return pt(i,l).join(',')}).join(' '));
        p.setAttribute('fill','none');p.setAttribute('stroke','rgba(201,168,76,.18)');svg.appendChild(p)});
      for(var i=0;i<N;i++){var q=pt(i,10),ln=document.createElementNS(NS,'line');
        ln.setAttribute('x1',0);ln.setAttribute('y1',0);ln.setAttribute('x2',q[0]);ln.setAttribute('y2',q[1]);
        ln.setAttribute('stroke','rgba(201,168,76,.12)');svg.appendChild(ln)}
      var A=[3,4,3,5,2,4,5,3,4,3,4,2],B=[7,6,8,8,7,7,7,7,7,8,6,6];
      var pts=function(arr,t,lo){return arr.map(function(v,i){return pt(i,lo?lo[i]+(v-lo[i])*t:v).join(',')}).join(' ')};
      var ghost=document.createElementNS(NS,'polygon');
      ghost.setAttribute('fill','none');ghost.setAttribute('stroke','rgba(201,168,76,.4)');ghost.setAttribute('stroke-width','1');ghost.setAttribute('stroke-dasharray','3 4');
      ghost.setAttribute('points',pts(A,1));svg.appendChild(ghost);
      var poly=document.createElementNS(NS,'polygon');
      poly.setAttribute('fill','rgba(201,168,76,.22)');poly.setAttribute('stroke','#E8C97A');poly.setAttribute('stroke-width','1.6');poly.setAttribute('stroke-linejoin','round');svg.appendChild(poly);
      var draw=function(t){poly.setAttribute('points',pts(B,t,A))};
      var easeOut=function(x){return 1-Math.pow(1-x,3)},easeIO=function(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2};
      /* ciclo de 7.4 s: pausa en el inicio, crecimiento, pausa en el punto alto, regreso suave */
      var frame=function(ms){var m=ms%7400,t;
        if(m<600)t=0;else if(m<4600)t=easeOut((m-600)/4000);else if(m<6400)t=1;else t=1-easeIO((m-6400)/1000);
        draw(t)};
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){draw(1)}
      else{draw(0);var run=false,s0=0;
        var loop=function(n){if(!run)return;frame(n-s0);requestAnimationFrame(loop)};
        var go=function(){if(!run){run=true;s0=performance.now();requestAnimationFrame(loop)}};
        if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){go()}else{run=false}})},{threshold:.25}).observe(svg)}else{go()}}
    }
  })();


/* ═══════════════════════════════════════════════════════════════════
   FASE 1 · MOVIMIENTO SUTIL (v33)
   1) Línea de progreso  2) Conteo de cifras  3) Entrada escalonada
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* 1 · Línea de progreso (funciona también con movimiento reducido: la mueve el usuario) */
  var nav = document.querySelector('.nav');
  if (nav) {
    var bar = document.createElement('span');
    bar.className = 'nav-progress';
    bar.setAttribute('aria-hidden', 'true');
    nav.appendChild(bar);
    var ticking = false;
    var update = function(){
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.setProperty('--p', p.toFixed(4));
      ticking = false;
    };
    window.addEventListener('scroll', function(){ if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  if (reduce || !hasIO) return;

  /* 2 · Conteo de cifras (solo el cinturón de "Experiencias Reales"; una sola vez) */
  var parse = function(t){
    var m = t.trim().match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
    if (!m) return null;
    var raw = m[2];
    return { pre: m[1], val: parseFloat(raw.replace(/,/g, '')), dec: (raw.split('.')[1] || '').length, th: raw.indexOf(',') > -1, suf: m[3] };
  };
  var fmt = function(o, v){
    var n = v.toFixed(o.dec);
    if (o.th) { var p = n.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); n = p.join('.'); }
    return o.pre + n + o.suf;
  };
  var easeOut = function(x){ return 1 - Math.pow(1 - x, 3); };

  var countIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target; countIO.unobserve(el);
      var o = el._ihCount, final = el.textContent, t0 = null, D = 1400;
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
      var step = function(ts){
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / D);
        el.textContent = k < 1 ? fmt(o, o.val * easeOut(k)) : final;
        if (k < 1) requestAnimationFrame(step);
      };
      el.textContent = fmt(o, 0);
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('#testimonios-destacados .results-belt .rb-n').forEach(function(el){
    if (el.children.length) return;
    var o = parse(el.textContent);
    if (!o || isNaN(o.val)) return;
    el._ihCount = o;
    countIO.observe(el);
  });

  /* 3 · Entrada escalonada (títulos de sección y rejillas; máx. 4 pasos de escalón) */
  var HEAD = ['.eyebrow', '.sec-title', '.sec-desc'];
  var GRIDS = [
    '.results-belt .rb-item',
    '.t-grid .t-card',
    '.editorial-def-grid > *',
    '.match-row-editorial',
    '.proceso-editorial-grid .paso-editorial',
    '.editorial-fit-container .fit-column',
    '.precios-grid .precio-card',
    '.galeria-grid .eje-foto',
    '.dolores li'
  ];
  var EXCLUDE = '.hero, .t-extra, .tab-content, .acordeon-item, .modal-overlay';
  var targets = [];
  var seen = new Set();
  var add = function(el, i){
    if (seen.has(el) || el.closest(EXCLUDE)) return;
    seen.add(el);
    targets.push({ el: el, d: Math.min(i, 3) * 90 });
  };
  document.querySelectorAll('main > section').forEach(function(sec){
    if (sec.classList.contains('hero')) return;
    var wrap = sec.querySelector(':scope > .wrap');
    if (wrap) {
      var i = 0;
      Array.prototype.forEach.call(wrap.children, function(ch){
        if (HEAD.some(function(s){ return ch.matches(s); })) add(ch, i++);
      });
    }
    GRIDS.forEach(function(sel){
      sec.querySelectorAll(sel).forEach(function(el, idx){ add(el, idx); });
    });
  });

  if (window.matchMedia('(min-width: 901px)').matches) { targets = targets.filter(function(t){ return !t.el.closest('.ciclo-af'); }); }
  var isMobile = window.matchMedia('(max-width: 720px)').matches;
  if (isMobile) { targets = targets.filter(function(t){ return !t.el.closest('.t-grid--flat'); }); }
  var vh = window.innerHeight;
  var reveal = function(item){
    var el = item.el;
    el.style.transitionDelay = item.d + 'ms';
    el.classList.add('in');
    window.setTimeout(function(){
      el.classList.remove('rv', 'in');
      el.style.transitionDelay = '';
    }, 900 + item.d);
  };
  var map = new Map();
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      var item = map.get(e.target);
      if (!item) return;
      /* Revela si entra a la vista, o si ya quedó por encima (p. ej. al saltar con un ancla) */
      if (e.isIntersecting || e.boundingClientRect.top < 0) { io.unobserve(e.target); map.delete(e.target); reveal(item); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });

  targets.forEach(function(item){
    var r = item.el.getBoundingClientRect();
    /* No ocultamos lo que ya se ve al cargar, ni lo que ya quedó arriba */
    if (r.bottom <= 0 || r.top < vh * 0.92) return;
    item.el.classList.add('rv');
    map.set(item.el, item);
    io.observe(item.el);
  });
})();


/* ═══════════════════════════════════════════════════════════════════
   ENTREGA 2 (v34) · Puntos del carrusel de testimonios (solo se ven en móvil)
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var track = document.querySelector('#testimonios-destacados .t-grid--flat');
  if (!track) return;
  var cards = track.querySelectorAll('.t-card');
  if (cards.length < 2) return;
  track.setAttribute('tabindex', '0');
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', IH_T.carousel);
  var dots = document.createElement('div');
  dots.className = 't-dots';
  dots.setAttribute('aria-hidden', 'true');
  for (var i = 0; i < cards.length; i++) dots.appendChild(document.createElement('i'));
  track.insertAdjacentElement('afterend', dots);
  var set = function(){
    var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = 1e9;
    Array.prototype.forEach.call(cards, function(c, k){
      var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bd) { bd = d; best = k; }
    });
    Array.prototype.forEach.call(dots.children, function(d, k){ d.classList.toggle('on', k === best); });
  };
  var t = false;
  track.addEventListener('scroll', function(){ if (!t) { t = true; requestAnimationFrame(function(){ set(); t = false; }); } }, { passive: true });
  window.addEventListener('resize', set);
  set();
})();


/* ═══════════════════════════════════════════════════════════════════
   ENTREGA 3 (v35) · Ciclo A–F con letra fija + riel de capítulos
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Ciclo A–F: la letra queda fija mientras bajas; el paso activo se ilumina ── */
  var grid = document.querySelector('#metodo .ciclo-af');
  if (grid && 'IntersectionObserver' in window) {
    var steps = Array.prototype.slice.call(grid.querySelectorAll('.paso-editorial'));
    var letters = steps.map(function(s){ var n = s.querySelector('.paso-num'); return n ? n.textContent.trim() : ''; });
    var stage = document.createElement('div');
    stage.className = 'ciclo-stage';
    stage.setAttribute('aria-hidden', 'true');
    var big = document.createElement('div'); big.className = 'cl-letter';
    var ticks = document.createElement('div'); ticks.className = 'cl-ticks';
    letters.forEach(function(l){ var t = document.createElement('span'); t.textContent = l; ticks.appendChild(t); });
    stage.appendChild(big); stage.appendChild(ticks);
    var cur = -1, timer = null;
    var paint = function(i){
      big.textContent = letters[i];
      Array.prototype.forEach.call(ticks.children, function(t, k){ t.classList.toggle('on', k === i); t.classList.toggle('done', k < i); });
    };
    var set = function(i){
      if (i === cur || i < 0) return;
      var first = cur === -1; cur = i;
      steps.forEach(function(s, k){ s.classList.toggle('on', k === i); });
      window.clearTimeout(timer);
      if (reduce || first) { paint(i); return; }
      big.classList.add('out');
      timer = window.setTimeout(function(){ paint(i); big.classList.remove('out'); }, 170);
    };
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) set(steps.indexOf(e.target)); });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    var mq = window.matchMedia('(min-width: 901px)');
    var apply = function(){
      if (mq.matches) {
        grid.classList.add('ciclo-on');
        grid.insertBefore(stage, grid.firstChild);
        steps.forEach(function(s){ io.observe(s); });
        cur = -1; set(0);
      } else {
        grid.classList.remove('ciclo-on');
        if (stage.parentNode) stage.parentNode.removeChild(stage);
        steps.forEach(function(s){ io.unobserve(s); s.classList.remove('on'); });
        cur = -1;
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', apply); else if (mq.addListener) mq.addListener(apply);
    apply();
  }

  /* ── Riel de capítulos (solo ≥1280 px; el CSS lo oculta en pantallas menores) ── */
  var CH = [
    { n: IH_EN ? 'Start' : 'Inicio',                         ids: ['hero', 'esencial', 'testimonios-destacados'] },
    { n: IH_EN ? 'What it is' : 'Qué es',                    ids: ['definicion', 'arquitectura'] },
    { n: IH_EN ? 'Method' : 'Método',                        ids: ['metodo'] },
    { n: IH_EN ? 'For you · About me' : 'Para ti · Quién soy', ids: ['para-mi', 'autor'] },
    { n: IH_EN ? 'Investment' : 'Inversión',                 ids: ['precios', 'preguntas-detalle', 'galeria', 'cta-final'] }
  ];
  if (!('IntersectionObserver' in window) || !document.getElementById('hero')) return;
  var rail = document.createElement('nav');
  rail.className = 'rail';
  rail.setAttribute('aria-label', IH_T.railLabel);
  var links = CH.map(function(c, k){
    var a = document.createElement('a');
    a.href = k === 0 ? '#hero' : '#' + c.ids[0];
    a.setAttribute('aria-label', c.n);
    var s = document.createElement('span'); s.textContent = c.n;
    a.appendChild(s);
    if (k === 0) a.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    rail.appendChild(a);
    return a;
  });
  document.body.appendChild(rail);
  var chapterOf = {};
  CH.forEach(function(c, k){ c.ids.forEach(function(id){ chapterOf[id] = k; }); });
  var setChapter = function(k){
    links.forEach(function(a, i){
      a.classList.toggle('on', i === k);
      if (i === k) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  };
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting && chapterOf[e.target.id] !== undefined) setChapter(chapterOf[e.target.id]); });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  Object.keys(chapterOf).forEach(function(id){ var el = document.getElementById(id); if (el) cio.observe(el); });
  setChapter(0);
  /* El riel aparece al salir del hero, para no competir con el primer pantallazo */
  var hero = document.getElementById('hero');
  new IntersectionObserver(function(es){ es.forEach(function(e){ rail.classList.toggle('show', !e.isIntersecting); }); }, { threshold: 0.35 }).observe(hero);
})();


/* ═══════════════════════════════════════════════════════════════════
   ENTREGA 4 (v36) · Radar interactivo con las 12 áreas del Mapa de Fractura Raíz
   (nombres tomados de mapa.html; las tres dimensiones comparten la misma forma ilustrativa)
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var svg = document.getElementById('rd'), info = document.getElementById('rd-area');
  if (!svg || !info) return;
  var NS = 'http://www.w3.org/2000/svg', N = 12, R = 110;
  var DIMS = {
    personal: ['Salud Física y Energía','Relación con el Dinero / Paz Económica','Confianza en tus Propias Decisiones','Responsabilidad y Carácter','Espiritualidad y Propósito','Amor Propio y Autoestima','Comunicación','Sexualidad','Relación Familiar','Relación de Pareja','Autoexpresión','Hábitos Destructivos y Vicios'],
    profesional: ['Estabilidad Emocional bajo Presión','Seguridad y Autoridad Serena','Honorabilidad y Alineación con tu Palabra','Responsabilidad sobre tus Resultados','Claridad de Propósito y Objetivos','Gestión de tu Energía y tus Límites','Comunicación Asertiva con tu Equipo','Plan de Acción Diaria / Ejecución','Delegación Efectiva','Toma de Decisiones Estratégicas','Retorno de tu Inversión de Tiempo','Liderazgo y Retención de tu Equipo'],
    comercial: ['Postura ante el Dinero / Merecimiento','Confianza en el Valor de lo que Ofreces','Disposición Real ante el Rechazo y la Negociación','Responsabilidad sobre tus Resultados Comerciales','Claridad de tu Cliente Ideal','Dominio de tu Propuesta de Valor / Marca Personal','Estrategia de Marca y Modelo de Ventas','Prospección y Generación de Conversaciones','Reclutamiento de Talento Comercial','Cierre y Conversión','Satisfacción del Cliente y Referidos','Ingresos y Resultados de Venta']
  };
  var DIMS_EN = {"personal": ["Physical Health & Energy", "Relationship with Money / Financial Peace", "Trust in Your Own Decisions", "Accountability & Character", "Spirituality & Purpose", "Self-Love & Self-Esteem", "Communication", "Sexuality", "Family Relationships", "Romantic Relationship", "Self-Expression", "Destructive Habits & Vices"], "profesional": ["Emotional Stability Under Pressure", "Confidence & Calm Authority", "Integrity & Alignment with Your Word", "Ownership of Your Results", "Clarity of Purpose & Goals", "Managing Your Energy & Boundaries", "Assertive Communication with Your Team", "Daily Action Plan / Execution", "Effective Delegation", "Strategic Decision-Making", "Return on Your Time Investment", "Leadership & Team Retention"], "comercial": ["Mindset Around Money / Worthiness", "Confidence in the Value of What You Offer", "Real Readiness for Rejection & Negotiation", "Ownership of Your Commercial Results", "Clarity on Your Ideal Client", "Mastery of Your Value Proposition / Personal Brand", "Brand Strategy & Sales Model", "Prospecting & Generating Conversations", "Recruiting Commercial Talent", "Closing & Conversion", "Client Satisfaction & Referrals", "Income & Sales Results"]};
  if (IH_EN) DIMS = DIMS_EN;
  var cur = 'personal', active = -1;
  var mk = function(tag, attrs){ var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; };
  var g = mk('g', { 'class': 'rd-pts' });
  var ax = mk('line', { 'class': 'rd-ax', x1: 0, y1: 0, x2: 0, y2: 0 });
  g.appendChild(ax);
  var nodes = [];
  var show = function(i){
    active = i;
    nodes.forEach(function(n, k){ n.classList.toggle('on', k === i); });
    var a = -Math.PI / 2 + i * 2 * Math.PI / N;
    ax.setAttribute('x2', (Math.cos(a) * R).toFixed(2)); ax.setAttribute('y2', (Math.sin(a) * R).toFixed(2));
    ax.classList.add('on');
    info.classList.remove('idle');
    info.textContent = '';
    var n = document.createElement('span'); n.className = 'n'; n.textContent = String(i + 1);
    var t = document.createElement('span'); t.textContent = DIMS[cur][i];
    info.appendChild(n); info.appendChild(t);
  };
  for (var i = 0; i < N; i++) (function(i){
    var a = -Math.PI / 2 + i * 2 * Math.PI / N, x = Math.cos(a) * R, y = Math.sin(a) * R;
    var p = mk('g', { 'class': 'rd-pt', tabindex: '0', role: 'button' });
    p.appendChild(mk('circle', { 'class': 'rd-hit', cx: x.toFixed(2), cy: y.toFixed(2), r: 17 }));
    p.appendChild(mk('circle', { 'class': 'rd-dot', cx: x.toFixed(2), cy: y.toFixed(2), r: 3.4 }));
    p.addEventListener('mouseenter', function(){ show(i); });
    p.addEventListener('focus', function(){ show(i); });
    p.addEventListener('click', function(){ show(i); });
    p.addEventListener('keydown', function(e){
      var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (d) { e.preventDefault(); nodes[(i + d + N) % N].focus(); }
    });
    g.appendChild(p); nodes.push(p);
  })(i);
  svg.appendChild(g);
  var labelAll = function(){ nodes.forEach(function(n, k){ n.setAttribute('aria-label', IH_T.area + (k + 1) + ': ' + DIMS[cur][k]); }); };
  labelAll();
  var pills = document.querySelectorAll('.rd-dims button');
  Array.prototype.forEach.call(pills, function(b){
    b.addEventListener('click', function(){
      cur = b.getAttribute('data-dim');
      Array.prototype.forEach.call(pills, function(o){ var on = o === b; o.classList.toggle('on', on); o.setAttribute('aria-pressed', String(on)); });
      labelAll();
      if (active >= 0) show(active);
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════════
   ENTREGA 5 (v37) · "¿Qué puedes lograr?" cambia con la dimensión elegida bajo el radar
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var list = document.getElementById('logros-list');
  var pills = document.querySelectorAll('.rd-dims button');
  if (!list || !pills.length) return;
  var D = {"personal": [["De reaccionar en automático", "decidir desde tu centro"], ["Del agotamiento constante", "energía y tiempo para lo que importa"], ["De relaciones que desgastan", "vínculos donde puedes ser tú"], ["De cargar lo que te daña", "soltarlo sin pelearte contigo"]], "profesional": [["De decidir bajo presión y duda", "decidir con calma y criterio"], ["De cargarlo todo tú", "un equipo que responde y delegar sin culpa"], ["De días llenos que no avanzan", "tiempo que rinde en lo importante"], ["De resultados que dependen de tu humor", "un liderazgo sereno y sostenido"]], "comercial": [["De pedir disculpas por cobrar", "negociar desde tu valor"], ["De ofrecer de todo a todos", "saber a quién sirves y qué ofreces"], ["De prospectar con desgaste", "conversaciones que cierran"], ["De un negocio que depende de tu ánimo", "resultados que se sostienen"]]};
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (IH_EN) D = {"personal": [["From reacting on autopilot", "to deciding from your center"], ["From constant exhaustion", "to energy and time for what matters"], ["From relationships that drain you", "to bonds where you can be yourself"], ["From carrying what hurts you", "to letting it go without fighting yourself"]], "profesional": [["From deciding under pressure and doubt", "to deciding with calm and judgment"], ["From carrying everything yourself", "to a team that responds and delegating without guilt"], ["From packed days that don’t move forward", "to time that pays off where it matters"], ["From results that depend on your mood", "to steady, calm leadership"]], "comercial": [["From apologizing for charging", "to negotiating from your value"], ["From offering everything to everyone", "to knowing who you serve and what you offer"], ["From prospecting with burnout", "to conversations that close"], ["From a business that depends on your mood", "to results that hold"]]};
  var cur = 'personal', timer = null;
  var paint = function(k){
    list.textContent = '';
    D[k].forEach(function(r){
      var li = document.createElement('li');
      var d = document.createElement('span'); d.className = 'de'; d.textContent = r[0];
      var a = document.createElement('span'); a.className = 'a'; a.textContent = IH_EN ? r[1] : 'a ' + r[1];
      li.appendChild(d); li.appendChild(a); list.appendChild(li);
    });
  };
  Array.prototype.forEach.call(pills, function(b){
    b.addEventListener('click', function(){
      var k = b.getAttribute('data-dim');
      if (!D[k] || k === cur) return;
      cur = k;
      window.clearTimeout(timer);
      if (reduce) { paint(k); return; }
      list.classList.add('swap');
      timer = window.setTimeout(function(){ paint(k); list.classList.remove('swap'); }, 220);
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════════
   ENTREGA 6 (v38) · Galería: muestra 8 fotos; si algún día hay más, aparece "Ver más fotos"
   (para agregar fotos basta con sumar otro <figure class="eje-foto"> dentro de .galeria-grid)
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var LIMIT = 8;
  var grid = document.querySelector('.galeria-grid');
  if (!grid) return;
  var items = Array.prototype.slice.call(grid.querySelectorAll(':scope > .eje-foto'));
  if (items.length <= LIMIT) return;
  var extra = items.slice(LIMIT);
  extra.forEach(function(el){ el.hidden = true; });
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'btn-secundario galeria-mas';
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = IH_T.morePhotos;
  btn.addEventListener('click', function(){
    extra.forEach(function(el){ el.hidden = false; });
    btn.setAttribute('aria-expanded', 'true');
    btn.parentNode.removeChild(btn);
  });
  grid.insertAdjacentElement('afterend', btn);
})();
