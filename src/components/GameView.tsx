import React, { useState, useEffect } from 'react';
import { Challenge, Participant, GameMode } from '../types';
import { Play, Pause, RotateCcw, Beer, Award, CheckCircle, RefreshCw, Flame, Wine, UserPlus, Trash2, SkipForward } from 'lucide-react';
import confetti from 'canvas-confetti';

// Helper: retorna pronomes corretos com base no gênero do participante
function getPronouns(p: Participant | null) {
  if (!p) return { possessivo: 'do seu par', reto: 'você', obliquo: 'o(a)' };
  const isMale = p.gender === 'homem_cis' || p.gender === 'homem_trans';
  const isFemale = p.gender === 'mulher_cis' || p.gender === 'mulher_trans';
  return {
    possessivo: isMale ? 'dele' : isFemale ? 'dela' : 'do seu par',
    reto: isMale ? 'ele' : isFemale ? 'ela' : 'elu',
    obliquo: isMale ? 'o' : isFemale ? 'a' : 'elu',
  };
}

// Injeta nomes e pronomes adaptativos com concordância no texto do desafio
function injectNames(
  text: string,
  author: Participant | null,
  target: Participant | null
): string {
  const authorName = author?.name || 'Você';
  const targetName = target?.name || 'Seu Par';
  const tp = getPronouns(target);
  const ap = getPronouns(author);

  return text
    // Substituição de marcadores de nomes
    .replace(/Pessoa A/g, authorName)
    .replace(/Pessoa B/g, targetName)
    // Contrações de preposição com pronome para o ALVO (quem recebe a ação)
    .replace(/\bno corpo dela\b/gi, `no corpo ${tp.possessivo}`)
    .replace(/\bno ouvido dela\b/gi, `no ouvido ${tp.possessivo}`)
    .replace(/\bna frente dela\b/gi, `na frente ${tp.possessivo}`)
    .replace(/\bcom ela\b/gi, `com ${targetName}`)
    .replace(/\bcom ele\b/gi, `com ${targetName}`)
    .replace(/\bpara ela\b/gi, `para ${targetName}`)
    .replace(/\bpara ele\b/gi, `para ${targetName}`)
    .replace(/\ba ela\b/gi, `a ${targetName}`)
    .replace(/\ba ele\b/gi, `a ${targetName}`)
    .replace(/\bsobre ela\b/gi, `sobre ${targetName}`)
    .replace(/\bsobre ele\b/gi, `sobre ${targetName}`)
    .replace(/\bcom ela com os olhos vendados\b/gi, `com ${targetName} com os olhos vendados`)
    .replace(/\bdela\b/gi, tp.possessivo)
    .replace(/\bdele\b/gi, tp.possessivo)
    .replace(/\bdo seu par\b/gi, tp.possessivo)
    .replace(/\bela\b/gi, targetName)
    .replace(/\bele\b/gi, targetName);
}

interface GameViewProps {
  challenges: Challenge[];
  participants: Participant[];
  gameMode: GameMode;
  onAddScore: (pts: number) => void;
  onUseCoringa: () => boolean; // retorna true se conseguiu usar
  score: number;
  coringas: number;
  onGoToSetup?: () => void;
  onResetGame?: () => void;
}

export const GameView: React.FC<GameViewProps> = ({
  challenges,
  participants,
  gameMode,
  onAddScore,
  onUseCoringa,
  score,
  coringas,
  onGoToSetup,
  onResetGame
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

  // Sorteia quem faz e quem recebe garantindo que sejam participantes distintos
  const sortParticipants = () => {
    if (participants.length === 0) {
      setActiveAuthor(null);
      setActiveTarget(null);
      return;
    }
    if (participants.length === 1) {
      setActiveAuthor(participants[0]);
      setActiveTarget(participants[0]);
      return;
    }

    const authorIdx = Math.floor(Math.random() * participants.length);
    const author = participants[authorIdx];
    setActiveAuthor(author);

    // Filtra alvos compatíveis (sempre excluindo o próprio autor)
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
    setActiveTarget(possibleTargets[targetIdx] || participants.find((p) => p.id !== author.id) || author);
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

  // Pular desafio sem pontuar
  const handleSkip = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  // Girar a Garrafa
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

  // Se não houver participantes cadastrados ou menos de 2 participantes, exibe tela de convite para cadastrar
  if (participants.length < 2) {
    return (
      <div className="space-y-4 pb-20">
        <div className="card-pergaminho p-6 border-2 border-[#D4AF37]/60 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#8A0E26]/20 border border-[#D4AF37] flex items-center justify-center text-3xl">
            🎭
          </div>
          <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
            QUEM VAI JOGAR HOJE?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C2B1D] font-serif leading-relaxed px-2">
            {participants.length === 0
              ? 'Antes de começar a partida, configure os nomes dos participantes na Roda para que as cartas e desafios sejam personalizados com pronomes e regras exatas.'
              : `Você adicionou apenas 1 participante (${participants[0].name}). Adicione pelo menos mais uma pessoa para começar a diversão em dupla ou em grupo!`}
          </p>

          <div className="pt-2">
            <button
              onClick={onGoToSetup}
              className="w-full py-3 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] hover:brightness-110 text-white font-cinzel font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              CONFIGURAR JOGADORES AGORA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Botão de Ação Rápida: Nova Rodada / Limpar Jogadores */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] text-[#D4AF37]/80 font-cinzel">
          PARTIDA EM ANDAMENTO
        </span>
        {onResetGame && (
          <button
            onClick={onResetGame}
            className="flex items-center gap-1 text-[11px] bg-[#2A050B]/90 hover:bg-[#3D0811] text-[#FFDF78] border border-[#D4AF37]/40 px-2.5 py-1 rounded-lg transition"
            title="Resetar jogadores e iniciar nova partida"
          >
            <RotateCcw className="w-3 h-3" />
            Nova Rodada / Limpar
          </button>
        )}
      </div>

      {/* Banner de Rodada e Participantes Atuais */}
      <div className="bg-[#1F0307]/90 border border-[#D4AF37]/40 rounded-xl p-2.5 flex items-center justify-between text-xs font-sans">
        <div>
          <span className="text-[#FFDF78] font-bold block font-cinzel">
            VEZ DE: {activeAuthor ? activeAuthor.name : 'Jogador'}
          </span>
          <span className="text-[#F6EAD2]/80 text-[11px]">
            Para: <strong className="text-[#FFDF78]">{activeTarget ? activeTarget.name : 'Jogador'}</strong>{' '}
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

        {/* Ilustração ou Ícone da Carta */}
        <div className="w-24 h-24 mx-auto my-2 rounded-full border-2 border-[#D4AF37]/50 overflow-hidden shadow-inner bg-[#1A0206] flex items-center justify-center">
          {gameMode === 'amigos' ? (
            <div className="text-3xl">🥂</div>
          ) : (
            <img
              src="/assets/pos-abraco-sol.jpg"
              alt="Ilustração"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition"
            />
          )}
        </div>

        {/* Texto do Desafio com Nomes Injetados e Pronomes Adaptativos */}
        <p className="font-serif text-base sm:text-lg text-[#2E0B12] leading-relaxed my-3 font-medium px-2">
          {injectNames(currentChallenge.text, activeAuthor, activeTarget)}
        </p>

        {/* Cronômetro (se houver) */}
        {timerLeft !== null && (
          <div className="my-3 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 bg-[#F3E5CA] px-4 py-1.5 rounded-full border border-[#D4AF37]/50 text-[#3D120B]">
              <span className="font-mono font-bold text-sm">
                00:{timerLeft < 10 ? `0${timerLeft}` : timerLeft}
              </span>
              <button
                aria-label={isTimerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}
                title={isTimerRunning ? 'Pausar' : 'Iniciar'}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-full bg-[#8A0E26] text-white hover:bg-[#A31230] transition"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                aria-label="Reiniciar cronômetro"
                title="Reiniciar"
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

        {/* Botão de Conclusão e Ações de Jogo */}
        <div className="space-y-2 mt-4">
          <button
            onClick={handleComplete}
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] via-[#FFDF78] to-[#AA8010] hover:brightness-110 active:scale-[0.98] text-[#1F0307] font-cinzel font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-[#FFDF78]/50"
          >
            <CheckCircle className="w-4 h-4 text-[#8A0E26]" />
            CUMPRI O DESAFIO (+{currentChallenge.points} pts)
          </button>

          {/* Opções de Recusa / Beber / Pagar Prenda / Pular */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleRefusal}
              className="py-2.5 px-1 bg-[#3D120B] hover:bg-[#52190F] active:scale-[0.97] text-[#F6EAD2] font-sans font-bold text-[11px] rounded-xl transition flex flex-col items-center justify-center border border-[#D4AF37]/30"
              title="Beber 1 gole (ou água/suco)"
            >
              <span className="flex items-center gap-1">
                <Beer className="w-3.5 h-3.5 text-amber-400" />
                BEBER
              </span>
              <span className="text-[8px] opacity-70 font-normal">1 gole / suco</span>
            </button>

            <button
              onClick={handleRefusal}
              className="py-2.5 px-1 bg-[#751124] hover:bg-[#8F162D] active:scale-[0.97] text-white font-sans font-bold text-[11px] rounded-xl transition flex flex-col items-center justify-center border border-[#FFDF78]/30"
              title="Pagar prenda combinada"
            >
              <span className="flex items-center gap-1">
                <Wine className="w-3.5 h-3.5 text-yellow-300" />
                PRENDA
              </span>
              <span className="text-[8px] opacity-70 font-normal">pagar prenda</span>
            </button>

            <button
              onClick={handleSkip}
              className="py-2.5 px-1 bg-[#241316] hover:bg-[#381B20] active:scale-[0.97] text-[#F6EAD2] font-sans font-bold text-[11px] rounded-xl transition flex flex-col items-center justify-center border border-[#D4AF37]/30"
              title="Pular esta carta e passar a vez"
            >
              <span className="flex items-center gap-1">
                <SkipForward className="w-3.5 h-3.5 text-slate-300" />
                PULAR
              </span>
              <span className="text-[8px] opacity-70 font-normal">passar a vez</span>
            </button>
          </div>

          {/* Trocar com Coringa */}
          <button
            onClick={handleCoringa}
            className="w-full py-2 bg-[#F3E5CA]/80 hover:bg-[#F3E5CA] border border-[#D4AF37]/50 rounded-xl text-[11px] text-[#5C2B1D] hover:text-[#8A0E26] font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] mt-1"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#8A0E26]" /> Trocar Carta com Coringa (Gasta 20 pts • {coringas} disponíveis)
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
