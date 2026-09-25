import { useState, useMemo } from 'react';
import { FLOWER_BUILDER_OPTIONS, ENGLISH_GARDEN_IMAGE } from '../data/products.ts';
import { CartItem } from '../types.ts';
import { Sparkles, Check, Plus, Minus, ShoppingBag, Palette } from 'lucide-react';

interface BouquetBuilderProps {
  onAddCustomBouquet: (customItem: CartItem) => void;
}

export function BouquetBuilder({ onAddCustomBouquet }: BouquetBuilderProps) {
  // Quantities for each element
  const [selectedGreens, setSelectedGreens] = useState<{ [id: string]: number }>({
    'g-eucalyptus': 1,
  });
  const [selectedFocal, setSelectedFocal] = useState<{ [id: string]: number }>({
    'f-garden-roses': 1,
    'f-peonies': 1,
  });
  const [selectedAccents, setSelectedAccents] = useState<{ [id: string]: number }>({
    'a-chamomile': 1,
  });
  const [selectedWrapId, setSelectedWrapId] = useState<string>('w-kraft');
  const [justAdded, setJustAdded] = useState(false);

  // Math calculation
  const { totalStems, totalPrice, breakdownList } = useMemo(() => {
    let stems = 0;
    let price = 0;
    const breakdown: string[] = [];

    // Greens
    FLOWER_BUILDER_OPTIONS.greens.forEach((item) => {
      const count = selectedGreens[item.id] || 0;
      if (count > 0) {
        stems += item.stems * count;
        price += item.price * count;
        breakdown.push(`${count}x ${item.name}`);
      }
    });

    // Focal
    FLOWER_BUILDER_OPTIONS.focal.forEach((item) => {
      const count = selectedFocal[item.id] || 0;
      if (count > 0) {
        stems += item.stems * count;
        price += item.price * count;
        breakdown.push(`${count}x ${item.name}`);
      }
    });

    // Accents
    FLOWER_BUILDER_OPTIONS.accents.forEach((item) => {
      const count = selectedAccents[item.id] || 0;
      if (count > 0) {
        stems += item.stems * count;
        price += item.price * count;
        breakdown.push(`${count}x ${item.name}`);
      }
    });

    // Wrap
    const currentWrap = FLOWER_BUILDER_OPTIONS.wraps.find((w) => w.id === selectedWrapId);
    if (currentWrap) {
      price += currentWrap.price;
    }

    return { totalStems: stems, totalPrice: price, breakdownList: breakdown };
  }, [selectedGreens, selectedFocal, selectedAccents, selectedWrapId]);

  const updateItemQty = (
    category: 'greens' | 'focal' | 'accents',
    id: string,
    delta: number
  ) => {
    const updateFn =
      category === 'greens'
        ? setSelectedGreens
        : category === 'focal'
        ? setSelectedFocal
        : setSelectedAccents;

    updateFn((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleAddBouquet = () => {
    const selectedWrap = FLOWER_BUILDER_OPTIONS.wraps.find((w) => w.id === selectedWrapId);
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'custom-bouquet',
      name: 'Custom Florist Composition',
      image: ENGLISH_GARDEN_IMAGE,
      sizeName: 'Artisanal Custom',
      stemsCount: totalStems,
      price: totalPrice,
      quantity: 1,
      hasVase: selectedWrapId.includes('vase') || selectedWrapId.includes('ceramic') || selectedWrapId.includes('glass'),
      isCustom: true,
      customDetails: {
        greens: Object.keys(selectedGreens).map(
          (k) => FLOWER_BUILDER_OPTIONS.greens.find((g) => g.id === k)?.name || k
        ),
        focal: Object.keys(selectedFocal).map(
          (k) => FLOWER_BUILDER_OPTIONS.focal.find((f) => f.id === k)?.name || k
        ),
        accents: Object.keys(selectedAccents).map(
          (k) => FLOWER_BUILDER_OPTIONS.accents.find((a) => a.id === k)?.name || k
        ),
        wrap: selectedWrap?.name || 'Kraft Wrap',
      },
    };

    onAddCustomBouquet(customItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <section id="builder" className="bg-[#FAF8F5] py-16 border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            Interactive Atelier Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal [text-wrap:balance]">
            Craft Your Custom Botanical Bouquet
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Select foliage, hero focal stems, wildflower accents, and wrapping. Our studio florists hand-tie each custom order with fresh seasonal stems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stem Selection Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Greens & Foliage */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-serif text-stone-900 font-medium">
                    1. Foundation & Botanical Greens
                  </h3>
                  <p className="text-xs text-stone-500">
                    Provides structural volume, fragrance, and earthy texture.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLOWER_BUILDER_OPTIONS.greens.map((item) => {
                  const qty = selectedGreens[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                        qty > 0 ? 'border-stone-900 bg-stone-50/80' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-stone-900">{item.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.stems} stems bundle · <span className="font-mono tabular-nums font-medium text-stone-700">${item.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {qty > 0 && (
                          <button
                            onClick={() => updateItemQty('greens', item.id, -1)}
                            className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        )}
                        <span className="text-xs font-mono tabular-nums w-4 text-center font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateItemQty('greens', item.id, 1)}
                          className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Focal Blooms */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-serif text-stone-900 font-medium">
                    2. Primary Focal Blooms
                  </h3>
                  <p className="text-xs text-stone-500">
                    The statement flowers that define color harmony and presence.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLOWER_BUILDER_OPTIONS.focal.map((item) => {
                  const qty = selectedFocal[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                        qty > 0 ? 'border-stone-900 bg-stone-50/80' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-stone-900">{item.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.stems} premium stems · <span className="font-mono tabular-nums font-medium text-stone-700">${item.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {qty > 0 && (
                          <button
                            onClick={() => updateItemQty('focal', item.id, -1)}
                            className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        )}
                        <span className="text-xs font-mono tabular-nums w-4 text-center font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateItemQty('focal', item.id, 1)}
                          className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wildflower Accents */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-serif text-stone-900 font-medium">
                    3. Wildflower & Meadow Accents
                  </h3>
                  <p className="text-xs text-stone-500">
                    Light, playful filler blossoms that add romantic movement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLOWER_BUILDER_OPTIONS.accents.map((item) => {
                  const qty = selectedAccents[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                        qty > 0 ? 'border-stone-900 bg-stone-50/80' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-stone-900">{item.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.stems} stems · <span className="font-mono tabular-nums font-medium text-stone-700">${item.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {qty > 0 && (
                          <button
                            onClick={() => updateItemQty('accents', item.id, -1)}
                            className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        )}
                        <span className="text-xs font-mono tabular-nums w-4 text-center font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateItemQty('accents', item.id, 1)}
                          className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Wrap & Vessel */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="mb-4 pb-2 border-b border-stone-100">
                <h3 className="text-base font-serif text-stone-900 font-medium">
                  4. Presentation & Vessel
                </h3>
                <p className="text-xs text-stone-500">
                  Select hand-tied wrap or an architectural ceramic/glass vase.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLOWER_BUILDER_OPTIONS.wraps.map((wrap) => {
                  const isSelected = selectedWrapId === wrap.id;
                  return (
                    <button
                      key={wrap.id}
                      onClick={() => setSelectedWrapId(wrap.id)}
                      className={`p-3.5 text-left rounded-lg border transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-semibold">{wrap.name}</span>
                        <span className={`text-xs font-mono tabular-nums ${isSelected ? 'text-stone-300' : 'text-stone-700'}`}>
                          {wrap.price === 0 ? 'Included' : `+$${wrap.price}`}
                        </span>
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {wrap.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Summary Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <Palette className="w-4 h-4 text-stone-700" />
                <h3 className="font-serif text-lg text-stone-900 font-medium">
                  Custom Bouquet Summary
                </h3>
              </div>

              {/* Live stem counts */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs py-1 border-b border-stone-100">
                  <span className="text-stone-500">Total Fresh Stems</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                    {totalStems} stems
                  </span>
                </div>

                <div className="space-y-1 pt-1 max-h-48 overflow-y-auto pr-1">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Composition
                  </div>
                  {breakdownList.length > 0 ? (
                    breakdownList.map((item, i) => (
                      <div key={i} className="text-xs text-stone-700 flex items-center justify-between">
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 italic">No stems selected yet</span>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 flex justify-between">
                  <span>Wrap / Vessel</span>
                  <span className="font-medium text-stone-900">
                    {FLOWER_BUILDER_OPTIONS.wraps.find((w) => w.id === selectedWrapId)?.name}
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-stone-200 mb-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-500">Calculated Atelier Price</span>
                  <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    ${totalPrice}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Includes signature botanical hydration pack & ribbon
                </p>
              </div>

              {/* Add to Bag Action */}
              <button
                onClick={handleAddBouquet}
                disabled={totalStems === 0 || justAdded}
                className="w-full py-3.5 px-4 text-xs font-semibold rounded-md bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-xs flex items-center justify-center gap-2 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Custom Bouquet · ${totalPrice}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
