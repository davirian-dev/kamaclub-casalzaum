import React, { useState } from 'react';
import { Participant, GameMode, GenderIdentity, SexualOrientation, IntimateRole } from '../types';
import { UserPlus, Trash2, HeartHandshake, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface RodaSetupProps {
  participants: Participant[];
  gameMode: GameMode;
  onUpdateParticipants: (list: Participant[]) => void;
  onChangeGameMode: (mode: GameMode) => void;
  hideLgbt: boolean;
  onToggleHideLgbt: (hide: boolean) => void;
}

export const RodaSetup: React.FC<RodaSetupProps> = ({
  participants,
  gameMode,
  onUpdateParticipants,
  onChangeGameMode,
  hideLgbt,
  onToggleHideLgbt
}) => {
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState<GenderIdentity>('mulher_cis');
  const [newOrientation, setNewOrientation] = useState<SexualOrientation>('hetero');
  const [newRole, setNewRole] = useState<IntimateRole>('versatil');
  const [newInteractsWithAll, setNewInteractsWithAll] = useState(false);

  const handleAddParticipant = () => {
    if (!newName.trim()) return;
    const newP: Participant = {
      id: 'p-' + Date.now(),
      name: newName.trim(),
      gender: newGender,
      orientation: newOrientation,
      role: newRole,
      interactsWithAll: newInteractsWithAll
    };
    onUpdateParticipants([...participants, newP]);
    setNewName('');
  };

  const handleRemove = (id: string) => {
    onUpdateParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Bloco 1: Seleção do Clima da Roda */}
      <div className="card-pergaminho p-4 border border-[#D4AF37]/50">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#8A0E26]" />
          <h2 className="font-cinzel font-bold text-base text-[#2E0B12]">
            CLIMA & MODO DA PARTIDA
          </h2>
        </div>
        <p className="text-xs text-[#5C2B1D] mb-3 font-sans">
          Escolha o nível de intensidade. No modo amigos, posições íntimas são ocultadas para evitar constrangimentos.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onChangeGameMode('amigos')}
            className={`p-2 rounded-xl text-center border transition-all ${
              gameMode === 'amigos'
                ? 'bg-[#8A0E26] text-white border-[#D4AF37] font-bold shadow-md'
                : 'bg-[#F2E4CA] text-[#421913] border-[#D4AF37]/40 hover:bg-[#EBD6B5]'
            }`}
          >
            <span className="block text-lg">🥂</span>
            <span className="text-xs block font-cinzel">Amigos / Leve</span>
            <span className="text-[10px] opacity-80">Zero explícito</span>
          </button>

          <button
            onClick={() => onChangeGameMode('esquenta')}
            className={`p-2 rounded-xl text-center border transition-all ${
              gameMode === 'esquenta'
                ? 'bg-[#8A0E26] text-white border-[#D4AF37] font-bold shadow-md'
                : 'bg-[#F2E4CA] text-[#421913] border-[#D4AF37]/40 hover:bg-[#EBD6B5]'
            }`}
          >
            <span className="block text-lg">💋</span>
            <span className="text-xs block font-cinzel">Esquenta</span>
            <span className="text-[10px] opacity-80">Beijos & toques</span>
          </button>

          <button
            onClick={() => onChangeGameMode('kama')}
            className={`p-2 rounded-xl text-center border transition-all ${
              gameMode === 'kama'
                ? 'bg-[#8A0E26] text-white border-[#D4AF37] font-bold shadow-md'
                : 'bg-[#F2E4CA] text-[#421913] border-[#D4AF37]/40 hover:bg-[#EBD6B5]'
            }`}
          >
            <span className="block text-lg">🔥</span>
            <span className="text-xs block font-cinzel">Kama +18</span>
            <span className="text-[10px] opacity-80">Sem tabus</span>
          </button>
        </div>
      </div>

      {/* Bloco 2: Filtro Sem Preconceito / Discrição Tradicional */}
      <div className="card-pergaminho p-3.5 border border-[#D4AF37]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#8A0E26]" />
          <div>
            <h3 className="font-cinzel text-xs font-bold text-[#2E0B12]">
              Modo Tradicional (Homem & Mulher)
            </h3>
            <p className="text-[11px] text-[#5C2B1D]">
              Ocultar posições e opções LGBTQIA+ / ménage do app
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggleHideLgbt(!hideLgbt)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            hideLgbt
              ? 'bg-[#8A0E26] text-white shadow-sm'
              : 'bg-[#DCD0B7] text-[#5C2B1D]'
          }`}
        >
          {hideLgbt ? 'ATIVADO' : 'DESLIGADO'}
        </button>
      </div>

      {/* Bloco 3: Cadastro de Participantes */}
      <div className="card-pergaminho p-4 border border-[#D4AF37]/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#8A0E26]" />
            <h2 className="font-cinzel font-bold text-sm text-[#2E0B12]">
              PARTICIPANTES DA RODA ({participants.length})
            </h2>
          </div>
        </div>

        {/* Lista de Cadastrados */}
        <div className="space-y-2">
          {participants.map((p, idx) => (
            <div
              key={p.id}
              className="bg-[#F7EFE0] p-2.5 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between"
            >
              <div>
                <span className="font-cinzel font-bold text-sm text-[#2E0B12]">
                  {idx + 1}. {p.name}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1 text-[10px]">
                  <span className="bg-[#EEDBB7] px-1.5 py-0.5 rounded text-[#421913] font-medium">
                    {p.gender.replace('_', ' ')}
                  </span>
                  <span className="bg-[#EEDBB7] px-1.5 py-0.5 rounded text-[#421913] font-medium">
                    {p.orientation}
                  </span>
                  {gameMode !== 'amigos' && (
                    <span className="bg-[#8A0E26] text-white px-1.5 py-0.5 rounded font-medium">
                      Papel: {p.role}
                    </span>
                  )}
                  <span className={`px-1.5 py-0.5 rounded font-medium ${p.interactsWithAll ? 'bg-emerald-700 text-white' : 'bg-amber-800 text-white'}`}>
                    {p.interactsWithAll ? 'Interage c/ todos' : 'Orientação estrita'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(p.id)}
                className="p-1.5 text-red-700 hover:bg-red-100 rounded-lg transition"
                title="Remover participante"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulário para Adicionar */}
        <div className="bg-[#EFE2C8] p-3 rounded-xl border border-[#D4AF37]/40 space-y-2.5 mt-3">
          <h3 className="font-cinzel text-xs font-bold text-[#381A12] flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5" /> Adicionar Novo Participante
          </h3>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome ou apelido (ex: Mari, Davi, Bruno)"
            className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg px-3 py-1.5 text-xs text-[#2E0B12] placeholder-[#8F725A] focus:outline-none focus:ring-1 focus:ring-[#8A0E26]"
          />

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-0.5">Identidade:</label>
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value as GenderIdentity)}
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-1 text-[11px] text-[#2E0B12]"
              >
                <option value="homem_cis">Homem Cis</option>
                <option value="mulher_cis">Mulher Cis</option>
                <option value="homem_trans">Homem Trans</option>
                <option value="mulher_trans">Mulher Trans</option>
                <option value="nao_binario">Não-binário</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-0.5">Orientação:</label>
              <select
                value={newOrientation}
                onChange={(e) => setNewOrientation(e.target.value as SexualOrientation)}
                className="w-full bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-lg p-1 text-[11px] text-[#2E0B12]"
              >
                <option value="hetero">Hétero</option>
                <option value="bi_pan">Bi / Pan</option>
                <option value="gay">Gay</option>
                <option value="lesbica">Lésbica</option>
                <option value="flexivel">Flexível / Sem Rótulo</option>
              </select>
            </div>
          </div>

          {gameMode !== 'amigos' && (
            <div>
              <label className="block text-[10px] font-bold text-[#5C2B1D] mb-0.5">Papel Íntimo:</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['ativo', 'passivo', 'versatil'] as IntimateRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setNewRole(r)}
                    className={`py-1 rounded text-[11px] capitalize border transition ${
                      newRole === r
                        ? 'bg-[#8A0E26] text-white border-[#D4AF37] font-bold'
                        : 'bg-[#FCF8EE] text-[#421913] border-[#D4AF37]/40'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="interactsAll"
              checked={newInteractsWithAll}
              onChange={(e) => setNewInteractsWithAll(e.target.checked)}
              className="accent-[#8A0E26] w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="interactsAll" className="text-[11px] text-[#421913] cursor-pointer">
              Interage livremente com qualquer gênero na roda
            </label>
          </div>

          <button
            onClick={handleAddParticipant}
            className="w-full py-2 bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white font-cinzel font-bold text-xs rounded-lg shadow-md hover:brightness-110 transition mt-1"
          >
            + Adicionar à Roda
          </button>
        </div>
      </div>
    </div>
  );
};
