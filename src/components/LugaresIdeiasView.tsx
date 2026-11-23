import React, { useState } from 'react';
import { PlaceCategory, IdeaCard } from '../types';
import { MapPin, CheckCircle2, Circle, Lightbulb, Plus, Check } from 'lucide-react';

interface LugaresIdeiasViewProps {
  places: PlaceCategory[];
  ideas: IdeaCard[];
  onTogglePlaceItem: (catId: string, itemId: string) => void;
  onAddCustomIdea: (idea: IdeaCard) => void;
}

export const LugaresIdeiasView: React.FC<LugaresIdeiasViewProps> = ({
  places,
  ideas,
  onTogglePlaceItem,
  onAddCustomIdea
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'lugares' | 'ideias' | 'criar'>('lugares');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<IdeaCard['category']>('Criativo');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    const item: IdeaCard = {
      id: 'custom-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim(),
      status: 'novas'
    };
    onAddCustomIdea(item);
    setNewTitle('');
    setNewDesc('');
    setActiveSubTab('ideias');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Seletor de Sub-Abas */}
      <div className="flex bg-[#1A0206] p-1 rounded-xl border border-[#D4AF37]/30">
        <button
          onClick={() => setActiveSubTab('lugares')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel transition ${
            activeSubTab === 'lugares'
              ? 'bg-[#8A0E26] text-[#FFDF78] font-bold shadow-sm'
              : 'text-[#F6EAD2]/70'
          }`}
        >
          📍 Desafio de Lugares
        </button>
        <button
          onClick={() => setActiveSubTab('ideias')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel transition ${
            activeSubTab === 'ideias'
              ? 'bg-[#8A0E26] text-[#FFDF78] font-bold shadow-sm'
              : 'text-[#F6EAD2]/70'
          }`}
        >
          💡 Ideias & Surpresas
        </button>
        <button
          onClick={() => setActiveSubTab('criar')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel transition ${
            activeSubTab === 'criar'
              ? 'bg-[#8A0E26] text-[#FFDF78] font-bold shadow-sm'
              : 'text-[#F6EAD2]/70'
          }`}
        >
          ➕ Criar Meu Desafio
        </button>
      </div>

      {/* 1. Módulo de Lugares */}
      {activeSubTab === 'lugares' && (
        <div className="space-y-3">
          {places.map((category) => {
            const completedCount = category.items.filter((i) => i.done).length;
            const percentage = Math.round((completedCount / category.items.length) * 100);

            return (
              <div key={category.id} className="card-pergaminho p-4 border border-[#D4AF37]/50 space-y-2">
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8A0E26]" />
                    <h3 className="font-cinzel font-bold text-sm text-[#2E0B12]">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#8A0E26] bg-[#EEDBB7] px-2 py-0.5 rounded-full">
                    {percentage}% Feito
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTogglePlaceItem(category.id, item.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition border ${
                        item.done
                          ? 'bg-emerald-900/10 border-emerald-600/40 text-emerald-900 font-medium'
                          : 'bg-[#FCF8EE] border-[#D4AF37]/30 text-[#421913] hover:bg-[#F5ECD7]'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#AA8010]/50" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Módulo de Ideias Criativas */}
      {activeSubTab === 'ideias' && (
        <div className="space-y-2.5">
          {ideas.map((idea) => (
            <div key={idea.id} className="card-pergaminho p-4 border border-[#D4AF37]/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel font-bold text-sm text-[#2E0B12] flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#8A0E26]" />
                  {idea.title}
                </h4>
                <span className="text-[10px] bg-[#8A0E26] text-white px-2 py-0.5 rounded font-sans">
                  {idea.category}
                </span>
              </div>
              <p className="text-xs text-[#5C2B1D] font-serif leading-relaxed">
                {idea.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 3. Módulo de Criar Próprio Desafio */}
      {activeSubTab === 'criar' && (
        <div className="card-pergaminho p-4 border border-[#D4AF37]/50 space-y-3">
          <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-2">
            <Plus className="w-4 h-4 text-[#8A0E26]" />
            <h3 className="font-cinzel font-bold text-sm text-[#2E0B12]">
              CRIAR NOVO DESAFIO OU IDEIA
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-1">Título:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Noite de Massagem com Óleos Aromáticos"
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs text-[#2E0B12] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-1">Categoria:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as IdeaCard['category'])}
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs text-[#2E0B12]"
              >
                <option value="Criativo">Criativo</option>
                <option value="Escandalosos">Escandalosos</option>
                <option value="Acessível">Acessível</option>
                <option value="Rápido">Rápido</option>
                <option value="Clássico">Clássico</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-1">Instruções / Como Funciona:</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Descreva a regra, a prenda ou o passo a passo..."
                rows={3}
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-2 text-xs text-[#2E0B12] focus:outline-none"
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-2.5 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition"
            >
              Salvar Desafio no Aplicativo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
