import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceMode } = useApp();

  if (deviceMode === 'desktop') {
    return <div className="min-h-screen bg-slate-50 flex flex-col">{children}</div>;
  }

  if (deviceMode === 'tablet') {
    return (
      <div className="min-h-screen bg-slate-200 py-8 px-4 flex items-center justify-center">
        <div className="w-[768px] min-h-[960px] bg-white rounded-3xl shadow-2xl border-[10px] border-slate-800 overflow-hidden flex flex-col relative">
          <div className="h-6 bg-slate-800 flex items-center justify-center">
            <div className="w-16 h-1.5 bg-slate-600 rounded-full" />
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  }

  // Mobile mode (390px iPhone/Pixel frame)
  return (
    <div className="min-h-screen bg-slate-200 py-6 px-4 flex items-center justify-center">
      <div className="w-[390px] h-[844px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-900 overflow-hidden flex flex-col relative ring-1 ring-slate-400/20">
        {/* Dynamic Island / Notch */}
        <div className="bg-slate-900 pt-2 pb-1 px-6 text-white text-[11px] font-semibold flex items-center justify-between select-none shrink-0 z-50">
          <span>9:41</span>
          <div className="w-24 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Content container */}
        <div className="flex-1 overflow-y-auto flex flex-col relative bg-slate-50">
          {children}
        </div>

        {/* Mobile Home Bar */}
        <div className="bg-white py-1.5 flex justify-center shrink-0 border-t border-slate-100">
          <div className="w-32 h-1 bg-slate-900 rounded-full" />
        </div>
      </div>
    </div>
  );
};
