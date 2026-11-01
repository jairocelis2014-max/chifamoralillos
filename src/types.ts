import { MenuItem } from './data/chifaMenu';

export interface CartItem {
  id: string; // unique item id + options
  productId: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
  selectedEntrance?: 'Sopa Wantán' | 'Wantán Frito';
  serviceModality?: 'Llevar' | 'Servir';
  notes?: string;
}

export type ServiceType = 'delivery' | 'pickup' | 'dinein';

export type PaymentMethod = 'Efectivo' | 'Yape' | 'Plin';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  serviceType: ServiceType;
  addressOrTable: string;
  paymentMethod: PaymentMethod;
  paymentVoucher?: string;
  paymentChangeWith?: string; // For cash change, e.g., "Paga con billete de S/ 50"
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pendiente' | 'En cocina al wok' | 'En camino' | 'Entregado' | 'Cancelado';
}
