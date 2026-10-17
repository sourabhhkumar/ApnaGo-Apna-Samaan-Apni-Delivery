# ApnaGo — India's Next-Generation Delivery Platform
> *“Apna Samaan, Apni Delivery.”*

**An Indian On-Demand Delivery Startup**  
**Founded & Owned by Sourabh Singh**  
**Developed by Sourabh Singh**

---

## 1. Official Brand Identity & Ownership

| Attribute | Specification |
| :--- | :--- |
| **Application Name** | **ApnaGo** |
| **Founder & Owner** | **Sourabh Singh** |
| **Developed By** | **Sourabh Singh** |
| **Tagline** | *“Apna Samaan, Apni Delivery.”* |
| **Target Market** | All-India (Tier-1, Tier-2, and Tier-3 hubs) |
| **Currency** | Indian Rupees (INR ₹) |
| **Primary Languages** | English and Hindi (हिन्दी) with instant real-time toggle |
| **Color Palette** | Saffron Orange (`#f97316`), Deep Green (`#15803d`), Clean White, Charcoal Grey |
| **Statutory Compliance**| Section 9(5) CGST / SGST Act 2017 & RBI / NPCI UPI Verification |

---

## 2. Complete Architecture Overview

```
                                  ┌──────────────────────────────────────────────┐
                                  │            ApnaGo Unified Web / App          │
                                  │   (Android Shell / iOS Shell / Laptop Web)   │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                ┌────────────────────────────────────────┼────────────────────────────────────────┐
                │                                        │                                        │
                ▼                                        ▼                                        ▼
    [ Customer Application ]                 [ Delivery Partner Portal ]             [ Owner Command Center ]
    • Food Delivery (Kitchens & Dum Biryani) • Online / Offline shift toggle         • Sourabh Singh Master Panel
    • Grocery Mandi (15-min farm produce)    • Interactive route & store map         • Gross Merchandise Value (GMV)
    • Daily Essentials & Ayurvedic Pharmacy  • Direct customer call trigger          • Commission economics slider
    • ApnaGo Send (Instant City Parcel)      • 4-Digit Delivery Verification OTP     • Partner KYC document approvals
    • 6-Digit PIN Code Serviceability Matrix • Daily earnings & incentive targets    • PIN Code serviceability toggles
    • Multi-method Indian Razorpay & UPI     • Completed trips ledger                • Immutable statutory audit logs
                │                                        │                                        │
                └────────────────────────────────────────┼────────────────────────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │           Full-Stack Express Server          │
                                  │  • /api/health                               │
                                  │  • /api/settings                             │
                                  │  • /api/pincodes & /api/pincodes/toggle      │
                                  │  • /api/pincodes/waitlist                    │
                                  │  • /api/payment/verify                       │
                                  │  • /api/admin/audit-logs                     │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │      State Core & Client Storage Layer       │
                                  │  (Reactive Context + LocalStorage Hydration) │
                                  └──────────────────────────────────────────────┘
```

---

## 3. Project Directory Structure

```
apnago/
├── server.ts                             # Full-Stack Express API server & Vite middleware
├── index.html                            # HTML entry point with Plus Jakarta Sans & SEO meta
├── metadata.json                         # AI Studio application metadata
├── package.json                          # Full-stack dependencies (React 19, Lucide, Tailwind v4, Express, TSX)
├── tsconfig.json                         # TypeScript compiler configuration
├── vite.config.ts                        # Vite build & bundler configuration
├── .env.example                          # Runtime environment variable templates
├── README.md                             # Official project documentation
├── src/
│   ├── main.tsx                          # React DOM mount point
│   ├── index.css                         # Tailwind CSS v4 directives & brand color tokens
│   ├── App.tsx                           # Main application router, frame controller & modals
│   ├── types.ts                          # Complete TypeScript interfaces (Store, Product, Order, Pincode)
│   ├── data/
│   │   ├── mockData.ts                   # Authentic Indian restaurants, kirana mandis, and items
│   │   └── translations.ts               # English and Hindi (हिन्दी) complete translation strings
│   ├── context/
│   │   └── AppContext.tsx                # Central reactive state engine, owner auth & audit logs
│   ├── assets/
│   │   └── images/                       # Generated commercial photography assets (Biryani, Mandi, Courier)
│   └── components/
│       ├── common/
│       │   ├── Header.tsx                # Top Bar navigation, PIN selector & language toggle
│       │   ├── Footer.tsx                # Official Sourabh Singh founder credits, links & GST legal
│       │   ├── SplashScreen.tsx          # Branded splash screen & onboarding introduction
│       │   ├── AboutFounderModal.tsx     # Dedicated About Sourabh Singh & startup mission modal
│       │   ├── PincodeModal.tsx          # 6-Digit Indian PIN code serviceability & waitlist
│       │   ├── RoleAndDeviceToolbar.tsx  # Instant Customer / Partner / Owner & device mode switcher
│       │   ├── DeviceFrame.tsx           # Smartphone shell (iPhone/Pixel), Tablet & Laptop frames
│       │   └── Toast.tsx                 # Reactive notification toast component
│       ├── customer/
│       │   ├── CustomerHome.tsx          # Food, Mandi, Essentials & Parcel discovery feed
│       │   ├── StoreProductCatalog.tsx   # Store menus with pure veg / non-veg filters
│       │   ├── ParcelDeliveryView.tsx    # ApnaGo Send parcel courier booking interface
│       │   ├── CartDrawer.tsx            # Indian bill calculation, coupons (APNA50, FREEDEL) & tips
│       │   ├── PaymentModal.tsx          # Razorpay & UPI payment gateway simulator
│       │   ├── OrderTrackingView.tsx     # Live interactive city map, driver scooter & delivery OTP
│       │   ├── OrderHistoryView.tsx      # Past orders, tax invoices & reorder shortcuts
│       │   ├── AuthModal.tsx             # Indian +91 SMS OTP & Owner passcode login
│       │   └── SupportModal.tsx          # 24x7 automated customer care chat simulation
│       ├── partner/
│       │   └── DeliveryPartnerView.tsx   # Courier dashboard, navigation, OTP verification & earnings
│       └── admin/
│           └── AdminDashboardView.tsx    # Owner Command Center for Sourabh Singh
```

---

## 4. Phase-by-Phase Development Implementation

### Phase 1: Brand Identity, Splash Screen & Device Framework
- Original logo and emblem created using Indian saffron (`#f97316`) and deep forest green (`#15803d`).
- Interactive device frame allowing instant switching between **Smartphone** (390×844 with notch and status bar), **Tablet** (768px), and **Desktop / Laptop**.
- Splash screen highlighting the official credit:  
  **Founded & Owned by Sourabh Singh** · **Developed by Sourabh Singh**  
  *“Apna Samaan, Apni Delivery.”*
- Real-time dual-language switcher (English and Hindi).

### Phase 2: Catalog Discovery, Search & Filtering
- Authentic Indian store catalog:
  - **Royal Awadh Biryani Kitchen** (Dum Biryani, Butter Paneer, Garlic Naan)
  - **Apna Kisan Mandi** (Farm fresh tomatoes, green chilies, onions, Amul milk)
  - **Sanjivani Ayurvedic & Essentials** (Pure cold-pressed oil, neem soap, Chyawanprash)
- Pure Veg (`veg`) green badge and Non-Veg (`nonveg`) red badge indicators adhering to Indian FSSAI labeling guidelines.
- Instant search across stores, menus, subcategories, and price points.

### Phase 3: ApnaGo Send Parcel & Courier Module
- Instant city courier delivery booking for:
  - Important documents and files
  - Homemade food and tiffin boxes
  - Mobile chargers and electronics
  - House keys and urgent packages
  - Urgent medicines
- Automated transparent fare calculator based on distance (`₹40 base + ₹12/km`).
- Sender and receiver address, contact number, and package category specification.

### Phase 4: Cart, Checkout & Indian Statutory Billing
- Quantity adjustment steppers with automatic real-time bill calculation:
  - Item Subtotal
  - Itemized 5% GST (2.5% CGST + 2.5% SGST) compliant with Section 9(5) CGST Act 2017
  - Dynamic Delivery Fee (Free on orders above ₹299 threshold)
  - Nominal platform convenience fee (₹5)
  - Optional Delivery Partner tip (₹10, ₹20, ₹30, ₹50) with 100% transfer to the rider
- Indian coupon engine:
  - `APNA50`: 50% discount up to ₹100
  - `FREEDEL`: Free delivery on current cart

### Phase 5: Payment Gateway & Server Verification
- Multi-channel checkout modal supporting:
  - **UPI Apps**: Google Pay, PhonePe, Paytm, BHIM UPI, Cred UPI
  - **Credit & Debit Cards**: Visa, MasterCard, RuPay with 3D Secure OTP
  - **Net Banking**: SBI, HDFC, ICICI, Axis Bank
  - **Cash on Delivery (COD)**: Available with zero advance fee
- Server-side verification endpoint at `POST /api/payment/verify` verifying amount integrity and logging payment audits.

### Phase 6: Live Delivery Tracking & 4-Digit Handover PIN
- Interactive city SVG map with real-time route path and animated delivery scooter.
- Live status stepper: `Confirmed` ➔ `Preparing` ➔ `Rider Picked Up` ➔ `Arriving Soon` ➔ `Delivered`.
- **4-Digit Secure Delivery OTP** (`5829`) generated on checkout and verified on delivery partner handover.
- Driver contact card with vehicle details (Ather 450X Electric Scooter, KA 03 AC 1947).

### Phase 7: All-India PIN Code Serviceability & Expansion System
- Nationwide PIN code directory supporting major metro and Tier-2 hubs:
  - **560038**: Bengaluru (Indiranagar / HAL) — Active (15-25 min)
  - **560103**: Bengaluru (Bellandur / EcoSpace) — Active (20-30 min)
  - **110001**: New Delhi (Connaught Place) — Active (20-30 min)
  - **400001**: Mumbai (Fort / Colaba) — Active (25-35 min)
  - **500081**: Hyderabad (Hitec City) — Active (20-30 min)
  - **226001**: Lucknow (Hazratganj) — Coming Soon (Pre-launch waitlist)
  - **302001**: Jaipur (C-Scheme) — Coming Soon (Pre-launch waitlist)
  - **800001**: Patna (Fraser Road) — Coming Soon (Pre-launch waitlist)
- Users in "Coming Soon" areas can register mobile numbers for launch alerts.
- Owner can activate or deactivate PIN codes instantly via the Owner Command Center without recompilation.

---

## 5. Owner Command Center for Sourabh Singh

Access the executive panel via:
1. **Top Role Switcher**: Click **Owner Panel** in the top navigation bar.
2. **Owner Passcode Authentication**: Enter passcode `sourabh2026` or `apnago` in the Login modal.

### Key Executive Capabilities:
- **Financial Analytics**: Live GMV, platform net revenue, collected GST.
- **Order Stream**: Real-time order dispatch feed with status overrides.
- **Product Catalog Management**: Add products, toggle inventory stock, and edit prices on the fly.
- **Fleet KYC Approvals**: Verify Aadhaar / Driving License documents of electric scooter delivery partners.
- **Platform Economics Slider**: Adjust merchant commission rates (10% - 25%), base delivery fees, and free delivery thresholds.
- **Audit Logs**: Immutable log of every administrative and financial transaction.

---

## 6. How to Run Locally in VS Code (Windows & macOS)

### Prerequisites:
- Node.js 18+ installed
- VS Code editor

### Step-by-Step Terminal Commands:

1. **Open VS Code Terminal** (`Ctrl + ` `~` on Windows, `Cmd + ` `~` on macOS):
   ```bash
   # 1. Install all dependencies
   npm install

   # 2. Run TypeScript check and linter
   npm run lint

   # 3. Start full-stack development server
   npm run dev
   ```

2. **Access ApnaGo**:
   Open browser at `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 7. App Store & Production Release Preparation

### A. Google Play Store (Android):
1. **Trusted Web Activity (TWA)**:
   ```bash
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest=https://<your-app-url>/manifest.json
   bubblewrap build
   ```
2. **Generate Release Keystore**:
   ```bash
   keytool -genkey -v -keystore apnago-release.jks -alias apnago -keyalg RSA -keysize 2048 -validity 10000
   ```
3. Upload generated `.aab` to Google Play Console under **Production Track**.

### B. Apple App Store (iOS):
1. **Capacitor Setup**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios
   npx cap init ApnaGo com.apnago.delivery --web-dir dist
   npx cap add ios
   ```
2. Open in Xcode on macOS:
   ```bash
   npx cap open ios
   ```
3. Configure Signing & Capabilities (Team ID, Bundle Identifier) and archive for distribution via App Store Connect.

---

## 8. Official Credits

**ApnaGo — An Indian Delivery Platform**  
**Founded & Owned by Sourabh Singh**  
**Developed by Sourabh Singh**  
*“Apna Samaan, Apni Delivery.”*  
© 2026 ApnaGo Technologies Pvt Ltd. All rights reserved.
