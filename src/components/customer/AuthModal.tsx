import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  ShieldCheck,
  User,
  MapPin,
  Check,
  LogOut,
  Sparkles,
  Lock,
  Crown,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    user,
    setUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    setSelectedAddress,
    setActiveRole,
    loginAsOwner,
    showToast,
  } = useApp();

  const [step, setStep] = useState<'phone' | 'otp' | 'owner' | 'profile'>(user ? 'profile' : 'phone');
  const [phoneNumber, setPhoneNumber] = useState('9845012345');
  const [otp, setOtp] = useState('582914');
  const [generatedOtp, setGeneratedOtp] = useState('582914');
  const [userName, setUserName] = useState(user?.name || 'Rahul Sharma');
  const [ownerPasscode, setOwnerPasscode] = useState('sourabh2026');
  const [ownerError, setOwnerError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(simulatedOtp);
    setOtp(simulatedOtp);
    setStep('otp');
    showToast(`SMS OTP sent to +91 ${phoneNumber}: ${simulatedOtp}`);
  };

  const handleVerifyOtp = () => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: userName || 'Rahul Sharma',
      phone: `+91 ${phoneNumber}`,
      email: `${(userName || 'user').toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      savedAddresses: [
        {
          id: 'addr-1',
          type: 'Home' as const,
          line: 'Flat 402, Shanti Nilayam, 12th Main, HAL 2nd Stage, Indiranagar',
          landmark: 'Opposite Corner House Ice Cream',
          city: 'Bengaluru, Karnataka - 560038',
        },
      ],
    };
    setUser(newUser);
    setSelectedAddress(newUser.savedAddresses[0].line);
    showToast(`Welcome to ApnaGo, ${newUser.name}!`);
    setIsAuthModalOpen(false);
  };

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAsOwner(ownerPasscode);
    if (success) {
      setActiveRole('admin');
      setIsAuthModalOpen(false);
    } else {
      setOwnerError('Invalid Owner Passcode. Enter sourabh2026 or apnago.');
    }
  };

  const handleQuickLoginAs = (role: 'customer' | 'partner' | 'owner') => {
    if (role === 'customer') {
      setUser({
        id: 'user-ind-108',
        name: 'Rahul Sharma',
        phone: '+91 98450 12345',
        email: 'rahul.sharma@example.in',
        savedAddresses: [
          {
            id: 'addr-1',
            type: 'Home',
            line: 'Flat 402, Shanti Nilayam, 12th Main, HAL 2nd Stage, Indiranagar',
            landmark: 'Opposite Corner House Ice Cream',
            city: 'Bengaluru, Karnataka - 560038',
          },
        ],
      });
      setActiveRole('customer');
      showToast('Logged in as Customer (Rahul Sharma)');
      setIsAuthModalOpen(false);
    } else if (role === 'partner') {
      setActiveRole('partner');
      showToast('Switched to Delivery Partner Portal (Ramesh Kumar)');
      setIsAuthModalOpen(false);
    } else {
      // Owner login
      loginAsOwner('sourabh2026');
      setActiveRole('admin');
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Official Founder Credit */}
        <div className="p-4 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-sm">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm">ApnaGo Account</h3>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-800">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Founded & Owned by Sourabh Singh</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {/* Quick Demo Personas */}
          <div className="bg-orange-50/70 border border-orange-200/60 rounded-2xl p-3 mb-4 text-xs">
            <span className="font-bold text-orange-900 flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              1-Click Demo Personas
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleQuickLoginAs('customer')}
                className="py-1.5 px-2 bg-white hover:bg-orange-100 text-orange-800 rounded-lg font-bold text-[10px] border border-orange-200 transition-colors cursor-pointer text-center"
              >
                Customer
              </button>
              <button
                onClick={() => handleQuickLoginAs('partner')}
                className="py-1.5 px-2 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[10px] border border-emerald-200 transition-colors cursor-pointer text-center"
              >
                Rider
              </button>
              <button
                onClick={() => handleQuickLoginAs('owner')}
                className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-lg font-black text-[10px] border border-slate-700 transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
              >
                <Crown className="w-3 h-3 text-amber-300" />
                <span>Owner</span>
              </button>
            </div>
          </div>

          {step === 'phone' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Enter Indian Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold tracking-wider text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Send 6-Digit OTP via SMS
              </button>

              <div className="text-center pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep('owner')}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>Founder & Owner Passcode Login</span>
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4 text-xs">
              <div className="text-center">
                <span className="font-bold text-slate-800 block">Verify with OTP</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  We sent a 6-digit code to +91 {phoneNumber}
                </p>
                <div className="mt-2 inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-mono font-bold text-xs">
                  Auto-filled OTP: {generatedOtp}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2.5 text-center font-mono font-black text-xl tracking-[0.4em] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep('phone')}
                  className="w-1/3 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Edit Number
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="flex-1 py-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold rounded-xl shadow-md cursor-pointer"
                >
                  Verify & Sign In
                </button>
              </div>
            </div>
          )}

          {step === 'owner' && (
            <form onSubmit={handleOwnerLogin} className="space-y-4 text-xs">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Crown className="w-4 h-4 text-amber-700" />
                  <span>Sourabh Singh — Owner Verification</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Enter master owner credentials to access executive controls, revenue metrics, and fleet approvals.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Owner Master Passcode</label>
                <input
                  type="password"
                  value={ownerPasscode}
                  onChange={(e) => {
                    setOwnerPasscode(e.target.value);
                    setOwnerError(null);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {ownerError && (
                <p className="text-[11px] text-red-600 font-bold">{ownerError}</p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="w-1/3 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Verify Owner</span>
                </button>
              </div>
            </form>
          )}

          {step === 'profile' && user && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-black text-lg flex items-center justify-center">
                  {user.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-sm text-slate-900">{user.name}</h4>
                    {user.isOwner && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300 flex items-center gap-0.5">
                        <Crown className="w-3 h-3 text-amber-600" />
                        <span>Owner</span>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500">{user.phone}</p>
                  <p className="text-slate-400 text-[11px]">{user.email}</p>
                </div>
              </div>

              {/* Saved Addresses */}
              <div>
                <span className="font-bold text-slate-800 block mb-2">Saved Addresses</span>
                <div className="space-y-2">
                  {user.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr.line);
                        showToast(`Active delivery address updated to ${addr.type}`);
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-orange-400 bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-orange-700 text-[11px]">
                          {addr.type}
                        </span>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-slate-600 text-[11px] line-clamp-2">{addr.line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setUser(null);
                    setStep('phone');
                    showToast('Logged out of ApnaGo.');
                  }}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="flex-1 py-2 bg-orange-600 text-white rounded-xl font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
