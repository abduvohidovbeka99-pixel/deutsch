window.GRAMMAR = {
A0: [
{ t: "Алфавит и произношение", s: "Как читаются немецкие буквы и сочетания",
r: `<p>Немецкий читается почти так же, как пишется. Достаточно выучить несколько правил чтения.</p>
<table><tr><th>Буквы</th><th>Звук</th><th>Пример</th></tr>
<tr><td>ä</td><td>[э]</td><td>Mädchen — девочка</td></tr>
<tr><td>ö</td><td>[ё] губы трубочкой</td><td>schön — красивый</td></tr>
<tr><td>ü</td><td>[ю] губы трубочкой</td><td>über — над</td></tr>
<tr><td>ß</td><td>[с]</td><td>Straße — улица</td></tr>
<tr><td>ei</td><td>[ай]</td><td>mein — мой</td></tr>
<tr><td>ie</td><td>долгое [и]</td><td>Liebe — любовь</td></tr>
<tr><td>eu, äu</td><td>[ой]</td><td>neu — новый, Häuser — дома</td></tr>
<tr><td>sch</td><td>[ш]</td><td>Schule — школа</td></tr>
<tr><td>sp, st (в начале)</td><td>[шп], [шт]</td><td>Sport, Stadt</td></tr>
<tr><td>ch</td><td>[х] или мягкое [хь]</td><td>Buch, ich</td></tr>
<tr><td>z, tz</td><td>[ц]</td><td>Zeit, Katze</td></tr>
<tr><td>v</td><td>обычно [ф]</td><td>Vater</td></tr>
<tr><td>w</td><td>[в]</td><td>Wasser</td></tr>
<tr><td>h после гласной</td><td>не читается, удлиняет гласную</td><td>gehen</td></tr>
<tr><td>-er в конце</td><td>почти [а]</td><td>Lehrer</td></tr></table>
<div class="note">Все существительные в немецком пишутся с большой буквы: <em>der Tisch</em>, <em>die Liebe</em>.</div>`,
ex: [["Ich heiße Anna.", "Меня зовут Анна."], ["Die Straße ist schön.", "Улица красивая."], ["Wie spät ist es?", "Который час?"]],
q: [["Как читается «ei» в слове mein?", ["[эй]", "[ай]", "[ей]"], 1, "ei всегда читается как [ай]."],
["Как читается «eu» в слове neu?", ["[ой]", "[эу]", "[ю]"], 0, "eu и äu читаются как [ой]."],
["Какое слово пишется правильно?", ["das haus", "das Haus", "Das haus"], 1, "Существительные всегда с большой буквы."]] },

{ t: "Артикли der, die, das", s: "Род существительных и определённый/неопределённый артикль",
r: `<p>У каждого немецкого существительного есть род: мужской, женский или средний. Род показывает <em>артикль</em>. Его нужно учить вместе со словом.</p>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Множ. число</th></tr>
<tr><td>Определённый</td><td>der Tisch</td><td>die Lampe</td><td>das Buch</td><td>die Bücher</td></tr>
<tr><td>Неопределённый</td><td>ein Tisch</td><td>eine Lampe</td><td>ein Buch</td><td>— Bücher</td></tr>
<tr><td>Отрицательный</td><td>kein Tisch</td><td>keine Lampe</td><td>kein Buch</td><td>keine Bücher</td></tr></table>
<h3>Когда какой</h3>
<ul><li><em>ein/eine</em> — предмет упоминается впервые, «какой-то»: Das ist ein Hund.</li>
<li><em>der/die/das</em> — предмет уже известен: Der Hund ist groß.</li></ul>
<h3>Подсказки по роду</h3>
<ul><li>Женский: окончания -ung, -heit, -keit, -schaft, -ion, -tät, большинство на -e (die Zeitung, die Freiheit).</li>
<li>Средний: -chen, -lein (уменьшительные), -um, -ment (das Mädchen, das Museum).</li>
<li>Мужской: дни недели, месяцы, времена года, -er у профессий, -ismus (der Montag, der Lehrer).</li></ul>
<div class="note">Род в немецком часто не совпадает с русским: <em>das Mädchen</em> (девочка) — среднего рода.</div>`,
ex: [["Das ist ein Buch. Das Buch ist neu.", "Это книга. Книга новая."], ["Ich habe keine Zeit.", "У меня нет времени."], ["Die Zeitung liegt auf dem Tisch.", "Газета лежит на столе."]],
q: [["___ Zeitung (газета)", ["der", "die", "das"], 1, "Слова на -ung всегда женского рода."],
["___ Mädchen (девочка)", ["der", "die", "das"], 2, "Слова на -chen всегда среднего рода."],
["___ Montag (понедельник)", ["der", "die", "das"], 0, "Дни недели — мужского рода."],
["Das ist ___ Katze. (впервые упоминаем)", ["ein", "eine", "der"], 1, "Katze — женского рода, неопределённый артикль eine."]] },

{ t: "Личные местоимения", s: "ich, du, er, sie, es и вежливое Sie",
r: `<table><tr><th>Лицо</th><th>Ед. число</th><th>Мн. число</th></tr>
<tr><td>1</td><td>ich — я</td><td>wir — мы</td></tr>
<tr><td>2</td><td>du — ты</td><td>ihr — вы (неформально)</td></tr>
<tr><td>3</td><td>er / sie / es — он / она / оно</td><td>sie — они</td></tr>
<tr><td>вежл.</td><td colspan="2">Sie — Вы (всегда с большой буквы, глагол как у «они»)</td></tr></table>
<div class="note">Местоимение заменяет существительное по <em>грамматическому</em> роду: der Tisch → <em>er</em>, die Lampe → <em>sie</em>, das Buch → <em>es</em>.</div>
<p><em>du</em> — для друзей, семьи, детей. <em>Sie</em> — для незнакомых взрослых, на работе, в магазине.</p>`,
ex: [["Wo ist der Schlüssel? — Er ist hier.", "Где ключ? — Он здесь."], ["Kommen Sie aus Berlin?", "Вы из Берлина?"], ["Wir lernen Deutsch.", "Мы учим немецкий."]],
q: [["Das Buch ist neu. ___ ist interessant.", ["Er", "Sie", "Es"], 2, "das Buch → es."],
["Обращение к незнакомому взрослому:", ["du", "Sie", "ihr"], 1, "Вежливая форма — Sie."],
["Anna und ich = ___", ["wir", "ihr", "sie"], 0, "«Анна и я» = мы."]] },

{ t: "Глаголы sein и haben", s: "Быть и иметь — самые важные глаголы",
r: `<p>Эти глаголы неправильные, их формы нужно выучить наизусть.</p>
<table><tr><th></th><th>sein (быть)</th><th>haben (иметь)</th></tr>
<tr><td>ich</td><td>bin</td><td>habe</td></tr>
<tr><td>du</td><td>bist</td><td>hast</td></tr>
<tr><td>er/sie/es</td><td>ist</td><td>hat</td></tr>
<tr><td>wir</td><td>sind</td><td>haben</td></tr>
<tr><td>ihr</td><td>seid</td><td>habt</td></tr>
<tr><td>sie/Sie</td><td>sind</td><td>haben</td></tr></table>
<div class="note">В отличие от русского, глагол-связку нельзя пропускать: «Я студент» = <em>Ich bin</em> Student. Профессию говорят без артикля.</div>
<p>«У меня есть…» = <em>Ich habe …</em> (а не «у меня»).</p>`,
ex: [["Ich bin müde.", "Я устал."], ["Hast du Zeit?", "У тебя есть время?"], ["Wir sind aus Russland.", "Мы из России."], ["Sie hat zwei Kinder.", "У неё двое детей."]],
q: [["Du ___ sehr nett.", ["bin", "bist", "ist"], 1, "du → bist."],
["Wir ___ keine Zeit.", ["haben", "habt", "hat"], 0, "wir → haben."],
["Ihr ___ Studenten.", ["sind", "seid", "seit"], 1, "ihr → seid (seit — это предлог «с»)."],
["Er ___ einen Bruder.", ["habe", "hast", "hat"], 2, "er → hat."]] },

{ t: "Порядок слов: глагол на 2-м месте", s: "Главное правило немецкого предложения",
r: `<p>В повествовательном предложении спрягаемый глагол всегда стоит на <em>втором месте</em>. На первом может стоять подлежащее, время, место или дополнение — тогда подлежащее идёт сразу после глагола.</p>
<table><tr><th>1</th><th>2 (глагол)</th><th>Остальное</th></tr>
<tr><td>Ich</td><td>lerne</td><td>heute Deutsch.</td></tr>
<tr><td>Heute</td><td>lerne</td><td>ich Deutsch.</td></tr>
<tr><td>Deutsch</td><td>lerne</td><td>ich heute.</td></tr></table>
<div class="note">Нельзя: <s>Heute ich lerne</s>. Если первое место занято не подлежащим, подлежащее «перепрыгивает» за глагол (инверсия).</div>`,
ex: [["Morgen fahre ich nach Berlin.", "Завтра я еду в Берлин."], ["Am Abend sehe ich fern.", "Вечером я смотрю телевизор."]],
q: [["Выберите правильный вариант:", ["Heute ich arbeite.", "Heute arbeite ich.", "Heute arbeite."], 1, "Глагол на 2-м месте, подлежащее после него."],
["Am Samstag ___ wir ins Kino.", ["gehen", "wir gehen", "gehen wir"], 0, "После «Am Samstag» сразу глагол, затем wir."]] },

{ t: "Вопросы", s: "W-вопросы и вопросы «да/нет»",
r: `<h3>Вопрос с вопросительным словом</h3>
<p>Вопросительное слово (W-Wort) на 1-м месте, глагол на 2-м: <em>Wo wohnst du?</em></p>
<table><tr><th>Слово</th><th>Значение</th></tr><tr><td>wer</td><td>кто</td></tr><tr><td>was</td><td>что</td></tr><tr><td>wo / woher / wohin</td><td>где / откуда / куда</td></tr><tr><td>wann</td><td>когда</td></tr><tr><td>warum</td><td>почему</td></tr><tr><td>wie / wie viel</td><td>как / сколько</td></tr></table>
<h3>Вопрос «да/нет»</h3>
<p>Глагол стоит на <em>первом</em> месте: <em>Kommst du heute?</em> — Ja / Nein.</p>
<div class="note">На отрицательный вопрос отвечают <em>doch</em>, если ответ утвердительный: Kommst du nicht? — Doch! (Нет, приду!)</div>`,
ex: [["Woher kommen Sie?", "Откуда Вы?"], ["Sprichst du Deutsch?", "Ты говоришь по-немецки?"], ["Hast du keinen Hunger? — Doch!", "Ты не голоден? — Нет, голоден!"]],
q: [["___ wohnst du? — In Hamburg.", ["Wo", "Wohin", "Wer"], 0, "Где? — Wo."],
["___ du Kaffee? (Ты пьёшь кофе?)", ["Trinkst", "Du trinkst", "Was trinkst"], 0, "В вопросе да/нет глагол на 1-м месте."],
["Bist du nicht müde? — ___, ich bin sehr müde.", ["Ja", "Doch", "Nein"], 1, "Утвердительный ответ на отрицательный вопрос — doch."]] }
],

A1: [
{ t: "Спряжение правильных глаголов", s: "Окончания в настоящем времени (Präsens)",
r: `<p>Берём основу (инфинитив без -en) и добавляем окончания:</p>
<table><tr><th></th><th>окончание</th><th>machen</th><th>arbeiten*</th></tr>
<tr><td>ich</td><td>-e</td><td>mache</td><td>arbeite</td></tr>
<tr><td>du</td><td>-st</td><td>machst</td><td>arbeitest</td></tr>
<tr><td>er/sie/es</td><td>-t</td><td>macht</td><td>arbeitet</td></tr>
<tr><td>wir</td><td>-en</td><td>machen</td><td>arbeiten</td></tr>
<tr><td>ihr</td><td>-t</td><td>macht</td><td>arbeitet</td></tr>
<tr><td>sie/Sie</td><td>-en</td><td>machen</td><td>arbeiten</td></tr></table>
<div class="note">* Если основа кончается на -t/-d, добавляется -e-: du arbeit<em>e</em>st, er find<em>e</em>t. Если на -s/-ß/-z, у du только -t: du heißt, du tanzt.</div>
<p>Präsens используется и для будущего: <em>Morgen fahre ich.</em></p>`,
ex: [["Wir wohnen in München.", "Мы живём в Мюнхене."], ["Was machst du?", "Что ты делаешь?"], ["Er arbeitet viel.", "Он много работает."]],
q: [["Du ___ (lernen) Deutsch.", ["lernst", "lernt", "lerne"], 0, "du → -st."],
["Sie (она) ___ (warten).", ["wartt", "wartet", "warten"], 1, "Основа на -t: добавляется -e-."],
["Ihr ___ (spielen) Fußball.", ["spielen", "spielst", "spielt"], 2, "ihr → -t."],
["Wie ___ du? (heißen)", ["heißst", "heißt", "heißest"], 1, "Основа на -ß: du heißt."]] },

{ t: "Сильные глаголы: смена гласной", s: "e → i/ie, a → ä у du и er/sie/es",
r: `<p>У части неправильных глаголов в формах <em>du</em> и <em>er/sie/es</em> меняется корневая гласная.</p>
<table><tr><th>Тип</th><th>Инфинитив</th><th>du</th><th>er/sie/es</th></tr>
<tr><td>e → i</td><td>sprechen, essen, geben, helfen, nehmen</td><td>sprichst, isst, gibst</td><td>spricht, isst, gibt, hilft, nimmt</td></tr>
<tr><td>e → ie</td><td>sehen, lesen</td><td>siehst, liest</td><td>sieht, liest</td></tr>
<tr><td>a → ä</td><td>fahren, schlafen, tragen, waschen</td><td>fährst, schläfst</td><td>fährt, schläft</td></tr>
<tr><td>au → äu</td><td>laufen</td><td>läufst</td><td>läuft</td></tr></table>
<div class="note">У ich, wir, ihr, sie гласная не меняется: ich spreche, wir fahren.</div>`,
ex: [["Er spricht gut Deutsch.", "Он хорошо говорит по-немецки."], ["Fährst du mit dem Bus?", "Ты едешь на автобусе?"], ["Sie liest ein Buch.", "Она читает книгу."]],
q: [["Er ___ (essen) gern Pizza.", ["esst", "isst", "eßt"], 1, "essen: e → i, er isst."],
["Du ___ (schlafen) lange.", ["schlafst", "schläfst", "schläft"], 1, "a → ä у du."],
["Wir ___ (sehen) einen Film.", ["sehen", "sieht", "siehen"], 0, "У wir гласная не меняется."]] },

{ t: "Винительный падеж (Akkusativ)", s: "Кого? Что? — прямое дополнение",
r: `<p>Akkusativ отвечает на вопросы <em>wen? / was?</em> (кого? что?). Меняется только <em>мужской род</em>!</p>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Мн. ч.</th></tr>
<tr><td>Nominativ</td><td>der / ein / kein</td><td>die / eine</td><td>das / ein</td><td>die / keine</td></tr>
<tr><td>Akkusativ</td><td><em>den / einen / keinen</em></td><td>die / eine</td><td>das / ein</td><td>die / keine</td></tr></table>
<p>Местоимения в Akkusativ: mich, dich, ihn, sie, es, uns, euch, sie, Sie.</p>
<p>Глаголы с Akkusativ: haben, brauchen, kaufen, sehen, essen, suchen, möchten, es gibt …</p>
<p>Предлоги с Akkusativ: <em>durch, für, gegen, ohne, um</em>.</p>`,
ex: [["Ich habe einen Bruder.", "У меня есть брат."], ["Ich kaufe den Tisch.", "Я покупаю (этот) стол."], ["Das Geschenk ist für dich.", "Подарок для тебя."], ["Es gibt keinen Kaffee.", "Кофе нет."]],
q: [["Ich brauche ___ Stuhl. (der Stuhl)", ["ein", "einen", "einem"], 1, "Мужской род в Akkusativ: einen."],
["Siehst du ___ Frau?", ["die", "den", "der"], 0, "Женский род не меняется."],
["Wir kaufen ___ Auto.", ["einen", "ein", "eine"], 1, "Средний род не меняется: ein."],
["Ich liebe ___. (он)", ["er", "ihn", "ihm"], 1, "er → ihn в Akkusativ."]] },

{ t: "Отрицание: nicht и kein", s: "Когда что использовать",
r: `<ul><li><em>kein</em> отрицает существительное с неопределённым артиклем или без артикля. Склоняется как ein: kein, keine, keinen.</li>
<li><em>nicht</em> отрицает всё остальное: глагол, прилагательное, наречие, существительное с определённым артиклем, имена.</li></ul>
<table><tr><th>Утверждение</th><th>Отрицание</th></tr>
<tr><td>Ich habe ein Auto.</td><td>Ich habe <em>kein</em> Auto.</td></tr>
<tr><td>Ich trinke Milch.</td><td>Ich trinke <em>keine</em> Milch.</td></tr>
<tr><td>Das Auto ist neu.</td><td>Das Auto ist <em>nicht</em> neu.</td></tr>
<tr><td>Ich komme heute.</td><td>Ich komme heute <em>nicht</em>.</td></tr></table>
<div class="note">nicht обычно стоит в конце предложения или перед тем словом, которое отрицается: Ich wohne <em>nicht</em> in Berlin.</div>`,
ex: [["Ich habe keine Kinder.", "У меня нет детей."], ["Das ist nicht mein Buch.", "Это не моя книга."], ["Er spielt nicht gern Fußball.", "Он не любит играть в футбол."]],
q: [["Ich habe ___ Hunger.", ["nicht", "keinen", "kein"], 1, "der Hunger без артикля → keinen."],
["Das Wetter ist ___ gut.", ["nicht", "kein", "keine"], 0, "Прилагательное отрицается nicht."],
["Wir haben ___ Zeit.", ["nicht", "kein", "keine"], 2, "die Zeit → keine."]] },

{ t: "Модальные глаголы", s: "können, müssen, wollen, dürfen, sollen, mögen/möchten",
r: `<table><tr><th></th><th>können</th><th>müssen</th><th>wollen</th><th>dürfen</th><th>sollen</th><th>möchten</th></tr>
<tr><td>ich</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>du</td><td>kannst</td><td>musst</td><td>willst</td><td>darfst</td><td>sollst</td><td>möchtest</td></tr>
<tr><td>er/sie/es</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>wir</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td><td>möchten</td></tr></table>
<p>Модальный глагол на 2-м месте, основной глагол в <em>инфинитиве в конце</em> — это «рамка».</p>
<div class="note">ich и er/sie/es имеют одинаковую форму без окончания: ich kann, er kann.</div>
<ul><li>können — мочь, уметь</li><li>müssen — должен (необходимость)</li><li>wollen — хотеть (твёрдо)</li><li>möchten — хотел бы (вежливо)</li><li>dürfen — можно, разрешено</li><li>sollen — должен (кто-то велел)</li></ul>`,
ex: [["Ich kann gut schwimmen.", "Я хорошо умею плавать."], ["Du musst heute arbeiten.", "Тебе нужно сегодня работать."], ["Hier darf man nicht rauchen.", "Здесь нельзя курить."], ["Ich möchte einen Kaffee trinken.", "Я хотел бы выпить кофе."]],
q: [["Er ___ Deutsch sprechen.", ["kannt", "kann", "können"], 1, "er kann — без окончания."],
["Wo ist das Verb? «Ich muss morgen früh ___.»", ["aufstehen", "stehe auf", "aufstehe"], 0, "Основной глагол — инфинитив в конце."],
["Hier ___ man parken? — Ja, das ist erlaubt.", ["muss", "darf", "will"], 1, "Разрешение — dürfen."]] },

{ t: "Отделяемые приставки", s: "aufstehen → ich stehe auf",
r: `<p>Ударные приставки <em>an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, fern-, ab-, los-, weg-</em> отделяются и уходят в конец предложения.</p>
<table><tr><th>Инфинитив</th><th>Präsens</th></tr>
<tr><td>aufstehen</td><td>Ich stehe um 7 Uhr <em>auf</em>.</td></tr>
<tr><td>einkaufen</td><td>Wir kaufen heute <em>ein</em>.</td></tr>
<tr><td>anrufen</td><td>Rufst du mich <em>an</em>?</td></tr>
<tr><td>fernsehen</td><td>Er sieht abends <em>fern</em>.</td></tr></table>
<div class="note">Неотделяемые приставки <em>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</em> никогда не отделяются: Ich verstehe, ich bekomme.</div>
<p>С модальным глаголом приставка остаётся с глаголом: Ich muss früh <em>aufstehen</em>.</p>`,
ex: [["Der Zug kommt um 10 Uhr an.", "Поезд прибывает в 10 часов."], ["Machst du bitte das Fenster zu?", "Закроешь, пожалуйста, окно?"], ["Ich möchte dich einladen.", "Я хотел бы тебя пригласить."]],
q: [["Wann ___ du ___? (aufstehen)", ["stehst … auf", "aufstehst … —", "stehst … an"], 0, "Приставка auf в конец."],
["Ich ___ das Wort nicht. (verstehen)", ["stehe … ver", "verstehe", "verstehe … ver"], 1, "ver- не отделяется."],
["Wir müssen morgen ___. (einkaufen)", ["kaufen ein", "einkaufen", "ein kaufen"], 1, "С модальным глаголом — слитный инфинитив."]] },

{ t: "Множественное число", s: "Основные типы образования",
r: `<p>Во множественном числе артикль всегда <em>die</em>. Формы нужно учить вместе со словом, но есть закономерности:</p>
<table><tr><th>Окончание</th><th>Кто чаще</th><th>Пример</th></tr>
<tr><td>-(e)n</td><td>почти все женского рода</td><td>die Frau → die Frauen, die Lampe → die Lampen</td></tr>
<tr><td>-e (часто с умлаутом)</td><td>мужской род</td><td>der Tisch → die Tische, der Stuhl → die Stühle</td></tr>
<tr><td>-er (с умлаутом)</td><td>средний род, короткие</td><td>das Kind → die Kinder, das Buch → die Bücher</td></tr>
<tr><td>— (без окончания, иногда умлаут)</td><td>на -er, -el, -en, -chen</td><td>der Lehrer → die Lehrer, der Vater → die Väter</td></tr>
<tr><td>-s</td><td>заимствования, на гласную</td><td>das Auto → die Autos, das Handy → die Handys</td></tr></table>`,
ex: [["Ich habe zwei Kinder.", "У меня двое детей."], ["Die Bücher sind teuer.", "Книги дорогие."]],
q: [["die Frau → zwei ___", ["Fraue", "Frauen", "Fraus"], 1, "Женский род → -en."],
["das Kind → drei ___", ["Kinde", "Kinder", "Kinds"], 1, "das Kind → die Kinder."],
["das Auto → viele ___", ["Autos", "Auten", "Autoe"], 0, "Заимствование → -s."]] },

{ t: "Притяжательные местоимения", s: "mein, dein, sein, ihr …",
r: `<table><tr><th>Лицо</th><th>Местоимение</th></tr>
<tr><td>ich → mein</td><td>wir → unser</td></tr>
<tr><td>du → dein</td><td>ihr → euer</td></tr>
<tr><td>er/es → sein</td><td>sie (они) → ihr</td></tr>
<tr><td>sie (она) → ihr</td><td>Sie → Ihr</td></tr></table>
<p>Они склоняются как <em>ein / kein</em>: mein Vater, mein<em>e</em> Mutter, mein Kind, mein<em>e</em> Eltern; в Akkusativ: mein<em>en</em> Vater.</p>
<div class="note">Русское «свой» переводится по лицу: Er liebt <em>seine</em> Frau. Sie liebt <em>ihren</em> Mann.</div>`,
ex: [["Das ist meine Schwester.", "Это моя сестра."], ["Wo ist dein Handy?", "Где твой телефон?"], ["Wir besuchen unsere Eltern.", "Мы навещаем наших родителей."]],
q: [["Anna sucht ___ Schlüssel. (der Schlüssel, её)", ["ihr", "ihren", "seinen"], 1, "Её → ihr, мужской род в Akk → ihren."],
["Das ist ___ Auto. (наш)", ["unser", "unsere", "unseren"], 0, "das Auto → unser."],
["Peter liebt ___ Katze.", ["ihre", "seine", "sein"], 1, "Его (Петер) → sein, die Katze → seine."]] },

{ t: "Повелительное наклонение (Imperativ)", s: "Просьбы и указания",
r: `<table><tr><th>Кому</th><th>Как образуется</th><th>Пример (kommen)</th></tr>
<tr><td>du</td><td>основа без -st и без du</td><td>Komm!</td></tr>
<tr><td>ihr</td><td>форма ihr без ihr</td><td>Kommt!</td></tr>
<tr><td>Sie</td><td>глагол + Sie</td><td>Kommen Sie!</td></tr></table>
<div class="note">Глаголы с e → i сохраняют смену: du sprichst → <em>Sprich!</em>, du nimmst → <em>Nimm!</em>. Но a → ä пропадает: du fährst → <em>Fahr!</em>. sein: Sei! Seid! Seien Sie!</div>
<p>Добавляйте <em>bitte</em> и <em>mal</em> для вежливости: Komm bitte mal her!</p>`,
ex: [["Hilf mir bitte!", "Помоги мне, пожалуйста!"], ["Seid leise!", "Тише!"], ["Nehmen Sie Platz.", "Присаживайтесь."], ["Mach das Fenster auf!", "Открой окно!"]],
q: [["(du, lesen) ___ den Text!", ["Lies", "Lese", "Liest"], 0, "e → ie сохраняется: Lies!"],
["(Sie, warten) ___!", ["Warte Sie", "Warten Sie", "Wartet"], 1, "Вежливо: глагол + Sie."],
["(du, sein) ___ ruhig!", ["Bist", "Sei", "Sein"], 1, "sein → Sei!"]] }
],

A2: [
{ t: "Прошедшее время Perfekt", s: "haben/sein + Partizip II",
r: `<p>Perfekt — главное прошедшее время в разговорной речи. Формула: <em>haben / sein</em> (на 2-м месте) + <em>Partizip II</em> (в конце).</p>
<h3>Partizip II</h3>
<table><tr><th>Тип</th><th>Схема</th><th>Пример</th></tr>
<tr><td>слабые</td><td>ge- + основа + -t</td><td>machen → gemacht, kaufen → gekauft</td></tr>
<tr><td>сильные</td><td>ge- + (изм. основа) + -en</td><td>sehen → gesehen, trinken → getrunken</td></tr>
<tr><td>отделяемые</td><td>приставка + ge + …</td><td>einkaufen → eingekauft, aufstehen → aufgestanden</td></tr>
<tr><td>be-, ver-, er-… и -ieren</td><td>без ge-</td><td>besuchen → besucht, studieren → studiert</td></tr></table>
<h3>haben или sein?</h3>
<p><em>sein</em> — с глаголами движения и изменения состояния (gehen, fahren, kommen, fliegen, aufstehen, einschlafen, werden, sterben), а также sein и bleiben. Остальные — с <em>haben</em>.</p>`,
ex: [["Ich habe gestern Pizza gegessen.", "Вчера я ел пиццу."], ["Wir sind nach Spanien geflogen.", "Мы полетели в Испанию."], ["Hast du den Film gesehen?", "Ты видел фильм?"], ["Er ist um 6 Uhr aufgestanden.", "Он встал в 6 часов."]],
q: [["Ich ___ nach Hause gegangen.", ["habe", "bin", "war"], 1, "gehen — движение → sein."],
["Wir haben Deutsch ___.", ["gelernt", "gelernen", "lernt"], 0, "lernen — слабый: gelernt."],
["Sie hat ihre Oma ___.", ["gebesucht", "besucht", "besuchen"], 1, "be- → без ge-."],
["Er hat das Fenster ___. (aufmachen)", ["geaufmacht", "aufgemacht", "aufmachte"], 1, "Отделяемая приставка: auf-ge-macht."]] },

{ t: "Дательный падеж (Dativ)", s: "Кому? Чему? Где?",
r: `<p>Dativ отвечает на вопрос <em>wem?</em> (кому?) и используется после ряда предлогов и глаголов.</p>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Мн. ч.</th></tr>
<tr><td>Определённый</td><td>dem</td><td>der</td><td>dem</td><td>den + -n</td></tr>
<tr><td>Неопределённый</td><td>einem</td><td>einer</td><td>einem</td><td>— (+ -n)</td></tr></table>
<p>Местоимения: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.</p>
<p>Глаголы с Dativ: <em>helfen, danken, gefallen, gehören, gratulieren, schmecken, antworten, passen, fehlen</em>.</p>
<p>Предлоги всегда с Dativ: <em>aus, bei, mit, nach, seit, von, zu, gegenüber</em>.</p>
<div class="note">Во множественном числе в Dativ к существительному добавляется -n: mit den Kinder<em>n</em>.</div>`,
ex: [["Ich helfe meinem Bruder.", "Я помогаю брату."], ["Das Kleid gefällt mir.", "Платье мне нравится."], ["Ich fahre mit dem Bus.", "Я еду на автобусе."], ["Sie wohnt bei ihrer Mutter.", "Она живёт у мамы."]],
q: [["Ich gebe ___ Frau das Buch.", ["die", "der", "den"], 1, "Женский род в Dativ → der."],
["Er kommt aus ___ Büro.", ["das", "dem", "den"], 1, "aus + Dativ, das → dem."],
["Kannst du ___ helfen? (я)", ["mich", "mir", "ich"], 1, "helfen + Dativ → mir."],
["Ich spiele mit den ___.", ["Kinder", "Kindern", "Kinds"], 1, "Мн. число в Dativ + -n."]] },

{ t: "Предлоги: Wechselpräpositionen", s: "Где? (Dativ) — Куда? (Akkusativ)",
r: `<p>9 предлогов могут требовать и Dativ, и Akkusativ: <em>in, an, auf, über, unter, vor, hinter, neben, zwischen</em>.</p>
<table><tr><th>Вопрос</th><th>Падеж</th><th>Пример</th></tr>
<tr><td>Wo? (где — место)</td><td>Dativ</td><td>Das Buch liegt auf <em>dem</em> Tisch.</td></tr>
<tr><td>Wohin? (куда — направление)</td><td>Akkusativ</td><td>Ich lege das Buch auf <em>den</em> Tisch.</td></tr></table>
<p>Пары глаголов: liegen (Dat) / legen (Akk), stehen / stellen, sitzen / setzen, hängen / hängen.</p>
<div class="note">Слияния: in dem → <em>im</em>, in das → <em>ins</em>, an dem → <em>am</em>, an das → <em>ans</em>.</div>`,
ex: [["Ich bin im Kino.", "Я в кино."], ["Ich gehe ins Kino.", "Я иду в кино."], ["Das Bild hängt an der Wand.", "Картина висит на стене."], ["Er stellt die Flasche in den Kühlschrank.", "Он ставит бутылку в холодильник."]],
q: [["Die Katze schläft unter ___ Bett.", ["das", "dem", "den"], 1, "Где? → Dativ: dem."],
["Wir gehen in ___ Park.", ["den", "dem", "der"], 0, "Куда? → Akkusativ: den."],
["Ich hänge die Lampe über ___ Tisch.", ["dem", "den", "der"], 1, "Куда вешаю? → Akkusativ."]] },

{ t: "Präteritum: sein, haben и модальные", s: "Простое прошедшее для самых частых глаголов",
r: `<p>Даже в разговоре глаголы <em>sein, haben</em> и модальные обычно употребляют в Präteritum, а не в Perfekt.</p>
<table><tr><th></th><th>sein</th><th>haben</th><th>können</th><th>müssen</th><th>wollen</th></tr>
<tr><td>ich</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td><td>wollte</td></tr>
<tr><td>du</td><td>warst</td><td>hattest</td><td>konntest</td><td>musstest</td><td>wolltest</td></tr>
<tr><td>er/sie/es</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td><td>wollte</td></tr>
<tr><td>wir</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td><td>wollten</td></tr>
<tr><td>ihr</td><td>wart</td><td>hattet</td><td>konntet</td><td>musstet</td><td>wolltet</td></tr>
<tr><td>sie/Sie</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td><td>wollten</td></tr></table>
<div class="note">У модальных умлаут пропадает: können → konnte, müssen → musste, dürfen → durfte.</div>`,
ex: [["Gestern war ich krank.", "Вчера я был болен."], ["Wir hatten keine Zeit.", "У нас не было времени."], ["Ich musste lange warten.", "Мне пришлось долго ждать."]],
q: [["Wo ___ du gestern? (sein)", ["war", "warst", "wart"], 1, "du → warst."],
["Er ___ nicht kommen. (können)", ["konnte", "könnte", "kannte"], 0, "Präteritum от können — konnte."],
["Wir ___ Glück. (haben)", ["hatten", "hätten", "habten"], 0, "wir → hatten."]] },

{ t: "Возвратные глаголы", s: "sich freuen, sich waschen …",
r: `<p>Возвратное местоимение <em>sich</em> меняется по лицам (как русское «-ся/себя»).</p>
<table><tr><th>Лицо</th><th>Akkusativ</th><th>Dativ</th></tr>
<tr><td>ich</td><td>mich</td><td>mir</td></tr><tr><td>du</td><td>dich</td><td>dir</td></tr>
<tr><td>er/sie/es</td><td>sich</td><td>sich</td></tr><tr><td>wir</td><td>uns</td><td>uns</td></tr>
<tr><td>ihr</td><td>euch</td><td>euch</td></tr><tr><td>sie/Sie</td><td>sich</td><td>sich</td></tr></table>
<p>Если в предложении есть ещё прямое дополнение, местоимение в Dativ: Ich wasche <em>mich</em>. → Ich wasche <em>mir</em> die Hände.</p>
<div class="note">Не все русские «-ся» возвратны в немецком и наоборот: учиться = lernen, но вспоминать = sich erinnern.</div>`,
ex: [["Ich freue mich auf den Urlaub.", "Я радуюсь предстоящему отпуску."], ["Wir treffen uns um acht.", "Мы встречаемся в восемь."], ["Ich putze mir die Zähne.", "Я чищу зубы."]],
q: [["Du musst ___ beeilen.", ["sich", "dich", "dir"], 1, "du → dich."],
["Wir interessieren ___ für Kunst.", ["sich", "uns", "euch"], 1, "wir → uns."],
["Ich kämme ___ die Haare.", ["mich", "mir", "sich"], 1, "Есть прямое дополнение → Dativ: mir."]] },

{ t: "Придаточные: weil, dass, wenn, ob", s: "Глагол уходит в конец",
r: `<p>В придаточном предложении спрягаемый глагол стоит <em>в самом конце</em>. Перед союзом ставится запятая.</p>
<table><tr><th>Союз</th><th>Значение</th><th>Пример</th></tr>
<tr><td>weil</td><td>потому что</td><td>…, weil ich krank <em>bin</em>.</td></tr>
<tr><td>dass</td><td>что</td><td>Ich glaube, dass er recht <em>hat</em>.</td></tr>
<tr><td>wenn</td><td>если / когда (повторно)</td><td>Wenn es regnet, <em>bleibe</em> ich zu Hause.</td></tr>
<tr><td>ob</td><td>ли</td><td>Ich weiß nicht, ob er <em>kommt</em>.</td></tr></table>
<div class="note">Если придаточное стоит первым, главное начинается с глагола: <em>Wenn ich Zeit habe, komme ich.</em> Отделяемая приставка в придаточном не отделяется: …, weil ich früh <em>aufstehe</em>.</div>
<p>Сравните: <em>denn</em> (так как) не меняет порядок слов: …, denn ich bin krank.</p>`,
ex: [["Ich komme nicht, weil ich arbeiten muss.", "Я не приду, потому что мне нужно работать."], ["Er sagt, dass er müde ist.", "Он говорит, что устал."], ["Weißt du, ob der Laden offen ist?", "Ты не знаешь, открыт ли магазин?"]],
q: [["Ich lerne Deutsch, weil ich in Berlin ___.", ["arbeite", "arbeiten", "arbeite ich"], 0, "Глагол в конце придаточного."],
["Wenn das Wetter gut ist, ___ wir spazieren.", ["wir gehen", "gehen", "gehen wir"], 2, "После придаточного главное начинается с глагола: gehen wir."],
["Kannst du mir sagen, ___ der Zug pünktlich ist?", ["dass", "ob", "wenn"], 1, "Косвенный вопрос «ли» → ob."]] },

{ t: "Степени сравнения", s: "schnell — schneller — am schnellsten",
r: `<table><tr><th>Положительная</th><th>Сравнительная (-er)</th><th>Превосходная (am -sten)</th></tr>
<tr><td>klein</td><td>kleiner</td><td>am kleinsten</td></tr>
<tr><td>alt</td><td>älter</td><td>am ältesten</td></tr>
<tr><td>groß</td><td>größer</td><td>am größten</td></tr>
<tr><td>gut</td><td>besser</td><td>am besten</td></tr>
<tr><td>viel</td><td>mehr</td><td>am meisten</td></tr>
<tr><td>gern</td><td>lieber</td><td>am liebsten</td></tr>
<tr><td>hoch</td><td>höher</td><td>am höchsten</td></tr></table>
<p>Сравнение: <em>so … wie</em> (такой же, как), <em>-er als</em> (более, чем).</p>
<div class="note">Короткие прилагательные с a, o, u часто получают умлаут: alt → älter, jung → jünger, warm → wärmer.</div>`,
ex: [["Mein Bruder ist älter als ich.", "Мой брат старше меня."], ["Berlin ist so schön wie Wien.", "Берлин такой же красивый, как Вена."], ["Am liebsten trinke ich Tee.", "Больше всего я люблю пить чай."]],
q: [["Der Zug ist schneller ___ der Bus.", ["wie", "als", "dann"], 1, "Сравнительная степень + als."],
["Sie spricht ___ Deutsch als ich. (gut)", ["guter", "besser", "am besten"], 1, "gut → besser."],
["Ich esse ___ Pizza. (больше всего люблю)", ["am liebsten", "am gernsten", "lieber"], 0, "gern → lieber → am liebsten."]] },

{ t: "Склонение прилагательных", s: "der neue Tisch, ein neuer Tisch",
r: `<p>Прилагательное перед существительным получает окончание. Главная идея: если артикль уже «показал» род и падеж, прилагательное берёт <em>-e/-en</em>; если не показал — прилагательное берёт окончание само.</p>
<h3>После der/die/das (Nominativ и Akkusativ)</h3>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Мн. ч.</th></tr>
<tr><td>Nom</td><td>der neu<em>e</em> Tisch</td><td>die neu<em>e</em> Lampe</td><td>das neu<em>e</em> Buch</td><td>die neu<em>en</em> Bücher</td></tr>
<tr><td>Akk</td><td>den neu<em>en</em> Tisch</td><td>die neu<em>e</em> Lampe</td><td>das neu<em>e</em> Buch</td><td>die neu<em>en</em> Bücher</td></tr></table>
<h3>После ein/eine</h3>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th></tr>
<tr><td>Nom</td><td>ein neu<em>er</em> Tisch</td><td>eine neu<em>e</em> Lampe</td><td>ein neu<em>es</em> Buch</td></tr>
<tr><td>Akk</td><td>einen neu<em>en</em> Tisch</td><td>eine neu<em>e</em> Lampe</td><td>ein neu<em>es</em> Buch</td></tr></table>
<div class="note">В Dativ после любого артикля окончание всегда <em>-en</em>: mit dem neu<em>en</em> Auto, mit einer neu<em>en</em> Lampe.</div>`,
ex: [["Ich habe einen neuen Job.", "У меня новая работа."], ["Das ist ein schönes Haus.", "Это красивый дом."], ["Der alte Mann wohnt hier.", "Старик живёт здесь."]],
q: [["Das ist ein ___ Auto. (neu)", ["neue", "neues", "neuer"], 1, "ein + средний род → -es."],
["Ich kaufe den ___ Pullover. (rot)", ["rote", "roten", "roter"], 1, "den → -en."],
["Ein ___ Mann steht da. (groß)", ["großer", "große", "großen"], 0, "ein + мужской Nom → -er."]] }
],

B1: [
{ t: "Präteritum всех глаголов", s: "Письменное прошедшее время",
r: `<p>Präteritum используется в книгах, статьях, отчётах и рассказах.</p>
<h3>Слабые глаголы: основа + -te</h3>
<p>machen → mach<em>te</em>, arbeiten → arbeit<em>ete</em>.</p>
<h3>Сильные глаголы: меняется корень, у ich/er нет окончания</h3>
<table><tr><th>Инфинитив</th><th>Präteritum</th><th>Perfekt</th></tr>
<tr><td>gehen</td><td>ging</td><td>ist gegangen</td></tr><tr><td>kommen</td><td>kam</td><td>ist gekommen</td></tr>
<tr><td>sehen</td><td>sah</td><td>hat gesehen</td></tr><tr><td>geben</td><td>gab</td><td>hat gegeben</td></tr>
<tr><td>finden</td><td>fand</td><td>hat gefunden</td></tr><tr><td>schreiben</td><td>schrieb</td><td>hat geschrieben</td></tr>
<tr><td>fahren</td><td>fuhr</td><td>ist gefahren</td></tr><tr><td>nehmen</td><td>nahm</td><td>hat genommen</td></tr>
<tr><td>bleiben</td><td>blieb</td><td>ist geblieben</td></tr><tr><td>denken</td><td>dachte</td><td>hat gedacht</td></tr>
<tr><td>wissen</td><td>wusste</td><td>hat gewusst</td></tr><tr><td>werden</td><td>wurde</td><td>ist geworden</td></tr></table>
<p>Окончания: ich ging, du ging<em>st</em>, er ging, wir ging<em>en</em>, ihr ging<em>t</em>, sie ging<em>en</em>.</p>`,
ex: [["Es war einmal ein König.", "Жил-был король."], ["Sie öffnete die Tür und ging hinaus.", "Она открыла дверь и вышла."], ["Wir fuhren nach Italien.", "Мы поехали в Италию."]],
q: [["Gestern ___ er einen Brief. (schreiben)", ["schreibte", "schrieb", "schrob"], 1, "schreiben → schrieb."],
["Ich ___ das nicht. (wissen)", ["wusste", "wisste", "weißte"], 0, "wissen → wusste."],
["Wir ___ spät nach Hause. (kommen)", ["kommten", "kamen", "kammen"], 1, "kommen → kam, wir kamen."]] },

{ t: "Plusquamperfekt", s: "Предпрошедшее время",
r: `<p>Показывает действие, которое произошло <em>раньше</em> другого действия в прошлом.</p>
<p>Формула: <em>hatte / war</em> + Partizip II.</p>
<table><tr><th>Perfekt</th><th>Plusquamperfekt</th></tr>
<tr><td>Ich habe gegessen.</td><td>Ich <em>hatte</em> gegessen.</td></tr>
<tr><td>Er ist gegangen.</td><td>Er <em>war</em> gegangen.</td></tr></table>
<div class="note">Часто используется с союзом <em>nachdem</em>: Nachdem ich gegessen hatte, ging ich spazieren.</div>`,
ex: [["Als wir ankamen, war der Zug schon abgefahren.", "Когда мы пришли, поезд уже уехал."], ["Nachdem sie die Prüfung bestanden hatte, feierte sie.", "Сдав экзамен, она праздновала."]],
q: [["Er ___ den Film schon gesehen.", ["hatte", "war", "hat"], 0, "sehen → haben, Plusquamperfekt: hatte."],
["Wir ___ früh aufgestanden.", ["hatten", "waren", "haben"], 1, "aufstehen → sein: waren."]] },

{ t: "Konjunktiv II", s: "Пожелания, вежливые просьбы, нереальные условия",
r: `<h3>Формы</h3>
<table><tr><th>Глагол</th><th>Konjunktiv II</th></tr>
<tr><td>sein</td><td>wäre</td></tr><tr><td>haben</td><td>hätte</td></tr><tr><td>werden</td><td>würde</td></tr>
<tr><td>können</td><td>könnte</td></tr><tr><td>müssen</td><td>müsste</td></tr><tr><td>dürfen</td><td>dürfte</td></tr><tr><td>sollen / wollen</td><td>sollte / wollte</td></tr></table>
<p>Для остальных глаголов: <em>würde + инфинитив</em>: Ich würde gern reisen.</p>
<h3>Употребление</h3>
<ul><li>Вежливая просьба: <em>Könnten Sie mir helfen?</em></li>
<li>Желание: <em>Ich hätte gern einen Kaffee.</em> / <em>Wenn ich doch Zeit hätte!</em></li>
<li>Совет: <em>Du solltest mehr schlafen.</em></li>
<li>Нереальное условие: <em>Wenn ich reich wäre, würde ich ein Haus kaufen.</em></li></ul>
<div class="note">Прошлое: hätte/wäre + Partizip II: Wenn ich das gewusst hätte, wäre ich gekommen.</div>`,
ex: [["Wenn ich Zeit hätte, würde ich dich besuchen.", "Если бы у меня было время, я бы тебя навестил."], ["Könnten Sie bitte langsamer sprechen?", "Не могли бы Вы говорить медленнее?"], ["An deiner Stelle würde ich das nicht tun.", "На твоём месте я бы этого не делал."]],
q: [["Wenn ich du ___, würde ich zum Arzt gehen.", ["war", "wäre", "bin"], 1, "Нереальное условие: wäre."],
["___ Sie mir bitte das Salz geben?", ["Können", "Könnten", "Konnten"], 1, "Вежливая просьба: Könnten."],
["Du ___ mehr Sport machen. (совет)", ["solltest", "sollst", "solltet"], 0, "Совет: du solltest."]] },

{ t: "Пассив (Passiv)", s: "werden + Partizip II",
r: `<p>Пассив показывает действие, а не того, кто его делает. Формула: <em>werden</em> + Partizip II.</p>
<table><tr><th>Время</th><th>Пример</th></tr>
<tr><td>Präsens</td><td>Das Haus <em>wird gebaut</em>.</td></tr>
<tr><td>Präteritum</td><td>Das Haus <em>wurde gebaut</em>.</td></tr>
<tr><td>Perfekt</td><td>Das Haus <em>ist gebaut worden</em>.</td></tr>
<tr><td>С модальным</td><td>Das Haus <em>muss gebaut werden</em>.</td></tr></table>
<p>Исполнитель вводится через <em>von + Dativ</em>: Das Buch wurde <em>von</em> Goethe geschrieben.</p>
<div class="note">Akkusativ актива становится Nominativ пассива: Man repariert <em>den</em> Wagen → <em>Der</em> Wagen wird repariert.</div>`,
ex: [["Hier wird Deutsch gesprochen.", "Здесь говорят по-немецки."], ["Die Brücke wurde 1900 gebaut.", "Мост был построен в 1900 году."], ["Das Problem muss gelöst werden.", "Проблему нужно решить."]],
q: [["Die Briefe ___ morgen geschickt.", ["werden", "wird", "sind"], 0, "Множественное число → werden."],
["Das Auto ___ gestern repariert.", ["wird", "wurde", "würde"], 1, "Прошлое → wurde."],
["Der Roman ist 1990 geschrieben ___.", ["geworden", "worden", "werden"], 1, "В Perfekt пассива — worden без ge-."]] },

{ t: "Относительные придаточные", s: "der Mann, der …",
r: `<p>Относительное местоимение совпадает с определённым артиклем, кроме Dativ мн. ч. и Genitiv.</p>
<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Мн. ч.</th></tr>
<tr><td>Nom</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akk</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat</td><td>dem</td><td>der</td><td>dem</td><td><em>denen</em></td></tr>
<tr><td>Gen</td><td><em>dessen</em></td><td><em>deren</em></td><td><em>dessen</em></td><td><em>deren</em></td></tr></table>
<p><em>Род и число</em> берутся от слова, к которому относится местоимение, а <em>падеж</em> — от роли в придаточном. Глагол в конце.</p>`,
ex: [["Das ist der Mann, der neben mir wohnt.", "Это мужчина, который живёт рядом со мной."], ["Die Frau, der ich geholfen habe, ist Ärztin.", "Женщина, которой я помог, — врач."], ["Das sind die Kollegen, mit denen ich arbeite.", "Это коллеги, с которыми я работаю."]],
q: [["Der Film, ___ ich gesehen habe, war toll.", ["der", "den", "dem"], 1, "der Film, Akkusativ (что я видел) → den."],
["Die Kinder, ___ ich Geschenke gebe, freuen sich.", ["die", "denen", "deren"], 1, "Мн. ч. Dativ → denen."],
["Das ist der Nachbar, ___ Auto kaputt ist.", ["dessen", "deren", "dem"], 0, "Чей (мужской род) → dessen."]] },

{ t: "Будущее время Futur I", s: "werden + инфинитив",
r: `<p>Формула: <em>werden</em> (на 2-м месте) + <em>инфинитив</em> (в конце).</p>
<table><tr><th></th><th>werden</th></tr><tr><td>ich</td><td>werde</td></tr><tr><td>du</td><td>wirst</td></tr><tr><td>er/sie/es</td><td>wird</td></tr><tr><td>wir</td><td>werden</td></tr><tr><td>ihr</td><td>werdet</td></tr><tr><td>sie/Sie</td><td>werden</td></tr></table>
<ul><li>Планы и обещания: Ich <em>werde</em> dich anrufen.</li>
<li>Предположение: Er <em>wird</em> wohl krank sein. (Наверное, он болен.)</li></ul>
<div class="note">Если есть указание времени, чаще используют Präsens: Morgen fliege ich nach Rom.</div>`,
ex: [["Ich werde nächstes Jahr in Deutschland studieren.", "В следующем году я буду учиться в Германии."], ["Es wird morgen regnen.", "Завтра будет дождь."]],
q: [["Du ___ das schaffen!", ["wirst", "wird", "werdest"], 0, "du → wirst."],
["Wir werden morgen ___.", ["kommen", "gekommen", "kommt"], 0, "werden + инфинитив."]] },

{ t: "Родительный падеж (Genitiv)", s: "Чей? — принадлежность",
r: `<table><tr><th></th><th>Мужской</th><th>Женский</th><th>Средний</th><th>Мн. ч.</th></tr>
<tr><td>Определённый</td><td>des Mann<em>es</em></td><td>der Frau</td><td>des Kind<em>es</em></td><td>der Kinder</td></tr>
<tr><td>Неопределённый</td><td>eines Mann<em>es</em></td><td>einer Frau</td><td>eines Kind<em>es</em></td><td>—</td></tr></table>
<p>Мужской и средний род получают <em>-s</em> или <em>-es</em> (у коротких слов).</p>
<p>Предлоги с Genitiv: <em>wegen, trotz, während, statt, innerhalb, außerhalb</em>.</p>
<div class="note">С именами просто -s без апострофа: <em>Annas</em> Buch. В разговоре Genitiv часто заменяют на von + Dativ: das Auto von meinem Vater.</div>`,
ex: [["Das ist das Auto meines Vaters.", "Это машина моего отца."], ["Wegen des Regens bleiben wir zu Hause.", "Из-за дождя мы остаёмся дома."], ["Während der Woche arbeite ich viel.", "В течение недели я много работаю."]],
q: [["Die Farbe ___ Hauses ist weiß.", ["der", "des", "dem"], 1, "das Haus → des Hauses."],
["Trotz ___ Kälte gehen wir spazieren.", ["der", "die", "des"], 0, "die Kälte в Genitiv → der."],
["Das ist das Zimmer ___ Tochter.", ["meines", "meiner", "meine"], 1, "Женский род → meiner."]] },

{ t: "Инфинитив с zu", s: "Ich habe keine Lust, … zu …",
r: `<p>После многих глаголов, существительных и прилагательных инфинитив стоит с <em>zu</em> в конце.</p>
<ul><li>Глаголы: anfangen, aufhören, versuchen, vergessen, hoffen, planen, vorhaben, Lust haben, Zeit haben</li>
<li>Выражения: Es ist wichtig / schwer / schön, … zu …</li></ul>
<p>У отделяемых глаголов zu встаёт внутрь: an<em>zu</em>rufen, auf<em>zu</em>stehen.</p>
<div class="note">После модальных глаголов zu <em>не</em> нужно: Ich kann schwimmen (без zu).</div>
<h3>um … zu / ohne … zu / statt … zu</h3>
<p><em>um … zu</em> — чтобы (если подлежащее то же): Ich lerne Deutsch, um in Berlin zu arbeiten.</p>`,
ex: [["Ich habe vergessen, dich anzurufen.", "Я забыл тебе позвонить."], ["Es ist wichtig, regelmäßig zu üben.", "Важно регулярно упражняться."], ["Er ging, ohne ein Wort zu sagen.", "Он ушёл, не сказав ни слова."]],
q: [["Ich versuche, mehr Sport ___.", ["machen", "zu machen", "gemacht"], 1, "versuchen + zu."],
["Hast du Lust, heute ___?", ["auszugehen", "zu ausgehen", "ausgehen zu"], 0, "Отделяемый: aus-zu-gehen."],
["Ich muss heute ___.", ["arbeiten", "zu arbeiten", "arbeitet"], 0, "После модального — без zu."]] },

{ t: "da- и wo-слова", s: "darauf, worüber, damit …",
r: `<p>Когда глагол с предлогом относится к <em>предмету или идее</em> (не к человеку), вместо предлога + местоимения используют:</p>
<ul><li><em>da(r) + предлог</em> — в ответе: Ich warte <em>darauf</em>.</li>
<li><em>wo(r) + предлог</em> — в вопросе: <em>Worauf</em> wartest du?</li></ul>
<p>-r- вставляется, если предлог начинается с гласной: dar<em>a</em>uf, wor<em>ü</em>ber, dar<em>a</em>n.</p>
<div class="note">Для людей используется предлог + местоимение: Auf wen wartest du? — Auf meinen Bruder. Ich warte auf <em>ihn</em>.</div>`,
ex: [["Worüber sprecht ihr? — Über den Film.", "О чём вы говорите? — О фильме."], ["Ich freue mich darauf, dich zu sehen.", "Я радуюсь тому, что увижу тебя."], ["Womit fährst du? — Mit dem Rad.", "На чём ты едешь? — На велосипеде."]],
q: [["___ denkst du? — An meinen Urlaub.", ["Woran", "An was", "Worauf"], 0, "denken an → woran."],
["Interessierst du dich für Politik? — Ja, ich interessiere mich ___.", ["dafür", "für sie", "wofür"], 0, "Не человек → dafür."],
["___ wartest du? — Auf meine Freundin.", ["Worauf", "Auf wen", "Darauf"], 1, "Человек → auf wen."]] }
],

B2: [
{ t: "Konjunktiv I: косвенная речь", s: "Er sagt, er sei krank",
r: `<p>Konjunktiv I используется в новостях и официальных текстах, чтобы передать чужие слова без оценки.</p>
<table><tr><th></th><th>sein</th><th>haben</th><th>können</th><th>kommen</th></tr>
<tr><td>ich</td><td>sei</td><td>(hätte)</td><td>könne</td><td>(käme)</td></tr>
<tr><td>du</td><td>sei(e)st</td><td>habest</td><td>könnest</td><td>kommest</td></tr>
<tr><td>er/sie/es</td><td><em>sei</em></td><td><em>habe</em></td><td><em>könne</em></td><td><em>komme</em></td></tr>
<tr><td>wir</td><td>seien</td><td>(hätten)</td><td>(könnten)</td><td>(kämen)</td></tr>
<tr><td>sie</td><td>seien</td><td>(hätten)</td><td>(könnten)</td><td>(kämen)</td></tr></table>
<div class="note">Если форма Konjunktiv I совпадает с Präsens (wir haben), берут Konjunktiv II (hätten). Чаще всего встречается 3-е лицо ед. ч.: er habe, sie sei, es gebe.</div>
<p>Прошлое: <em>habe/sei + Partizip II</em>: Er sagte, er <em>sei</em> gestern krank <em>gewesen</em>.</p>`,
ex: [["Der Minister sagte, die Lage sei stabil.", "Министр сказал, что ситуация стабильна."], ["Sie behauptet, sie habe nichts gewusst.", "Она утверждает, что ничего не знала."], ["Laut Polizei gebe es keine Verletzten.", "По данным полиции, пострадавших нет."]],
q: [["Er sagt, er ___ keine Zeit.", ["habe", "hat", "hätte"], 0, "3-е лицо: habe."],
["Die Sprecherin erklärte, das Problem ___ gelöst.", ["ist", "sei", "wäre"], 1, "sein → sei."],
["Sie sagen, sie ___ keine Lust. (совпадает с Präsens)", ["haben", "hätten", "habe"], 1, "sie haben = Präsens → берём Konjunktiv II: hätten."]] },

{ t: "Пассив состояния и альтернативы пассиву", s: "Zustandspassiv, sich lassen, -bar",
r: `<h3>Zustandspassiv: sein + Partizip II</h3>
<p>Показывает результат, а не процесс: Die Tür <em>wird</em> geschlossen (её закрывают) → Die Tür <em>ist</em> geschlossen (она закрыта).</p>
<h3>Альтернативы пассиву с модальным значением</h3>
<table><tr><th>Конструкция</th><th>Пример</th><th>= Пассив</th></tr>
<tr><td>sich lassen + Inf.</td><td>Das Problem lässt sich lösen.</td><td>kann gelöst werden</td></tr>
<tr><td>sein + zu + Inf.</td><td>Die Regeln sind zu beachten.</td><td>müssen beachtet werden</td></tr>
<tr><td>-bar / -lich</td><td>Das ist machbar / unverständlich.</td><td>kann (nicht) gemacht / verstanden werden</td></tr>
<tr><td>man</td><td>Man sagt …</td><td>Es wird gesagt …</td></tr></table>`,
ex: [["Das Geschäft ist sonntags geschlossen.", "Магазин по воскресеньям закрыт."], ["Der Text lässt sich leicht übersetzen.", "Текст легко перевести."], ["Die Formulare sind bis Freitag abzugeben.", "Бланки нужно сдать до пятницы."]],
q: [["Das Fenster ___ schon geöffnet. (результат)", ["wird", "ist", "wurde"], 1, "Состояние → sein."],
["Diese Frage ___ sich nicht beantworten.", ["lässt", "ist", "wird"], 0, "sich lassen = можно."],
["Der Vertrag ist bis Montag ___.", ["unterschreiben", "zu unterschreiben", "unterschrieben"], 1, "sein + zu = нужно."]] },

{ t: "Причастия как прилагательные", s: "der lachende Junge, das gekaufte Buch",
r: `<table><tr><th>Причастие</th><th>Образование</th><th>Значение</th><th>Пример</th></tr>
<tr><td>Partizip I</td><td>инфинитив + d</td><td>активное, одновременное</td><td>das schlafend<em>e</em> Kind — спящий ребёнок</td></tr>
<tr><td>Partizip II</td><td>Partizip II</td><td>пассивное или завершённое</td><td>das gekocht<em>e</em> Ei — сваренное яйцо</td></tr></table>
<p>Причастие склоняется как обычное прилагательное. В письменной речи образуются длинные <em>распространённые определения</em>:</p>
<div class="note">die <em>seit Jahren in Berlin lebende</em> Familie = die Familie, die seit Jahren in Berlin lebt.</div>`,
ex: [["Der weinende Junge suchte seine Mutter.", "Плачущий мальчик искал маму."], ["Die gestern veröffentlichte Studie zeigt neue Ergebnisse.", "Опубликованное вчера исследование показывает новые результаты."]],
q: [["die ___ Preise (steigen)", ["steigenden", "gestiegenden", "steigten"], 0, "Процесс → Partizip I: steigend + -en."],
["das ___ Fenster (kaputt machen)", ["kaputtmachende", "kaputtgemachte", "kaputtmachte"], 1, "Результат → Partizip II."]] },

{ t: "Двойные союзы", s: "je … desto, weder … noch, zwar … aber",
r: `<table><tr><th>Союз</th><th>Значение</th><th>Пример</th></tr>
<tr><td>sowohl … als auch</td><td>как … так и</td><td>Sie spricht sowohl Deutsch als auch Englisch.</td></tr>
<tr><td>weder … noch</td><td>ни … ни</td><td>Er hat weder Zeit noch Geld.</td></tr>
<tr><td>entweder … oder</td><td>либо … либо</td><td>Entweder du kommst, oder ich gehe.</td></tr>
<tr><td>nicht nur … sondern auch</td><td>не только … но и</td><td>Das ist nicht nur teuer, sondern auch schlecht.</td></tr>
<tr><td>zwar … aber</td><td>хотя … но</td><td>Das Hotel ist zwar klein, aber gemütlich.</td></tr>
<tr><td>je … desto/umso</td><td>чем … тем</td><td>Je mehr ich lerne, desto besser verstehe ich.</td></tr>
<tr><td>einerseits … andererseits</td><td>с одной стороны … с другой</td><td>Einerseits will ich reisen, andererseits fehlt mir Geld.</td></tr></table>
<div class="note">В <em>je … desto</em>: после je глагол в конце, после desto + сравнительная степень сразу глагол.</div>`,
ex: [["Je älter er wird, desto ruhiger wird er.", "Чем старше он становится, тем спокойнее."], ["Wir können weder heute noch morgen kommen.", "Мы не можем прийти ни сегодня, ни завтра."]],
q: [["Je früher wir losfahren, ___ schneller sind wir da.", ["desto", "als", "so"], 0, "je … desto."],
["Ich trinke ___ Kaffee noch Tee.", ["entweder", "weder", "sowohl"], 1, "Ни … ни → weder … noch."],
["Das Auto ist zwar alt, ___ es fährt gut.", ["sondern", "aber", "oder"], 1, "zwar … aber."]] },

{ t: "Номинализация", s: "Из глаголов в существительные — стиль письменной речи",
r: `<p>В официальных и научных текстах действия часто выражаются существительными.</p>
<table><tr><th>Глагольный стиль</th><th>Номинальный стиль</th></tr>
<tr><td>weil die Preise steigen</td><td>wegen <em>des Anstiegs</em> der Preise</td></tr>
<tr><td>nachdem er angekommen war</td><td>nach <em>seiner Ankunft</em></td></tr>
<tr><td>wenn man die Regeln beachtet</td><td>bei <em>Beachtung</em> der Regeln</td></tr>
<tr><td>obwohl es regnete</td><td>trotz <em>des Regens</em></td></tr>
<tr><td>um Energie zu sparen</td><td>zum <em>Sparen</em> von Energie</td></tr></table>
<h3>Способы образования</h3>
<ul><li>инфинитив как существительное (das): das Lesen, das Schwimmen</li><li>суффикс -ung: entwickeln → die Entwicklung</li><li>корень без окончания: beginnen → der Beginn, besuchen → der Besuch</li></ul>`,
ex: [["Vor der Abreise müssen wir packen.", "Перед отъездом нужно собраться."], ["Nach Abschluss des Studiums fand sie eine Stelle.", "После окончания учёбы она нашла работу."]],
q: [["während wir essen → während des ___", ["Essen", "Essens", "Esses"], 1, "das Essen → Genitiv des Essens."],
["entscheiden → die ___", ["Entscheidung", "Entscheid", "Entscheidheit"], 0, "entscheiden → die Entscheidung."]] },

{ t: "n-склонение (N-Deklination)", s: "der Kunde → den Kunden",
r: `<p>Небольшая группа существительных <em>мужского рода</em> получает окончание <em>-(e)n</em> во всех падежах, кроме Nominativ ед. ч.</p>
<table><tr><th>Падеж</th><th>Ед. ч.</th></tr><tr><td>Nom</td><td>der Student</td></tr><tr><td>Akk</td><td>den Student<em>en</em></td></tr><tr><td>Dat</td><td>dem Student<em>en</em></td></tr><tr><td>Gen</td><td>des Student<em>en</em></td></tr></table>
<h3>Кто сюда относится</h3>
<ul><li>одушевлённые на -e: der Junge, der Kunde, der Kollege, der Neffe, der Russe</li>
<li>на -ent, -ant, -ist, -oge, -at: der Student, der Präsident, der Polizist, der Biologe, der Soldat</li>
<li>отдельные: der Mensch, der Herr (den Herrn), der Nachbar, der Bär</li></ul>
<div class="note">Особые: der Name → des Namens, der Gedanke → des Gedankens.</div>`,
ex: [["Ich frage den Polizisten.", "Я спрашиваю полицейского."], ["Kennst du meinen Kollegen?", "Ты знаешь моего коллегу?"]],
q: [["Ich helfe dem ___. (der Nachbar)", ["Nachbar", "Nachbarn", "Nachbars"], 1, "n-склонение: dem Nachbarn."],
["Wir haben einen neuen ___. (der Kunde)", ["Kunde", "Kunden", "Kundes"], 1, "Akkusativ → Kunden."]] },

{ t: "Модальные частицы", s: "doch, ja, mal, denn, eben, halt",
r: `<p>Частицы не переводятся дословно, но придают речи эмоцию и естественность.</p>
<table><tr><th>Частица</th><th>Функция</th><th>Пример</th></tr>
<tr><td>doch</td><td>настойчивость, упрёк</td><td>Komm doch mit! — Пойдём же с нами!</td></tr>
<tr><td>ja</td><td>известный факт, удивление</td><td>Das ist ja toll! — Да это же здорово!</td></tr>
<tr><td>mal</td><td>смягчение просьбы</td><td>Schau mal! — Посмотри-ка!</td></tr>
<tr><td>denn</td><td>интерес в вопросе</td><td>Was ist denn los? — Что случилось-то?</td></tr>
<tr><td>eben / halt</td><td>так уж есть, смирение</td><td>Das ist halt so. — Ну так уж вышло.</td></tr>
<tr><td>wohl</td><td>предположение</td><td>Er ist wohl krank. — Он, наверное, болен.</td></tr>
<tr><td>schon</td><td>успокоение</td><td>Das wird schon klappen. — Всё получится.</td></tr></table>`,
ex: [["Hilf mir doch mal!", "Да помоги же мне!"], ["Wo warst du denn?", "Где же ты был?"], ["Du weißt ja, wie er ist.", "Ты же знаешь, какой он."]],
q: [["Wie heißt du ___? (интерес в вопросе)", ["denn", "doch", "halt"], 0, "denn в вопросе."],
["Keine Sorge, das schaffst du ___!", ["schon", "denn", "mal"], 0, "Успокоение → schon."],
["Gib mir ___ das Salz, bitte.", ["mal", "ja", "denn"], 0, "Смягчение просьбы → mal."]] }
]
};
