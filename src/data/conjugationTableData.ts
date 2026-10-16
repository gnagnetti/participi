export interface DeclensionRow {
  caseName: string;
  caseItalian: string;
  questionRu: string;
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
}

export const ACTIVE_PRESENT_DECLENSION: DeclensionRow[] = [
  { caseName: 'Именительный (Nom)', caseItalian: 'Nominativo', questionRu: 'кто? что?', masculine: 'читающий', feminine: 'читающая', neuter: 'читающее', plural: 'читающие' },
  { caseName: 'Родительный (Gen)', caseItalian: 'Genitivo', questionRu: 'кого? чего?', masculine: 'читающего', feminine: 'читающей', neuter: 'читающего', plural: 'читающих' },
  { caseName: 'Дательный (Dat)', caseItalian: 'Dativo', questionRu: 'кому? чему?', masculine: 'читающему', feminine: 'читающей', neuter: 'читающему', plural: 'читающим' },
  { caseName: 'Винительный (Acc anim)', caseItalian: 'Accusativo animato', questionRu: 'кого?', masculine: 'читающего', feminine: 'читающую', neuter: 'читающее', plural: 'читающих' },
  { caseName: 'Винительный (Acc inanim)', caseItalian: 'Accusativo inanimato', questionRu: 'что?', masculine: 'читающий', feminine: 'читающую', neuter: 'читающее', plural: 'читающие' },
  { caseName: 'Творительный (Instr)', caseItalian: 'Strumentale', questionRu: 'кем? чем?', masculine: 'читающим', feminine: 'читающей (-ею)', neuter: 'читающим', plural: 'читающими' },
  { caseName: 'Предложный (Prep)', caseItalian: 'Prepositivo', questionRu: 'о ком? о чём?', masculine: 'о читающем', feminine: 'о читающей', neuter: 'о читающем', plural: 'о читающих' },
];

export const PASSIVE_PAST_DECLENSION: DeclensionRow[] = [
  { caseName: 'Именительный (Nom)', caseItalian: 'Nominativo', questionRu: 'кто? что?', masculine: 'прочитанный', feminine: 'прочитанная', neuter: 'прочитанное', plural: 'прочитанные' },
  { caseName: 'Родительный (Gen)', caseItalian: 'Genitivo', questionRu: 'кого? чего?', masculine: 'прочитанного', feminine: 'прочитанной', neuter: 'прочитанного', plural: 'прочитанных' },
  { caseName: 'Дательный (Dat)', caseItalian: 'Dativo', questionRu: 'кому? чему?', masculine: 'прочитанному', feminine: 'прочитанной', neuter: 'прочитанному', plural: 'прочитанным' },
  { caseName: 'Винительный (Acc anim)', caseItalian: 'Accusativo animato', questionRu: 'кого?', masculine: 'прочитанного', feminine: 'прочитанную', neuter: 'прочитанное', plural: 'прочитанных' },
  { caseName: 'Винительный (Acc inanim)', caseItalian: 'Accusativo inanimato', questionRu: 'что?', masculine: 'прочитанный', feminine: 'прочитанную', neuter: 'прочитанное', plural: 'прочитанные' },
  { caseName: 'Творительный (Instr)', caseItalian: 'Strumentale', questionRu: 'кем? чем?', masculine: 'прочитанным', feminine: 'прочитанной', neuter: 'прочитанным', plural: 'прочитанными' },
  { caseName: 'Предложный (Prep)', caseItalian: 'Prepositivo', questionRu: 'о ком? о чём?', masculine: 'о прочитанном', feminine: 'о прочитанной', neuter: 'о прочитанном', plural: 'о прочитанных' },
];

export interface SuffixOverviewItem {
  participleType: string;
  italianName: string;
  aspect: string;
  suffixes: string;
  formationStem: string;
  modelVerb: string;
  modelResult: string;
  shortForms?: string;
  notes: string;
}

export const SUFFIX_MATRIX: SuffixOverviewItem[] = [
  {
    participleType: 'Действительное настоящее',
    italianName: 'Presente Attivo',
    aspect: 'Solo НСВ (Imperfettivo)',
    suffixes: '-ущ- / -ющ- (I con.)\n-ащ- / -ящ- (II con.)',
    formationStem: '3ª plurale presente (они...)',
    modelVerb: 'читать (I) / говорить (II)',
    modelResult: 'читающий / говорящий',
    notes: 'Riflessivo: -ся costante (улыбающийся). Nessuna forma breve.'
  },
  {
    participleType: 'Действительное прошедшее',
    italianName: 'Passato Attivo',
    aspect: 'Sia НСВ che СВ',
    suffixes: '-вш- (dopo vocale)\n-ш- (dopo consonante)',
    formationStem: 'Passato maschile (он...) senza -л',
    modelVerb: 'написать / нести / прийти',
    modelResult: 'написавший / нёсший / пришедший',
    notes: 'Riflessivo: -ся costante. Verbi in -ну- perdono spesso il suffisso (погибший).'
  },
  {
    participleType: 'Страдательное настоящее',
    italianName: 'Presente Passivo',
    aspect: 'Solo НСВ transitivi',
    suffixes: '-ем- (I con.)\n-им- (II con.)',
    formationStem: '1ª plurale presente (мы...)',
    modelVerb: 'читать (I) / любить (II)',
    modelResult: 'читаемый / любимый',
    shortForms: 'читаем, читаема, читаемо, читаемы',
    notes: 'L\'agente va al caso Strumentale senza preposizione.'
  },
  {
    participleType: 'Страдательное прошедшее',
    italianName: 'Passato Passivo',
    aspect: 'Quasi solo СВ transitivi',
    suffixes: '-нн- (in -ать/-ять)\n-енн- / -ённ- (in -ить)\n-т- (monosillabi, -ыть, ecc.)',
    formationStem: 'Infinito / passato del perfettivo',
    modelVerb: 'написать / построить / открыть',
    modelResult: 'написанный / построенный / открытый',
    shortForms: 'написан, -а, -о, -ы (1 sola «н»!) / открыт, -а, -о, -ы',
    notes: 'Fondamentali le forme brevi usate come predicato della frase passiva!'
  }
];

export const CONSONANT_MUTATIONS = [
  { original: 'б → бл', example: 'любить → любленный' },
  { original: 'п → пл', example: 'купить → купленный' },
  { original: 'в → вл', example: 'составить → составленный' },
  { original: 'ф → фл', example: 'разграфить → разграфленный' },
  { original: 'м → мл', example: 'утомить → утомленный' },
  { original: 'д → жд / ж', example: 'родить → рождённый, освободить → освобождённый' },
  { original: 'т → ч / щ', example: 'встретить → встреченный, возвратить → возвращённый' },
  { original: 'з → ж', example: 'выразить → выраженный' },
  { original: 'с → ш', example: 'пригласить → приглашённый' },
  { original: 'ст → щ', example: 'простить → прощённый' },
];
