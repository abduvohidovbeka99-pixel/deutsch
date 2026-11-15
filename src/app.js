(function () {
  const LEVELS = window.LEVELS;
  const GRAMMAR = window.GRAMMAR || {};
  const app = document.getElementById('app');

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const learned = new Set(store.get('ww-learned', []));
  const doneGrammar = new Set(store.get('ww-grammar', []));
  const prefs = Object.assign({ mode: 'list', dir: 'de', filter: 'all', theme: 'system', goal: 30, revMode: 'cards', rate: 0.9, autoSpeak: true, qCount: 10, bigRead: false }, store.get('ww-prefs', {}));
  const savePrefs = () => store.set('ww-prefs', prefs);
  const saveLearned = () => store.set('ww-learned', [...learned]);

  // ---------- data ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ALL = [];
  LEVELS.forEach(L => {
    L.sections.forEach((s, si) => {
      s.words = s.w.split('\n').map(x => x.trim()).filter(Boolean).map(line => {
        const i = line.indexOf('=');
        const de = line.slice(0, i).trim(), ru = line.slice(i + 1).trim();
        let main = de, pl = '';
        const c = de.indexOf(', ');
        if (/^(der|die|das) /.test(de) && c > 0) { main = de.slice(0, c); pl = de.slice(c + 2); }
        const m = main.match(/^(der|die|das) (.+)$/);
        const art = m ? m[1] : '', base = m ? m[2] : main;
        const w = { id: L.id + '|' + de + '|' + ru, de, ru, art, base, pl, lvl: L.id, si, pos: classifyWord(de, ru, art, base, s.d), plOnly: isPluralOnly(art, base) };
        ALL.push(w);
        return w;
      });
    });
  });
  const lvlById = id => LEVELS.find(l => l.id === id);
  const countLearned = list => list.reduce((n, w) => n + (learned.has(w.id) ? 1 : 0), 0);
  const levelWords = L => L.sections.flatMap(s => s.words);

  // ---------- helpers ----------
  const icon = {
    speak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>'
  };
  const wordHtml = w => (w.art ? `<span class="art-${w.art}">${w.art}</span> ` : '') + esc(w.base) + (w.pl ? `<span class="pl">мн. ${esc(w.pl)}</span>` : '');
  const wordPlain = w => (w.art ? w.art + ' ' : '') + w.base;
  const bar = p => `<div class="bar"><i style="width:${p}%"></i></div>`;
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const plural = (n, one, few, many) => { const m10 = n % 10, m100 = n % 100; if (m10 === 1 && m100 !== 11) return one; if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few; return many; };

  let voice = null;
  function pickVoice() { try { voice = speechSynthesis.getVoices().find(v => /^de/i.test(v.lang)) || null; } catch (e) {} }
  try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch (e) {}
  function speak(text) {
    try {
      const t = text.replace(/\(.*?\)/g, '').replace(/,.*$/, '').trim();
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = 'de-DE'; u.rate = prefs.rate; if (voice) u.voice = voice;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  const NAV_TITLES = { home: 'Уровни', review: 'Повторение', grammar: 'Грамматика', texts: 'Тексты', gender: 'Артикли', settings: 'Профиль', search: 'Поиск' };
  function setNav(which) {
    ['home', 'review', 'gender', 'grammar', 'texts', 'settings', 'search'].forEach(k => {
      const el = document.getElementById('nav-' + k);
      if (el) { el.classList.toggle('on', which === k); if (which === k) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current'); }
    });
    const tt = document.getElementById('top-title');
    if (tt) tt.textContent = location.hash && location.hash !== '#' ? (NAV_TITLES[which] || '') : '';
  }

  // ---------- тема ----------
  const UI = {
    levels: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h5v-5h5v-5h5V5h3"/><path d="M3 20h18"/></svg>',
    grammar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5h-6A1.5 1.5 0 0 1 2 16z"/><path d="M22 5.5A1.5 1.5 0 0 0 20.5 4H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5h6a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
    texts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
    articles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5 5 5.8 5 11a5 5 0 0 1-10 0c0-2.4 1.2-4 2.5-5.2.2 1.7 1 2.7 2 3.2C11 8 10.8 5 12 2z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>'
  };
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = UI[el.dataset.icon] || ''; });
  document.getElementById('nav-search').innerHTML = UI.search;
  const isDark = () => prefs.theme === 'dark' || (prefs.theme === 'system' && (document.documentElement.getAttribute('data-theme') === 'dark' || (document.documentElement.getAttribute('data-theme') !== 'light' && !(window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches))));
  let installEvt = null;
  const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (location.hash === '#settings') viewSettings(); });
  window.addEventListener('appinstalled', () => { installEvt = null; toast(`${UI.bolt}<span><b>Приложение установлено</b></span>`); });
  if (window.WW_PWA && 'serviceWorker' in navigator && /^https:|^http:\/\/localhost/.test(location.href)) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
  }
  function applyTheme() {
    const root = document.documentElement;
    if (prefs.theme === 'light' || prefs.theme === 'dark') root.setAttribute('data-app-theme', prefs.theme);
    else root.removeAttribute('data-app-theme');
    document.body.classList.toggle('big-read', !!prefs.bigRead);
    const tc = document.querySelector('meta[name="theme-color"]:not([media])');
    if (tc) tc.setAttribute('content', isDark() ? '#0b0e22' : '#f3f1fb');
    const q = document.getElementById('theme-quick');
    if (q) { q.innerHTML = isDark() ? UI.sun : UI.moon; q.title = isDark() ? 'Включить дневную тему' : 'Включить ночную тему'; q.setAttribute('aria-label', q.title); }
  }
  applyTheme();
  try { matchMedia('(prefers-color-scheme: light)').addEventListener('change', applyTheme); } catch (e) {}
  document.getElementById('theme-quick').onclick = () => {
    prefs.theme = isDark() ? 'light' : 'dark'; savePrefs(); applyTheme();
    if (location.hash === '#settings') viewSettings();
  };
  const GENDERS = [
    { k: 'der', name: 'Мужской род' }, { k: 'die', name: 'Женский род' }, { k: 'das', name: 'Средний род' }, { k: 'pl', name: 'Только множественное число' }
  ];
  function groupedList(words, showLvl) {
    return POS_ORDER.map(p => {
      const g = words.filter(w => w.pos === p);
      if (!g.length) return '';
      return `<section class="pos-group" id="g-${p}"><div class="pos-head"><h3>${POS_NAMES[p]}</h3><span class="count">${g.length}</span></div><div class="words">${g.map(w => wordRow(w, showLvl)).join('')}</div></section>`;
    }).join('');
  }
  function posChips(words) {
    return `<div class="chips">${POS_ORDER.map(p => { const n = words.filter(w => w.pos === p).length; return n ? `<button class="chip" data-jump="g-${p}">${POS_NAMES[p]} <span class="count">${n}</span></button>` : ''; }).join('')}</div>`;
  }
  app.addEventListener('click', e => {
    const j = e.target.closest('[data-jump]');
    if (j) { const t = document.getElementById(j.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });

  // ---------- views ----------
  function viewHome() {
    setNav('home');
    const total = ALL.length, done = countLearned(ALL);
    const gTotal = Object.values(GRAMMAR).reduce((n, a) => n + a.length, 0);
    const tTotal = Object.values(TEXTS).reduce((n, a) => n + a.length, 0);
    const tDone = Object.values(textScores).filter(v => v >= 80).length;
    const h = new Date().getHours();
    const hello = h < 11 ? 'Guten Morgen!' : h < 18 ? 'Guten Tag!' : 'Guten Abend!';
    const last = store.get('ww-last', null);
    let cont = '';
    if (last) {
      const L = lvlById(last.lvl);
      const title = L && (last.kind === 'v' ? L.sections[last.i]?.t : last.kind === 'x' ? (TEXTS[last.lvl] || [])[last.i]?.t : (GRAMMAR[last.lvl] || [])[last.i]?.t);
      const kindName = last.kind === 'v' ? 'Словарь' : last.kind === 'x' ? 'Текст' : 'Грамматика';
      const href = last.kind === 'v' ? 'vocab' : last.kind === 'x' ? 'text' : 'gram';
      if (title) cont = `<a class="card continue-card" href="#${href}-${last.lvl}-${last.i}" style="text-decoration:none"><div class="eyebrow">Продолжить · ${last.lvl} · ${kindName}</div><div style="font-weight:800;font-size:19px">${esc(title)}</div><span class="btn primary" style="align-self:flex-start">Открыть →</span></a>`;
    }
    if (!cont) cont = `<a class="card" href="#level-A0" style="text-decoration:none"><div class="eyebrow">С чего начать</div><div style="font-weight:800;font-size:19px">Уровень A0 · Старт</div><span class="muted" style="font-size:14px">Приветствия, числа, семья и первые глаголы.</span><span class="btn primary" style="align-self:flex-start">Начать →</span></a>`;
    const day = Math.floor(Date.now() / 864e5);
    const pool = ALL.filter(w => w.pos === 'noun' || w.pos === 'verb' || w.pos === 'adj');
    const wod = pool[(day * 7919) % pool.length];
    const si = lvlById(wod.lvl).sections[wod.si];
    app.innerHTML = `
      <section class="hero">
        <div class="eyebrow">A0 → A1 → A2 → B1 → B2 → C1</div>
        <h1>${hello}</h1>
        <p class="lead">Учите слова по уровням, разбирайте грамматику и читайте тексты с тестами на понимание.</p>
        <div class="card overall" style="margin-top:6px">
          <div class="row" style="justify-content:space-between"><b>Общий прогресс словаря</b><span class="pct">${done} из ${total} · ${pct(done, total)}%</span></div>
          ${bar(pct(done, total))}
          <div class="stats" style="margin-top:6px">
            <div class="stat"><b>${done}</b><span>слов выучено</span></div>
            <div class="stat"><b>${doneGrammar.size}<small class="muted" style="font-size:14px"> / ${gTotal}</small></b><span>тем грамматики</span></div>
            <div class="stat"><b>${tDone}<small class="muted" style="font-size:14px"> / ${tTotal}</small></b><span>текстов прочитано</span></div>
          </div>
        </div>
      </section>
      <div class="home-grid">
        ${(() => { const n = dueWords().length, inS = Object.keys(srs).length; return `<a class="card due-home" href="#review" style="text-decoration:none"><div class="row" style="justify-content:space-between"><span class="eyebrow">Повторение</span><span class="qi-sm">${UI.review}</span></div><div class="row" style="align-items:baseline;gap:10px"><span class="big-num">${n}</span><span class="muted">${n ? plural(n, 'слово ждёт', 'слова ждут', 'слов ждут') : inS ? 'на сегодня всё повторено' : 'начните учить новые слова'}</span></div><span class="btn ${n ? 'primary' : ''}" style="align-self:flex-start">${n ? 'Повторить →' : 'Открыть →'}</span></a>`; })()}
        ${cont}
        <div class="card">
          <div class="row" style="justify-content:space-between"><span class="eyebrow">Слово дня</span><span class="lvl-tag" style="margin:0">${wod.lvl}</span></div>
          <div class="row" style="flex-wrap:nowrap;gap:12px"><button class="ico" data-speak="${esc(wordPlain(wod))}" aria-label="Произнести">${icon.speak}</button><div class="wod-word">${wordHtml(wod)}</div></div>
          <div class="muted">${esc(wod.ru)}</div>
          <a class="btn" style="align-self:flex-start;text-decoration:none" href="#vocab-${wod.lvl}-${wod.si}">Раздел «${esc(si.t)}» →</a>
        </div>
      </div>
      <div class="quick">
        <a class="qa" href="#gender-all" onclick="try{localStorage.setItem('ww-goto-train','1')}catch(e){}"><span class="qi">${UI.articles}</span><span>Тренажёр артиклей<small>der · die · das</small></span></a>
        <a class="qa" href="#grammar-all"><span class="qi">${UI.grammar}</span><span>Грамматика<small>${gTotal} тем с тестами</small></span></a>
        <a class="qa" href="#texts-all"><span class="qi">${UI.texts}</span><span>Тексты<small>${tTotal} текстов</small></span></a>
        <a class="qa" href="#search"><span class="qi">${UI.search}</span><span>Поиск слова<small>${total} слов</small></span></a>
      </div>
      <h2 style="margin-bottom:14px">Уровни</h2>
      <div class="levels">
        ${LEVELS.map(L => {
          const ws = levelWords(L), d = countLearned(ws), g = (GRAMMAR[L.id] || []).length, tx = (TEXTS[L.id] || []).length;
          return `<a class="lvl" href="#level-${L.id}">
            <div class="row" style="justify-content:space-between"><span class="lvl-code">${L.id}</span><span class="pct">${pct(d, ws.length)}%</span></div>
            <div class="lvl-name">${esc(L.name)}</div>
            <p>${esc(L.desc)}</p>
            <div class="meta">${L.sections.length} разделов · ${ws.length} слов · ${g} тем · ${tx} текстов</div>
            ${bar(pct(d, ws.length))}
          </a>`;
        }).join('')}
      </div>`;
  }

  // ----- настройки -----
  function viewSettings() {
    setNav('settings');
    const tTotal = Object.values(TEXTS).reduce((n, a) => n + a.length, 0);
    const gTotal = Object.values(GRAMMAR).reduce((n, a) => n + a.length, 0);
    let hasVoice = false; try { hasVoice = !!voice; } catch (e) {}
    const themeOpt = (k, name, ic, prevBg, prevBar) => `<button class="theme-opt ${prefs.theme === k ? 'on' : ''}" data-theme-set="${k}" aria-pressed="${prefs.theme === k}"><span class="theme-prev" style="background:${prevBg}"><span style="background:${prevBar}"></span></span>${UI[ic]}${name}</button>`;
    const seg = (key, opts) => `<div class="seg">${opts.map(([v, n]) => `<button data-set="${key}" data-val="${v}" class="${String(prefs[key]) === String(v) ? 'on' : ''}">${n}</button>`).join('')}</div>`;
    const sw = (key, id) => `<label class="switch"><input type="checkbox" id="${id}" data-toggle="${key}" ${prefs[key] ? 'checked' : ''}><i></i></label>`;
    app.innerHTML = `<div class="stack" style="gap:6px;margin-bottom:20px"><div class="eyebrow">Ваш прогресс и настройки</div><h1 style="font-size:clamp(26px,4.5vw,38px)">Профиль</h1></div>
      ${profileStats()}
      <section class="set-group"><h2>Цель дня</h2>
        <div class="set-card"><div class="set-row"><div class="lbl"><b>Сколько XP в день</b><span>XP дают ответы в тестах, карточках, письме, грамматике и текстах. Серия растёт, если вы занимались хотя бы немного.</span></div>${seg('goal', [[10, 'Лёгкая 10'], [30, 'Обычная 30'], [50, 'Серьёзная 50'], [100, 'Интенсив 100']])}</div></div>
      </section>
      <section class="set-group"><h2>Оформление</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>Тема</b><span>Ночная, дневная или как в системе устройства</span></div></div>
          <div class="theme-opts">
            ${themeOpt('dark', 'Ночная', 'moon', '#0b0e22', '#8f63ff')}
            ${themeOpt('light', 'Дневная', 'sun', '#f3f1fb', '#7446ef')}
            ${themeOpt('system', 'Системная', 'system', 'linear-gradient(90deg,#0b0e22 50%,#f3f1fb 50%)', '#8f63ff')}
          </div>
          <div class="set-row"><div class="lbl"><b>Крупный шрифт в текстах</b><span>Увеличивает текст на странице чтения</span></div>${sw('bigRead', 'set-bigread')}</div>
        </div>
      </section>
      <section class="set-group"><h2>Озвучка</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>Скорость речи</b><span>${hasVoice ? 'Немецкий голос найден' : 'Немецкий голос в этом браузере не найден, озвучка может не работать'}</span></div>${seg('rate', [[0.7, 'Медленно'], [0.9, 'Обычно'], [1.05, 'Быстро']])}</div>
          <div class="set-row"><div class="lbl"><b>Произносить слово в тесте</b><span>Автоматически при показе вопроса DE → RU</span></div>${sw('autoSpeak', 'set-autospeak')}</div>
          <div class="set-row"><div class="lbl"><b>Проверить голос</b><span>«Guten Tag! Willkommen bei Wortweg.»</span></div><button class="btn" id="voice-test">${icon.speak.replace('<svg', '<svg style="width:15px;height:15px;vertical-align:-2px;margin-right:6px"')}Прослушать</button></div>
        </div>
      </section>
      <section class="set-group"><h2>Обучение</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>Вопросов в тесте по словам</b><span>Сколько слов спрашивать за один тест</span></div>${seg('qCount', [[10, '10'], [20, '20'], [30, '30']])}</div>
          <div class="set-row"><div class="lbl"><b>Направление по умолчанию</b><span>Для карточек и тестов</span></div>${seg('dir', [['de', 'DE → RU'], ['ru', 'RU → DE']])}</div>
        </div>
      </section>
      <section class="set-group"><h2>Прогресс</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>Выученные слова: ${learned.size}</b><span>Отметки во всех разделах словаря</span></div><button class="btn danger" data-reset="words">Сбросить</button></div>
          <div class="set-row"><div class="lbl"><b>Пройденные темы: ${doneGrammar.size} из ${gTotal}</b><span>Результаты тестов по грамматике</span></div><button class="btn danger" data-reset="grammar">Сбросить</button></div>
          <div class="set-row"><div class="lbl"><b>Повторение и статистика: ${Object.keys(srs).length} слов</b><span>Расписание повторений, ошибки, XP и серия дней</span></div><button class="btn danger" data-reset="srs">Сбросить</button></div>
          <div class="set-row"><div class="lbl"><b>Результаты текстов: ${Object.keys(textScores).length} из ${tTotal}</b><span>Лучшие результаты тестов на понимание</span></div><button class="btn danger" data-reset="texts">Сбросить</button></div>
        </div>
        <p class="muted" style="margin:0;font-size:13px">Прогресс хранится только на этом устройстве. Сохраняйте копию, чтобы перенести его на другое устройство или в установленное приложение.</p>
      </section>
      <section class="set-group"><h2>Перенос прогресса</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>Сохранить копию</b><span>${window.WW_PWA ? 'Скачает файл и скопирует данные в буфер обмена' : 'Скопирует данные в буфер обмена, чтобы вставить их в приложении'}</span></div><button class="btn" id="exp-btn">Сохранить</button></div>
          <div class="set-row"><div class="lbl"><b>Загрузить копию</b><span>Из файла или вставкой текста. Текущий прогресс будет заменён.</span></div><div class="row"><label class="btn" for="imp-file" style="cursor:pointer">Из файла</label><input type="file" id="imp-file" accept=".json,application/json" hidden><button class="btn" id="imp-paste">Вставить текст</button></div></div>
          <div class="set-row" id="io-row" hidden><div class="lbl" style="flex-basis:100%"><textarea id="io-text" class="io-text" spellcheck="false"></textarea><div class="row" style="margin-top:8px"><button class="btn primary" id="imp-apply" hidden>Заменить данные</button><span class="muted" id="io-msg" style="font-size:13px"></span></div></div></div>
        </div>
      </section>
      ${window.WW_PWA ? `<section class="set-group"><h2>Приложение</h2>
        <div class="set-card">
          <div class="set-row"><div class="lbl"><b>${isStandalone() ? 'Приложение установлено' : 'Установить на устройство'}</b><span>${isStandalone() ? 'Работает без интернета, обновляется автоматически' : isIOS() ? 'В Safari: «Поделиться» → «На экран „Домой“»' : 'Иконка на главном экране, запуск без браузера, работа офлайн'}</span></div>${!isStandalone() && installEvt ? '<button class="btn primary" id="install-btn">Установить</button>' : ''}</div>
        </div>
      </section>` : ''}
      <section class="set-group"><h2>О приложении</h2>
        <div class="set-card"><div class="set-row"><div class="lbl"><b>Wortweg Deutsch</b><span>${ALL.length} слов · ${gTotal} тем грамматики · ${tTotal} текстов · уровни A0–C1</span></div></div></div>
      </section>`;
    app.querySelectorAll('[data-theme-set]').forEach(b => b.onclick = () => { prefs.theme = b.dataset.themeSet; savePrefs(); applyTheme(); viewSettings(); });
    app.querySelectorAll('[data-set]').forEach(b => b.onclick = () => { const v = b.dataset.val; prefs[b.dataset.set] = isNaN(+v) ? v : +v; savePrefs(); updateTopStats(); viewSettings(); });
    app.querySelectorAll('[data-toggle]').forEach(c => c.onchange = () => { prefs[c.dataset.toggle] = c.checked; savePrefs(); applyTheme(); });
    document.getElementById('voice-test').onclick = () => speak('Guten Tag! Willkommen bei Wortweg.');
    const ioRow = document.getElementById('io-row'), ioText = document.getElementById('io-text'), ioMsg = document.getElementById('io-msg'), impApply = document.getElementById('imp-apply');
    const dump = () => { const data = {}; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('ww-')) data[k] = localStorage.getItem(k); } } catch (e) {} return JSON.stringify({ app: 'wortweg', version: 1, saved: new Date().toISOString(), data }); };
    const tryParse = txt => { try { const o = JSON.parse(txt); if (o && o.app === 'wortweg' && o.data && typeof o.data === 'object') return o; } catch (e) {} return null; };
    document.getElementById('exp-btn').onclick = () => {
      const txt = dump();
      if (window.WW_PWA) { try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); a.download = 'wortweg-progress-' + new Date().toISOString().slice(0, 10) + '.json'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) {} }
      ioRow.hidden = false; ioText.value = txt; impApply.hidden = true;
      const done = ok => { ioMsg.textContent = ok ? 'Скопировано. Откройте приложение → Профиль → «Вставить текст».' : 'Выделите текст выше и скопируйте его вручную.'; if (!ok) { ioText.focus(); ioText.select(); } };
      try { navigator.clipboard.writeText(txt).then(() => done(true), () => done(false)); } catch (e) { done(false); }
    };
    const preview = txt => {
      const o = tryParse(txt);
      if (!o) { ioMsg.textContent = 'Это не похоже на копию прогресса Wortweg.'; impApply.hidden = true; return; }
      let words = 0, srsN = 0; try { words = JSON.parse(o.data['ww-learned'] || '[]').length; srsN = Object.keys(JSON.parse(o.data['ww-srs'] || '{}')).length; } catch (e) {}
      ioMsg.textContent = `Копия от ${new Date(o.saved).toLocaleDateString('ru-RU')}: выучено ${words} слов, в повторении ${srsN}.`;
      impApply.hidden = false;
      impApply.onclick = () => { try { Object.keys(localStorage).filter(k => k.startsWith('ww-')).forEach(k => localStorage.removeItem(k)); Object.entries(o.data).forEach(([k, v]) => { if (k.startsWith('ww-')) localStorage.setItem(k, v); }); } catch (e) { ioMsg.textContent = 'Не удалось сохранить данные на этом устройстве.'; return; } location.hash = '#settings'; location.reload(); };
    };
    document.getElementById('imp-paste').onclick = () => { ioRow.hidden = false; ioText.value = ''; ioText.placeholder = 'Вставьте сюда скопированный текст'; ioMsg.textContent = ''; impApply.hidden = true; ioText.focus(); };
    ioText.oninput = () => { if (ioText.value.trim()) preview(ioText.value.trim()); };
    document.getElementById('imp-file').onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { ioRow.hidden = false; ioText.value = r.result; preview(String(r.result)); }; r.readAsText(f); };
    const ib = document.getElementById('install-btn');
    if (ib) ib.onclick = async () => { try { installEvt.prompt(); await installEvt.userChoice; } catch (e) {} installEvt = null; viewSettings(); };
    app.querySelectorAll('[data-reset]').forEach(b => b.onclick = () => {
      if (!b.classList.contains('armed')) { b.classList.add('armed'); b.textContent = 'Точно сбросить?'; setTimeout(() => { if (b.isConnected) { b.classList.remove('armed'); b.textContent = 'Сбросить'; } }, 4000); return; }
      const k = b.dataset.reset;
      if (k === 'words') { learned.clear(); saveLearned(); }
      if (k === 'grammar') { doneGrammar.clear(); store.set('ww-grammar', []); }
      if (k === 'srs') { Object.keys(srs).forEach(x => delete srs[x]); saveSrs(); Object.keys(activity).forEach(x => delete activity[x]); store.set('ww-activity', {}); updateTopStats(); }
      if (k === 'texts') { Object.keys(textScores).forEach(x => delete textScores[x]); store.set('ww-texts', {}); }
      viewSettings();
    });
  }

  function levelHead(L, tab) {
    const ws = levelWords(L), g = GRAMMAR[L.id] || [];
    return `<a class="back" href="#">← Все уровни</a>
      <div class="lvl-head"><span class="lvl-code">${L.id}</span><div class="stack" style="gap:6px;min-width:0;flex:1"><h1 style="font-size:clamp(24px,4vw,34px)">${esc(L.name)}</h1><p class="lead" style="font-size:15px">${esc(L.desc)}</p></div></div>
      <div class="tabs"><a href="#level-${L.id}" class="${tab === 'v' ? 'on' : ''}">Темы<span class="count">${L.sections.length}</span></a><a href="#pos-${L.id}" class="${tab === 'p' ? 'on' : ''}">Части речи<span class="count">${ws.length}</span></a><a href="#gender-${L.id}" class="${tab === 'r' ? 'on' : ''}">Род: der · die · das<span class="count">${ws.filter(w => w.pos === 'noun').length}</span></a><a href="#grammar-${L.id}" class="${tab === 'g' ? 'on' : ''}">Грамматика<span class="count">${g.length}</span></a><a href="#texts-${L.id}" class="${tab === 't' ? 'on' : ''}">Тексты<span class="count">${(TEXTS[L.id] || []).length}</span></a></div>`;
  }

  function viewLevel(L) {
    setNav('home');
    app.innerHTML = levelHead(L, 'v') + `<div class="grid">${L.sections.map((s, i) => {
      const d = countLearned(s.words), p = pct(d, s.words.length);
      return `<a class="tile ${p === 100 ? 'done' : ''}" href="#vocab-${L.id}-${i}"><span class="num">Раздел ${i + 1}</span><h3>${esc(s.t)}</h3><span class="sub">${s.words.length} ${plural(s.words.length, 'слово', 'слова', 'слов')} · выучено ${d}</span>${bar(p)}</a>`;
    }).join('')}</div>`;
  }

  // ----- тексты -----
  const TEXTS = window.TEXTS || {};
  const textScores = store.get('ww-texts', {});
  let tFrom = 'lvl';
  const wordCount = x => x.trim().split(/\s+/).length;
  const normAns = v => v.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[.,!?;:"„“‚‘'()«»…–-]/g, ' ').replace(/\s+/g, ' ').trim();
  const answerOk = (u, accepted) => { const U = ' ' + normAns(u) + ' '; return accepted.some(a => { const A = normAns(a); return A && (U.trim() === A || U.includes(' ' + A + ' ')); }); };

  function speakText(text, btn) {
    try {
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); if (btn) btn.classList.remove('on'); return; }
      const parts = text.replace(/\n+/g, ' ').match(/[^.!?…]+[.!?…“"]*\s*/g) || [text];
      parts.forEach((p, i) => {
        const u = new SpeechSynthesisUtterance(p.trim());
        u.lang = 'de-DE'; u.rate = prefs.rate; if (voice) u.voice = voice;
        if (i === parts.length - 1) u.onend = () => btn && btn.classList.remove('on');
        speechSynthesis.speak(u);
      });
      if (btn) btn.classList.add('on');
    } catch (e) {}
  }

  function textRows(L) {
    return (TEXTS[L.id] || []).map((t, i) => {
      const sc = textScores[L.id + '|' + i];
      const done = sc !== undefined && sc >= 80;
      return `<a class="trow ${done ? 'done' : ''}" href="#text-${L.id}-${i}"><span class="tnum">${i + 1}</span><span class="tmain"><b>${esc(t.t)}</b><span>${wordCount(t.x)} слов · ${t.q.length} вопросов</span></span><span class="tstat">${sc === undefined ? 'новый' : sc + '%'}</span></a>`;
    }).join('');
  }

  function viewTextsLevel(L) {
    setNav('home'); tFrom = 'lvl';
    app.innerHTML = levelHead(L, 't') + `<p class="muted" style="margin:0 0 12px">Прочитайте текст, затем ответьте на вопросы. Текст считается прочитанным при результате от 80%.</p><div class="trows">${textRows(L)}</div>`;
  }

  function viewTextsAll() {
    setNav('texts'); tFrom = 'all';
    const sel = prefs.taLvl || 'all';
    const total = Object.values(TEXTS).reduce((n, a) => n + a.length, 0);
    const levels = LEVELS.filter(L => (TEXTS[L.id] || []).length && (sel === 'all' || L.id === sel));
    app.innerHTML = `<div class="stack" style="gap:6px;margin-bottom:18px"><div class="eyebrow">Все уровни · ${total} текстов</div><h1 style="font-size:clamp(24px,4vw,36px)">Тексты и рассказы</h1><p class="lead">Короткие тексты на немецком по уровням. После каждого — тест на понимание: варианты ответа, «верно / неверно» и вопросы, где ответ нужно написать самому.</p></div>
      <div class="chips">${['all', ...LEVELS.filter(L => (TEXTS[L.id] || []).length).map(L => L.id)].map(id => `<button class="chip ${sel === id ? 'on' : ''}" data-talvl="${id}">${id === 'all' ? 'Все уровни' : id}</button>`).join('')}</div>
      <div class="pos-stack">${levels.map(L => {
        const n = TEXTS[L.id].length, d = TEXTS[L.id].filter((t, i) => (textScores[L.id + '|' + i] || 0) >= 80).length;
        return `<section class="pos-group"><div class="pos-head"><span class="glvl">${L.id}</span><h3>${esc(L.name)}</h3><span class="count">${d} / ${n}</span></div><div class="trows">${textRows(L)}</div></section>`;
      }).join('')}</div>`;
    app.querySelectorAll('[data-talvl]').forEach(b => b.onclick = () => { prefs.taLvl = b.dataset.talvl; savePrefs(); viewTextsAll(); });
  }

  function viewText(L, ti) {
    const list = TEXTS[L.id] || [], t = list[ti];
    if (!t) return viewTextsLevel(L);
    setNav(tFrom === 'all' ? 'texts' : 'home');
    try { speechSynthesis.cancel(); } catch (e) {}
    const key = L.id + '|' + ti;
    store.set('ww-last', { lvl: L.id, kind: 'x', i: ti });
    const wc = wordCount(t.x);
    const gl = (t.g || '').split('\n').map(x => x.trim()).filter(Boolean).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; });
    const ruQ = L.id === 'A0' || L.id === 'A1';
    app.innerHTML = `${tFrom === 'all' ? '<a class="back" href="#texts-all">← Все тексты</a>' : `<a class="back" href="#texts-${L.id}">← Тексты ${L.id}</a>`}
      <div class="stack" style="gap:6px;margin-bottom:16px"><div class="eyebrow">${L.id} · Текст ${ti + 1} из ${list.length} · ${wc} слов · ~${Math.max(1, Math.round(wc / 110))} мин</div><h1 style="font-size:clamp(26px,4.5vw,40px)">${esc(t.t)}</h1></div>
      <div class="row" style="margin-bottom:14px"><button class="btn" id="t-listen">${icon.speak.replace('<svg', '<svg style="width:15px;height:15px;vertical-align:-2px;margin-right:6px"')}Слушать</button>${gl.length ? `<button class="btn" id="t-gloss">Словарик (${gl.length})</button>` : ''}</div>
      <div class="gloss" id="gloss" hidden>${gl.map(g => `<div><b>${esc(g[0])}</b><span>${esc(g[1])}</span></div>`).join('')}</div>
      <p class="muted tap-hint">Нажмите на любое слово в тексте, чтобы увидеть перевод.</p><article class="reading" id="reading">${t.x.split(/\n/).filter(p => p.trim()).map(p => `<p>${p.split(/([A-Za-zÄÖÜäöüß]+)/).map((x, i) => i % 2 ? `<span class="tw">${x}</span>` : esc(x)).join('')}</p>`).join('')}</article>
      <section class="rule" style="margin-top:28px"><h3 style="margin-top:0">Проверьте понимание</h3><p class="muted" style="margin:0 0 12px">${ruQ ? 'Вопросы на русском, письменные ответы — по-немецки.' : 'Ответьте на вопросы. Письменные ответы — коротко, одним-двумя словами.'}</p>
        <div class="stack" id="tq">${t.q.map((q, qi) => {
          let body = '';
          if (q[0] === 'c') body = `<div class="opts">${q[2].map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;
          else if (q[0] === 't') body = `<div class="opts tf"><button class="opt" data-k="1">Richtig · верно</button><button class="opt" data-k="0">Falsch · неверно</button></div>`;
          else body = `<div class="in-row"><input class="ans-in" id="ans-${ti}-${qi}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ваш ответ на немецком"><button class="btn primary" data-check>Проверить</button></div>`;
          const label = q[0] === 'c' ? 'Выберите ответ' : q[0] === 't' ? 'Верно или неверно?' : 'Напишите ответ';
          return `<div class="gq" data-qi="${qi}"><div class="qlabel">${label}</div><div class="qt">${qi + 1}. ${esc(q[1])}</div>${body}<div class="why" hidden></div></div>`;
        }).join('')}</div>
        <div class="result" id="t-result" style="margin-top:16px" hidden></div>
      </section>
      <div class="row" style="justify-content:space-between;margin-top:26px">
        ${ti > 0 ? `<a class="btn" href="#text-${L.id}-${ti - 1}" style="text-decoration:none">← ${esc(list[ti - 1].t)}</a>` : '<span></span>'}
        ${ti < list.length - 1 ? `<a class="btn" href="#text-${L.id}-${ti + 1}" style="text-decoration:none">${esc(list[ti + 1].t)} →</a>` : ''}
      </div>`;
    document.getElementById('reading').onclick = e => { const tw = e.target.closest('.tw'); if (tw) { app.querySelectorAll('.tw.sel').forEach(x => x.classList.remove('sel')); tw.classList.add('sel'); wordSheet(tw.textContent); } };
    const lb = document.getElementById('t-listen');
    lb.onclick = () => speakText(t.x, lb);
    const gb = document.getElementById('t-gloss');
    if (gb) gb.onclick = () => { const g = document.getElementById('gloss'); g.hidden = !g.hidden; gb.classList.toggle('on', !g.hidden); };
    let answered = 0, right = 0;
    const finish = () => {
      answered++;
      if (answered < t.q.length) return;
      const p = pct(right, t.q.length);
      const prev = textScores[key];
      if (prev === undefined || p > prev) { textScores[key] = p; store.set('ww-texts', textScores); }
      const r = document.getElementById('t-result');
      r.hidden = false;
      r.innerHTML = `<span class="eyebrow">Результат</span><b>${right} / ${t.q.length}</b><span class="muted">${p >= 80 ? 'Отлично, текст понят! Он отмечен как прочитанный.' : p >= 50 ? 'Неплохо. Перечитайте текст и попробуйте ещё раз.' : 'Перечитайте текст со словариком и пройдите тест снова.'}</span><div class="row" style="justify-content:center"><button class="btn" id="t-again">Пройти заново</button>${ti < list.length - 1 ? `<a class="btn primary" style="text-decoration:none" href="#text-${L.id}-${ti + 1}">Следующий текст →</a>` : ''}</div>`;
      document.getElementById('t-again').onclick = () => { viewText(L, ti); document.getElementById('tq').scrollIntoView({ block: 'start' }); };
    };
    app.querySelectorAll('#tq .gq').forEach(card => {
      const q = t.q[+card.dataset.qi];
      const why = card.querySelector('.why');
      if (q[0] === 'i') {
        const inp = card.querySelector('input'), btn = card.querySelector('[data-check]');
        const check = () => {
          if (!inp.value.trim() || inp.disabled) return;
          const ok = answerOk(inp.value, q[2]);
          if (ok) { right++; addXP(3); }
          inp.disabled = true; btn.disabled = true;
          inp.classList.add(ok ? 'right' : 'wrong');
          why.hidden = false;
          why.innerHTML = ok ? `<span class="ok">Верно!</span>${q[2].length > 1 || normAns(inp.value) !== normAns(q[2][0]) ? ` Ответ: ${esc(q[2][0])}` : ''}` : `<span class="bad">Неверно.</span> Правильный ответ: <b>${esc(q[2][0])}</b>`;
          finish();
        };
        btn.onclick = check;
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
      } else {
        const correct = q[0] === 'c' ? q[3] : q[2];
        card.querySelectorAll('.opt').forEach(b => b.onclick = () => {
          const k = +b.dataset.k;
          card.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.k === correct) x.classList.add('right'); });
          if (k !== correct) b.classList.add('wrong'); else { right++; addXP(3); }
          finish();
        });
      }
    });
  }

  let gFrom = 'lvl';
  function viewGrammarAll() {
    setNav('grammar');
    gFrom = 'all';
    const sel = prefs.gaLvl || 'all';
    const levels = LEVELS.filter(L => (GRAMMAR[L.id] || []).length && (sel === 'all' || L.id === sel));
    const total = LEVELS.reduce((n, L) => n + (GRAMMAR[L.id] || []).length, 0);
    app.innerHTML = `<div class="stack" style="gap:6px;margin-bottom:18px"><div class="eyebrow">Все уровни · ${total} тем</div><h1 style="font-size:clamp(24px,4vw,36px)">Грамматика</h1><p class="lead">Все темы с правилами, таблицами, примерами и мини-тестом. Тема отмечается пройденной, когда тест решён без ошибок. Пройдено: ${doneGrammar.size} из ${total}.</p></div>
      <div class="chips">${['all', ...LEVELS.filter(L => (GRAMMAR[L.id] || []).length).map(L => L.id)].map(id => `<button class="chip ${sel === id ? 'on' : ''}" data-galvl="${id}">${id === 'all' ? 'Все уровни' : id}</button>`).join('')}</div>
      <div class="pos-stack">${levels.map(L => {
        const g = GRAMMAR[L.id], d = g.filter((t, i) => doneGrammar.has(L.id + '|' + i)).length;
        return `<section class="pos-group"><div class="pos-head"><span class="glvl">${L.id}</span><h3>${esc(L.name)}</h3><span class="count">${d} / ${g.length}</span></div>
          <div class="trows">${g.map((t, i) => { const done = doneGrammar.has(L.id + '|' + i); return `<a class="trow ${done ? 'done' : ''}" href="#gram-${L.id}-${i}"><span class="tnum">${i + 1}</span><span class="tmain"><b>${esc(t.t)}</b><span>${esc(t.s || '')}</span></span><span class="tstat">${done ? 'пройдена' : `${(t.q || []).length} вопр.`}</span></a>`; }).join('')}</div></section>`;
      }).join('')}</div>`;
    app.querySelectorAll('[data-galvl]').forEach(b => b.onclick = () => { prefs.gaLvl = b.dataset.galvl; savePrefs(); viewGrammarAll(); });
  }

  function viewGrammarList(L) {
    setNav('home');
    gFrom = 'lvl';
    const g = GRAMMAR[L.id] || [];
    app.innerHTML = levelHead(L, 'g') + `<div class="grid">${g.map((t, i) => {
      const done = doneGrammar.has(L.id + '|' + i);
      return `<a class="tile gtile ${done ? 'done' : ''}" href="#gram-${L.id}-${i}"><span class="num">Тема ${i + 1}${done ? ' · пройдена' : ''}</span><h3>${esc(t.t)}</h3><span class="sub">${esc(t.s || '')}</span></a>`;
    }).join('')}</div>`;
  }

  // ----- section (vocab) -----
  let sess = null;
  function viewSection(L, si) {
    setNav('home');
    const s = L.sections[si];
    store.set('ww-last', { lvl: L.id, kind: 'v', i: si });
    const d = countLearned(s.words);
    app.innerHTML = `<a class="back" href="#level-${L.id}">← ${L.id} · ${esc(L.name)}</a>
      <div class="stack" style="gap:6px"><div class="eyebrow">${L.id} · Раздел ${si + 1} из ${L.sections.length}</div><h1 style="font-size:clamp(24px,4vw,36px)">${esc(s.t)}</h1><p class="muted" style="margin:0" id="sec-count">${s.words.length} ${plural(s.words.length, 'слово', 'слова', 'слов')} · выучено ${d}</p></div>
      <div class="toolbar">
        <div class="seg" role="tablist">
          <button data-mode="list" class="${prefs.mode === 'list' ? 'on' : ''}">Список</button>
          <button data-mode="cards" class="${prefs.mode === 'cards' ? 'on' : ''}">Карточки</button>
          <button data-mode="test" class="${prefs.mode === 'test' ? 'on' : ''}">Тест</button>
          <button data-mode="write" class="${prefs.mode === 'write' ? 'on' : ''}">Письмо</button>
        </div>
        <div class="seg">
          <button data-dir="de" class="${prefs.dir === 'de' ? 'on' : ''}">DE → RU</button>
          <button data-dir="ru" class="${prefs.dir === 'ru' ? 'on' : ''}">RU → DE</button>
        </div>
        <div class="seg">
          <button data-filter="all" class="${prefs.filter === 'all' ? 'on' : ''}">Все</button>
          <button data-filter="new" class="${prefs.filter === 'new' ? 'on' : ''}">Невыученные</button>
        </div>
      </div>
      <div id="mode"></div>
      <div class="row" style="justify-content:space-between;margin-top:26px">
        ${si > 0 ? `<a class="btn" href="#vocab-${L.id}-${si - 1}" style="text-decoration:none">← ${esc(L.sections[si - 1].t)}</a>` : '<span></span>'}
        ${si < L.sections.length - 1 ? `<a class="btn" href="#vocab-${L.id}-${si + 1}" style="text-decoration:none">${esc(L.sections[si + 1].t)} →</a>` : ''}
      </div>`;
    sess = { L, s, si };
    renderMode();
    app.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { prefs.mode = b.dataset.mode; savePrefs(); viewSection(L, si); });
    app.querySelectorAll('[data-dir]').forEach(b => b.onclick = () => { prefs.dir = b.dataset.dir; savePrefs(); viewSection(L, si); });
    app.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { prefs.filter = b.dataset.filter; savePrefs(); viewSection(L, si); });
  }

  function poolFor(s) {
    const list = prefs.filter === 'new' ? s.words.filter(w => !learned.has(w.id)) : s.words;
    return list;
  }

  function updateCount() {
    const el = document.getElementById('sec-count');
    if (el && sess) el.textContent = `${sess.s.words.length} ${plural(sess.s.words.length, 'слово', 'слова', 'слов')} · выучено ${countLearned(sess.s.words)}`;
  }

  function renderMode() {
    const box = document.getElementById('mode');
    const pool = poolFor(sess.s);
    if (!pool.length) { box.innerHTML = `<div class="empty">Все слова этого раздела выучены. Переключите фильтр на «Все», чтобы повторить.</div>`; return; }
    if (prefs.mode === 'list') renderList(box, pool);
    else if (prefs.mode === 'cards') renderCards(box, shuffle(pool), 0, false);
    else if (prefs.mode === 'write') { const go = () => runSession(box, shuffle(pool).slice(0, prefs.qCount), { mode: 'write', title: 'Письмо: ' + sess.s.t, again: go }); go(); }
    else startTest(box, pool, sess.L);
  }

  function wordRow(w, showLvl) {
    const on = learned.has(w.id);
    return `<div class="w ${on ? 'learned' : ''}" data-id="${esc(w.id)}">
      <button class="ico sp" data-speak="${esc(wordPlain(w))}" aria-label="Произнести">${icon.speak}</button>
      <div class="de">${showLvl ? `<span class="lvl-tag">${w.lvl}</span>` : ''}${wordHtml(w)}</div>
      <div class="ru">${esc(w.ru)}</div>
      <button class="ico ck ${on ? 'on' : ''}" data-learn="${esc(w.id)}" aria-label="${on ? 'Снять отметку' : 'Отметить как выученное'}" title="Выучено">${icon.check}</button>
    </div>`;
  }

  function renderList(box, pool) {
    box.innerHTML = `<div class="legend" style="margin-bottom:10px"><span><b class="art-der">der</b> — мужской род</span><span><b class="art-die">die</b> — женский род</span><span><b class="art-das">das</b> — средний род</span></div>
      ${posChips(pool)}
      <div class="pos-stack">${groupedList(pool)}</div>`;
  }

  function viewPos(L) {
    setNav('home');
    const ws = levelWords(L);
    app.innerHTML = levelHead(L, 'p') + `<p class="muted" style="margin:0 0 12px">Все слова уровня ${L.id}, собранные по частям речи. Нажмите на категорию, чтобы перейти к ней.</p>${posChips(ws)}<div class="pos-stack">${groupedList(ws)}</div>`;
  }

  // ----- род: der / die / das -----
  const genderOf = w => w.plOnly ? 'pl' : w.art;
  function viewGender(L) {
    setNav(L ? 'home' : 'gender');
    let words;
    if (L) words = levelWords(L).filter(w => w.pos === 'noun');
    else {
      const seen = new Set();
      words = ALL.filter(w => w.pos === 'noun' && (prefs.gLvl === 'all' || !prefs.gLvl || w.lvl === prefs.gLvl) && !seen.has(w.de) && seen.add(w.de));
    }
    const head = L ? levelHead(L, 'r') : `<div class="stack" style="gap:6px;margin-bottom:18px"><div class="eyebrow">Все уровни</div><h1 style="font-size:clamp(24px,4vw,36px)">Артикли der, die, das</h1><p class="lead">Все существительные словаря, разделённые по роду. Тренажёр помогает запомнить артикли.</p></div>
      <div class="chips" style="margin-bottom:6px">${['all', ...LEVELS.map(x => x.id)].map(id => `<button class="chip ${(prefs.gLvl || 'all') === id ? 'on' : ''}" data-glvl="${id}">${id === 'all' ? 'Все уровни' : id}</button>`).join('')}</div>`;
    try { if (localStorage.getItem('ww-goto-train')) { localStorage.removeItem('ww-goto-train'); prefs.gMode = 'train'; savePrefs(); } } catch (e) {}
    const gm = prefs.gMode || 'list';
    app.innerHTML = head + `<div class="toolbar"><div class="seg"><button data-gmode="list" class="${gm === 'list' ? 'on' : ''}">Таблица родов</button><button data-gmode="train" class="${gm === 'train' ? 'on' : ''}">Тренажёр артиклей</button></div><span class="muted" style="font-size:14px">${words.length} ${plural(words.length, 'существительное', 'существительных', 'существительных')}</span></div><div id="gbox"></div>`;
    app.querySelectorAll('[data-gmode]').forEach(b => b.onclick = () => { prefs.gMode = b.dataset.gmode; savePrefs(); viewGender(L); });
    app.querySelectorAll('[data-glvl]').forEach(b => b.onclick = () => { prefs.gLvl = b.dataset.glvl; savePrefs(); viewGender(null); });
    const box = document.getElementById('gbox');
    if (gm === 'list') {
      box.innerHTML = `<div class="gcols">${GENDERS.map(g => {
        const list = words.filter(w => genderOf(w) === g.k).sort((a, b) => a.base.localeCompare(b.base, 'de'));
        if (!list.length) return '';
        return `<section class="gcol g-${g.k}"><div class="gcol-head"><span class="gart">${g.k === 'pl' ? 'die (мн.)' : g.k}</span><span class="muted">${g.name}</span><span class="count">${list.length}</span></div>
          <div class="glist">${list.map(w => `<div class="gw"><button class="ico sm" data-speak="${esc(wordPlain(w))}" aria-label="Произнести">${icon.speak}</button><div style="min-width:0"><div class="gde">${!L ? `<span class="lvl-tag">${w.lvl}</span>` : ''}${esc(w.base)}${w.pl ? `<span class="pl">мн. ${esc(w.pl)}</span>` : ''}</div><div class="gru">${esc(w.ru)}</div></div></div>`).join('')}</div></section>`;
      }).join('')}</div>`;
    } else {
      const pool = words.filter(w => !w.plOnly);
      trainArticle(box, { pool, score: 0, total: 0, streak: 0, best: 0 });
    }
  }

  function trainArticle(box, st) {
    if (!st.pool.length) { box.innerHTML = '<div class="empty">Здесь нет существительных.</div>'; return; }
    const w = st.pool[Math.floor(Math.random() * st.pool.length)];
    box.innerHTML = `<div class="quiz">
      <div class="counter" id="tw-cnt" style="text-align:center">Верно ${st.score} из ${st.total} · серия ${st.streak} · рекорд ${st.best}</div>
      <div class="q-word"><div id="tw">___ ${esc(w.base)}</div><div class="muted" style="font-family:var(--font-body);font-size:16px;font-weight:500;margin-top:6px">${esc(w.ru)}</div></div>
      <div class="art-btns">${['der', 'die', 'das'].map(a => `<button class="art-btn ab-${a}" data-a="${a}">${a}</button>`).join('')}</div>
      <p class="why" id="tw-why" style="text-align:center;margin:0" hidden></p>
      <div class="row" style="justify-content:center" id="tw-next-row" hidden><button class="btn primary" id="tw-next">Дальше →</button></div>
    </div>`;
    const next = () => trainArticle(box, st);
    box.querySelectorAll('.art-btn').forEach(b => b.onclick = () => {
      const ok = b.dataset.a === w.art;
      st.total++; if (ok) { addXP(1); st.score++; st.streak++; st.best = Math.max(st.best, st.streak); } else st.streak = 0;
      box.querySelectorAll('.art-btn').forEach(x => { x.disabled = true; if (x.dataset.a === w.art) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      document.getElementById('tw').innerHTML = wordHtml(w);
      document.getElementById('tw-cnt').textContent = `Верно ${st.score} из ${st.total} · серия ${st.streak} · рекорд ${st.best}`;
      const why = document.getElementById('tw-why');
      why.textContent = ok ? 'Верно!' : `Правильно: ${w.art} ${w.base}`; why.hidden = false;
      speak(wordPlain(w));
      if (ok) setTimeout(() => { if (document.getElementById('tw-next')) next(); }, 900);
      else { document.getElementById('tw-next-row').hidden = false; document.getElementById('tw-next').onclick = next; document.getElementById('tw-next').focus(); }
    });
  }

  // global delegation for speak / learn buttons
  app.addEventListener('click', e => {
    const sp = e.target.closest('[data-speak]');
    if (sp) { speak(sp.dataset.speak); return; }
    const lb = e.target.closest('[data-learn]');
    if (lb) {
      const id = lb.dataset.learn;
      if (learned.has(id)) learned.delete(id); else { learned.add(id); if (!srs[id]) { srs[id] = { b: 3, d: dayNum() + 7, r: 1, l: 0 }; saveSrs(); } }
      saveLearned();
      const on = learned.has(id);
      lb.classList.toggle('on', on);
      lb.closest('.w')?.classList.toggle('learned', on);
      updateCount();
    }
  });

  function renderCards(box, deck, idx, flipped) {
    if (idx >= deck.length) {
      box.innerHTML = `<div class="result"><span class="eyebrow">Колода пройдена</span><b>${deck.length}</b><span class="muted">${plural(deck.length, 'карточка', 'карточки', 'карточек')} просмотрено · выучено в разделе: ${countLearned(sess.s.words)} из ${sess.s.words.length}</span><button class="btn primary" id="again">Ещё раз</button></div>`;
      document.getElementById('again').onclick = () => renderCards(box, shuffle(poolFor(sess.s).length ? poolFor(sess.s) : sess.s.words), 0, false);
      return;
    }
    const w = deck[idx];
    const front = prefs.dir === 'de' ? wordHtml(w) : esc(w.ru);
    const back = prefs.dir === 'de' ? esc(w.ru) : wordHtml(w);
    box.innerHTML = `<div class="card-stage">
      <div class="counter">${idx + 1} / ${deck.length}</div>
      <div class="flash" id="flash" tabindex="0" role="button" aria-label="Перевернуть карточку">
        <div><div class="big">${front}</div>${flipped ? `<div class="ans">${back}</div>` : ''}</div>
        <div class="hint">${flipped ? 'Клавиши: 1 — не знаю, 2 — знаю' : 'Нажмите или пробел — перевернуть'}</div>
      </div>
      <div class="row" style="justify-content:center">
        <button class="ico" data-speak="${esc(wordPlain(w))}" aria-label="Произнести">${icon.speak}</button>
        <button class="btn bad" id="c-no">Не знаю</button>
        <button class="btn good" id="c-yes">Знаю</button>
      </div>
    </div>`;
    const flip = () => renderCards(box, deck, idx, !flipped);
    const fl = document.getElementById('flash');
    fl.onclick = flip; fl.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } };
    const no = () => { srsRate(w, 0); addXP(1); deck.push(w); renderCards(box, deck, idx + 1, false); };
    const yes = () => { srsRate(w, srs[w.id] && srs[w.id].b >= 2 ? 3 : 2); learned.add(w.id); saveLearned(); addXP(1); updateCount(); renderCards(box, deck, idx + 1, false); };
    document.getElementById('c-no').onclick = no;
    document.getElementById('c-yes').onclick = yes;
    keys = { Space: flip, '1': no, '2': yes, ArrowLeft: no, ArrowRight: yes };
  }

  function startTest(box, pool, L) {
    const qs = shuffle(pool).slice(0, Math.min(prefs.qCount, pool.length));
    const others = sess.s.words.length >= 6 ? sess.s.words : levelWords(L);
    const state = { qs, i: 0, score: 0, others };
    renderQ(box, state);
  }

  function renderQ(box, st) {
    if (st.i >= st.qs.length) {
      const p = pct(st.score, st.qs.length);
      box.innerHTML = `<div class="result"><span class="eyebrow">Результат</span><b>${st.score} / ${st.qs.length}</b><span class="muted">${p >= 90 ? 'Отлично!' : p >= 60 ? 'Хорошо, ещё немного практики.' : 'Повторите слова в карточках и попробуйте снова.'}</span><button class="btn primary" id="again">Новый тест</button></div>`;
      document.getElementById('again').onclick = () => startTest(box, poolFor(sess.s).length ? poolFor(sess.s) : sess.s.words, sess.L);
      return;
    }
    const w = st.qs[st.i];
    const ask = prefs.dir === 'de' ? wordHtml(w) : esc(w.ru);
    const ansOf = x => prefs.dir === 'de' ? x.ru : wordPlain(x);
    const right = ansOf(w);
    const wrong = [...new Set(shuffle(st.others.filter(x => x !== w && ansOf(x) !== right)).map(ansOf))].slice(0, 3);
    const opts = shuffle([right, ...wrong]);
    box.innerHTML = `<div class="quiz">
      <div class="counter" style="text-align:center">Вопрос ${st.i + 1} из ${st.qs.length} · верно ${st.score}</div>
      <div class="q-word">${ask}</div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>
      <div class="row" style="justify-content:center" id="next-row" hidden><button class="btn primary" id="next">Дальше →</button></div>
    </div>`;
    if (prefs.dir === 'de' && prefs.autoSpeak) speak(wordPlain(w));
    box.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (!box.querySelector('#next-row').hidden) return;
      const ok = opts[+b.dataset.k] === right;
      if (ok) { st.score++; addXP(2); if (!srs[w.id]) srsRate(w, 2); } else srsRate(w, 0);
      box.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (opts[+x.dataset.k] === right) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      document.getElementById('next-row').hidden = false;
      document.getElementById('next').focus();
    });
    const goNext = () => { st.i++; renderQ(box, st); };
    document.getElementById('next').onclick = goNext;
    keys = { '1': () => box.querySelectorAll('.opt')[0]?.click(), '2': () => box.querySelectorAll('.opt')[1]?.click(), '3': () => box.querySelectorAll('.opt')[2]?.click(), '4': () => box.querySelectorAll('.opt')[3]?.click(), Enter: () => { if (!document.getElementById('next-row').hidden) goNext(); } };
  }

  // ----- grammar topic -----
  function viewGrammar(L, gi) {
    setNav(gFrom === 'all' ? 'grammar' : 'home');
    const list = GRAMMAR[L.id] || [];
    const t = list[gi];
    if (!t) return viewGrammarList(L);
    store.set('ww-last', { lvl: L.id, kind: 'g', i: gi });
    const key = L.id + '|' + gi;
    app.innerHTML = `${gFrom === 'all' ? '<a class="back" href="#grammar-all">← Вся грамматика</a>' : `<a class="back" href="#grammar-${L.id}">← Грамматика ${L.id}</a>`}
      <div class="stack" style="gap:6px;margin-bottom:18px"><div class="eyebrow">${L.id} · Тема ${gi + 1} из ${list.length}</div><h1 style="font-size:clamp(24px,4vw,36px)">${esc(t.t)}</h1>${t.s ? `<p class="lead">${esc(t.s)}</p>` : ''}</div>
      <article class="rule">${t.r.replace(/<table/g, '<div class="tbl-wrap"><table').replace(/<\/table>/g, '</table></div>')}
        ${t.ex && t.ex.length ? `<h3>Примеры</h3><div class="ex">${t.ex.map(e => `<div><div class="row" style="gap:8px;flex-wrap:nowrap"><button class="ico" data-speak="${esc(e[0])}" aria-label="Произнести">${icon.speak}</button><div style="min-width:0"><div class="d">${esc(e[0])}</div><div class="r">${esc(e[1])}</div></div></div></div>`).join('')}</div>` : ''}
        ${t.q && t.q.length ? `<h3>Проверьте себя</h3><div class="stack" id="gquiz">${t.q.map((q, qi) => `<div class="gq" data-qi="${qi}"><div class="qt">${qi + 1}. ${esc(q[0])}</div><div class="opts">${q[1].map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><div class="why" hidden>${esc(q[3] || '')}</div></div>`).join('')}</div><p class="muted" id="gscore" style="margin-top:12px"></p>` : ''}
      </article>
      <div class="row" style="justify-content:space-between;margin-top:26px">
        ${gi > 0 ? `<a class="btn" href="#gram-${L.id}-${gi - 1}" style="text-decoration:none">← ${esc(list[gi - 1].t)}</a>` : '<span></span>'}
        ${gi < list.length - 1 ? `<a class="btn" href="#gram-${L.id}-${gi + 1}" style="text-decoration:none">${esc(list[gi + 1].t)} →</a>` : ''}
      </div>`;
    let answered = 0, right = 0;
    app.querySelectorAll('.gq').forEach(card => {
      const q = t.q[+card.dataset.qi];
      card.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        card.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.k === q[2]) x.classList.add('right'); });
        if (k !== q[2]) b.classList.add('wrong'); else { right++; addXP(3); }
        answered++;
        const why = card.querySelector('.why'); if (why.textContent) why.hidden = false;
        if (answered === t.q.length) {
          document.getElementById('gscore').textContent = `Результат: ${right} из ${t.q.length}. ${right === t.q.length ? 'Тема отмечена как пройденная.' : 'Перечитайте правило и попробуйте ещё раз (обновите тему).'}`;
          if (right === t.q.length) { doneGrammar.add(key); store.set('ww-grammar', [...doneGrammar]); }
        }
      });
    });
  }

  // ----- search -----
  function viewSearch() {
    setNav('search');
    app.innerHTML = `<div class="stack" style="gap:8px;margin-bottom:16px"><div class="eyebrow">Весь словарь · ${ALL.length} слов</div><h1 style="font-size:clamp(24px,4vw,36px)">Поиск слова</h1></div>
      <input id="q" class="search-in" type="search" placeholder="Введите слово по-немецки или по-русски" autocomplete="off">
      <div id="res" style="margin-top:16px"></div>`;
    const q = document.getElementById('q'), res = document.getElementById('res');
    const norm = s => s.toLowerCase().replace(/ё/g, 'е');
    const run = () => {
      const v = norm(q.value.trim());
      if (!v) { res.innerHTML = `<div class="empty">Например: «Haus», «работа» или «gehen».</div>`; return; }
      const hits = ALL.filter(w => norm(w.de).includes(v) || norm(w.ru).includes(v));
      hits.sort((a, b) => (norm(a.base).startsWith(v) ? 0 : 1) - (norm(b.base).startsWith(v) ? 0 : 1));
      res.innerHTML = hits.length ? `<p class="muted" style="margin:0 0 10px">Найдено: ${hits.length}${hits.length > 150 ? ' (показаны первые 150)' : ''}</p><div class="words">${hits.slice(0, 150).map(w => wordRow(w, true)).join('')}</div>` : `<div class="empty">Ничего не найдено по запросу «${esc(q.value)}».</div>`;
    };
    q.oninput = run; run(); q.focus();
  }

  // ---------- router ----------
  // =====================================================================
  // XP, серия дней, цель дня
  // =====================================================================
  const dayNum = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  const activity = store.get('ww-activity', {});
  const xpToday = () => activity[dayNum()] || 0;
  const totalXP = () => Object.values(activity).reduce((a, b) => a + b, 0);
  function streakDays() {
    let d = dayNum(), n = 0;
    if (!activity[d]) d--;
    while (activity[d] > 0) { n++; d--; }
    return n;
  }
  function toast(html, ms) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = html; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), ms || 2600);
  }
  function addXP(n) {
    const d = dayNum(), before = activity[d] || 0;
    activity[d] = before + n;
    store.set('ww-activity', activity);
    if (before < prefs.goal && activity[d] >= prefs.goal) toast(`${UI.flame}<span><b>Цель дня выполнена!</b> ${activity[d]} XP · серия ${streakDays()} ${plural(streakDays(), 'день', 'дня', 'дней')}</span>`, 3500);
    updateTopStats();
  }
  function ring(p, size, stroke) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r, v = Math.min(1, p);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${v >= 1 ? 'var(--good)' : 'var(--violet)'}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c * v} ${c}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
  }
  function updateTopStats() {
    const el = document.getElementById('streak-chip');
    if (el) {
      const s = streakDays();
      el.innerHTML = `<span class="ring-wrap">${ring(xpToday() / prefs.goal, 30, 3.5)}<span class="ring-ico ${activity[dayNum()] ? 'lit' : ''}">${UI.flame}</span></span><b>${s}</b>`;
      el.title = `Серия: ${s} ${plural(s, 'день', 'дня', 'дней')} · сегодня ${xpToday()} из ${prefs.goal} XP`;
      el.setAttribute('aria-label', el.title);
    }
    const badge = document.getElementById('rev-badge');
    if (badge) { const n = dueWords().length; badge.textContent = n > 99 ? '99+' : n; badge.hidden = !n; }
  }

  // =====================================================================
  // Интервальное повторение (упрощённый Anki / Leitner)
  // =====================================================================
  const srs = store.get('ww-srs', {});
  const saveSrs = () => store.set('ww-srs', srs);
  const IV = [0, 1, 3, 7, 16, 35, 90];
  const byId = new Map(ALL.map(w => [w.id, w]));
  const STAGES = [
    { name: 'Изучаю', test: b => b <= 1, color: 'var(--bad)' },
    { name: 'Запоминаю', test: b => b >= 2 && b <= 3, color: 'var(--violet)' },
    { name: 'Выучено', test: b => b >= 4 && b <= 5, color: 'var(--der)' },
    { name: 'Освоено', test: b => b >= 6, color: 'var(--good)' }
  ];
  function srsPlan(c, q) {
    const n = Object.assign({ b: 0, d: 0, r: 0, l: 0 }, c || {});
    if (q > 0 && !n.r && n.b === 0) { n.b = [0, 1, 2, 3][q]; n.d = dayNum() + IV[n.b]; n.r++; return n; }
    if (q === 0) { n.b = 0; n.l++; n.d = dayNum(); }
    else if (q === 1) { n.b = Math.max(1, n.b); n.d = dayNum() + Math.max(1, Math.round(IV[n.b] / 2)); }
    else if (q === 2) { n.b = Math.min(6, n.b + 1); n.d = dayNum() + IV[n.b]; }
    else { n.b = Math.min(6, n.b + 2); n.d = dayNum() + IV[n.b]; }
    n.r++;
    return n;
  }
  function srsRate(w, q) {
    srs[w.id] = srsPlan(srs[w.id], q);
    saveSrs();
    if (srs[w.id].b >= 3 && !learned.has(w.id)) { learned.add(w.id); saveLearned(); }
    updateTopStats();
  }
  function srsAddNew(w) { if (!srs[w.id]) { srs[w.id] = { b: 0, d: dayNum(), r: 0, l: 0 }; saveSrs(); updateTopStats(); return true; } return false; }
  const ivLabel = d => d <= 0 ? 'сегодня' : d === 1 ? '1 день' : d < 30 ? `${d} ${plural(d, 'день', 'дня', 'дней')}` : `${Math.round(d / 30)} мес.`;
  function dueWords() {
    const t = dayNum();
    return Object.keys(srs).filter(id => srs[id].d <= t && byId.has(id)).sort((a, b) => srs[a].d - srs[b].d || srs[a].b - srs[b].b).map(id => byId.get(id));
  }

  // =====================================================================
  // Клавиатура: активный экран регистрирует свои клавиши
  // =====================================================================
  let keys = null;
  document.addEventListener('keydown', e => {
    if (!keys || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    const k = e.key === ' ' ? 'Space' : e.key;
    if (keys[k]) { e.preventDefault(); keys[k](); }
  });

  // =====================================================================
  // Письменный ответ (RU → DE) с проверкой артикля и опечаток
  // =====================================================================
  function lev(a, b) {
    const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9;
    const d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  const targetOf = w => (w.art ? w.art + ' ' : '') + w.base.replace(/\s*\(.*?\)/g, '').replace(/\s*\+\s*(Akk|Dat|Gen)\b/g, '').trim();
  function judge(w, input) {
    const want = normAns(targetOf(w)), got = normAns(input);
    if (!got) return null;
    if (got === want) return { q: 2, msg: 'Верно!' };
    if (w.art) {
      const base = normAns(w.base.replace(/\s*\(.*?\)/g, ''));
      const m = got.match(/^(der|die|das) (.+)$/);
      if (!m && got === base) return { q: 1, msg: `Почти! Не забудьте артикль: <b>${esc(targetOf(w))}</b>` };
      if (m && m[2] === base) return { q: 0, msg: `Слово верное, но артикль другой: <b>${esc(targetOf(w))}</b>` };
    }
    if (want.length >= 5 && lev(got, want) <= 1) return { q: 1, msg: `Почти, небольшая опечатка. Правильно: <b>${esc(targetOf(w))}</b>` };
    return { q: 0, msg: `Неверно. Правильно: <b>${esc(targetOf(w))}</b>` };
  }
  function renderWrite(box, w, header, done) {
    box.innerHTML = `<div class="quiz">
      ${header}
      <div class="q-word"><div>${esc(w.ru)}</div><div class="q-hint">${({ noun: 'существительное', verb: 'глагол', adj: 'прилагательное', adv: 'наречие', pron: 'местоимение', num: 'числительное', prep: 'предлог', conj: 'союз / связка', phrase: 'фраза' })[w.pos] || ''}${w.art ? ' · с артиклем' : ''} · ${w.lvl}</div></div>
      <div class="in-row"><input class="ans-in big" id="w-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напишите по-немецки"><button class="btn primary" id="w-check">Проверить</button></div>
      <div class="umlauts">${['ä', 'ö', 'ü', 'ß'].map(c => `<button class="btn" data-ch="${c}">${c}</button>`).join('')}<button class="btn" id="w-skip">Не знаю</button></div>
      <p class="why" id="w-msg" hidden></p>
      <div class="row" style="justify-content:center" id="w-next-row" hidden><button class="btn primary" id="w-next">Дальше →</button></div>
    </div>`;
    const inp = document.getElementById('w-in');
    try { inp.focus({ preventScroll: true }); } catch (e) {}
    box.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => {
      const s = inp.selectionStart ?? inp.value.length, e2 = inp.selectionEnd ?? inp.value.length;
      inp.value = inp.value.slice(0, s) + b.dataset.ch + inp.value.slice(e2);
      inp.focus(); inp.setSelectionRange(s + 1, s + 1);
    });
    let res = null;
    const finish = r => {
      res = r;
      inp.disabled = true; document.getElementById('w-check').disabled = true; document.getElementById('w-skip').disabled = true;
      inp.classList.add(r.q >= 1 ? 'right' : 'wrong');
      const msg = document.getElementById('w-msg'); msg.hidden = false;
      msg.innerHTML = `<span class="${r.q >= 1 ? 'ok' : 'bad'}">${r.q === 2 ? 'Верно!' : r.q === 1 ? 'Почти.' : 'Ошибка.'}</span> ${r.q === 2 ? esc(targetOf(w)) : r.msg.replace(/^(Верно!|Почти!?|Неверно\.)\s*/, '')}`;
      speak(wordPlain(w));
      document.getElementById('w-next-row').hidden = false;
      const nx = document.getElementById('w-next'); nx.focus();
      nx.onclick = () => done(res);
      keys = { Enter: () => done(res) };
    };
    const check = () => { const r = judge(w, inp.value); if (r) finish(r); };
    document.getElementById('w-check').onclick = check;
    document.getElementById('w-skip').onclick = () => finish({ q: 0, msg: `Правильно: <b>${esc(targetOf(w))}</b>` });
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (res) done(res); else check(); } };
    keys = null;
  }

  // =====================================================================
  // Сессия: карточки с оценкой (Снова / Трудно / Хорошо / Легко) или письмо
  // =====================================================================
  function runSession(box, words, opts) {
    const mode = opts.mode || 'cards';
    const queue = words.slice();
    const total = queue.length;
    const tally = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let xp = 0, shown = 0;
    const requeued = new Set();
    const head = () => `<div class="sess-head"><div class="sess-bar"><i style="width:${pct(shown, total + requeued.size)}%"></i></div><span class="counter">${Math.min(shown + 1, total + requeued.size)} / ${total + requeued.size}</span></div>`;
    const next = () => {
      if (!queue.length) return end();
      const w = queue.shift();
      if (mode === 'write') renderWrite(box, w, head(), r => rate(w, r.q));
      else card(w, false);
    };
    const rate = (w, q) => {
      if (opts.srs !== false) srsRate(w, q);
      tally[q]++; shown++;
      const gain = q === 0 ? 1 : mode === 'write' ? 3 : 2;
      xp += gain; addXP(gain);
      if (q === 0 && !requeued.has(w.id)) { requeued.add(w.id); queue.splice(Math.min(3, queue.length), 0, w); }
      next();
    };
    const card = (w, open) => {
      const deFirst = prefs.dir !== 'ru';
      const front = deFirst ? wordHtml(w) : esc(w.ru), back = deFirst ? esc(w.ru) : wordHtml(w);
      const c = srs[w.id];
      const lbl = q => ivLabel(srsPlan(c, q).d - dayNum());
      box.innerHTML = `<div class="card-stage">${head()}
        <div class="flash ${open ? 'open' : ''}" id="flash" tabindex="0" role="button" aria-label="Показать ответ">
          <div><div class="big">${front}</div>${open ? `<div class="ans">${back}</div>` : ''}${!c || !c.r ? '<div class="new-tag">новое слово</div>' : ''}</div>
          <div class="hint">${open ? 'Насколько легко было вспомнить?' : 'Пробел или нажатие — показать ответ'}</div>
        </div>
        ${open ? `<div class="rate">
          <button class="rate-b r0" data-q="0"><b>Снова</b><span>${lbl(0)}</span></button>
          <button class="rate-b r1" data-q="1"><b>Трудно</b><span>${lbl(1)}</span></button>
          <button class="rate-b r2" data-q="2"><b>Хорошо</b><span>${lbl(2)}</span></button>
          <button class="rate-b r3" data-q="3"><b>Легко</b><span>${lbl(3)}</span></button>
        </div><div class="kbd-hint">Клавиши 1–4</div>` : `<div class="row" style="justify-content:center"><button class="ico" data-speak="${esc(wordPlain(w))}" aria-label="Произнести">${icon.speak}</button><button class="btn primary" id="show">Показать ответ</button></div>`}
      </div>`;
      if (!open) {
        const show = () => { card(w, true); if (deFirst === false || prefs.autoSpeak) speak(wordPlain(w)); };
        document.getElementById('flash').onclick = show;
        document.getElementById('show').onclick = show;
        keys = { Space: show, Enter: show };
        if (deFirst && prefs.autoSpeak) speak(wordPlain(w));
      } else {
        box.querySelectorAll('.rate-b').forEach(b => b.onclick = () => rate(w, +b.dataset.q));
        keys = { '1': () => rate(w, 0), '2': () => rate(w, 1), '3': () => rate(w, 2), '4': () => rate(w, 3), Space: () => rate(w, 2) };
      }
    };
    const end = () => {
      keys = null;
      const ok = tally[1] + tally[2] + tally[3];
      box.innerHTML = `<div class="result"><span class="eyebrow">${esc(opts.title || 'Сессия завершена')}</span><b>+${xp} XP</b>
        <span class="muted">Ответов: ${ok + tally[0]} · вспомнили ${ok} · ошибок ${tally[0]}</span>
        <div class="row" style="justify-content:center">${opts.again ? '<button class="btn" id="s-again">Ещё раз</button>' : ''}<a class="btn primary" style="text-decoration:none" href="#review">К повторению</a></div></div>`;
      const a = document.getElementById('s-again'); if (a) a.onclick = opts.again;
      if (opts.onEnd) opts.onEnd();
    };
    next();
  }

  // =====================================================================
  // Экран «Повторение»
  // =====================================================================
  function viewReview() {
    setNav('review');
    const due = dueWords();
    const ids = Object.keys(srs).filter(id => byId.has(id));
    const t = dayNum();
    const tomorrow = ids.filter(id => srs[id].d === t + 1).length;
    const week = ids.filter(id => srs[id].d > t && srs[id].d <= t + 7).length;
    const mistakes = ids.filter(id => srs[id].l > 0).sort((a, b) => srs[b].l - srs[a].l);
    const stageCounts = STAGES.map(s => ids.filter(id => s.test(srs[id].b)).length);
    const nlvl = prefs.newLvl || (LEVELS.find(L => levelWords(L).some(w => !srs[w.id])) || LEVELS[0]).id;
    const newPool = levelWords(lvlById(nlvl)).filter(w => !srs[w.id] && !learned.has(w.id));
    const rm = prefs.revMode || 'cards';
    app.innerHTML = `<div class="stack" style="gap:6px;margin-bottom:18px"><div class="eyebrow">Интервальное повторение</div><h1 style="font-size:clamp(26px,4.5vw,38px)">Повторение</h1><p class="lead">Слова возвращаются, когда вы начинаете их забывать: через 1, 3, 7, 16, 35 и 90 дней. Несколько минут в день надёжнее, чем час раз в неделю.</p></div>
      <div id="rev-box"></div>
      <div id="rev-home">
        <div class="home-grid">
          <div class="card due-card">
            <span class="eyebrow">Сегодня</span>
            <div class="row" style="align-items:baseline;gap:10px"><span class="big-num">${due.length}</span><span class="muted">${plural(due.length, 'слово ждёт', 'слова ждут', 'слов ждут')} повторения</span></div>
            <div class="seg" style="align-self:flex-start"><button data-rm="cards" class="${rm === 'cards' ? 'on' : ''}">Карточки</button><button data-rm="write" class="${rm === 'write' ? 'on' : ''}">Письмо</button></div>
            ${due.length ? `<button class="btn primary big" id="start-due">Начать повторение${due.length > 50 ? ' (50)' : ''}</button>` : `<div class="muted" style="font-size:14px">${ids.length ? `На сегодня всё. Завтра: ${tomorrow}, за неделю: ${week}.` : 'Пока пусто. Добавьте новые слова справа или учите слова в разделах: всё, что вы отметите, попадёт сюда.'}</div>`}
          </div>
          <div class="card">
            <span class="eyebrow">Учить новые слова</span>
            <div class="chips" style="margin:0">${LEVELS.map(L => `<button class="chip ${nlvl === L.id ? 'on' : ''}" data-nlvl="${L.id}">${L.id}</button>`).join('')}</div>
            <div class="muted" style="font-size:14px">В уровне ${nlvl} ещё не начато: ${newPool.length} ${plural(newPool.length, 'слово', 'слова', 'слов')}. Слова берутся по порядку разделов.</div>
            <div class="row">${[5, 10, 20].map(n => `<button class="btn ${n === 10 ? 'primary' : ''}" data-new="${n}" ${newPool.length ? '' : 'disabled'}>+${n}</button>`).join('')}</div>
          </div>
        </div>
        <div class="card" style="margin-bottom:22px">
          <div class="row" style="justify-content:space-between"><span class="eyebrow">Ваши слова по этапам</span><span class="pct">${ids.length} в повторении</span></div>
          <div class="stage-bar">${STAGES.map((s, i) => stageCounts[i] ? `<i style="flex:${stageCounts[i]};background:${s.color}"></i>` : '').join('') || '<i style="flex:1;background:var(--line)"></i>'}</div>
          <div class="stage-legend">${STAGES.map((s, i) => `<span><i style="background:${s.color}"></i>${s.name} <b>${stageCounts[i]}</b></span>`).join('')}</div>
        </div>
        <div class="card">
          <div class="row" style="justify-content:space-between"><span class="eyebrow">Работа над ошибками</span><span class="pct">${mistakes.length}</span></div>
          ${mistakes.length ? `<div class="words" style="margin-top:4px">${mistakes.slice(0, 8).map(id => wordRow(byId.get(id), true)).join('')}</div><button class="btn" id="start-mist" style="align-self:flex-start">Повторить ошибки (${Math.min(20, mistakes.length)})</button>` : '<div class="muted" style="font-size:14px">Здесь появятся слова, в которых вы ошибались в тестах, карточках и письме.</div>'}
        </div>
      </div>`;
    const box = document.getElementById('rev-box'), home = document.getElementById('rev-home');
    const start = (words, title) => { home.hidden = true; window.scrollTo(0, 0); runSession(box, words, { mode: prefs.revMode || 'cards', title, onEnd: () => updateTopStats() }); };
    app.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { prefs.revMode = b.dataset.rm; savePrefs(); viewReview(); });
    app.querySelectorAll('[data-nlvl]').forEach(b => b.onclick = () => { prefs.newLvl = b.dataset.nlvl; savePrefs(); viewReview(); });
    const sd = document.getElementById('start-due'); if (sd) sd.onclick = () => start(due.slice(0, 50), 'Повторение завершено');
    const sm = document.getElementById('start-mist'); if (sm) sm.onclick = () => start(shuffle(mistakes.slice(0, 20).map(id => byId.get(id))), 'Ошибки повторены');
    app.querySelectorAll('[data-new]').forEach(b => b.onclick = () => {
      const list = newPool.slice(0, +b.dataset.new);
      list.forEach(srsAddNew);
      start(list, `Новые слова ${nlvl}`);
    });
  }

  // =====================================================================
  // Перевод слова по нажатию в тексте
  // =====================================================================
  const LOOK = new Map();
  ALL.forEach(w => {
    const key = w.base.replace(/\s*\(.*?\)/g, '').trim().toLowerCase();
    if (!key.includes(' ') && !LOOK.has(key)) LOOK.set(key, w);
  });
  function lookup(tok) {
    const t = tok.toLowerCase();
    const tries = [t];
    for (const suf of ['en', 'em', 'er', 'es', 'e', 'n', 's', 'st', 't', 'et', 'te', 'ten', 'test', 'ung']) if (t.endsWith(suf) && t.length - suf.length >= 3) { const st = t.slice(0, -suf.length); tries.push(st, st + 'en', st + 'n', st + 'e'); }
    tries.push(t + 'en', t + 'n');
    for (const x of tries) if (LOOK.has(x)) return LOOK.get(x);
    return null;
  }
  function wordSheet(tok) {
    const w = lookup(tok);
    let sh = document.getElementById('sheet');
    if (!sh) { sh = document.createElement('div'); sh.id = 'sheet'; sh.className = 'sheet'; sh.setAttribute('role', 'dialog'); document.body.appendChild(sh); }
    sh.innerHTML = w ? `<div class="sheet-in"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="eyebrow">В тексте: ${esc(tok)}</span><button class="icon-btn sm" id="sh-x" aria-label="Закрыть">✕</button></div>
        <div class="row" style="flex-wrap:nowrap;gap:12px"><button class="ico" data-speak="${esc(wordPlain(w))}" aria-label="Произнести">${icon.speak}</button><div class="wod-word" style="font-size:24px">${wordHtml(w)}</div></div>
        <div class="muted">${esc(w.ru)} · <span class="lvl-tag" style="margin:0">${w.lvl}</span></div>
        <button class="btn ${srs[w.id] ? '' : 'primary'}" id="sh-add" ${srs[w.id] ? 'disabled' : ''} style="align-self:flex-start">${srs[w.id] ? 'Уже в повторении' : '+ В повторение'}</button></div>`
      : `<div class="sheet-in"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="eyebrow">${esc(tok)}</span><button class="icon-btn sm" id="sh-x" aria-label="Закрыть">✕</button></div><div class="muted">Этой формы слова нет в словаре. Посмотрите словарик над текстом или попробуйте поиск по основе слова.</div></div>`;
    sh.classList.add('show');
    sh.querySelector('#sh-x').onclick = () => sh.classList.remove('show');
    const sp = sh.querySelector('[data-speak]'); if (sp) sp.onclick = () => speak(sp.dataset.speak);
    const ad = sh.querySelector('#sh-add'); if (ad) ad.onclick = () => { srsAddNew(w); ad.textContent = 'Добавлено'; ad.disabled = true; ad.classList.remove('primary'); };
  }
  window.addEventListener('hashchange', () => { const sh = document.getElementById('sheet'); if (sh) sh.classList.remove('show'); keys = null; });

  // =====================================================================
  // Профиль: статистика активности
  // =====================================================================
  function profileStats() {
    const t = dayNum(), days = [];
    for (let i = 13; i >= 0; i--) days.push({ d: t - i, xp: activity[t - i] || 0 });
    const max = Math.max(prefs.goal, ...days.map(x => x.xp));
    const wd = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dateOf = d => new Date(d * 864e5);
    const ids = Object.keys(srs).filter(id => byId.has(id));
    const s = streakDays();
    const best = (() => { const ks = Object.keys(activity).map(Number).filter(k => activity[k] > 0).sort((a, b) => a - b); let b = 0, c = 0, prev = null; ks.forEach(k => { c = prev !== null && k === prev + 1 ? c + 1 : 1; b = Math.max(b, c); prev = k; }); return b; })();
    return `<section class="set-group"><div class="profile-top">
        <div class="card ring-card"><div class="ring-big">${ring(xpToday() / prefs.goal, 110, 10)}<div><b>${xpToday()}</b><span>из ${prefs.goal} XP</span></div></div><span class="muted" style="font-size:14px">${xpToday() >= prefs.goal ? 'Цель дня выполнена' : `До цели ${prefs.goal - xpToday()} XP`}</span></div>
        <div class="stats" style="margin:0">
          <div class="stat"><b class="flame-num">${UI.flame}${s}</b><span>${plural(s, 'день', 'дня', 'дней')} подряд</span></div>
          <div class="stat"><b>${best}</b><span>лучшая серия</span></div>
          <div class="stat"><b>${totalXP()}</b><span>всего XP</span></div>
          <div class="stat"><b>${learned.size}</b><span>слов выучено</span></div>
          <div class="stat"><b>${ids.length}</b><span>в повторении</span></div>
          <div class="stat"><b>${dueWords().length}</b><span>к повторению</span></div>
        </div></div>
      <div class="card">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">Активность за 14 дней</span><span class="legend-goal"><i></i>цель ${prefs.goal} XP</span></div>
        <div class="chart" role="img" aria-label="XP по дням за последние 14 дней">
          <div class="goal-line" style="bottom:${(prefs.goal / max) * 100}%"></div>
          ${days.map(x => `<div class="col ${x.d === t ? 'today' : ''}" title="${dateOf(x.d).toLocaleDateString('ru-RU')}: ${x.xp} XP"><span class="v">${x.xp || ''}</span><i class="${x.xp >= prefs.goal ? 'hit' : ''}" style="height:${x.xp ? Math.max(4, (x.xp / max) * 100) : 0}%"></i><span class="d">${wd[dateOf(x.d).getUTCDay()]}</span></div>`).join('')}
        </div>
      </div></section>`;
  }

  function route() {
    const h = location.hash.slice(1);
    let m;
    if ((m = h.match(/^level-(\w+)$/)) && lvlById(m[1])) viewLevel(lvlById(m[1]));
    else if ((m = h.match(/^grammar-(\w+)$/)) && lvlById(m[1])) viewGrammarList(lvlById(m[1]));
    else if ((m = h.match(/^pos-(\w+)$/)) && lvlById(m[1])) viewPos(lvlById(m[1]));
    else if (h === 'gender-all') viewGender(null);
    else if (h === 'grammar-all') viewGrammarAll();
    else if (h === 'texts-all') viewTextsAll();
    else if (h === 'settings' || h === 'profile') viewSettings();
    else if (h === 'review') viewReview();
    else if ((m = h.match(/^texts-(\w+)$/)) && lvlById(m[1])) viewTextsLevel(lvlById(m[1]));
    else if ((m = h.match(/^text-(\w+)-(\d+)$/)) && lvlById(m[1])) viewText(lvlById(m[1]), +m[2]);
    else if ((m = h.match(/^gender-(\w+)$/)) && lvlById(m[1])) viewGender(lvlById(m[1]));
    else if ((m = h.match(/^vocab-(\w+)-(\d+)$/)) && lvlById(m[1]) && lvlById(m[1]).sections[+m[2]]) viewSection(lvlById(m[1]), +m[2]);
    else if ((m = h.match(/^gram-(\w+)-(\d+)$/)) && lvlById(m[1])) viewGrammar(lvlById(m[1]), +m[2]);
    else if (h === 'search') viewSearch();
    else viewHome();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
  updateTopStats();
})();
