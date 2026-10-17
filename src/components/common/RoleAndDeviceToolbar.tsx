import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Tablet, Monitor, UserCheck, Bike, ShieldAlert, Sparkles } from 'lucide-react';
import { AppRole, DeviceMode } from '../../types';

interface RoleAndDeviceToolbarProps {
  onOpenBrandKit?: () => void;
}

export const RoleAndDeviceToolbar: React.FC<RoleAndDeviceToolbarProps> = ({ onOpenBrandKit }) => {
  const { activeRole, setActiveRole, deviceMode, setDeviceMode, orders, setIsBrandKitOpen } = useApp();

  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Role Switching Bar */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Switch Portal:</span>
          <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setActiveRole('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeRole === 'customer'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer App</span>
            </button>
            <button
              onClick={() => setActiveRole('partner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
                activeRole === 'partner'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery Partner</span>
              {activeOrdersCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-white text-emerald-800 font-bold rounded-full text-[10px]">
                  {activeOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeRole === 'admin'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Center / Right Quick Brand Kit Trigger */}
        <button
          onClick={() => (onOpenBrandKit ? onOpenBrandKit() : setIsBrandKitOpen(true))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600/30 to-emerald-600/30 hover:from-orange-600/50 hover:to-emerald-600/50 text-amber-200 border border-orange-500/30 font-bold transition-all cursor-pointer shadow-xs text-xs"
          title="Inspect & download official brand logo, app icon & variants"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Brand Kit & Logos</span>
        </button>

        {/* Right: Device Viewport Simulation */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium hidden sm:inline">Screen Mode:</span>
          <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setDeviceMode('mobile')}
              title="Preview on Smartphone (iPhone / Android)"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile (390px)</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              title="Preview on Tablet"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet (768px)</span>
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              title="Responsive Web / Laptop View"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Laptop / Desktop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
