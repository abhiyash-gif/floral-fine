import { useState } from 'react';
import { FlowerProduct } from '../types.ts';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: FlowerProduct;
  onSelect: (product: FlowerProduct) => void;
  onQuickAdd: (product: FlowerProduct) => void;
}

export function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col bg-[#FCFBF9] border border-stone-200/90 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300"
    >
      {/* Product Image Slot: 65-75% visual weight */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="font-serif italic text-base text-stone-600 mb-1">{product.name}</span>
            <span className="text-xs text-stone-500">Fresh Seasonal Stems</span>
          </div>
        )}

        {/* Quick action overlay button */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 text-stone-800 text-xs font-medium rounded shadow-xs hover:bg-white backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className="py-2 px-3 bg-stone-900/95 hover:bg-stone-900 text-white text-xs font-medium rounded shadow-xs backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors disabled:bg-emerald-800"
            title="Quick add signature size"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed clean metadata kicker */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 uppercase tracking-wider mb-1 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.stemsCount} stems</span>
            {product.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-700 font-semibold">Studio Favorite</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-lg text-stone-900 font-medium group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-1 mt-1 font-light">
            {product.flowers.slice(0, 3).join(', ')}
          </p>
        </div>

        {/* Pricing line with tabular numerals */}
        <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-baseline justify-between">
          <div className="text-xs text-stone-500">From</div>
          <div className="text-base font-serif font-semibold text-stone-900 tabular-nums">
            ${product.basePrice}
          </div>
        </div>
      </div>
    </article>
  );
}
