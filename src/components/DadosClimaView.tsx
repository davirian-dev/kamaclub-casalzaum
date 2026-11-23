import React, { useState } from 'react';
import { GameMode, Participant } from '../types';
import { Dices, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DadosClimaViewProps {
  gameMode: GameMode;
  participants: Participant[];
  onAddScore: (pts: number) => void;
}

export const DadosClimaView: React.FC<DadosClimaViewProps> = ({
  gameMode,
  participants,
  onAddScore
}) => {
  // Ações por modo
  const ACOES_AMIGOS = [
    'Imitar uma celebridade',
    'Contar uma história embaraçosa',
    'Fazer uma dança engraçada',
    'Falar com sotaque diferente',
    'Mandar um elogio sincero',
    'Dar um abraço caloroso'
  ];

  const ACOES_INTIMAS = [
    'Massagem com óleo morno',
    'Beijos no pescoço e nuca',
    'Sussurrar fantasias no ouvido',
    'Carícias suaves nas costas',
    'Despir uma peça de roupa',
    'Beijo ardente de cinema',
    'Passar gelo ou calor na pele',
    'Mordidinhas no lóbulo da orelha'
  ];

  const RITMOS_AMIGOS = [
    'Em câmera lenta',
    'Sem poder rir',
    'Falando rimado',
    'Em tom dramático de novela',
    'Durante 30 segundos',
    'Com os olhos fechados'
  ];

  const RITMOS_INTIMOS = [
    'Super Lento & Provocante',
    'Olhos nos olhos a 5cm',
    'Com os olhos vendados',
    'Sem poder usar as mãos',
    'Ritmo acelerado & intenso',
    'Sussurrando palavras quentes',
    'Durante 1 minuto ininterrupto'
  ];

  const LOCAIS_AMIGOS = [
    'No meio da roda',
    'Em pé na sala',
    'Sentado no chão',
    'Perto da porta',
    'No sofá de braços abertos',
    'Em volta da mesa'
  ];

  const LOCAIS_INTIMOS = [
    'Na cama entre travesseiros',
    'Em frente ao espelho grande',
    'No tapete da sala à meia-luz',
    'No sofá macio',
    'No balcão da cozinha',
    'No chuveiro morno'
  ];

  const acoes = gameMode === 'amigos' ? ACOES_AMIGOS : ACOES_INTIMAS;
  const ritmos = gameMode === 'amigos' ? RITMOS_AMIGOS : RITMOS_INTIMOS;
  const locais = gameMode === 'amigos' ? LOCAIS_AMIGOS : LOCAIS_INTIMOS;

  const [dadoAcao, setDadoAcao] = useState(acoes[0]);
  const [dadoRitmo, setDadoRitmo] = useState(ritmos[0]);
  const [dadoLocal, setDadoLocal] = useState(locais[0]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDices = () => {
    if (isRolling) return;
    setIsRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setDadoAcao(acoes[Math.floor(Math.random() * acoes.length)]);
      setDadoRitmo(ritmos[Math.floor(Math.random() * ritmos.length)]);
      setDadoLocal(locais[Math.floor(Math.random() * locais.length)]);
      count++;

      if (count > 10) {
        clearInterval(interval);
        setIsRolling(false);
        setHasRolled(true);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFDF78', '#8A0E26']
        });
      }
    }, 100);
  };

  const handleComplete = () => {
    onAddScore(50);
    setHasRolled(false);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="card-pergaminho p-4 sm:p-5 border-2 border-[#D4AF37]/60 text-center space-y-4">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
        <div className="flex items-center gap-2">
          <Dices className="w-5 h-5 text-[#8A0E26]" />
          <h2 className="font-cinzel font-bold text-sm sm:text-base text-[#2E0B12]">
            DADO DO CLIMA & ESTILO
          </h2>
        </div>
        <span className="text-[10px] bg-[#8A0E26] text-white font-bold px-2 py-0.5 rounded-full font-cinzel">
          Modo {gameMode}
        </span>
      </div>

      <p className="text-xs text-[#5C2B1D] font-serif leading-relaxed px-1">
        Gire os 3 dados mágicos para combinar uma <strong>Ação</strong>, um <strong>Ritmo</strong> e um <strong>Ambiente</strong> imediato!
      </p>

      {/* Grid com os 3 Dados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
        {/* Dado 1: Ação */}
        <div className="bg-[#1C0307] p-3 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md flex flex-col justify-between min-h-[90px]">
          <span className="text-[10px] text-[#D4AF37] font-cinzel font-bold uppercase tracking-wider block">
            🎲 1. AÇÃO
          </span>
          <span className={`text-xs sm:text-sm font-bold my-auto ${isRolling ? 'text-amber-400 animate-pulse' : 'text-[#FFDF78]'}`}>
            {dadoAcao}
          </span>
          <span className="text-[9px] text-[#F6EAD2]/50">O que fazer</span>
        </div>

        {/* Dado 2: Ritmo */}
        <div className="bg-[#1C0307] p-3 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md flex flex-col justify-between min-h-[90px]">
          <span className="text-[10px] text-[#D4AF37] font-cinzel font-bold uppercase tracking-wider block">
            🎲 2. RITMO / ESTILO
          </span>
          <span className={`text-xs sm:text-sm font-bold my-auto ${isRolling ? 'text-amber-400 animate-pulse' : 'text-[#FFDF78]'}`}>
            {dadoRitmo}
          </span>
          <span className="text-[9px] text-[#F6EAD2]/50">Como conduzir</span>
        </div>

        {/* Dado 3: Local */}
        <div className="bg-[#1C0307] p-3 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md flex flex-col justify-between min-h-[90px]">
          <span className="text-[10px] text-[#D4AF37] font-cinzel font-bold uppercase tracking-wider block">
            🎲 3. AMBIENTE
          </span>
          <span className={`text-xs sm:text-sm font-bold my-auto ${isRolling ? 'text-amber-400 animate-pulse' : 'text-[#FFDF78]'}`}>
            {dadoLocal}
          </span>
          <span className="text-[9px] text-[#F6EAD2]/50">Onde realizar</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="space-y-2 pt-1">
        <button
          onClick={rollDices}
          disabled={isRolling}
          className="w-full py-3 bg-gradient-to-r from-[#8A0E26] via-[#B5173B] to-[#8A0E26] hover:brightness-110 active:scale-98 text-white font-cinzel font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-[#D4AF37]/50 disabled:opacity-50"
        >
          <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'Rolando os Dados...' : 'ROLAR DADOS DO CLIMA'}
        </button>

        {hasRolled && (
          <button
            onClick={handleComplete}
            className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-[#1F0307] font-cinzel font-bold text-xs rounded-xl shadow transition hover:brightness-110 flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-[#8A0E26]" />
            CUMPRI ESSA COMBINAÇÃO (+50 pts)
          </button>
        )}
      </div>
    </div>
  );
};
