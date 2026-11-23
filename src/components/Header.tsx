import React from 'react';
import { Volume2, VolumeX, Shield, AlertTriangle, Crown } from 'lucide-react';

interface HeaderProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPanicMode: () => void;
  onOpenPinModal: () => void;
  onOpenVipModal: () => void;
  isVip: boolean;
  score: number;
  coringas: number;
}

export const Header: React.FC<HeaderProps> = ({
  isPlayingAudio,
  onToggleAudio,
  onPanicMode,
  onOpenPinModal,
  onOpenVipModal,
  isVip,
  score,
  coringas
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#180206]/95 backdrop-blur-md border-b border-[#D4AF37]/30 px-3 py-2 flex items-center justify-between text-[#F6EAD2]">
      {/* Esquerda: Logo Oficial e Nome */}
      <div className="flex items-center gap-2">
        <img
          src="/assets/logo-crest.jpg"
          alt="Clube do Casalzão"
          className="w-9 h-9 rounded-full border border-[#D4AF37] object-cover shadow-md shadow-[#D4AF37]/20"
        />
        <div>
          <h1 className="font-cinzel text-sm sm:text-base font-bold tracking-wider gold-gradient-text leading-tight">
            KAMA & DESAFIOS
          </h1>
          <p className="text-[10px] text-[#D4AF37]/80 font-sans tracking-wide">
            CLUBE DO CASALZÃO
          </p>
        </div>
      </div>

      {/* Direita: Ações Rápidas (Áudio, Pânico, PIN, VIP) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Pontos & Coringas */}
        <div className="hidden xs:flex flex-col items-end mr-1 text-[11px] leading-tight font-sans">
          <span className="text-[#FFDF78] font-bold">{score} pts</span>
          <span className="text-[#F6EAD2]/70 text-[9px]">{coringas} coringas</span>
        </div>

        {/* Botão de Áudio Sexy */}
        <button
          onClick={onToggleAudio}
          className={`p-1.5 rounded-full border transition-all flex items-center gap-1 text-xs px-2 ${
            isPlayingAudio
              ? 'bg-[#8A0E26] border-[#FFDF78] text-[#FFDF78] shadow-sm shadow-[#D4AF37]/40 animate-pulse'
              : 'bg-[#2A050B] border-[#D4AF37]/40 text-[#F6EAD2]/80 hover:bg-[#3D0811]'
          }`}
          title={isPlayingAudio ? 'Silenciar música sexy' : 'Tocar música sexy lounge'}
        >
          {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#FFDF78]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="text-[10px] hidden sm:inline">Música</span>
        </button>

        {/* Botão Modo Pânico / Discreto */}
        <button
          onClick={onPanicMode}
          className="p-1.5 rounded-full bg-[#2A050B] border border-[#D4AF37]/30 text-[#F6EAD2]/70 hover:text-amber-400 hover:border-amber-400 transition"
          title="Modo Discreto / Pânico (Ocultar tela)"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Botão Bloqueio PIN */}
        <button
          onClick={onOpenPinModal}
          className="p-1.5 rounded-full bg-[#2A050B] border border-[#D4AF37]/30 text-[#F6EAD2]/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
          title="Bloquear com PIN"
        >
          <Shield className="w-3.5 h-3.5" />
        </button>

        {/* Botão VIP / Mercado Pago */}
        <button
          onClick={onOpenVipModal}
          className={`px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition shadow-md ${
            isVip
              ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-black border border-yellow-200'
              : 'bg-gradient-to-r from-[#8A0E26] to-[#B5173B] text-white border border-[#D4AF37]/60 hover:brightness-110'
          }`}
        >
          <Crown className="w-3 h-3 text-yellow-300" />
          <span>{isVip ? 'VIP ATIVO' : 'SEJA VIP'}</span>
        </button>
      </div>
    </header>
  );
};
