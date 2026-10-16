import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-14 left-4 right-4 z-50 max-w-sm mx-auto flex items-center gap-2 rounded-xl bg-amber-500/90 text-slate-950 font-bold px-3 py-2 text-xs shadow-xl backdrop-blur-md border border-amber-300 animate-in slide-in-from-top duration-300">
      <WifiOff className="w-4 h-4 shrink-0 text-slate-950" />
      <span className="truncate">Modalità Offline attiva • Tutto il materiale funziona senza rete!</span>
    </div>
  );
};
