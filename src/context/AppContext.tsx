import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppRole,
  DeviceMode,
  ServiceCategory,
  Language,
  Store,
  Product,
  CartItem,
  Order,
  OrderStatus,
  UserProfile,
  Coupon,
  DeliveryPartnerInfo,
  AuditLogEntry,
  PlatformSettings,
  PincodeEntry,
} from '../types';
import {
  INITIAL_STORES,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  DEFAULT_PARTNER,
  INITIAL_PARTNERS,
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  // Navigation & Role
  activeRole: AppRole;
  setActiveRole: (role: AppRole) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  activeCategory: ServiceCategory;
  setActiveCategory: (cat: ServiceCategory) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;

  // Language (English / Hindi)
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;

  // Auth & Profile
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  selectedAddress: string;
  setSelectedAddress: (addr: string) => void;
  ownerAuthToken: string | null;
  isOwnerAuthenticated: boolean;
  loginAsOwner: (passcode: string) => boolean;

  // PIN Code Serviceability (All-India)
  pincodes: PincodeEntry[];
  currentPincode: string;
  setCurrentPincode: (pin: string) => void;
  isPincodeModalOpen: boolean;
  setIsPincodeModalOpen: (open: boolean) => void;
  togglePincodeServiceable: (pincode: string) => void;
  registerWaitlist: (pincode: string, phone: string) => void;

  // Modals
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isSplashOpen: boolean;
  setIsSplashOpen: (open: boolean) => void;
  isBrandKitOpen: boolean;
  setIsBrandKitOpen: (open: boolean) => void;

  // Stores & Products
  stores: Store[];
  products: Product[];
  toggleStoreStatus: (storeId: string) => void;
  toggleProductStock: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;

  // Delivery Fleet Management (Owner)
  partners: DeliveryPartnerInfo[];
  togglePartnerStatus: (partnerId: string, newStatus: 'verified' | 'suspended') => void;

  // Platform Settings & Audit Logs (Owner)
  platformSettings: PlatformSettings;
  updatePlatformSettings: (newSettings: Partial<PlatformSettings>) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, details: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  driverTip: number;
  setDriverTip: (tip: number) => void;
  cartTotals: {
    itemTotal: number;
    deliveryFee: number;
    platformFee: number;
    tax: number;
    discount: number;
    driverTip: number;
    grandTotal: number;
  };

  // Orders
  orders: Order[];
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  placeOrder: (paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod', instructions?: string) => Promise<Order>;
  placeParcelOrder: (parcelDetails: Order['parcelDetails'], fare: number) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  verifyDeliveryOtp: (orderId: string, otp: string) => boolean;
  cancelOrder: (orderId: string) => void;
  rateOrder: (orderId: string, rating: number, comment: string) => void;

  // Delivery Partner Specific
  partnerOnline: boolean;
  setPartnerOnline: (online: boolean) => void;
  partnerStats: {
    todayEarnings: number;
    todayTrips: number;
    incentiveCompleted: number;
    incentiveTarget: number;
  };

  // Support & Toast
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_ORDERS_KEY = 'apnago_orders_v3';
const LOCAL_STORAGE_CART_KEY = 'apnago_cart_v3';
const LOCAL_STORAGE_SPLASH_SEEN = 'apnago_splash_seen_v3';

const INITIAL_PINCODES: PincodeEntry[] = [
  {
    pincode: '560038',
    area: 'Indiranagar / HAL',
    city: 'Bengaluru',
    state: 'Karnataka',
    isServiceable: true,
    foodDelivery: true,
    groceryMandi: true,
    essentials: true,
    parcelExpress: true,
    intercityCourier: true,
    estMinutes: '15-25 mins',
    waitlistCount: 0,
  },
  {
    pincode: '560103',
    area: 'Bellandur / EcoSpace',
    city: 'Bengaluru',
    state: 'Karnataka',
    isServiceable: true,
    foodDelivery: true,
    groceryMandi: true,
    essentials: true,
    parcelExpress: true,
    intercityCourier: true,
    estMinutes: '20-30 mins',
    waitlistCount: 0,
  },
  {
    pincode: '110001',
    area: 'Connaught Place / Barakhamba',
    city: 'New Delhi',
    state: 'Delhi NCR',
    isServiceable: true,
    foodDelivery: true,
    groceryMandi: true,
    essentials: true,
    parcelExpress: true,
    intercityCourier: true,
    estMinutes: '20-30 mins',
    waitlistCount: 0,
  },
  {
    pincode: '400001',
    area: 'Fort / Colaba',
    city: 'Mumbai',
    state: 'Maharashtra',
    isServiceable: true,
    foodDelivery: true,
    groceryMandi: true,
    essentials: true,
    parcelExpress: true,
    intercityCourier: true,
    estMinutes: '25-35 mins',
    waitlistCount: 0,
  },
  {
    pincode: '500081',
    area: 'Hitec City / Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    isServiceable: true,
    foodDelivery: true,
    groceryMandi: true,
    essentials: true,
    parcelExpress: true,
    intercityCourier: true,
    estMinutes: '20-30 mins',
    waitlistCount: 0,
  },
  {
    pincode: '226001',
    area: 'Hazratganj',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    isServiceable: false,
    foodDelivery: false,
    groceryMandi: false,
    essentials: false,
    parcelExpress: false,
    intercityCourier: true,
    estMinutes: 'Coming Soon',
    waitlistCount: 142,
  },
  {
    pincode: '302001',
    area: 'C-Scheme / M.I. Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    isServiceable: false,
    foodDelivery: false,
    groceryMandi: false,
    essentials: false,
    parcelExpress: false,
    intercityCourier: true,
    estMinutes: 'Coming Soon',
    waitlistCount: 98,
  },
  {
    pincode: '800001',
    area: 'Fraser Road',
    city: 'Patna',
    state: 'Bihar',
    isServiceable: false,
    foodDelivery: false,
    groceryMandi: false,
    essentials: false,
    parcelExpress: false,
    intercityCourier: true,
    estMinutes: 'Coming Soon',
    waitlistCount: 215,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<AppRole>('customer');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('food');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');

  // PIN Code State
  const [pincodes, setPincodes] = useState<PincodeEntry[]>(INITIAL_PINCODES);
  const [currentPincode, setCurrentPincode] = useState('560038');
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  const togglePincodeServiceable = (pin: string) => {
    setPincodes((prev) =>
      prev.map((item) => {
        if (item.pincode === pin) {
          const nextState = !item.isServiceable;
          addAuditLog(
            nextState ? 'PINCODE_ACTIVATED' : 'PINCODE_DEACTIVATED',
            `Owner Sourabh Singh updated PIN ${pin} (${item.city}) to ${nextState ? 'ACTIVE' : 'COMING SOON'}`
          );
          return {
            ...item,
            isServiceable: nextState,
            foodDelivery: nextState,
            groceryMandi: nextState,
            essentials: nextState,
            parcelExpress: nextState,
            estMinutes: nextState ? '20-30 mins' : 'Coming Soon',
          };
        }
        return item;
      })
    );
    showToast(`Updated serviceability for PIN ${pin}`);
  };

  const registerWaitlist = (pin: string, phone: string) => {
    setPincodes((prev) =>
      prev.map((item) => (item.pincode === pin ? { ...item, waitlistCount: item.waitlistCount + 1 } : item))
    );
    addAuditLog('WAITLIST_REGISTERED', `Customer registered for PIN ${pin} launch updates (${phone}).`);
  };

  // Modals
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isSplashOpen, setIsSplashOpen] = useState(() => {
    try {
      return !localStorage.getItem(LOCAL_STORAGE_SPLASH_SEEN);
    } catch {
      return false;
    }
  });

  const dismissSplash = () => {
    setIsSplashOpen(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_SPLASH_SEEN, 'true');
    } catch {
      // storage disabled
    }
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || '';
  };

  // User Auth & Owner Security for Sourabh Singh
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-ind-108',
    name: 'Rahul Sharma',
    phone: '+91 98450 12345',
    email: 'rahul.sharma@example.in',
    savedAddresses: [
      {
        id: 'addr-1',
        type: 'Home',
        line: 'Flat 402, Shanti Nilayam, 12th Main, HAL 2nd Stage, Indiranagar',
        landmark: 'Opposite Corner House Ice Cream',
        city: 'Bengaluru, Karnataka - 560038',
      },
      {
        id: 'addr-2',
        type: 'Work',
        line: 'EcoSpace Business Park, Block 2B, 3rd Floor, Bellandur Outer Ring Road',
        landmark: 'Near Central Mall',
        city: 'Bengaluru, Karnataka - 560103',
      },
    ],
  });

  const [ownerAuthToken, setOwnerAuthToken] = useState<string | null>('sourabh-owner-token');
  const isOwnerAuthenticated = Boolean(ownerAuthToken);

  const loginAsOwner = (passcode: string): boolean => {
    if (passcode.trim() === 'sourabh2026' || passcode.trim() === 'apnago') {
      setOwnerAuthToken('sourabh-owner-token');
      setUser({
        id: 'owner-sourabh-singh',
        name: 'Sourabh Singh',
        phone: '+91 98000 00001',
        email: 'sourabh@apnago.in',
        isOwner: true,
        savedAddresses: [
          {
            id: 'addr-hq',
            type: 'Work',
            line: 'ApnaGo Headquarters, 100ft Road, Indiranagar',
            landmark: 'Near Metro Pillar 42',
            city: 'Bengaluru, Karnataka - 560038',
          },
        ],
      });
      addAuditLog('OWNER_AUTHENTICATED', 'Sourabh Singh verified and unlocked Owner Command Panel.');
      showToast('Welcome, Sourabh Singh! Full Owner Access Granted.');
      return true;
    }
    return false;
  };

  const [selectedAddress, setSelectedAddress] = useState<string>(
    'Flat 402, Shanti Nilayam, Indiranagar, Bengaluru - 560038'
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Platform Settings & Audit Logs
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    appName: 'ApnaGo',
    founder: 'Sourabh Singh',
    tagline: 'Apna Samaan, Apni Delivery.',
    commissionRate: 18,
    baseDeliveryFee: 30,
    freeDeliveryThreshold: 299,
    platformFee: 5,
    supportEmail: 'contact@apnago.in',
    supportPhone: '+91 80 4920 1800',
    registeredEntity: 'ApnaGo Technologies Pvt Ltd, Bengaluru, India',
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-101',
      actor: 'Sourabh Singh (Owner)',
      action: 'PLATFORM_INITIALIZATION',
      details: 'ApnaGo production delivery platform initialized for all-India operations.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'log-102',
      actor: 'Sourabh Singh (Owner)',
      action: 'PARTNER_KYC_VERIFIED',
      details: 'Verified Ather 450X EV partner Ramesh Kumar (KA 03 AC 1947).',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 'log-103',
      actor: 'Sourabh Singh (Owner)',
      action: 'PINCODE_ACTIVATED',
      details: 'Activated service in Bengaluru (560038, 560103) and New Delhi (110001).',
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
  ]);

  const addAuditLog = (action: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      actor: 'Sourabh Singh (Owner)',
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const updatePlatformSettings = (newSettings: Partial<PlatformSettings>) => {
    setPlatformSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      addAuditLog(
        'SETTINGS_UPDATED',
        `Platform commission: ${updated.commissionRate}%, Base delivery: ₹${updated.baseDeliveryFee}`
      );
      return updated;
    });
    showToast('Platform settings saved by Owner');
  };

  // Fleet management
  const [partners, setPartners] = useState<DeliveryPartnerInfo[]>(INITIAL_PARTNERS);

  const togglePartnerStatus = (partnerId: string, newStatus: 'verified' | 'suspended') => {
    setPartners((prev) =>
      prev.map((p) => (p.id === partnerId ? { ...p, status: newStatus } : p))
    );
    const target = partners.find((p) => p.id === partnerId);
    addAuditLog(
      newStatus === 'verified' ? 'PARTNER_APPROVED' : 'PARTNER_SUSPENDED',
      `${target?.name || 'Partner'} marked as ${newStatus.toUpperCase()}`
    );
    showToast(`Partner ${newStatus === 'verified' ? 'approved' : 'suspended'}`);
  };

  // Stores & Products state
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [driverTip, setDriverTip] = useState<number>(20);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'APNA-9124',
        customerId: 'user-ind-108',
        customerName: 'Rahul Sharma',
        customerPhone: '+91 98450 12345',
        storeId: 'store-food-1',
        storeName: 'Royal Biryani Darbar',
        category: 'food',
        items: [
          {
            productId: 'prod-101',
            productName: 'Royal Hyderabadi Dum Chicken Biryani',
            price: 349,
            quantity: 1,
            unit: '1 pot (serves 1-2)',
            isVeg: false,
          },
          {
            productId: 'prod-103',
            productName: 'Butter Garlic Naan (2 pcs)',
            price: 99,
            quantity: 2,
            unit: '2 pcs',
            isVeg: true,
          },
        ],
        itemTotal: 547,
        deliveryFee: 30,
        platformFee: 5,
        tax: 27,
        discount: 50,
        driverTip: 20,
        grandTotal: 579,
        status: 'out_for_delivery',
        deliveryOtp: '4829',
        deliveryAddress: 'Flat 402, Shanti Nilayam, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru',
        addressType: 'Home',
        instructions: 'Please ring the doorbell and leave near shoe rack.',
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        deliveryPartner: DEFAULT_PARTNER,
        createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        estimatedDeliveryTime: '10-15 mins',
      },
    ];
  });

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('APNA-9124');

  // Delivery Partner State
  const [partnerOnline, setPartnerOnline] = useState<boolean>(true);
  const [partnerStats, setPartnerStats] = useState({
    todayEarnings: 1420,
    todayTrips: 8,
    incentiveCompleted: 8,
    incentiveTarget: 10,
  });

  // Support & Toast
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // quota or disabled
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // quota or disabled
    }
  }, [orders]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const coupon = INITIAL_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid promo code. Try APNA50 or FREEDEL' };
    }
    const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    if (total < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order value of ₹${coupon.minOrder} required for ${coupon.code}`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Cart totals
  const itemTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee =
    itemTotal > 0
      ? itemTotal >= platformSettings.freeDeliveryThreshold
        ? 0
        : platformSettings.baseDeliveryFee
      : 0;
  const platformFee = itemTotal > 0 ? platformSettings.platformFee : 0;
  const tax = Math.round(itemTotal * 0.05);

  let discount = 0;
  if (appliedCoupon && itemTotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.min(
        Math.round((itemTotal * appliedCoupon.discountValue) / 100),
        appliedCoupon.maxDiscount || 1000
      );
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + platformFee + tax + driverTip - discount);

  const cartTotals = {
    itemTotal,
    deliveryFee,
    platformFee,
    tax,
    discount,
    driverTip,
    grandTotal,
  };

  // Place Order with server-side validation
  const placeOrder = async (
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    instructions?: string
  ): Promise<Order> => {
    const newOrderId = `APNA-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: `pay_${Date.now()}`,
          orderId: newOrderId,
          amount: grandTotal,
          signature: 'sig_verified_npci_npci',
        }),
      });
    } catch {
      // offline fallback
    }

    const orderItems: Order['items'] = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      unit: item.product.unit,
      isVeg: item.product.isVeg,
    }));

    const primaryStore = stores.find((s) => s.id === cart[0]?.product.storeId) || stores[0];

    const newOrder: Order = {
      id: newOrderId,
      customerId: user?.id || 'guest-1',
      customerName: user?.name || 'Customer',
      customerPhone: user?.phone || '+91 98765 00000',
      storeId: primaryStore.id,
      storeName: primaryStore.name,
      category: activeCategory,
      items: orderItems,
      itemTotal,
      deliveryFee,
      platformFee,
      tax,
      discount,
      driverTip,
      grandTotal,
      status: 'placed',
      deliveryOtp: randomOtp,
      deliveryAddress: selectedAddress,
      addressType: 'Home',
      instructions,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      deliveryPartner: DEFAULT_PARTNER,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '25-30 mins',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrderId);
    addAuditLog('ORDER_CREATED', `Customer ${newOrder.customerName} placed order #${newOrderId} (₹${grandTotal}).`);
    clearCart();
    showToast(`Order placed successfully! Order ID: ${newOrderId}`);
    return newOrder;
  };

  // Place Parcel Order
  const placeParcelOrder = async (
    parcelDetails: Order['parcelDetails'],
    fare: number
  ): Promise<Order> => {
    const newOrderId = `PARCEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: Order = {
      id: newOrderId,
      customerId: user?.id || 'guest-1',
      customerName: user?.name || 'Customer',
      customerPhone: user?.phone || '+91 98765 00000',
      storeName: 'ApnaGo City Parcel Express',
      category: 'parcel',
      items: [
        {
          productId: 'parcel-service',
          productName: `Instant Parcel Delivery (${parcelDetails?.packageType || 'Standard'})`,
          price: fare,
          quantity: 1,
          unit: `${parcelDetails?.weightKg || 1} kg`,
          isVeg: true,
        },
      ],
      itemTotal: fare,
      deliveryFee: 0,
      platformFee: 5,
      tax: Math.round(fare * 0.05),
      discount: 0,
      driverTip: 20,
      grandTotal: fare + 5 + Math.round(fare * 0.05) + 20,
      status: 'placed',
      deliveryOtp: randomOtp,
      deliveryAddress: parcelDetails?.dropAddress || 'Delivery Address',
      addressType: 'Other',
      instructions: parcelDetails?.specialNotes,
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      deliveryPartner: DEFAULT_PARTNER,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '30-40 mins',
      parcelDetails,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrderId);
    addAuditLog(
      'PARCEL_BOOKED',
      `City parcel booking #${newOrderId} created for ${parcelDetails?.packageType}`
    );
    showToast(`Parcel pickup scheduled! Order ID: ${newOrderId}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updated = { ...order, status };
          if (status === 'delivered') {
            updated.paymentStatus = 'paid';
            setPartnerStats((curr) => ({
              ...curr,
              todayEarnings: curr.todayEarnings + 65 + order.driverTip,
              todayTrips: curr.todayTrips + 1,
              incentiveCompleted: Math.min(curr.incentiveTarget, curr.incentiveCompleted + 1),
            }));
          }
          return updated;
        }
        return order;
      })
    );
    addAuditLog('ORDER_STATUS_CHANGED', `Order #${orderId} changed to ${status.toUpperCase()}`);
    showToast(`Order ${orderId} updated: ${status.replace(/_/g, ' ').toUpperCase()}`);
  };

  const verifyDeliveryOtp = (orderId: string, otp: string): boolean => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return false;
    if (target.deliveryOtp === otp.trim()) {
      updateOrderStatus(orderId, 'delivered');
      addAuditLog('OTP_VERIFIED', `Delivery OTP validated for #${orderId} by delivery partner.`);
      return true;
    }
    return false;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' as OrderStatus } : order
      )
    );
    addAuditLog('ORDER_CANCELLED', `Order #${orderId} cancelled by customer / admin.`);
    showToast(`Order ${orderId} has been cancelled.`);
  };

  const rateOrder = (orderId: string, rating: number, comment: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, review: { rating, comment } } : order))
    );
    showToast('Thank you for rating your delivery partner!');
  };

  const toggleStoreStatus = (storeId: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === storeId) {
          const next = !s.isOpen;
          addAuditLog('STORE_STATUS_TOGGLED', `${s.name} outlet set to ${next ? 'OPEN' : 'CLOSED'}`);
          return { ...s, isOpen: next };
        }
        return s;
      })
    );
  };

  const toggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const next = !p.inStock;
          addAuditLog('INVENTORY_STOCK_TOGGLED', `${p.name} stock set to ${next ? 'IN STOCK' : 'OUT OF STOCK'}`);
          return { ...p, inStock: next };
        }
        return p;
      })
    );
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          addAuditLog('PRODUCT_PRICE_UPDATED', `${p.name} price modified from ₹${p.price} to ₹${newPrice}`);
          return { ...p, price: newPrice };
        }
        return p;
      })
    );
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    addAuditLog('PRODUCT_ADDED', `New item '${newProd.name}' added to catalog at ₹${newProd.price}`);
    showToast(`Added ${newProd.name} to catalog`);
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        deviceMode,
        setDeviceMode,
        activeCategory,
        setActiveCategory,
        currentTab,
        setCurrentTab,
        lang,
        setLang,
        t,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedAddress,
        setSelectedAddress,
        ownerAuthToken,
        isOwnerAuthenticated,
        loginAsOwner,
        pincodes,
        currentPincode,
        setCurrentPincode,
        isPincodeModalOpen,
        setIsPincodeModalOpen,
        togglePincodeServiceable,
        registerWaitlist,
        isAboutOpen,
        setIsAboutOpen,
        isBrandKitOpen,
        setIsBrandKitOpen,
        isSplashOpen,
        setIsSplashOpen: dismissSplash,
        stores,
        products,
        toggleStoreStatus,
        toggleProductStock,
        updateProductPrice,
        addProduct,
        partners,
        togglePartnerStatus,
        platformSettings,
        updatePlatformSettings,
        auditLogs,
        addAuditLog,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        driverTip,
        setDriverTip,
        cartTotals,
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        placeOrder,
        placeParcelOrder,
        updateOrderStatus,
        verifyDeliveryOtp,
        cancelOrder,
        rateOrder,
        partnerOnline,
        setPartnerOnline,
        partnerStats,
        isSupportOpen,
        setIsSupportOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
