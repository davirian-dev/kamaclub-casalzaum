import React, { useState } from 'react';
import { Crown, Check, ExternalLink, ShieldAlert, Sparkles, Copy } from 'lucide-react';

interface ClubeVipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVip: boolean;
  onActivateVip: () => void;
}

export const ClubeVipModal: React.FC<ClubeVipModalProps> = ({
  isOpen,
  onClose,
  isVip,
  onActivateVip
}) => {
  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = '71981223348'; // Chave Pix Oficial de Ativação do Davi Rian / Marina

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
      <div className="card-pergaminho p-5 border-2 border-[#D4AF37] max-w-sm w-full space-y-4 text-center relative max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho VIP */}
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
          <Crown className="w-8 h-8 text-black" />
        </div>

        <div>
          <h2 className="font-cinzel text-lg font-bold text-[#2E0B12]">
            CLUBE DO CASALZÃO VIP
          </h2>
          <p className="text-xs text-[#6E3C2B] font-serif">
            Acesso Completo & Sem Limites ao Kama & Desafios
          </p>
        </div>

        {/* Benefícios Liberados */}
        <div className="bg-[#FCF8EE] p-3 rounded-xl border border-[#D4AF37]/50 text-left space-y-1.5 text-xs text-[#2E0B12]">
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            150+ Posições detalhadas com ilustrações
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Módulos especiais: Ménage, Swing e LGBTQIA+
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Jogo da Garrafa +18 & Verdade ou Desafio Extremo
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            200+ Lugares & Cartas românticas de ideias
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Bloqueio com PIN & Acesso vitalício sem mensalidade
          </div>
        </div>

        {/* Oferta Mercado Pago (Marina) / Pix Direto */}
        <div className="bg-[#EEDBB7] p-3 rounded-xl border border-[#AA8010]/40 space-y-2">
          <span className="text-[10px] text-[#5C2B1D] font-bold block uppercase tracking-wider">
            Pagamento Único via Pix (Mercado Pago):
          </span>
          <div className="text-2xl font-bold font-cinzel text-[#8A0E26]">
            R$ 29,90 <span className="text-xs font-sans text-[#5C2B1D]">/ Vitalício</span>
          </div>

          <div className="bg-white p-2 rounded-lg border border-[#D4AF37]/60 flex items-center justify-between text-xs font-mono text-[#2E0B12]">
            <span className="truncate mr-2 font-bold">{pixKey}</span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-[#8A0E26] text-white rounded text-[10px] font-sans font-bold flex items-center gap-1 hover:bg-[#A31230] transition flex-shrink-0"
            >
              <Copy className="w-3 h-3" />
              {copiedPix ? 'Copiado!' : 'Copiar Chave'}
            </button>
          </div>
          <span className="text-[10px] text-[#5C2B1D] block">
            Nome do favorecido: Marina / Davi Rian (Mercado Pago)
          </span>
        </div>

        {/* Botão de Ativação Instantânea (Simulação de Confirmação) */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onActivateVip}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-cinzel font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            {isVip ? 'VOCÊ JÁ É VIP (ATIVO)' : 'JÁ FIZ O PIX, LIBERAR AGORA!'}
          </button>

          <button
            onClick={onClose}
            className="text-xs text-[#6E3C2B] hover:text-[#2E0B12] font-medium block mx-auto transition"
          >
            Fechar e Continuar no Modo Degustação
          </button>
        </div>
      </div>
    </div>
  );
};
