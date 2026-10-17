import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { ApnaGoLogo, LogoVariant } from './ApnaGoLogo';
import appIconImg from '../../assets/images/apnago_app_icon_1792245002826.jpg';
import brandLogoImg from '../../assets/images/apnago_brand_logo_1792245003576.jpg';
import { useApp } from '../../context/AppContext';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'variants' | 'renders' | 'mockup' | 'specs'>('variants');
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<'white' | 'dark' | 'orange' | 'green'>('white');

  if (!isOpen) return null;

  const handleCopySvg = (name: string, svgContent: string) => {
    navigator.clipboard.writeText(svgContent);
    setCopiedVariant(name);
    showToast(`Copied ${name} SVG markup to clipboard!`);
    setTimeout(() => setCopiedVariant(null), 2500);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}!`);
  };

  const sampleSvg = `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 32C118 32 144 54 152 86C160 118 162 146 165 162C152 164 136 158 132 142C126 122 120 95 106 82C96 72 82 74 72 80C86 52 92 32 100 32Z" fill="#15803d"/>
  <path d="M100 32C84 32 60 52 48 84C36 116 32 148 35 164C48 164 62 152 68 134C74 114 84 86 100 74C112 64 122 66 128 72C118 48 110 32 100 32Z" fill="#f97316"/>
  <circle cx="100" cy="97" r="20" stroke="#1e3a8a" stroke-width="2.5" fill="#fff"/>
</svg>`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center">
              <ApnaGoLogo variant="symbol" className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  ApnaGo Official Brand Logo & App Icon Kit
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase tracking-wider">
                  Verified Identity
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tricolour Palette · Stylized “A” · 24-Spoke Chakra Pin · Speed Parcel Trail
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 bg-slate-50/80 text-xs">
          <div className="flex gap-2 py-2 overflow-x-auto">
            {[
              { id: 'variants', label: '1. All 5 Required Formats', icon: Layers },
              { id: 'renders', label: '2. High-Res 3D Studio Renders', icon: Sparkles },
              { id: 'mockup', label: '3. Smartphone Home Screen', icon: Smartphone },
              { id: 'specs', label: '4. Brand Guidelines & Hex', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Background switcher for transparent testing */}
          {activeTab === 'variants' && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-semibold">Test Surface:</span>
              <button
                onClick={() => setPreviewBg('white')}
                className={`w-5 h-5 rounded-md border cursor-pointer ${
                  previewBg === 'white' ? 'ring-2 ring-orange-500 border-transparent bg-white' : 'bg-white border-slate-300'
                }`}
                title="White Surface"
              />
              <button
                onClick={() => setPreviewBg('dark')}
                className={`w-5 h-5 rounded-md border cursor-pointer ${
                  previewBg === 'dark' ? 'ring-2 ring-orange-500 border-transparent bg-slate-900' : 'bg-slate-900 border-slate-700'
                }`}
                title="Dark Surface"
              />
              <button
                onClick={() => setPreviewBg('orange')}
                className={`w-5 h-5 rounded-md border cursor-pointer ${
                  previewBg === 'orange' ? 'ring-2 ring-slate-900 border-transparent bg-orange-500' : 'bg-orange-500 border-orange-600'
                }`}
                title="Saffron Surface"
              />
              <button
                onClick={() => setPreviewBg('green')}
                className={`w-5 h-5 rounded-md border cursor-pointer ${
                  previewBg === 'green' ? 'ring-2 ring-slate-900 border-transparent bg-emerald-700' : 'bg-emerald-700 border-emerald-800'
                }`}
                title="Green Surface"
              />
            </div>
          )}
        </div>

        {/* Tab 1: All 5 Required Logo Formats */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'variants' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Format 1: High-Resolution Square App Icon */}
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
                        Format 1
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        512×512 Squircle
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                      High-Resolution Square App Icon
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Rounded squircle on white base, 3D stylized tricolour letter “A”, center Chakra pin, speed trail & mini parcel.
                    </p>
                  </div>

                  <div className="py-6 flex items-center justify-center">
                    <ApnaGoLogo variant="app-icon" size={130} />
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => handleCopySvg('App Icon', sampleSvg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedVariant === 'App Icon' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SVG</span>
                    </button>
                    <button
                      onClick={() => handleDownload('apnago-app-icon.svg', sampleSvg)}
                      className="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </button>
                  </div>
                </div>

                {/* Format 2: Standalone Logo Symbol */}
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                        Format 2
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        Vector Symbol
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                      Standalone Logo Symbol
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Pure stylized “A” mark with navy Chakra location pin and speed parcel trail, without wordmark text.
                    </p>
                  </div>

                  <div className="py-6 flex items-center justify-center">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <ApnaGoLogo variant="symbol" className="w-full h-full" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => handleCopySvg('Standalone Symbol', sampleSvg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedVariant === 'Standalone Symbol' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SVG</span>
                    </button>
                    <button
                      onClick={() => handleDownload('apnago-symbol.svg', sampleSvg)}
                      className="py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </button>
                  </div>
                </div>

                {/* Format 3: Horizontal Logo with Wordmark & Arrow in "o" */}
                <div className="md:col-span-2 p-5 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
                        Format 3
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        Primary Lockup
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                      Horizontal Logo with “ApnaGo” Wordmark
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Stylized “A” symbol alongside bold “Apna” in saffron orange, “Go” in deep green, and subtle speed arrow integrated inside the final “o”.
                    </p>
                  </div>

                  <div
                    className={`py-8 px-6 rounded-2xl flex items-center justify-center transition-colors ${
                      previewBg === 'white'
                        ? 'bg-white border border-slate-200'
                        : previewBg === 'dark'
                        ? 'bg-slate-950 border border-slate-800'
                        : previewBg === 'orange'
                        ? 'bg-orange-600 text-white'
                        : 'bg-emerald-800 text-white'
                    }`}
                  >
                    <ApnaGoLogo variant="full-horizontal" size={48} />
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleCopySvg('Horizontal Logo', sampleSvg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedVariant === 'Horizontal Logo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SVG Markup</span>
                    </button>
                    <button
                      onClick={() => handleDownload('apnago-horizontal-logo.svg', sampleSvg)}
                      className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download SVG</span>
                    </button>
                  </div>
                </div>

                {/* Format 4: Simplified Flat Version for Small Icons */}
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                        Format 4
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        16px to 64px Favicons
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                      Simplified Flat Version
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Stripped-back geometric shapes with bold contrast, optimal for browser tab favicons, mobile status bars, and push notifications.
                    </p>
                  </div>

                  <div className="py-6 flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-200 p-2 flex items-center justify-center mx-auto mb-1">
                        <ApnaGoLogo variant="flat-icon" size={48} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">48×48</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 p-1 flex items-center justify-center mx-auto mb-1">
                        <ApnaGoLogo variant="flat-icon" size={32} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">32×32</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-xs border border-slate-200 p-0.5 flex items-center justify-center mx-auto mb-1">
                        <ApnaGoLogo variant="flat-icon" size={20} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">16×16</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => handleCopySvg('Flat Icon', sampleSvg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedVariant === 'Flat Icon' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SVG</span>
                    </button>
                    <button
                      onClick={() => handleDownload('apnago-flat-icon.svg', sampleSvg)}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </button>
                  </div>
                </div>

                {/* Format 5: Transparent-Background Logo */}
                <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
                        Format 5
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        Transparent Alpha
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                      Transparent-Background Logo
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Zero-matte transparent alpha background for website top navigation, mobile splash screen, and dark banners.
                    </p>
                  </div>

                  <div className="py-6 flex items-center justify-center">
                    <div
                      className="p-4 rounded-2xl transition-colors flex items-center justify-center"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                      }}
                    >
                      <ApnaGoLogo variant="transparent" size={90} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => handleCopySvg('Transparent Logo', sampleSvg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedVariant === 'Transparent Logo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SVG</span>
                    </button>
                    <button
                      onClick={() => handleDownload('apnago-transparent-logo.svg', sampleSvg)}
                      className="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: High-Resolution 3D Studio Renders */}
          {activeTab === 'renders' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3D App Icon Render */}
                <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 text-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block mb-1">
                      Commercial 3D Render
                    </span>
                    <h3 className="font-extrabold text-base text-white mb-1">
                      Ultra-Modern 3D Squircle App Icon
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      High-fidelity raytraced render with glossy bevels, Ashoka Chakra pin, speed trail to delivery parcel, and Taj Mahal & India Gate silhouettes.
                    </p>
                  </div>

                  <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center shadow-2xl p-4">
                    <img
                      src={appIconImg}
                      alt="ApnaGo 3D App Icon"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">1024×1024px High-Res</span>
                    <a
                      href={appIconImg}
                      download="apnago-3d-app-icon.jpg"
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Image</span>
                    </a>
                  </div>
                </div>

                {/* 3D Horizontal Brand Logo Render */}
                <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 text-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
                      Brand Lockup Render
                    </span>
                    <h3 className="font-extrabold text-base text-white mb-1">
                      Horizontal Wordmark & Landmark Lockup
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Symbol + “ApnaGo” bold typography with forward arrow inside the “o” and subtle Indian monuments below.
                    </p>
                  </div>

                  <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center shadow-2xl p-4">
                    <img
                      src={brandLogoImg}
                      alt="ApnaGo Brand Logo Lockup"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">16:9 4K Commercial Canvas</span>
                    <a
                      href={brandLogoImg}
                      download="apnago-brand-logo.jpg"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Image</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Smartphone Home Screen Mockup */}
          {activeTab === 'mockup' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md space-y-3">
                  <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest">
                    Real-World Context Preview
                  </span>
                  <h3 className="text-xl font-black text-white">
                    ApnaGo on Android & iOS Home Screen
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed for instant visual recognition at 60×60px on high-density Retina and AMOLED displays. The vibrant saffron “A” and emerald green curve stand out immediately against wallpapers.
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Adheres to Google Material 3 squircle & Apple iOS superellipse masks</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>High contrast white background prevents muddying on colorful wallpapers</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Phone Grid */}
                <div className="w-72 bg-gradient-to-b from-slate-800 to-slate-950 p-5 rounded-[40px] border-4 border-slate-700 shadow-2xl relative select-none">
                  {/* Speaker Notch */}
                  <div className="w-20 h-4 bg-black rounded-full mx-auto mb-4" />

                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-4 text-center mb-8">
                    {/* Dummy app 1 */}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500 mx-auto flex items-center justify-center text-white text-xs font-bold shadow-md">
                        Maps
                      </div>
                      <span className="text-[9px] text-slate-300 mt-1 block">Maps</span>
                    </div>

                    {/* ApnaGo Hero App Icon */}
                    <div className="scale-105">
                      <div className="w-12 h-12 rounded-xl bg-white mx-auto shadow-xl ring-2 ring-orange-500 overflow-hidden flex items-center justify-center p-1">
                        <ApnaGoLogo variant="symbol" className="w-full h-full" />
                      </div>
                      <span className="text-[10px] font-black text-orange-400 mt-1 block tracking-tight">
                        ApnaGo
                      </span>
                    </div>

                    {/* Dummy app 3 */}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500 mx-auto flex items-center justify-center text-white text-xs font-bold shadow-md">
                        Chat
                      </div>
                      <span className="text-[9px] text-slate-300 mt-1 block">WhatsApp</span>
                    </div>

                    {/* Dummy app 4 */}
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-600 mx-auto flex items-center justify-center text-white text-xs font-bold shadow-md">
                        UPI
                      </div>
                      <span className="text-[9px] text-slate-300 mt-1 block">PhonePe</span>
                    </div>
                  </div>

                  {/* Dock */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 grid grid-cols-4 gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 mx-auto" />
                    <div className="w-10 h-10 rounded-xl bg-blue-600 mx-auto" />
                    <div className="w-10 h-10 rounded-xl bg-amber-500 mx-auto" />
                    <div className="w-10 h-10 rounded-xl bg-slate-700 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Brand Guidelines & Hex Palette */}
          {activeTab === 'specs' && (
            <div className="space-y-6 text-xs">
              {/* Color swatches */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                  <div className="w-full h-12 rounded-xl bg-[#f97316] mb-2 shadow-sm" />
                  <span className="font-extrabold text-slate-900 block">Saffron Orange</span>
                  <span className="font-mono text-slate-600 font-bold">#f97316</span>
                  <p className="text-[10px] text-slate-500 mt-1">Energy, speed, Indian cuisine & warmth</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="w-full h-12 rounded-xl bg-[#15803d] mb-2 shadow-sm" />
                  <span className="font-extrabold text-slate-900 block">Deep Forest Green</span>
                  <span className="font-mono text-slate-600 font-bold">#15803d</span>
                  <p className="text-[10px] text-slate-500 mt-1">Trust, freshness, mandi produce & EV</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="w-full h-12 rounded-xl bg-[#1e3a8a] mb-2 shadow-sm" />
                  <span className="font-extrabold text-slate-900 block">Navy Blue Chakra</span>
                  <span className="font-mono text-slate-600 font-bold">#1e3a8a</span>
                  <p className="text-[10px] text-slate-500 mt-1">National unity, precision & reliability</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                  <div className="w-full h-12 rounded-xl bg-[#18181b] mb-2 shadow-sm" />
                  <span className="font-extrabold text-slate-900 block">Charcoal Grey</span>
                  <span className="font-mono text-slate-600 font-bold">#18181b</span>
                  <p className="text-[10px] text-slate-500 mt-1">High-contrast readability & stability</p>
                </div>
              </div>

              {/* Anatomy Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900">
                  Official Anatomy & Design Grammar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Flowing Letter “A”</strong>
                    Interlocking saffron and green curved ribbons symbolizing highway connectivity between farm kitchens and Indian homes.
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">24-Spoke Chakra Pin</strong>
                    Accurate tribute to the Ashoka Chakra embedded inside a location marker, symbolizing 24-hour non-stop nationwide delivery.
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Forward Arrow in “o”</strong>
                    Integrated direction arrow in the final vowel of “ApnaGo”, communicating rapid delivery momentum.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Official Proprietary Identity · ApnaGo Technologies Pvt Ltd</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
          >
            Close Kit
          </button>
        </div>
      </div>
    </div>
  );
};
