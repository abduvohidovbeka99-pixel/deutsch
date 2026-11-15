// Определение части речи для слов словаря.
// Порядок: точные исключения → существительные (с артиклем) → наборы служебных слов → эвристики для глаголов → значение раздела по умолчанию.
window.POS_NAMES = {
  noun: 'Существительные', verb: 'Глаголы', adj: 'Прилагательные', adv: 'Наречия',
  pron: 'Местоимения и вопросы', num: 'Числительные', prep: 'Предлоги',
  conj: 'Союзы и связки', phrase: 'Фразы и выражения'
};
window.POS_ORDER = ['noun', 'verb', 'adj', 'adv', 'pron', 'num', 'prep', 'conj', 'phrase'];

(function () {
  const set = s => new Set(s.split(/\s+/).filter(Boolean));
  const PRON = set('ich du er sie es wir ihr Sie mein dein unser euer wer was wo woher wohin wann warum wie welcher dieser alle nichts etwas jemand niemand man kein');
  const PREP = set('mit ohne für in auf zu von aus nach bei über unter vor hinter neben zwischen an durch gegen um seit bis gegenüber trotz wegen statt innerhalb außerhalb ungeachtet angesichts aufgrund hinsichtlich bezüglich mithilfe zugunsten nebst zwecks infolge mangels seitens kraft gemäß entgegen unbeschadet anhand');
  const CONJ = set('und oder aber denn weil dass wenn ob als obwohl damit während nachdem bevor seitdem sobald solange falls indem sodass sondern');
  const ADV = set('heute morgen gestern jetzt hier da dort gern noch schon immer nie oft manchmal nur auch sehr links rechts geradeaus genau wirklich also morgens mittags nachmittags abends nachts täglich zuerst dann danach später oben unten vorne hinten draußen drinnen überall irgendwo zusammen allein bald gleich sofort endlich wieder fast etwa ungefähr ziemlich besonders natürlich leider plötzlich vorher nachher inzwischen damals neulich mindestens höchstens wenigstens sogar trotzdem vielleicht nicht unbedingt wahrscheinlich zwangsläufig letztendlich bar online allmählich schlagartig fortwährend zeitweilig anscheinend offenbar vermutlich keineswegs durchaus nahezu ohnehin sowieso jedenfalls immerhin mittlerweile zunächst bislang stets keinesfalls');
  const VERB = set('sein tun wehtun');
  const NOT_VERB = set('offen trocken verschieden zufrieden unzufrieden gelassen eben abgelaufen geschlossen krankgeschrieben ausgeglichen umstritten selten golden schüchtern modern angemessen unvoreingenommen unumstritten sensationslüstern');
  const ORD = set('erste zweite dritte');
  // точные исключения: "немецкое=русское" → часть речи
  const EXACT = {
    'sein=его': 'pron', 'ihr=её, их': 'pron', 'zu=слишком': 'adv', 'eine Million=миллион': 'num',
    'wie viel=сколько': 'pron', 'noch nicht=ещё не': 'adv', 'zu Fuß=пешком': 'adv',
    'Rad fahren=кататься на велосипеде': 'verb', 'Ski fahren=кататься на лыжах': 'verb',
    'hin und zurück=туда и обратно': 'phrase', 'Gute Besserung!=выздоравливай!': 'phrase',
    'Bitte=пожалуйста': 'phrase', 'gleich=одинаковый, сейчас': 'adj', 'weit=далеко': 'adv', 'nah=близко': 'adv',
    'einfach=в одну сторону, просто': 'adv', 'direkt=прямо, напрямую': 'adv', 'früh=рано': 'adv', 'spät=поздно': 'adv',
    'pünktlich=пунктуально, вовремя': 'adv', 'gemeinsam=общий, вместе': 'adj', 'schuld=виноватый': 'adj',
    'während=во время, в то время как': 'conj', 'um … zu=чтобы (с инфинитивом)': 'conj'
  };
  // существительные, которые бывают только во множественном числе
  const PL_ONLY = set('Eltern Leute Geschwister Handschuhe Nudeln Kosten Schulden Zinsen Ausgaben Einnahmen Daten Medien Nachrichten Ferien Unterlagen Möbel Nebenkosten Kenntnisse Rahmenbedingungen USA Abgase Brennstoffe Menschenrechte Arbeitsbedingungen Abwehrkräfte Studiengebühren Kopfschmerzen Schmerzen Netzwerke');

  const verbLike = w => VERB.has(w) || (/^[a-zäöüß]+$/.test(w) && /(en|ern|eln)$/.test(w) && !NOT_VERB.has(w) && !ADV.has(w));

  window.classifyWord = function (de, ru, art, base, sectionDefault) {
    const key = de + '=' + ru;
    if (EXACT[key]) return EXACT[key];
    if (art) {
      if (ORD.has(base)) return 'num';
      return 'noun';
    }
    if (sectionDefault === 'phrase' && de.includes(' ')) return 'phrase';
    if (de.includes(' + ')) {
      const head = de.split(' + ')[0].trim();
      if (PREP.has(head) || /^(in|im|zum|zur) [A-ZÄÖÜ]/.test(head)) return 'prep';
      return 'verb';
    }
    if (/^sich /.test(de)) return 'verb';
    if (/^[a-zäöüß]+ \([a-zäöüß]+\)$/.test(de)) return 'verb';
    if (de.includes('…')) return /^[A-ZÄÖÜ]/.test(de) ? 'phrase' : 'conj';
    const words = de.replace(/[?!.,]/g, '').split(' ');
    if (words.length > 1) {
      if (sectionDefault) return sectionDefault === 'conj' || sectionDefault === 'phrase' ? sectionDefault : 'phrase';
      if (verbLike(words[0]) || verbLike(words[words.length - 1])) return 'verb';
      return 'phrase';
    }
    const w = de;
    if (PRON.has(w)) return 'pron';
    if (CONJ.has(w)) return 'conj';
    if (PREP.has(w)) return 'prep';
    if (ADV.has(w)) return 'adv';
    if (sectionDefault === 'noun') return /^[A-ZÄÖÜ]/.test(w) ? 'noun' : 'adj';
    if (sectionDefault) return sectionDefault;
    if (verbLike(w)) return 'verb';
    return 'adj';
  };
  window.isPluralOnly = (art, base) => art === 'die' && PL_ONLY.has(base.split(' ').pop());
})();
