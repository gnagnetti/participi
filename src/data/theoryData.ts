import { TheoryTopic } from '../types';

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'intro',
    category: 'intro',
    title: '1. Introduzione ai Participi Russi',
    subtitle: 'Natura ibrida: tra verbo e aggettivo',
    iconName: 'BookOpen',
    summary: 'Il participio (причастие) è una forma verbale ibrida che condivide caratteristiche sia del verbo (tempo, aspetto, transitività, riflessività) sia dell\'aggettivo (genere, numero, caso e declinazione ad aggettivo).',
    aspectsAllowed: 'Entrambi (НСВ e СВ)',
    suffixes: ['-ущ-/-ющ-', '-ащ-/-ящ-', '-вш-/-ш-', '-ем-/-им-', '-нн-/-енн-', '-т-'],
    formationRule: 'I participi si accordano sempre in genere, numero e caso con il sostantivo a cui si riferiscono, e si declinano esattamente come gli aggettivi forti o deboli.',
    examples: [
      {
        russian: 'Студент, читающий книгу, сидит у окна.',
        italian: 'Lo studente che legge il libro è seduto vicino alla finestra.',
        breakdown: {
          stem: 'чита',
          suffix: 'ющ',
          ending: 'ий'
        },
        notes: 'Accordo al Maschile Singolare Nominativo con "студент".'
      },
      {
        russian: 'Я вижу девушку, читающую журнал.',
        italian: 'Vedo la ragazza che legge la rivista.',
        breakdown: {
          stem: 'чита',
          suffix: 'ющ',
          ending: 'ую'
        },
        notes: 'Accordo all\'Accusativo Femminile Singolare con "девушку".'
      }
    ],
    keyRules: [
      'Regola della Reggenza: Il participio mantiene lo stesso caso e la stessa preposizione del verbo d\'origine (es. читать книгу [Acc.] → читающий книгу [Acc.]).',
      'Verbi Riflessivi: La particella riflessiva -ся non scompare mai e non si contrae MAI in -сь nei participi lunghi (es. интересующийся, mai interessujuščis\'!).',
      'Punteggiatura (Причастный оборот): Se il costrutto participiale si trova DOPO il sostantivo, viene sempre isolato da virgole. Se si trova PRIMA del sostantivo, di norma non vuole la virgola (es. Читающий книгу студент сидит здесь).'
    ],
    commonMistakes: [
      'Non confondere il participio con il gerundio (деепричастие): il participio descrive un nome e si declina; il gerundio è invariabile e modifica il verbo principale.',
      'Dimenticare di concordare il caso del participio con il sostantivo principale negli accusativi, genitivi o dativi.'
    ]
  },
  {
    id: 'active_present',
    category: 'active_present',
    title: '2. Participio Presente Attivo',
    subtitle: 'Действительное причастие настоящего времени',
    iconName: 'Zap',
    summary: 'Descrive un soggetto che compie un\'azione nel momento attuale. Esiste ESCLUSIVAMENTE per i verbi imperfettivi (НСВ). I verbi perfettivi (СВ) NON hanno mai il participio presente.',
    aspectsAllowed: 'Solo НСВ (Imperfettivo)',
    suffixes: ['-ущ- / -ющ- (I coniugazione)', '-ащ- / -ящ- (II coniugazione)'],
    formationRule: 'Si parte dalla 3ª persona plurale del presente indicativo (они...), si toglie la desinenza -ут/-ют o -ат/-ят e si aggiungono i suffissi participiali seguiti dalle desinenze aggettivali (-ий, -ая, -ее, -ие).',
    examples: [
      {
        russian: 'читают → чита-ющ-ий',
        italian: 'colui che legge / leggente',
        breakdown: {
          stem: 'чита',
          suffix: 'ющ',
          ending: 'ий'
        },
        notes: 'I coniugazione (читать)'
      },
      {
        russian: 'живут → жив-ущ-ий',
        italian: 'colui che vive / vivente',
        breakdown: {
          stem: 'жив',
          suffix: 'ущ',
          ending: 'ий'
        },
        notes: 'I coniugazione consonante (жить)'
      },
      {
        russian: 'говорят → говор-ящ-ий',
        italian: 'colui che parla / parlante',
        breakdown: {
          stem: 'говор',
          suffix: 'ящ',
          ending: 'ий'
        },
        notes: 'II coniugazione (говорить)'
      },
      {
        russian: 'молчат → молч-ащ-ий',
        italian: 'colui che tace / silenzioso',
        breakdown: {
          stem: 'молч',
          suffix: 'ащ',
          ending: 'ий'
        },
        notes: 'II coniugazione dopo sibilante (молчать)'
      },
      {
        russian: 'улыбаются → улыба-ющ-ий-ся',
        italian: 'colui che sorride / sorridente',
        breakdown: {
          stem: 'улыба',
          suffix: 'ющ',
          ending: 'ий',
          reflexive: 'ся'
        },
        notes: 'Riflessivo: -ся resta invariato in tutti i generi e casi!'
      }
    ],
    keyRules: [
      'I verbi perfettivi (СВ) non hanno presente: forme inesistenti come *прочитающий non possono esistere!',
      'Per la I coniugazione usa -ущ- (se la base termina in consonante dura) o -ющ- (se vocale o dolce).',
      'Per la II coniugazione usa -ащ- (dopo ж, ч, ш, щ) o -ящ- (negli altri casi).',
      'I verbi con suffisso -ава- (давать, вставать, узнавать) mantengono la sillaba: дают → дающий.'
    ],
    commonMistakes: [
      'Applicare un suffisso della I coniugazione a un verbo della II (es. *говорющий invece di говорящий).',
      'Contrarre il suffisso riflessivo -ся in -сь (es. *улыбающаясь invece di улыбающаяся).'
    ]
  },
  {
    id: 'active_past',
    category: 'active_past',
    title: '3. Participio Passato Attivo',
    subtitle: 'Действительное причастие прошедшего времени',
    iconName: 'History',
    summary: 'Descrive chi ha compiuto un\'azione nel passato. Può essere formato sia da verbi imperfettivi (НСВ) sia da perfettivi (СВ).',
    aspectsAllowed: 'Entrambi (НСВ e СВ)',
    suffixes: ['-вш- (dopo vocale)', '-ш- (dopo consonante)'],
    formationRule: 'Si prende il tema del passato maschile (forma in -л) rimuovendo la -л. Se la radice finisce per vocale si aggiunge -вш-, se termina per consonante si aggiunge -ш-.',
    examples: [
      {
        russian: 'чита-л → чита-вш-ий',
        italian: 'che aveva letto / che leggeva',
        breakdown: {
          stem: 'чита',
          suffix: 'вш',
          ending: 'ий'
        },
        notes: 'Radice in vocale: suffisso -вш-'
      },
      {
        russian: 'написа-л → написа-вш-ий',
        italian: 'che ha scritto (perfettivo)',
        breakdown: {
          stem: 'написа',
          suffix: 'вш',
          ending: 'ий'
        },
        notes: 'Verbo perfettivo (написать)'
      },
      {
        russian: 'нёс → нёс-ш-ий',
        italian: 'che portava / che trasportava',
        breakdown: {
          stem: 'нёс',
          suffix: 'ш',
          ending: 'ий'
        },
        notes: 'Radice in consonante: suffisso -ш- (нести)'
      },
      {
        russian: 'погиб → погиб-ш-ий',
        italian: 'caduto / perito (погибнуть)',
        breakdown: {
          stem: 'погиб',
          suffix: 'ш',
          ending: 'ий'
        },
        notes: 'Perde il suffisso -ну- nel passato maschile'
      },
      {
        russian: 'шёл → шед-ш-ий (пришёл → пришедший)',
        italian: 'che andava / venuto',
        breakdown: {
          stem: 'шед',
          suffix: 'ш',
          ending: 'ий'
        },
        notes: 'Forma irregolare fondamentale da идти/прийти'
      }
    ],
    keyRules: [
      'Radice in vocale (es. знать → знал) → знавший.',
      'Radice in consonante (es. спасти → спас) → спасший.',
      'Verbi in -ти e -чь: вести → вёл → ведший; помочь → помог → помогший.',
      'Verbi con radice irregolare: умереть → умерший; запереть → заперший.',
      'Anche qui i riflessivi mantengono rigorosamente -ся: вернувшийся, смеявшийся.'
    ],
    commonMistakes: [
      'Dimenticare la forma speciale di идти (шедший, non *идвший).',
      'Aggiungere -вш- a una radice in consonante (es. *нёсвший invece di нёсший).'
    ]
  },
  {
    id: 'passive_present',
    category: 'passive_present',
    title: '4. Participio Presente Passivo',
    subtitle: 'Страдательное причастие настоящего времени',
    iconName: 'Shield',
    summary: 'Descrive un oggetto o persona che subisce un\'azione nel presente. Si forma SOLO da verbi TRANSITIVI IMPERFETTIVI (НСВ).',
    aspectsAllowed: 'Solo НСВ (Imperfettivo)',
    suffixes: ['-ем- (I coniugazione)', '-им- (II coniugazione)', '-ом- (raro, es. ведомый)'],
    formationRule: 'Si prende la 1ª persona plurale del presente (мы...) e si aggiungono le desinenze aggettivali ordinarie (-ый, -ая, -ое, -ые).',
    examples: [
      {
        russian: 'читаем → чита-ем-ый',
        italian: 'letto / che viene letto regolarmente',
        breakdown: {
          stem: 'чита',
          suffix: 'ем',
          ending: 'ый'
        },
        notes: 'I coniugazione (читать)'
      },
      {
        russian: 'изучаем → изуча-ем-ый',
        italian: 'studiato / in corso di studio',
        breakdown: {
          stem: 'изуча',
          suffix: 'ем',
          ending: 'ый'
        },
        notes: 'I coniugazione (изучать)'
      },
      {
        russian: 'любим → люб-им-ый',
        italian: 'amato / preferito',
        breakdown: {
          stem: 'люб',
          suffix: 'им',
          ending: 'ый'
        },
        notes: 'II coniugazione (любить)'
      },
      {
        russian: 'руководим → руковод-им-ый',
        italian: 'guidato / diretto da',
        breakdown: {
          stem: 'руковод',
          suffix: 'им',
          ending: 'ый'
        },
        notes: 'II coniugazione (руководить)'
      }
    ],
    keyRules: [
      'Si forma solo da verbi transitivi imperfettivi (verbi che reggono il complemento oggetto diretto all\'Accusativo senza preposizione).',
      'I verbi della I coniugazione prendono -ем- (мы уважаем → уважаемый).',
      'I verbi della II coniugazione prendono -им- (мы видим → видимый).',
      'L\'agente che compie l\'azione si esprime sempre al caso STRUMENTALE senza preposizione (es. книга, читаемая студентом).'
    ],
    commonMistakes: [
      'Cercare di formarlo da verbi intransitivi come спать o идти (non hanno participi passivi!).',
      'Confondere la vocale tematica tra I coniugazione (-ем-) e II coniugazione (-им-).'
    ]
  },
  {
    id: 'passive_past',
    category: 'passive_past',
    title: '5. Participio Passato Passivo (Forme Lunghe e Brevi)',
    subtitle: 'Страдательное причастие прошедшего времени',
    iconName: 'CheckCheck',
    summary: 'Indica un\'azione passata completata subita da un oggetto o persona. Si forma quasi unicamente da verbi TRANSITIVI PERFETTIVI (СВ). È il participio più frequente e include le cruciali FORME BREVI predicative.',
    aspectsAllowed: 'Solo СВ (Perfettivo)',
    suffixes: ['-нн- (verbi in -ать/-ять)', '-енн- / -ённ- (verbi in -ить e consonante)', '-т- (radici monosillabiche e in -ыть/-уть/-нять)'],
    formationRule: 'Dall\'infinito del verbo perfettivo: -ать/-ять prendono -нн-; -ить perdono la vocale tematica e prendono -енн-/-ённ- (spesso con mutazione consonantica); altri verbi specifici prendono -т-.',
    examples: [
      {
        russian: 'прочитать → прочита-нн-ый (breve: прочитан, прочитана, прочитано, прочитаны)',
        italian: 'letto / completato nella lettura',
        breakdown: {
          stem: 'прочита',
          suffix: 'нн',
          ending: 'ый'
        },
        notes: 'Verbo in -ать: suffisso -нн-'
      },
      {
        russian: 'построить → постро-енн-ый (breve: построен, построена, построено, построены)',
        italian: 'costruito',
        breakdown: {
          stem: 'постро',
          suffix: 'енн',
          ending: 'ый'
        },
        notes: 'Verbo in -ить: suffisso -енн-'
      },
      {
        russian: 'купить → куп-ленн-ый (mutazione: п → пл!)',
        italian: 'comprato / acquistato',
        breakdown: {
          stem: 'куп',
          suffix: 'ленн',
          ending: 'ый'
        },
        notes: 'Epentesi di -л- davanti a labiali (б, п, в, ф, м)'
      },
      {
        russian: 'открыть → откры-т-ый (breve: открыт, открыта, открыто, открыты)',
        italian: 'aperto',
        breakdown: {
          stem: 'откры',
          suffix: 'т',
          ending: 'ый'
        },
        notes: 'Verbo con radice in -ыть: suffisso -т-'
      },
      {
        russian: 'взять → взя-т-ый (breve: взят, взята, взято, взяты)',
        italian: 'preso',
        breakdown: {
          stem: 'взя',
          suffix: 'т',
          ending: 'ый'
        },
        notes: 'Radice monosillabica: suffisso -т-'
      }
    ],
    keyRules: [
      'FORME BREVI (Краткие причастия): Hanno UNA SOLA -н- (es. прочитан, прочитана, прочитано, прочитаны; построен, построена, построено, построены).',
      'Uso delle forme brevi: Si usano come PREDICATO nella frase passiva (es. Дом построен рабочими = La casa è stata costruita dagli operai).',
      'Mutazioni consonantiche dei verbi in -ить: п→пл (купить→купленный), б→бл (любить→любленный), в→вл (составить→составленный), с→ш (пригласить→приглашённый), т→ч o т→щ (возвратить→возвращённый).'
    ],
    commonMistakes: [
      'Scrivere due "нн" nella forma breve (*прочитанна invece di прочитана). Ricorda: la forma breve ha sempre una sola "н"!',
      'Dimenticare la mutazione consonantica nei verbi in -ить (es. *купенный invece di купленный).'
    ]
  },
  {
    id: 'transformations',
    category: 'transformations',
    title: '6. Trasformazione: Participio ↔ Proposizione con «Который»',
    subtitle: 'La chiave per comprendere e produrre la sintassi russa colta',
    iconName: 'RefreshCw',
    summary: 'I costrutti participiali (причастные обороты) sostituiscono elegantemente le proposizioni relative introdotte dal pronome «который» (che/il quale), tipiche del linguaggio formale, letterario e accademico.',
    aspectsAllowed: 'Entrambi (НСВ e СВ)',
    suffixes: ['Tutti i participi'],
    formationRule: 'Nei participi attivi: la proposizione con "который" ha "который" come soggetto (al NOMINATIVO). Nella trasformazione in participio, questo si accorda invece in genere, numero e caso con il nome modificato.',
    examples: [
      {
        russian: 'Студент, который читает книгу... = Студент, читающий книгу...',
        italian: 'Lo studente che legge il libro...',
        breakdown: {
          stem: 'чита',
          suffix: 'ющ',
          ending: 'ий'
        },
        notes: 'Presente attivo: который читает (НСВ) → читающий'
      },
      {
        russian: 'Я встретил друга, который приехал вчера. = Я встретил друга, приехавшего вчера.',
        italian: 'Ho incontrato l\'amico che è arrivato ieri.',
        breakdown: {
          stem: 'приеха',
          suffix: 'вш',
          ending: 'его'
        },
        notes: 'Amico è all\'Accusativo animato (друга) → il participio va all\'Accusativo animato (приехавшего), ma nella subordinata который resta al Nominativo!'
      },
      {
        russian: 'Книга, которую прочитал студент... = Книга, прочитанная студентом.',
        italian: 'Il libro che lo studente ha letto...',
        breakdown: {
          stem: 'прочита',
          suffix: 'нн',
          ending: 'ая'
        },
        notes: 'Passivo: l\'oggetto diventa soggetto, e chi compie l\'azione va allo STRUMENTALE (студентом).'
      }
    ],
    keyRules: [
      'Regola d\'oro per l\'Attivo: "Который" nella subordinata è SEMPRE al caso Nominativo quando corrisponde a un participio attivo!',
      'Il tempo del participio deve corrispondere al tempo del verbo nella subordinata (presente → participio presente; passato → participio passato).',
      'L\'aspetto deve coincidere (imperfettivo con imperfettivo, perfettivo con perfettivo).',
      'Attenzione all\'accordo di caso: se il sostantivo principale è all\'obliquo (Genitivo, Dativo, Strumentale, Prepositivo), il participio deve concordare con esso.'
    ],
    commonMistakes: [
      'Mettere "который" in un caso diverso dal Nominativo quando si trasforma un participio attivo.',
      'Sbagliare l\'accordo del participio quando il sostantivo principale non è al nominativo (es. *Я дал книгу студенту, читающий... invece di читающему).'
    ]
  }
];
