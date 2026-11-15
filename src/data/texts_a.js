window.TEXTS = window.TEXTS || {};
// Формат вопроса: ["c", вопрос, [варианты], индекс верного] | ["t", утверждение, 1 = верно / 0 = неверно] | ["i", вопрос, [допустимые ответы]]
TEXTS.A0 = [
{ t: "Ich heiße Anna", x: `Hallo! Ich heiße Anna. Ich bin zwanzig Jahre alt. Ich komme aus Russland, aus Moskau. Jetzt wohne ich in Berlin. Ich bin Studentin. Ich lerne Deutsch. Deutsch ist schwer, aber schön. Ich spreche Russisch, Englisch und ein bisschen Deutsch. Mein Hobby ist Musik. Ich spiele Gitarre.`,
g: `ein bisschen=немного
schwer=трудный
die Studentin=студентка
das Hobby=хобби`,
q: [["c", "Сколько лет Анне?", ["18", "20", "22"], 1], ["c", "Где Анна живёт сейчас?", ["в Москве", "в Вене", "в Берлине"], 2], ["t", "Анна говорит по-английски.", 1], ["t", "Анна играет на пианино.", 0], ["i", "Откуда Анна? Напишите город по-немецки.", ["Moskau"]]] },

{ t: "Meine Familie", x: `Das ist meine Familie. Mein Vater heißt Peter. Er ist Lehrer. Meine Mutter heißt Maria. Sie ist Ärztin. Ich habe einen Bruder und eine Schwester. Mein Bruder heißt Tom. Er ist zehn Jahre alt. Meine Schwester heißt Lena. Sie ist ein Baby. Wir haben auch eine Katze. Die Katze heißt Mimi. Sie ist schwarz.`,
g: `die Ärztin=врач (женщина)
der Lehrer=учитель
auch=тоже`,
q: [["c", "Кто по профессии отец?", ["врач", "учитель", "водитель"], 1], ["c", "Сколько лет Тому?", ["5", "10", "12"], 1], ["t", "Лена — младенец.", 1], ["t", "У семьи есть собака.", 0], ["i", "Какого цвета кошка Мими? (по-немецки)", ["schwarz"]]] },

{ t: "Im Café", x: `Max ist im Café. Er hat Hunger und Durst. Die Kellnerin kommt. „Guten Tag! Was möchten Sie?“ „Ich möchte einen Kaffee und ein Stück Kuchen, bitte.“ „Mit Milch?“ „Ja, mit Milch, aber ohne Zucker.“ Der Kaffee ist heiß. Der Kuchen ist lecker. Max bezahlt. Das kostet sechs Euro. „Danke schön. Tschüss!“`,
g: `die Kellnerin=официантка
das Stück=кусок
ohne=без
bezahlen=платить`,
q: [["c", "Что заказывает Макс?", ["чай и суп", "кофе и пирог", "воду и хлеб"], 1], ["t", "Макс пьёт кофе с сахаром.", 0], ["t", "Пирог вкусный.", 1], ["c", "Сколько стоит заказ?", ["4 евро", "6 евро", "8 евро"], 1], ["i", "Что Макс добавляет в кофе? (по-немецки)", ["Milch"]]] },

{ t: "Mein Zimmer", x: `Mein Zimmer ist klein, aber schön. Das Fenster ist groß. Hier ist mein Bett. Das Bett ist neu. Neben dem Bett ist ein Tisch. Auf dem Tisch sind meine Bücher und mein Computer. Ich habe auch einen Stuhl und einen Schrank. Der Schrank ist alt und braun. An der Wand hängt ein Foto von meiner Familie. Ich mag mein Zimmer.`,
g: `neben=рядом с
an der Wand=на стене
hängen=висеть
mögen=любить, нравиться`,
q: [["t", "Комната большая.", 0], ["c", "Какая кровать?", ["старая", "новая", "большая"], 1], ["c", "Что висит на стене?", ["картина", "часы", "фото семьи"], 2], ["t", "Шкаф коричневый.", 1], ["i", "Что лежит на столе кроме компьютера? (по-немецки)", ["Bücher", "meine Bücher"]]] },

{ t: "Der Hund Bello", x: `Das ist Bello. Bello ist ein Hund. Er ist drei Jahre alt. Bello ist groß und braun. Er wohnt bei Familie Schmidt. Bello spielt gern im Garten. Er läuft schnell. Jeden Morgen geht Herr Schmidt mit Bello in den Park. Bello isst Fleisch und trinkt Wasser. Er schläft viel. Die Kinder lieben Bello.`,
g: `gern=охотно, с удовольствием
jeden Morgen=каждое утро
laufen=бегать`,
q: [["c", "Сколько лет Белло?", ["1", "3", "5"], 1], ["t", "Белло маленький и белый.", 0], ["c", "Куда господин Шмидт ходит с Белло утром?", ["в магазин", "в парк", "в школу"], 1], ["t", "Белло много спит.", 1], ["i", "Что пьёт Белло? (по-немецки)", ["Wasser"]]] },

{ t: "Mein Tag", x: `Ich stehe um sieben Uhr auf. Dann trinke ich Kaffee und esse ein Brötchen. Um acht Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite in einem Büro. Um zwölf Uhr esse ich zu Mittag. Um fünf Uhr gehe ich nach Hause. Am Abend koche ich und sehe fern. Um elf Uhr gehe ich ins Bett. Gute Nacht!`,
g: `aufstehen=вставать
zur Arbeit=на работу
zu Mittag essen=обедать
fernsehen=смотреть телевизор`,
q: [["c", "Во сколько человек встаёт?", ["в 6", "в 7", "в 8"], 1], ["c", "На чём он едет на работу?", ["на машине", "на автобусе", "на велосипеде"], 1], ["t", "Он работает в офисе.", 1], ["t", "Вечером он ходит в кино.", 0], ["i", "Во сколько он ложится спать? Напишите число по-немецки.", ["elf", "11", "um elf Uhr", "elf Uhr"]]] },

{ t: "Im Supermarkt", x: `Heute ist Samstag. Julia geht in den Supermarkt. Sie braucht Brot, Milch, Eier und Äpfel. Die Äpfel sind rot und grün. Julia nimmt ein Kilo. Sie kauft auch Käse und Tomaten. Sie möchte am Abend einen Salat machen. An der Kasse bezahlt sie zwölf Euro. Julia hat eine Tasche. Sie braucht keine Tüte.`,
g: `brauchen=нуждаться
die Kasse=касса
die Tüte=пакет`,
q: [["c", "Какой сегодня день?", ["пятница", "суббота", "воскресенье"], 1], ["t", "Юлия покупает рыбу.", 0], ["c", "Что Юлия хочет приготовить вечером?", ["суп", "пирог", "салат"], 2], ["t", "Юлии нужен пакет.", 0], ["i", "Сколько евро платит Юлия? (число)", ["12", "zwölf"]]] },

{ t: "Das Wetter heute", x: `Heute ist das Wetter schlecht. Es ist kalt und es regnet. Der Himmel ist grau. Es sind nur fünf Grad. Ich bleibe zu Hause. Ich trinke Tee und lese ein Buch. Morgen ist das Wetter gut. Die Sonne scheint und es ist warm. Morgen gehe ich in den Park. Ich spiele Fußball mit meinen Freunden.`,
g: `regnen=идти (о дожде)
der Grad=градус
bleiben=оставаться
scheinen=светить`,
q: [["t", "Сегодня солнечно.", 0], ["c", "Сколько сегодня градусов?", ["5", "10", "15"], 0], ["c", "Что человек делает сегодня?", ["играет в футбол", "пьёт чай и читает", "идёт в парк"], 1], ["t", "Завтра будет тепло.", 1], ["i", "Во что он играет завтра с друзьями? (по-немецки)", ["Fußball", "Fussball"]]] },

{ t: "Meine Freundin Lisa", x: `Lisa ist meine Freundin. Sie ist sehr nett und lustig. Lisa hat lange, blonde Haare und blaue Augen. Sie wohnt in Hamburg. Sie arbeitet als Verkäuferin. Lisa liebt Tiere. Sie hat zwei Katzen. Am Wochenende telefonieren wir oft. Im Sommer besuche ich Lisa. Wir gehen dann zusammen an den Strand.`,
g: `lustig=весёлый
die Verkäuferin=продавщица
zusammen=вместе
der Strand=пляж`,
q: [["c", "Где живёт Лиза?", ["в Берлине", "в Гамбурге", "в Мюнхене"], 1], ["c", "Какие у Лизы глаза?", ["голубые", "зелёные", "карие"], 0], ["t", "Лиза работает учительницей.", 0], ["t", "У Лизы две кошки.", 1], ["i", "Когда автор навещает Лизу? (время года по-немецки)", ["im Sommer", "Sommer"]]] },

{ t: "Am Wochenende", x: `Am Wochenende habe ich Zeit. Am Samstag schlafe ich lange. Dann frühstücke ich mit meiner Familie. Am Nachmittag gehe ich ins Kino oder ins Museum. Am Abend treffe ich Freunde. Wir essen Pizza. Am Sonntag besuche ich meine Oma. Sie kocht immer Suppe. Die Suppe ist sehr lecker. Das Wochenende ist toll!`,
g: `lange schlafen=долго спать
frühstücken=завтракать
treffen=встречать
immer=всегда`,
q: [["c", "Что автор делает в субботу утром?", ["работает", "долго спит", "занимается спортом"], 1], ["t", "В субботу вечером друзья едят пиццу.", 1], ["c", "Кого автор навещает в воскресенье?", ["дедушку", "бабушку", "сестру"], 1], ["t", "Бабушка всегда готовит пирог.", 0], ["i", "Что всегда готовит бабушка? (по-немецки)", ["Suppe"]]] }
];

TEXTS.A1 = [
{ t: "Eine neue Wohnung", x: `Markus und Sabine suchen eine neue Wohnung. Ihre alte Wohnung ist zu klein, denn sie bekommen bald ein Baby. Heute besichtigen sie eine Wohnung in der Goethestraße. Die Wohnung hat drei Zimmer, eine Küche, ein Bad und einen Balkon. Sie liegt im zweiten Stock. Es gibt leider keinen Aufzug. Die Miete kostet 950 Euro warm. Das ist nicht billig, aber die Wohnung ist hell und ruhig. In der Nähe gibt es einen Park und einen Kindergarten. Sabine gefällt die Wohnung sehr. Markus findet die Miete ein bisschen zu hoch. Am Ende sagen sie: „Wir nehmen die Wohnung!“`,
g: `besichtigen=осматривать
der Stock=этаж
der Aufzug=лифт
die Miete=арендная плата
warm=с отоплением (о квартплате)`,
q: [["c", "Почему Маркус и Сабина ищут новую квартиру?", ["старая слишком дорогая", "у них скоро будет ребёнок", "они меняют работу"], 1], ["c", "Сколько комнат в квартире?", ["2", "3", "4"], 1], ["t", "В доме есть лифт.", 0], ["t", "Рядом есть парк и детский сад.", 1], ["i", "Сколько стоит аренда в евро? (число)", ["950"]], ["i", "На какой улице находится квартира? (по-немецки)", ["Goethestraße", "Goethestrasse", "in der Goethestraße"]]] },

{ t: "Beim Arzt", x: `Herr Becker fühlt sich nicht gut. Er hat Kopfschmerzen und Fieber. Er ruft beim Arzt an und bekommt einen Termin um zehn Uhr. In der Praxis muss er zuerst seine Versichertenkarte zeigen. Dann wartet er im Wartezimmer. Nach zwanzig Minuten kommt er zur Ärztin. „Was fehlt Ihnen?“, fragt Frau Dr. Wolf. „Ich habe seit gestern Fieber und mein Hals tut weh.“ Die Ärztin untersucht ihn. „Sie haben eine Grippe. Sie müssen im Bett bleiben und viel trinken. Ich schreibe Ihnen ein Rezept.“ Herr Becker bekommt eine Krankmeldung für fünf Tage. Dann geht er zur Apotheke.`,
g: `der Termin=приём, запись
das Wartezimmer=приёмная
Was fehlt Ihnen?=что Вас беспокоит?
die Krankmeldung=больничный лист`,
q: [["c", "Во сколько у господина Беккера приём?", ["в 9", "в 10", "в 11"], 1], ["t", "Он ждёт в приёмной 20 минут.", 1], ["c", "Какой диагноз ставит врач?", ["простуда", "грипп", "аллергия"], 1], ["t", "Врач — мужчина.", 0], ["i", "На сколько дней он получает больничный? (число)", ["5", "fünf"]], ["i", "Куда он идёт после врача? (по-немецки)", ["Apotheke", "zur Apotheke", "in die Apotheke"]]] },

{ t: "Mein Arbeitstag", x: `Ich heiße Ayşe und ich bin Krankenschwester. Ich arbeite in einem Krankenhaus in Köln. Diese Woche habe ich Frühdienst. Mein Wecker klingelt schon um halb fünf. Ich dusche schnell und trinke einen Tee. Um Viertel vor sechs fahre ich mit dem Fahrrad zur Arbeit. Mein Dienst beginnt um sechs Uhr. Zuerst spreche ich mit den Kollegen vom Nachtdienst. Dann helfe ich den Patienten, messe Fieber und bringe Medikamente. Um zehn Uhr mache ich eine kurze Pause. Die Arbeit ist anstrengend, aber sie macht mir Spaß. Um zwei Uhr habe ich Feierabend. Am Nachmittag schlafe ich oft eine Stunde.`,
g: `der Frühdienst=утренняя смена
der Wecker=будильник
anstrengend=утомительный
Spaß machen=доставлять удовольствие
der Feierabend=конец рабочего дня`,
q: [["c", "Кем работает Айше?", ["врачом", "медсестрой", "учительницей"], 1], ["c", "Во сколько звенит будильник?", ["в 4:30", "в 5:30", "в 6:00"], 0], ["t", "Айше ездит на работу на автобусе.", 0], ["t", "Работа ей нравится, хотя она утомительная.", 1], ["i", "В каком городе находится больница? (по-немецки)", ["Köln", "Koeln", "in Köln"]], ["i", "Во сколько заканчивается её работа? (число)", ["2", "zwei", "um zwei Uhr", "14"]]] },

{ t: "Einkaufen auf dem Markt", x: `Jeden Samstag geht Frau Lehmann auf den Wochenmarkt. Sie kauft dort lieber ein als im Supermarkt, denn das Obst und Gemüse sind frisch und kommen aus der Region. Heute braucht sie Kartoffeln, Karotten und Zwiebeln für eine Suppe. Am Gemüsestand fragt sie: „Was kosten die Tomaten?“ – „Drei Euro das Kilo.“ – „Dann nehme ich ein halbes Kilo.“ Danach geht sie zum Käsestand. Der Verkäufer ist sehr freundlich und sie darf ein Stück Käse probieren. Zum Schluss kauft sie noch Blumen für ihre Nachbarin. Die Nachbarin hat heute Geburtstag.`,
g: `der Wochenmarkt=рынок (раз в неделю)
lieber=охотнее
der Stand=прилавок
probieren=пробовать
zum Schluss=в конце`,
q: [["c", "Когда фрау Леман ходит на рынок?", ["каждую пятницу", "каждую субботу", "каждое воскресенье"], 1], ["c", "Почему она любит рынок?", ["там дешевле", "продукты свежие и местные", "рынок рядом с домом"], 1], ["t", "Она покупает килограмм помидоров.", 0], ["t", "Продавец сыра разрешает попробовать сыр.", 1], ["i", "Что она готовит из картофеля, моркови и лука? (по-немецки)", ["Suppe", "eine Suppe"]], ["i", "Для кого она покупает цветы? (по-немецки)", ["Nachbarin", "für ihre Nachbarin", "ihre Nachbarin"]]] },

{ t: "Mit dem Zug nach München", x: `Paul möchte am Freitag seine Schwester in München besuchen. Er fährt mit dem Zug von Frankfurt. Im Internet kauft er eine Fahrkarte. Hin und zurück kostet sie 89 Euro. Der Zug fährt um 9:15 Uhr von Gleis 7 ab. Leider hat der Zug zwanzig Minuten Verspätung. Paul wartet am Bahnhof und kauft sich einen Kaffee und eine Zeitung. Im Zug ist es voll, aber Paul hat einen Sitzplatz reserviert. Die Fahrt dauert dreieinhalb Stunden. Paul liest und hört Musik. In München wartet seine Schwester am Gleis. Sie freut sich sehr.`,
g: `hin und zurück=туда и обратно
das Gleis=путь (на вокзале)
die Verspätung=опоздание
dauern=длиться`,
q: [["c", "Откуда едет Пауль?", ["из Берлина", "из Франкфурта", "из Кёльна"], 1], ["c", "Сколько опаздывает поезд?", ["10 минут", "20 минут", "полчаса"], 1], ["t", "Пауль стоит всю дорогу, потому что поезд полный.", 0], ["t", "Поездка длится три с половиной часа.", 1], ["i", "С какого пути отправляется поезд? (число)", ["7", "sieben"]], ["i", "Кого Пауль навещает в Мюнхене? (по-немецки)", ["Schwester", "seine Schwester"]]] },

{ t: "Eine Einladung", x: `Liebe Clara,
am Samstag, den 14. Juni, werde ich dreißig Jahre alt! Das möchte ich mit dir feiern. Die Party beginnt um 19 Uhr bei mir zu Hause, in der Lindenstraße 5. Es gibt ein Buffet und Musik. Wir tanzen bestimmt bis spät in die Nacht. Kannst du vielleicht einen Salat mitbringen? Bitte sag mir bis Mittwoch Bescheid, ob du kommst. Du kannst gern auch deinen Freund mitbringen.
Ich freue mich auf dich!
Viele Grüße
Jonas`,
g: `feiern=праздновать
mitbringen=приносить с собой
Bescheid sagen=сообщить
bestimmt=наверняка`,
q: [["c", "Сколько лет исполняется Йонасу?", ["25", "30", "40"], 1], ["c", "Во сколько начинается вечеринка?", ["в 18:00", "в 19:00", "в 20:00"], 1], ["t", "Вечеринка проходит в ресторане.", 0], ["t", "Клара может прийти со своим парнем.", 1], ["i", "Что Йонас просит принести? (по-немецки)", ["Salat", "einen Salat"]], ["i", "До какого дня нужно ответить? (по-немецки)", ["Mittwoch", "bis Mittwoch"]]] },

{ t: "Im Restaurant", x: `Familie Wagner geht heute Abend ins Restaurant „Zur Linde“. Sie haben einen Tisch für vier Personen reserviert. Der Kellner bringt die Speisekarte. Herr Wagner bestellt ein Schnitzel mit Pommes. Frau Wagner isst kein Fleisch, sie nimmt eine Gemüsesuppe und einen Salat. Die Kinder möchten Pizza. Zum Trinken bestellen die Eltern Wein und die Kinder Apfelsaft. Das Essen schmeckt allen sehr gut. Zum Nachtisch gibt es Eis. Am Ende möchte Herr Wagner bezahlen. Die Rechnung beträgt 78 Euro. Er gibt dem Kellner 85 Euro und sagt: „Stimmt so.“`,
g: `bestellen=заказывать
der Nachtisch=десерт
die Rechnung=счёт
Stimmt so=сдачи не надо`,
q: [["c", "На сколько человек заказан стол?", ["2", "3", "4"], 2], ["t", "Фрау Вагнер вегетарианка (не ест мясо).", 1], ["c", "Что пьют дети?", ["колу", "яблочный сок", "воду"], 1], ["t", "На десерт подают торт.", 0], ["i", "Что заказывает господин Вагнер? (по-немецки)", ["Schnitzel", "ein Schnitzel", "Schnitzel mit Pommes"]], ["i", "Сколько чаевых оставляет господин Вагнер в евро? (число)", ["7", "sieben"]]] },

{ t: "Der Deutschkurs", x: `Seit zwei Monaten besucht Pedro einen Deutschkurs an der Volkshochschule. Er kommt aus Spanien und arbeitet als Koch in Stuttgart. Der Kurs ist am Montag und am Donnerstag von 18 bis 20 Uhr. In seiner Klasse sind zwölf Personen aus acht Ländern. Die Lehrerin heißt Frau Klein. Sie ist sehr geduldig und erklärt die Grammatik gut. Pedro findet die Artikel schwierig. „Warum ist es die Gabel, aber der Löffel?“, fragt er. Aber er lernt jeden Tag neue Wörter mit einer App. Im Sommer möchte er die Prüfung A1 machen.`,
g: `die Volkshochschule=народный университет (курсы)
geduldig=терпеливый
schwierig=сложный
die Prüfung=экзамен`,
q: [["c", "Откуда Педро?", ["из Италии", "из Испании", "из Португалии"], 1], ["c", "Кем работает Педро?", ["официантом", "поваром", "водителем"], 1], ["t", "Курс проходит три раза в неделю.", 0], ["t", "Педро считает артикли трудными.", 1], ["i", "Сколько человек в группе? (число)", ["12", "zwölf"]], ["i", "Как зовут учительницу? (по-немецки)", ["Frau Klein", "Klein"]]] },

{ t: "Eine E-Mail an Oma", x: `Liebe Oma,
wie geht es dir? Mir geht es gut. Ich bin jetzt seit einer Woche in Wien. Die Stadt ist wunderschön! Ich wohne bei einer netten Familie. Sie haben zwei Kinder und einen Hund. Jeden Morgen gehe ich in die Sprachschule. Am Nachmittag besichtige ich die Stadt. Gestern war ich im Schloss Schönbrunn. Heute Abend gehe ich in die Oper. Das Wetter ist leider nicht so gut, es regnet oft. Das Essen hier schmeckt mir sehr gut, besonders der Apfelstrudel. Nächsten Samstag komme ich zurück. Dann erzähle ich dir alles!
Viele Grüße und Küsse
deine Mia`,
g: `wunderschön=прекрасный
besichtigen=осматривать
das Schloss=дворец, замок
besonders=особенно`,
q: [["c", "В каком городе находится Миа?", ["в Мюнхене", "в Вене", "в Цюрихе"], 1], ["c", "Сколько времени она уже там?", ["один день", "неделю", "месяц"], 1], ["t", "Миа живёт в отеле.", 0], ["t", "Там часто идёт дождь.", 1], ["i", "Куда Миа идёт сегодня вечером? (по-немецки)", ["Oper", "in die Oper"]], ["i", "Какое блюдо ей особенно нравится? (по-немецки)", ["Apfelstrudel", "der Apfelstrudel"]]] },

{ t: "Sonntag im Park", x: `Es ist Sonntag und die Sonne scheint. Viele Menschen sind im Stadtpark. Eine Familie macht ein Picknick auf der Wiese. Die Kinder spielen Ball. Ein alter Mann sitzt auf einer Bank und füttert die Enten am See. Zwei Studentinnen joggen um den See. Am Kiosk kaufen Leute Eis und Getränke. Tim sitzt unter einem Baum und liest ein Buch. Plötzlich kommt ein kleiner Hund und nimmt Tims Sandwich! Tim lacht. Die Besitzerin des Hundes entschuldigt sich. Sie heißt Laura. Sie sprechen lange und trinken zusammen einen Kaffee. Vielleicht ist das der Beginn einer Freundschaft.`,
g: `die Wiese=луг, лужайка
füttern=кормить
plötzlich=вдруг
die Besitzerin=хозяйка
sich entschuldigen=извиняться`,
q: [["c", "Какая погода в воскресенье?", ["идёт дождь", "светит солнце", "холодно"], 1], ["c", "Что делает старик?", ["бегает", "кормит уток", "читает газету"], 1], ["t", "Тим сидит на скамейке.", 0], ["t", "Хозяйка собаки извиняется.", 1], ["i", "Что собака забирает у Тима? (по-немецки)", ["Sandwich", "sein Sandwich", "das Sandwich"]], ["i", "Как зовут хозяйку собаки? (по-немецки)", ["Laura"]]] }
];
