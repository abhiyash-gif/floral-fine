import { useState } from 'react';
import { Order } from '../types.ts';
import { Search, X, Package, Clock, CheckCircle2, Truck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export function OrderTrackerModal({ isOpen, onClose, orders }: OrderTrackerModalProps) {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    orders.length > 0 ? orders[orders.length - 1] : null
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase().replace('#', '');
    const found = orders.find((o) => o.id.toUpperCase() === cleanId || o.id.toUpperCase() === `FL-${cleanId}`);

    if (found) {
      setSearchedOrder(found);
      setErrorMessage('');
    } else {
      setErrorMessage(`No order found matching "${searchId}". Try placing an order or check the ID.`);
      setSearchedOrder(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        className="w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 p-6 sm:p-7 relative text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close tracking"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h3 className="font-serif text-2xl font-medium text-stone-900">Track Floral Delivery</h3>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Enter your order reference code (e.g. FL-1042) to check your stem conditioning and delivery window.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. FL-8491"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors whitespace-nowrap"
          >
            Track Status
          </button>
        </form>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 mb-4">
            {errorMessage}
          </div>
        )}

        {/* Result view */}
        {searchedOrder ? (
          <div className="space-y-5 bg-white p-5 rounded-lg border border-stone-200">
            <div className="flex justify-between items-baseline pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block">
                  Active Floral Order
                </span>
                <span className="text-base font-serif font-bold text-stone-900">
                  #{searchedOrder.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500 block">Recipient</span>
                <span className="text-xs font-semibold text-stone-800">{searchedOrder.recipientName}</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Bouquet confirmed & reserved at dawn harvest</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-800 font-medium">
                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                </div>
                <span>Conditioning stems in floral hydration solution & wrapping</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400">
                <Truck className="w-4 h-4 shrink-0" />
                <span>En route with courier · Expected: {searchedOrder.deliveryDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex justify-between">
              <span>Destination: {searchedOrder.deliveryAddress}</span>
              <span className="font-mono tabular-nums font-semibold text-stone-800">
                ${searchedOrder.total}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-stone-500 bg-stone-50/50 rounded-lg border border-stone-200">
            No active order selected. Place an order to watch your fresh blooms move through our studio.
          </div>
        )}
      </div>
    </div>
  );
}
