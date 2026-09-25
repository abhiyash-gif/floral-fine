import { useState } from 'react';
import { CartItem, Order } from '../types.ts';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Gift, Calendar, CheckCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [deliveryDateOption, setDeliveryDateOption] = useState<'today' | 'tomorrow' | 'scheduled'>('today');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const FREE_DELIVERY_THRESHOLD = 90;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 12;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BLOOM10' || promoCode.trim().toUpperCase() === 'FLORA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% seasonal discount applied!');
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscountPercent(0);
      setPromoSuccess('Free hand delivery unlocked!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try BLOOM10 for 10% off.');
      setPromoSuccess('');
    }
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !deliveryAddress.trim()) {
      alert('Please fill in the recipient name and delivery address.');
      return;
    }

    setIsSubmitting(true);

    const targetDate =
      deliveryDateOption === 'today'
        ? 'Today (Before 6 PM)'
        : deliveryDateOption === 'tomorrow'
        ? 'Tomorrow Morning (9 AM - 1 PM)'
        : 'Scheduled Weekend Delivery';

    const newOrder: Order = {
      id: `FL-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...items],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      recipientName,
      senderName: senderName || 'Valued Patron',
      deliveryAddress,
      deliveryDate: targetDate,
      deliveryTimeSlot: 'Hand Delivery by Courier',
      cardMessage: cardMessage || 'With warmest thoughts and fresh blossoms.',
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(newOrder);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end"
    >
      <div
        className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900">Your Shopping Bag</h3>
            <p className="text-xs text-stone-500 font-light">
              {items.length} {items.length === 1 ? 'item' : 'items'} selected
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-stone-100/90 px-5 py-2.5 border-b border-stone-200 text-xs">
          {subtotal >= FREE_DELIVERY_THRESHOLD ? (
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Complimentary hand delivery unlocked!</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-stone-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  Add <strong className="tabular-nums font-mono">${FREE_DELIVERY_THRESHOLD - subtotal}</strong> more for free hand delivery
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                {Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Gift className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-lg text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our fresh morning harvests or assemble your own custom bouquet in our studio.
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-block px-4 py-2 text-xs font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded transition-colors"
              >
                Browse Fresh Blooms
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white border border-stone-200 rounded-lg shadow-2xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded bg-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <span>{item.sizeName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.stemsCount} stems</span>
                        {item.hasVase && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-700 font-medium">Vase included</span>
                          </>
                        )}
                      </div>
                      {item.recipientName && (
                        <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                          To: {item.recipientName}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums font-medium text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className="text-xs font-serif font-bold text-stone-900 tabular-nums">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="pt-4 border-t border-stone-200 space-y-4">
              {/* Delivery Timing */}
              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                  Delivery Schedule
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryDateOption('today')}
                    className={`py-2 px-2 text-center border rounded transition-colors ${
                      deliveryDateOption === 'today'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold">Today</div>
                    <div className="text-[10px] opacity-80">By 6 PM</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryDateOption('tomorrow')}
                    className={`py-2 px-2 text-center border rounded transition-colors ${
                      deliveryDateOption === 'tomorrow'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold">Tomorrow</div>
                    <div className="text-[10px] opacity-80">Morning</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryDateOption('scheduled')}
                    className={`py-2 px-2 text-center border rounded transition-colors ${
                      deliveryDateOption === 'scheduled'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold">Weekend</div>
                    <div className="text-[10px] opacity-80">Custom Date</div>
                  </button>
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleSubmitCheckout} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Sender Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-stone-600 block mb-1">
                    Doorstep Address & Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street address, unit/apt number, city"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-stone-600 block mb-1">
                    Handwritten Card Message (Complimentary)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Words of celebration, love, or condolence..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BLOOM10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs uppercase placeholder:normal-case focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium rounded transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">{promoSuccess}</p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Seasonal Promo ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Doorstep Courier Hand Delivery</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-serif text-lg font-bold text-stone-900">
                <span>Total</span>
                <span className="tabular-nums">${finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleSubmitCheckout}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-stone-400"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Complete Order · ${finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-stone-400 font-light">
              Payment via Cash on Hand Delivery or Apple Pay upon courier arrival
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
