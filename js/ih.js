
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
    text.innerText = abrir ? 'Mostrar menos testimonios' : 'Ver más testimonios';
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
      document.getElementById('more-txt').textContent=o?'Mostrar menos':'Conoce mi historia completa';
      document.getElementById('more-ic').firstElementChild.setAttribute('href',o?'#i-chevron-up':'#i-chevron-down')})}
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.active').forEach(function(m){closeModal(m.id)})}});
    document.querySelectorAll('.modal-overlay').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeModal(m.id)})});
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function(a){a.addEventListener('click',function(){
      var p=a.closest('section,nav,footer'),id=(p&&p.id)||(p&&p.tagName.toLowerCase())||'web';
      if(a.href.indexOf('%5Bweb-')<0)a.href+='%20%5Bweb-'+id+'%5D'})});
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
    '.galeria-grid .eje-foto'
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
  track.setAttribute('aria-label', 'Testimonios (desliza para ver más)');
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
