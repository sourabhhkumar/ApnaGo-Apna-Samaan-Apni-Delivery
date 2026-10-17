import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleAndDeviceToolbar } from './components/common/RoleAndDeviceToolbar';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { SplashScreen } from './components/common/SplashScreen';
import { AboutFounderModal } from './components/common/AboutFounderModal';
import { PincodeModal } from './components/common/PincodeModal';
import { BrandAssetsModal } from './components/common/BrandAssetsModal';
import { CustomerHome } from './components/customer/CustomerHome';
import { StoreProductCatalog } from './components/customer/StoreProductCatalog';
import { ParcelDeliveryView } from './components/customer/ParcelDeliveryView';
import { CartDrawer } from './components/customer/CartDrawer';
import { PaymentModal } from './components/customer/PaymentModal';
import { OrderTrackingView } from './components/customer/OrderTrackingView';
import { OrderHistoryView } from './components/customer/OrderHistoryView';
import { AuthModal } from './components/customer/AuthModal';
import { SupportModal } from './components/customer/SupportModal';
import { DeliveryPartnerView } from './components/partner/DeliveryPartnerView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { Store } from './types';
import {
  UtensilsCrossed,
  ShoppingBag,
  Package,
  Clock,
  User,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeRole,
    currentTab,
    setCurrentTab,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    setIsAuthModalOpen,
    setIsSupportOpen,
    isAboutOpen,
    setIsAboutOpen,
    isBrandKitOpen,
    setIsBrandKitOpen,
    isSplashOpen,
    setIsSplashOpen,
    deviceMode,
    activeCategory,
    setActiveCategory,
    t,
  } = useApp();

  // Navigation states
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isParcelOpen, setIsParcelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPincodeOpen, setIsPincodeOpen] = useState(false);

  return (
    <DeviceFrame>
      {/* Splash Screen */}
      {isSplashOpen && <SplashScreen onDismiss={() => setIsSplashOpen(false)} />}

      {/* Customer role */}
      {activeRole === 'customer' && (
        <div className="flex-1 flex flex-col min-h-full">
          <Header
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenPincode={() => setIsPincodeOpen(true)}
            onOpenBrandKit={() => setIsBrandKitOpen(true)}
          />

          <main className="flex-1">
            {currentTab === 'track' && activeTrackingOrderId ? (
              <OrderTrackingView
                orderId={activeTrackingOrderId}
                onBack={() => setCurrentTab('orders')}
              />
            ) : currentTab === 'orders' ? (
              <OrderHistoryView
                onTrackOrder={(orderId) => {
                  setActiveTrackingOrderId(orderId);
                  setCurrentTab('track');
                }}
                onOpenSupport={() => setIsSupportOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            ) : isParcelOpen ? (
              <ParcelDeliveryView
                onBack={() => setIsParcelOpen(false)}
                onSuccess={() => {
                  setIsParcelOpen(false);
                  setCurrentTab('track');
                }}
              />
            ) : selectedStore ? (
              <StoreProductCatalog
                store={selectedStore}
                onBack={() => setSelectedStore(null)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            ) : (
              <CustomerHome
                onSelectStore={(store) => setSelectedStore(store)}
                onOpenParcel={() => setIsParcelOpen(true)}
              />
            )}
          </main>

          {/* Desktop & Tablet Footer with Founder Credits */}
          {deviceMode !== 'mobile' && (
            <Footer
              onOpenAbout={() => setIsAboutOpen(true)}
              onOpenBrandKit={() => setIsBrandKitOpen(true)}
              onOpenParcel={() => {
                setActiveCategory('parcel');
                setIsParcelOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* Mobile Bottom Tab Bar */}
          <nav className="sm:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 py-1.5 px-2 text-center">
            <button
              onClick={() => {
                setSelectedStore(null);
                setIsParcelOpen(false);
                setCurrentTab('home');
                setActiveCategory('food');
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                currentTab === 'home' && activeCategory === 'food' && !isParcelOpen
                  ? 'text-orange-600 font-bold'
                  : 'text-slate-500'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{t('foodDelivery').split(' ')[0]}</span>
            </button>

            <button
              onClick={() => {
                setSelectedStore(null);
                setIsParcelOpen(false);
                setCurrentTab('home');
                setActiveCategory('grocery');
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                currentTab === 'home' && activeCategory === 'grocery' && !isParcelOpen
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{t('groceryMandi').split(' ')[0]}</span>
            </button>

            <button
              onClick={() => {
                setSelectedStore(null);
                setIsParcelOpen(true);
                setCurrentTab('home');
                setActiveCategory('parcel');
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isParcelOpen ? 'text-orange-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Package className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{t('sendParcel').split(' ')[0]}</span>
            </button>

            <button
              onClick={() => {
                setSelectedStore(null);
                setIsParcelOpen(false);
                setCurrentTab('orders');
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                currentTab === 'orders' || currentTab === 'track'
                  ? 'text-orange-600 font-bold'
                  : 'text-slate-500'
              }`}
            >
              <Clock className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{t('myOrders').split(' ')[0]}</span>
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <User className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{t('profile')}</span>
            </button>
          </nav>

          {/* Customer Modals & Drawers */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onProceedToPayment={() => setIsPaymentOpen(true)}
          />

          <PaymentModal
            isOpen={isPaymentOpen}
            onClose={() => setIsPaymentOpen(false)}
            onPaymentSuccess={(orderId) => {
              setActiveTrackingOrderId(orderId);
              setCurrentTab('track');
            }}
          />
        </div>
      )}

      {/* Delivery Partner role */}
      {activeRole === 'partner' && (
        <div className="flex-1 flex flex-col min-h-full bg-slate-100">
          <DeliveryPartnerView />
        </div>
      )}

      {/* Admin / Owner role */}
      {activeRole === 'admin' && (
        <div className="flex-1 flex flex-col min-h-full bg-slate-50">
          <AdminDashboardView />
        </div>
      )}

      {/* Shared Modals */}
      <AuthModal />
      <SupportModal />
      <AboutFounderModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <PincodeModal isOpen={isPincodeOpen} onClose={() => setIsPincodeOpen(false)} />
      <BrandAssetsModal isOpen={isBrandKitOpen} onClose={() => setIsBrandKitOpen(false)} />
      <Toast />
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        {/* Universal Top Toolbar for Role Switcher & Smartphone/Tablet/Laptop Preview */}
        <RoleAndDeviceToolbar />
        <MainAppContent />
      </div>
    </AppProvider>
  );
}
