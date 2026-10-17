import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory server-side audit logs for Sourabh Singh's Owner Dashboard
const auditLogs: {
  id: string;
  actor: string;
  action: string;
  details: string;
  timestamp: string;
}[] = [
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
    details: 'Activated service in Bengaluru (560038, 560103) and New Delhi Central (110001).',
    timestamp: new Date(Date.now() - 900000).toISOString(),
  },
];

// All-India PIN Code Serviceability Matrix
interface PincodeEntry {
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

const pincodesRegistry: PincodeEntry[] = [
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

// Platform configuration managed by Founder & Owner Sourabh Singh
let platformSettings = {
  appName: 'ApnaGo',
  founder: 'Sourabh Singh',
  tagline: 'Apna Samaan, Apni Delivery',
  commissionRate: 18,
  baseDeliveryFee: 30,
  freeDeliveryThreshold: 299,
  platformFee: 5,
  supportEmail: 'contact@apnago.in',
  supportPhone: '+91 80 4920 1800',
  registeredEntity: 'ApnaGo Technologies Pvt Ltd, Bengaluru, India',
};

// --- API Endpoints ---

// 1. Health & Platform info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'ApnaGo',
    founderAndOwner: 'Sourabh Singh',
    version: '2.6.0',
    timestamp: new Date().toISOString(),
  });
});

// 2. Platform settings
app.get('/api/settings', (req, res) => {
  res.json(platformSettings);
});

// 3. Update settings (Owner authorization required)
app.post('/api/settings', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer sourabh-owner-token') {
    return res.status(403).json({ error: 'Unauthorized: Owner access required' });
  }

  const { commissionRate, baseDeliveryFee, freeDeliveryThreshold } = req.body;
  if (commissionRate !== undefined) platformSettings.commissionRate = Number(commissionRate);
  if (baseDeliveryFee !== undefined) platformSettings.baseDeliveryFee = Number(baseDeliveryFee);
  if (freeDeliveryThreshold !== undefined)
    platformSettings.freeDeliveryThreshold = Number(freeDeliveryThreshold);

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    actor: 'Sourabh Singh (Owner)',
    action: 'SETTINGS_UPDATED',
    details: `Updated platform settings: Commission ${platformSettings.commissionRate}%, Base Delivery ₹${platformSettings.baseDeliveryFee}`,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, settings: platformSettings });
});

// 4. All-India PIN Code Serviceability API
app.get('/api/pincodes', (req, res) => {
  res.json(pincodesRegistry);
});

// Toggle PIN code activation by Owner Sourabh Singh
app.post('/api/pincodes/toggle', (req, res) => {
  const { pincode } = req.body;
  const target = pincodesRegistry.find((p) => p.pincode === pincode);
  if (!target) {
    return res.status(404).json({ error: 'PIN code not found' });
  }

  target.isServiceable = !target.isServiceable;
  target.foodDelivery = target.isServiceable;
  target.groceryMandi = target.isServiceable;
  target.essentials = target.isServiceable;
  target.parcelExpress = target.isServiceable;
  target.estMinutes = target.isServiceable ? '20-30 mins' : 'Coming Soon';

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    actor: 'Sourabh Singh (Owner)',
    action: target.isServiceable ? 'PINCODE_ACTIVATED' : 'PINCODE_DEACTIVATED',
    details: `PIN Code ${pincode} (${target.area}, ${target.city}) set to ${target.isServiceable ? 'ACTIVE' : 'COMING SOON'}.`,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, pincode: target });
});

// Join Waitlist for Coming Soon locations
app.post('/api/pincodes/waitlist', (req, res) => {
  const { pincode, phone, email } = req.body;
  const target = pincodesRegistry.find((p) => p.pincode === pincode);
  if (target) {
    target.waitlistCount += 1;
  }
  res.json({
    success: true,
    message: `Thank you! You are registered for ApnaGo launch updates in ${target?.city || 'your area'}.`,
  });
});

// 5. Server-side payment verification (Razorpay simulation)
app.post('/api/payment/verify', (req, res) => {
  const { paymentId, orderId, signature, amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid payment amount' });
  }

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    actor: 'Payment Gateway',
    action: 'PAYMENT_CAPTURED',
    details: `Payment of ₹${amount} verified via Razorpay/UPI (ID: ${paymentId || 'pay_live_9921'}).`,
    timestamp: new Date().toISOString(),
  });

  res.json({
    success: true,
    verified: true,
    paymentId: paymentId || `pay_rzp_${Date.now()}`,
    verifiedAt: new Date().toISOString(),
  });
});

// 6. Audit logs for Owner Dashboard
app.get('/api/admin/audit-logs', (req, res) => {
  res.json(auditLogs);
});

app.post('/api/admin/audit-logs', (req, res) => {
  const { action, details } = req.body;
  const newLog = {
    id: `log-${Date.now()}`,
    actor: 'Sourabh Singh (Owner)',
    action: action || 'ADMIN_ACTION',
    details: details || 'Updated platform state',
    timestamp: new Date().toISOString(),
  };
  auditLogs.unshift(newLog);
  res.json({ success: true, log: newLog });
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApnaGo full-stack server running on port ${PORT}`);
    console.log(`Founder & Owner: Sourabh Singh`);
  });
}

startServer();
