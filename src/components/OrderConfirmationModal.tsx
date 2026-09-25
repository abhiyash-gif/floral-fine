import { useState } from 'react';
import { Order } from '../types.ts';
import { Check, Copy, CheckCheck, Clock, MapPin, Calendar, HeartHandshake } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderConfirmationModal({ order, onClose }: OrderConfirmationModalProps) {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        className="w-full max-w-xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 p-6 sm:p-8 my-8 text-stone-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header confirmation icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1">
            Order Confirmed & In Assembly
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
            Thank you, {order.senderName}
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Our master florist has received your request and is selecting fresh morning stems for delivery to {order.recipientName}.
          </p>
        </div>

        {/* Order Identifier Box */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              Order Reference Number
            </div>
            <div className="text-base font-serif font-bold text-stone-900 tracking-wide">
              #{order.id}
            </div>
          </div>
          <button
            onClick={handleCopyId}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time Order Assembly Timeline */}
        <div className="mb-6 p-4 bg-stone-100/70 rounded-lg border border-stone-200/80">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3">
            Atelier Fulfillment Status
          </div>
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
            <div className="relative flex items-start">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                ✓
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-900 block">Order Placed & Scheduled</span>
                <span className="text-stone-500 text-[11px]">{order.createdAt} · Verified</span>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] animate-pulse">
                •
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-900 block">Florist Conditioning & Hand-Tie</span>
                <span className="text-stone-500 text-[11px]">Trimming stems & wrapping in botanical paper</span>
              </div>
            </div>

            <div className="relative flex items-start opacity-60">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center text-[10px]">
                3
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-900 block">Dispatched via Chilled Courier</span>
                <span className="text-stone-500 text-[11px]">{order.deliveryDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-2 mb-6 text-xs text-stone-600 bg-white p-4 rounded-lg border border-stone-200">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-stone-900">Destination Address:</span>
              <p>{order.recipientName} — {order.deliveryAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-stone-100">
            <Calendar className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-stone-900">Estimated Delivery:</span>
              <p>{order.deliveryDate}</p>
            </div>
          </div>

          {order.cardMessage && (
            <div className="flex items-start gap-2 pt-2 border-t border-stone-100">
              <HeartHandshake className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-stone-900">Pen-written Note:</span>
                <p className="italic font-serif text-stone-800 mt-0.5">"{order.cardMessage}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Ordered items breakdown */}
        <div className="border-t border-stone-200 pt-4 mb-6 text-xs space-y-2">
          <div className="flex justify-between text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
            <span>Bouquet Stems</span>
            <span>Subtotal</span>
          </div>
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center text-stone-800">
              <span>{it.quantity}x {it.name} ({it.sizeName})</span>
              <span className="font-mono tabular-nums">${it.price * it.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-serif text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
            <span>Total Paid (COD / Apple Pay on Arrival)</span>
            <span className="tabular-nums">${order.total}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold transition-colors"
        >
          Return to Studio
        </button>
      </div>
    </div>
  );
}
