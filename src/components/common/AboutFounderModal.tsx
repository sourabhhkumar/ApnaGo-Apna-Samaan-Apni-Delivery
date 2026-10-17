import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, ShieldCheck, Heart, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { ApnaGoLogo } from './ApnaGoLogo';

interface AboutFounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutFounderModal: React.FC<AboutFounderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang, t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top saffron & green header banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-lg flex items-center justify-center">
              <ApnaGoLogo variant="symbol" className="w-full h-full" />
            </div>
            <div>
              <ApnaGoLogo variant="full-horizontal" size={32} className="text-white" />
              <p className="text-xs text-orange-100 font-medium tracking-wide mt-1">
                “Apna Samaan, Apni Delivery”
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-white border border-white/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>An Indian Delivery Platform</span>
          </div>
        </div>

        {/* Founder & Official Ownership Credits Block */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 block mb-1">
              Official Startup Ownership & Leadership
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Founded & Owned by Sourabh Singh
            </h3>
            <p className="text-xs font-bold text-emerald-800 mt-0.5">
              Developed by Sourabh Singh
            </p>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2">
              <span>Made with ❤️ in India</span>
              <span>·</span>
              <span>Proprietary Platform</span>
            </div>
          </div>

          {/* Vision & Story */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Founder's Mission & Architecture</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              ApnaGo was conceived and architected by <strong>Sourabh Singh</strong> to provide a modern,
              fast, and honest on-demand delivery network specifically crafted for Indian households, local
              kirana mandis, and restaurant kitchens across every state and union territory.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From fresh farm vegetables delivered in 15 minutes to city-wide parcel courier and royal biryanis,
              ApnaGo brings together transparent pricing, electric scooter logistics, and nationwide discoverability.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">Zero-Surge Delivery</span>
              <p className="text-[11px] text-slate-500">
                Fair, transparent delivery charges that directly reward electric scooter riders.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">100% Secure & Compliant</span>
              <p className="text-[11px] text-slate-500">
                RBI & NPCI UPI payment gateways with Section 9(5) GST statutory compliance.
              </p>
            </div>
          </div>

          {/* Business Contact */}
          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-slate-500 text-[11px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Headquarters: Indiranagar, Bengaluru, Karnataka, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Official Inquiries: contact@apnago.in</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Back to ApnaGo
          </button>
        </div>
      </div>
    </div>
  );
};
