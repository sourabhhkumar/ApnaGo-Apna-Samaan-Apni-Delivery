export type AppRole = 'customer' | 'partner' | 'admin';
export type DeviceMode = 'desktop' | 'mobile' | 'tablet';
export type ServiceCategory = 'food' | 'grocery' | 'essentials' | 'parcel';
export type Language = 'en' | 'hi';

export interface Store {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string; // e.g. "25-30 mins"
  deliveryFee: number;
  minOrder: number;
  address: string;
  image: string;
  isOpen: boolean;
  featured?: boolean;
  tags: string[];
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  category: ServiceCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  unit: string; // "1 plate", "1 kg", "500 ml", "1 pack"
  description: string;
  image: string;
  isVeg: boolean;
  rating: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItemSummary {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  isVeg: boolean;
}

export interface DeliveryPartnerInfo {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  avatar: string;
  currentLocationName: string;
  status: 'verified' | 'pending' | 'suspended';
  kycDocType: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  storeId?: string;
  storeName: string;
  category: ServiceCategory;
  items: OrderItemSummary[];
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  tax: number;
  discount: number;
  driverTip: number;
  grandTotal: number;
  status: OrderStatus;
  deliveryOtp: string;
  deliveryAddress: string;
  addressType: 'Home' | 'Work' | 'Other';
  instructions?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending_cod';
  deliveryPartner?: DeliveryPartnerInfo;
  createdAt: string;
  estimatedDeliveryTime: string;
  parcelDetails?: {
    senderName: string;
    senderPhone: string;
    pickupAddress: string;
    receiverName: string;
    receiverPhone: string;
    dropAddress: string;
    packageType: string;
    weightKg: number;
    specialNotes?: string;
  };
  review?: {
    rating: number;
    comment: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  isOwner?: boolean;
  savedAddresses: {
    id: string;
    type: 'Home' | 'Work' | 'Other';
    line: string;
    landmark?: string;
    city: string;
  }[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
}

export interface DeliveryPartnerStats {
  isOnline: boolean;
  todayEarnings: number;
  todayTrips: number;
  weeklyTarget: number;
  rating: number;
  acceptanceRate: number;
  activeOrder: Order | null;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface PlatformSettings {
  appName: string;
  founder: string;
  tagline: string;
  commissionRate: number;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  platformFee: number;
  supportEmail: string;
  supportPhone: string;
  registeredEntity: string;
}

export interface PincodeEntry {
  pincode: string;
  area: string;
  city: string;
  state: string;
  isServiceable: boolean;
  foodDelivery: boolean;
  groceryMandi: boolean;
  essentials: boolean;
  parcelExpress: boolean;
  intercityCourier: boolean;
  estMinutes: string;
  waitlistCount: number;
}
