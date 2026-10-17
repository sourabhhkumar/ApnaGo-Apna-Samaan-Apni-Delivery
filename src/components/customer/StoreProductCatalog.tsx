import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Search,
  Plus,
  Minus,
  ShoppingBag,
} from 'lucide-react';
import { Store, Product } from '../../types';

interface StoreProductCatalogProps {
  store: Store;
  onBack: () => void;
  onOpenCart: () => void;
}

export const StoreProductCatalog: React.FC<StoreProductCatalogProps> = ({
  store,
  onBack,
  onOpenCart,
}) => {
  const { products, cart, addToCart, updateQuantity } = useApp();
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [search, setSearch] = useState('');

  const storeProducts = products.filter((p) => {
    if (p.storeId !== store.id) return false;
    if (vegFilter === 'veg' && !p.isVeg) return false;
    if (vegFilter === 'nonveg' && p.isVeg) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const subcategories = Array.from(new Set(storeProducts.map((p) => p.subcategory)));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pb-28">
      {/* Top Banner and Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all stores</span>
          </button>

          {/* Store Info Card */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img
                src={store.image}
                alt={store.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {store.name}
                </h1>
                <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{store.rating}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-2">{store.tagline}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  {store.deliveryTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {store.address}
                </span>
                <span>·</span>
                <span className="text-emerald-700 font-bold">₹{store.deliveryFee} delivery fee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Filters */}
      <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search inside menu */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in this menu..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Veg / Non-veg Segmented Control */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 shrink-0">
            <button
              onClick={() => setVegFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                vegFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setVegFilter('veg')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                vegFilter === 'veg'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center p-0.5">
                <span className="w-1 h-1 bg-emerald-600 rounded-full" />
              </span>
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setVegFilter('nonveg')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                vegFilter === 'nonveg'
                  ? 'bg-white text-red-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 border border-red-600 flex items-center justify-center p-0.5">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
              </span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu items grouped by Subcategory */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {subcategories.map((subcat) => {
          const itemsInSubcat = storeProducts.filter((p) => p.subcategory === subcat);
          if (itemsInSubcat.length === 0) return null;

          return (
            <div key={subcat} className="mb-8">
              <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span>{subcat}</span>
                <span className="text-xs font-normal text-slate-500">
                  ({itemsInSubcat.length})
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itemsInSubcat.map((prod) => {
                  const inCartItem = cart.find((i) => i.product.id === prod.id);
                  const qty = inCartItem ? inCartItem.quantity : 0;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 justify-between items-start hover:border-slate-300 transition-all shadow-xs"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        {/* Veg / Non-veg symbol */}
                        <div className="mb-1">
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

                        <h4 className="font-bold text-sm text-slate-900 leading-snug">
                          {prod.name}
                        </h4>

                        <div className="flex items-baseline gap-2 mt-1 mb-1.5">
                          <span className="font-extrabold text-sm text-slate-900 tabular-nums">
                            ₹{prod.price}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-xs text-slate-400 line-through tabular-nums">
                              ₹{prod.originalPrice}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-500">· {prod.unit}</span>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      {/* Right: Product Thumbnail and Add Button */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 flex flex-col justify-end">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10 p-1 flex justify-center">
                          {qty === 0 ? (
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-3 py-1 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs rounded-lg shadow-sm border border-slate-200 transition-transform active:scale-95 cursor-pointer"
                            >
                              ADD +
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-orange-600 text-white rounded-lg px-2 py-0.5 shadow-sm text-xs font-black">
                              <button
                                onClick={() => updateQuantity(prod.id, -1)}
                                className="cursor-pointer hover:opacity-80"
                              >
                                -
                              </button>
                              <span className="tabular-nums px-1">{qty}</span>
                              <button
                                onClick={() => updateQuantity(prod.id, 1)}
                                className="cursor-pointer hover:opacity-80"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto">
          <button
            onClick={onOpenCart}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white p-3.5 rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-between transition-all active:scale-98 cursor-pointer border border-orange-400"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <ShoppingBag className="w-5 h-5" />
              <span>{totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in Cart</span>
            </div>
            <span className="font-extrabold text-sm flex items-center gap-1">
              View Cart & Checkout →
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
