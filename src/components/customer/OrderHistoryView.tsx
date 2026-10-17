import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Clock,
  ArrowRight,
  RotateCcw,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Headphones,
} from 'lucide-react';
import { Order } from '../../types';

interface OrderHistoryViewProps {
  onTrackOrder: (orderId: string) => void;
  onOpenSupport: () => void;
  onOpenCart: () => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  onTrackOrder,
  onOpenSupport,
  onOpenCart,
}) => {
  const { orders, addToCart, products, showToast } = useApp();

  const handleReorder = (order: Order) => {
    let addedCount = 0;
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      showToast(`Added ${addedCount} items to cart!`);
      onOpenCart();
    } else {
      showToast('Items reordered into cart.');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full animate-pulse">
            <Clock className="w-3 h-3 text-orange-500" />
            <span>In Transit</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Your Orders & History</h1>
          <p className="text-xs text-slate-500">
            Track current deliveries or repeat your favorite meals and groceries
          </p>
        </div>

        <button
          onClick={onOpenSupport}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Headphones className="w-3.5 h-3.5 text-emerald-600" />
          <span>Need Help?</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 mb-1">No Orders Yet</h3>
          <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto">
            Once you order food, mandi groceries, or send parcels, your live tracking and
            invoices will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isLive = order.status !== 'delivered' && order.status !== 'cancelled';

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl border p-5 transition-all shadow-xs ${
                  isLive
                    ? 'border-orange-300 ring-2 ring-orange-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-extrabold text-sm text-slate-900">
                        {order.storeName}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        #{order.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {new Date(order.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' · '}
                      <span>{order.addressType} Delivery</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">{getStatusBadge(order.status)}</div>
                </div>

                {/* Items preview */}
                <div className="py-3">
                  <div className="text-xs text-slate-700 space-y-1">
                    {order.items.map((it) => (
                      <div key={it.productId} className="flex justify-between">
                        <span>
                          {it.quantity}x {it.productName}
                        </span>
                        <span className="font-semibold tabular-nums text-slate-800">
                          ₹{it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-baseline text-xs">
                    <span className="text-slate-500">
                      Paid via {order.paymentMethod.toUpperCase()} (incl. taxes & delivery)
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 tabular-nums">
                      Total: ₹{order.grandTotal}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        showToast(`Tax invoice for ${order.id} downloaded (GST compliant)`)
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                      onClick={onOpenSupport}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Support</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <button
                        onClick={() => onTrackOrder(order.id)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black shadow-md shadow-orange-600/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <span>Track Live Delivery</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
