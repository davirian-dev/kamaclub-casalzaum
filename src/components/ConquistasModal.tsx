import React from 'react';
import { Trophy, Award, Star, Flame, MapPin, Heart, X, CheckCircle, Lock } from 'lucide-react';

interface ConquistasModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  donePositionsCount: number;
  donePlacesCount: number;
  roundNumber: number;
}

export const ConquistasModal: React.FC<ConquistasModalProps> = ({
  isOpen,
  onClose,
  score,
  donePositionsCount,
  donePlacesCount,
  roundNumber
}) => {
  if (!isOpen) return null;

  // Lista de marcos e conquistas da noite
  const conquistas = [
    {
      id: 'c-1',
      title: 'Quebrando o Gelo',
      desc: 'Iniciou a partida e concluiu a 1ª rodada',
      icon: '🥂',
      unlocked: roundNumber >= 2 || score >= 20,
      reward: '+20 pts'
    },
    {
      id: 'c-2',
      title: 'Chama Acesa',
      desc: 'Alcançou 100 pontos acumulados na noite',
      icon: '🔥',
      unlocked: score >= 100,
      reward: '+1 Coringa'
    },
    {
      id: 'c-3',
      title: 'Mestres do Kama',
      desc: 'Praticou pelo menos 1 posição do catálogo',
      icon: '👑',
      unlocked: donePositionsCount >= 1,
      reward: 'Selo Oficial'
    },
    {
      id: 'c-4',
      title: 'Exploradores Noturnos',
      desc: 'Marcou pelo menos 2 lugares ou ideias exploradas',
      icon: '🗺️',
      unlocked: donePlacesCount >= 2,
      reward: 'Troféu Ousadia'
    },
    {
      id: 'c-5',
      title: 'Resistência & Entrega',
      desc: 'Atingiu a rodada 8 ou mais de 200 pontos',
      icon: '💎',
      unlocked: roundNumber >= 8 || score >= 200,
      reward: 'Acesso VIP Moral'
    },
    {
      id: 'c-6',
      title: 'Clube Lendário',
      desc: 'Superou 350 pontos e 3 posições do Kama',
      icon: '🌟',
      unlocked: score >= 350 && donePositionsCount >= 3,
      reward: 'Casal/Grupo Lendário'
    }
  ];

  const unlockedCount = conquistas.filter((c) => c.unlocked).length;
  const progressPercent = Math.min(100, Math.round((unlockedCount / conquistas.length) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div className="card-pergaminho w-full max-w-md p-5 border-2 border-[#D4AF37] relative max-h-[90vh] overflow-y-auto space-y-4">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5C2B1D] hover:text-[#8A0E26] p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <div className="text-center border-b border-[#D4AF37]/30 pb-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#8A0E26] text-white flex items-center justify-center shadow-md mb-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
            CONQUISTAS & BARRA DE EVOLUÇÃO
          </h2>
          <p className="text-xs text-[#5C2B1D] font-serif">
            Acompanhe a intensidade e os marcos conquistados pela dupla ou grupo
          </p>
        </div>

        {/* Barra de Evolução da Partida */}
        <div className="bg-[#1C0307] p-3.5 rounded-2xl border border-[#D4AF37]/50 shadow-inner space-y-2 text-white">
          <div className="flex justify-between items-center text-xs font-cinzel">
            <span className="text-[#FFDF78] font-bold">EVOLUÇÃO DA NOITE:</span>
            <span className="text-[#FFDF78] font-bold text-sm">{progressPercent}%</span>
          </div>

          <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-[#D4AF37]/40 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-[#FFDF78] rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#F6EAD2]/70 font-sans pt-0.5">
            <span>{unlockedCount} de {conquistas.length} selos conquistados</span>
            <span className="text-amber-300 font-bold">{score} pts acumulados</span>
          </div>
        </div>

        {/* Lista de Selos & Conquistas */}
        <div className="space-y-2.5">
          <h3 className="font-cinzel font-bold text-xs text-[#8A0E26]">
            MARCOS DA RODADA:
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {conquistas.map((c) => (
              <div
                key={c.id}
                className={`p-2.5 rounded-xl border transition flex items-center justify-between ${
                  c.unlocked
                    ? 'bg-[#FAF3E3] border-[#D4AF37] shadow-sm'
                    : 'bg-[#EADDC2]/60 border-[#D4AF37]/20 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="font-cinzel font-bold text-xs text-[#2E0B12] flex items-center gap-1.5">
                      {c.title}
                      {c.unlocked && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    </h4>
                    <p className="text-[10px] text-[#5C2B1D] font-serif leading-tight">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-cinzel ${
                  c.unlocked
                    ? 'bg-[#8A0E26] text-white shadow-sm'
                    : 'bg-black/10 text-[#5C2B1D]'
                }`}>
                  {c.unlocked ? 'CONQUISTADO' : 'BLOQUEADO'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#8A0E26] hover:bg-[#A31230] text-white font-cinzel font-bold text-xs rounded-xl shadow transition"
        >
          Continuar Jogando
        </button>
      </div>
    </div>
  );
};
