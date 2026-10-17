import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  User,
  MapPin,
  Package,
  Headphones,
  Award,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { ServiceCategory } from '../../types';
import { ApnaGoLogo } from './ApnaGoLogo';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenAbout: () => void;
  onOpenPincode: () => void;
  onOpenBrandKit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenAbout,
  onOpenPincode,
  onOpenBrandKit,
}) => {
  const {
    activeCategory,
    setActiveCategory,
    currentTab,
    setCurrentTab,
    selectedAddress,
    cart,
    user,
    setIsAuthModalOpen,
    setIsSupportOpen,
    activeTrackingOrderId,
    currentPincode,
    pincodes,
    lang,
    setLang,
    t,
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activePinEntry = pincodes.find((p) => p.pincode === currentPincode);
  const isPinActive = activePinEntry?.isServiceable ?? true;

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'food', label: t('foodDelivery') },
    { id: 'grocery', label: t('groceryMandi') },
    { id: 'essentials', label: t('dailyEssentials') },
    { id: 'parcel', label: t('sendParcel') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar with location, PIN selector, founder credit, language toggle and support */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Deliver to address with clickable PIN Code selector */}
          <button
            onClick={onOpenPincode}
            className="flex items-center gap-1.5 truncate text-left hover:text-white transition-colors cursor-pointer group"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white shrink-0">{t('deliverTo')}:</span>
            <span className="truncate max-w-[160px] sm:max-w-xs text-slate-300">
              {selectedAddress}
            </span>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                isPinActive
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              {isPinActive ? 'Active' : 'Coming Soon'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0" />
          </button>

          {/* Center: Founder Credit for Sourabh Singh */}
          <button
            onClick={onOpenAbout}
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-[11px]">
              Founded & Owned by <strong className="text-white group-hover:underline">Sourabh Singh</strong>
            </span>
          </button>

          {/* Right: Language Switcher & Customer Help */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="inline-flex rounded-md bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  lang === 'hi' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            <span className="text-slate-700 hidden sm:inline">|</span>

            {onOpenBrandKit && (
              <button
                onClick={onOpenBrandKit}
                className="hidden sm:flex items-center gap-1 text-orange-400 hover:text-orange-300 font-bold transition-colors cursor-pointer text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Brand Kit</span>
              </button>
            )}

            <button
              onClick={() => setIsSupportOpen(true)}
              className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Official ApnaGo Brand Logo */}
        <div
          onClick={() => setCurrentTab('home')}
          className="cursor-pointer flex items-center gap-2 shrink-0 select-none group"
          title="ApnaGo — Home"
        >
          <ApnaGoLogo variant="full-horizontal" size={38} />
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 ml-1 hidden lg:inline-block">
            India
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {categories.map((cat) => {
            const isActive = currentTab === 'home' && activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentTab('home');
                }}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentTab('orders')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'orders'
                ? 'bg-orange-50 text-orange-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t('myOrders')}</span>
            {activeTrackingOrderId && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            onClick={onOpenAbout}
            className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-orange-600 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5 text-orange-500" />
            <span>About</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">
              {user ? (user.isOwner ? 'Sourabh Singh (Owner)' : user.name.split(' ')[0]) : t('signIn')}
            </span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 active:scale-95 rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('cart')}</span>
            {totalCartCount > 0 && (
              <span className="px-1.5 py-0.5 bg-white text-orange-600 rounded-md text-[11px] font-black tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Category Quick Bar */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 scrollbar-none">
        {categories.map((cat) => {
          const isActive = currentTab === 'home' && activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentTab('home');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentTab('orders')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all ${
            currentTab === 'orders'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('myOrders')}
        </button>
        <button
          onClick={onOpenPincode}
          className="px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap shrink-0 bg-emerald-50 text-emerald-800 border border-emerald-200"
        >
          PIN: {currentPincode}
        </button>
        <button
          onClick={onOpenAbout}
          className="px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap shrink-0 bg-orange-50 text-orange-700 border border-orange-200"
        >
          Founder
        </button>
      </div>
    </header>
  );
};
