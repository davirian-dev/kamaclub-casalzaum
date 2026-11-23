import React, { useState, useEffect } from 'react';
import { Challenge, GameMode } from '../types';
import { RotateCcw, Shuffle, Beer, Check, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EuNuncaViewProps {
  challenges: Challenge[];
  gameMode: GameMode;
  onAddScore: (pts: number) => void;
}

export const EuNuncaView: React.FC<EuNuncaViewProps> = ({
  challenges,
  gameMode,
  onAddScore
}) => {
  // Filtra as afirmações de Eu Nunca para o modo selecionado
  const rawList = challenges.filter((c) => c.mode === gameMode && c.type === 'eu_nunca');

  const [deck, setDeck] = useState<Challenge[]>(() => {
    return [...rawList].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Atualiza deck quando o modo de jogo mudar
  useEffect(() => {
    const filtered = challenges.filter((c) => c.mode === gameMode && c.type === 'eu_nunca');
    setDeck([...filtered].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  }, [gameMode, challenges]);

  const currentItem = deck[currentIndex % (deck.length || 1)] || rawList[0];

  // Reiniciar o Eu Nunca
  const handleResetEuNunca = () => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFDF78']
    });
    const shuffled = [...rawList].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  // Eu já fiz (bebo)
  const handleAlreadyDone = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFDF78', '#D4AF37', '#8A0E26']
    });
    onAddScore(currentItem.points || 20);
    setCurrentIndex((prev) => prev + 1);
  };

  // Eu nunca fiz (passo)
  const handleNeverDone = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Controle do Eu Nunca */}
      <div className="bg-[#1C0307] p-2.5 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs font-cinzel">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🤫</span>
          <span className="text-[#FFDF78] font-bold">
            EU NUNCA • {gameMode.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#D4AF37]/80 bg-[#120104] px-2 py-0.5 rounded border border-[#D4AF37]/20">
            {deck.length > 0 ? `${(currentIndex % deck.length) + 1} / ${deck.length}` : '0 / 0'}
          </span>
          <button
            onClick={handleResetEuNunca}
            className="flex items-center gap-1 bg-[#8A0E26] hover:bg-[#A31230] text-[#FFDF78] px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow"
            title="Reiniciar o Eu Nunca e recomeçar do início"
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar Eu Nunca
          </button>
        </div>
      </div>

      {/* Card Pergaminho Nobre do Eu Nunca */}
      <div className="card-pergaminho p-5 border-2 border-[#D4AF37]/60 text-center relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow mb-2">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          Roda do Eu Nunca • Quem já fez, bebe!
        </div>

        {/* Ilustração Temática */}
        <div className="w-20 h-20 mx-auto my-3 rounded-full border-2 border-[#D4AF37]/70 bg-[#180206] flex items-center justify-center text-4xl shadow-inner">
          🥂
        </div>

        {/* Frase do Eu Nunca */}
        <div className="min-h-[90px] flex items-center justify-center px-2 my-2">
          <p className="font-serif text-lg sm:text-xl text-[#2E0B12] leading-relaxed font-bold italic">
            "{currentItem?.text || 'Eu nunca joguei Kama & Desafios.'}"
          </p>
        </div>

        {/* Regra de Consequência */}
        <div className="bg-[#FAF2DF] border border-[#D4AF37]/30 rounded-xl p-2.5 my-3 text-xs text-[#5C2B1D]">
          <span className="font-cinzel font-bold text-[#8A0E26] block text-[10px] uppercase mb-0.5">
            CONSEQUÊNCIA:
          </span>
          <span className="font-medium">
            {currentItem?.refusalOption || 'Quem já fez esta afirmação na vida real, deve tomar 1 gole ou shot!'}
          </span>
        </div>

        {/* Botões de Ação Dinâmicos */}
        <div className="space-y-2 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAlreadyDone}
              className="py-3 px-2 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-cinzel font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5 border border-yellow-200"
            >
              <Beer className="w-4 h-4 text-black" />
              EU JÁ FIZ! (BEBO 🍺)
            </button>

            <button
              onClick={handleNeverDone}
              className="py-3 px-2 bg-[#2E0B12] hover:bg-[#45111B] text-[#F6EAD2] font-cinzel font-bold text-xs rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-1.5 border border-[#D4AF37]/40"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              NUNCA FIZ (PASSO)
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleNeverDone}
              className="flex-1 py-2 bg-[#FAF4E6] hover:bg-[#F3E5CA] border border-[#D4AF37]/50 rounded-xl text-xs font-cinzel font-bold text-[#5C2B1D] transition flex items-center justify-center gap-1"
            >
              Próxima Frase <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetEuNunca}
              className="px-4 py-2 bg-[#FAF4E6] hover:bg-[#F3E5CA] border border-[#D4AF37]/50 rounded-xl text-xs font-cinzel font-bold text-[#8A0E26] transition flex items-center justify-center gap-1"
              title="Reiniciar Eu Nunca"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
