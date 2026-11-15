(function () {
const add = (id, ...secs) => LEVELS.find(l => l.id === id).sections.push(...secs);

add("A0", { t: "Вопросы о себе", d: "phrase", w: `
Wann hast du Geburtstag?=когда у тебя день рождения?
Bist du verheiratet?=ты женат / замужем?
Hast du Kinder?=у тебя есть дети?
Hast du Geschwister?=у тебя есть братья и сёстры?
Was bist du von Beruf?=кто ты по профессии?
Wo arbeitest du?=где ты работаешь?
Welche Sprachen sprichst du?=на каких языках ты говоришь?
Was sind deine Hobbys?=какие у тебя хобби?
Was isst du gern?=что ты любишь есть?
Was trinkst du gern?=что ты любишь пить?
Wie ist deine Telefonnummer?=какой у тебя номер телефона?
Wie ist deine Adresse?=какой у тебя адрес?
Wie findest du das?=как тебе это?
Gefällt es dir?=тебе нравится?
Wie geht es deiner Familie?=как дела у твоей семьи?
Ich komme aus Moskau=я из Москвы
`});

add("A1", { t: "Комнаты и дела по дому", w: `
der Besen, Besen=веник
der Eimer, Eimer=ведро
das Handtuch, Handtücher=полотенце
die Seife, Seifen=мыло
die Zahnbürste, Zahnbürsten=зубная щётка
die Zahnpasta=зубная паста
das Shampoo, Shampoos=шампунь
der Kamm, Kämme=расчёска
die Steckdose, Steckdosen=розетка
der Wasserhahn, Wasserhähne=кран
die Klingel, Klingeln=звонок (дверной)
klingeln=звонить (в дверь)
kämmen=причёсывать
abtrocknen=вытирать
`});

add("A2", { t: "Мнение и реакции", d: "phrase", w: `
Das stimmt=это правда
Da hast du recht=тут ты прав
Ich bin dafür=я за
Ich bin dagegen=я против
Das ist mir egal=мне всё равно
Keine Ahnung=понятия не имею
Das kommt darauf an=это зависит от обстоятельств
Ich bin mir nicht sicher=я не уверен
Wie schade!=как жаль!
Das freut mich=я рад
Ich glaube schon=думаю, да
Ich glaube nicht=не думаю
Das klingt gut=звучит хорошо
Gute Idee!=хорошая идея!
Hast du Lust auf Kino?=хочешь в кино?
Wie wäre es mit morgen?=как насчёт завтра?
Lass uns gehen!=давай пойдём!
Das ist doch klar=это же ясно
`});

add("B1", { t: "Город и инфраструктура", w: `
die Infrastruktur=инфраструктура
der Nahverkehr=общественный транспорт (местный)
das Verkehrsmittel, Verkehrsmittel=транспортное средство
das Stadtviertel, Stadtviertel=район города
der Vorort, Vororte=пригород
der Stadtrand=окраина
die Fußgängerzone, Fußgängerzonen=пешеходная зона
das Einkaufszentrum, Einkaufszentren=торговый центр
die Grünanlage, Grünanlagen=сквер
der Spielplatz, Spielplätze=детская площадка
die Wohnsiedlung, Wohnsiedlungen=жилой квартал
das Hochhaus, Hochhäuser=высотный дом
das Gebäude, Gebäude=здание
der Einwohner, Einwohner=житель
die Lebensqualität=качество жизни
der Lärm=шум
die Abgase=выхлопные газы
die Stadtverwaltung=городская администрация
ländlich=сельский
städtisch=городской
belebt=оживлённый
überfüllt=переполненный
abgelegen=отдалённый
bauen=строить
sanieren=реконструировать
`});

add("B2", { t: "Дискуссия и спор", w: `
die Auseinandersetzung, Auseinandersetzungen=спор, столкновение
das Argument, Argumente=аргумент
das Gegenargument, Gegenargumente=контраргумент
die These, Thesen=тезис
der Einwand, Einwände=возражение
die Zustimmung=согласие
die Ablehnung=отказ, неприятие
der Vorschlag, Vorschläge=предложение
die Einigung=соглашение, договорённость
die Eskalation=эскалация
die Vermittlung=посредничество
der Streitpunkt, Streitpunkte=спорный вопрос
die Rechtfertigung=оправдание
die Überzeugung, Überzeugungen=убеждение
die Kontroverse, Kontroversen=разногласие
einwenden=возражать
entgegnen=возразить
erwidern=отвечать, возражать
beipflichten=соглашаться
einlenken=пойти на уступки
nachgeben=уступать
sich einigen=договариваться
rechtfertigen=оправдывать
übertreiben=преувеличивать
sich durchsetzen=добиваться своего
unvoreingenommen=непредвзятый
überzeugend=убедительный
widersprüchlich=противоречивый
`});

add("C1", { t: "Коммуникация и медиа C1", w: `
die Deutungshoheit=монополия на интерпретацию
die Meinungsbildung=формирование мнения
die öffentliche Meinung=общественное мнение
der Diskurs, Diskurse=дискурс
die Polarisierung=поляризация
die Desinformation=дезинформация
die Echokammer, Echokammern=эхо-камера
die Filterblase, Filterblasen=информационный пузырь
die Medienkompetenz=медиаграмотность
der Leitartikel, Leitartikel=передовица
die Enthüllung, Enthüllungen=разоблачение
der Informant, Informanten=информатор
die Hetze=травля
die Verschwörungstheorie, Verschwörungstheorien=теория заговора
die Rhetorik=риторика
die Wortmeldung, Wortmeldungen=выступление (просьба слова)
die Pressekonferenz, Pressekonferenzen=пресс-конференция
das Dementi=опровержение
dementieren=опровергать
aufdecken=раскрывать
anprangern=клеймить, осуждать
polarisieren=поляризовать
verharmlosen=преуменьшать
aufbauschen=раздувать
sensationslüstern=падкий на сенсации
tendenziös=тенденциозный
`},
{ t: "Управление и карьера C1", w: `
die Unternehmenskultur=корпоративная культура
die Führungsposition, Führungspositionen=руководящая должность
der Führungsstil, Führungsstile=стиль руководства
die Zielvereinbarung, Zielvereinbarungen=соглашение о целях
die Kennziffer, Kennziffern=показатель
die Zuständigkeitsverteilung=распределение обязанностей
die Delegation=делегирование
die Arbeitsbelastung=рабочая нагрузка
die Personalabteilung=отдел кадров
die Stellenausschreibung, Stellenausschreibungen=объявление о вакансии
das Arbeitszeugnis, Arbeitszeugnisse=характеристика с работы
die Abfindung, Abfindungen=выходное пособие
der Betriebsrat=производственный совет
die Kündigungsfrist=срок уведомления об увольнении
die Mitarbeiterbindung=удержание сотрудников
das Burnout=выгорание
die Work-Life-Balance=баланс работы и жизни
die Umstrukturierung=реструктуризация
der Stellenabbau=сокращение штата
delegieren=делегировать
koordinieren=координировать
priorisieren=расставлять приоритеты
umstrukturieren=реструктурировать
sich profilieren=проявить себя
zielstrebig=целеустремлённый
lösungsorientiert=ориентированный на решение
eigenverantwortlich=самостоятельный, под свою ответственность
souverän=уверенный, суверенный
kompetent=компетентный
`},
{ t: "Время, изменения и процессы", w: `
der Verlauf=ход, течение
der Wendepunkt, Wendepunkte=поворотный момент
der Umbruch, Umbrüche=перелом, переворот
der Stillstand=застой
die Stagnation=стагнация
der Rückgang=спад, снижение
der Anstieg=рост
die Zuspitzung=обострение
die Verschärfung=ужесточение
die Lockerung=смягчение
der Übergang, Übergänge=переход
die Beschleunigung=ускорение
die Verzögerung, Verzögerungen=задержка
allmählich=постепенно
schlagartig=внезапно
fortwährend=постоянно
zeitweilig=временно
nachträglich=задним числом
vorläufig=предварительно
langfristig=долгосрочно
kurzfristig=краткосрочно
sich wandeln=меняться
stagnieren=стагнировать
sich verschärfen=обостряться
`});
})();
