import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Bell,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { PincodeEntry } from '../../types';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeModal: React.FC<PincodeModalProps> = ({ isOpen, onClose }) => {
  const {
    pincodes,
    currentPincode,
    setCurrentPincode,
    setSelectedAddress,
    showToast,
    registerWaitlist,
  } = useApp();

  const [searchInput, setSearchInput] = useState(currentPincode);
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistRegistered, setWaitlistRegistered] = useState(false);

  if (!isOpen) return null;

  const currentEntry = pincodes.find((p) => p.pincode === searchInput.trim()) || null;

  const handleSelectPincode = (entry: PincodeEntry) => {
    setCurrentPincode(entry.pincode);
    setSelectedAddress(`${entry.area}, ${entry.city}, ${entry.state} - ${entry.pincode}`);
    showToast(`Location set to ${entry.city} (${entry.pincode})`);
    onClose();
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    registerWaitlist(searchInput.trim(), waitlistPhone);
    setWaitlistRegistered(true);
    showToast(`You are registered for ApnaGo launch in ${searchInput.trim()}!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">All-India Delivery Serviceability</h3>
              <p className="text-[11px] text-slate-400">Select city or check your 6-digit PIN code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Enter Indian Postal PIN Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  maxLength={6}
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value.replace(/\D/g, ''));
                    setWaitlistRegistered(false);
                  }}
                  placeholder="e.g. 560038 or 110001"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Serviceability Result Card */}
          {currentEntry ? (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                currentEntry.isServiceable
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {currentEntry.isServiceable ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span className="font-extrabold text-sm">
                    {currentEntry.city} ({currentEntry.pincode})
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    currentEntry.isServiceable
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {currentEntry.isServiceable ? 'Active' : 'Coming Soon'}
                </span>
              </div>

              <p className="text-slate-600">
                {currentEntry.area}, {currentEntry.state}
              </p>

              {currentEntry.isServiceable ? (
                <>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-white border border-emerald-200 rounded-md text-[10px] font-bold text-emerald-800">
                      ⚡ 15-25 min Mandi
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-emerald-200 rounded-md text-[10px] font-bold text-emerald-800">
                      🍲 Food Kitchens
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-emerald-200 rounded-md text-[10px] font-bold text-emerald-800">
                      📦 City Parcel
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectPincode(currentEntry)}
                    className="w-full mt-2 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Deliver to this Location</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="pt-2 border-t border-amber-200/80 space-y-2">
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    ApnaGo is currently expanding our electric scooter fleet to {currentEntry.city}.
                    Intercity parcel service is active.
                  </p>

                  {!waitlistRegistered ? (
                    <form onSubmit={handleJoinWaitlist} className="space-y-2 pt-1">
                      <span className="font-bold text-[11px] block">
                        Get notified with ₹100 free credit when we launch:
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          maxLength={10}
                          value={waitlistPhone}
                          onChange={(e) => setWaitlistPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Your Mobile (+91)"
                          className="flex-1 px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          <span>Notify Me</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-white/80 p-2.5 rounded-xl text-[11px] text-emerald-800 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>You're on the priority launch list!</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleSelectPincode(currentEntry)}
                    className="w-full mt-1 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Browse Catalog (Preview Mode)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
              Enter one of our nationwide PIN codes to check status.
            </div>
          )}

          {/* Major Indian Hubs Quick Select */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Popular Indian Operating Hubs
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {pincodes.slice(0, 6).map((item) => (
                <button
                  key={item.pincode}
                  onClick={() => setSearchInput(item.pincode)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    searchInput === item.pincode
                      ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{item.city}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isServiceable ? 'bg-emerald-500' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.pincode} · {item.area}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
