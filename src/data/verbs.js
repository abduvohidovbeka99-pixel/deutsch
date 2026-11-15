// Глаголы для таблиц спряжения.
// Формат: инфинитив;перевод;вспом. (h = haben, s = sein);Partizip II;Präteritum (ich);du (Präsens);er (Präsens);все 6 форм Präsens
// Пустые поля вычисляются по правилам слабых глаголов. «·» отмечает отделяемую приставку.
// Группа: m = модальные и самые неправильные, s = сильные/неправильные, w = слабые (правильные), t = отделяемые
window.VERBS = `
m|sein;быть;s;gewesen;war;;;bin,bist,ist,sind,seid,sind
m|haben;иметь;h;gehabt;hatte;hast;hat
m|werden;становиться;s;geworden;wurde;wirst;wird
m|wissen;знать;h;gewusst;wusste;;;weiß,weißt,weiß,wissen,wisst,wissen
m|können;мочь, уметь;h;gekonnt;konnte;;;kann,kannst,kann,können,könnt,können
m|müssen;быть должным;h;gemusst;musste;;;muss,musst,muss,müssen,müsst,müssen
m|wollen;хотеть;h;gewollt;wollte;;;will,willst,will,wollen,wollt,wollen
m|dürfen;иметь разрешение;h;gedurft;durfte;;;darf,darfst,darf,dürfen,dürft,dürfen
m|sollen;быть должным (по указанию);h;gesollt;sollte;;;soll,sollst,soll,sollen,sollt,sollen
m|mögen;любить, нравиться;h;gemocht;mochte;;;mag,magst,mag,mögen,mögt,mögen
m|tun;делать;h;getan;tat;;;tue,tust,tut,tun,tut,tun
s|gehen;идти;s;gegangen;ging
s|kommen;приходить;s;gekommen;kam
s|fahren;ехать;s;gefahren;fuhr;fährst;fährt
s|fliegen;лететь;s;geflogen;flog
s|laufen;бегать, идти;s;gelaufen;lief;läufst;läuft
s|bleiben;оставаться;s;geblieben;blieb
s|schwimmen;плавать;s;geschwommen;schwamm
s|steigen;подниматься;s;gestiegen;stieg
s|fallen;падать;s;gefallen;fiel;fällst;fällt
s|sterben;умирать;s;gestorben;starb;stirbst;stirbt
s|wachsen;расти;s;gewachsen;wuchs;wächst;wächst
s|springen;прыгать;s;gesprungen;sprang
s|rennen;мчаться, бежать;s;gerannt;rannte
s|sehen;видеть;h;gesehen;sah;siehst;sieht
s|lesen;читать;h;gelesen;las;liest;liest
s|essen;есть;h;gegessen;aß;isst;isst
s|geben;давать;h;gegeben;gab;gibst;gibt
s|nehmen;брать;h;genommen;nahm;nimmst;nimmt
s|sprechen;говорить;h;gesprochen;sprach;sprichst;spricht
s|helfen;помогать;h;geholfen;half;hilfst;hilft
s|treffen;встречать;h;getroffen;traf;triffst;trifft
s|vergessen;забывать;h;vergessen;vergaß;vergisst;vergisst
s|schlafen;спать;h;geschlafen;schlief;schläfst;schläft
s|tragen;носить;h;getragen;trug;trägst;trägt
s|waschen;мыть, стирать;h;gewaschen;wusch;wäschst;wäscht
s|halten;держать;h;gehalten;hielt;hältst;hält
s|lassen;оставлять, позволять;h;gelassen;ließ;lässt;lässt
s|fangen;ловить;h;gefangen;fing;fängst;fängt
s|schlagen;бить;h;geschlagen;schlug;schlägst;schlägt
s|werfen;бросать;h;geworfen;warf;wirfst;wirft
s|brechen;ломать;h;gebrochen;brach;brichst;bricht
s|empfehlen;рекомендовать;h;empfohlen;empfahl;empfiehlst;empfiehlt
s|stehlen;красть;h;gestohlen;stahl;stiehlst;stiehlt
s|schreiben;писать;h;geschrieben;schrieb
s|trinken;пить;h;getrunken;trank
s|finden;находить;h;gefunden;fand
s|singen;петь;h;gesungen;sang
s|beginnen;начинать;h;begonnen;begann
s|gewinnen;выигрывать;h;gewonnen;gewann
s|verlieren;терять, проигрывать;h;verloren;verlor
s|verstehen;понимать;h;verstanden;verstand
s|stehen;стоять;h;gestanden;stand
s|sitzen;сидеть;h;gesessen;saß
s|liegen;лежать;h;gelegen;lag
s|rufen;звать, кричать;h;gerufen;rief
s|schließen;закрывать;h;geschlossen;schloss
s|bieten;предлагать;h;geboten;bot
s|bitten;просить;h;gebeten;bat
s|denken;думать;h;gedacht;dachte
s|bringen;приносить;h;gebracht;brachte
s|kennen;знать (быть знакомым);h;gekannt;kannte
s|nennen;называть;h;genannt;nannte
s|heißen;называться;h;geheißen;hieß
s|schneiden;резать;h;geschnitten;schnitt
s|streiten;спорить;h;gestritten;stritt
s|entscheiden;решать;h;entschieden;entschied
s|scheinen;светить, казаться;h;geschienen;schien
s|schweigen;молчать;h;geschwiegen;schwieg
s|genießen;наслаждаться;h;genossen;genoss
s|riechen;пахнуть;h;gerochen;roch
s|lügen;лгать;h;gelogen;log
s|ziehen;тянуть;h;gezogen;zog
s|bekommen;получать;h;bekommen;bekam
s|erhalten;получать;h;erhalten;erhielt;erhältst;erhält
s|gefallen;нравиться;h;gefallen;gefiel;gefällst;gefällt
s|beschreiben;описывать;h;beschrieben;beschrieb
s|unterschreiben;подписывать;h;unterschrieben;unterschrieb
s|verbieten;запрещать;h;verboten;verbot
s|versprechen;обещать;h;versprochen;versprach;versprichst;verspricht
s|vergleichen;сравнивать;h;verglichen;verglich
s|verlassen;покидать;h;verlassen;verließ;verlässt;verlässt
t|auf·stehen;вставать;s;aufgestanden;stand
t|an·kommen;прибывать;s;angekommen;kam
t|ab·fahren;отправляться;s;abgefahren;fuhr;fährst;fährt
t|an·rufen;звонить;h;angerufen;rief
t|ein·laden;приглашать;h;eingeladen;lud;lädst;lädt
t|fern·sehen;смотреть телевизор;h;ferngesehen;sah;siehst;sieht
t|mit·nehmen;брать с собой;h;mitgenommen;nahm;nimmst;nimmt
t|ein·steigen;садиться (в транспорт);s;eingestiegen;stieg
t|aus·steigen;выходить (из транспорта);s;ausgestiegen;stieg
t|um·steigen;пересаживаться;s;umgestiegen;stieg
t|an·fangen;начинать;h;angefangen;fing;fängst;fängt
t|ein·schlafen;засыпать;s;eingeschlafen;schlief;schläfst;schläft
t|zurück·kommen;возвращаться;s;zurückgekommen;kam
t|vor·schlagen;предлагать;h;vorgeschlagen;schlug;schlägst;schlägt
t|aus·gehen;выходить (развлекаться);s;ausgegangen;ging
t|statt·finden;состояться;h;stattgefunden;fand
t|teil·nehmen;участвовать;h;teilgenommen;nahm;nimmst;nimmt
t|an·ziehen;надевать;h;angezogen;zog
t|um·ziehen;переезжать;s;umgezogen;zog
t|mit·bringen;приносить с собой;h;mitgebracht;brachte
t|an·bieten;предлагать;h;angeboten;bot
t|ein·kaufen;делать покупки;h
t|auf·hören;прекращать;h
t|auf·machen;открывать;h
t|zu·machen;закрывать;h
t|auf·räumen;убирать;h
t|ab·holen;забирать;h
t|vor·stellen;представлять;h
t|auf·wachen;просыпаться;s
t|zu·hören;слушать;h
t|aus·füllen;заполнять;h
t|an·melden;регистрировать;h
t|vor·bereiten;подготавливать;h
w|machen;делать;h
w|sagen;сказать;h
w|fragen;спрашивать;h
w|antworten;отвечать;h
w|arbeiten;работать;h
w|lernen;учить;h
w|wohnen;жить, проживать;h
w|leben;жить;h
w|kaufen;покупать;h
w|spielen;играть;h
w|hören;слышать, слушать;h
w|brauchen;нуждаться;h
w|kochen;готовить;h
w|suchen;искать;h
w|zeigen;показывать;h
w|glauben;верить, полагать;h
w|lieben;любить;h
w|warten;ждать;h
w|öffnen;открывать;h
w|reisen;путешествовать;s
w|tanzen;танцевать;h
w|kosten;стоить;h
w|heiraten;жениться, выходить замуж;h
w|holen;приносить, забирать;h
w|legen;класть;h
w|stellen;ставить;h
w|setzen;сажать, ставить;h
w|putzen;чистить, убирать;h
w|duschen;принимать душ;h
w|zahlen;платить;h
w|schicken;отправлять;h
w|schmecken;быть вкусным;h
w|danken;благодарить;h
w|fehlen;отсутствовать, не хватать;h
w|folgen;следовать;s
w|rechnen;считать;h
w|feiern;праздновать;h
w|wandern;ходить в походы;s
w|sammeln;собирать;h
w|ändern;изменять;h
w|besuchen;посещать;h
w|bezahlen;оплачивать;h
w|erklären;объяснять;h
w|erzählen;рассказывать;h
w|bestellen;заказывать;h
w|verkaufen;продавать;h
w|versuchen;пытаться;h
w|gehören;принадлежать;h
w|entschuldigen;извинять;h
w|benutzen;использовать;h
w|erreichen;достигать;h
w|studieren;учиться в вузе;h
w|telefonieren;говорить по телефону;h
w|fotografieren;фотографировать;h
w|reparieren;ремонтировать;h
w|diskutieren;обсуждать;h
w|passieren;случаться;s
w|funktionieren;работать (о технике);h
`;
