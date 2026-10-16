import React, { useState } from 'react';
import { Table2, Volume2, Search, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  ACTIVE_PRESENT_DECLENSION, 
  PASSIVE_PAST_DECLENSION, 
  SUFFIX_MATRIX, 
  CONSONANT_MUTATIONS 
} from '../data/conjugationTableData';
import { speakRussian } from '../utils/speech';

export const CheatSheetSection: React.FC = () => {
  const [selectedDeclension, setSelectedDeclension] = useState<'active' | 'passive'>('active');
  const [selectedGender, setSelectedGender] = useState<'all' | 'm' | 'f' | 'n' | 'pl'>('all');
  const [activeTab, setActiveTab] = useState<'matrix' | 'declension' | 'mutations'>('matrix');

  const currentDeclensionData = selectedDeclension === 'active' 
    ? ACTIVE_PRESENT_DECLENSION 
    : PASSIVE_PAST_DECLENSION;

  const modelWord = selectedDeclension === 'active' ? 'читающий (leggente)' : 'прочитанный (letto)';

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <Table2 className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Tavola Sinottica & Declinazioni
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Consulta i suffissi, le desinenze di tutti i casi grammaticali russi e le mutazioni consonantiche fonetiche senza uscire dall'app.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mt-3 pt-3 border-t border-slate-700/80">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Matrice Suffissi
          </button>
          <button
            onClick={() => setActiveTab('declension')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'declension'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Tabella dei Casi
          </button>
          <button
            onClick={() => setActiveTab('mutations')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mutations'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Mutazioni -ить
          </button>
        </div>
      </div>

      {/* View 1: Suffix Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-3">
          <div className="space-y-3">
            {SUFFIX_MATRIX.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-md space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.italianName}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 font-sans">
                      {item.participleType}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                    {item.aspect}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Suffissi:</span>
                    <p className="font-mono font-bold text-amber-300 whitespace-pre-line text-sm">
                      {item.suffixes}
                    </p>
                  </div>
                  <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Base di Formazione:</span>
                    <p className="text-slate-200">
                      {item.formationStem}
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase block">Modello Esempio:</span>
                    <p className="text-slate-200">
                      {item.modelVerb} → <strong className="text-indigo-200 font-sans">{item.modelResult}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => speakRussian(item.modelResult)}
                    className="p-1.5 rounded-lg bg-indigo-900/40 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {item.shortForms && (
                  <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-2.5 text-xs">
                    <span className="text-[10px] text-rose-400 font-bold uppercase block">Forme Brevi (Краткие формы):</span>
                    <p className="text-rose-200 font-medium font-sans">
                      {item.shortForms}
                    </p>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 italic">
                  💡 {item.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Declension Table */}
      {activeTab === 'declension' && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Model Selector */}
            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedDeclension('active')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDeclension === 'active'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Attivo (читающий)
              </button>
              <button
                onClick={() => setSelectedDeclension('passive')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDeclension === 'passive'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Passivo (прочитанный)
              </button>
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-medium mr-1">Filtro:</span>
              {(['all', 'm', 'f', 'n', 'pl'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedGender === g
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g === 'all' ? 'Tutti' : g === 'm' ? 'Masch' : g === 'f' ? 'Femm' : g === 'n' ? 'Neutr' : 'Plur'}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Declinazione di riferimento: <strong className="text-amber-300 font-sans">{modelWord}</strong></span>
            <span className="text-[10px] text-slate-500">Tocca una forma per ascoltarla</span>
          </div>

          {/* Responsive Declension Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-700/80 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-700 font-bold">
                  <th className="py-2.5 px-3 min-w-[130px]">Caso Russo</th>
                  {(selectedGender === 'all' || selectedGender === 'm') && (
                    <th className="py-2.5 px-3 text-sky-300 min-w-[105px]">Maschile</th>
                  )}
                  {(selectedGender === 'all' || selectedGender === 'f') && (
                    <th className="py-2.5 px-3 text-rose-300 min-w-[105px]">Femminile</th>
                  )}
                  {(selectedGender === 'all' || selectedGender === 'n') && (
                    <th className="py-2.5 px-3 text-amber-300 min-w-[105px]">Neutro</th>
                  )}
                  {(selectedGender === 'all' || selectedGender === 'pl') && (
                    <th className="py-2.5 px-3 text-emerald-300 min-w-[105px]">Plurale</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-sans">
                {currentDeclensionData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-300">
                      <div className="font-sans text-[11px] text-white">{row.caseName}</div>
                      <div className="text-[10px] text-slate-400 italic font-mono">{row.questionRu}</div>
                    </td>
                    {(selectedGender === 'all' || selectedGender === 'm') && (
                      <td 
                        onClick={() => speakRussian(row.masculine)}
                        className="py-2 px-3 text-slate-100 hover:text-amber-300 hover:bg-slate-800 cursor-pointer font-medium"
                      >
                        {row.masculine}
                      </td>
                    )}
                    {(selectedGender === 'all' || selectedGender === 'f') && (
                      <td 
                        onClick={() => speakRussian(row.feminine)}
                        className="py-2 px-3 text-slate-100 hover:text-amber-300 hover:bg-slate-800 cursor-pointer font-medium"
                      >
                        {row.feminine}
                      </td>
                    )}
                    {(selectedGender === 'all' || selectedGender === 'n') && (
                      <td 
                        onClick={() => speakRussian(row.neuter)}
                        className="py-2 px-3 text-slate-100 hover:text-amber-300 hover:bg-slate-800 cursor-pointer font-medium"
                      >
                        {row.neuter}
                      </td>
                    )}
                    {(selectedGender === 'all' || selectedGender === 'pl') && (
                      <td 
                        onClick={() => speakRussian(row.plural)}
                        className="py-2 px-3 text-slate-100 hover:text-amber-300 hover:bg-slate-800 cursor-pointer font-medium"
                      >
                        {row.plural}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <p>
              💡 <strong>Regola dell'Accusativo maschile e plurale:</strong> Se il sostantivo è animato (persone o animali), l'Accusativo è uguale al Genitivo (-его / -их). Se inanimato (cose o concetti), l'Accusativo è uguale al Nominativo (-ий/-ый / -ие/-ые).
            </p>
          </div>
        </div>
      )}

      {/* View 3: Consonant Mutations */}
      {activeTab === 'mutations' && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Mutazioni Consonantiche nei Participi Passati in -ить
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Nei verbi di II coniugazione in -ить, l'aggiunta del suffisso participiale <strong className="text-amber-300">-енн- / -ённ-</strong> provoca spesso una mutazione o epentesi della consonante finale della radice:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CONSONANT_MUTATIONS.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-mono font-bold text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {m.original}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 mt-1.5 font-sans">
                    {m.example}
                  </p>
                </div>
                <button
                  onClick={() => speakRussian(m.example)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-amber-300 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Reflexive Rule Card */}
          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3 space-y-1 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Regola d'oro della Particella Riflessiva (-ся)</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Nei verbi riflessivi, la particella finale è SEMPRE <strong className="text-amber-300">-ся</strong> e non si contrae mai in <em>-сь</em> nei participi lunghi e nei casi obliqui.
              Esempi: <em>улыбающийся</em>, <em>улыбающаяся</em>, <em>улыбающегося</em>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
