import { HERO_IMAGE } from '../data/products.ts';
import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenBuilder: () => void;
}

export function Hero({ onExploreCatalog, onOpenBuilder }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtle editorial kicker - NOT a pill */}
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
              Seasonal Botanical Studio · Est. 2021
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12] mb-5 [text-wrap:balance]">
              Artisanal florals, rooted in poetry and seasonal grace.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8 font-light">
              Hand-tied botanical arrangements sourced each dawn from organic Pacific micro-growers.
              Crafted to order with compostable packaging and same-day doorstep delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm active:scale-[0.99] flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Explore Bouquets</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 border border-stone-300/80 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-stone-600" />
                <span>Custom Stem Studio</span>
              </button>
            </div>

            {/* Quiet Trust Markers - Unboxed with separators */}
            <div className="pt-6 border-t border-stone-200/70 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-700" />
                <span>Same-day hand delivery before 2 PM</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>7-Day guaranteed petal freshness</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>100% Recyclable wraps</span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/60 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src={HERO_IMAGE}
                alt="Florist workbench with freshly harvested roses, ranunculus, and sweet peas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-stone-900/60 px-3.5 py-2 rounded-md flex items-center justify-between border border-white/10">
                <span className="font-serif italic text-stone-200">Morning harvest at our studio</span>
                <span className="text-stone-300 text-[11px]">Updated today at 6:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
