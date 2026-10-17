import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  ShoppingBag,
  Sparkles,
  Package,
  Search,
  Clock,
  Star,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ServiceCategory, Store, Product } from '../../types';
import { heroFoodImg, heroGroceryImg, heroEssentialsImg, courierImg } from '../../data/mockData';

interface CustomerHomeProps {
  onSelectStore: (store: Store) => void;
  onOpenParcel: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onSelectStore,
  onOpenParcel,
}) => {
  const {
    activeCategory,
    setActiveCategory,
    stores,
    products,
    cart,
    addToCart,
    updateQuantity,
    t,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);

  // Filtered stores
  const filteredStores = stores.filter((store) => {
    if (store.category !== activeCategory && activeCategory !== 'parcel') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = store.name.toLowerCase().includes(q);
      const matchesTags = store.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesName && !matchesTags) return false;
    }
    if (fastOnly && !store.deliveryTime.includes('15') && !store.deliveryTime.includes('20')) {
      return false;
    }
    return true;
  });

  // Filtered products for current active category
  const categoryProducts = products.filter((prod) => {
    if (prod.category !== activeCategory) return false;
    if (vegOnly && !prod.isVeg) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.subcategory.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getHeroDetails = () => {
    switch (activeCategory) {
      case 'food':
        return {
          title: 'Hungry? Enjoy piping hot meals in 20-30 mins',
          subtitle: 'From authentic Hyderabadi biryani to crispy dosas & Punjabi thalis',
          img: heroFoodImg,
          badge: 'Top Rated Kitchens',
        };
      case 'grocery':
        return {
          title: 'Fresh Mandi & Daily Groceries delivered in 15 mins',
          subtitle: 'Farm-fresh veggies, pure milk, chakki atta, pulses and spices',
          img: heroGroceryImg,
          badge: 'Daily Farm Fresh',
        };
      case 'essentials':
        return {
          title: 'Pharmacy, Wellness & Daily Home Needs',
          subtitle: 'Fast doorstep delivery of OTC medicines, Ayurvedic remedies & cleaning',
          img: heroEssentialsImg,
          badge: 'Instant Pharmacy Care',
        };
      case 'parcel':
        return {
          title: 'ApnaGo Send — Anything delivered across the city',
          subtitle: 'Documents, tiffin boxes, chargers, medicines, keys or gifts picked up in 15 mins',
          img: courierImg,
          badge: 'Superfast Courier',
        };
    }
  };

  const hero = getHeroDetails();

  return (
    <div className="pb-24">
      {/* Category Quick Selector Cards */}
      <section className="bg-white border-b border-slate-200 py-4 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Food */}
            <button
              onClick={() => setActiveCategory('food')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                activeCategory === 'food'
                  ? 'bg-orange-50/80 border-orange-500 shadow-sm ring-1 ring-orange-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 truncate">{t('foodDelivery')}</span>
                <span className="text-[11px] text-slate-500">20-30 mins</span>
              </div>
            </button>

            {/* Grocery */}
            <button
              onClick={() => setActiveCategory('grocery')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                activeCategory === 'grocery'
                  ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 truncate">{t('groceryMandi')}</span>
                <span className="text-[11px] text-slate-500">12-15 mins</span>
              </div>
            </button>

            {/* Daily Essentials */}
            <button
              onClick={() => setActiveCategory('essentials')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                activeCategory === 'essentials'
                  ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 truncate">{t('dailyEssentials')}</span>
                <span className="text-[11px] text-slate-500">Pharmacy & Care</span>
              </div>
            </button>

            {/* Parcel Delivery */}
            <button
              onClick={() => {
                setActiveCategory('parcel');
                onOpenParcel();
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                activeCategory === 'parcel'
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 truncate">{t('sendParcel')}</span>
                <span className="text-[11px] text-slate-500">Pickup in 15m</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Hero Showcase Banner */}
      <section className="px-4 py-6 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-[220px] sm:min-h-[280px] flex flex-col justify-end p-6 sm:p-10 shadow-lg">
          <img
            src={hero.img}
            alt={hero.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity scale-105 transition-transform duration-700 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-orange-400 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-full mb-3 backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>{hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              {hero.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mb-4 line-clamp-2">
              {hero.subtitle}
            </p>

            {activeCategory === 'parcel' ? (
              <button
                onClick={onOpenParcel}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-sm transition-transform active:scale-95 shadow-md shadow-orange-600/30 cursor-pointer"
              >
                Schedule City Pickup Now
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Average 24 mins
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Live GPS & OTP Verification
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Parcel banner action if on other tabs */}
      {activeCategory === 'parcel' ? (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Send Anything Across Your City
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Forgot keys, urgent office documents, homemade food tiffin, or a gift?
              Our ApnaGo verified rider picks it up and delivers it safely.
            </p>
            <button
              onClick={onOpenParcel}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Open Parcel Booking Form
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* Search, Veg Filter, and Quick Controls */}
          <section className="max-w-7xl mx-auto px-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${activeCategory === 'food' ? 'dishes & restaurants' : activeCategory === 'grocery' ? 'vegetables, milk & staples' : 'medicines & wellness'}...`}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder:text-slate-400 transition-all shadow-xs"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    vegOnly
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center rounded-xs p-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                  </span>
                  <span>{t('pureVeg')}</span>
                </button>

                <button
                  onClick={() => setFastOnly(!fastOnly)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    fastOnly
                      ? 'bg-orange-50 text-orange-700 border-orange-400 ring-1 ring-orange-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t('under20Mins')}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Stores & Outlets Section */}
          <section className="max-w-7xl mx-auto px-4 mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {activeCategory === 'food'
                    ? 'Top Restaurants & Kitchens'
                    : activeCategory === 'grocery'
                    ? 'Verified Mandis & Supermarts'
                    : 'Pharmacies & Essential Stores'}
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredStores.length} stores nearby with express dispatch
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {store.deliveryTime}
                      </span>
                      <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        ₹{store.deliveryFee} delivery
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                          {store.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-1.5 py-0.5 rounded shrink-0">
                          <Star className="w-3 h-3 fill-white" />
                          <span>{store.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                        {store.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="truncate max-w-[200px]">{store.tags.join(' · ')}</span>
                      <span className="text-orange-600 font-bold shrink-0">View Menu →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Items Showcase Grid */}
          <section className="max-w-7xl mx-auto px-4 mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {activeCategory === 'food'
                    ? 'Trending Delicacies'
                    : activeCategory === 'grocery'
                    ? 'Daily Mandi Essentials'
                    : 'Fastest Selling Essentials'}
                </h2>
                <p className="text-xs text-slate-500">
                  Directly add popular items to your cart
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryProducts.map((prod) => {
                const inCartItem = cart.find((i) => i.product.id === prod.id);
                const qty = inCartItem ? inCartItem.quantity : 0;

                return (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-3 flex flex-col justify-between hover:border-slate-300 transition-all"
                  >
                    <div>
                      {/* Product Image and Veg/Non-Veg Badge */}
                      <div className="relative h-36 w-full rounded-xl bg-slate-100 overflow-hidden mb-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {/* Indian Food Safety Veg/Non-veg symbol */}
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
                          {prod.isVeg ? (
                            <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center p-0.5">
                              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 border border-red-600 flex items-center justify-center p-0.5">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-0.5">
                          <span>{prod.subcategory}</span>
                          <span>{prod.unit}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {prod.description}
                        </p>
                      </div>
                    </div>

                    {/* Price and Cart Controller */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-base text-slate-900 tabular-nums">
                            ₹{prod.price}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-xs text-slate-400 line-through tabular-nums">
                              ₹{prod.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          In Stock
                        </span>
                      </div>

                      {/* Add Button or Stepper */}
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(prod)}
                          className="px-4 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-extrabold text-xs rounded-xl border border-orange-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t('add')}</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-orange-600 text-white rounded-xl px-2 py-1 shadow-xs">
                          <button
                            onClick={() => updateQuantity(prod.id, -1)}
                            className="p-1 hover:bg-orange-700 rounded-md transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold tabular-nums px-1">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(prod.id, 1)}
                            className="p-1 hover:bg-orange-700 rounded-md transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
