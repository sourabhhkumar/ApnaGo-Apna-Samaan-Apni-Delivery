import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, ShoppingBag, Package, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { heroFoodImg, heroGroceryImg, courierImg } from '../../data/mockData';
import { ApnaGoLogo } from './ApnaGoLogo';
import appIconImg from '../../assets/images/apnago_app_icon_1792245002826.jpg';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const { lang, setLang } = useApp();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: 'Food & Fresh Mandi in Minutes',
      desc: 'Hyderabadi dum biryani, crispy dosas, farm-fresh vegetables & dairy delivered right to your door.',
      img: heroFoodImg,
      icon: UtensilsCrossed,
      color: 'from-orange-500 to-amber-600',
    },
    {
      title: 'ApnaGo City Parcel Send',
      desc: 'Send documents, house keys, homemade tiffins, or chargers across town with verified electric scooter riders.',
      img: courierImg,
      icon: Package,
      color: 'from-emerald-600 to-teal-700',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* Top Bar with Language Toggle & Skip */}
      <div className="w-full max-w-md flex items-center justify-between text-xs z-10 pt-2">
        <div className="inline-flex rounded-full bg-slate-900 border border-slate-800 p-1">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              lang === 'en' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              lang === 'hi' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400'
            }`}
          >
            हिंदी
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Main Brand Lockup */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm w-full my-auto z-10 py-4">
        {/* Official 3D App Icon Emblem */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-2xl shadow-orange-500/30 flex items-center justify-center border-2 border-orange-500/40">
            <img
              src={appIconImg}
              alt="ApnaGo Official App Icon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-[18px]"
            />
          </div>
          <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider shadow-md">
            India
          </span>
        </div>

        {/* Brand Name with arrow in 'o' & Tagline */}
        <div className="mb-1 flex items-center justify-center">
          <ApnaGoLogo variant="full-horizontal" size={38} className="text-white" />
        </div>
        <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
          An Indian Delivery Platform
        </p>
        <p className="text-sm text-slate-300 font-medium italic mb-5">
          “Apna Samaan, Apni Delivery”
        </p>

        {/* Official Founder & Ownership Credit Block */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 mb-6 text-center backdrop-blur-md shadow-xl">
          <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest block mb-0.5">
            Startup Leadership
          </span>
          <div className="text-sm font-black text-white">
            Founded & Owned by Sourabh Singh
          </div>
          <div className="text-xs font-bold text-emerald-400 mt-0.5">
            Developed by Sourabh Singh
          </div>
        </div>

        {/* Carousel Preview Card */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 h-44 shadow-lg text-left p-4 flex flex-col justify-end">
          <img
            src={slides[slide].img}
            alt="Feature"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-400 bg-black/60 px-2 py-0.5 rounded-md mb-1.5 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>{slide === 0 ? 'Express Kitchens & Mandi' : 'City-wide Courier'}</span>
            </div>
            <h3 className="font-extrabold text-sm text-white mb-0.5 leading-snug">
              {slides[slide].title}
            </h3>
            <p className="text-[11px] text-slate-300 line-clamp-2">
              {slides[slide].desc}
            </p>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex gap-1.5 mt-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                slide === idx ? 'w-6 bg-orange-500' : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full max-w-md z-10 space-y-2">
        <button
          onClick={onDismiss}
          className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <span>{lang === 'hi' ? 'अपनागो शुरू करें' : 'Get Started with ApnaGo'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-center text-slate-500 font-medium">
          100% Indian Hyper-local Delivery Network · 256-Bit SSL Encrypted
        </p>
      </div>
    </div>
  );
};
