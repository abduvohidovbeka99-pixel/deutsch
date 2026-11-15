GRAMMAR.C1 = [
{ t: "Субъективное значение модальных глаголов", s: "Er soll reich sein, sie muss krank sein",
r: `<p>Модальные глаголы выражают не только обязанность или возможность, но и <em>степень уверенности</em> говорящего или чужие слова.</p>
<table><tr><th>Глагол</th><th>Значение</th><th>Пример</th></tr>
<tr><td>müssen</td><td>почти уверен (≈ 90%)</td><td>Er muss krank sein. — Он, должно быть, болен.</td></tr>
<tr><td>dürfte</td><td>вероятно (≈ 75%)</td><td>Das dürfte stimmen. — Это, вероятно, так.</td></tr>
<tr><td>können / könnte</td><td>возможно (≈ 50%)</td><td>Sie könnte noch im Büro sein. — Она, возможно, ещё в офисе.</td></tr>
<tr><td>sollen</td><td>говорят, что… (чужое утверждение)</td><td>Er soll sehr reich sein. — Говорят, он очень богат.</td></tr>
<tr><td>wollen</td><td>утверждает о себе (сомнение)</td><td>Sie will alles allein geschafft haben. — Она утверждает, что всё сделала сама.</td></tr>
<tr><td>nicht können</td><td>исключено</td><td>Das kann nicht wahr sein. — Не может быть.</td></tr></table>
<div class="note">О прошлом: модальный глагол + <em>Partizip II + haben/sein</em>: Er muss den Zug verpasst <em>haben</em>. Sie soll gestern abgereist <em>sein</em>.</div>`,
ex: [["Der Täter soll über die Grenze geflohen sein.", "Преступник, по сообщениям, бежал через границу."], ["Das muss ein Missverständnis gewesen sein.", "Это наверняка было недоразумение."], ["Er will nichts davon gewusst haben.", "Он утверждает, что ничего об этом не знал."]],
q: [["«Говорят, что фильм отличный» = Der Film ___ sehr gut sein.", ["muss", "soll", "will"], 1, "Чужое утверждение → sollen."],
["«Он наверняка забыл» = Er ___ es vergessen haben.", ["muss", "soll", "darf"], 0, "Сильная уверенность → müssen."],
["Sie ___ das Geld gefunden haben. (утверждает она сама)", ["soll", "will", "kann"], 1, "Утверждение о себе → wollen."]] },

{ t: "Устойчивые сочетания существительного с глаголом", s: "Nomen-Verb-Verbindungen",
r: `<p>В официальном языке простой глагол часто заменяют сочетанием «существительное + глагол». Основное значение несёт существительное.</p>
<table><tr><th>Сочетание</th><th>= Глагол</th><th>Значение</th></tr>
<tr><td>eine Entscheidung treffen</td><td>entscheiden</td><td>принять решение</td></tr>
<tr><td>in Frage stellen</td><td>bezweifeln</td><td>поставить под сомнение</td></tr>
<tr><td>zur Verfügung stellen</td><td>bereitstellen</td><td>предоставить</td></tr>
<tr><td>Kritik üben an</td><td>kritisieren</td><td>критиковать</td></tr>
<tr><td>in Kraft treten</td><td>gültig werden</td><td>вступить в силу</td></tr>
<tr><td>zum Abschluss bringen</td><td>abschließen</td><td>завершить</td></tr>
<tr><td>Anwendung finden</td><td>angewendet werden</td><td>применяться</td></tr>
<tr><td>in Betracht ziehen</td><td>berücksichtigen</td><td>принимать во внимание</td></tr>
<tr><td>eine Rolle spielen</td><td>wichtig sein</td><td>играть роль</td></tr>
<tr><td>Bezug nehmen auf</td><td>sich beziehen auf</td><td>ссылаться на</td></tr></table>
<div class="note">Многие сочетания имеют пассивное значение: <em>finden, erfahren, gelangen</em> («Das Gesetz findet Anwendung» = «Закон применяется»).</div>`,
ex: [["Das neue Gesetz tritt im Januar in Kraft.", "Новый закон вступает в силу в январе."], ["Wir müssen alle Möglichkeiten in Betracht ziehen.", "Мы должны учесть все возможности."]],
q: [["Die Firma stellt den Mitarbeitern Laptops zur ___.", ["Verfügung", "Rolle", "Frage"], 0, "zur Verfügung stellen."],
["Der Minister ___ scharfe Kritik an dem Plan.", ["machte", "übte", "stellte"], 1, "Kritik üben an."],
["Die Regel ___ hier keine Anwendung.", ["nimmt", "findet", "trifft"], 1, "Anwendung finden."]] },

{ t: "Сравнения с als ob / als", s: "Нереальное сравнение",
r: `<p><em>als ob / als wenn</em> + Konjunktiv II (глагол в конце) или <em>als</em> + Konjunktiv II (глагол сразу после als) — «как будто».</p>
<table><tr><th>Конструкция</th><th>Пример</th></tr>
<tr><td>als ob … Verb</td><td>Er tut so, als ob er nichts <em>wüsste</em>.</td></tr>
<tr><td>als wenn … Verb</td><td>Sie sieht aus, als wenn sie krank <em>wäre</em>.</td></tr>
<tr><td>als + Verb …</td><td>Er tut so, als <em>wüsste</em> er nichts.</td></tr></table>
<p>Прошлое: <em>hätte/wäre + Partizip II</em>: Sie reagierte, als ob nichts <em>passiert wäre</em>.</p>
<div class="note">В письменной речи встречается и Konjunktiv I: Er tut so, als habe er keine Zeit.</div>`,
ex: [["Du redest, als ob du der Chef wärst.", "Ты говоришь, будто ты начальник."], ["Es sieht aus, als würde es gleich regnen.", "Похоже, сейчас пойдёт дождь."]],
q: [["Er tut so, als ob er krank ___.", ["ist", "wäre", "sei gewesen wäre"], 1, "als ob + Konjunktiv II в конце."],
["Sie lächelte, als ___ sie alles verstanden.", ["hätte", "habe gehabt", "hat"], 0, "als + глагол сразу: als hätte sie … verstanden."]] },

{ t: "Коррелаты: es, darauf, dafür …", s: "Слово-«указатель» на придаточное",
r: `<p>Коррелят в главном предложении заранее указывает на придаточное или инфинитивный оборот.</p>
<h3>es</h3>
<p>Ich finde <em>es</em> wichtig, dass … / <em>Es</em> freut mich, dass … Если придаточное стоит первым, es пропадает: Dass du kommst, freut mich.</p>
<h3>da(r)- + предлог</h3>
<p>Для глаголов с предлогом: Ich freue mich <em>darauf</em>, dich zu sehen. Er besteht <em>darauf</em>, dass wir pünktlich sind.</p>
<table><tr><th>Глагол</th><th>Коррелят</th></tr>
<tr><td>sich gewöhnen an</td><td>daran, dass / zu</td></tr>
<tr><td>sich kümmern um</td><td>darum, dass</td></tr>
<tr><td>abhängen von</td><td>davon, ob / wie</td></tr>
<tr><td>beitragen zu</td><td>dazu, dass</td></tr>
<tr><td>sich einsetzen für</td><td>dafür, dass</td></tr></table>
<div class="note">У одних глаголов коррелят обязателен (bestehen auf → darauf), у других — факультативен (sich freuen über → (darüber,) dass).</div>`,
ex: [["Es hängt davon ab, ob wir genug Zeit haben.", "Это зависит от того, будет ли у нас достаточно времени."], ["Sie setzt sich dafür ein, dass alle gleich behandelt werden.", "Она выступает за то, чтобы со всеми обращались одинаково."]],
q: [["Ich habe mich ___ gewöhnt, früh aufzustehen.", ["darauf", "daran", "dafür"], 1, "sich gewöhnen an → daran."],
["Das trägt ___ bei, dass die Kosten sinken.", ["dazu", "dafür", "darum"], 0, "beitragen zu → dazu."],
["Er besteht ___, dass wir bleiben.", ["darauf", "davon", "darin"], 0, "bestehen auf → darauf."]] },

{ t: "Причастные обороты и сокращение придаточных", s: "Plötzlich aufgewacht, sah er …",
r: `<p>В книжной речи придаточное можно сократить до <em>причастного оборота</em>, если подлежащее одно и то же.</p>
<table><tr><th>Придаточное</th><th>Причастный оборот</th></tr>
<tr><td>Nachdem er die Tür geöffnet hatte, trat er ein.</td><td><em>Die Tür geöffnet</em>, trat er ein.</td></tr>
<tr><td>Während sie leise lachte, ging sie hinaus.</td><td><em>Leise lachend</em> ging sie hinaus.</td></tr>
<tr><td>Wenn man es genau betrachtet, …</td><td><em>Genau betrachtet</em>, …</td></tr></table>
<p>Устойчивые обороты: <em>streng genommen</em> (строго говоря), <em>offen gesagt</em> (честно говоря), <em>im Vergleich gesehen</em>, <em>ausgehend von</em> (исходя из), <em>abgesehen von</em> (не считая).</p>
<div class="note">Partizip I (lachend) — одновременное действие, Partizip II (geöffnet) — предшествующее или пассивное.</div>`,
ex: [["Offen gesagt, finde ich die Idee schlecht.", "Честно говоря, идея мне не нравится."], ["Abgesehen von einigen Fehlern ist der Text gut.", "Не считая нескольких ошибок, текст хороший."]],
q: [["___ genommen, hat er recht. (строго говоря)", ["Streng", "Strenger", "Strengend"], 0, "streng genommen."],
["Laut ___ verließ er den Raum. (смеясь)", ["gelacht", "lachend", "lachen"], 1, "Одновременное действие → Partizip I."]] },

{ t: "Порядок слов в середине предложения", s: "TeKaMoLo и место nicht",
r: `<p>В середине предложения (между глаголом и концом рамки) обстоятельства обычно стоят в порядке <em>Te-Ka-Mo-Lo</em>:</p>
<table><tr><th>Te</th><th>Ka</th><th>Mo</th><th>Lo</th></tr>
<tr><td>temporal — когда</td><td>kausal — почему</td><td>modal — как</td><td>lokal — где/куда</td></tr>
<tr><td>morgen</td><td>wegen des Streiks</td><td>mit dem Fahrrad</td><td>zur Arbeit</td></tr></table>
<p>Ich fahre <em>morgen wegen des Streiks mit dem Fahrrad zur Arbeit</em>.</p>
<h3>Дополнения</h3>
<ul><li>Два существительных: Dativ перед Akkusativ — Ich gebe <em>dem Kind das Buch</em>.</li>
<li>Akkusativ-местоимение перед Dativ: Ich gebe <em>es ihm</em>.</li>
<li>Местоимения стоят раньше существительных: Ich gebe <em>ihm das Buch</em>.</li></ul>
<div class="note">Новая и важная информация стремится к концу предложения — это главный принцип для стилистических перестановок.</div>`,
ex: [["Sie ist gestern wegen der Erkältung früh nach Hause gegangen.", "Вчера она из-за простуды рано ушла домой."], ["Hast du es ihr schon gesagt?", "Ты ей уже сказал?"]],
q: [["Выберите естественный порядок:", ["Ich fahre mit dem Zug heute nach Berlin.", "Ich fahre heute mit dem Zug nach Berlin.", "Ich fahre nach Berlin heute mit dem Zug."], 1, "Te (heute) → Mo (mit dem Zug) → Lo (nach Berlin)."],
["Ich zeige ___. (es, ihm)", ["ihm es", "es ihm", "ihm das"], 1, "Местоимение в Akkusativ перед Dativ: es ihm."]] }
];
