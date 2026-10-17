import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm transform transition-all duration-300 ease-out">
      <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-xl shadow-slate-950/20 border border-slate-800">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium leading-snug">{toastMessage}</p>
      </div>
    </div>
  );
};
