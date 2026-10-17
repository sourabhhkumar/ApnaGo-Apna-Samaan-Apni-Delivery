import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bike,
  Power,
  MapPin,
  Phone,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
  Key,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { courierImg } from '../../data/mockData';
import { OrderStatus } from '../../types';

export const DeliveryPartnerView: React.FC = () => {
  const {
    partnerOnline,
    setPartnerOnline,
    partnerStats,
    orders,
    updateOrderStatus,
    verifyDeliveryOtp,
    showToast,
  } = useApp();

  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);

  // Active delivery for the partner
  const activeOrder = orders.find(
    (o) =>
      o.status === 'picked_up' ||
      o.status === 'out_for_delivery' ||
      o.status === 'preparing' ||
      o.status === 'placed'
  );

  const completedOrders = orders.filter((o) => o.status === 'delivered');

  const handleVerifyAndDeliver = (orderId: string) => {
    const success = verifyDeliveryOtp(orderId, otpInput);
    if (success) {
      setOtpInput('');
      setOtpError(false);
      showToast('Delivery completed! Earnings credited to wallet.');
    } else {
      setOtpError(true);
      showToast('Invalid OTP entered. Please check with customer.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28">
      {/* Top Partner Status Bar */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white mb-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-emerald-500">
              <img
                src={courierImg}
                alt="Partner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                partnerOnline ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black">Ramesh Kumar</h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-700/50 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                KYC & DL Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ather 450X Electric Scooter · <span className="font-mono text-slate-300">KA 03 AC 1947</span>
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-semibold">
              <span className="text-amber-400">★ 4.92 Rating</span>
              <span>·</span>
              <span className="text-emerald-400">1,420 Total Deliveries</span>
            </div>
          </div>
        </div>

        {/* Online / Offline switch */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
          <div className="text-right">
            <span className="text-xs font-bold block">
              {partnerOnline ? 'You are ONLINE' : 'You are OFFLINE'}
            </span>
            <span className="text-[10px] text-slate-400">
              {partnerOnline ? 'Ready for nearby orders' : 'Not receiving requests'}
            </span>
          </div>

          <button
            onClick={() => {
              setPartnerOnline(!partnerOnline);
              showToast(
                partnerOnline
                  ? 'Switched to Offline. Take a break!'
                  : 'You are now Online. Orders incoming!'
              );
            }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
              partnerOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Power className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Daily Earnings & Incentive Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Today's Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            ₹{partnerStats.todayEarnings}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            +₹85 tips included
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Completed Trips</span>
            <Bike className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {partnerStats.todayTrips} trips
          </div>
          <span className="text-[11px] text-slate-500 font-semibold block mt-1">
            Avg 18 mins / trip
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Daily Bonus</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            ₹250 Extra
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all"
              style={{
                width: `${(partnerStats.incentiveCompleted / partnerStats.incentiveTarget) * 100}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">
            {partnerStats.incentiveCompleted} / {partnerStats.incentiveTarget} orders done
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">EV Green Eco</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            Zero Emission
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Saved 18.4 kg CO2
          </span>
        </div>
      </div>

      {/* Main Delivery Task Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Order Task Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Active Assigned Delivery
            </h3>
            {activeOrder && (
              <span className="text-xs font-bold font-mono bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full">
                Order #{activeOrder.id}
              </span>
            )}
          </div>

          {!partnerOnline ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
              <p className="font-bold text-slate-700 mb-1">You are currently offline</p>
              <p className="text-xs text-slate-500 mb-4">
                Toggle the switch above to go online and receive delivery tasks.
              </p>
              <button
                onClick={() => setPartnerOnline(true)}
                className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Go Online Now
              </button>
            </div>
          ) : !activeOrder ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Bike className="w-7 h-7" />
              </div>
              <p className="font-bold text-slate-800 mb-1">Waiting for next nearby order...</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                You're in the high-demand Indiranagar & Koramangala zone. New order requests will buzz here automatically.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>GPS Radar Scanning</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-2 border-orange-400 p-6 shadow-md space-y-5">
              {/* Status Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Current Task Phase
                  </span>
                  <h4 className="text-lg font-black text-slate-900 capitalize">
                    {activeOrder.status.replace(/_/g, ' ')}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">Estimated Payout</span>
                  <span className="text-lg font-extrabold text-emerald-700 tabular-nums">
                    ₹{65 + activeOrder.driverTip}
                  </span>
                </div>
              </div>

              {/* Step 1: Store Pickup Info */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-orange-950">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    Pickup Location
                  </span>
                  <span className="text-[11px] text-orange-700 font-mono">1.1 km away</span>
                </div>
                <p className="font-bold text-sm text-slate-900">{activeOrder.storeName}</p>
                <p className="text-slate-600">
                  Indiranagar 100ft Road, near Metro Pillar 42
                </p>

                {/* Items preview */}
                <div className="pt-2 border-t border-orange-200/60 mt-2 space-y-1">
                  <span className="font-bold text-[11px] text-slate-700 block">
                    Items to pick up:
                  </span>
                  {activeOrder.items.map((it) => (
                    <div key={it.productId} className="flex justify-between text-slate-700">
                      <span>
                        {it.quantity}x {it.productName}
                      </span>
                      <span className="font-semibold">{it.unit}</span>
                    </div>
                  ))}
                </div>

                {/* Action button for pickup */}
                {activeOrder.status === 'placed' || activeOrder.status === 'preparing' ? (
                  <button
                    onClick={() => updateOrderStatus(activeOrder.id, 'picked_up')}
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs shadow-md mt-2 cursor-pointer"
                  >
                    Confirm Order Picked Up from Kitchen →
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Order Picked Up & Safely Packed in Thermal Bag</span>
                  </div>
                )}
              </div>

              {/* Step 2: Customer Drop-off */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    Customer Delivery Drop
                  </span>
                  <a
                    href={`tel:${activeOrder.customerPhone}`}
                    className="flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Customer</span>
                  </a>
                </div>

                <div>
                  <span className="font-bold text-slate-800">
                    {activeOrder.customerName}
                  </span>
                  <span className="text-slate-500 ml-2">({activeOrder.customerPhone})</span>
                </div>

                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeOrder.deliveryAddress}
                </p>

                {activeOrder.instructions && (
                  <p className="text-orange-800 bg-orange-100/70 p-2 rounded-lg font-medium">
                    Customer Note: "{activeOrder.instructions}"
                  </p>
                )}

                {/* Status transitions */}
                {activeOrder.status === 'picked_up' && (
                  <button
                    onClick={() => updateOrderStatus(activeOrder.id, 'out_for_delivery')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md mt-2 cursor-pointer"
                  >
                    Start Driving to Customer (Out for Delivery) →
                  </button>
                )}
              </div>

              {/* Step 3: Complete Handover with OTP */}
              {(activeOrder.status === 'out_for_delivery' ||
                activeOrder.status === 'picked_up') && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-700" />
                    <h5 className="font-bold text-amber-950">
                      Step 3: Complete Delivery via Customer OTP
                    </h5>
                  </div>
                  <p className="text-amber-800">
                    Ask customer for their 4-digit ApnaGo delivery PIN to verify handover.
                    (Customer app displays: <span className="font-mono font-bold">{activeOrder.deliveryOtp}</span>)
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value);
                        setOtpError(false);
                      }}
                      placeholder="Enter 4-digit OTP"
                      className="w-40 px-3 py-2 text-center text-sm font-mono font-black tracking-widest bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                      onClick={() => handleVerifyAndDeliver(activeOrder.id)}
                      className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer transition-all active:scale-98"
                    >
                      Verify OTP & Finish Delivery
                    </button>
                  </div>

                  {otpError && (
                    <p className="text-red-600 font-bold">
                      Incorrect OTP. The code is {activeOrder.deliveryOtp}.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Col: Delivery Trip History & Payouts */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900 mb-3">
              Bank Payout Account
            </h4>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs mb-3 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Primary Account
              </span>
              <p className="font-bold text-slate-800">HDFC Bank · Indiranagar Branch</p>
              <p className="font-mono text-slate-500">A/C: •••••••• 4109 · IFSC: HDFC000104</p>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Next Auto-Payout</span>
              <span className="font-bold text-emerald-700">Tomorrow, 6:00 AM</span>
            </div>
          </div>

          {/* Past completed deliveries */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900 mb-3">
              Completed Today ({completedOrders.length})
            </h4>

            {completedOrders.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No trips completed today yet.</p>
            ) : (
              <div className="space-y-3">
                {completedOrders.slice(0, 4).map((o) => (
                  <div
                    key={o.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{o.storeName}</span>
                      <span className="text-emerald-700 font-black">+₹{65 + o.driverTip}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      To: {o.deliveryAddress}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
