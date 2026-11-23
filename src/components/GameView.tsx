import React, { useState, useEffect } from 'react';
import { Challenge, Participant, GameMode } from '../types';
import { Play, Pause, RotateCcw, Beer, Award, CheckCircle, RefreshCw, Flame, Wine } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameViewProps {
  challenges: Challenge[];
  participants: Participant[];
  gameMode: GameMode;
  onAddScore: (pts: number) => void;
  onUseCoringa: () => boolean; // retorna true se conseguiu usar
  score: number;
  coringas: number;
}

export const GameView: React.FC<GameViewProps> = ({
  challenges,
  participants,
  gameMode,
  onAddScore,
  onUseCoringa,
  score,
  coringas
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timerLeft, setTimerLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeAuthor, setActiveAuthor] = useState<Participant | null>(null);
  const [activeTarget, setActiveTarget] = useState<Participant | null>(null);
  const [bottleAngle, setBottleAngle] = useState(0);
  const [isSpinningBottle, setIsSpinningBottle] = useState(false);

  // Filtra desafios pelo modo da partida
  const availableChallenges = challenges.filter((c) => c.mode === gameMode);
  const currentChallenge = availableChallenges[currentIdx % availableChallenges.length] || challenges[0];

  // Sorteia quem faz e quem recebe com respeito à orientação sexual
  const sortParticipants = () => {
    if (participants.length < 2) {
      setActiveAuthor(participants[0] || null);
      setActiveTarget(participants[0] || null);
      return;
    }

    const authorIdx = Math.floor(Math.random() * participants.length);
    const author = participants[authorIdx];
    setActiveAuthor(author);

    // Filtra alvos compatíveis
    let possibleTargets = participants.filter((p) => p.id !== author.id);
    if (!author.interactsWithAll) {
      if (author.orientation === 'hetero') {
        const isAuthorMale = author.gender.includes('homem');
        possibleTargets = possibleTargets.filter((p) =>
          isAuthorMale ? p.gender.includes('mulher') : p.gender.includes('homem')
        );
      } else if (author.orientation === 'gay') {
        possibleTargets = possibleTargets.filter((p) => p.gender.includes('homem'));
      } else if (author.orientation === 'lesbica') {
        possibleTargets = possibleTargets.filter((p) => p.gender.includes('mulher'));
      }
    }

    if (possibleTargets.length === 0) {
      possibleTargets = participants.filter((p) => p.id !== author.id);
    }

    const targetIdx = Math.floor(Math.random() * possibleTargets.length);
    setActiveTarget(possibleTargets[targetIdx] || author);
  };

  useEffect(() => {
    sortParticipants();
    if (currentChallenge?.timeSeconds) {
      setTimerLeft(currentChallenge.timeSeconds);
    } else {
      setTimerLeft(null);
    }
    setIsTimerRunning(false);
  }, [currentIdx, gameMode, participants]);

  // Controle do Cronômetro
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timerLeft !== null && timerLeft > 0) {
      interval = window.setInterval(() => {
        setTimerLeft((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
    } else if (timerLeft === 0) {
      setIsTimerRunning(false);
      // Vibração leve ao terminar o tempo (se suportado pelo celular)
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerLeft]);

  // Completar desafio
  const handleComplete = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#8A0E26', '#FFDF78']
    });
    onAddScore(currentChallenge.points);
    setCurrentIdx((prev) => prev + 1);
  };

  // Recusa / Beber / Pagar Prenda
  const handleRefusal = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  // Trocar carta com Coringa
  const handleCoringa = () => {
    const success = onUseCoringa();
    if (success) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      alert('Você precisa de 20 pontos para usar um coringa e trocar de carta!');
    }
  };

  // Girar a Garrafa +18
  const handleSpinBottle = () => {
    if (isSpinningBottle) return;
    setIsSpinningBottle(true);
    const newTurns = Math.floor(Math.random() * 6) + 5; // 5 a 10 voltas
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = bottleAngle + newTurns * 360 + randomAngle;
    setBottleAngle(totalRotation);

    setTimeout(() => {
      setIsSpinningBottle(false);
      sortParticipants();
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.6 }
      });
    }, 2500);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Banner de Rodada e Participantes Atuais */}
      <div className="bg-[#1F0307]/90 border border-[#D4AF37]/40 rounded-xl p-2.5 flex items-center justify-between text-xs font-sans">
        <div>
          <span className="text-[#FFDF78] font-bold block font-cinzel">
            VEZ DE: {activeAuthor ? activeAuthor.name : 'Davi'}
          </span>
          <span className="text-[#F6EAD2]/80 text-[11px]">
            Para: <strong className="text-[#FFDF78]">{activeTarget ? activeTarget.name : 'Mari'}</strong>{' '}
            {gameMode !== 'amigos' && activeTarget?.role && (
              <span className="text-[10px] bg-[#8A0E26] px-1.5 py-0.2 rounded text-white ml-1">
                {activeTarget.role}
              </span>
            )}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#D4AF37]/90 uppercase font-bold block">
            Modo {gameMode}
          </span>
          <span className="text-[#FFDF78] font-bold">+{currentChallenge.points} Pts</span>
        </div>
      </div>

      {/* Card Pergaminho do Desafio Atual */}
      <div className="card-pergaminho p-5 border-2 border-[#D4AF37]/60 text-center relative overflow-hidden">
        {/* Selo do Nível */}
        <div className="inline-block bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm mb-3">
          {currentChallenge.type.replace('_', ' ')} • Nível {currentChallenge.level} ({gameMode})
        </div>

        {/* Ilustração ou Ícone Sensual da Carta */}
        <div className="w-24 h-24 mx-auto my-2 rounded-full border-2 border-[#D4AF37]/50 overflow-hidden shadow-inner bg-[#1A0206] flex items-center justify-center">
          <img
            src="/assets/pos-abraco-sol.jpg"
            alt="Ilustração"
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition"
          />
        </div>

        {/* Texto do Desafio com Nomes Injetados */}
        <p className="font-serif text-base sm:text-lg text-[#2E0B12] leading-relaxed my-3 font-medium px-2">
          {currentChallenge.text
            .replace(/Pessoa A/g, activeAuthor?.name || 'Você')
            .replace(/Pessoa B/g, activeTarget?.name || 'Seu Par')}
        </p>

        {/* Cronômetro (se houver) */}
        {timerLeft !== null && (
          <div className="my-3 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 bg-[#F3E5CA] px-4 py-1.5 rounded-full border border-[#D4AF37]/50 text-[#3D120B]">
              <span className="font-mono font-bold text-sm">
                00:{timerLeft < 10 ? `0${timerLeft}` : timerLeft}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-full bg-[#8A0E26] text-white hover:bg-[#A31230] transition"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerLeft(currentChallenge.timeSeconds || 15);
                }}
                className="p-1 rounded-full bg-[#3D120B] text-white hover:bg-black transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-[#6E3C2B] mt-1 font-sans">
              Timer na carta • Cronometre a ação!
            </span>
          </div>
        )}

        {/* Botão de Conclusão */}
        <div className="space-y-2 mt-4">
          <button
            onClick={handleComplete}
            className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] hover:brightness-110 text-[#1F0307] font-cinzel font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-[#8A0E26]" />
            CUMPRI O DESAFIO (+{currentChallenge.points} pts)
          </button>

          {/* Opções de Recusa */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleRefusal}
              className="py-2 bg-[#3D120B] hover:bg-[#52190F] text-[#F6EAD2] font-sans font-bold text-[11px] rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Beer className="w-3.5 h-3.5 text-amber-400" />
              BEBER 1 GOLE
            </button>

            <button
              onClick={handleRefusal}
              className="py-2 bg-[#751124] hover:bg-[#8F162D] text-white font-sans font-bold text-[11px] rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Wine className="w-3.5 h-3.5 text-yellow-300" />
              PAGAR PRENDA
            </button>
          </div>

          {/* Trocar com Coringa */}
          <button
            onClick={handleCoringa}
            className="text-[11px] text-[#6E3C2B] hover:text-[#8A0E26] font-medium flex items-center justify-center gap-1 mx-auto pt-1 transition"
          >
            <RefreshCw className="w-3 h-3" /> Usar Coringa / Trocar Carta (Gasta 20 pts)
          </button>
        </div>
      </div>

      {/* Módulo Especial: Jogo da Garrafa Interativo */}
      <div className="card-pergaminho p-4 border border-[#D4AF37]/50 text-center">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍾</span>
            <h3 className="font-cinzel font-bold text-sm text-[#2E0B12]">
              JOGO DA GARRAFA ({gameMode.toUpperCase()})
            </h3>
          </div>
          <span className="text-[10px] text-[#6E3C2B]">Física Real de Giro</span>
        </div>

        {/* Área da Garrafa Giratória */}
        <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
          {/* Rosa dos Ventos de Fundo */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40 flex items-center justify-center">
            <div className="w-full h-px bg-[#D4AF37]/20 absolute" />
            <div className="h-full w-px bg-[#D4AF37]/20 absolute" />
          </div>

          {/* A Garrafa Dourada */}
          <div
            onClick={handleSpinBottle}
            style={{
              transform: `rotate(${bottleAngle}deg)`,
              transition: isSpinningBottle ? 'transform 2.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
            }}
            className="w-12 h-36 cursor-pointer flex flex-col items-center justify-center z-10 filter drop-shadow-lg"
          >
            <div className="w-3 h-8 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 rounded-t-sm border border-amber-200" />
            <div className="w-10 h-28 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-700 rounded-b-xl border border-amber-300 shadow-inner flex items-center justify-center">
              <span className="text-[9px] font-cinzel font-bold text-black rotate-90">KAMA</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSpinBottle}
          disabled={isSpinningBottle}
          className="px-5 py-2 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel font-bold text-xs rounded-full shadow-md hover:brightness-110 transition disabled:opacity-50"
        >
          {isSpinningBottle ? 'Girando a Garrafa...' : '🍾 Toque para Girar a Garrafa'}
        </button>
      </div>
    </div>
  );
};
