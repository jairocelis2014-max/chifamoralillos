import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { DishCard } from './components/DishCard';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MobileAppDock } from './components/MobileAppDock';
import { ContactModal } from './components/ContactModal';
import { INITIAL_PRODUCTS, MENU_SECTIONS, MenuItem, MenuSection, CHIFA_INFO } from './data/chifaMenu';
import { CartItem, Order } from './types';
import { ShoppingBag, MessageCircle, Phone, Facebook, ArrowUp, Flame, Star, Sparkles, MapPin, X, ChevronRight, Maximize2, Search } from 'lucide-react';

const INITIAL_DEMO_ORDERS: Order[] = [
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
        name: "B1: 1/2 Doc. wantán + 1 chijaukay + 2 chaufas + 1 gaseosa 1/2 Lt.",
        code: "B1",
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

export default function App() {
  // Products state (persisted with smart auto-upgrade for new photos)
  const [products, setProducts] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('chifa_products_v5') || localStorage.getItem('chifa_products_v4') || localStorage.getItem('chifa_products_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with INITIAL_PRODUCTS to ensure any dishes with uploaded photos get upgraded
          return INITIAL_PRODUCTS.map((init) => {
            const stored = parsed.find((p: MenuItem) => p.id === init.id);
            if (!stored) return init;
            const isUnsplash = stored.image && stored.image.includes('images.unsplash.com');
            const hasUpload = init.image && init.image.startsWith('/uploads/');
            const isIncaKola = init.id.startsWith('GAS-IK');
            const storedIsCocaCola = stored.image && (stored.image.includes('photo-1622483767028') || isUnsplash);

            let finalImage = stored.image || init.image;
            if (isIncaKola && (storedIsCocaCola || hasUpload)) {
              finalImage = init.image; // Use official /uploads/inca kola.jpg
            } else if (isUnsplash && hasUpload) {
              finalImage = init.image;
            }

            return {
              ...init,
              ...stored,
              image: finalImage
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state (persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chifa_cart_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Orders state (persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('chifa_orders_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Guarantee Jackelyn's order MORALILLO-1864 is included
          if (!parsed.some((o: Order) => o.id === "MORALILLO-1864")) {
            parsed.unshift(INITIAL_DEMO_ORDERS[0]);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DEMO_ORDERS;
  });

  // Server sync state
  const [isServerConnected, setIsServerConnected] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const fetchServerData = async () => {
    try {
      // 1. Sync Orders
      const ordersRes = await fetch('/api/orders');
      if (ordersRes.ok) {
        const serverOrders = await ordersRes.json();
        if (Array.isArray(serverOrders) && serverOrders.length > 0) {
          setOrders(serverOrders);
        }
      }

      // 2. Sync Products (Authoritative server data)
      const prodsRes = await fetch('/api/products');
      if (prodsRes.ok) {
        const serverProds = await prodsRes.json();
        if (Array.isArray(serverProds) && serverProds.length > 0) {
          setProducts(serverProds);
          try {
            localStorage.setItem('chifa_products_v3', JSON.stringify(serverProds));
          } catch (e) {
            // ignore localStorage quota error as server is authoritative
          }
        }
      }

      // 3. Sync Sections
      const secRes = await fetch('/api/sections');
      if (secRes.ok) {
        const serverSecs = await secRes.json();
        if (Array.isArray(serverSecs) && serverSecs.length > 0) {
          setSections(serverSecs);
          try {
            localStorage.setItem('chifa_sections_v2', JSON.stringify(serverSecs));
          } catch (e) {}
        }
      }

      // 4. Sync Info
      const infoRes = await fetch('/api/info');
      if (infoRes.ok) {
        const serverInfo = await infoRes.json();
        if (serverInfo && serverInfo.name) {
          setChifaInfo(serverInfo);
          try {
            localStorage.setItem('chifa_info_v2', JSON.stringify(serverInfo));
          } catch (e) {}
        }
      }

      setIsServerConnected(true);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('Backend server poll check:', err);
    }
  };

  const fetchServerOrders = fetchServerData;

  useEffect(() => {
    fetchServerData();
    const interval = setInterval(fetchServerData, 4000);
    return () => clearInterval(interval);
  }, []);

  // Admin login state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('chifa_admin_logged') === 'true';
  });

  // Sections state with customizable background images
  const [sections, setSections] = useState<MenuSection[]>(() => {
    try {
      const saved = localStorage.getItem('chifa_sections_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return MENU_SECTIONS;
  });

  // Chifa contact and info state
  const [chifaInfo, setChifaInfo] = useState<typeof CHIFA_INFO>(() => {
    try {
      const saved = localStorage.getItem('chifa_info_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CHIFA_INFO;
  });

  // Navigation: 7 official PDF sections (1 to 7) or null for all
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals state
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentOrderSuccess, setRecentOrderSuccess] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chifa_products_v5', JSON.stringify(products));
      localStorage.setItem('chifa_products_v4', JSON.stringify(products));
      localStorage.setItem('chifa_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chifa_cart_v3', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chifa_orders_v3', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync sections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chifa_sections_v2', JSON.stringify(sections));
    } catch (e) {
      console.error(e);
    }
  }, [sections]);

  // Sync chifaInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chifa_info_v2', JSON.stringify(chifaInfo));
    } catch (e) {
      console.error(e);
    }
  }, [chifaInfo]);

  // Track scroll for "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Available subcategories for selected section
  const availableSubCategories = useMemo(() => {
    if (!selectedSection) return [];
    const sec = sections.find((s) => s.number === selectedSection);
    return sec ? sec.subcategories : [];
  }, [selectedSection, sections]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Section filter (1 to 7)
      if (selectedSection && p.sectionNumber !== selectedSection) {
        return false;
      }
      // Subcategory filter
      if (selectedSubCategory && selectedSubCategory !== 'Ver Todo' && selectedSubCategory !== 'Todos los Menús') {
        if (p.subCategory && p.subCategory.toLowerCase() !== selectedSubCategory.toLowerCase()) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.id.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSub = p.subCategory ? p.subCategory.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCode && !matchesDesc && !matchesSub) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedSection, selectedSubCategory, searchQuery]);

  // Cart Management
  const handleAddToCart = (options: {
    dish: MenuItem;
    quantity: number;
    selectedEntrance?: 'Sopa Wantán' | 'Wantán Frito';
    serviceModality?: 'Llevar' | 'Servir';
    notes?: string;
  }) => {
    const { dish, quantity, selectedEntrance, serviceModality, notes } = options;

    const unitPrice =
      dish.includesEntrance && serviceModality === 'Servir'
        ? dish.price
        : dish.takeawayPrice || dish.price;

    const uniqueId = `${dish.id}-${selectedEntrance || 'none'}-${serviceModality || 'std'}-${(notes || '').slice(0, 15)}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: dish.id,
          name: dish.name,
          code: dish.id,
          price: unitPrice,
          quantity,
          image: dish.image,
          selectedEntrance,
          serviceModality,
          notes,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Placement (Sync to local and server)
  const handleOrderCompleted = async (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
    setCart([]);
    setIsCheckoutOpen(false);
    setRecentOrderSuccess(newOrder);

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
    } catch (e) {
      console.warn('Error saving order to backend server:', e);
    }
  };

  // Admin Handlers
  const handleAdminLogin = (user: string, pass: string) => {
    if (user.trim() === 'admin' && pass.trim() === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('chifa_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('chifa_admin_logged');
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Error updating status on server:', e);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting order on server:', e);
    }
  };

  const handleAddManualOrder = async (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
    } catch (e) {
      console.warn('Error posting manual order to server:', e);
    }
  };

  const handleUpdateProduct = async (updated: MenuItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    try {
      await fetch(`/api/products/${encodeURIComponent(updated.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error saving product update to server:', e);
    }
  };

  const handleAddProduct = async (newProd: MenuItem) => {
    setProducts((prev) => [newProd, ...prev]);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });
    } catch (e) {
      console.warn('Error adding product to server:', e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    try {
      await fetch(`/api/products/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting product from server:', e);
    }
  };

  const handleResetProducts = async () => {
    if (window.confirm('¿Deseas restablecer todos los platos a los valores originales del menú PDF?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.removeItem('chifa_products_v3');
      try {
        await fetch('/api/products/reset', { method: 'POST' });
      } catch (e) {
        console.warn('Error resetting products on server:', e);
      }
    }
  };

  const handleUpdateSectionImage = async (sectionNumber: number, imageUrl: string) => {
    setSections((prev) =>
      prev.map((s) => (s.number === sectionNumber ? { ...s, image: imageUrl } : s))
    );
    try {
      await fetch(`/api/sections/${sectionNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      });
    } catch (e) {
      console.warn('Error updating section image on server:', e);
    }
  };

  const handleUpdateSection = async (updatedSection: MenuSection) => {
    setSections((prev) =>
      prev.map((s) => (s.number === updatedSection.number ? updatedSection : s))
    );
    try {
      await fetch(`/api/sections/${updatedSection.number}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSection),
      });
    } catch (e) {
      console.warn('Error updating section on server:', e);
    }
  };

  const handleAddSection = async (newSection: MenuSection) => {
    const updated = [...sections, newSection];
    setSections(updated);
    try {
      await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error adding section on server:', e);
    }
  };

  const handleDeleteSection = async (sectionNumber: number) => {
    const updated = sections.filter((s) => s.number !== sectionNumber);
    setSections(updated);
    try {
      await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error deleting section from server:', e);
    }
  };

  const handleResetSections = async () => {
    setSections(MENU_SECTIONS);
    localStorage.removeItem('chifa_sections_v2');
    try {
      await fetch('/api/sections/reset', { method: 'POST' });
    } catch (e) {
      console.warn('Error resetting sections on server:', e);
    }
  };

  const handleUpdateChifaInfo = async (newInfo: typeof CHIFA_INFO) => {
    setChifaInfo(newInfo);
    try {
      await fetch('/api/info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInfo),
      });
    } catch (e) {
      console.warn('Error updating chifa info on server:', e);
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a0b] text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-20 md:pb-0">
      {/* 1. Navbar with Call, WhatsApp, and Facebook actions */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedSection={selectedSection}
        onSelectSection={(secNum) => {
          setSelectedSection(secNum);
          setSelectedSubCategory(null);
          scrollToMenu();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenLocation={() => setIsLocationModalOpen(true)}
      />

      {/* 2. Hero Section with FAÇADE BACKGROUND, CLEAN LOGO and DIRECT CALL/WHATSAPP/FB */}
      <Hero
        onExploreMenu={scrollToMenu}
        onExploreCombos={() => {
          setSelectedSection(6);
          setSelectedSubCategory(null);
          scrollToMenu();
        }}
        onExploreDailyMenu={() => {
          setSelectedSection(5);
          setSelectedSubCategory(null);
          scrollToMenu();
        }}
        chifaInfo={chifaInfo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full space-y-8">
        
        {/* CARTAS HEADER + BUSCADOR DE PLATOS COLOCADO A LA DERECHA */}
        <section id="menu-section" className="scroll-mt-24 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-gray-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-amber-400 uppercase tracking-wider">
                  {selectedSection === null
                    ? `Las ${sections.length} Cartas Oficiales del Menú Chifa Moralillos`
                    : sections.find((s) => s.number === selectedSection)?.title || 'Carta del Menú'}
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedSection === null
                  ? `Selecciona cualquiera de las ${sections.length} cartas con foto de fondo para ver sus platos ordenaditos`
                  : `Mostrando platos de esta carta • ${filteredProducts.length} disponibles`}
              </p>
            </div>

            {/* Buscador de Plato colocado a la derecha de las Cartas */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {selectedSection !== null && (
                <button
                  onClick={() => {
                    setSelectedSection(null);
                    setSelectedSubCategory(null);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-[#23171b] hover:bg-[#342228] text-amber-300 text-xs font-bold border border-amber-500/30 whitespace-nowrap transition active:scale-95 shadow"
                >
                  ← Ver Todas las Cartas
                </button>
              )}

              <div className="relative flex-1 md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por plato, código (G1, A1, B1)..."
                  className="w-full bg-[#1b1215] text-xs text-white pl-9 pr-8 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-amber-400 font-medium shadow-inner transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Subcategorías pills si se seleccionó una sección */}
          {selectedSection !== null && availableSubCategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedSubCategory === null
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-[#1b1215] text-gray-300 hover:text-white border border-gray-800'
                }`}
              >
                Todos los platos
              </button>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedSubCategory === sub
                      ? 'bg-amber-500 text-black shadow'
                      : 'bg-[#1b1215] text-gray-300 hover:text-white border border-gray-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* If viewing All Sections & no search: Show the Sections Cards with Background Images */}
          {selectedSection === null && !searchQuery && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedSection(sec.number);
                    setSelectedSubCategory(null);
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-950/50 cursor-pointer h-52 sm:h-56 flex flex-col justify-between p-4 active:scale-98"
                >
                  {/* Imagen de fondo de la sección */}
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 brightness-[0.38] group-hover:brightness-[0.48]"
                  />
                  {/* Capas degradadas para máxima legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent pointer-events-none" />

                  {/* Encabezado con CARTA {number} y badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-amber-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 shadow-sm">
                      CARTA {sec.number}
                    </span>
                    {sec.badge && (
                      <span className="bg-gradient-to-r from-red-700 to-amber-600 text-white font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-amber-400/30">
                        {sec.badge}
                      </span>
                    )}
                  </div>

                  {/* Título, descripción y botón de acción */}
                  <div className="relative z-10 space-y-1.5">
                    <h4 className="font-black text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors drop-shadow-md leading-snug">
                      {sec.title}
                    </h4>
                    <p className="text-gray-300 text-xs line-clamp-2 drop-shadow">
                      {sec.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-bold text-amber-400 pt-2 border-t border-white/10">
                      <span className="bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 text-gray-200">
                        {products.filter((p) => p.sectionNumber === sec.number).length} platos
                      </span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition text-amber-300 font-extrabold bg-amber-500/20 px-2.5 py-0.5 rounded-md border border-amber-400/40">
                        <span>Ver Platos</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section Dishes Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
            <div>
              <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                <span>
                  {selectedSection
                    ? sections.find((s) => s.number === selectedSection)?.title
                    : searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : 'Todos los Platos de la Carta'}
                </span>
                {selectedSubCategory && (
                  <span className="text-amber-400 font-bold text-sm">
                    / {selectedSubCategory}
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-400">
                Toca cualquier plato para ver foto ampliada, elegir entrada o añadir a tu pedido
              </p>
            </div>

            {selectedSection && (
              <button
                onClick={() => {
                  setSelectedSection(null);
                  setSelectedSubCategory(null);
                }}
                className="text-xs text-amber-400 hover:underline font-bold"
              >
                ← Ver todas las {sections.length} cartas
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#171113] rounded-3xl border border-gray-800 p-8 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                <Flame className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">No encontramos platos con ese criterio</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Prueba buscando por otro código o haz clic en "Ver todas las cartas".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSection(null);
                  setSelectedSubCategory(null);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow transition"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((dish) => {
                const countInCart = cart
                  .filter((it) => it.productId === dish.id)
                  .reduce((sum, it) => sum + it.quantity, 0);

                return (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onOpenDetail={(d) => setSelectedDishDetail(d)}
                    onQuickAdd={(d) => setSelectedDishDetail(d)}
                    inCartCount={countInCart}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Local Presentation & Official Flyer Banner */}
        <section className="bg-[#191114] rounded-3xl p-4 sm:p-6 border-2 border-amber-400/50 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-950 text-red-400 rounded-2xl border border-red-800 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-amber-400">
                  Visita Chifa Moralillos en Yurimaguas
                </h4>
                <p className="text-xs text-gray-300">
                  {chifaInfo.address} • Atención en salón amplio y delivery rápido
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:${chifaInfo.mobile.replace(/\s+/g, '')}`}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar: {chifaInfo.mobile}</span>
              </a>
              <a
                href={`https://wa.me/${chifaInfo.whatsapp}?text=Hola%20Chifa%20Moralillos`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={chifaInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Grid with 1) Official Storefront Facade & 2) Official Flyer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Storefront Photo */}
            <div className="rounded-2xl overflow-hidden border border-amber-500/30 h-52 sm:h-64 relative group">
              <img
                src={chifaInfo.storeFrontImage}
                alt="Fachada iluminada del Chifa Moralillos"
                className="w-full h-full object-cover brightness-105 contrast-102 group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5">
                <p className="text-xs text-white font-medium bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-700">
                  🏮 <strong>Local en Yurimaguas:</strong> Calle Francisco Bardalez 701 (esquina principal).
                </p>
              </div>
            </div>

            {/* 2. Official Promo Flyer with Phones, Facebook, and Payment Badges */}
            <div className="rounded-2xl overflow-hidden border border-amber-500/30 h-52 sm:h-64 relative group bg-black">
              <img
                src={chifaInfo.promoBannerImage}
                alt="Afiche oficial de atención Chifa Moralillos"
                className="w-full h-full object-contain bg-black group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                <p className="text-xs text-amber-300 font-bold bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-500/40">
                  💳 <strong>Medios de Pago:</strong> Aceptamos Yape, Plin y todas las tarjetas. Fijo: {chifaInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Cart Bar for Tablet & Desktop */}
      {cartCount > 0 && (
        <div className="hidden md:block fixed bottom-6 right-6 z-40 max-w-sm animate-in slide-in-from-bottom-5">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-amber-400/50 transform active:scale-98 transition glow-wok"
          >
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-black/40 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-amber-200 uppercase font-bold tracking-wider leading-none">
                  Mi Pedido ({cartCount} {cartCount === 1 ? 'plato' : 'platos'})
                </span>
                <span className="text-xs text-gray-200 font-medium">Chifa Moralillos</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-black font-mono text-amber-300 leading-none">
                S/. {cartTotal.toFixed(2)}
              </span>
              <span className="block text-[10px] text-white/90 font-bold underline mt-0.5">
                Procesar →
              </span>
            </div>
          </button>
        </div>
      )}

      {/* MOBILE APP DOCK (Fijo en celulares, idéntico a una app de delivery) */}
      <MobileAppDock
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedSection={selectedSection}
        onSelectSection={(secNum) => {
          setSelectedSection(secNum);
          setSelectedSubCategory(null);
          scrollToMenu();
        }}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-30 p-3 rounded-full bg-[#201518] hover:bg-amber-500 hover:text-black border border-gray-700 text-amber-400 shadow-xl transition-all"
          title="Subir al inicio"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        onAddToCart={handleAddToCart}
        cart={cart}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        sections={sections}
        onSelectCategory={(catId) => {
          const matchSec = sections.find((s) =>
            s.id === catId ||
            s.number.toString() === catId ||
            s.subcategories.some((sub) => sub.toLowerCase().includes(catId.toLowerCase()))
          );
          if (matchSec) setSelectedSection(matchSec.number);
          scrollToMenu();
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        cartTotal={cartTotal}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => scrollToMenu()}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onOrderCompleted={handleOrderCompleted}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Order Success Tracker Modal */}
      <OrderSuccessModal
        order={recentOrderSuccess}
        onClose={() => setRecentOrderSuccess(null)}
        onNewOrder={() => {
          setRecentOrderSuccess(null);
          scrollToMenu();
        }}
      />

      {/* Quick Contact Modal (Llamada, WhatsApp, Facebook, Local) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onViewStorePhoto={() => setIsLocationModalOpen(true)}
      />

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#181215] rounded-3xl w-full max-w-lg p-5 sm:p-6 border border-red-900/60 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#2a1d21] text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-950 text-red-400 rounded-2xl border border-red-800">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Ubicación Chifa Moralillos</h3>
                <p className="text-xs text-amber-400 font-semibold">{CHIFA_INFO.address}</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-800 h-48 sm:h-56 relative">
              <img
                src={CHIFA_INFO.storeFrontImage}
                alt="Local Chifa Moralillos"
                className="w-full h-full object-cover brightness-105 contrast-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <p className="font-bold">Calle Francisco Bardalez N° 701, Yurimaguas</p>
                <p className="text-gray-300 text-[11px]">Salón de atención & punto de despacho delivery</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between p-2 bg-[#201518] rounded-xl border border-gray-800">
                <span className="text-gray-400">Horario de Atención:</span>
                <span className="font-bold text-amber-300">11:30 AM a 10:30 PM (Lunes a Domingo)</span>
              </div>
              <div className="flex justify-between p-2 bg-[#201518] rounded-xl border border-gray-800">
                <span className="text-gray-400">Celular / WhatsApp:</span>
                <span className="font-mono font-bold text-white">{CHIFA_INFO.mobile}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#201518] rounded-xl border border-gray-800">
                <span className="text-gray-400">Teléfono Fijo:</span>
                <span className="font-mono font-bold text-white">{CHIFA_INFO.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${CHIFA_INFO.mobile.replace(/\s+/g, '')}`}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar Ahora</span>
              </a>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="py-3 px-5 bg-[#251a1d] hover:bg-[#322327] text-gray-300 text-xs font-bold rounded-xl border border-gray-800 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        sections={sections}
        onUpdateSection={handleUpdateSection}
        onAddSection={handleAddSection}
        onDeleteSection={handleDeleteSection}
        onResetSections={handleResetSections}
        onUpdateSectionImage={handleUpdateSectionImage}
        chifaInfo={chifaInfo}
        onUpdateChifaInfo={handleUpdateChifaInfo}
        onAddOrder={handleAddManualOrder}
        onRefreshOrders={fetchServerData}
        isServerConnected={isServerConnected}
        lastSyncTime={lastSyncTime}
      />

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={() => {
          setSelectedSection(null);
          scrollToMenu();
        }}
      />
    </div>
  );
}
