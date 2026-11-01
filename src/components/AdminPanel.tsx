import React, { useState, useMemo, useRef } from 'react';
import { 
  X, ShieldCheck, BarChart3, ListOrdered, Package, Plus, Trash2, Edit3, Check, 
  Phone, MessageCircle, LogOut, DollarSign, RotateCcw, Upload, Image as ImageIcon, 
  Eye, Settings, TrendingUp, ShoppingBag, Bike, Store, Armchair, AlertCircle, 
  ArrowUpRight, Layers, FolderPlus, HelpCircle
} from 'lucide-react';
import { MenuItem, MenuSection, MENU_SECTIONS, CHIFA_INFO } from '../data/chifaMenu';
import { Order } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLogin: (user: string, pass: string) => boolean;
  onLogout: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder?: (orderId: string) => void;
  products: MenuItem[];
  onUpdateProduct: (product: MenuItem) => void;
  onAddProduct: (product: MenuItem) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  sections?: MenuSection[];
  onUpdateSection?: (section: MenuSection) => void;
  onAddSection?: (section: MenuSection) => void;
  onDeleteSection?: (sectionNumber: number) => void;
  onResetSections?: () => void;
  onUpdateSectionImage?: (sectionNumber: number, imageUrl: string) => void;
  chifaInfo?: typeof CHIFA_INFO;
  onUpdateChifaInfo?: (newInfo: typeof CHIFA_INFO) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetProducts,
  sections = MENU_SECTIONS,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  onResetSections,
  onUpdateSectionImage,
  chifaInfo = CHIFA_INFO,
  onUpdateChifaInfo,
}) => {
  if (!isOpen) return null;

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'reports' | 'orders' | 'products' | 'sections' | 'settings'>('reports');
  const [reportFilter, setReportFilter] = useState<'diario' | 'semanal' | 'mensual' | 'todo'>('diario');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('todos');

  // Product editing modal state
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    sectionNumber: 2,
    categoryId: 'chaufa',
    subCategory: '',
    price: '',
    takeawayPrice: '',
    description: '',
    image: '',
    available: true,
  });

  const [productSearch, setProductSearch] = useState('');
  const [productSectionFilter, setProductSectionFilter] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Section CRUD Modal state
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<MenuSection | null>(null);
  const [sectionForm, setSectionForm] = useState({
    number: 1,
    id: '',
    title: '',
    shortTitle: '',
    shortName: '',
    badge: '',
    description: '',
    image: '',
    subcategories: '',
  });
  const sectionFileInputRef = useRef<HTMLInputElement>(null);
  const [activeSectionToUpload, setActiveSectionToUpload] = useState<number | null>(null);

  // Business settings state
  const [settingsForm, setSettingsForm] = useState({
    name: chifaInfo.name,
    slogan: chifaInfo.slogan,
    address: chifaInfo.address,
    mobile: chifaInfo.mobile,
    phone: chifaInfo.phone,
    whatsapp: chifaInfo.whatsapp,
    yapePlinNumber: chifaInfo.yapePlinNumber,
    paymentHolder: chifaInfo.paymentHolder,
    hours: chifaInfo.hours,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = onLogin(username, password);
    if (!success) {
      setLoginError('Credenciales incorrectas. (Usar: admin / admin)');
    }
  };

  // Filtered orders for reports
  const filteredOrdersForReport = useMemo(() => {
    const now = new Date();
    return orders.filter((o) => {
      const orderDate = new Date(o.createdAt);
      if (reportFilter === 'diario') {
        return orderDate.toDateString() === now.toDateString();
      }
      if (reportFilter === 'semanal') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      }
      if (reportFilter === 'mensual') {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [orders, reportFilter]);

  const totalSales = useMemo(() => {
    return filteredOrdersForReport
      .filter((o) => o.status !== 'Cancelado')
      .reduce((sum, o) => sum + o.total, 0);
  }, [filteredOrdersForReport]);

  // Indicadores de ventas de platos (Top selling dishes)
  const topSellingDishes = useMemo(() => {
    const counts: Record<string, { name: string; code: string; quantity: number; revenue: number }> = {};
    orders
      .filter((o) => o.status !== 'Cancelado')
      .forEach((order) => {
        order.items.forEach((item) => {
          if (!counts[item.productId]) {
            counts[item.productId] = {
              name: item.name,
              code: item.code || item.productId,
              quantity: 0,
              revenue: 0,
            };
          }
          counts[item.productId].quantity += item.quantity;
          counts[item.productId].revenue += item.price * item.quantity;
        });
      });

    return Object.values(counts).sort((a, b) => b.quantity - a.quantity);
  }, [orders]);

  // Sales by service modality
  const salesByModality = useMemo(() => {
    const data = { delivery: 0, takeaway: 0, salon: 0 };
    filteredOrdersForReport
      .filter((o) => o.status !== 'Cancelado')
      .forEach((o) => {
        if (o.serviceType === 'delivery') data.delivery += o.total;
        else if (o.serviceType === 'pickup') data.takeaway += o.total;
        else data.salon += o.total;
      });
    return data;
  }, [filteredOrdersForReport]);

  // Sales by payment method
  const salesByPayment = useMemo(() => {
    const data: Record<string, number> = {};
    filteredOrdersForReport
      .filter((o) => o.status !== 'Cancelado')
      .forEach((o) => {
        const method = o.paymentMethod || 'Efectivo';
        data[method] = (data[method] || 0) + o.total;
      });
    return data;
  }, [filteredOrdersForReport]);

  // Pending / active orders count
  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Pendiente' || o.status === 'En cocina al wok' || o.status === 'En camino').length;
  }, [orders]);

  // Filtered orders for live orders list
  const filteredOrders = useMemo(() => {
    if (orderStatusFilter === 'todos') return orders;
    return orders.filter((o) => o.status === orderStatusFilter);
  }, [orders, orderStatusFilter]);

  // Filtered products list for product management
  const filteredProductsList = useMemo(() => {
    return products.filter((p) => {
      if (productSectionFilter !== null && p.sectionNumber !== productSectionFilter) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [products, productSectionFilter, productSearch]);

  // File Upload Handlers (FileReader -> Base64 Data URL)
  const handleProductImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProductForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && activeSectionToUpload !== null) {
          if (onUpdateSectionImage) {
            onUpdateSectionImage(activeSectionToUpload, reader.result as string);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionModalImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSectionForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Product CRUD
  const handleOpenEditProduct = (prod: MenuItem) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.name,
      sectionNumber: prod.sectionNumber || 1,
      categoryId: prod.categoryId || 'sec_1',
      subCategory: prod.subCategory || '',
      price: prod.price.toString(),
      takeawayPrice: prod.takeawayPrice ? prod.takeawayPrice.toString() : '',
      description: prod.description || '',
      image: prod.image,
      available: prod.available ?? true,
    });
    setShowProductModal(true);
  };

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    const nextCode = `P${products.length + 1}`;
    setProductForm({
      id: nextCode,
      name: '',
      sectionNumber: 2,
      categoryId: 'chaufa',
      subCategory: 'Chaufas',
      price: '22.00',
      takeawayPrice: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
      available: true,
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const parsedPrice = parseFloat(productForm.price) || 0;
    const parsedTakeaway = productForm.takeawayPrice ? parseFloat(productForm.takeawayPrice) : undefined;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        id: productForm.id || editingProduct.id,
        name: productForm.name,
        sectionNumber: productForm.sectionNumber,
        categoryId: productForm.categoryId,
        subCategory: productForm.subCategory || undefined,
        price: parsedPrice,
        takeawayPrice: parsedTakeaway,
        description: productForm.description,
        image: productForm.image || editingProduct.image,
        available: productForm.available,
      });
    } else {
      onAddProduct({
        id: productForm.id,
        name: productForm.name,
        sectionNumber: productForm.sectionNumber,
        categoryId: productForm.categoryId,
        subCategory: productForm.subCategory || undefined,
        price: parsedPrice,
        takeawayPrice: parsedTakeaway,
        description: productForm.description,
        image:
          productForm.image ||
          'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        available: productForm.available,
      });
    }
    setShowProductModal(false);
  };

  // Section CRUD Handlers
  const handleOpenCreateSection = () => {
    setEditingSection(null);
    const nextNum = sections.length > 0 ? Math.max(...sections.map((s) => s.number)) + 1 : 1;
    setSectionForm({
      number: nextNum,
      id: `sec_${nextNum}`,
      title: `${nextNum}. Nueva Sección`,
      shortTitle: `${nextNum}. Nueva`,
      shortName: 'Nueva Sección',
      badge: 'Nuevo',
      description: 'Descripción de los platos de esta categoría',
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
      subcategories: 'Platos Principales, Guarniciones',
    });
    setShowSectionModal(true);
  };

  const handleOpenEditSection = (sec: MenuSection) => {
    setEditingSection(sec);
    setSectionForm({
      number: sec.number,
      id: sec.id,
      title: sec.title,
      shortTitle: sec.shortTitle || sec.title,
      shortName: sec.shortName || sec.title,
      badge: sec.badge || '',
      description: sec.description || '',
      image: sec.image,
      subcategories: (sec.subcategories || []).join(', '),
    });
    setShowSectionModal(true);
  };

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionForm.title.trim()) return;

    const subcats = sectionForm.subcategories
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedSectionData: MenuSection = {
      number: Number(sectionForm.number) || (editingSection ? editingSection.number : sections.length + 1),
      id: sectionForm.id || (editingSection ? editingSection.id : `sec_${sectionForm.number}`),
      title: sectionForm.title.trim(),
      shortTitle: sectionForm.shortTitle.trim() || sectionForm.title.trim(),
      shortName: sectionForm.shortName.trim() || sectionForm.title.trim(),
      badge: sectionForm.badge.trim() || undefined,
      description: sectionForm.description.trim(),
      image: sectionForm.image || 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
      subcategories: subcats.length > 0 ? subcats : ['General'],
      iconName: editingSection ? editingSection.iconName : 'Flame',
    };

    if (editingSection) {
      if (onUpdateSection) {
        onUpdateSection(updatedSectionData);
      }
    } else {
      if (onAddSection) {
        onAddSection(updatedSectionData);
      }
    }
    setShowSectionModal(false);
  };

  const handleDeleteSectionClick = (sectionNumber: number) => {
    const sec = sections.find((s) => s.number === sectionNumber);
    if (!sec) return;
    if (window.confirm(`¿Estás seguro de eliminar la sección "${sec.title}"?`)) {
      if (onDeleteSection) {
        onDeleteSection(sectionNumber);
      }
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateChifaInfo) {
      onUpdateChifaInfo({
        ...chifaInfo,
        ...settingsForm,
      });
    }
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#170f12] rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden border border-amber-500/40 shadow-2xl relative my-auto">
        
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-4 bg-[#201519] border-b border-gray-800 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                Panel de Administración - Chifa Moralillos
              </h2>
              <span className="text-[11px] text-amber-400 font-bold block">
                {isAdminLoggedIn ? 'Control y Gestión Total del Sistema' : 'Acceso Restringido'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <>
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold rounded-xl transition active:scale-95"
                  title="Ver Carta Digital"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ver Carta Digital</span>
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold rounded-xl transition active:scale-95"
                  title="Cerrar sesión administrativa"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#2a1d21] text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In View */}
        {!isAdminLoggedIn ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto w-full space-y-5 my-auto">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white pt-2">Acceso Administrativo</h3>
              <p className="text-xs text-gray-400">
                Gestiona pedidos en vivo, sube fotos de platos, administra secciones y revisa indicadores.
              </p>
            </div>

            {loginError && (
              <div className="bg-red-950/80 border border-red-700 text-red-300 text-xs p-3 rounded-xl text-center font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Usuario:</label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1b1215] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Contraseña:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1b1215] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <div className="bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/50 text-[11px] text-amber-300 text-center font-semibold">
                🔑 Credenciales por defecto: <strong>admin</strong> / <strong>admin</strong>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl shadow-lg transition active:scale-98"
              >
                Ingresar al Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD - 100% ADMINISTRABLE CON NAVEGACIÓN TOTALMENTE LEGIBLE */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs Bar - High Visibility & Generous Padding */}
            <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-[#1c1216] border-b border-gray-800 overflow-x-auto no-scrollbar shrink-0">
              {/* Tab 1: Dashboard / Ventas */}
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-xs transition shrink-0 shadow-sm ${
                  activeTab === 'reports'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-amber-500/30'
                    : 'bg-[#26181e] text-gray-200 hover:text-white hover:bg-[#34222a] border border-gray-700/60'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap font-bold">Dashboard / Ventas</span>
              </button>

              {/* Tab 2: Pedidos en Vivo con badge */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-xs transition shrink-0 shadow-sm ${
                  activeTab === 'orders'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-amber-500/30'
                    : 'bg-[#26181e] text-gray-200 hover:text-white hover:bg-[#34222a] border border-gray-700/60'
                }`}
              >
                <ListOrdered className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap font-bold">Pedidos en Vivo</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  pendingOrdersCount > 0 ? 'bg-red-600 text-white animate-pulse' : 'bg-black/60 text-gray-300'
                }`}>
                  {pendingOrdersCount}
                </span>
              </button>

              {/* Tab 3: Gestión de Platos */}
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-xs transition shrink-0 shadow-sm ${
                  activeTab === 'products'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-amber-500/30'
                    : 'bg-[#26181e] text-gray-200 hover:text-white hover:bg-[#34222a] border border-gray-700/60'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap font-bold">Gestión de Platos</span>
              </button>

              {/* Tab 4: Gestión de Secciones (CRUD Total) */}
              <button
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-xs transition shrink-0 shadow-sm ${
                  activeTab === 'sections'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-amber-500/30'
                    : 'bg-[#26181e] text-gray-200 hover:text-white hover:bg-[#34222a] border border-gray-700/60'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap font-bold">Gestión de Secciones ({sections.length})</span>
              </button>

              {/* Tab 5: Configuración del Chifa */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-xs transition shrink-0 shadow-sm ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-amber-500/30'
                    : 'bg-[#26181e] text-gray-200 hover:text-white hover:bg-[#34222a] border border-gray-700/60'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap font-bold">Configuración Chifa</span>
              </button>
            </div>

            {/* ================= TAB 1: DASHBOARD / VENTAS & INDICADORES ================= */}
            {activeTab === 'reports' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="font-black text-white text-base flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span>Indicadores Financieros & Rendimiento</span>
                    </h3>
                    <p className="text-xs text-gray-400">Control de ventas, tickets y platos más pedidos</p>
                  </div>

                  {/* Filter Pills with Crisp Contrast */}
                  <div className="flex items-center gap-1.5 bg-[#25171b] p-1 rounded-xl border border-gray-700">
                    {(['diario', 'semanal', 'mensual', 'todo'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setReportFilter(mode)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                          reportFilter === mode
                            ? 'bg-amber-500 text-black font-black shadow'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {mode === 'diario'
                          ? 'Hoy'
                          : mode === 'semanal'
                          ? 'Semana'
                          : mode === 'mensual'
                          ? 'Mes'
                          : 'Todo'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#1f1518] p-4 rounded-2xl border border-amber-500/30 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">Ventas Totales</span>
                      <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black font-mono text-amber-400">
                      S/. {totalSales.toFixed(2)}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {filteredOrdersForReport.length} pedidos registrados
                    </p>
                  </div>

                  <div className="bg-[#1f1518] p-4 rounded-2xl border border-gray-800 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">Ticket Promedio</span>
                      <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black font-mono text-white">
                      S/. {filteredOrdersForReport.length > 0 ? (totalSales / filteredOrdersForReport.length).toFixed(2) : '0.00'}
                    </div>
                    <p className="text-[11px] text-gray-400">Por orden de cliente</p>
                  </div>

                  <div className="bg-[#1f1518] p-4 rounded-2xl border border-gray-800 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">Modalidad Delivery</span>
                      <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                        <Bike className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black font-mono text-white">
                      S/. {salesByModality.delivery.toFixed(2)}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {filteredOrdersForReport.filter((o) => o.serviceType === 'delivery').length} pedidos
                    </p>
                  </div>

                  <div className="bg-[#1f1518] p-4 rounded-2xl border border-gray-800 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">Platos en Carta</span>
                      <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
                        <Package className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black font-mono text-white">
                      {products.length} platos
                    </div>
                    <p className="text-[11px] text-gray-400">
                      En {sections.length} secciones administrables
                    </p>
                  </div>
                </div>

                {/* Ranking & Modalities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Top Selling Dishes with Progress Bars */}
                  <div className="lg:col-span-7 bg-[#1c1316] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-4 shadow-md">
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-400" />
                      <span>Platos Más Vendidos (Ranking por Demanda)</span>
                    </h4>

                    {topSellingDishes.length === 0 ? (
                      <p className="text-xs text-gray-400 py-6 text-center">
                        Aún no hay pedidos registrados para calcular el ranking de platos.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {topSellingDishes.slice(0, 6).map((dish, idx) => {
                          const maxQty = topSellingDishes[0]?.quantity || 1;
                          const pct = Math.round((dish.quantity / maxQty) * 100);
                          return (
                            <div key={dish.code} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-gray-200">
                                  #{idx + 1} {dish.name}
                                </span>
                                <span className="text-amber-400 font-mono font-bold">
                                  {dish.quantity} porciones (S/. {dish.revenue.toFixed(2)})
                                </span>
                              </div>
                              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-red-600 to-amber-400 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Payment & Channels Breakdown */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-[#1c1316] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-3 shadow-md">
                      <h4 className="font-extrabold text-white text-sm">Ventas por Método de Pago</h4>
                      <div className="space-y-2 text-xs">
                        {Object.entries(salesByPayment).map(([method, amount]) => (
                          <div key={method} className="flex justify-between p-2 bg-[#23181b] rounded-xl border border-gray-800">
                            <span className="font-bold text-gray-300">{method}:</span>
                            <span className="font-mono font-bold text-amber-400">S/. {amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#1c1316] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-3 shadow-md">
                      <h4 className="font-extrabold text-white text-sm">Canales de Atención</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 bg-[#23181b] rounded-xl border border-gray-800">
                          <span className="text-gray-300">🛵 Delivery a Domicilio:</span>
                          <span className="font-mono font-bold text-white">S/. {salesByModality.delivery.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-[#23181b] rounded-xl border border-gray-800">
                          <span className="text-gray-300">🛍️ Para Llevar (Pick-up):</span>
                          <span className="font-mono font-bold text-white">S/. {salesByModality.takeaway.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-[#23181b] rounded-xl border border-gray-800">
                          <span className="text-gray-300">🍽️ Atención en Mesa / Salón:</span>
                          <span className="font-mono font-bold text-white">S/. {salesByModality.salon.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: PEDIDOS EN VIVO ================= */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="font-black text-white text-base flex items-center gap-2">
                      <ListOrdered className="w-5 h-5 text-amber-400" />
                      <span>Gestión de Pedidos en Tiempo Real</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Actualiza el estado de preparación, notifica al cliente o archiva
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#25171b] p-1 rounded-xl border border-gray-800 text-xs overflow-x-auto no-scrollbar">
                    {['todos', 'Pendiente', 'En cocina al wok', 'En camino', 'Entregado'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                          orderStatusFilter === st
                            ? 'bg-amber-500 text-black font-black shadow'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="py-16 text-center text-gray-400 space-y-2">
                    <ListOrdered className="w-10 h-10 mx-auto text-gray-600" />
                    <p className="text-sm font-bold text-gray-300">No hay pedidos con este estado</p>
                    <p className="text-xs">Los nuevos pedidos de clientes aparecerán aquí automáticamente.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-[#1c1316] rounded-2xl p-4 border border-gray-800 hover:border-gray-700 transition space-y-3 shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs font-black bg-black/60 px-2 py-1 rounded border border-gray-700 text-amber-400">
                              {order.id}
                            </span>
                            <span className="font-bold text-white text-sm">{order.customerName}</span>
                            <span className="text-xs text-gray-400 font-mono">
                              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-amber-400 text-sm">
                              S/. {order.total.toFixed(2)}
                            </span>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-[#150d10] p-3 rounded-xl border border-gray-800/60 space-y-1.5 text-xs">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-gray-300">
                              <span>
                                <strong className="text-amber-400">{it.quantity}x</strong> {it.name}
                                {it.selectedEntrance && ` (${it.selectedEntrance})`}
                              </span>
                              <span className="font-mono text-gray-400">S/. {(it.price * it.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Order Address / Contact / Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs text-gray-300">
                          <div>
                            <span className="text-gray-400">Dirección / Teléfono: </span>
                            <strong className="text-white">{order.addressOrTable}</strong> • Tel: {order.customerPhone}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* WhatsApp Notification */}
                            <a
                              href={`https://wa.me/51${order.customerPhone}?text=Hola%20${encodeURIComponent(
                                order.customerName
                              )},%20te%20escribimos%20de%20Chifa%20Moralillos%20sobre%20tu%20pedido%20${order.id}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-bold rounded-xl flex items-center gap-1 border border-[#25D366]/30 transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Status Selector */}
                            <select
                              value={order.status}
                              onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="bg-[#24171a] text-white text-xs font-bold p-1.5 rounded-xl border border-gray-700 focus:outline-none focus:border-amber-400"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En cocina al wok">En cocina al wok</option>
                              <option value="En camino">En camino</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>

                            {onDeleteOrder && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`¿Eliminar o archivar el pedido ${order.id}?`)) {
                                    onDeleteOrder(order.id);
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg bg-[#24171a] hover:bg-red-950 transition"
                                title="Eliminar pedido"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: GESTIÓN DE PLATOS ================= */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="font-black text-white text-base flex items-center gap-2">
                      <Package className="w-5 h-5 text-amber-400" />
                      <span>Gestión de Platos & Precios</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Modifica nombres, precios, fotos desde tu dispositivo y disponibilidad
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onResetProducts}
                      className="px-3 py-2 bg-[#26171b] hover:bg-[#342025] text-gray-300 hover:text-white text-xs font-bold rounded-xl border border-gray-700 flex items-center gap-1.5 transition"
                      title="Restablecer menú original"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restablecer</span>
                    </button>

                    <button
                      onClick={handleOpenCreateProduct}
                      className="px-4 py-2 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Agregar Nuevo Plato</span>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Buscar plato para editar..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="bg-[#1b1215] text-xs text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400"
                  />

                  <select
                    value={productSectionFilter === null ? '' : productSectionFilter}
                    onChange={(e) => setProductSectionFilter(e.target.value === '' ? null : Number(e.target.value))}
                    className="bg-[#1b1215] text-xs text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Todas las {sections.length} Secciones</option>
                    {sections.map((sec) => (
                      <option key={sec.number} value={sec.number}>
                        Sección {sec.number}: {sec.shortTitle || sec.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProductsList.map((prod) => (
                    <div
                      key={prod.id}
                      className={`bg-[#1c1215] p-3 rounded-2xl border transition flex items-center gap-3 relative ${
                        prod.available === false
                          ? 'border-red-950/60 opacity-60'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-gray-800 relative">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <span className="font-mono text-[10px] font-black text-amber-400 block leading-tight">
                          {prod.id}
                        </span>
                        <h4 className="font-bold text-white text-xs truncate">{prod.name}</h4>
                        <span className="font-mono font-black text-amber-300 text-xs">
                          S/. {prod.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-gray-300 hover:text-amber-400 rounded-lg bg-[#25171a] hover:bg-[#321e23] transition"
                          title="Editar plato"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Eliminar ${prod.name}?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg bg-[#25171a] hover:bg-red-950 transition"
                          title="Eliminar plato"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 4: GESTIÓN DE SECCIONES (100% ADMINISTRABLE / CRUD TOTAL) ================= */}
            {activeTab === 'sections' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="font-black text-white text-base flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-400" />
                      <span>Gestión de Secciones & Categorías (CRUD Total)</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Modifica títulos, subtítulos, etiquetas badge, imágenes de fondo y crea nuevas secciones
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {onResetSections && (
                      <button
                        onClick={() => {
                          if (window.confirm('¿Deseas restablecer las 7 secciones originales del Menú Chifa Moralillos?')) {
                            onResetSections();
                          }
                        }}
                        className="px-3 py-2 bg-[#26171b] hover:bg-[#342025] text-gray-300 hover:text-white text-xs font-bold rounded-xl border border-gray-700 flex items-center gap-1.5 transition"
                        title="Restablecer secciones originales"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restablecer 7 Secciones</span>
                      </button>
                    )}

                    <button
                      onClick={handleOpenCreateSection}
                      className="px-4 py-2 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition active:scale-95"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>+ Crear Nueva Sección</span>
                    </button>
                  </div>
                </div>

                {/* Hidden file input for quick direct upload */}
                <input
                  type="file"
                  ref={sectionFileInputRef}
                  accept="image/*"
                  onChange={handleSectionImageFile}
                  className="hidden"
                />

                {/* Sections List Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((sec) => {
                    const dishCount = products.filter((p) => p.sectionNumber === sec.number).length;
                    return (
                      <div
                        key={sec.id}
                        className="bg-[#1c1216] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg"
                      >
                        {/* Section Header with background image preview */}
                        <div className="relative h-32 w-full bg-black">
                          <img
                            src={sec.image}
                            alt={sec.title}
                            className="w-full h-full object-cover brightness-[0.45]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1216] via-transparent to-black/60" />

                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="font-mono text-xs font-black text-amber-300 bg-black/80 px-2.5 py-0.5 rounded-lg border border-amber-500/40">
                              SECCIÓN {sec.number}
                            </span>
                            {sec.badge && (
                              <span className="bg-red-700 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                                {sec.badge}
                              </span>
                            )}
                          </div>

                          <div className="absolute bottom-2 left-3 right-3">
                            <h4 className="font-black text-white text-sm sm:text-base leading-tight drop-shadow">
                              {sec.title}
                            </h4>
                          </div>
                        </div>

                        {/* Section Details */}
                        <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-300 leading-relaxed">
                              {sec.description || 'Sin descripción'}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-1">
                              <span className="text-amber-400 font-bold">{dishCount} platos asociados</span>
                              <span>•</span>
                              <span>Subcategorías: {(sec.subcategories || []).join(', ')}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex items-center gap-2 border-t border-gray-800/80">
                            <button
                              onClick={() => handleOpenEditSection(sec)}
                              className="flex-1 py-2 px-3 bg-[#26171b] hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5 transition active:scale-95"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar Textos & Datos</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveSectionToUpload(sec.number);
                                sectionFileInputRef.current?.click();
                              }}
                              className="py-2 px-3 bg-[#26171b] hover:bg-[#342025] text-gray-200 text-xs font-bold rounded-xl border border-gray-700 flex items-center justify-center gap-1.5 transition active:scale-95"
                              title="Subir foto de fondo"
                            >
                              <Upload className="w-3.5 h-3.5 text-amber-400" />
                              <span>Subir Foto</span>
                            </button>

                            {sections.length > 1 && (
                              <button
                                onClick={() => handleDeleteSectionClick(sec.number)}
                                className="p-2 text-gray-400 hover:text-red-400 bg-[#26171b] hover:bg-red-950 rounded-xl border border-gray-800 transition"
                                title="Eliminar sección"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= TAB 5: CONFIGURACIÓN DEL CHIFA ================= */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                <div className="border-b border-gray-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-white text-base flex items-center gap-2">
                      <Settings className="w-5 h-5 text-amber-400" />
                      <span>Configuración General del Chifa</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Actualiza datos de contacto, horarios y cuentas de pago
                    </p>
                  </div>

                  {settingsSaved && (
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-xl animate-bounce">
                      ✓ ¡Guardado con éxito!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Nombre del Restaurante:</label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Eslogan / Sabor:</label>
                    <input
                      type="text"
                      value={settingsForm.slogan}
                      onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-300 font-semibold mb-1">Dirección Oficial en Yurimaguas:</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Celular / Llamada Directa:</label>
                    <input
                      type="text"
                      value={settingsForm.mobile}
                      onChange={(e) => setSettingsForm({ ...settingsForm, mobile: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Teléfono Fijo:</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Número de WhatsApp (con código 51):</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Número Yape / Plin:</label>
                    <input
                      type="text"
                      value={settingsForm.yapePlinNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, yapePlinNumber: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Titular de Cuenta Yape / Plin:</label>
                    <input
                      type="text"
                      value={settingsForm.paymentHolder}
                      onChange={(e) => setSettingsForm({ ...settingsForm, paymentHolder: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Horario de Atención:</label>
                    <input
                      type="text"
                      value={settingsForm.hours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                      className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition active:scale-95"
                    >
                      Guardar Configuración
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* MODAL CREAR / EDITAR PLATO (CON OPCIÓN SUBIR UPLOAD IMAGEN) */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-[#1c1215] rounded-3xl w-full max-w-lg p-5 border border-amber-500/40 shadow-2xl space-y-4 my-auto">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-extrabold text-white text-base">
                  {editingProduct ? 'Editar Plato / Subir Imagen' : 'Nuevo Plato'}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-1 rounded-full bg-[#2a1d21] text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
                {/* Image Upload Area with live preview */}
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-semibold">Foto del Plato:</label>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black border border-amber-500/40 shrink-0">
                      <img
                        src={productForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleProductImageFile}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Subir Imagen desde mi Dispositivo</span>
                      </button>
                      <input
                        type="url"
                        placeholder="O pega URL de imagen..."
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full bg-[#160e11] text-gray-300 p-2 rounded-xl border border-gray-800 text-[11px] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Código:</label>
                    <input
                      type="text"
                      required
                      value={productForm.id}
                      onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-300 font-semibold mb-1">Nombre del Plato:</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Sección:</label>
                    <select
                      value={productForm.sectionNumber}
                      onChange={(e) => setProductForm({ ...productForm, sectionNumber: Number(e.target.value) })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                    >
                      {sections.map((s) => (
                        <option key={s.number} value={s.number}>
                          {s.number}. {s.shortTitle || s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Subcategoría:</label>
                    <input
                      type="text"
                      placeholder="Ej: Chaufas, Tallarines, Sopas..."
                      value={productForm.subCategory}
                      onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Precio Servir / Normal (S/.):</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-mono font-bold text-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Precio Llevar (S/.):</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Opcional"
                      value={productForm.takeawayPrice}
                      onChange={(e) => setProductForm({ ...productForm, takeawayPrice: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Descripción del Plato:</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available-check"
                    checked={productForm.available}
                    onChange={(e) => setProductForm({ ...productForm, available: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-black border-gray-700"
                  />
                  <label htmlFor="available-check" className="text-gray-300 font-semibold cursor-pointer">
                    Plato disponible en la carta (desmarcar para marcar como "Agotado")
                  </label>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-800">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl transition"
                  >
                    {editingProduct ? 'Guardar Cambios' : 'Crear Plato'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL CREAR / EDITAR SECCIÓN (CRUD TOTAL DE SECCIONES) */}
        {showSectionModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-[#1c1215] rounded-3xl w-full max-w-lg p-5 border border-amber-500/40 shadow-2xl space-y-4 my-auto">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>{editingSection ? 'Modificar Textos & Datos de Sección' : 'Crear Nueva Sección'}</span>
                </h3>
                <button
                  onClick={() => setShowSectionModal(false)}
                  className="p-1 rounded-full bg-[#2a1d21] text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-3.5 text-xs">
                {/* Image Upload for Section */}
                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-semibold">Foto de Fondo de la Sección:</label>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-black border border-amber-500/40 shrink-0">
                      <img
                        src={sectionForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSectionModalImageFile}
                        className="text-[11px] text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-black hover:file:bg-amber-400 cursor-pointer"
                      />
                      <input
                        type="url"
                        placeholder="O pega URL de imagen..."
                        value={sectionForm.image}
                        onChange={(e) => setSectionForm({ ...sectionForm, image: e.target.value })}
                        className="w-full bg-[#160e11] text-gray-300 p-2 rounded-xl border border-gray-800 text-[11px] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">N° Sección:</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={sectionForm.number}
                      onChange={(e) => setSectionForm({ ...sectionForm, number: Number(e.target.value) })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-mono font-bold text-amber-400"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-gray-300 font-semibold mb-1">Título Principal:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 2. Chaufa y Tallarines"
                      value={sectionForm.title}
                      onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Título Corto (Botones):</label>
                    <input
                      type="text"
                      placeholder="Ej: 2. Chaufa & Tallarín"
                      value={sectionForm.shortTitle}
                      onChange={(e) => setSectionForm({ ...sectionForm, shortTitle: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Etiqueta Badge (Opcional):</label>
                    <input
                      type="text"
                      placeholder="Ej: Al Wok, Más Pedidos, Nuevo"
                      value={sectionForm.badge}
                      onChange={(e) => setSectionForm({ ...sectionForm, badge: e.target.value })}
                      className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Subtítulo / Descripción:</label>
                  <textarea
                    rows={2}
                    placeholder="Descripción que se muestra en la tarjeta de la sección..."
                    value={sectionForm.description}
                    onChange={(e) => setSectionForm({ ...sectionForm, description: e.target.value })}
                    className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Subcategorías (separadas por coma):</label>
                  <input
                    type="text"
                    placeholder="Ej: Chaufa, Tallarines, Aeropuertos..."
                    value={sectionForm.subcategories}
                    onChange={(e) => setSectionForm({ ...sectionForm, subcategories: e.target.value })}
                    className="w-full bg-[#160e11] text-white p-2.5 rounded-xl border border-gray-800"
                  />
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-800">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl transition"
                  >
                    {editingSection ? 'Guardar Cambios de Sección' : 'Crear Sección'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSectionModal(false)}
                    className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
