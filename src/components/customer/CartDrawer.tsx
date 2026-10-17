import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  MapPin,
  Heart,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { INITIAL_COUPONS } from '../../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToPayment,
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    driverTip,
    setDriverTip,
    selectedAddress,
    setSelectedAddress,
    user,
    setIsAuthModalOpen,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Your ApnaGo Cart</h2>
            <p className="text-xs text-slate-500">
              {cart.length} {cart.length === 1 ? 'item' : 'different items'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-4">
              <Trash2 className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-xs leading-relaxed">
              Explore delicious meals, fresh veggies from mandi, or daily wellness essentials
              and add them to your cart.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Delivery Location selector */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-bold text-slate-800">
                <span className="flex items-center gap-1 text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  Deliver to
                </span>
                {user && (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-orange-600 font-semibold cursor-pointer"
                  >
                    Change
                  </button>
                )}
              </div>
              <p className="text-slate-600 line-clamp-2 leading-relaxed">
                {selectedAddress}
              </p>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 p-2">
              {cart.map((item) => (
                <div key={item.product.id} className="py-3 px-2 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {item.product.isVeg ? (
                        <span className="w-3 h-3 border border-emerald-600 flex items-center justify-center p-0.5 shrink-0">
                          <span className="w-1 h-1 bg-emerald-600 rounded-full" />
                        </span>
                      ) : (
                        <span className="w-3 h-3 border border-red-600 flex items-center justify-center p-0.5 shrink-0">
                          <span className="w-1 h-1 bg-red-600 rounded-full" />
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="tabular-nums">₹{item.product.price} each</span>
                      <span>·</span>
                      <span>{item.product.unit}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs font-bold">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors text-slate-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center tabular-nums text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors text-slate-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="w-14 text-right text-xs font-extrabold text-slate-900 tabular-nums">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-600" />
                  Apply Coupon & Offers
                </span>
                {appliedCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-black tracking-wider uppercase">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-emerald-700 ml-1.5 font-medium">applied</span>
                    </div>
                  </div>
                  <span className="font-extrabold tabular-nums">
                    -₹{cartTotals.discount}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      placeholder="Enter promo code (e.g. APNA50)"
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                  )}

                  {/* Available coupons tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {INITIAL_COUPONS.slice(0, 3).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className="text-[10px] font-bold bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-md px-2 py-0.5 transition-colors cursor-pointer"
                      >
                        {c.code} (save ₹{c.discountValue})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tip Driver Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Tip your Delivery Partner
                </span>
                <span className="text-[10px] text-slate-400">100% goes to driver</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 20, 30, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDriverTip(amount)}
                    className={`py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      driverTip === amount
                        ? 'bg-rose-50 text-rose-700 border-rose-400 ring-1 ring-rose-400'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {amount === 0 ? 'No tip' : `₹${amount}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 text-xs">
              <label className="block font-bold text-slate-800 mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Leave package at security, don't ring bell"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Detailed Bill Summary */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
              <h4 className="font-extrabold text-slate-900 pb-1 border-b border-slate-200">
                Bill Details
              </h4>
              <div className="flex justify-between text-slate-600">
                <span>Item Total</span>
                <span className="tabular-nums font-semibold text-slate-800">
                  ₹{cartTotals.itemTotal}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Partner Fee</span>
                <span className="tabular-nums font-semibold text-slate-800">
                  {cartTotals.deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${cartTotals.deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Fee</span>
                <span className="tabular-nums font-semibold text-slate-800">
                  ₹{cartTotals.platformFee}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST & Restaurant Packaging</span>
                <span className="tabular-nums font-semibold text-slate-800">
                  ₹{cartTotals.tax}
                </span>
              </div>
              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Savings</span>
                  <span className="tabular-nums">-₹{cartTotals.discount}</span>
                </div>
              )}
              {cartTotals.driverTip > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Partner Tip</span>
                  <span className="tabular-nums font-semibold text-slate-800">
                    ₹{cartTotals.driverTip}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-extrabold text-sm text-slate-900">
                <span>To Pay</span>
                <span className="text-base text-orange-600 tabular-nums">
                  ₹{cartTotals.grandTotal}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safe and secure payments with Razorpay & Indian UPI</span>
            </div>
          </div>
        )}

        {/* Footer / Proceed CTA */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <button
              onClick={() => {
                onClose();
                onProceedToPayment();
              }}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 active:scale-98 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-between px-5 transition-all cursor-pointer"
            >
              <div className="text-left">
                <span className="text-[10px] font-semibold opacity-80 block uppercase tracking-wider">
                  Total Payable
                </span>
                <span className="text-base tabular-nums">₹{cartTotals.grandTotal}</span>
              </div>
              <div className="flex items-center gap-1.5 font-black">
                <span>Select Payment</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
