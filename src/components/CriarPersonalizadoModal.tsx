import React, { useState } from 'react';
import { Challenge, Position, GameMode } from '../types';
import { PlusCircle, X, Sparkles, BookOpen, Flame } from 'lucide-react';

interface CriarPersonalizadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChallenge: (ch: Challenge) => void;
  onAddPosition: (pos: Position) => void;
}

export const CriarPersonalizadoModal: React.FC<CriarPersonalizadoModalProps> = ({
  isOpen,
  onClose,
  onAddChallenge,
  onAddPosition
}) => {
  const [activeTab, setActiveTab] = useState<'desafio' | 'posicao'>('desafio');

  // Form Desafio
  const [chText, setChText] = useState('');
  const [chType, setChType] = useState<'verdade' | 'desafio'>('verdade');
  const [chMode, setChMode] = useState<GameMode>('esquenta');
  const [chLevel, setChLevel] = useState<1 | 2 | 3>(2);
  const [chPoints, setChPoints] = useState(40);
  const [chTime, setChTime] = useState<number | undefined>(undefined);

  // Form Posição
  const [posTitle, setPosTitle] = useState('');
  const [posSubtitle, setPosSubtitle] = useState('');
  const [posCategory, setPosCategory] = useState<Position['category']>('classicas');
  const [posComplexity, setPosComplexity] = useState<Position['complexity']>('Iniciante');
  const [posLocation, setPosLocation] = useState<Position['location']>('Cama');
  const [posInstructions, setPosInstructions] = useState('');
  const [posComfortTip, setPosComfortTip] = useState('');

  if (!isOpen) return null;

  const handleSubmitChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chText.trim()) return;

    const newChallenge: Challenge = {
      id: 'custom-ch-' + Date.now(),
      type: chType,
      mode: chMode,
      level: chLevel,
      text: chText.trim(),
      points: Number(chPoints) || 40,
      timeSeconds: chTime ? Number(chTime) : undefined,
      refusalOption: 'Beber 1 gole ou pagar prenda'
    };

    onAddChallenge(newChallenge);
    setChText('');
    alert('Desafio personalizado salvo com sucesso e adicionado ao baralho!');
    onClose();
  };

  const handleSubmitPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posTitle.trim()) return;

    const newPosition: Position = {
      id: 'custom-pos-' + Date.now(),
      title: posTitle.trim(),
      subtitle: posSubtitle.trim() || 'Posição personalizada do casal/grupo',
      category: posCategory,
      complexity: posComplexity,
      intensity: 'Média',
      location: posLocation,
      focus: 'Conexão Personalizada',
      rating: 5,
      illustrationUrl: '/assets/card-silhouette-gold.webp',
      description: posSubtitle.trim() || 'Criada sob medida para a noite de vocês.',
      instructions: posInstructions
        ? posInstructions.split('\n').filter((l) => l.trim().length > 0)
        : ['Ajustem o ritmo e a respiração confortavelmente juntos.'],
      comfortTip: posComfortTip.trim() || 'Usem travesseiros de apoio para não cansar as articulações.',
      isVip: false
    };

    onAddPosition(newPosition);
    setPosTitle('');
    setPosSubtitle('');
    setPosInstructions('');
    setPosComfortTip('');
    alert('Posição personalizada criada com sucesso e adicionada ao catálogo!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div className="card-pergaminho w-full max-w-md p-5 border-2 border-[#D4AF37] relative max-h-[92vh] overflow-y-auto space-y-4">
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5C2B1D] hover:text-[#8A0E26] p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center border-b border-[#D4AF37]/30 pb-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#8A0E26] text-white flex items-center justify-center shadow-md mb-2">
            <PlusCircle className="w-6 h-6 text-[#FFDF78]" />
          </div>
          <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
            CRIAR MEU PRÓPRIO CONTEÚDO
          </h2>
          <p className="text-xs text-[#5C2B1D] font-serif">
            Cadastre desafios, perguntas ou posições exclusivas para a sua partida
          </p>
        </div>

        {/* Abas Alternar entre Desafio e Posição */}
        <div className="grid grid-cols-2 gap-2 bg-[#1C0307] p-1.5 rounded-xl border border-[#D4AF37]/40 text-xs font-cinzel">
          <button
            type="button"
            onClick={() => setActiveTab('desafio')}
            className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'desafio'
                ? 'bg-[#8A0E26] text-[#FFDF78] shadow'
                : 'text-[#F6EAD2]/70 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Verdade / Desafio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('posicao')}
            className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'posicao'
                ? 'bg-[#8A0E26] text-[#FFDF78] shadow'
                : 'text-[#F6EAD2]/70 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Posição Íntima
          </button>
        </div>

        {/* Formulário de Desafio */}
        {activeTab === 'desafio' && (
          <form onSubmit={handleSubmitChallenge} className="space-y-3 text-xs text-[#2E0B12]">
            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1 font-cinzel">
                Tipo da Carta:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setChType('verdade')}
                  className={`py-1.5 rounded-lg font-bold border transition ${
                    chType === 'verdade'
                      ? 'bg-[#184824] text-white border-emerald-500'
                      : 'bg-[#FCF8EE] text-[#184824]'
                  }`}
                >
                  😇 Verdade
                </button>
                <button
                  type="button"
                  onClick={() => setChType('desafio')}
                  className={`py-1.5 rounded-lg font-bold border transition ${
                    chType === 'desafio'
                      ? 'bg-[#8A0E26] text-white border-rose-500'
                      : 'bg-[#FCF8EE] text-[#8A0E26]'
                  }`}
                >
                  🔥 Desafio
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Clima / Modo:</label>
                <select
                  value={chMode}
                  onChange={(e) => setChMode(e.target.value as GameMode)}
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                >
                  <option value="amigos">Amigos (Leve)</option>
                  <option value="esquenta">Esquenta</option>
                  <option value="kama">Kama (+18)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Nível de Ousadia:</label>
                <select
                  value={chLevel}
                  onChange={(e) => setChLevel(Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                >
                  <option value={1}>Nível 1 (Leve)</option>
                  <option value={2}>Nível 2 (Médio)</option>
                  <option value={3}>Nível 3 (Picante)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1 font-cinzel">
                Texto do Desafio / Pergunta:
              </label>
              <textarea
                value={chText}
                onChange={(e) => setChText(e.target.value)}
                rows={3}
                placeholder="Ex: Sussurre no ouvido de Pessoa B a sua fantasia mais secreta..."
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2.5 text-xs text-[#2E0B12] focus:ring-1 focus:ring-[#8A0E26]"
                required
              />
              <span className="text-[10px] text-[#5C2B1D]/80 block">
                Dica: Use <strong>Pessoa A</strong> para quem faz e <strong>Pessoa B</strong> para quem recebe.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Pontos ao Cumprir:</label>
                <input
                  type="number"
                  value={chPoints}
                  onChange={(e) => setChPoints(Number(e.target.value))}
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                  min={10}
                  max={200}
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Tempo (segundos, opcional):</label>
                <input
                  type="number"
                  value={chTime || ''}
                  onChange={(e) => setChTime(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 30"
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel font-bold text-xs rounded-xl shadow-md transition hover:brightness-110 mt-2"
            >
              Salvar Desafio no Baralho
            </button>
          </form>
        )}

        {/* Formulário de Posição */}
        {activeTab === 'posicao' && (
          <form onSubmit={handleSubmitPosition} className="space-y-3 text-xs text-[#2E0B12]">
            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1 font-cinzel">
                Nome da Posição:
              </label>
              <input
                type="text"
                value={posTitle}
                onChange={(e) => setPosTitle(e.target.value)}
                placeholder="Ex: Dança do Fogo, O Laço Secreto..."
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2.5 text-xs text-[#2E0B12]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1">Subtítulo / Foco:</label>
              <input
                type="text"
                value={posSubtitle}
                onChange={(e) => setPosSubtitle(e.target.value)}
                placeholder="Ex: Foco em intimidade máxima e beijos no pescoço"
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Categoria:</label>
                <select
                  value={posCategory}
                  onChange={(e) => setPosCategory(e.target.value as Position['category'])}
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                >
                  <option value="classicas">Clássicas</option>
                  <option value="controle">Controle</option>
                  <option value="profundidade">Profundidade</option>
                  <option value="acrobaticas">Acrobáticas</option>
                  <option value="oral">Oral</option>
                  <option value="menage">Ménage</option>
                  <option value="lgbtqia">LGBTQIA+</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5C2B1D] mb-1">Local Sugerido:</label>
                <select
                  value={posLocation}
                  onChange={(e) => setPosLocation(e.target.value as Position['location'])}
                  className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
                >
                  <option value="Cama">Cama</option>
                  <option value="Sofá">Sofá</option>
                  <option value="Chão / Tapete">Chão / Tapete</option>
                  <option value="Em Pé">Em Pé</option>
                  <option value="Chuveiro">Chuveiro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1">Instruções Passo a Passo (1 por linha):</label>
              <textarea
                value={posInstructions}
                onChange={(e) => setPosInstructions(e.target.value)}
                rows={3}
                placeholder="1. Deitem-se de frente...&#10;2. Entrelacem as pernas...&#10;3. Mantenham o ritmo lento..."
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs text-[#2E0B12]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C2B1D] mb-1">Dica de Conforto:</label>
              <input
                type="text"
                value={posComfortTip}
                onChange={(e) => setPosComfortTip(e.target.value)}
                placeholder="Ex: Coloque uma almofada sob o quadril..."
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA8010] text-[#1F0307] font-cinzel font-bold text-xs rounded-xl shadow-md transition hover:brightness-110 mt-2"
            >
              Salvar Posição no Catálogo
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
