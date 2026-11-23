import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Participant, Challenge, GameMode } from '../types';
import { RotateCw, Users, CheckCircle, ArrowUpDown, Shuffle, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GarrafaViewProps {
  participants: Participant[];
  challenges: Challenge[];
  gameMode: GameMode;
  onAddScore: (pts: number) => void;
  onGoToSetup?: () => void;
}

export const GarrafaView: React.FC<GarrafaViewProps> = ({
  participants: initialParticipants,
  challenges,
  gameMode,
  onAddScore,
  onGoToSetup
}) => {
  // Lista de participantes ordenada fisicamente na roda
  const [wheelParticipants, setWheelParticipants] = useState<Participant[]>(initialParticipants);
  const [isOrganizingWheel, setIsOrganizingWheel] = useState(false);

  // Estados de giro da garrafa
  const [bottleAngle, setBottleAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeAuthor, setActiveAuthor] = useState<Participant | null>(null);
  const [activeTarget, setActiveTarget] = useState<Participant | null>(null);
  const [chosenChallenge, setChosenChallenge] = useState<Challenge | null>(null);
  const spinTimerRef = useRef<number | null>(null);

  // Limpeza de timeout em caso de desmontagem rápida do componente
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        clearTimeout(spinTimerRef.current);
      }
    };
  }, []);

  // Mantém sincronizado caso a lista externa mude enquanto não estiver girando
  useEffect(() => {
    if (!isSpinning) {
      setWheelParticipants(initialParticipants);
    }
  }, [initialParticipants, isSpinning]);

  // Se houver menos de 2 participantes, exibe convite
  if (wheelParticipants.length < 2) {
    return (
      <div className="card-pergaminho p-6 border-2 border-[#D4AF37]/60 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#8A0E26]/20 border border-[#D4AF37] flex items-center justify-center text-3xl">
          🍾
        </div>
        <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
          JOGO DA GARRAFA PRECISA DE UMA RODA
        </h2>
        <p className="text-xs text-[#5C2B1D] font-serif leading-relaxed">
          Para girar a garrafa, configure pelo menos 2 participantes na Roda para que a garrafa possa apontar para quem vai cumprir e quem vai comandar a ação!
        </p>
        {onGoToSetup && (
          <button
            onClick={onGoToSetup}
            className="w-full py-3 bg-[#8A0E26] hover:bg-[#A31230] text-white font-cinzel font-bold text-xs rounded-xl shadow transition"
          >
            Configurar Jogadores Agora
          </button>
        )}
      </div>
    );
  }

  // Trocar posições na roda
  const moveParticipant = (idx: number, direction: 'up' | 'down') => {
    const newArr = [...wheelParticipants];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[idx];
    newArr[idx] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    setWheelParticipants(newArr);
  };

  // Embaralhar a roda
  const shuffleWheel = () => {
    const shuffled = [...wheelParticipants].sort(() => Math.random() - 0.5);
    setWheelParticipants(shuffled);
  };

  // Injetor de nomes e pronomes
  const injectNames = (text: string, author: Participant | null, target: Participant | null) => {
    if (!author || !target) return text;
    let res = text.replace(/Pessoa A/g, author.name).replace(/Pessoa B/g, target.name);

    const gender = typeof target.gender === 'string' ? target.gender : '';
    if (gender.includes('mulher')) {
      res = res.replace(/\bele\b/gi, 'ela')
               .replace(/\bdele\b/gi, 'dela')
               .replace(/\bnele\b/gi, 'nela')
               .replace(/\bo parceiro\b/gi, 'a parceira')
               .replace(/\bvendedo\b/gi, 'vendada')
               .replace(/\bvendedo\(a\)\b/gi, 'vendada');
    } else if (gender.includes('homem')) {
      res = res.replace(/\bela\b/gi, 'ele')
               .replace(/\bdela\b/gi, 'dele')
               .replace(/\bnela\b/gi, 'nele')
               .replace(/\ba parceira\b/gi, 'o parceiro')
               .replace(/\bvendada\b/gi, 'vendado')
               .replace(/\bvendedo\(a\)\b/gi, 'vendado');
    }
    return res;
  };

  // Giro com física e alinhamento exato aos participantes da roda
  const handleSpinBottle = () => {
    if (isSpinning || wheelParticipants.length < 2) return;
    setIsSpinning(true);
    setActiveAuthor(null);
    setActiveTarget(null);
    setChosenChallenge(null);

    const total = wheelParticipants.length;
    const angleStep = 360 / total;

    // Sorteia quem recebe (onde o gargalo vai parar)
    const targetIndex = Math.floor(Math.random() * total);
    const target = wheelParticipants[targetIndex];

    // O autor é quem fica no lado oposto ou um parceiro da roda
    let authorIndex = (targetIndex + Math.floor(total / 2)) % total;
    if (authorIndex === targetIndex) {
      authorIndex = (targetIndex + 1) % total;
    }
    const author = wheelParticipants[authorIndex];

    // Ângulo onde o gargalo da garrafa aponta para o participante alvo
    const targetAngle = targetIndex * angleStep;

    // Adiciona múltiplas rotações completas (5 a 8 voltas) para efeito dramático
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
    const currentNorm = bottleAngle % 360;
    const finalAngle = bottleAngle + extraSpins + (targetAngle - currentNorm + 360) % 360;

    setBottleAngle(finalAngle);

    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    spinTimerRef.current = window.setTimeout(() => {
      setIsSpinning(false);
      setActiveTarget(target);
      setActiveAuthor(author);

      // Pega desafios do tipo garrafa ou desafio correspondente ao modo
      const bottleChallenges = challenges.filter(
        (c) => c.mode === gameMode && (c.type === 'garrafa' || c.type === 'desafio')
      );
      const chosen =
        bottleChallenges[Math.floor(Math.random() * bottleChallenges.length)] ||
        challenges[0];
      setChosenChallenge(chosen);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFDF78', '#8A0E26']
      });
    }, 2800);
  };

  // Cálculo da posição de cada participante no círculo da arena
  const radius = 100; // raio da roda em px
  const center = 130; // centro x e y

  return (
    <div className="space-y-4">
      {/* Barra de Topo do Jogo da Garrafa */}
      <div className="bg-[#1C0307] p-2.5 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs font-cinzel">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🍾</span>
          <span className="text-[#FFDF78] font-bold">
            RODA DA GARRAFA ({gameMode.toUpperCase()})
          </span>
        </div>

        <button
          onClick={() => setIsOrganizingWheel(!isOrganizingWheel)}
          className="flex items-center gap-1 bg-[#8A0E26] hover:bg-[#A31230] text-[#FFDF78] px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow border border-[#D4AF37]/40"
        >
          <Users className="w-3 h-3" />
          {isOrganizingWheel ? 'Fechar Roda' : '👥 Fazer / Organizar Roda'}
        </button>
      </div>

      {/* Painel Expansível de Organização da Roda de Jogadores */}
      {isOrganizingWheel && (
        <div className="card-pergaminho p-4 border-2 border-[#D4AF37] rounded-xl space-y-3 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-2">
            <div>
              <h4 className="font-cinzel text-xs font-bold text-[#2E0B12] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#8A0E26]" /> LUGARES NA RODA
              </h4>
              <p className="text-[10px] text-[#5C2B1D]">
                Defina a ordem em que os jogadores estão sentados em círculo.
              </p>
            </div>
            <button
              onClick={shuffleWheel}
              className="flex items-center gap-1 text-[10px] bg-[#EEDBB7] hover:bg-[#E2CEAA] text-[#2E0B12] px-2 py-1 rounded border border-[#D4AF37]/40 font-bold"
              title="Embaralhar lugares na roda"
            >
              <Shuffle className="w-3 h-3" /> Embaralhar
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {wheelParticipants.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-[#FCF8EE] p-2 rounded-lg border border-[#D4AF37]/40 text-xs text-[#2E0B12]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#8A0E26] text-white flex items-center justify-center text-[10px] font-bold font-cinzel">
                    {idx + 1}
                  </span>
                  <span className="font-bold">{p.name}</span>
                  <span className="text-[9px] text-[#8A0E26] bg-[#8A0E26]/10 px-1.5 py-0.2 rounded font-sans">
                    {p.gender.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveParticipant(idx, 'up')}
                    className="p-1 rounded bg-[#EEDBB7] hover:bg-[#D4AF37] disabled:opacity-30 text-[#2E0B12]"
                    title="Mover no sentido anti-horário"
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === wheelParticipants.length - 1}
                    onClick={() => moveParticipant(idx, 'down')}
                    className="p-1 rounded bg-[#EEDBB7] hover:bg-[#D4AF37] disabled:opacity-30 text-[#2E0B12]"
                    title="Mover no sentido horário"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOrganizingWheel(false)}
            className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-[#1F0307] font-cinzel font-bold text-xs rounded-lg shadow hover:brightness-110 transition"
          >
            Confirmar Lugares e Voltar para a Garrafa
          </button>
        </div>
      )}

      {/* Arena Circular da Garrafa com os Jogadores em Volta */}
      <div className="card-pergaminho p-4 border-2 border-[#D4AF37]/60 text-center relative overflow-hidden shadow-2xl">
        <div className="relative w-[270px] h-[270px] mx-auto my-1 flex items-center justify-center">
          {/* Círculo Guia da Roda */}
          <div className="absolute inset-4 rounded-full border border-dashed border-[#D4AF37]/35 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-[#D4AF37]/15 absolute" />
            <div className="h-full w-px bg-[#D4AF37]/15 absolute" />
          </div>

          {/* Renderização Polar dos Participantes na Roda */}
          {wheelParticipants.map((p, idx) => {
            const angleDeg = (idx * (360 / wheelParticipants.length)) - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const left = center + radius * Math.cos(angleRad);
            const top = center + radius * Math.sin(angleRad);

            const isTarget = activeTarget?.id === p.id;
            const isAuthor = activeAuthor?.id === p.id;

            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: `${left}px`,
                  top: `${top}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`transition-all duration-300 z-20 flex flex-col items-center ${
                  isTarget ? 'scale-115' : isAuthor ? 'scale-110' : 'scale-100'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-cinzel font-bold shadow-md transition-all ${
                    isTarget
                      ? 'bg-gradient-to-tr from-yellow-400 to-amber-200 text-black border-2 border-yellow-300 ring-4 ring-yellow-400/50 animate-bounce'
                      : isAuthor
                      ? 'bg-gradient-to-tr from-[#8A0E26] to-[#B5173B] text-[#FFDF78] border-2 border-[#D4AF37] ring-3 ring-[#8A0E26]/50'
                      : 'bg-[#2E0B12] text-[#F6EAD2] border border-[#D4AF37]/50'
                  }`}
                  title={p.name}
                >
                  {p.name.substring(0, 2).toUpperCase()}
                </div>

                <span
                  className={`text-[9px] font-cinzel font-bold px-1.5 py-0.2 rounded-full mt-0.5 whitespace-nowrap shadow-sm ${
                    isTarget
                      ? 'bg-yellow-400 text-black font-extrabold'
                      : isAuthor
                      ? 'bg-[#8A0E26] text-white'
                      : 'bg-[#FAF4E6]/90 text-[#2E0B12] border border-[#D4AF37]/30'
                  }`}
                >
                  {p.name.split(' ')[0]}
                </span>

                {isTarget && (
                  <span className="text-[8px] font-bold text-amber-700 bg-yellow-200 px-1 rounded-sm mt-0.5 shadow">
                    🎯 Gargalo
                  </span>
                )}
                {isAuthor && (
                  <span className="text-[8px] font-bold text-white bg-[#8A0E26] px-1 rounded-sm mt-0.5 shadow">
                    🔄 Fundo
                  </span>
                )}
              </div>
            );
          })}

          {/* Garrafa Giratória no Centro */}
          <div
            onClick={handleSpinBottle}
            style={{
              transform: `rotate(${bottleAngle}deg)`,
              transition: isSpinning
                ? 'transform 2.8s cubic-bezier(0.12, 0.9, 0.22, 1)'
                : 'none'
            }}
            className="w-10 h-32 cursor-pointer flex flex-col items-center justify-center z-10 filter drop-shadow-xl select-none"
            title="Clique para Girar a Garrafa"
          >
            {/* Gargalo (Ponta Superior que aponta para quem recebe) */}
            <div className="w-3.5 h-8 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 rounded-t-md border border-amber-200 flex items-center justify-center">
              <div className="w-1 h-3 bg-red-600 rounded-full" />
            </div>
            {/* Corpo da Garrafa (Base que aponta para quem faz) */}
            <div className="w-9 h-24 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 rounded-b-2xl border-2 border-amber-300 shadow-inner flex flex-col items-center justify-center relative">
              <span className="text-[8px] font-cinzel font-bold text-black rotate-90 tracking-widest">
                KAMA
              </span>
              <div className="absolute bottom-1 w-5 h-1 bg-amber-900/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Botão de Giro Principal */}
        <div className="mt-2">
          <button
            onClick={handleSpinBottle}
            disabled={isSpinning}
            className="px-6 py-2.5 bg-gradient-to-r from-[#8A0E26] via-[#B5173B] to-[#8A0E26] text-white font-cinzel font-bold text-xs rounded-full shadow-lg hover:brightness-110 active:scale-95 transition disabled:opacity-50 border border-[#D4AF37]/50"
          >
            {isSpinning ? '🍾 A Garrafa está girando...' : '🍾 Toque para Girar a Garrafa'}
          </button>
        </div>

        {/* Resultado: Card da Garrafa com Ação Real */}
        {activeTarget && activeAuthor && chosenChallenge && (
          <div className="mt-4 p-4 bg-[#FAF4E6] border-2 border-[#D4AF37] rounded-xl text-left space-y-2.5 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-1.5">
              <span className="font-cinzel text-xs font-bold text-[#8A0E26] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> A GARRAFA PAROU:
              </span>
              <span className="text-[10px] bg-[#8A0E26] text-white px-2 py-0.5 rounded-full font-bold">
                +{chosenChallenge.points} pts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#EEDBB7] p-2 rounded-lg border border-[#D4AF37]/30">
                <span className="text-[10px] font-bold text-[#8A0E26] block font-cinzel">
                  🔄 FUNDO (QUEM COMANDA):
                </span>
                <strong className="text-[#2E0B12] font-cinzel text-sm">
                  {activeAuthor.name}
                </strong>
              </div>

              <div className="bg-yellow-200/80 p-2 rounded-lg border border-yellow-400/50">
                <span className="text-[10px] font-bold text-amber-800 block font-cinzel">
                  🎯 GARGALO (QUEM RECEBE):
                </span>
                <strong className="text-[#2E0B12] font-cinzel text-sm">
                  {activeTarget.name}
                </strong>
              </div>
            </div>

            <div className="bg-[#FAF2DF] p-3 rounded-lg border border-[#D4AF37]/40">
              <span className="text-[10px] uppercase font-cinzel font-bold text-[#8A0E26] block mb-1">
                DESAFIO DA GARRAFA:
              </span>
              <p className="font-serif text-sm text-[#2E0B12] leading-relaxed italic font-medium">
                {injectNames(chosenChallenge.text, activeAuthor, activeTarget)}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onAddScore(chosenChallenge.points);
                  setActiveTarget(null);
                  setActiveAuthor(null);
                  setChosenChallenge(null);
                  confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
                }}
                className="flex-1 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-[#1F0307] font-cinzel font-bold text-xs rounded-lg shadow transition hover:brightness-110 flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Cumpriram (+{chosenChallenge.points} pts)
              </button>

              <button
                onClick={() => {
                  setActiveTarget(null);
                  setActiveAuthor(null);
                  setChosenChallenge(null);
                }}
                className="px-3 py-2 bg-[#3D120B] text-[#F6EAD2] font-sans text-xs rounded-lg transition hover:bg-[#52190F]"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
