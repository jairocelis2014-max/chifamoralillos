import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial orders including Jackelyn's order and initial records
const INITIAL_ORDERS = [
  {
    id: "MORALILLO-1864",
    createdAt: new Date().toISOString(),
    customerName: "Jackelyn",
    customerPhone: "907373993",
    serviceType: "delivery",
    addressOrTable: "Raymondi",
    paymentMethod: "Yape",
    paymentVoucher: "11111",
    notes: "Cubiertos descartables",
    items: [
      {
        id: "G1-chaufa-esp",
        productId: "G1",
        code: "G1",
        name: "G1 Chaufa especial",
        price: 23.00,
        quantity: 1,
        notes: "Cubiertos descartables",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "G10-aero-pollo",
        productId: "G10",
        code: "G10",
        name: "G10 Aeropuerto pollo",
        price: 22.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "GAS-IK-296",
        productId: "GAS-IK-296",
        code: "GAS-IK-296",
        name: "Inca kola 296 ml.",
        price: 2.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 47.50,
    deliveryFee: 0,
    total: 47.50,
    status: "Pendiente"
  },
  {
    id: "MORALILLO-1001",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    customerName: "Carlos Celis",
    customerPhone: "941428121",
    serviceType: "delivery",
    addressOrTable: "Calle Comercio N° 420 (frente al parque)",
    paymentMethod: "Yape",
    paymentVoucher: "948210",
    items: [
      {
        id: "B1-default",
        productId: "B1",
        code: "B1",
        name: "B1: 1/2 Doc. wantán + 1 chijaukay + 2 chaufas + 1 gaseosa 1/2 Lt.",
        price: 45.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 45.00,
    deliveryFee: 0,
    total: 45.00,
    status: "En camino"
  }
];

function readOrders(): any[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure Jackelyn's order is always present
        if (!parsed.some((o: any) => o.id === "MORALILLO-1864")) {
          parsed.unshift(INITIAL_ORDERS[0]);
          fs.writeFileSync(ORDERS_FILE, JSON.stringify(parsed, null, 2));
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading orders file:', e);
  }
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2));
  return INITIAL_ORDERS;
}

function writeOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (e) {
    console.error('Error writing orders file:', e);
  }
}

// API Routes
app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.id) {
    return res.status(400).json({ error: 'Pedido inválido' });
  }
  const orders = readOrders();
  const existingIndex = orders.findIndex((o: any) => o.id === newOrder.id);
  if (existingIndex > -1) {
    orders[existingIndex] = newOrder;
  } else {
    orders.unshift(newOrder);
  }
  writeOrders(orders);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const orders = readOrders();
  const order = orders.find((o: any) => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }
  order.status = status;
  writeOrders(orders);
  res.json(order);
});

app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  let orders = readOrders();
  orders = orders.filter((o: any) => o.id !== id);
  writeOrders(orders);
  res.json({ success: true });
});

// Vite middleware in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Chifa Moralillos backend server running on port ${PORT}`);
  });
}

startServer();
