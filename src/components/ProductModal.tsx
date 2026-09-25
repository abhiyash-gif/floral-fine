import { useState } from 'react';
import { FlowerProduct, FlowerSize } from '../types.ts';
import { X, Check, Droplets, Wind, Sparkles, MessageSquare } from 'lucide-react';

interface ProductModalProps {
  product: FlowerProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: FlowerProduct,
    selectedSize: FlowerSize,
    hasVase: boolean,
    giftMessage: string,
    recipientName: string
  ) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<FlowerSize>(product.sizes[1] || product.sizes[0]);
  const [includeVase, setIncludeVase] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const vasePrice = 24;
  const totalPrice = selectedSize.price + (includeVase ? vasePrice : 0);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, includeVase, giftMessage, recipientName);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Botanical notes */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden bg-stone-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Botanical Composition */}
            <div className="p-6 bg-[#FAF8F5]/80 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Botanical Composition
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-stone-700">
                  {product.flowers.map((fl, idx) => (
                    <span key={fl} className="bg-white border border-stone-200 px-2 py-1 rounded text-stone-800">
                      {fl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scent & Care */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-200 text-xs">
                <div className="flex items-start gap-2">
                  <Wind className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900 block">Scent Profile</span>
                    <span className="text-stone-600">{product.scentProfile}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Droplets className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900 block">Florist Life</span>
                    <span className="text-stone-600">7 to 10 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Occasion */}
              <div className="text-[11px] uppercase tracking-widest text-stone-500 font-medium mb-1">
                {product.category} · {product.occasion.join(' · ')}
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-2">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                    Select Bouquet Size
                  </label>
                  <span className="text-xs text-stone-500 font-mono tabular-nums">
                    {selectedSize.stems} Stems Included
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize.name === size.name;
                    return (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="text-xs font-semibold">{size.name}</div>
                        <div className={`text-sm font-serif tabular-nums mt-1 ${isSelected ? 'text-stone-200' : 'text-stone-900'}`}>
                          ${size.price}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {size.stems} stems
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-on: Vase */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg mb-5">
                <label className="flex items-center justify-between cursor-pointer text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeVase}
                      onChange={(e) => setIncludeVase(e.target.checked)}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                    />
                    <span className="font-medium text-stone-800">
                      Add Matte Ceramic Keepsake Vase
                    </span>
                  </div>
                  <span className="text-stone-600 font-mono tabular-nums">+$24</span>
                </label>
              </div>

              {/* Complimentary Hand-Written Gift Card */}
              <div className="mb-6">
                {!showGiftForm ? (
                  <button
                    onClick={() => setShowGiftForm(true)}
                    className="text-xs text-stone-700 hover:text-stone-900 flex items-center gap-1.5 font-medium underline underline-offset-4"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Add complimentary handwritten calligraphy card</span>
                  </button>
                ) : (
                  <div className="space-y-2 p-3 bg-white border border-stone-200 rounded-lg text-xs">
                    <div className="flex justify-between items-center text-stone-600 font-medium">
                      <span>Complimentary Gift Note</span>
                      <button
                        onClick={() => setShowGiftForm(false)}
                        className="text-stone-400 hover:text-stone-700"
                      >
                        Cancel
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Recipient's Name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="Write your personal message to be penned on heavy cotton paper..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Contiguous Buy Module Bottom Action */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone-500">Order Subtotal</span>
                <span className="text-xl font-serif font-bold text-stone-900 tabular-nums">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`w-full py-3.5 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm active:scale-[0.99]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Add to Shopping Bag · ${totalPrice}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-500 mt-2 font-light">
                Hand-tied to order · Same-day delivery available at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
