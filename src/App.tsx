import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { GameView } from './components/GameView';
import { PositionsView } from './components/PositionsView';
import { RodaSetup } from './components/RodaSetup';
import { LugaresIdeiasView } from './components/LugaresIdeiasView';
import { ClubeVipModal } from './components/ClubeVipModal';
import { PinModal } from './components/PinModal';
import { ConquistasModal } from './components/ConquistasModal';
import { CriarPersonalizadoModal } from './components/CriarPersonalizadoModal';
import { audioPlayer } from './utils/audio';
import {
  INITIAL_POSITIONS,
  INITIAL_CHALLENGES,
  INITIAL_PLACES,
  INITIAL_IDEAS
} from './data/mockData';
import { Participant, GameMode, IdeaCard, Challenge, Position } from './types';
import { ShieldCheck, ExternalLink, Heart, Sparkles, MessageSquare, Download } from 'lucide-react';

export const App: React.FC = () => {
  // Se o usuário ainda não tiver cadastrado jogadores, inicia diretamente na tela de configuração
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('kama_participants');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          return 'jogar';
        }
      } catch {
        // fallback
      }
    }
    return 'roda';
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isConquistasModalOpen, setIsConquistasModalOpen] = useState(false);
  const [isCriarModalOpen, setIsCriarModalOpen] = useState(false);
  const [currentPin, setCurrentPin] = useState(() => localStorage.getItem('kama_pin') || '');
  const [isVip, setIsVip] = useState(() => localStorage.getItem('kama_vip') === 'true');
  const [score, setScore] = useState(() => Number(localStorage.getItem('kama_score')) || 120);
  const [coringas, setCoringas] = useState(() => Number(localStorage.getItem('kama_coringas')) || 3);

  // Desafios e Posições Customizadas salvas no navegador
  const [customChallenges, setCustomChallenges] = useState<Challenge[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('kama_custom_challenges') || '[]');
    } catch {
      return [];
    }
  });

  const [customPositions, setCustomPositions] = useState<Position[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('kama_custom_positions') || '[]');
    } catch {
      return [];
    }
  });

  // Instalação PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  // Participantes da Roda - inicia vazio por padrão para novos usuários
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('kama_participants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Clima da Partida
  const [gameMode, setGameMode] = useState<GameMode>(
    () => (localStorage.getItem('kama_game_mode') as GameMode) || 'esquenta'
  );

  // Filtro tradicional (oculta LGBT/menage para quem quiser)
  const [hideLgbt, setHideLgbt] = useState(
    () => localStorage.getItem('kama_hide_lgbt') === 'true'
  );

  // Estado das Posições (Feitas, Favoritas, Fazer)
  const [donePositionIds, setDonePositionIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('kama_done_positions') || '[]');
  });
  const [favoritePositionIds, setFavoritePositionIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('kama_fav_positions') || '[]');
  });
  const [todoPositionIds, setTodoPositionIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('kama_todo_positions') || '[]');
  });

  // Lugares e Ideias
  const [places, setPlaces] = useState(INITIAL_PLACES);
  const [ideas, setIdeas] = useState<IdeaCard[]>(() => {
    const saved = localStorage.getItem('kama_custom_ideas');
    if (saved) {
      try {
        return [...INITIAL_IDEAS, ...JSON.parse(saved)];
      } catch {
        return INITIAL_IDEAS;
      }
    }
    return INITIAL_IDEAS;
  });

  // Persistência no LocalStorage
  useEffect(() => {
    localStorage.setItem('kama_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('kama_game_mode', gameMode);
  }, [gameMode]);

  useEffect(() => {
    localStorage.setItem('kama_hide_lgbt', String(hideLgbt));
  }, [hideLgbt]);

  useEffect(() => {
    localStorage.setItem('kama_done_positions', JSON.stringify(donePositionIds));
  }, [donePositionIds]);

  useEffect(() => {
    localStorage.setItem('kama_fav_positions', JSON.stringify(favoritePositionIds));
  }, [favoritePositionIds]);

  useEffect(() => {
    localStorage.setItem('kama_todo_positions', JSON.stringify(todoPositionIds));
  }, [todoPositionIds]);

  useEffect(() => {
    localStorage.setItem('kama_score', String(score));
  }, [score]);

  useEffect(() => {
    localStorage.setItem('kama_coringas', String(coringas));
  }, [coringas]);

  // Alternar Áudio Sexy
  const handleToggleAudio = () => {
    const isPlaying = audioPlayer.toggle();
    setIsPlayingAudio(isPlaying);
  };

  // Modo Pânico / Discreto (Tela de notícias/calculadora falsa com 1 clique)
  const handlePanicMode = () => {
    setIsPanicActive(true);
  };

  // Desativar Modo Pânico com PIN
  const handleUnlockPanic = () => {
    setIsPanicActive(false);
  };

  // Pontuação & Coringas
  const handleAddScore = (pts: number) => {
    setScore((prev) => prev + pts);
  };

  const handleUseCoringa = (): boolean => {
    if (score >= 20) {
      setScore((prev) => prev - 20);
      return true;
    }
    return false;
  };

  // Nova Rodada / Limpar Jogadores e Partida
  const handleResetGame = () => {
    if (window.confirm('Deseja iniciar uma Nova Rodada e limpar os jogadores configurados?')) {
      setParticipants([]);
      localStorage.removeItem('kama_participants');
      setScore(0);
      localStorage.setItem('kama_score', '0');
      setCoringas(3);
      localStorage.setItem('kama_coringas', '3');
      setCurrentTab('roda');
    }
  };
  const handleToggleDone = (id: string) => {
    setDonePositionIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    if (!donePositionIds.includes(id)) {
      handleAddScore(40);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavoritePositionIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleToggleTodo = (id: string) => {
    setTodoPositionIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Alternar Item de Lugares
  const handleTogglePlaceItem = (catId: string, itemId: string) => {
    setPlaces((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map((it) => (it.id === itemId ? { ...it, done: !it.done } : it))
        };
      })
    );
    handleAddScore(25);
  };

  // Adicionar Nova Ideia Customizada
  const handleAddCustomIdea = (idea: IdeaCard) => {
    setIdeas((prev) => [idea, ...prev]);
    const customOnly = ideas.filter((i) => i.id.startsWith('custom-'));
    localStorage.setItem('kama_custom_ideas', JSON.stringify([idea, ...customOnly]));
    handleAddScore(50);
  };

  // Adicionar Desafio Customizado
  const handleAddCustomChallenge = (ch: Challenge) => {
    setCustomChallenges((prev) => [ch, ...prev]);
    localStorage.setItem('kama_custom_challenges', JSON.stringify([ch, ...customChallenges]));
    handleAddScore(30);
  };

  // Adicionar Posição Customizada
  const handleAddCustomPosition = (pos: Position) => {
    setCustomPositions((prev) => [pos, ...prev]);
    localStorage.setItem('kama_custom_positions', JSON.stringify([pos, ...customPositions]));
    handleAddScore(40);
  };

  // Ativação VIP Mercado Pago
  const handleActivateVip = () => {
    setIsVip(true);
    localStorage.setItem('kama_vip', 'true');
    setIsVipModalOpen(false);
    alert('Parabéns! Seu Acesso VIP do Clube do Casalzão foi ativado com sucesso!');
  };

  // TELA DE PÂNICO DISCRETA
  if (isPanicActive) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 p-6 flex flex-col justify-between font-sans">
        <div>
          <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
            <h1 className="text-lg font-bold">Portal de Notícias Financeiras & Tech</h1>
            <span className="text-xs text-slate-400">Atualizado agora</span>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-3 bg-slate-800 rounded-lg">
              <h2 className="font-bold text-white text-sm mb-1">Mercados Globais Fecham em Alta com IA</h2>
              <p className="text-xs text-slate-400">Investimentos em inteligência artificial e computação em nuvem superam expectativas no trimestre.</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <h2 className="font-bold text-white text-sm mb-1">Dólar Estável e Boas Perspectivas de Exportação</h2>
              <p className="text-xs text-slate-400">Indicadores apontam solidez nos mercados emergentes e inflação sob controle.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleUnlockPanic}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium text-slate-200 transition"
          >
            Destravar e Voltar ao App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#110103] flex justify-center items-start sm:py-6">
      {/* Contêiner Principal: No celular ocupa 100% da largura/altura sem travar rolagem; no PC centraliza com moldura */}
      <div className="w-full sm:max-w-md min-h-screen bg-damasco text-[#F6EAD2] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.9)] sm:rounded-[36px] sm:border-[5px] sm:border-[#380710]">
        
        {/* Banner de Instalação PWA no Celular */}
        {showInstallBanner && (
          <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-3 py-1.5 flex items-center justify-between text-xs font-bold z-50 shadow-md sticky top-0">
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Instalar Kama & Desafios no Celular?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-cinzel"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-black/70 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header Fixo */}
        <Header
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          onPanicMode={handlePanicMode}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          onOpenVipModal={() => setIsVipModalOpen(true)}
          onOpenConquistasModal={() => setIsConquistasModalOpen(true)}
          onOpenCriarModal={() => setIsCriarModalOpen(true)}
          isVip={isVip}
          score={score}
          coringas={coringas}
        />

        {/* Conteúdo Principal com Rolagem 100% Livre */}
        <main className="flex-1 p-3.5 pb-28">
          {currentTab === 'jogar' && (
            <GameView
              challenges={[...INITIAL_CHALLENGES, ...customChallenges]}
              participants={participants}
              gameMode={gameMode}
              onAddScore={handleAddScore}
              onUseCoringa={handleUseCoringa}
              score={score}
              coringas={coringas}
              onGoToSetup={() => setCurrentTab('roda')}
              onResetGame={handleResetGame}
            />
          )}

          {currentTab === 'posicoes' && (
            <PositionsView
              positions={[...INITIAL_POSITIONS, ...customPositions]}
              doneIds={donePositionIds}
              favoriteIds={favoritePositionIds}
              todoIds={todoPositionIds}
              onToggleDone={handleToggleDone}
              onToggleFavorite={handleToggleFavorite}
              onToggleTodo={handleToggleTodo}
              hideLgbt={hideLgbt}
              isVip={isVip}
              onOpenVipModal={() => setIsVipModalOpen(true)}
              gameMode={gameMode}
              onGoToSetup={() => setCurrentTab('roda')}
            />
          )}

          {currentTab === 'roda' && (
            <RodaSetup
              participants={participants}
              gameMode={gameMode}
              onUpdateParticipants={setParticipants}
              onChangeGameMode={setGameMode}
              hideLgbt={hideLgbt}
              onToggleHideLgbt={setHideLgbt}
              onResetAll={handleResetGame}
              onStartGame={() => setCurrentTab('jogar')}
            />
          )}

          {currentTab === 'lugares' && (
            <LugaresIdeiasView
              places={places}
              ideas={ideas}
              onTogglePlaceItem={handleTogglePlaceItem}
              onAddCustomIdea={handleAddCustomIdea}
            />
          )}

          {currentTab === 'clube' && (
            <div className="space-y-4 pb-20 text-center">
              <div className="card-pergaminho p-5 border border-[#D4AF37]/60 space-y-3">
                <img
                  src="/assets/logo-crest.jpg"
                  alt="Clube do Casalzão"
                  className="w-20 h-20 rounded-full mx-auto border-2 border-[#D4AF37] object-cover shadow-lg"
                />
                <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
                  ECOSSISTEMA CLUBE DO CASALZÃO
                </h2>
                <p className="text-xs text-[#5C2B1D] font-serif leading-relaxed">
                  Bem-vindo ao espaço oficial do Davi e Mari. Aqui você encontra novidades exclusivas, bastidores, nossa comunidade e atualizações do Kama & Desafios.
                </p>

                <div className="space-y-2 pt-2">
                  <a
                    href="https://clubcasalzaum.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#8A0E26] hover:bg-[#A31230] text-white rounded-xl text-xs font-cinzel font-bold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Acessar Landing Page Oficial
                  </a>

                  <a
                    href="https://casalzaumofcvip.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-black rounded-xl text-xs font-cinzel font-bold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Área VIP & Conteúdos Sem Censura
                  </a>

                  <div className="pt-4 flex items-center justify-center gap-4 text-[11px] text-[#5C2B1D]/80">
                    <a href="/privacidade.html" className="hover:text-[#2E0B12] underline underline-offset-2">
                      Privacidade & LGPD
                    </a>
                    <span>•</span>
                    <a href="/termos.html" className="hover:text-[#2E0B12] underline underline-offset-2">
                      Termos & 18+
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Navegação Inferior Fixa */}
        <BottomNav currentTab={currentTab} onChangeTab={setCurrentTab} />

        {/* Modais Globais */}
        <ClubeVipModal
          isOpen={isVipModalOpen}
          onClose={() => setIsVipModalOpen(false)}
          isVip={isVip}
          onActivateVip={handleActivateVip}
        />

        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          currentPin={currentPin}
          onSavePin={(pin) => {
            setCurrentPin(pin);
            localStorage.setItem('kama_pin', pin);
          }}
          onUnlockSuccess={() => {}}
        />

        <ConquistasModal
          isOpen={isConquistasModalOpen}
          onClose={() => setIsConquistasModalOpen(false)}
          score={score}
          donePositionsCount={donePositionIds.length}
          donePlacesCount={places.reduce((acc, cat) => acc + cat.items.filter((it) => it.done).length, 0)}
          roundNumber={1}
        />

        <CriarPersonalizadoModal
          isOpen={isCriarModalOpen}
          onClose={() => setIsCriarModalOpen(false)}
          onAddChallenge={handleAddCustomChallenge}
          onAddPosition={handleAddCustomPosition}
        />
      </div>
    </div>
  );
};
