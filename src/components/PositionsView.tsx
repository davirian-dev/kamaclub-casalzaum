import React, { useState } from 'react';
import { Position } from '../types';
import { Star, Check, Bookmark, ArrowLeft, Heart, Sparkles, SlidersHorizontal, Lock, Dices, Filter } from 'lucide-react';

interface PositionsViewProps {
  positions: Position[];
  doneIds: string[];
  favoriteIds: string[];
  todoIds: string[];
  onToggleDone: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleTodo: (id: string) => void;
  hideLgbt: boolean;
  isVip: boolean;
  onOpenVipModal: () => void;
  gameMode?: 'amigos' | 'esquenta' | 'kama';
  onGoToSetup?: () => void;
}

export const PositionsView: React.FC<PositionsViewProps> = ({
  positions,
  doneIds,
  favoriteIds,
  todoIds,
  onToggleDone,
  onToggleFavorite,
  onToggleTodo,
  hideLgbt,
  isVip,
  onOpenVipModal,
  gameMode = 'esquenta',
  onGoToSetup
}) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [filterTab, setFilterTab] = useState<'todas' | 'favoritas' | 'fazer' | 'feitas'>('todas');
  const [activeRoleView, setActiveRoleView] = useState<'ativo' | 'passivo' | 'versatil'>('ativo');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('todas');

  // Sliders de preferência (Intimidade, Complexidade, Força)
  const [intimidade, setIntimidade] = useState(3);
  const [complexidade, setComplexidade] = useState(3);
  const [showSliders, setShowSliders] = useState(false);

  // Filtra posições
  let filtered = positions;
  if (hideLgbt) {
    filtered = filtered.filter((p) => p.category !== 'lgbtqia' && p.category !== 'menage' && p.category !== 'swing');
  }

  if (selectedCategory !== 'todas') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (selectedComplexity !== 'todas') {
    filtered = filtered.filter((p) => p.complexity === selectedComplexity);
  }

  if (filterTab === 'favoritas') {
    filtered = filtered.filter((p) => favoriteIds.includes(p.id));
  } else if (filterTab === 'fazer') {
    filtered = filtered.filter((p) => todoIds.includes(p.id));
  } else if (filterTab === 'feitas') {
    filtered = filtered.filter((p) => doneIds.includes(p.id));
  }

  const handleRandomPosition = () => {
    if (filtered.length === 0) return;
    const rand = filtered[Math.floor(Math.random() * filtered.length)];
    setSelectedPosition(rand);
  };

  // Se o Modo Amigos (Leve) estiver ativado, bloqueia/oculta posições íntimas
  if (gameMode === 'amigos') {
    return (
      <div className="space-y-4 pb-20">
        <div className="card-pergaminho p-6 border-2 border-[#D4AF37]/60 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#8A0E26]/20 border border-[#D4AF37] flex items-center justify-center text-3xl">
            🥂
          </div>
          <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
            MODO AMIGOS (LEVE) ATIVO
          </h2>
          <p className="text-xs sm:text-sm text-[#5C2B1D] font-serif leading-relaxed px-2">
            No modo <strong>Amigos (Leve)</strong>, todas as posições íntimas e explícitas ficam protegidas e ocultadas para evitar constrangimentos na roda social.
          </p>
          <p className="text-xs text-[#8A0E26] font-medium">
            Para liberar o catálogo completo de posições, alterne o clima da partida para <strong>Esquenta</strong> ou <strong>Kama +18</strong> na aba Roda / Perfis.
          </p>

          {onGoToSetup && (
            <div className="pt-2">
              <button
                onClick={onGoToSetup}
                className="w-full py-3 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] hover:brightness-110 text-white font-cinzel font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                ALTERAR MODO DA PARTIDA
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Visualização Detalhada da Posição
  if (selectedPosition) {
    const isDone = doneIds.includes(selectedPosition.id);
    const isFav = favoriteIds.includes(selectedPosition.id);
    const isTodo = todoIds.includes(selectedPosition.id);
    const isLocked = selectedPosition.isVip && !isVip;

    return (
      <div className="space-y-4 pb-20">
        <button
          onClick={() => setSelectedPosition(null)}
          className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#FFDF78] font-cinzel font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" /> VOLTAR AO CATÁLOGO
        </button>

        {/* Card Principal da Posição */}
        <div className="card-pergaminho p-4 sm:p-5 border-2 border-[#D4AF37]/60 space-y-3">
          {/* Título e Subtítulo */}
          <div className="text-center border-b border-[#D4AF37]/30 pb-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#2E0B12]">
              {selectedPosition.title}
            </h2>
            <p className="text-xs text-[#6E3C2B] italic font-serif">
              {selectedPosition.subtitle}
            </p>
          </div>

          {/* Tags de Classificação */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-sans">
            <span className="bg-[#EEDBB7] px-2 py-0.5 rounded text-[#421913] font-medium">
              {selectedPosition.complexity}
            </span>
            <span className="bg-[#EEDBB7] px-2 py-0.5 rounded text-[#421913] font-medium">
              {selectedPosition.location}
            </span>
            <span className="bg-[#8A0E26] text-white px-2 py-0.5 rounded font-medium">
              Intensidade: {selectedPosition.intensity}
            </span>
            <span className="text-amber-700 flex items-center gap-0.5 font-bold">
              ★ {selectedPosition.rating}.0
            </span>
          </div>

          {/* Ilustração em Destaque */}
          <div className="w-full h-56 rounded-xl border border-[#D4AF37]/50 overflow-hidden bg-[#180206] relative shadow-inner">
            <img
              src={selectedPosition.illustrationUrl}
              alt={selectedPosition.title}
              className={`w-full h-full object-cover transition ${isLocked ? 'blur-md opacity-40' : 'hover:scale-105'}`}
            />
            {isLocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-center">
                <Lock className="w-8 h-8 text-yellow-400 mb-1" />
                <span className="font-cinzel font-bold text-xs text-white">POSIÇÃO EXCLUSIVA VIP</span>
                <button
                  onClick={onOpenVipModal}
                  className="mt-2 px-4 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-cinzel font-bold text-xs rounded-full shadow-lg"
                >
                  Liberar via Mercado Pago (Pix)
                </button>
              </div>
            )}
          </div>

          {/* Seletor Dinâmico por Papel (Ativo / Passivo / Versátil) */}
          <div className="bg-[#EFE2C8] p-2.5 rounded-xl border border-[#D4AF37]/40 space-y-2">
            <span className="text-[10px] font-cinzel font-bold text-[#5C2B1D] block text-center">
              DICAS PERSONALIZADAS POR PAPEL:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-sans">
              <button
                onClick={() => setActiveRoleView('ativo')}
                className={`py-1 rounded text-center transition ${
                  activeRoleView === 'ativo'
                    ? 'bg-[#8A0E26] text-white font-bold'
                    : 'bg-[#FCF8EE] text-[#421913]'
                }`}
              >
                🔵 Ativo(a)
              </button>
              <button
                onClick={() => setActiveRoleView('passivo')}
                className={`py-1 rounded text-center transition ${
                  activeRoleView === 'passivo'
                    ? 'bg-[#124B28] text-white font-bold'
                    : 'bg-[#FCF8EE] text-[#421913]'
                }`}
              >
                🟢 Passivo(a)
              </button>
              <button
                onClick={() => setActiveRoleView('versatil')}
                className={`py-1 rounded text-center transition ${
                  activeRoleView === 'versatil'
                    ? 'bg-[#5C2B1D] text-white font-bold'
                    : 'bg-[#FCF8EE] text-[#421913]'
                }`}
              >
                🔄 Versátil
              </button>
            </div>

            <p className="text-xs text-[#381A12] font-serif leading-relaxed italic bg-[#FAF4E6] p-2 rounded-lg">
              {activeRoleView === 'ativo' && (selectedPosition.activeTip || 'Mantenha ritmo e controle de sustentação.')}
              {activeRoleView === 'passivo' && (selectedPosition.passiveTip || 'Apoie o tronco e relaxe a respiração.')}
              {activeRoleView === 'versatil' && (selectedPosition.versatileTip || 'Revezem a condução do movimento para descanso mútuo.')}
            </p>
          </div>

          {/* Passo a Passo de Execução */}
          <div className="space-y-1.5 text-xs text-[#2E0B12] font-sans">
            <h3 className="font-cinzel font-bold text-xs text-[#8A0E26]">
              Como Fazer Passo a Passo:
            </h3>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              {selectedPosition.instructions.map((inst, i) => (
                <li key={i} className="leading-relaxed">
                  {inst}
                </li>
              ))}
            </ol>
          </div>

          {/* Dica de Conforto */}
          <div className="bg-[#F3E5CA] border-l-2 border-[#8A0E26] p-2.5 rounded-r-lg text-xs text-[#421913] font-sans">
            <strong className="text-[#8A0E26] block font-cinzel text-[11px] mb-0.5">
              Dica de Conforto:
            </strong>
            {selectedPosition.comfortTip}
          </div>

          {/* Barra de Ações (Feita, Favorita, Fazer) */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D4AF37]/30">
            <button
              onClick={() => onToggleDone(selectedPosition.id)}
              className={`py-2 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1 transition ${
                isDone
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-[#3D120B] text-[#F6EAD2] hover:bg-[#52190F]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              {isDone ? 'Feita (+40 pts)' : 'Já Fiz'}
            </button>

            <button
              onClick={() => onToggleFavorite(selectedPosition.id)}
              className={`py-2 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1 transition ${
                isFav
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-[#3D120B] text-[#F6EAD2] hover:bg-[#52190F]'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              {isFav ? 'Favorita' : 'Favoritar'}
            </button>

            <button
              onClick={() => onToggleTodo(selectedPosition.id)}
              className={`py-2 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1 transition ${
                isTodo
                  ? 'bg-[#8A0E26] text-white shadow-md'
                  : 'bg-[#3D120B] text-[#F6EAD2] hover:bg-[#52190F]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              {isTodo ? 'Na Lista' : 'Quero Fazer'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lista do Catálogo com Filtros
  return (
    <div className="space-y-4 pb-20">
      {/* Abas Superiores (Todas, Favoritas, Fazer, Feitas) + Botão Aleatório */}
      <div className="flex items-center justify-between gap-1 bg-[#1A0206] p-1.5 rounded-xl border border-[#D4AF37]/30">
        <div className="flex gap-1 overflow-x-auto">
          {(['todas', 'favoritas', 'fazer', 'feitas'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`py-1 px-2.5 rounded-lg text-[11px] capitalize font-cinzel transition whitespace-nowrap ${
                filterTab === tab
                  ? 'bg-[#8A0E26] text-[#FFDF78] font-bold shadow-sm'
                  : 'text-[#F6EAD2]/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={handleRandomPosition}
          className="py-1 px-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-[#1F0307] font-cinzel font-bold text-[11px] rounded-lg shadow hover:brightness-110 active:scale-95 transition flex items-center gap-1 whitespace-nowrap"
          title="Abrir uma posição aleatória do catálogo"
        >
          <Dices className="w-3.5 h-3.5" /> Aleatório
        </button>
      </div>

      {/* Filtros Rápidos de Categoria */}
      <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-sans">
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'classicas', label: 'Clássicas' },
          { id: 'controle', label: 'Controle' },
          { id: 'profundidade', label: 'Profundidade' },
          { id: 'acrobaticas', label: 'Acrobáticas' },
          { id: 'oral', label: 'Oral' },
          ...(!hideLgbt ? [{ id: 'menage', label: 'Ménage' }, { id: 'lgbtqia', label: 'LGBTQIA+' }] : [])
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2 py-1 rounded-full whitespace-nowrap border transition ${
              selectedCategory === cat.id
                ? 'bg-[#8A0E26] text-white border-[#D4AF37] font-bold shadow-xs'
                : 'bg-[#1F0307] text-[#F6EAD2]/70 border-[#D4AF37]/30 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Botão de Sliders de Desejo */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowSliders(!showSliders)}
          className="flex items-center gap-1 text-xs text-[#FFDF78] font-cinzel"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {showSliders ? 'Ocultar Filtros de Desejo' : 'Filtrar por Desejo (Sliders)'}
        </button>
      </div>

      {/* Painel de Sliders */}
      {showSliders && (
        <div className="card-pergaminho p-3 border border-[#D4AF37]/50 space-y-3">
          <div>
            <div className="flex justify-between text-xs text-[#421913] font-bold">
              <span>Intimidade:</span>
              <span>{intimidade} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={intimidade}
              onChange={(e) => setIntimidade(Number(e.target.value))}
              className="w-full accent-[#8A0E26] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#421913] font-bold">
              <span>Complexidade:</span>
              <span>{complexidade} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={complexidade}
              onChange={(e) => setComplexidade(Number(e.target.value))}
              className="w-full accent-[#8A0E26] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Lista das Posições em Formato Pergaminho */}
      <div className="space-y-2.5">
        {filtered.map((pos) => {
          const isDone = doneIds.includes(pos.id);
          const isFav = favoriteIds.includes(pos.id);

          return (
            <div
              key={pos.id}
              onClick={() => setSelectedPosition(pos)}
              className="card-pergaminho p-3 border border-[#D4AF37]/50 flex items-center justify-between cursor-pointer hover:brightness-105 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-black/40 flex-shrink-0">
                  <img
                    src={pos.illustrationUrl}
                    alt={pos.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-sm text-[#2E0B12] flex items-center gap-1.5">
                    {pos.title}
                    {pos.isVip && !isVip && <Lock className="w-3 h-3 text-amber-700" />}
                  </h3>
                  <p className="text-[11px] text-[#6E3C2B] line-clamp-1 font-serif">
                    {pos.subtitle}
                  </p>
                  <span className="text-[10px] text-[#8A0E26] font-semibold mt-0.5 block">
                    {pos.complexity} • {pos.location}
                  </span>
                </div>
              </div>

              {/* Status à Direita */}
              <div className="flex items-center gap-1">
                {isFav && <Star className="w-4 h-4 text-amber-600 fill-amber-600" />}
                {isDone && <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
