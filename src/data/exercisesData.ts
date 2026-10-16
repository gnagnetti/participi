import { ExerciseItem } from '../types';
import { ADDITIONAL_EXERCISES_PART_1 } from './additionalExercisesPart1';
import { ADDITIONAL_EXERCISES_PART_2 } from './additionalExercisesPart2';
import { ADDITIONAL_EXERCISES_PART_3 } from './additionalExercisesPart3';
import { ADDITIONAL_EXERCISES_PART_4 } from './additionalExercisesPart4';
import { ADDITIONAL_EXERCISES_PART_5 } from './additionalExercisesPart5';
import { ADDITIONAL_EXERCISES_PART_6 } from './additionalExercisesPart6';

const BASE_EXERCISES: ExerciseItem[] = [
  // ==========================================
  // CATEGORIA 1: PARTICIPIO PRESENTE ATTIVO
  // ==========================================
  {
    id: 'act_pres_01',
    category: 'active_present',
    type: 'formation',
    title: 'Formazione: Verbo I Coniugazione',
    instruction: 'Seleziona il participio presente attivo (maschile nominativo) derivato dal verbo dato.',
    russianSentence: 'Студент, [...] книгу в библиотеке, учится на втором курсе.',
    verbBase: 'читать (они читают - I con.)',
    italianTranslation: 'Lo studente che legge un libro in biblioteca frequenta il secondo anno.',
    options: ['читающий', 'читавший', 'читаемый', 'читая'],
    correctAnswer: 'читающий',
    explanation: 'Il verbo читать appartiene alla I coniugazione (3ª plurale: чита-ют). Rimuovendo -ют e aggiungendo il suffisso della I coniugazione -ющ- e la desinenza -ий, si ottiene читающий.',
    grammarTip: 'I coniugazione con tema vocalico → suffisso -ющ-.',
    difficulty: 'facile'
  },
  {
    id: 'act_pres_02',
    category: 'active_present',
    type: 'formation',
    title: 'Formazione: Verbo II Coniugazione',
    instruction: 'Scegli la forma corretta del participio presente attivo.',
    russianSentence: 'Человек, [...] по телефону, — мой коллега.',
    verbBase: 'говорить (они говорят - II con.)',
    italianTranslation: 'La persona che parla al telefono è un mio collega.',
    options: ['говорящий', 'говорющий', 'говоривший', 'говоримый'],
    correctAnswer: 'говорящий',
    explanation: 'Il verbo говорить è di II coniugazione (3ª plurale: говор-ят). Si aggiunge il suffisso della II coniugazione -ящ-, ottenendo говорящий. L\'opzione *говорющий è errata perché la II coniugazione non usa mai -ющ-.',
    grammarTip: 'II coniugazione → suffisso -ащ-/-ящ-.',
    difficulty: 'facile'
  },
  {
    id: 'act_pres_03',
    category: 'active_present',
    type: 'formation',
    title: 'Formazione da Verbo Riflessivo (-ся)',
    instruction: 'Individua la forma corretta del participio presente attivo per il verbo riflessivo.',
    russianSentence: 'Девушка, [...] в зеркало, собирается на праздник.',
    verbBase: 'улыбаться (они улыбаются - I con.)',
    italianTranslation: 'La ragazza che si sorride allo specchio si sta preparando per la festa.',
    options: ['улыбающаяся', 'улыбающаясь', 'улыбавшаяся', 'улыбающся'],
    correctAnswer: 'улыбающаяся',
    explanation: 'Nei participi russi la particella riflessiva è SEMPRE -ся e non si contrae mai in -сь, anche dopo vocale! Essendo femminile nominativo (девушка), la forma corretta è улыбающаяся.',
    grammarTip: 'Regola d\'oro: la particella -ся nei participi non si contrae mai in -сь!',
    difficulty: 'medio'
  },
  {
    id: 'act_pres_04',
    category: 'active_present',
    type: 'agreement_fill',
    title: 'Accordo di Caso (Accusativo con nome animato)',
    instruction: 'Completa la frase concordando il participio con il sostantivo evidenziato.',
    russianSentence: 'Я часто вижу этого профессора, [...] лекции по физике.',
    highlightTarget: 'этого профессора',
    italianTranslation: 'Vedo spesso questo professore che tiene lezioni di fisica.',
    options: ['читающего', 'читающий', 'читающим', 'читающем'],
    correctAnswer: 'читающего',
    explanation: 'Il sostantivo "профессора" è maschile singolare al caso Accusativo animato (= Genitivo). Di conseguenza, il participio deve concordare: читающий → читающего.',
    grammarTip: 'Con i nomi maschili animati all\'Accusativo, il participio prende la desinenza -его.',
    difficulty: 'medio'
  },
  {
    id: 'act_pres_05',
    category: 'active_present',
    type: 'grammar_identification',
    title: 'Riconoscimento Grammaticale',
    instruction: 'Qual è il caso, genere e numero del participio evidenziato?',
    russianSentence: 'Мы подошли к студентам, сидящим в парке.',
    highlightTarget: 'сидящим',
    italianTranslation: 'Ci siamo avvicinati agli studenti seduti nel parco.',
    options: ['Dativo plurale', 'Strumentale singolare maschile', 'Genitivo plurale', 'Prepositivo plurale'],
    correctAnswer: 'Dativo plurale',
    explanation: 'La preposizione "к" regge il Dativo. Il nome "студентам" è al Dativo plurale, e il participio "сидящим" (da сидеть) concorda perfettamente al Dativo plurale (-им/-ым).',
    grammarTip: 'La desinenza -им/-ым al plurale indica il Dativo plurale.',
    difficulty: 'medio'
  },
  {
    id: 'act_pres_06',
    category: 'active_present',
    type: 'formation',
    title: 'Verbo con radice in consonante: Жить',
    instruction: 'Qual è il participio presente attivo per il verbo "жить"?',
    russianSentence: 'Люди, [...] в этом районе, очень дружелюбны.',
    verbBase: 'жить (они живут)',
    italianTranslation: 'Le persone che vivono in questo quartiere sono molto amichevoli.',
    options: ['живущие', 'живящие', 'жившие', 'живуемые'],
    correctAnswer: 'живущие',
    explanation: 'Il verbo жить ha la 3ª persona plurale живут (I coniugazione). Rimuovendo -ут e aggiungendo -ущ- al plurale nominativo (люди) si ottiene живущие.',
    grammarTip: '3ª persona plurale: жив-ут → живущ-ие.',
    difficulty: 'facile'
  },

  // ==========================================
  // CATEGORIA 2: PARTICIPIO PASSATO ATTIVO
  // ==========================================
  {
    id: 'act_past_01',
    category: 'active_past',
    type: 'formation',
    title: 'Formazione: Radice in Vocale (-вш-)',
    instruction: 'Scegli il participio passato attivo per il verbo indicato.',
    russianSentence: 'Врач, [...] операцию, вышел в коридор.',
    verbBase: 'сделать (он сделал - СВ)',
    italianTranslation: 'Il medico che ha eseguito l\'operazione è uscito nel corridoio.',
    options: ['сделавший', 'сделающий', 'сделанший', 'сделанный'],
    correctAnswer: 'сделавший',
    explanation: 'Il participio passato attivo si forma dal tema del passato maschile (сдела-л). Rimuovendo -л, poiché termina per vocale (сдела-), si aggiunge il suffisso -вш- e la desinenza -ий: сделавший.',
    grammarTip: 'Tema del passato in vocale → suffisso -вш-.',
    difficulty: 'facile'
  },
  {
    id: 'act_past_02',
    category: 'active_past',
    type: 'formation',
    title: 'Formazione da Radice in Consonante (-ш-)',
    instruction: 'Individua il participio passato attivo per il verbo con radice in consonante.',
    russianSentence: 'Мальчик, [...] тяжёлый чемодан, очень устал.',
    verbBase: 'нести (он нёс - passato senza -л)',
    italianTranslation: 'Il ragazzo che portava la pesante valigia era molto stanco.',
    options: ['нёсший', 'несшийся', 'нёсвший', 'носивший'],
    correctAnswer: 'нёсший',
    explanation: 'Il passato maschile di нести è нёс (termina per consonante). Quando la radice termina in consonante si usa il suffisso -ш-, non -вш-! Quindi: нёс-ш-ий.',
    grammarTip: 'Tema del passato in consonante → suffisso -ш-.',
    difficulty: 'medio'
  },
  {
    id: 'act_past_03',
    category: 'active_past',
    type: 'formation',
    title: 'Forma Irregolare: Verbo Идти',
    instruction: 'Qual è il participio passato attivo del verbo "прийти"?',
    russianSentence: 'Гости, [...] на праздник вовремя, получили подарки.',
    verbBase: 'прийти (он пришёл)',
    italianTranslation: 'Gli ospiti arrivati in tempo alla festa hanno ricevuto dei regali.',
    options: ['пришедшие', 'прийтившие', 'пришедшиеся', 'пришедший'],
    correctAnswer: 'пришедшие',
    explanation: 'I composti di идти formano il passato su base шед- (шёл → шедший, пришёл → пришедший). Al plurale nominativo concordato con гости: пришедшие.',
    grammarTip: 'Идти / прийти formano sempre il participio passato con la radice шед-: шедший / пришедший.',
    difficulty: 'medio'
  },
  {
    id: 'act_past_04',
    category: 'active_past',
    type: 'agreement_fill',
    title: 'Accordo al Genitivo Plurale',
    instruction: 'Scegli la forma corretta del participio per completare la frase.',
    russianSentence: 'Среди пассажиров, [...] на рейс, было много туристов.',
    highlightTarget: 'пассажиров',
    italianTranslation: 'Tra i passeggeri arrivati in ritardo per il volo c\'erano molti turisti.',
    options: ['опоздавших', 'опоздавшие', 'опоздавшим', 'опоздавшими'],
    correctAnswer: 'опоздавших',
    explanation: '"Среди" regge il caso Genitivo. "Пассажиров" è al Genitivo plurale. La desinenza del Genitivo plurale per i participi passati attivi è -их/-ых: опоздавших.',
    grammarTip: 'Genitivo plurale: desinenza -их / -ых.',
    difficulty: 'medio'
  },
  {
    id: 'act_past_05',
    category: 'active_past',
    type: 'grammar_identification',
    title: 'Identificazione del Caso e Genere',
    instruction: 'Determina caso e genere del participio evidenziato.',
    russianSentence: 'Мы любовались девушкой, вернувшейся из экспедиции.',
    highlightTarget: 'вернувшейся',
    italianTranslation: 'Ammiravamo la ragazza tornata dalla spedizione.',
    options: ['Strumentale singolare femminile', 'Genitivo singolare femminile', 'Dativo singolare femminile', 'Accusativo singolare femminile'],
    correctAnswer: 'Strumentale singolare femminile',
    explanation: 'Il verbo любоваться regge il caso Strumentale (девушкой = f. sing. strum.). Il participio вернувшейся concorda al femminile singolare allo Strumentale (desinenza -ей/-ейся).',
    grammarTip: 'Любоваться + Strumentale: девушкой вернувшейся.',
    difficulty: 'avanzato'
  },
  {
    id: 'act_past_06',
    category: 'active_past',
    type: 'formation',
    title: 'Verbo con perdita del suffisso -ну-: Погибнуть',
    instruction: 'Individua il participio passato attivo corretto.',
    russianSentence: 'Памятник солдатам, [...] в бою.',
    verbBase: 'погибнуть (прош. погиб)',
    italianTranslation: 'Monumento ai soldati caduti in battaglia.',
    options: ['погибшим', 'погибнувшим', 'погибнувшимся', 'погибшими'],
    correctAnswer: 'погибшим',
    explanation: 'I verbi in -нуть che perdono -ну- al passato (погиб) formano il participio passato attivo con -ш- direttamente dalla radice in consonante: погибший. Con "солдатам" (Dativo plurale): погибшим.',
    grammarTip: 'Погибнуть → прош. погиб → погиб-ш-ий → dativo pl. погибшим.',
    difficulty: 'avanzato'
  },

  // ==========================================
  // CATEGORIA 3: PARTICIPIO PRESENTE PASSIVO
  // ==========================================
  {
    id: 'pas_pres_01',
    category: 'passive_present',
    type: 'formation',
    title: 'Formazione: I Coniugazione (-ем-)',
    instruction: 'Scegli il participio presente passivo corretto.',
    russianSentence: 'Тема, [...] на сегодняшней лекции, очень важна.',
    verbBase: 'обсуждать (мы обсуждаем - I con.)',
    italianTranslation: 'Il tema discusso nella lezione odierna è molto importante.',
    options: ['обсуждаемая', 'обсуждающая', 'обсуждённая', 'обсуждаимая'],
    correctAnswer: 'обсуждаемая',
    explanation: 'Il participio presente passivo si forma dalla 1ª plurale del presente (обсуждаем). Rimuovendo la desinenza e concordando con "тема" (femminile singolare nominativo), si aggiunge -ем- e -ая: обсуждаемая.',
    grammarTip: 'I coniugazione: мы обсуждаем → обсуждаемый (femm. обсуждаемая).',
    difficulty: 'facile'
  },
  {
    id: 'pas_pres_02',
    category: 'passive_present',
    type: 'formation',
    title: 'Formazione: II Coniugazione (-им-)',
    instruction: 'Qual è il participio presente passivo dal verbo "руководить"?',
    russianSentence: 'Отдел, [...] опытным специалистом, показал отличные результаты.',
    verbBase: 'руководить (мы руководим - II con.)',
    italianTranslation: 'Il reparto diretto da uno specialista esperto ha mostrato ottimi risultati.',
    options: ['руководимый', 'руководимыйся', 'руководящий', 'руководиемый'],
    correctAnswer: 'руководимый',
    explanation: 'Руководить è di II coniugazione (1ª plurale: руководим). Il participio presente passivo si forma con il suffisso -им-: руководимый. Chi dirige è espresso allo Strumentale (специалистом).',
    grammarTip: 'II coniugazione: мы руководим → руководимый.',
    difficulty: 'medio'
  },
  {
    id: 'pas_pres_03',
    category: 'passive_present',
    type: 'agreement_fill',
    title: 'Regola dell\'Agente allo Strumentale',
    instruction: 'Seleziona la forma corretta del participio presente passivo.',
    russianSentence: 'Это закон, [...] всеми гражданами страны.',
    highlightTarget: 'закон',
    italianTranslation: 'Questa è una legge rispettata da tutti i cittadini del paese.',
    options: ['уважаемый', 'уважающая', 'уважаемого', 'уважаемому'],
    correctAnswer: 'уважаемый',
    explanation: '"Закон" è maschile singolare nominativo. Il participio presente passivo concorda: уважаемый (da уважать). L\'agente è allo Strumentale: "всеми гражданами".',
    grammarTip: 'Accordo al Maschile Nominativo Singolare: уважаемый.',
    difficulty: 'facile'
  },
  {
    id: 'pas_pres_04',
    category: 'passive_present',
    type: 'grammar_identification',
    title: 'Distinzione Attivo vs Passivo',
    instruction: 'Che tipo di participio è "изучаемый"?',
    russianSentence: 'Предмет, изучаемый студентами, требует внимания.',
    highlightTarget: 'изучаемый',
    italianTranslation: 'La materia studiata dagli studenti richiede attenzione.',
    options: ['Participio Presente Passivo', 'Participio Presente Attivo', 'Participio Passato Passivo', 'Participio Passato Attivo'],
    correctAnswer: 'Participio Presente Passivo',
    explanation: 'Il suffisso -ем- indica un participio presente passivo (da изучать, 1ª plurale: изучаем). Indica che l\'oggetto (предмет) subisce l\'azione di essere studiato.',
    grammarTip: 'Suffissi -ем- e -им- caratterizzano il presente passivo.',
    difficulty: 'facile'
  },
  {
    id: 'pas_pres_05',
    category: 'passive_present',
    type: 'agreement_fill',
    title: 'Accordo al Prepositivo Singolare Neutro',
    instruction: 'Inserisci il participio accordato correttamente.',
    russianSentence: 'В этом [...] явлении учёные нашли закономерность.',
    highlightTarget: 'явлении (neutro prep.)',
    italianTranslation: 'In questo fenomeno osservato gli scienziati hanno trovato una regolarità.',
    options: ['наблюдаемом', 'наблюдаемый', 'наблюдаемого', 'наблюдаемому'],
    correctAnswer: 'наблюдаемом',
    explanation: '"В явлении" è neutro singolare al caso Prepositivo. Il participio concorda prendendo la desinenza -ом/-ем: наблюдаемом (da наблюдать).',
    grammarTip: 'Caso Prepositivo maschile e neutro singolare: desinenza -ом/-ем.',
    difficulty: 'medio'
  },

  // ==========================================
  // CATEGORIA 4: PARTICIPIO PASSATO PASSIVO & FORME BREVI
  // ==========================================
  {
    id: 'pas_past_01',
    category: 'passive_past',
    type: 'formation',
    title: 'Verbo in -ать: Suffisso -нн-',
    instruction: 'Qual è il participio passato passivo del verbo perfettivo?',
    russianSentence: 'Статья, [...] журналистом, вызвала споры.',
    verbBase: 'написать (СВ)',
    italianTranslation: 'L\'articolo scritto dal giornalista ha suscitato polemiche.',
    options: ['написанная', 'написавшая', 'написатая', 'написаная'],
    correctAnswer: 'написанная',
    explanation: 'I verbi perfettivi in -ать formano il participio passato passivo con il suffisso -нн- (написа-нн-ый). Concordando con "статья" (femminile): написанная con doppia "н"!',
    grammarTip: 'La forma lunga ha SEMPRE due «нн»: написанный / написанная.',
    difficulty: 'facile'
  },
  {
    id: 'pas_past_02',
    category: 'passive_past',
    type: 'formation',
    title: 'Verbo in -ить: Mutazione con epentesi di «л»',
    instruction: 'Individua il participio passato passivo con mutazione fonetica.',
    russianSentence: 'Книги, [...] вчера в магазине, уже прочитаны.',
    verbBase: 'купить (СВ, labiale п → пл)',
    italianTranslation: 'I libri acquistati ieri in libreria sono già stati letti.',
    options: ['купленные', 'купившие', 'купенные', 'купленые'],
    correctAnswer: 'купленные',
    explanation: 'Nei verbi in -ить con radice in consonante labiale (б, п, в, ф, м), si verifica la mutazione con epentesi di "л": купить → куп-л-енный. Al plurale nominativo: купленные.',
    grammarTip: 'Mutazione labiale: п → пл (купить → купленный).',
    difficulty: 'medio'
  },
  {
    id: 'pas_past_03',
    category: 'passive_past',
    type: 'formation',
    title: 'Suffisso -т-: Radici particolari',
    instruction: 'Qual è il participio passato passivo per il verbo "открыть"?',
    russianSentence: 'Окно, [...] утром, впустило свежий воздух.',
    verbBase: 'открыть (СВ)',
    italianTranslation: 'La finestra aperta al mattino ha lasciato entrare aria fresca.',
    options: ['открытое', 'открывшее', 'открынное', 'открыто'],
    correctAnswer: 'открытое',
    explanation: 'I verbi in -ыть e monosillabici prendono il suffisso -т- invece di -нн-. Da открыть si ottiene открытый; accordato al neutro con окно: открытое.',
    grammarTip: 'Verbi in -ыть / -уть / -крыть → suffisso -т- (открытый, закрытый).',
    difficulty: 'facile'
  },
  {
    id: 'pas_past_04',
    category: 'short_forms',
    type: 'agreement_fill',
    title: 'Forma Breve Passiva come Predicato',
    instruction: 'Scegli la corretta forma breve predicativa (femminile singolare).',
    russianSentence: 'Эта задача уже [...] студентами.',
    highlightTarget: 'задача (femm.)',
    italianTranslation: 'Questo problema è già stato risolto dagli studenti.',
    options: ['решена', 'решённая', 'решено', 'решенна'],
    correctAnswer: 'решена',
    explanation: 'Nelle frasi predicative passive si usa la forma breve (краткая форма). La forma breve ha una SOLA "н" e al femminile termina in -а: решена (mai *решенна!).',
    grammarTip: 'Regola fondamentale: le forme brevi hanno SEMPRE una sola «н»!',
    difficulty: 'medio'
  },
  {
    id: 'pas_past_05',
    category: 'short_forms',
    type: 'agreement_fill',
    title: 'Forma Breve al Neutro Singolare',
    instruction: 'Completa la frase con la forma breve neutra del participio.',
    russianSentence: 'Письмо было [...] ещё вчера.',
    highlightTarget: 'письмо (neutro)',
    italianTranslation: 'La lettera è stata spedita già ieri.',
    options: ['отправлено', 'отправлен', 'отправлена', 'отправленное'],
    correctAnswer: 'отправлено',
    explanation: '"Письмо" è un nome neutro singolare. La forma breve al neutro prende la desinenza -о: отправлено (da отправить → отправлен, отправлена, отправлено, отправлены).',
    grammarTip: 'Forma breve neutra: desinenza -о.',
    difficulty: 'facile'
  },
  {
    id: 'pas_past_06',
    category: 'short_forms',
    type: 'agreement_fill',
    title: 'Forma Breve al Plurale',
    instruction: 'Seleziona la forma breve corretta al plurale.',
    russianSentence: 'Все двери в здании были [...].',
    highlightTarget: 'двери (plurale)',
    italianTranslation: 'Tutte le porte dell\'edificio erano chiuse.',
    options: ['закрыты', 'закрытые', 'закрыто', 'закрыта'],
    correctAnswer: 'закрыты',
    explanation: 'Il soggetto "двери" è plurale. La forma breve del participio passivo con suffisso -т- al plurale termina in -ы: закрыты.',
    grammarTip: 'Forma breve plurale con suffisso -т-: termina in -ы (закрыты, открыты, взяты).',
    difficulty: 'facile'
  },

  // ==========================================
  // CATEGORIA 5: TRASFORMAZIONI CON «КОТОРЫЙ»
  // ==========================================
  {
    id: 'trans_01',
    category: 'transformations',
    type: 'transformation',
    title: 'Trasformazione: Proposizione con Который → Participio Attivo',
    instruction: 'Scegli la corretta trasformazione della proposizione con «который» in costrutto participiale.',
    russianSentence: 'Я знаю человека, который живёт в этом доме.',
    italianTranslation: 'Conosco la persona che vive in questa casa.',
    options: [
      'Я знаю человека, живущего в этом доме.',
      'Я знаю человека, живущий в этом доме.',
      'Я знаю человека, жившего в этом доме.',
      'Я знаю человека, который живущего в этом доме.'
    ],
    correctAnswer: 'Я знаю человека, живущего в этом доме.',
    explanation: 'Il verbo "живёт" è al presente imperfettivo → serve il participio presente attivo (живущий). Il sostantivo "человека" è all\'Accusativo animato maschile → il participio concorda all\'Accusativo animato: живущего.',
    grammarTip: 'Il participio concorda con il nome retto nella frase reggente!',
    difficulty: 'medio'
  },
  {
    id: 'trans_02',
    category: 'transformations',
    type: 'transformation',
    title: 'Trasformazione: Participio Attivo → Proposizione con Который',
    instruction: 'Trasforma la frase con participio nella corretta proposizione con «который».',
    russianSentence: 'Пассажиры, опоздавшие на поезд, ждут следующий рейс.',
    italianTranslation: 'I passeggeri arrivati in ritardo per il treno aspettano la corsa successiva.',
    options: [
      'Пассажиры, которые опоздали на поезд, ждут следующий рейс.',
      'Пассажиры, которых опоздали на поезд, ждут следующий рейс.',
      'Пассажиры, которые опаздывают на поезд, ждут следующий рейс.',
      'Пассажиры, которым опоздали на поезд, ждут следующий рейс.'
    ],
    correctAnswer: 'Пассажиры, которые опоздали на поезд, ждут следующий рейс.',
    explanation: 'Il participio "опоздавшие" è passato perfettivo. Nella subordinata con "который", il pronome sostituisce il soggetto ed è SEMPRE al Nominativo ("которые"), e il verbo va al passato perfettivo ("опоздали").',
    grammarTip: '«Который» è al Nominativo quando sostituisce un participio attivo!',
    difficulty: 'facile'
  },
  {
    id: 'trans_03',
    category: 'transformations',
    type: 'transformation',
    title: 'Trasformazione con Caso Obliquo: Dativo',
    instruction: 'Identifica la trasformazione con il corretto accordo di caso.',
    russianSentence: 'Мы помогли туристу, который потерял дорогу.',
    italianTranslation: 'Abbiamo aiutato il turista che si era perso.',
    options: [
      'Мы помогли туристу, потерявшему дорогу.',
      'Мы помогли туристу, потерявший дорогу.',
      'Мы помогли туристу, потерявшего дорогу.',
      'Мы помогли туристу, потерявшем дорогу.'
    ],
    correctAnswer: 'Мы помогли туристу, потерявшему дорогу.',
    explanation: 'Il verbo "помочь" regge il Dativo: "туристу" (maschile dativo singolare). Nella subordinata "который" era al nominativo, ma trasformato in participio deve concordare al Dativo: потерявший → потерявшему.',
    grammarTip: 'Помочь + Dativo (туристу) → Participio al Dativo (потерявшему).',
    difficulty: 'avanzato'
  },
  {
    id: 'trans_04',
    category: 'transformations',
    type: 'transformation',
    title: 'Trasformazione Passiva: Oggetto Diretto → Soggetto con Strumentale',
    instruction: 'Sostituisci la proposizione con «которую» usando il participio passato passivo.',
    russianSentence: 'Книга, которую прочитал студент, лежала на столе.',
    italianTranslation: 'Il libro che lo studente ha letto era sul tavolo.',
    options: [
      'Книга, прочитанная студентом, лежала на столе.',
      'Книга, прочитавшая студента, лежала на столе.',
      'Книга, прочитанную студентом, лежала на столе.',
      'Книга, прочитанная студент, лежала на столе.'
    ],
    correctAnswer: 'Книга, прочитанная студентом, лежала на столе.',
    explanation: 'Nella trasformazione passiva, il soggetto grammaticale resta "книга" (Nominativo femm.), il participio concorda ("прочитанная"), e chi compie l\'azione ("студент") viene posto al caso Strumentale senza preposizione ("студентом").',
    grammarTip: 'Nel costrutto passivo l\'agente si esprime sempre al caso Strumentale.',
    difficulty: 'avanzato'
  },
  {
    id: 'trans_05',
    category: 'transformations',
    type: 'transformation',
    title: 'Verbo Riflessivo nella Clausola',
    instruction: 'Trasforma la frase relativa con verbo riflessivo in costrutto participiale.',
    russianSentence: 'Я встретил девушку, которая учится в нашем университете.',
    italianTranslation: 'Ho incontrato la ragazza che studia nella nostra università.',
    options: [
      'Я встретил девушку, учащуюся в нашем университете.',
      'Я встретил девушку, учащаяся в нашем университете.',
      'Я встретил девушку, учащуюсь в нашем университете.',
      'Я встретил девушку, учившуюся в нашем университете.'
    ],
    correctAnswer: 'Я встретил девушку, учащуюся в нашем университете.',
    explanation: '"Девушку" è all\'Accusativo singolare femminile. Il verbo "учится" è al presente imperfettivo (учиться). Il participio presente attivo femminile all\'accusativo è учащуюся (-ся non si contrae mai in -сь!).',
    grammarTip: 'Accusativo femminile: -уюся (учащуюся).',
    difficulty: 'avanzato'
  },

  // ==========================================
  // ESERCIZI AGGIUNTIVI D\'ECCELLENZA (VARIED)
  // ==========================================
  {
    id: 'extra_01',
    category: 'active_present',
    type: 'formation',
    title: 'Verbo con alternanza ortografica: Писать',
    instruction: 'Qual è il participio presente attivo per "писать"?',
    russianSentence: 'Писатель, [...] новый роман, живёт за городом.',
    verbBase: 'писать (они пишут)',
    italianTranslation: 'Lo scrittore che sta scrivendo un nuovo romanzo vive fuori città.',
    options: ['пишущий', 'писающий', 'писавший', 'пишащий'],
    correctAnswer: 'пишущий',
    explanation: 'La 3ª plurale del presente di писать è пиш-ут (mutazione с → ш). Il participio presente attivo si forma da questa base: пишущий.',
    grammarTip: 'Prendi sempre la 3ª persona plurale del presente: они пишут → пишущий.',
    difficulty: 'medio'
  },
  {
    id: 'extra_02',
    category: 'active_past',
    type: 'agreement_fill',
    title: 'Accordo allo Strumentale Plurale',
    instruction: 'Completa la frase concordando il participio allo Strumentale plurale.',
    russianSentence: 'Мы гордимся спортсменами, [...] золотые медали.',
    highlightTarget: 'спортсменами',
    italianTranslation: 'Siamo orgogliosi degli atleti che hanno conquistato le medaglie d\'oro.',
    options: ['завоевавшими', 'завоевавшие', 'завоевавших', 'завоевавшим'],
    correctAnswer: 'завоевавшими',
    explanation: 'Il verbo гордиться regge lo Strumentale: "спортсменами" (plurale). La desinenza dello Strumentale plurale per i participi è -ими / -ыми: завоевавшими.',
    grammarTip: 'Strumentale plurale: desinenza -ыми / -ими.',
    difficulty: 'medio'
  },
  {
    id: 'extra_03',
    category: 'passive_past',
    type: 'agreement_fill',
    title: 'Forma Breve: Accordo Maschile Singolare',
    instruction: 'Completa con la forma breve del participio passivo (maschile singolare).',
    russianSentence: 'Этот мост был [...] в прошлом году.',
    highlightTarget: 'мост (maschile)',
    italianTranslation: 'Questo ponte è stato costruito l\'anno scorso.',
    options: ['построен', 'построена', 'построено', 'построенный'],
    correctAnswer: 'построен',
    explanation: 'Il soggetto "мост" è maschile singolare. La forma breve maschile del participio passivo termina in consonante senza desinenza vocalica: построен.',
    grammarTip: 'Forma breve maschile: desinenza zero (построен, решён, сделан).',
    difficulty: 'facile'
  },
  {
    id: 'extra_04',
    category: 'active_present',
    type: 'grammar_identification',
    title: 'Analisi sintattica della punteggiatura',
    instruction: 'Perché in "Студент, читающий книгу, сидит у окна" ci sono le virgole?',
    russianSentence: 'Студент, читающий книгу, сидит у окна.',
    highlightTarget: 'читающий книгу',
    italianTranslation: 'Lo studente che legge il libro è seduto vicino alla finestra.',
    options: [
      'Perché il costrutto participiale si trova dopo il sostantivo determinato',
      'Perché il participio è al tempo presente',
      'Perché la frase contiene un verbo riflessivo',
      'Perché il participio funge da predicato verbale'
    ],
    correctAnswer: 'Perché il costrutto participiale si trova dopo il sostantivo determinato',
    explanation: 'In russo, quando il participio con i suoi complementi (причастный оборот) segue il sostantivo a cui si riferisce, deve essere obbligatoriamente isolato da virgole.',
    grammarTip: 'Sostantivo + [Причастный оборот] → sempre isolato da virgole!',
    difficulty: 'medio'
  },
  {
    id: 'extra_05',
    category: 'passive_past',
    type: 'formation',
    title: 'Verbo in -ить: Mutazione с → ш (пригласить)',
    instruction: 'Individua il participio passato passivo con alternanza fonetica.',
    russianSentence: 'Все [...] гости уже собрались в зале.',
    verbBase: 'пригласить (СВ, alternanza с → ш)',
    italianTranslation: 'Tutti gli ospiti invitati si sono già riuniti nella sala.',
    options: ['приглашённые', 'пригласившие', 'приглашенныеся', 'пригласимые'],
    correctAnswer: 'приглашённые',
    explanation: 'Il verbo пригласить (II coniugazione in -ить) subisce la mutazione fonetica с → ш, prendendo il suffisso -ённ-: пригласить → приглашённый. Al plurale nominativo: приглашённые.',
    grammarTip: 'Alternanza consonantica: с → ш (пригласить → приглашённый).',
    difficulty: 'avanzato'
  }
];

export const EXERCISES: ExerciseItem[] = [
  ...BASE_EXERCISES,
  ...ADDITIONAL_EXERCISES_PART_1,
  ...ADDITIONAL_EXERCISES_PART_2,
  ...ADDITIONAL_EXERCISES_PART_3,
  ...ADDITIONAL_EXERCISES_PART_4,
  ...ADDITIONAL_EXERCISES_PART_5,
  ...ADDITIONAL_EXERCISES_PART_6,
];

