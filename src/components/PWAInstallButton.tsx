import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone mode, do not show install prompt
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop standard flow
  if (isInstallable) {
    if (compact) {
      return (
        <button
          onClick={install}
          title="Installa applicazione sul telefono"
          className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Installa</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:opacity-95 transition cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Installa sul Cellulare (PWA)</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit, guide the user)
  if (isIOS) {
    return (
      <>
        {compact ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            title="Come installare su iPhone/iPad"
            className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 text-amber-300 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Installa</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-slate-700/80 transition cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Installa su iPhone / iPad</span>
          </button>
        )}

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Installa su iPhone / iPad</span>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">1. Tocca Condividi</strong>
                    <p className="text-slate-400 mt-0.5">
                      Nella barra inferiore di Safari, tocca il pulsante con la freccia rivolta verso l'alto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">2. Aggiungi a schermata Home</strong>
                    <p className="text-slate-400 mt-0.5">
                      Scorri le opzioni verso il basso e seleziona <em>"Aggiungi alla schermata Home"</em>.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-slate-950 text-xs transition cursor-pointer"
              >
                Ho capito
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for desktop browsers or already-installed browsers
  return null;
};
