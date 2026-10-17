import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Mail, Phone, Heart, Award, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../../types';
import { ApnaGoLogo } from './ApnaGoLogo';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenParcel: () => void;
  onOpenBrandKit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenParcel, onOpenBrandKit }) => {
  const { setActiveCategory, setCurrentTab, setActiveRole } = useApp();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Lockup & Founder Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <ApnaGoLogo variant="full-horizontal" size={36} className="text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1">
                India
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium italic">
              “Apna Samaan, Apni Delivery”
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier on-demand delivery startup uniting authentic culinary kitchens,
              farm-fresh mandi produce, 15-min daily essentials, and zero-hassle city parcel express.
            </p>

            {/* Official Ownership Credit Callout */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 max-w-sm">
              <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block mb-0.5">
                Official Ownership & Development
              </span>
              <p className="text-xs font-bold text-white">
                Founded & Owned by Sourabh Singh
              </p>
              <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                Developed by Sourabh Singh
              </p>
              <button
                onClick={onOpenAbout}
                className="mt-2 text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Founder's Mission</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              Delivery Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('food');
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hot Food Delivery (20-30m)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('grocery');
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fresh Mandi & Groceries (15m)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('essentials');
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Essentials & Pharmacy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenParcel}
                  className="hover:text-white transition-colors cursor-pointer text-orange-400 font-semibold"
                >
                  ApnaGo City Parcel Send
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Portals */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              Platform Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveRole('partner')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Delivery Partner App</span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1 rounded">
                    Earn ₹35k/mo
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRole('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Owner & Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Sourabh Singh
                </button>
              </li>
              {onOpenBrandKit && (
                <li>
                  <button
                    onClick={onOpenBrandKit}
                    className="hover:text-white transition-colors cursor-pointer text-orange-400 font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>Brand Kit & Logos</span>
                  </button>
                </li>
              )}
              <li>
                <span className="text-slate-500">Merchant Onboarding (Open)</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Contact */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              Trust & Compliance
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>GST Section 9(5) Indian Tax Compliant</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>RBI & NPCI UPI Verified Gateways</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Support: contact@apnago.in<br />
                Indiranagar, Bengaluru, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Detailed Founder Credit & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-200">
              ApnaGo — An Indian Delivery Platform
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Founded & Owned by <strong className="text-white">Sourabh Singh</strong> · Developed by <strong className="text-emerald-400">Sourabh Singh</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Pricing Policy</span>
            <span>·</span>
            <span className="text-slate-500">© 2026 ApnaGo Technologies Pvt Ltd</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
