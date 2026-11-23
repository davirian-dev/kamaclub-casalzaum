import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, X } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPin: string;
  onSavePin: (pin: string) => void;
  onUnlockSuccess: () => void;
  isLockedScreen?: boolean;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  currentPin,
  onSavePin,
  onUnlockSuccess,
  isLockedScreen = false
}) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(!currentPin);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = () => {
    if (enteredPin === currentPin) {
      setErrorMsg('');
      setEnteredPin('');
      onUnlockSuccess();
      onClose();
    } else {
      setErrorMsg('Senha/PIN incorreto. Tente novamente.');
      setEnteredPin('');
    }
  };

  const handleSave = () => {
    if (newPin.length < 4) {
      setErrorMsg('O PIN deve conter no mínimo 4 dígitos.');
      return;
    }
    onSavePin(newPin);
    setIsConfiguring(false);
    setErrorMsg('Novo PIN salvo com sucesso!');
    setTimeout(() => {
      setErrorMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="card-pergaminho p-5 border-2 border-[#D4AF37] max-w-xs w-full space-y-4 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#8A0E26] flex items-center justify-center text-white shadow-md">
          <KeyRound className="w-6 h-6 text-[#FFDF78]" />
        </div>

        <h3 className="font-cinzel text-base font-bold text-[#2E0B12]">
          {isConfiguring ? 'CONFIGURAR PIN DISCRETO' : 'DIGITE SEU PIN DE ACESSO'}
        </h3>

        {errorMsg && (
          <p className="text-[11px] text-red-700 font-bold font-sans">{errorMsg}</p>
        )}

        {isConfiguring ? (
          <div className="space-y-2">
            <input
              type="password"
              maxLength={6}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Criar PIN (4 a 6 números)"
              className="w-full text-center tracking-widest text-lg py-2 bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-xl text-[#2E0B12] focus:outline-none"
            />
            <button
              onClick={handleSave}
              className="w-full py-2 bg-[#8A0E26] text-white font-cinzel font-bold text-xs rounded-xl hover:bg-[#A31230] transition"
            >
              Salvar PIN de Segurança
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="password"
              maxLength={6}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="••••"
              className="w-full text-center tracking-widest text-xl py-2 bg-[#FCF8EE] border border-[#D4AF37]/60 rounded-xl text-[#2E0B12] focus:outline-none"
            />
            <button
              onClick={handleVerify}
              className="w-full py-2 bg-[#8A0E26] text-white font-cinzel font-bold text-xs rounded-xl hover:bg-[#A31230] transition"
            >
              Destravar Aplicativo
            </button>

            {!isLockedScreen && (
              <button
                onClick={() => setIsConfiguring(true)}
                className="text-[10px] text-[#6E3C2B] hover:text-[#2E0B12] underline block mx-auto pt-1"
              >
                Alterar PIN
              </button>
            )}
          </div>
        )}

        {!isLockedScreen && (
          <button
            onClick={onClose}
            className="text-xs text-[#6E3C2B] hover:text-[#2E0B12] font-medium transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};
