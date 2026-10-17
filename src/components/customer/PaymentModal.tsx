import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Smartphone,
  Building,
  Lock,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (orderId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const { cartTotals, placeOrder } = useApp();

  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiOption, setUpiOption] = useState<'gpay' | 'phonepe' | 'paytm' | 'id'>('gpay');
  const [upiId, setUpiId] = useState('rahul.sharma@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = async () => {
    setIsProcessing(true);
    try {
      const newOrder = await placeOrder(paymentMode);
      onPaymentSuccess(newOrder.id);
      onClose();
    } catch {
      // fallback
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-sm">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm">ApnaGo Secure Checkout</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  via Razorpay
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Amount: <span className="text-white font-bold tabular-nums">₹{cartTotals.grandTotal}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close payment modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setPaymentMode('upi')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMode === 'upi'
                  ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500/20 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs'
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-orange-600" />
              <span className="text-xs">UPI Apps</span>
            </button>

            <button
              onClick={() => setPaymentMode('card')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMode === 'card'
                  ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500/20 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs'
              }`}
            >
              <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <span className="text-xs">Card</span>
            </button>

            <button
              onClick={() => setPaymentMode('netbanking')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMode === 'netbanking'
                  ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500/20 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs'
              }`}
            >
              <Building className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span className="text-xs">NetBanking</span>
            </button>

            <button
              onClick={() => setPaymentMode('cod')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMode === 'cod'
                  ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500/20 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs'
              }`}
            >
              <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-600" />
              <span className="text-xs">Cash on Del</span>
            </button>
          </div>

          {/* Sub options based on selection */}
          {paymentMode === 'upi' && (
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Select UPI Payment Method
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gpay', label: 'Google Pay', icon: '🟢' },
                  { id: 'phonepe', label: 'PhonePe', icon: '🟣' },
                  { id: 'paytm', label: 'Paytm UPI', icon: '🔵' },
                ].map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setUpiOption(app.id as any)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      upiOption === app.id
                        ? 'bg-white border-orange-500 shadow-xs font-bold text-slate-900'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white text-xs'
                    }`}
                  >
                    <span className="text-sm block mb-0.5">{app.icon}</span>
                    <span className="text-[11px] font-semibold">{app.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Or enter UPI Virtual Payment Address (VPA)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="mobilenumber@upi"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {paymentMode === 'card' && (
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Card Number (Visa / Mastercard / RuPay)
                </label>
                <input
                  type="text"
                  defaultValue="4532 ···· ···· 9812"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    defaultValue="09/29"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="•••"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMode === 'netbanking' && (
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Popular Indian Banks</span>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map(
                  (bank, i) => (
                    <button
                      key={bank}
                      className={`p-2 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                        i === 0
                          ? 'bg-white border-orange-500 font-bold text-slate-900'
                          : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {bank}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {paymentMode === 'cod' && (
            <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-amber-700" />
                <span>Cash / UPI on Delivery</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                You can pay in cash or scan the ApnaGo delivery partner’s QR code upon arrival at your doorstep.
              </p>
            </div>
          )}

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted · RBI & NPCI Compliant</span>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-75 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying with Bank...</span>
              </span>
            ) : (
              <span>
                {paymentMode === 'cod' ? 'Confirm Order with COD' : `Pay ₹${cartTotals.grandTotal} Now`}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
