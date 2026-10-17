import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Package,
  Store as StoreIcon,
  Bike,
  Tag,
  DollarSign,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  ShieldCheck,
  Settings,
  Sliders,
  History,
  Crown,
  Lock,
  UserCheck,
  Ban,
  UserPlus,
} from 'lucide-react';
import { OrderStatus, ServiceCategory } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const {
    stores,
    products,
    orders,
    partners,
    togglePartnerStatus,
    platformSettings,
    updatePlatformSettings,
    auditLogs,
    addAuditLog,
    updateOrderStatus,
    toggleStoreStatus,
    toggleProductStock,
    updateProductPrice,
    addProduct,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'orders' | 'stores' | 'products' | 'fleet' | 'settings' | 'audit' | 'finance'
  >('overview');

  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Editable settings by Sourabh Singh
  const [commissionRate, setCommissionRate] = useState(platformSettings.commissionRate);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(platformSettings.baseDeliveryFee);
  const [freeThreshold, setFreeThreshold] = useState(platformSettings.freeDeliveryThreshold);

  // Add Product Modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ServiceCategory>('food');
  const [newProdSubcategory, setNewProdSubcategory] = useState('Chef Special');
  const [newProdPrice, setNewProdPrice] = useState(199);
  const [newProdUnit, setNewProdUnit] = useState('1 plate');
  const [newProdIsVeg, setNewProdIsVeg] = useState(true);
  const [newProdDesc, setNewProdDesc] = useState('Prepared freshly using authentic Indian spices.');

  // Financial metrics
  const totalGMV = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalCommission = Math.round((totalGMV * platformSettings.commissionRate) / 100);
  const totalGST = orders.reduce((sum, o) => sum + o.tax, 0);
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const inTransitCount = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformSettings({
      commissionRate,
      baseDeliveryFee,
      freeDeliveryThreshold: freeThreshold,
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      storeId: stores[0].id,
      name: newProdName,
      category: newProdCategory,
      subcategory: newProdSubcategory,
      price: Number(newProdPrice),
      unit: newProdUnit,
      description: newProdDesc,
      image: stores[0].image,
      isVeg: newProdIsVeg,
      rating: 4.8,
      inStock: true,
      featured: true,
    });

    setIsAddProductOpen(false);
    setNewProdName('');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28">
      {/* Top Owner Header */}
      <div className="bg-slate-950 rounded-3xl p-6 text-white mb-6 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight">
              ApnaGo Owner Command Center
            </h1>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>Owner Access</span>
            </span>
          </div>

          {/* Official Branding Credit */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-bold text-white">Founded & Owned by Sourabh Singh</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Developed by Sourabh Singh</span>
            <span>·</span>
            <span className="text-slate-400">Bangalore HQ Cluster</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              addAuditLog('LEDGER_EXPORTED', 'Sourabh Singh downloaded GST sales and tax ledger.');
              showToast('Exported complete GST compliance & sales ledger (CSV format)');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer border border-slate-700"
          >
            <Download className="w-4 h-4" />
            <span>Export GST Ledger</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center text-slate-500 mb-1">
            <span className="text-xs font-bold">Gross Merchandise Value (GMV)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            ₹{totalGMV}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            ₹{totalCommission} Platform Net Take ({platformSettings.commissionRate}%)
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center text-slate-500 mb-1">
            <span className="text-xs font-bold">Platform Orders</span>
            <Package className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {orders.length}
          </div>
          <span className="text-[11px] text-orange-700 font-bold block mt-1">
            {inTransitCount} In Transit · {deliveredCount} Completed
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center text-slate-500 mb-1">
            <span className="text-xs font-bold">Fleet Partners</span>
            <Bike className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {partners.length} Registered
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            {partners.filter((p) => p.status === 'verified').length} KYC Approved
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center text-slate-500 mb-1">
            <span className="text-xs font-bold">Merchant Stores</span>
            <StoreIcon className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stores.length} Outlets
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            {stores.filter((s) => s.isOpen).length} Live & Open
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'overview', label: 'Executive Overview', icon: TrendingUp },
          { id: 'orders', label: 'Live Orders Queue', icon: Package },
          { id: 'stores', label: 'Stores & Outlets', icon: StoreIcon },
          { id: 'products', label: 'Catalog & Inventory', icon: Tag },
          { id: 'fleet', label: 'Fleet & KYC Approvals', icon: Bike },
          { id: 'settings', label: 'Platform Economics', icon: Sliders },
          { id: 'audit', label: 'Owner Audit Logs', icon: History },
          { id: 'finance', label: 'Tax & GST Records', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Executive Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-200 rounded-3xl p-6">
            <h3 className="font-black text-lg text-slate-900 mb-2">
              Namaste Sourabh Kumar, here is your platform pulse today
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              ApnaGo is operating across Food, Grocery Mandi, Essentials, and Parcel logistics.
              All orders are processed with Indian UPI / Razorpay server-side verification and
              assigned to verified electric scooter riders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Orders quick preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-slate-900">Recent Live Orders</h4>
                <button
                  onClick={() => setActiveAdminTab('orders')}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-2">
                {orders.slice(0, 3).map((o) => (
                  <div
                    key={o.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-slate-900">#{o.id}</span>
                      <p className="text-slate-500 text-[11px]">{o.storeName} · {o.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 tabular-nums">₹{o.grandTotal}</span>
                      <span className="block text-[10px] font-bold text-orange-600 uppercase">
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fleet Approval Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-slate-900">Delivery Fleet Status</h4>
                <button
                  onClick={() => setActiveAdminTab('fleet')}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Manage Fleet →
                </button>
              </div>
              <div className="space-y-2">
                {partners.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                      <p className="text-slate-500 text-[11px]">{p.vehicle} · {p.kycDocType}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Queue */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Status Filter:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
              >
                <option value="all">All Orders ({orders.length})</option>
                <option value="placed">Placed</option>
                <option value="preparing">Preparing</option>
                <option value="picked_up">Picked Up</option>
                <option value="out_for_delivery">Out For Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <span className="text-xs text-slate-500">
              Showing {filteredOrders.length} orders
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer & Address</th>
                    <th className="p-3.5">Store / Category</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Owner Override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {order.id}
                        <span className="block text-[10px] text-slate-400 font-sans">
                          OTP: {order.deliveryOtp}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-800 block">
                          {order.customerName}
                        </span>
                        <span className="text-slate-500 text-[11px] line-clamp-1 max-w-[200px]">
                          {order.deliveryAddress}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-900 block">
                          {order.storeName}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-orange-600">
                          {order.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-700">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </span>
                        <span className="text-[10px] text-slate-400 block line-clamp-1 max-w-[150px]">
                          {order.items.map((i) => i.productName).join(', ')}
                        </span>
                      </td>
                      <td className="p-3.5 font-black text-slate-900 tabular-nums">
                        ₹{order.grandTotal}
                        <span className="block text-[10px] font-normal text-slate-400 uppercase">
                          {order.paymentMethod} · {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold capitalize ${
                            order.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-orange-50 text-orange-800 border border-orange-200 animate-pulse'
                          }`}
                        >
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-none cursor-pointer"
                        >
                          <option value="placed">Placed</option>
                          <option value="preparing">Preparing</option>
                          <option value="picked_up">Picked Up</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Stores & Outlets */}
      {activeAdminTab === 'stores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {store.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span>★ {store.rating}</span>
                    <span className="text-slate-400">({store.ratingCount})</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 mb-1">{store.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{store.tagline}</p>
                <p className="text-[11px] text-slate-400 mb-3">{store.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Delivery fee</span>
                  <span className="text-xs font-bold text-slate-800">₹{store.deliveryFee}</span>
                </div>

                <button
                  onClick={() => toggleStoreStatus(store.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    store.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-red-50 text-red-800 border border-red-300'
                  }`}
                >
                  {store.isOpen ? '● Outlet Open' : '○ Outlet Closed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Catalog & Inventory */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products in catalog..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product to Catalog</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Price (₹)</th>
                    <th className="p-3.5">Unit</th>
                    <th className="p-3.5">Inventory Stock</th>
                    <th className="p-3.5 text-right">Quick Price Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{p.name}</span>
                        <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                          {p.description}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-700 capitalize">
                        {p.category} ({p.subcategory})
                      </td>
                      <td className="p-3.5">
                        {p.isVeg ? (
                          <span className="text-emerald-700 font-bold">Pure Veg</span>
                        ) : (
                          <span className="text-red-700 font-bold">Non-Veg</span>
                        )}
                      </td>
                      <td className="p-3.5 font-black text-slate-900 tabular-nums">
                        ₹{p.price}
                      </td>
                      <td className="p-3.5 text-slate-500">{p.unit}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleProductStock(p.id)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                            p.inStock
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => updateProductPrice(p.id, Math.max(10, p.price - 10))}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-bold cursor-pointer"
                          >
                            -10
                          </button>
                          <button
                            onClick={() => updateProductPrice(p.id, p.price + 10)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-bold cursor-pointer"
                          >
                            +10
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Fleet & KYC Approvals */}
      {activeAdminTab === 'fleet' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Delivery Partner Approvals & KYC Documents
              </h3>
              <p className="text-xs text-slate-500">
                Founder approval required for all delivery partners before taking orders
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((driver) => (
              <div
                key={driver.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{driver.name}</h4>
                    <p className="text-slate-500">{driver.phone}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      driver.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {driver.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-mono text-slate-700 font-semibold">{driver.vehicle} ({driver.vehicleNumber})</p>
                  <p className="text-[11px] text-slate-500">KYC: {driver.kycDocType}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span className="text-slate-500">★ {driver.rating} rating</span>

                  {driver.status === 'verified' ? (
                    <button
                      onClick={() => togglePartnerStatus(driver.id, 'suspended')}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                    >
                      <Ban className="w-3 h-3" />
                      <span>Suspend</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => togglePartnerStatus(driver.id, 'verified')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Approve KYC</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Platform Economics & Settings */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-2xl space-y-5">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Platform Economics & Charges (Owner Controlled)
            </h3>
            <p className="text-xs text-slate-500">
              Changes take effect immediately across all customer checkout sessions.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>ApnaGo Merchant Commission Rate (%)</span>
                <span className="text-orange-600 tabular-nums">{commissionRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Industry standard in India is 18-22%</span>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Base Delivery Fee (Orders under ₹{freeThreshold})
              </label>
              <input
                type="number"
                value={baseDeliveryFee}
                onChange={(e) => setBaseDeliveryFee(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Save Platform Economics
            </button>
          </form>
        </div>
      )}

      {/* Tab 7: Owner Audit Logs */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Executive Audit Logs & System Activity
              </h3>
              <p className="text-xs text-slate-500">
                Immutable record of administrative operations performed by Founder Sourabh Singh
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 bg-white hover:bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="font-bold text-slate-800">{log.actor}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{log.details}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Finance & GST Records */}
      {activeAdminTab === 'finance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-extrabold text-base text-slate-900">
            Indian Statutory Tax & Revenue Records (GST Compliance)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">
                CGST (2.5% Central GST)
              </span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                ₹{Math.round(totalGST / 2)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">
                SGST (2.5% State GST Karnataka)
              </span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                ₹{Math.round(totalGST / 2)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">
                Total Tax Collected & Remitted
              </span>
              <span className="text-xl font-extrabold text-emerald-700 tabular-nums">
                ₹{totalGST}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>GSTIN: 29AABCA9124K1Z0 · Registered Entity: ApnaGo Technologies Pvt Ltd</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Founded & Owned by Sourabh Singh. All merchant transactions, delivery partner tips,
              and food delivery GST comply with Section 9(5) of the Indian CGST Act 2017.
            </p>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-slate-900 mb-4">
              Add New Product to ApnaGo Catalog
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Malai Kofta Curry"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="food">Food Delivery</option>
                    <option value="grocery">Grocery Mandi</option>
                    <option value="essentials">Daily Essentials</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit / Portion</label>
                  <input
                    type="text"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    placeholder="e.g. 500g / 1 plate"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Food Type</label>
                  <select
                    value={newProdIsVeg ? 'veg' : 'nonveg'}
                    onChange={(e) => setNewProdIsVeg(e.target.value === 'veg')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="veg">Pure Veg</option>
                    <option value="nonveg">Non-Veg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-600 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
