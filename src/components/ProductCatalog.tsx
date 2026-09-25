import { useState, useMemo } from 'react';
import { FlowerProduct } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductCatalogProps {
  products: FlowerProduct[];
  onSelectProduct: (product: FlowerProduct) => void;
  onQuickAdd: (product: FlowerProduct) => void;
}

export function ProductCatalog({ products, onSelectProduct, onQuickAdd }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Bouquets' },
    { id: 'romantic', label: 'Romantic Roses' },
    { id: 'wildflower', label: 'Pastoral & Meadow' },
    { id: 'minimalist', label: 'Architectural Ikebana' },
    { id: 'dried', label: 'Everlasting Dried' },
  ];

  const occasions = [
    'all',
    'Anniversary',
    'Birthday',
    'Housewarming',
    'Sympathy',
    'Thank You',
    'Modern Living'
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.flowers.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesOccasion = selectedOccasion === 'all' || item.occasion.includes(selectedOccasion);

        return matchesCategory && matchesSearch && matchesOccasion;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, selectedOccasion]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setSelectedOccasion('all');
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            Seasonal Arrangements
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal">
            The Botanical Collection
          </h2>
        </div>
        <p className="text-sm text-stone-500 mt-2 md:mt-0 font-light max-w-sm">
          Harvested at first light, assembled thoughtfully stem by stem by our master florists.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4 mb-10">
        {/* Row 1: Category Filter Buttons (Functional Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Search, Occasion Filter & Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="relative sm:col-span-6 lg:col-span-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flower name (e.g. Garden Rose, Peony, Lavender)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 px-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Occasion Filter */}
          <div className="sm:col-span-3 lg:col-span-4">
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-md text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
            >
              <option value="all">All Occasions</option>
              {occasions.filter(o => o !== 'all').map((occ) => (
                <option key={occ} value={occ}>
                  Occasion: {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-md text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-stone-50/60 rounded-xl border border-dashed border-stone-300 p-8 max-w-md mx-auto">
          <p className="font-serif text-xl text-stone-800 mb-2">No matching blossoms found</p>
          <p className="text-xs text-stone-500 mb-6 font-light">
            We couldn't find any bouquets matching your current filters. Try resetting to view our full collection.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
