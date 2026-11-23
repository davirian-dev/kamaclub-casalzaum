import React from 'react';
import { Flame, BookOpen, Users, Compass, Crown } from 'lucide-react';

export type TabType = 'jogar' | 'posicoes' | 'roda' | 'lugares' | 'clube';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'jogar', label: 'Jogar', icon: Flame },
    { id: 'posicoes', label: 'Posições', icon: BookOpen },
    { id: 'roda', label: 'Roda / Perfis', icon: Users },
    { id: 'lugares', label: 'Lugares', icon: Compass },
    { id: 'clube', label: 'O Clube', icon: Crown },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-[#160104]/98 backdrop-blur-lg border-t border-[#D4AF37]/30 py-2 px-2 flex justify-around items-center shadow-[0_-5px_20px_rgba(0,0,0,0.8)] pb-[max(8px,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id as TabType)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive
                ? 'text-[#FFDF78] font-bold scale-105'
                : 'text-[#F6EAD2]/60 hover:text-[#F6EAD2]/90'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#FFDF78] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''}`} />
            <span className="text-[10px] tracking-tight font-sans">{tab.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
