import { ShoppingBag, Search, Compass } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onNavigateSection,
  activeSection
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('home');
          }}
          className="text-2xl sm:text-3xl font-serif tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
        >
          Flora Atelier
        </a>

        {/* Zone 2: Clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigateSection('catalog')}
            className={`hover:text-stone-900 transition-colors pb-0.5 border-b-2 ${
              activeSection === 'catalog' ? 'border-stone-900 text-stone-900' : 'border-transparent'
            }`}
          >
            Fresh Bouquets
          </button>
          <button
            onClick={() => onNavigateSection('builder')}
            className={`hover:text-stone-900 transition-colors pb-0.5 border-b-2 ${
              activeSection === 'builder' ? 'border-stone-900 text-stone-900' : 'border-transparent'
            }`}
          >
            Bouquet Studio
          </button>
          <button
            onClick={() => onNavigateSection('care')}
            className={`hover:text-stone-900 transition-colors pb-0.5 border-b-2 ${
              activeSection === 'care' ? 'border-stone-900 text-stone-900' : 'border-transparent'
            }`}
          >
            Care Rituals
          </button>
          <button
            onClick={() => onNavigateSection('story')}
            className={`hover:text-stone-900 transition-colors pb-0.5 border-b-2 ${
              activeSection === 'story' ? 'border-stone-900 text-stone-900' : 'border-transparent'
            }`}
          >
            The Atelier
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTracker}
            aria-label="Track your floral order"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
          >
            <Compass className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">Track Order</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shadow-xs active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span>Bag</span>
            <span className="ml-0.5 font-mono tabular-nums bg-white/20 px-1.5 py-0.2 rounded text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
