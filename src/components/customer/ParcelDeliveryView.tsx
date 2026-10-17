import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileText,
  Utensils,
  Smartphone,
  Shirt,
  Key,
  Pill,
} from 'lucide-react';
import { courierImg } from '../../data/mockData';

interface ParcelDeliveryViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ParcelDeliveryView: React.FC<ParcelDeliveryViewProps> = ({
  onBack,
  onSuccess,
}) => {
  const { user, placeParcelOrder } = useApp();

  const [senderName, setSenderName] = useState(user?.name || 'Rahul Sharma');
  const [senderPhone, setSenderPhone] = useState(user?.phone || '+91 98450 12345');
  const [pickupAddress, setPickupAddress] = useState(
    'Flat 402, Shanti Nilayam, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru'
  );

  const [receiverName, setReceiverName] = useState('Pooja Nair');
  const [receiverPhone, setReceiverPhone] = useState('+91 98765 88990');
  const [dropAddress, setDropAddress] = useState(
    'House 24, 7th Cross, Koramangala 4th Block, Bengaluru'
  );

  const [packageType, setPackageType] = useState('Documents & Files');
  const [weightKg, setWeightKg] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('Please handle with care, fragile.');

  // Estimated fare calculation: Base ₹40 + ₹12/km (est 4.5km) + weight bonus
  const estDistanceKm = 4.8;
  const baseFare = 40;
  const distanceFare = Math.round(estDistanceKm * 12);
  const weightFare = weightKg > 2 ? (weightKg - 2) * 20 : 0;
  const totalFare = baseFare + distanceFare + weightFare;

  const packageCategories = [
    { id: 'Documents & Files', icon: FileText, desc: 'Passports, papers, letters' },
    { id: 'Food & Tiffin', icon: Utensils, desc: 'Homemade dabba, lunch' },
    { id: 'Electronics', icon: Smartphone, desc: 'Charger, laptop, headphones' },
    { id: 'Keys & Small Items', icon: Key, desc: 'House keys, bike keys' },
    { id: 'Medicines', icon: Pill, desc: 'Prescriptions, first-aid' },
    { id: 'Clothes & Laundry', icon: Shirt, desc: 'Garments, dry clean' },
  ];

  const handleBookNow = async () => {
    await placeParcelOrder(
      {
        senderName,
        senderPhone,
        pickupAddress,
        receiverName,
        receiverPhone,
        dropAddress,
        packageType,
        weightKg,
        specialNotes,
      },
      totalFare
    );
    onSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 mb-1 cursor-pointer"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>ApnaGo City Parcel Send</span>
            <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              Instant 15-min Pickup
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            Book a dedicated electric scooter rider to pick up and deliver anything across town
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Form: Sender and Receiver addresses */}
        <div className="md:col-span-2 space-y-6">
          {/* Pickup Address Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">1. Pickup Address</h3>
                <span className="text-xs text-slate-500">Rider arrives in ~12 mins</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sender Mobile (+91)
                  </label>
                  <input
                    type="text"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complete Pickup Location
                </label>
                <textarea
                  rows={2}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Drop Address Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">2. Drop-off Address</h3>
                <span className="text-xs text-slate-500">Receiver receives live tracking link</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Receiver Mobile (+91)
                  </label>
                  <input
                    type="text"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complete Drop-off Location
                </label>
                <textarea
                  rows={2}
                  value={dropAddress}
                  onChange={(e) => setDropAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-3">3. What are you sending?</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
              {packageCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = packageType === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setPackageType(cat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mb-1.5 ${
                        isSelected ? 'text-orange-600' : 'text-slate-600'
                      }`}
                    />
                    <div className="font-bold text-xs text-slate-900 leading-tight">
                      {cat.id}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {cat.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Weight Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Approximate Weight</span>
                <span className="text-orange-600 font-bold tabular-nums">
                  {weightKg} kg (Max 10 kg)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instructions for Driver
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Call before coming upstairs, handle gently"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Right Fare Summary & Booking Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-20">
            <h3 className="font-bold text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Trip & Fare Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 mb-4">
              <div className="flex justify-between">
                <span>Estimated Distance</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {estDistanceKm} km
                </span>
              </div>
              <div className="flex justify-between">
                <span>Base Fare (incl 2 km)</span>
                <span className="tabular-nums">₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Charge</span>
                <span className="tabular-nums">₹{distanceFare}</span>
              </div>
              {weightFare > 0 && (
                <div className="flex justify-between">
                  <span>Weight Surcharge ({weightKg} kg)</span>
                  <span className="tabular-nums">₹{weightFare}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="tabular-nums">₹5</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="tabular-nums">₹{Math.round(totalFare * 0.05)}</span>
              </div>
              <div className="flex justify-between">
                <span>Rider Tip</span>
                <span className="tabular-nums">₹20</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
                <span>Grand Total</span>
                <span className="text-lg text-orange-600 tabular-nums">
                  ₹{totalFare + 5 + Math.round(totalFare * 0.05) + 20}
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-800 mb-5 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                100% Insured Delivery with Live GPS Scooter Tracking and 4-digit Delivery PIN
                authentication.
              </span>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-600/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Pickup & Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
