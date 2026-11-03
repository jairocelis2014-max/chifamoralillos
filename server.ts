import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PRODUCTS, MENU_SECTIONS, CHIFA_INFO } from './src/data/chifaMenu';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// High body limit to easily accept high-res photos
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SECTIONS_FILE = path.join(DATA_DIR, 'sections.json');
const INFO_FILE = path.join(DATA_DIR, 'info.json');

// Ensure data & uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded images publicly at /uploads/...
app.use('/uploads', express.static(UPLOADS_DIR));

// ==================== 1. ORDERS PERSISTENCE ====================
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

// ==================== 2. PRODUCTS PERSISTENCE ====================
function readProducts(): any[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let updated = false;
        parsed.forEach((prod: any) => {
          const init = INITIAL_PRODUCTS.find((p) => p.id === prod.id);
          if (init && init.image.startsWith('/uploads/') && !prod.image.startsWith('/uploads/')) {
            prod.image = init.image;
            updated = true;
          }
        });
        if (updated) {
          fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(parsed, null, 2));
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading products file:', e);
  }
  // Initialize with official 210 products
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2));
  return INITIAL_PRODUCTS;
}

function writeProducts(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (e) {
    console.error('Error writing products file:', e);
  }
}

// ==================== 3. SECTIONS PERSISTENCE ====================
function readSections(): any[] {
  try {
    if (fs.existsSync(SECTIONS_FILE)) {
      const data = fs.readFileSync(SECTIONS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading sections file:', e);
  }
  fs.writeFileSync(SECTIONS_FILE, JSON.stringify(MENU_SECTIONS, null, 2));
  return MENU_SECTIONS;
}

function writeSections(sections: any[]) {
  try {
    fs.writeFileSync(SECTIONS_FILE, JSON.stringify(sections, null, 2));
  } catch (e) {
    console.error('Error writing sections file:', e);
  }
}

// ==================== 4. CHIFA INFO PERSISTENCE ====================
function readInfo(): any {
  try {
    if (fs.existsSync(INFO_FILE)) {
      const data = fs.readFileSync(INFO_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed && parsed.name) {
        if (!parsed.logoImage || parsed.logoImage.includes('logotipo_png')) {
          parsed.logoImage = CHIFA_INFO.logoImage;
          fs.writeFileSync(INFO_FILE, JSON.stringify(parsed, null, 2));
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading info file:', e);
  }
  fs.writeFileSync(INFO_FILE, JSON.stringify(CHIFA_INFO, null, 2));
  return CHIFA_INFO;
}

function writeInfo(info: any) {
  try {
    fs.writeFileSync(INFO_FILE, JSON.stringify(info, null, 2));
  } catch (e) {
    console.error('Error writing info file:', e);
  }
}

// ==================== API ROUTES ====================

// --- UPLOAD IMAGE TO DISK (PERSISTENT & LIGHTWEIGHT) ---
app.post('/api/upload-image', (req, res) => {
  try {
    const { image, name } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' });
    }

    // If it's already an existing HTTP or relative URL, don't re-upload
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/uploads/') || image.startsWith('/assets/')) {
      return res.json({ url: image });
    }

    // Match base64 data URL
    const matches = image.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Formato de imagen base64 inválido' });
    }

    const rawExt = matches[1].toLowerCase();
    const ext = rawExt === 'jpeg' ? 'jpg' : rawExt.includes('png') ? 'png' : rawExt.includes('webp') ? 'webp' : 'jpg';
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const safeName = (name || 'plato')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 25);
    const fileName = `${safeName}_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${fileName}`;
    console.log(`[Upload] Image saved: ${publicUrl}`);
    return res.json({ url: publicUrl, fileName });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ error: 'Error al procesar la imagen' });
  }
});

// --- ORDERS API ---
app.get('/api/orders', (req, res) => {
  res.json(readOrders());
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

// --- PRODUCTS API (PERMANENT & MULTI-DEVICE) ---
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  if (!newProduct || !newProduct.id) {
    return res.status(400).json({ error: 'Producto inválido' });
  }
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === newProduct.id);
  if (idx > -1) {
    products[idx] = newProduct;
  } else {
    products.unshift(newProduct);
  }
  writeProducts(products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) {
    products.unshift(updatedProduct);
  } else {
    products[idx] = { ...products[idx], ...updatedProduct };
  }
  writeProducts(products);
  res.json(updatedProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  let products = readProducts();
  products = products.filter((p: any) => p.id !== id);
  writeProducts(products);
  res.json({ success: true });
});

app.post('/api/products/reset', (req, res) => {
  writeProducts(INITIAL_PRODUCTS);
  res.json({ success: true, products: INITIAL_PRODUCTS });
});

// --- SECTIONS API ---
app.get('/api/sections', (req, res) => {
  res.json(readSections());
});

app.put('/api/sections', (req, res) => {
  const sections = req.body;
  if (Array.isArray(sections)) {
    writeSections(sections);
    return res.json({ success: true, sections });
  }
  res.status(400).json({ error: 'Formato inválido de secciones' });
});

app.put('/api/sections/:number', (req, res) => {
  const secNumber = parseInt(req.params.number);
  const updatedSection = req.body;
  const sections = readSections();
  const idx = sections.findIndex((s: any) => s.number === secNumber);
  if (idx > -1) {
    sections[idx] = { ...sections[idx], ...updatedSection };
    writeSections(sections);
    return res.json(sections[idx]);
  }
  sections.push(updatedSection);
  writeSections(sections);
  res.json(updatedSection);
});

app.post('/api/sections/reset', (req, res) => {
  writeSections(MENU_SECTIONS);
  res.json({ success: true, sections: MENU_SECTIONS });
});

// --- INFO API ---
app.get('/api/info', (req, res) => {
  res.json(readInfo());
});

app.put('/api/info', (req, res) => {
  const info = req.body;
  writeInfo(info);
  res.json(info);
});

// ==================== VITE MIDDLEWARE / STATIC ====================
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
