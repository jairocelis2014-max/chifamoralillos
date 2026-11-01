import React, { useState } from 'react';
import { X, Bike, Store, Armchair, Check, AlertCircle, Phone, MessageCircle, QrCode, Upload, DollarSign, ArrowLeft } from 'lucide-react';
import { CartItem, ServiceType, PaymentMethod, Order } from '../types';
import { CHIFA_INFO } from '../data/chifaMenu';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onOrderCompleted: (order: Order) => void;
  onBackToCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onOrderCompleted,
  onBackToCart,
}) => {
  if (!isOpen) return null;

  const [serviceType, setServiceType] = useState<ServiceType>('delivery');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Efectivo');
  const [paymentChangeWith, setPaymentChangeWith] = useState('');
  const [voucherNumber, setVoucherNumber] = useState('');
  const [proofImageName, setProofImageName] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImageName(e.target.files[0].name);
    }
  };

  const handleProcessOrder = (sendViaWhatsApp: boolean = true) => {
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Por favor ingresa tu Nombre completo.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 6) {
      setErrorMessage('Por favor ingresa un número de teléfono / WhatsApp válido.');
      return;
    }
    if (!addressOrTable.trim()) {
      const fieldDesc =
        serviceType === 'delivery'
          ? 'la Dirección de Entrega y Referencia'
          : serviceType === 'pickup'
          ? 'la Hora estimada de recojo'
          : 'el Número de Mesa';
      setErrorMessage(`Por favor completa ${fieldDesc}.`);
      return;
    }

    const orderId = `MORALILLO-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceType,
      addressOrTable: addressOrTable.trim(),
      paymentMethod,
      paymentVoucher: voucherNumber.trim() || undefined,
      paymentChangeWith: paymentChangeWith.trim() || undefined,
      notes: notes.trim() || undefined,
      items: cart,
      subtotal: cartTotal,
      deliveryFee: 0,
      total: cartTotal,
      status: 'Pendiente',
    };

    // Format WhatsApp message
    const itemsList = cart
      .map((item) => {
        let details = '';
        if (item.selectedEntrance) details += `\n   ↳ 🥟 Entrada: ${item.selectedEntrance}`;
        if (item.serviceModality) details += `\n   ↳ 📦 Modalidad: ${item.serviceModality}`;
        if (item.notes) details += `\n   ↳ 💬 Nota: ${item.notes}`;
        return `• *${item.code} - ${item.name}* (x${item.quantity}) = S/. ${(item.price * item.quantity).toFixed(2)}${details}`;
      })
      .join('\n');

    const serviceHeader =
      serviceType === 'delivery'
        ? `🛵 *DELIVERY A DOMICILIO*\n📍 *Dirección:* ${addressOrTable.trim()}`
        : serviceType === 'pickup'
        ? `🛍️ *RECOJO EN LOCAL*\n⏰ *Hora aprox:* ${addressOrTable.trim()}\n🏢 *Chifa Moralillos:* Francisco Bardalez 701`
        : `🍽️ *ATENCIÓN EN MESA LOCAL*\n🪑 *Mesa:* ${addressOrTable.trim()}`;

    let paymentDetails = `💳 *Método de Pago:* ${paymentMethod}`;
    if (paymentMethod === 'Efectivo' && paymentChangeWith) {
      paymentDetails += ` (Paga con: S/. ${paymentChangeWith} para vuelto)`;
    } else if ((paymentMethod === 'Yape' || paymentMethod === 'Plin') && voucherNumber) {
      paymentDetails += ` (N° Operación: ${voucherNumber})`;
    }

    const message =
      `🥢 *NUEVO PEDIDO - CHIFA MORALILLOS* 🥢\n\n` +
      `🆔 *Código de Pedido:* ${orderId}\n` +
      `👤 *Cliente:* ${customerName.trim()}\n` +
      `📞 *Teléfono:* ${customerPhone.trim()}\n\n` +
      `${serviceHeader}\n\n` +
      `${paymentDetails}\n\n` +
      `📝 *PLATOS SOLICITADOS:*\n${itemsList}\n\n` +
      `💰 *TOTAL A PAGAR: S/. ${cartTotal.toFixed(2)}*\n` +
      (notes ? `\n💬 *Observaciones generales:* ${notes.trim()}\n` : '\n') +
      `🐉 *¡Muchas gracias por su preferencia!* 🔥`;

    if (sendViaWhatsApp) {
      const whatsappUrl = `https://wa.me/${CHIFA_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    onOrderCompleted(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#181114] rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[94vh] flex flex-col overflow-hidden border border-red-900/60 shadow-2xl relative my-auto animate-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="p-4 bg-[#201518] border-b border-gray-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToCart}
              className="p-1 rounded-lg bg-[#2a1c21] text-gray-400 hover:text-white"
              title="Volver al carrito"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h3 className="font-extrabold text-amber-400 text-sm sm:text-base">
              Completar Pedido - Chifa Moralillos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#2a1c21] text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4 text-xs">
          {errorMessage && (
            <div className="bg-red-950/90 border border-red-700 text-red-200 p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Modalidad de Servicio */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">
              1. ¿Cómo deseas recibir tu pedido?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'delivery' as ServiceType, label: 'Delivery', icon: <Bike className="w-4 h-4" /> },
                { id: 'pickup' as ServiceType, label: 'Recoger', icon: <Store className="w-4 h-4" /> },
                { id: 'dinein' as ServiceType, label: 'En Mesa', icon: <Armchair className="w-4 h-4" /> },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceType(s.id)}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    serviceType === s.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow'
                      : 'bg-[#221619] border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className={serviceType === s.id ? 'text-amber-400' : 'text-gray-400'}>
                    {s.icon}
                  </span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Ubicación / Dirección / Mesa */}
          <div>
            <label className="block text-gray-200 font-bold mb-1">
              {serviceType === 'delivery' && '📍 Dirección y Referencia en Yurimaguas:'}
              {serviceType === 'pickup' && '⏰ Hora aproximada de recojo en local:'}
              {serviceType === 'dinein' && '🪑 Número de Mesa en el Chifa:'}
            </label>
            <input
              type="text"
              required
              placeholder={
                serviceType === 'delivery'
                  ? 'Ej: Calle Comercio N° 420 (frente al parque)'
                  : serviceType === 'pickup'
                  ? 'Ej: En 25 minutos (8:00 pm)'
                  : 'Ej: Mesa N° 06'
              }
              value={addressOrTable}
              onChange={(e) => setAddressOrTable(e.target.value)}
              className="w-full bg-[#1b1215] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          {/* 3. Datos del Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Nombre y Apellido:</label>
              <input
                type="text"
                required
                placeholder="Ej: Carlos Celis"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Teléfono / WhatsApp:</label>
              <input
                type="tel"
                required
                placeholder="Ej: 941428121"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* 4. Método de Pago */}
          <div>
            <label className="block text-gray-200 font-bold mb-2">
              4. Forma de Pago:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Efectivo' as PaymentMethod, label: '💵 Efectivo' },
                { id: 'Yape' as PaymentMethod, label: '🟣 Yape' },
                { id: 'Plin' as PaymentMethod, label: '🔵 Plin' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-2.5 rounded-xl border text-center transition flex items-center justify-center gap-1 text-xs font-bold ${
                    paymentMethod === m.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow'
                      : 'bg-[#221619] border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Efectivo Options */}
            {paymentMethod === 'Efectivo' && (
              <div className="mt-3 p-3 bg-emerald-950/40 rounded-xl border border-emerald-600/40 space-y-2">
                <p className="text-emerald-300 font-bold">
                  💵 Pago en efectivo al momento de recibir
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 shrink-0">¿Necesitas vuelto de:</span>
                  <input
                    type="text"
                    placeholder="Ej: S/ 50 o S/ 100"
                    value={paymentChangeWith}
                    onChange={(e) => setPaymentChangeWith(e.target.value)}
                    className="w-full bg-[#171012] text-white px-2.5 py-1 rounded-lg border border-emerald-800 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Yape / Plin QR & Details */}
            {(paymentMethod === 'Yape' || paymentMethod === 'Plin') && (
              <div className="mt-3 p-4 bg-purple-950/40 rounded-2xl border border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between gap-3 border-b border-purple-900/60 pb-3">
                  <div className="space-y-1">
                    <p className="text-purple-300 font-black text-xs flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-purple-400" />
                      <span>{paymentMethod === 'Yape' ? '🟣 Paga con Yape' : '🔵 Paga con Plin'}</span>
                    </p>
                    <p className="text-white">
                      Titular: <strong className="text-amber-400">{CHIFA_INFO.paymentHolder}</strong>
                    </p>
                    <p className="text-gray-300 font-mono text-sm">
                      Número: <strong className="text-white">{CHIFA_INFO.yapePlinNumber}</strong>
                    </p>
                  </div>

                  {/* QR Image */}
                  <div className="w-20 h-20 bg-white p-1 rounded-xl border-2 border-purple-400 shrink-0 shadow-md flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${CHIFA_INFO.yapePlinNumber}-${paymentMethod}-CHIFA-MORALILLOS`}
                      alt={`QR ${paymentMethod}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-1">
                      Número de Operación o Voucher:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 382910 o N° de constancia"
                      value={voucherNumber}
                      onChange={(e) => setVoucherNumber(e.target.value)}
                      className="w-full bg-[#1b1117] text-white p-2.5 rounded-xl border border-purple-800/80 focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-200 font-semibold mb-1">
                      Adjuntar Captura del Pago (Opcional):
                    </label>
                    <div className="relative border border-dashed border-purple-700/80 hover:border-purple-400 rounded-xl p-2.5 text-center bg-[#1b1117] cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-2 text-gray-300 text-[11px]">
                        <Upload className="w-4 h-4 text-purple-400" />
                        <span className="truncate">
                          {proofImageName || 'Subir foto o captura del voucher'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. Observaciones Generales */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Observaciones adicionales para el pedido:
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Tocar el timbre blanco, ají picante adicional, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1b1215] text-white p-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Summary Box */}
          <div className="bg-[#24171a] p-3.5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase block">
                Total del Pedido
              </span>
              <span className="text-xl font-black text-amber-400 font-mono">
                S/. {cartTotal.toFixed(2)}
              </span>
            </div>
            <span className="text-gray-400 text-xs font-semibold">
              {cart.reduce((a, b) => a + b.quantity, 0)} platos en orden
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleProcessOrder(true)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition active:scale-98"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Enviar Pedido por WhatsApp Oficial</span>
            </button>

            <div className="flex gap-2">
              <a
                href={`tel:${CHIFA_INFO.mobile.replace(/\s+/g, '')}`}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar al Chifa</span>
              </a>

              <button
                type="button"
                onClick={() => handleProcessOrder(false)}
                className="flex-1 py-3 bg-[#2a1d21] hover:bg-[#38262b] text-gray-200 font-bold text-xs rounded-xl border border-gray-700 transition"
              >
                Confirmar sin WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
