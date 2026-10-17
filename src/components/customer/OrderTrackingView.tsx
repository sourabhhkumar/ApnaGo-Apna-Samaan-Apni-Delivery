import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Navigation,
  Key,
  Star,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderTrackingViewProps {
  orderId: string;
  onBack: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orderId,
  onBack,
}) => {
  const { orders, updateOrderStatus, showToast, rateOrder } = useApp();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Rider progress along the road (0% to 100%)
  const [riderProgress, setRiderProgress] = useState(65);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('Superfast delivery and fresh food!');

  useEffect(() => {
    if (!order || order.status === 'delivered') return;

    // Subtle simulation of driver moving
    const timer = setInterval(() => {
      setRiderProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 2;
      });
      setEtaMinutes((prev) => Math.max(2, prev - 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [order?.status]);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <p className="text-slate-600 mb-4">No active order found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Order Placed', desc: 'Received & confirmed' },
    { status: 'preparing', label: 'Kitchen Preparing', desc: 'Chef preparing fresh' },
    { status: 'picked_up', label: 'Order Picked Up', desc: 'Partner packed in hot bag' },
    { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'Heading to your doorstep' },
    { status: 'delivered', label: 'Delivered', desc: 'Handed over with OTP' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
      case 'preparing':
        return 1;
      case 'picked_up':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  // SVG coordinates for path simulation
  // Start (Store): (80, 240), Control (220, 100), End (Customer): (460, 160)
  const t = riderProgress / 100;
  // Quadratic bezier calculation
  const p0 = { x: 70, y: 220 };
  const p1 = { x: 250, y: 80 };
  const p2 = { x: 450, y: 150 };
  const riderX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const riderY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 mb-1 cursor-pointer"
          >
            ← Back to orders
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Live Order Tracking
            </h1>
            <span className="text-xs font-bold font-mono bg-slate-900 text-white px-2 py-0.5 rounded-md">
              {order.id}
            </span>
          </div>
        </div>

        {/* Quick simulator status trigger */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Demo Control:</span>
          {order.status !== 'delivered' ? (
            <button
              onClick={() => {
                const nextStatuses: OrderStatus[] = [
                  'placed',
                  'preparing',
                  'picked_up',
                  'out_for_delivery',
                  'delivered',
                ];
                const next = nextStatuses[Math.min(currentStepIdx + 1, 4)];
                updateOrderStatus(order.id, next);
              }}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              Simulate Next Status →
            </button>
          ) : (
            <button
              onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
              className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset to On The Way
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Map & Status Progress */}
        <div className="lg:col-span-2 space-y-5">
          {/* Interactive City Route Map Container */}
          <div className="relative h-72 sm:h-80 w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm select-none">
            {/* Indian City Layout Vector Map */}
            <svg
              className="w-full h-full bg-[#f4f3f0]"
              viewBox="0 0 520 300"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* City Grid Roads */}
              <defs>
                <pattern id="city-blocks" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect width="56" height="56" fill="#e9e7e1" rx="4" />
                </pattern>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
              </defs>

              {/* Background city blocks */}
              <rect width="100%" height="100%" fill="url(#city-blocks)" />

              {/* Major arterial roads (Indian city grid) */}
              <path d="M 0,110 L 520,110" stroke="#ffffff" strokeWidth="16" />
              <path d="M 0,220 L 520,220" stroke="#ffffff" strokeWidth="20" />
              <path d="M 140,0 L 140,300" stroke="#ffffff" strokeWidth="18" />
              <path d="M 360,0 L 360,300" stroke="#ffffff" strokeWidth="16" />

              {/* Road names in subtle text */}
              <text x="10" y="105" fontSize="8" fill="#94a3b8" fontWeight="600">
                100ft Road, Indiranagar
              </text>
              <text x="10" y="215" fontSize="8" fill="#94a3b8" fontWeight="600">
                HAL Airport Road
              </text>
              <text x="365" y="40" fontSize="8" fill="#94a3b8" fontWeight="600" transform="rotate(90, 365, 40)">
                12th Main Road
              </text>

              {/* Active Delivery Route Curve */}
              <path
                d="M 70,220 Q 250,80 450,150"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 70,220 Q 250,80 450,150"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />

              {/* Store Pin (Start) */}
              <g transform="translate(70, 220)">
                <circle r="16" fill="#f97316" opacity="0.2" className="animate-ping" />
                <circle r="12" fill="#f97316" stroke="#ffffff" strokeWidth="3" />
                <text x="0" y="4" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                  S
                </text>
              </g>

              {/* Customer Pin (Destination) */}
              <g transform="translate(450, 150)">
                <circle r="18" fill="#15803d" opacity="0.2" />
                <circle r="12" fill="#15803d" stroke="#ffffff" strokeWidth="3" />
                <text x="0" y="4" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                  D
                </text>
              </g>

              {/* Electric Scooter Rider moving in real-time */}
              <g transform={`translate(${riderX}, ${riderY})`}>
                <circle r="18" fill="#f97316" opacity="0.25" />
                <circle r="13" fill="#18181b" stroke="#f97316" strokeWidth="2.5" />
                {/* Rider symbol */}
                <text x="0" y="4" fontSize="11" textAnchor="middle">
                  🛵
                </text>
              </g>
            </svg>

            {/* Overlaid ETA Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-md border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Arrival
              </span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-lg font-black text-slate-900 tabular-nums">
                  {order.status === 'delivered' ? 'Delivered' : `${etaMinutes} mins`}
                </span>
              </div>
            </div>

            {/* Live GPS indicator */}
            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Live GPS Active</span>
            </div>
          </div>

          {/* OTP Verification Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-100 uppercase tracking-wider block">
                  Delivery Verification PIN (OTP)
                </span>
                <p className="text-xs text-white/90">
                  Share this 4-digit code with the delivery partner upon arrival
                </p>
              </div>
            </div>

            <div className="bg-white text-slate-900 px-5 py-2.5 rounded-2xl shadow-inner font-mono font-black text-2xl tracking-widest tabular-nums shrink-0">
              {order.deliveryOtp}
            </div>
          </div>

          {/* Stepper Status Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 mb-6">
              Order Progress
            </h3>

            <div className="relative">
              <div className="space-y-6">
                {steps.map((st, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={st.status} className="flex items-start gap-4 relative">
                      {/* Vertical line connecting nodes */}
                      {idx !== steps.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-6 bottom-[-24px] w-0.5 ${
                            idx < currentStepIdx ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        />
                      )}

                      {/* Icon Node */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-sm font-bold ${
                              isCurrent
                                ? 'text-orange-600'
                                : isDone
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {st.label}
                          </h4>
                          {isCurrent && order.status !== 'delivered' && (
                            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Driver Details & Order Info */}
        <div className="space-y-5">
          {/* Delivery Partner Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              Your Delivery Partner
            </span>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src={order.deliveryPartner?.avatar}
                  alt={order.deliveryPartner?.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {order.deliveryPartner?.name || 'Ramesh Kumar'}
                  </h4>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-700">
                    <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                    <span>{order.deliveryPartner?.rating || 4.9}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  {order.deliveryPartner?.vehicle || 'Electric Scooter'}
                </p>
                <p className="text-[11px] font-mono font-semibold text-slate-700 mt-0.5">
                  {order.deliveryPartner?.vehicleNumber || 'KA 03 AC 1947'}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${order.deliveryPartner?.phone || '+919876543210'}`}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>

              <button
                onClick={() => showToast('Connecting to driver in-app chat...')}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>

            {/* If delivered, show rate button */}
            {order.status === 'delivered' && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                {order.review ? (
                  <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-800">
                    <span className="font-bold block">
                      You rated {order.review.rating} / 5 Stars
                    </span>
                    <p className="text-emerald-700 mt-0.5 italic">"{order.review.comment}"</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setRatingModalOpen(true)}
                    className="w-full py-2 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Rate Delivery & Food ★
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Delivery Address & Store Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Picked up from
              </span>
              <p className="font-bold text-slate-900">{order.storeName}</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Delivering to
              </span>
              <p className="text-slate-800 leading-relaxed">{order.deliveryAddress}</p>
              {order.instructions && (
                <p className="text-[11px] text-orange-700 bg-orange-50 p-2 rounded-lg mt-1.5">
                  Note: "{order.instructions}"
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Order Items ({order.items.length})
              </span>
              <div className="space-y-1.5">
                {order.items.map((it) => (
                  <div key={it.productId} className="flex justify-between text-slate-700">
                    <span>
                      {it.quantity}x {it.productName}
                    </span>
                    <span className="font-semibold tabular-nums">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Paid via {order.paymentMethod.toUpperCase()}</span>
                <span className="tabular-nums">₹{order.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {ratingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <h3 className="font-extrabold text-base text-slate-900 text-center mb-1">
              Rate your ApnaGo Delivery
            </h3>
            <p className="text-xs text-slate-500 text-center mb-4">
              How was your delivery by {order.deliveryPartner?.name}?
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= userRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Leave feedback for driver..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs mb-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setRatingModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rateOrder(order.id, userRating, userComment);
                  setRatingModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
