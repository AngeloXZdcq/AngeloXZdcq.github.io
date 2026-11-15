/* Lógica del portafolio: arma todas las páginas a partir de data/catalogo.js */
(function () {
  const P = window.PORTAFOLIO, C = window.CONTENIDO || { casos: {}, flashcards: {} };
  const $ = (s, el = document) => el.querySelector(s);
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content; };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const curso = (id) => P.cursos.find(c => c.id === id) || { nombre: id, color: '#002060' };
  const fmtFecha = (f) => { if (!f) return ''; const [y, m, d] = f.split('-'); const M = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']; return `${+d} ${M[+m - 1]} ${y}`; };
  const TIPOS = { informe: 'DOC', video: '▶', simulador: 'SIM', esquema: 'ESQ', casos: 'CAS', flashcards: 'FC', presentacion: 'PPT', canva: 'CNV', documento: 'DOC', enlace: '↗' };
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };

  /* ---------- cabecera y pie comunes ---------- */
  function chrome(active) {
    const nav = [['index.html', 'Inicio', 'inicio'], ['index.html#cursos', 'Cursos', 'cursos'], ['biblioteca.html', 'Biblioteca', 'biblioteca'], ['repaso.html', 'Repaso', 'repaso'], ['registrar.html', 'Registrar', 'registrar']];
    document.body.prepend(h(`<a class="skip" href="#main">Ir al contenido</a>
      <header class="top"><div class="wrap">
        <a class="brand" href="index.html"><img src="assets/img/medicina.png" alt=""><span>Angel Cueva<small>Medicina · UNAM</small></span></a>
        <button class="menu-btn" aria-label="Menú">☰</button>
        <nav class="nav">${nav.map(([u, t, k]) => `<a href="${u}" class="${k === active ? 'on' : ''}">${t}</a>`).join('')}</nav>
      </div></header>`));
    document.body.append(h(`<footer><div class="wrap">
      <div><b>${esc(P.autor.nombre)}</b><br>${esc(P.autor.carrera)} · ${esc(P.autor.universidad)}</div>
      <div>Semestre ${esc(P.autor.semestre)} · Material académico de uso educativo.<br>Los datos de laboratorio de compañeros se muestran anonimizados.</div>
    </div></footer>`));
    $('.menu-btn').onclick = () => $('.nav').classList.toggle('open');
  }

  function matCard(m) {
    const c = curso(m.curso);
    return `<a class="card mat" href="${esc(m.url)}" ${/\.(docx|pdf|pptx|xlsx)$/i.test(m.url) ? 'download' : ''} ${/^https?:/.test(m.url) ? 'target="_blank" rel="noopener"' : ''}>
      <span class="ico ${esc(m.tipo)}">${TIPOS[m.tipo] || '•'}</span>
      <span><h4>${esc(m.titulo)}</h4><p>${esc(c.nombre)} · ${fmtFecha(m.fecha)}${m.descripcion ? ' · ' + esc(m.descripcion) : ''}</p></span></a>`;
  }
  function pracCard(p) {
    const c = curso(p.curso);
    return `<a class="card prac" href="practica.html?id=${p.id}"><img src="${esc(p.portada)}" alt="" loading="lazy">
      <div class="b"><span class="badge pink">${esc(c.nombre)} · Práctica ${String(p.numero).padStart(2, '0')}</span>
      <h3>${esc(p.titulo)}</h3><p style="margin:0;color:var(--muted)">${esc(p.subtitulo)}</p>
      <p style="margin:8px 0 0;font-size:13px;color:var(--muted)">${fmtFecha(p.fecha)}</p></div></a>`;
  }

  /* ---------- INICIO ---------- */
  function inicio() {
    chrome('inicio');
    const nMat = P.materiales.length, nPr = P.practicas.length, nCur = P.cursos.length;
    const recientes = [...P.materiales].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 6);
    $('#main').append(h(`
    <div class="hero"><div class="wrap">
      <div><span class="eyebrow">Portafolio académico · ${esc(P.autor.semestre)}</span>
        <h1>Del laboratorio <em>al aprendizaje</em></h1>
        <p>Informes, videos, simuladores, esquemas y repaso de mis cursos de Medicina en la ${esc(P.autor.universidad)}, todo en un solo lugar.</p>
        <div class="meta"><span class="chip">${esc(P.autor.nombre)}</span><span class="chip">${esc(P.autor.carrera)}</span></div>
      </div>
      <div class="hero-card"><h3>En cifras</h3>
        <div class="stats"><div class="stat"><b>${nCur}</b><span>cursos</span></div><div class="stat"><b>${nPr}</b><span>prácticas</span></div><div class="stat"><b>${nMat}</b><span>materiales</span></div></div>
        <form class="search" action="biblioteca.html"><input name="q" placeholder="Buscar: lipídico, video, simulador…" aria-label="Buscar"><button>Buscar</button></form>
      </div></div></div>
    <section><div class="wrap">
      <div class="sec-head"><div><span class="kicker">Lo más reciente</span><h2>Prácticas</h2></div></div>
      <div class="grid g2">${[...P.practicas].sort((a, b) => b.fecha.localeCompare(a.fecha)).map(pracCard).join('')}</div>
    </div></section>
    <section id="cursos" style="padding-top:10px"><div class="wrap">
      <div class="sec-head"><div><span class="kicker">Por curso</span><h2>Cursos del ciclo</h2></div></div>
      <div class="grid g3">${P.cursos.map(c => { const n = P.practicas.filter(p => p.curso === c.id).length, m = P.materiales.filter(x => x.curso === c.id).length;
        return `<a class="card course" style="--c:${c.color}" href="curso.html?c=${c.id}"><span class="bar"></span><span class="badge">${esc(c.grupo || 'Curso')}</span><h3>${esc(c.nombre)}</h3><span class="n">${esc(c.descripcion)}</span>${n + m ? `<span class="n"><b>${n}</b> prácticas · <b>${m}</b> materiales</span>` : '<span class="soon">Próximamente</span>'}</a>`; }).join('')}</div>
    </div></section>
    <section style="padding-top:10px"><div class="wrap">
      <div class="sec-head"><div><span class="kicker">Biblioteca</span><h2>Material subido</h2></div><a class="btn g" href="biblioteca.html">Ver todo →</a></div>
      <div class="grid g2">${recientes.map(matCard).join('')}</div>
    </div></section>`));
  }

  /* ---------- CURSO ---------- */
  function cursoPage() {
    chrome('cursos');
    const id = new URLSearchParams(location.search).get('c'); const c = curso(id);
    const prs = P.practicas.filter(p => p.curso === id).sort((a, b) => a.numero - b.numero);
    const mats = P.materiales.filter(m => m.curso === id && !m.practica);
    document.title = c.nombre + ' · Portafolio';
    $('#main').append(h(`<div class="p-hero" style="background:linear-gradient(160deg,#001a4f,${c.color})"><div class="wrap" style="grid-template-columns:1fr">
      <div><div class="crumbs"><a href="index.html">Inicio</a> / Cursos</div><h1>${esc(c.nombre)}</h1><p>${esc(c.descripcion)}</p>
      <div class="meta row">${c.grupo ? `<span class="chip">${esc(c.grupo)}</span>` : ''}${c.docentes ? `<span class="chip">${esc(c.docentes)}</span>` : ''}</div></div></div></div>
      <section><div class="wrap"><div class="sec-head"><div><span class="kicker">Prácticas</span><h2>${prs.length ? prs.length + ' registradas' : 'Aún sin prácticas'}</h2></div></div>
      ${prs.length ? `<div class="grid g2">${prs.map(pracCard).join('')}</div>` : '<div class="card empty">Cuando registres una práctica de este curso en <b>data/catalogo.js</b> aparecerá aquí.</div>'}
      ${mats.length ? `<div class="sec-head" style="margin-top:30px"><h2>Otros materiales</h2></div><div class="grid g2">${mats.map(matCard).join('')}</div>` : ''}
      </div></section>`));
  }

  /* ---------- BIBLIOTECA ---------- */
  function biblioteca() {
    chrome('biblioteca');
    const q0 = new URLSearchParams(location.search).get('q') || '';
    const tipos = [...new Set(P.materiales.map(m => m.tipo))];
    $('#main').append(h(`<section><div class="wrap"><div class="sec-head"><div><span class="kicker">Biblioteca</span><h2>Todo el material</h2><p class="lead">Filtra por curso o tipo, o busca por palabra.</p></div></div>
      <div class="search" style="border:1px solid var(--line);max-width:560px"><input id="q" value="${esc(q0)}" placeholder="Buscar…" aria-label="Buscar"></div>
      <div class="filters" id="fc"><button class="pill on" data-c="">Todos los cursos</button>${P.cursos.map(c => `<button class="pill" data-c="${c.id}">${esc(c.nombre)}</button>`).join('')}</div>
      <div class="filters" id="ft"><button class="pill on" data-t="">Todos los tipos</button>${tipos.map(t => `<button class="pill" data-t="${t}">${t}</button>`).join('')}</div>
      <div class="grid g2" id="list"></div></div></section>`));
    let fc = '', ft = '';
    const draw = () => {
      const q = $('#q').value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const L = P.materiales.filter(m => (!fc || m.curso === fc) && (!ft || m.tipo === ft) && (!q || (m.titulo + ' ' + m.descripcion + ' ' + curso(m.curso).nombre).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q)))
        .sort((a, b) => b.fecha.localeCompare(a.fecha));
      $('#list').innerHTML = L.length ? L.map(matCard).join('') : '<div class="card empty">No hay material con esos filtros.</div>';
    };
    $('#fc').onclick = e => { const b = e.target.closest('button'); if (!b) return; fc = b.dataset.c; [...$('#fc').children].forEach(x => x.classList.toggle('on', x === b)); draw(); };
    $('#ft').onclick = e => { const b = e.target.closest('button'); if (!b) return; ft = b.dataset.t; [...$('#ft').children].forEach(x => x.classList.toggle('on', x === b)); draw(); };
    $('#q').oninput = draw; draw();
  }

  /* ---------- PRÁCTICA ---------- */
  function practica() {
    chrome('cursos');
    const id = new URLSearchParams(location.search).get('id'); const p = P.practicas.find(x => x.id === id);
    if (!p) { $('#main').innerHTML = '<div class="wrap empty">Práctica no encontrada.</div>'; return; }
    const c = curso(p.curso); document.title = `P${String(p.numero).padStart(2, '0')} · ${p.titulo} · Portafolio`;
    const tabs = [['resumen', 'Resumen', true], ['video', 'Video', p.video], ['informe', 'Informe', p.informe], ['simulador', 'Simulador', p.simulador],
      ['esquemas', 'Esquemas', p.esquemas], ['resultados', 'Resultados', p.resultados], ['galeria', 'Fotos', p.galeria],
      ['casos', 'Casos clínicos', C.casos[p.casos]], ['flashcards', 'Flashcards', C.flashcards[p.flashcards]], ['material', 'Material', true]].filter(t => t[2]);
    const tituloHTML = esc(p.titulo).replace(/ (\S+)$/, ' <em>$1</em>');
    $('#main').append(h(`<div class="p-hero"><div class="wrap">
      <div><div class="crumbs"><a href="index.html">Inicio</a> / <a href="curso.html?c=${c.id}">${esc(c.nombre)}</a> / Práctica ${String(p.numero).padStart(2, '0')}</div>
      <h1>${tituloHTML}</h1><p>${esc(p.subtitulo)}</p>
      <div class="meta row" style="margin-top:14px"><span class="chip">${fmtFecha(p.fecha)}</span><span class="chip">${esc(c.grupo)}</span></div></div>
      <img src="${esc(p.portada)}" alt="Ilustración de la práctica"></div></div>
      <nav class="tabs" aria-label="Secciones"><div class="wrap">${tabs.map(t => `<a href="#${t[0]}" data-t="${t[0]}">${t[1]}</a>`).join('')}</div></nav>
      <section><div class="wrap" id="panels"></div></section>`));
    const pan = $('#panels'); const add = (id, html) => pan.append(h(`<div class="panel" id="p-${id}">${html}</div>`));
    // Resumen
    add('resumen', `<div class="sec-head"><div><span class="kicker">Idea central</span><h2>Resumen</h2></div></div><p class="lead">${esc(p.resumen)}</p>
      <div class="grid g2" style="margin-top:16px">${(p.ideas || []).map((x, i) => `<div class="card pad"><span class="badge pink">${String(i + 1).padStart(2, '0')} · ${esc(x[0])}</span><p style="margin:10px 0 0">${esc(x[1])}</p></div>`).join('')}</div>
      <div class="formula">C (mg/dL) = <span class="frac"><span>A muestra</span><span>A estándar</span></span> × 200 &nbsp;&nbsp;·&nbsp;&nbsp; VLDL = <span class="frac"><span>TG</span><span>5</span></span></div>`);
    // Video
    if (p.video) add('video', `<div class="sec-head"><div><span class="kicker">Video</span><h2>La práctica en 4 minutos</h2></div></div>
      <div class="video">${p.video.youtube ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(p.video.youtube)}" title="Video de la práctica" allowfullscreen loading="lazy"></iframe>` : `<video src="${esc(p.video.archivo)}" controls preload="metadata" poster="${esc(p.portada)}"></video>`}</div>`);
    // Informe
    if (p.informe) add('informe', `<div class="sec-head"><div><span class="kicker">Informe</span><h2>Informe de laboratorio</h2><p class="lead">Documento en Word, editable, con ecuaciones, esquemas y gráficos.</p></div></div>
      <div class="row">${p.informe.archivos.map((a, i) => `<a class="btn ${i ? 'g' : 'p'}" href="${esc(a[1])}" download>↓ ${esc(a[0])}</a>`).join('')}</div>
      <div class="pages">${(p.informe.vista || []).map(v => `<img src="${esc(v)}" alt="Página del informe" loading="lazy" data-lb>`).join('')}</div>`);
    // Simulador
    if (p.simulador) add('simulador', `<div class="sec-head"><div><span class="kicker">Simulador</span><h2>De la absorbancia al perfil lipídico</h2><p class="lead">Mueve la absorbancia y observa cómo cambian la concentración, el color del tubo y la clasificación.</p></div></div><div id="sim"></div>`);
    // Esquemas
    if (p.esquemas) add('esquemas', `<div class="sec-head"><div><span class="kicker">Esquemas animados</span><h2>Lo que no se ve a simple vista</h2></div></div>
      <div class="schem">${p.esquemas.map(e => `<div class="card"><video src="${esc(e[2])}" muted loop playsinline preload="none" poster=""></video><div class="b"><h4>${esc(e[0])}</h4><p>${esc(e[1])}</p></div></div>`).join('')}</div>`);
    // Resultados
    if (p.resultados) add('resultados', resultados(p));
    // Galería
    if (p.galeria) add('galeria', `<div class="sec-head"><div><span class="kicker">Evidencias</span><h2>Fotos de la práctica</h2></div></div>
      <div class="gallery">${p.galeria.map(g => `<figure data-lb data-src="material/${p.curso}/p${String(p.numero).padStart(2, '0')}/fotos/${esc(g[0])}"><img src="material/${p.curso}/p${String(p.numero).padStart(2, '0')}/fotos/${esc(g[0])}" alt="${esc(g[1])}" loading="lazy"><figcaption>${esc(g[1])}</figcaption></figure>`).join('')}</div>`);
    // Casos
    if (C.casos[p.casos]) add('casos', `<div class="sec-head"><div><span class="kicker">Aplicación clínica</span><h2>Casos para pensar como clínico</h2></div></div><div id="casos-box"></div>`);
    if (C.flashcards[p.flashcards]) add('flashcards', `<div class="sec-head"><div><span class="kicker">Repaso activo</span><h2>Flashcards</h2></div></div><div id="fc-box"></div>`);
    const mats = P.materiales.filter(m => m.practica === p.id);
    add('material', `<div class="sec-head"><div><span class="kicker">Material</span><h2>Todo lo de esta práctica</h2></div></div><div class="grid g2">${mats.map(matCard).join('') || '<div class="card empty">Sin material adicional.</div>'}</div>`);

    if (p.simulador === 'perfil-lipidico') simLipidos($('#sim'), p);
    if (C.casos[p.casos]) casos($('#casos-box'), C.casos[p.casos], 'casos-' + p.id);
    if (C.flashcards[p.flashcards]) flashcards($('#fc-box'), C.flashcards[p.flashcards], 'fc-' + p.id);

    const show = () => {
      const t = (location.hash || '#resumen').slice(1); const ok = tabs.some(x => x[0] === t) ? t : 'resumen';
      document.querySelectorAll('.panel').forEach(x => x.classList.toggle('on', x.id === 'p-' + ok));
      document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('on', a.dataset.t === ok));
      document.querySelectorAll('.panel:not(.on) video').forEach(v => v.pause());
      if (ok === 'esquemas') document.querySelectorAll('#p-esquemas video').forEach(v => { v.preload = 'auto'; v.play().catch(() => { }); });
    };
    window.addEventListener('hashchange', show); show();
    lightbox();
  }

  function clsTG(v) { return v < 150 ? ['ok', 'Óptimo'] : v < 200 ? ['warn', 'Límite'] : v < 500 ? ['bad', 'Alto'] : ['bad', 'Muy alto']; }
  function clsCT(v) { return v < 200 ? ['ok', 'Óptimo'] : v <= 240 ? ['warn', 'Límite'] : ['bad', 'Muy alto']; }
  function barsSVG(rows, max, lines, cls) {
    const W = 720, H = 300, x0 = 46, y0 = 260, top = 20, bw = (W - x0 - 10) / rows.length;
    const y = v => y0 - (y0 - top) * v / max; const col = { ok: '#2e75b6', warn: '#e2a400', bad: '#d6335c' };
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" style="width:100%;height:auto;background:#fff;border:1px solid var(--line);border-radius:14px">`;
    for (let v = 0; v <= max; v += 50) s += `<line x1="${x0}" x2="${W - 8}" y1="${y(v)}" y2="${y(v)}" stroke="#eef1f7"/><text x="${x0 - 6}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="#5b6785">${v}</text>`;
    rows.forEach((r, i) => { if (r[1] == null) { s += `<text x="${x0 + i * bw + bw / 2}" y="${y0 - 6}" font-size="11" text-anchor="middle" fill="#5b6785">n. v.</text>`; } else { const [k] = cls(r[1]); const me = r[0] === 'Yo';
      s += `<rect x="${x0 + i * bw + bw * .18}" y="${y(r[1])}" width="${bw * .64}" height="${y0 - y(r[1])}" rx="5" fill="${col[k]}" ${me ? 'stroke="#ff5c8a" stroke-width="3"' : ''}/><text x="${x0 + i * bw + bw / 2}" y="${y(r[1]) - 6}" font-size="11" font-weight="700" text-anchor="middle" fill="#0a1530">${Math.round(r[1])}</text>`; }
      s += `<text x="${x0 + i * bw + bw / 2}" y="${y0 + 18}" font-size="12" text-anchor="middle" font-weight="${r[0] === 'Yo' ? 800 : 500}" fill="${r[0] === 'Yo' ? '#d6335c' : '#0a1530'}">${r[0]}</text>`; });
    lines.forEach(([v, t, c]) => { s += `<line x1="${x0}" x2="${W - 8}" y1="${y(v)}" y2="${y(v)}" stroke="${c}" stroke-dasharray="6 5" stroke-width="2"/><text x="${W - 10}" y="${y(v) - 5}" font-size="11" text-anchor="end" fill="${c}" font-weight="700">${t}</text>`; });
    return s + '</svg>';
  }
  function resultados(p) {
    const R = p.resultados, f = (a, st) => a > 0 ? a / st * 200 : null;
    const tg = R.tg.datos.map(([n, a]) => [n, a, f(a, R.tg.estandar)]), ct = R.ct.datos.map(([n, a]) => [n, a, f(a, R.ct.estandar)]);
    const tbl = (rows, cls, extra) => `<table class="t"><tr><th>Muestra</th><th>A</th><th>mg/dL</th>${extra ? '<th>VLDL</th>' : ''}<th>Clasificación</th></tr>${rows.map(([n, a, v]) => { const k = v == null ? ['na', 'No válida'] : cls(v);
      return `<tr class="${n === 'Yo' ? 'me' : ''}"><td>${n === 'Yo' ? 'Mi muestra' : n}</td><td>${a.toFixed(3).replace('.', ',').replace('-', '−')}</td><td>${v == null ? '—' : v.toFixed(2).replace('.', ',')}</td>${extra ? `<td>${v == null ? '—' : (v / 5).toFixed(1).replace('.', ',')}</td>` : ''}<td><span class="tag ${k[0]}">${k[1]}</span></td></tr>`; }).join('')}</table>`;
    return `<div class="sec-head"><div><span class="kicker">Resultados</span><h2>Lo que obtuvimos</h2><p class="lead">Datos anonimizados (V1, V2…). Estándar de 200 mg/dL; la VLDL se estima como TG/5. Valores con fines académicos, no diagnósticos.</p></div></div>
      <div class="grid g2"><div class="card pad"><h3 style="margin-top:0;color:var(--navy)">Experimento 1 · Triglicéridos</h3>${barsSVG(tg.map(r => [r[0], r[2]]), 350, [[150, 'límite 150', '#e2a400'], [200, 'alto 200', '#d6335c']], clsTG)}<div style="margin-top:12px;overflow:auto">${tbl(tg, clsTG, true)}</div></div>
      <div class="card pad"><h3 style="margin-top:0;color:var(--navy)">Experimento 2 · Colesterol total</h3>${barsSVG(ct.map(r => [r[0], r[2]]), 300, [[200, 'límite 200', '#e2a400'], [240, 'muy alto 240', '#d6335c']], clsCT)}<div style="margin-top:12px;overflow:auto">${tbl(ct, clsCT, false)}</div></div></div>
      <div class="box"><b>Lectura rápida:</b> 7 de 11 sueros tuvieron TG óptimos y 8 de 10 colesteroles válidos fueron óptimos. Nadie tuvo ambos valores altos: las alteraciones fueron aisladas. Una lectura de colesterol fue negativa (−0,025) por error de pipeteo y se descartó.</div>`;
  }

  /* ---------- simulador de perfil lipídico ---------- */
  function simLipidos(el, p) {
    let modo = 'tg';
    const cfg = { tg: { st: 0.143, nm: '505 nm', nombre: 'Triglicéridos', metodo: 'GPO-PAP', max: 0.45, zonas: [[150, '#2e9e6b', 'Óptimo'], [200, '#e2a400', 'Límite'], [500, '#d6335c', 'Alto'], [600, '#8b1538', 'Muy alto']], cls: clsTG, mmol: 0.01129 },
      ct: { st: 0.362, nm: '546 nm', nombre: 'Colesterol total', metodo: 'CHOD-PAP', max: 0.6, zonas: [[200, '#2e9e6b', 'Óptimo'], [240, '#e2a400', 'Límite'], [400, '#d6335c', 'Muy alto']], cls: clsCT, mmol: 0.02586 } };
    el.innerHTML = `<div class="sim"><div class="card pad">
      <div class="seg" id="sm"><button data-m="tg" class="on">Triglicéridos</button><button data-m="ct">Colesterol total</button></div>
      <label for="ast">Absorbancia del estándar (200 mg/dL)</label><input class="num" id="ast" type="number" step="0.001" min="0.01">
      <label for="am">Absorbancia de la muestra: <b id="amv"></b></label><input id="am" type="range" min="0" max="0.6" step="0.001">
      <label>Valores de la práctica</label><div class="row" id="pres"></div>
      <div class="box" id="exp" style="margin-top:16px"></div></div>
      <div class="out"><div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#9fb4de;font-weight:800" id="ot"></div>
        <div class="tubes" id="tubes"></div>
        <div><span class="big" id="cv"></span> <span class="unit">mg/dL</span> &nbsp; <span class="unit" id="mm"></span></div>
        <div id="vl" class="unit" style="margin-top:4px"></div>
        <div class="scale-wrap"><div class="scale" id="sc"></div><div class="marker" id="mk"></div></div><div class="legend" id="lg"></div>
        <div style="margin-top:12px"><span class="tag" id="cl"></span></div>
        <div class="calc" id="calc"></div></div></div>`;
    const tube = (fill, lab) => `<figure><svg width="58" height="150" viewBox="0 0 58 150"><defs><linearGradient id="g${lab}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".45" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
      <path d="M9 6 h40 v112 a20 20 0 0 1 -40 0z" fill="${fill}"/><path d="M9 6 h40 v112 a20 20 0 0 1 -40 0z" fill="url(#g${lab})"/><rect x="9" y="6" width="40" height="52" fill="#06102a"/>
      <path d="M9 6 h40 v112 a20 20 0 0 1 -40 0z" fill="none" stroke="#e8e2d3" stroke-width="3"/><line x1="41" y1="64" x2="41" y2="120" stroke="#fff" stroke-opacity=".6" stroke-width="3"/></svg><figcaption>${lab}</figcaption></figure>`;
    const mix = (a, b, t) => '#' + [0, 2, 4].map(i => Math.round(parseInt(a.substr(i, 2), 16) * (1 - t) + parseInt(b.substr(i, 2), 16) * t).toString(16).padStart(2, '0')).join('');
    const pres = () => { const d = p.resultados[modo]; $('#pres').innerHTML = d.datos.filter(x => x[1] > 0).map(([n, a]) => `<button class="pill" data-a="${a}">${n === 'Yo' ? 'Mi muestra' : n}</button>`).join(''); };
    const upd = () => {
      const k = cfg[modo], st = parseFloat($('#ast').value) || k.st, a = parseFloat($('#am').value);
      const c = a / st * 200, [cls, lab] = k.cls(c), maxC = k.zonas[k.zonas.length - 1][0];
      $('#amv').textContent = a.toFixed(3).replace('.', ',');
      $('#ot').textContent = `${k.nombre} · ${k.metodo} · lectura a ${k.nm}`;
      $('#cv').textContent = c.toFixed(1).replace('.', ','); $('#mm').textContent = `· ${(c * k.mmol).toFixed(2).replace('.', ',')} mmol/L`;
      $('#vl').textContent = modo === 'tg' ? `VLDL estimada = TG/5 = ${(c / 5).toFixed(1).replace('.', ',')} mg/dL ${c / 5 > 30 ? '(> 30: perjudicial)' : '(2–30: óptimo)'}` : '';
      const tStd = Math.min(1, st / 0.5), tM = Math.min(1, a / 0.5);
      $('#tubes').innerHTML = tube('#f6ebc0', 'Blanco') + tube(mix('f6ebc0', 'd94a7a', tStd), 'Estándar') + tube(mix('f6ebc0', 'd94a7a', tM), 'Muestra');
      let prev = 0; $('#sc').innerHTML = k.zonas.map(([lim, col]) => { const w = (lim - prev) / maxC * 100; prev = lim; return `<i style="width:${w}%;background:${col}"></i>`; }).join('');
      $('#lg').innerHTML = '<span>0</span>' + k.zonas.map(z => `<span>${z[0]}</span>`).join('');
      $('#mk').style.left = `calc(${Math.min(100, c / maxC * 100)}% - 2px)`;
      const cl = $('#cl'); cl.className = 'tag ' + cls; cl.textContent = lab;
      $('#calc').innerHTML = `C = (${a.toFixed(3)} / ${st.toFixed(3)}) × 200 = ${c.toFixed(2)} mg/dL`.replace(/\./g, ',');
      $('#exp').innerHTML = `<b>¿Qué pasa?</b> A más ${modo === 'tg' ? 'triglicéridos' : 'colesterol'}, se forma más H₂O₂ y más <b>quinonimina</b>: el tubo se ve más rosado y absorbe más luz. Como estándar y muestra se leen igual, basta la proporción entre sus absorbancias.`;
    };
    const setModo = m => { modo = m; $('#ast').value = cfg[m].st; $('#am').max = cfg[m].max; $('#am').value = p.resultados[m].datos.find(x => x[0] === 'Yo')[1]; [...$('#sm').children].forEach(b => b.classList.toggle('on', b.dataset.m === m)); pres(); upd(); };
    $('#sm').onclick = e => { const b = e.target.closest('button'); if (b) setModo(b.dataset.m); };
    $('#pres').onclick = e => { const b = e.target.closest('button'); if (b) { $('#am').value = b.dataset.a; upd(); } };
    $('#am').oninput = upd; $('#ast').oninput = upd; setModo('tg');
  }

  /* ---------- casos clínicos ---------- */
  function casos(el, L, key) {
    const st = store.get(key, {});
    const draw = () => {
      const ok = Object.values(st).filter(x => x === true).length;
      el.innerHTML = `<div class="card pad" style="margin-bottom:14px"><div class="row" style="justify-content:space-between"><b style="color:var(--navy)">Tu avance: ${ok}/${L.length} correctas</b><button class="btn g" id="rs">↻ Reiniciar</button></div><div class="progress" style="margin-top:10px"><i style="width:${Object.keys(st).length / L.length * 100}%"></i></div></div>` +
        L.map((c, i) => `<div class="card case" style="margin-bottom:14px"><span class="badge pink">Caso ${String(i + 1).padStart(2, '0')} · ${esc(c.tema)}</span><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p><p><b>${esc(c.pregunta)}</b></p>
          ${c.opciones.map((o, j) => `<button class="opt ${i in st ? (j === c.correcta ? 'ok' : (st[i] === false && st['s' + i] === j ? 'bad' : '')) : ''}" data-i="${i}" data-j="${j}" ${i in st ? 'disabled' : ''}>${String.fromCharCode(65 + j)}. ${esc(o)}</button>`).join('')}
          <div class="exp box ${i in st ? 'on' : ''}">${esc(c.explicacion)}</div></div>`).join('');
      $('#rs', el).onclick = () => { Object.keys(st).forEach(k => delete st[k]); store.set(key, st); draw(); };
    };
    el.onclick = e => { const b = e.target.closest('.opt'); if (!b || b.disabled) return; const i = +b.dataset.i, j = +b.dataset.j; st[i] = j === L[i].correcta; st['s' + i] = j; store.set(key, st); draw(); };
    draw();
  }

  /* ---------- flashcards ---------- */
  function flashcards(el, L, key) {
    let i = 0; const dom = store.get(key, []);
    const draw = () => {
      const [cat, q, a] = L[i];
      el.innerHTML = `<div class="grid g2"><div><div class="fc" id="fc"><div class="fc-in"><div class="fc-f"><small>${esc(cat)} · ${i + 1}/${L.length}</small><h3>${esc(q)}</h3><p style="color:#bcd0f5;margin-top:auto;font-size:13px">Toca para ver la respuesta</p></div>
        <div class="fc-b"><small>Respuesta</small><h3 style="font-size:19px;color:var(--navy)">${esc(a)}</h3></div></div></div>
        <div class="row"><button class="btn g" id="pv">← Anterior</button><button class="btn n" id="fl">Voltear</button><button class="btn g" id="nx">Siguiente →</button><button class="btn ${dom.includes(i) ? 'g' : 'p'}" id="dm">${dom.includes(i) ? '✓ Dominada' : 'Marcar dominada'}</button></div></div>
        <div class="card pad"><b style="color:var(--navy)">Panel de repaso</b><p style="font-size:32px;font-weight:800;margin:6px 0;color:var(--navy)">${dom.length}/${L.length}</p><div class="progress"><i style="width:${dom.length / L.length * 100}%"></i></div>
        <p class="lead" style="font-size:14px">Tarjetas dominadas en este navegador.</p><button class="btn g" id="rz">↻ Reiniciar progreso</button></div></div>`;
      $('#fc', el).onclick = $('#fl', el).onclick = () => $('#fc', el).classList.toggle('flip');
      $('#pv', el).onclick = () => { i = (i - 1 + L.length) % L.length; draw(); };
      $('#nx', el).onclick = () => { i = (i + 1) % L.length; draw(); };
      $('#dm', el).onclick = () => { const k = dom.indexOf(i); k < 0 ? dom.push(i) : dom.splice(k, 1); store.set(key, dom); draw(); };
      $('#rz', el).onclick = () => { dom.length = 0; store.set(key, dom); draw(); };
    };
    draw();
  }

  function lightbox() {
    const lb = h('<div class="lb" role="dialog" aria-label="Imagen ampliada"><div><img alt=""><p></p></div></div>').firstChild; document.body.append(lb);
    document.addEventListener('click', e => { const t = e.target.closest('[data-lb]'); if (t) { const src = t.dataset.src || t.src; lb.querySelector('img').src = src; lb.querySelector('p').textContent = t.querySelector?.('figcaption')?.textContent || ''; lb.classList.add('on'); } else if (e.target.closest('.lb')) lb.classList.remove('on'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });
  }

  /* ---------- REPASO GLOBAL ---------- */
  function repaso() {
    chrome('repaso');
    const temas = P.practicas.filter(p => C.flashcards[p.flashcards] || C.casos[p.casos]);
    $('#main').append(h(`<section><div class="wrap"><div class="sec-head"><div><span class="kicker">Repaso activo</span><h2>Flashcards y casos de todas las prácticas</h2></div></div>
      <div class="filters" id="rt">${temas.map((p, k) => `<button class="pill ${k ? '' : 'on'}" data-id="${p.id}">${esc(curso(p.curso).nombre)} · P${String(p.numero).padStart(2, '0')} ${esc(p.titulo)}</button>`).join('')}</div>
      <h3 style="color:var(--navy)">Flashcards</h3><div id="fc-box"></div><h3 style="color:var(--navy);margin-top:30px">Casos clínicos</h3><div id="casos-box"></div></div></section>`));
    const go = id => { const p = P.practicas.find(x => x.id === id); if (C.flashcards[p.flashcards]) flashcards($('#fc-box'), C.flashcards[p.flashcards], 'fc-' + p.id); else $('#fc-box').innerHTML = '<div class="card empty">Sin flashcards.</div>';
      if (C.casos[p.casos]) casos($('#casos-box'), C.casos[p.casos], 'casos-' + p.id); else $('#casos-box').innerHTML = '<div class="card empty">Sin casos.</div>'; };
    $('#rt').onclick = e => { const b = e.target.closest('button'); if (!b) return; [...$('#rt').children].forEach(x => x.classList.toggle('on', x === b)); go(b.dataset.id); };
    if (temas[0]) go(temas[0].id);
  }

  /* ---------- REGISTRAR ---------- */
  function registrar() {
    chrome('registrar');
    $('#main').append(h(`<section><div class="wrap"><div class="sec-head"><div><span class="kicker">Registrar material</span><h2>Agregar algo nuevo al portafolio</h2>
      <p class="lead">Llena el formulario y copia el resultado. Luego, en GitHub, abre <b>data/catalogo.js</b>, pega la entrada dentro de la lista <b>materiales</b> (después de la última, con una coma) y guarda con <b>Commit changes</b>. Si es un archivo (Word, PDF…), súbelo antes a la carpeta <b>material/</b>.</p></div></div>
      <div class="grid g2"><form class="card pad form" id="fm">
        <div class="full"><label for="ti">Título</label><input id="ti" required placeholder="Informe P09 · Perfil lipídico II"></div>
        <div><label for="cu">Curso</label><select id="cu">${P.cursos.map(c => `<option value="${c.id}">${esc(c.nombre)}</option>`).join('')}</select></div>
        <div><label for="tp">Tipo</label><select id="tp">${Object.keys(TIPOS).map(t => `<option>${t}</option>`).join('')}</select></div>
        <div><label for="pr">Práctica (opcional)</label><select id="pr"><option value="">—</option>${P.practicas.map(p => `<option value="${p.id}">${esc(p.id)} · ${esc(p.titulo)}</option>`).join('')}</select></div>
        <div><label for="fe">Fecha</label><input id="fe" type="date"></div>
        <div class="full"><label for="ur">Archivo o enlace</label><input id="ur" placeholder="material/bioquimica/p09/informe.docx  ·  https://youtu.be/…  ·  https://www.canva.com/…"></div>
        <div class="full"><label for="de">Descripción</label><textarea id="de" rows="2" placeholder="Breve descripción"></textarea></div>
      </form>
      <div class="card pad"><b style="color:var(--navy)">Entrada para pegar en catalogo.js</b><pre class="code" id="out"></pre><button class="btn p" id="cp">Copiar</button> <span id="okc" style="color:var(--ok);font-weight:700"></span></div></div>
      <div class="box" style="margin-top:20px"><b>¿Una práctica nueva completa?</b> Envía la guía y el material a Claude: te devolverá la entrada de la práctica (con simulador, esquemas, casos y flashcards) y los archivos para subir.</div></div></section>`));
    $('#fe').value = new Date().toISOString().slice(0, 10);
    const gen = () => { const o = { titulo: $('#ti').value, curso: $('#cu').value, practica: $('#pr').value || undefined, tipo: $('#tp').value, fecha: $('#fe').value, url: $('#ur').value, descripcion: $('#de').value };
      Object.keys(o).forEach(k => o[k] === undefined && delete o[k]); $('#out').textContent = JSON.stringify(o, null, 2) + ','; };
    $('#fm').oninput = gen; gen();
    $('#cp').onclick = () => navigator.clipboard.writeText($('#out').textContent).then(() => { $('#okc').textContent = '¡Copiado!'; setTimeout(() => $('#okc').textContent = '', 1800); });
  }

  const page = document.body.dataset.page;
  ({ inicio, curso: cursoPage, biblioteca, practica, repaso, registrar })[page]?.();
})();
