import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { GameView } from './components/GameView';
import { PositionsView } from './components/PositionsView';
import { RodaSetup } from './components/RodaSetup';
import { LugaresIdeiasView } from './components/LugaresIdeiasView';
import { ClubeVipModal } from './components/ClubeVipModal';
import { PinModal } from './components/PinModal';
import { audioPlayer } from './utils/audio';
import {
  INITIAL_POSITIONS,
  INITIAL_CHALLENGES,
  INITIAL_PLACES,
  INITIAL_IDEAS
} from './data/mockData';
import { Participant, GameMode, IdeaCard } from './types';
import { ShieldCheck, ExternalLink, Heart, Sparkles, MessageSquare } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('jogar');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [currentPin, setCurrentPin] = useState(() => localStorage.getItem('kama_pin') || '');
  const [isVip, setIsVip] = useState(() => localStorage.getItem('kama_vip') === 'true');
  const [score, setScore] = useState(() => Number(localStorage.getItem('kama_score')) || 120);
  const [coringas, setCoringas] = useState(() => Number(localStorage.getItem('kama_coringas')) || 3);

  // Participantes da Roda
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('kama_participants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'p-1',
        name: 'Davi',
        gender: 'homem_cis',
        orientation: 'hetero',
        role: 'ativo',
        interactsWithAll: false
      },
      {
        id: 'p-2',
        name: 'Mari',
        gender: 'mulher_cis',
        orientation: 'bi_pan',
        role: 'versatil',
        interactsWithAll: true
      }
    ];
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

  // Ações de Posições
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
    <div className="bg-damasco min-h-screen text-[#F6EAD2] flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-[#D4AF37]/20">
      {/* Header Fixo com Áudio, Pânico, PIN e VIP */}
      <Header
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onPanicMode={handlePanicMode}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        isVip={isVip}
        score={score}
        coringas={coringas}
      />

      {/* Conteúdo Principal por Aba */}
      <main className="flex-1 p-3.5 overflow-y-auto">
        {currentTab === 'jogar' && (
          <GameView
            challenges={INITIAL_CHALLENGES}
            participants={participants}
            gameMode={gameMode}
            onAddScore={handleAddScore}
            onUseCoringa={handleUseCoringa}
            score={score}
            coringas={coringas}
          />
        )}

        {currentTab === 'posicoes' && (
          <PositionsView
            positions={INITIAL_POSITIONS}
            doneIds={donePositionIds}
            favoriteIds={favoritePositionIds}
            todoIds={todoPositionIds}
            onToggleDone={handleToggleDone}
            onToggleFavorite={handleToggleFavorite}
            onToggleTodo={handleToggleTodo}
            hideLgbt={hideLgbt}
            isVip={isVip}
            onOpenVipModal={() => setIsVipModalOpen(true)}
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
    </div>
  );
};
