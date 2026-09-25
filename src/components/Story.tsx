import { Leaf, Award, Recycle } from 'lucide-react';

export function Story() {
  return (
    <section id="story" className="bg-[#FAF8F5] py-18 border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              The Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal leading-tight [text-wrap:balance]">
              Flowers should reflect nature's wild poetry, not factory uniformity.
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Founded in 2021 by floral designer Madeleine Chen, Flora Atelier was born out of a desire to break away from mass-refrigerated supermarket stems. We partner directly with 14 family-run organic flower farms across the coast to bring blooms from field to vase within 24 hours of cutting.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Every arrangement embraces natural curves, delicate tendrils, and organic asymmetry. No two bouquets are identical, honoring the quiet individuality of each seasonal blossom.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-lg">
                  <Leaf className="w-4 h-4 text-emerald-800" />
                  <span>100% Organic</span>
                </div>
                <p className="text-xs text-stone-500">Pesticide-free coastal micro-growers</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-lg">
                  <Recycle className="w-4 h-4 text-emerald-800" />
                  <span>Zero Plastic</span>
                </div>
                <p className="text-xs text-stone-500">Compostable wraps & raw linen ribbon</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold text-lg">
                  <Award className="w-4 h-4 text-amber-800" />
                  <span>Cold Chain</span>
                </div>
                <p className="text-xs text-stone-500">Chilled courier door-to-door delivery</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FCFBF9] p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl text-stone-900 font-medium">
              Studio Gatherings & Bespoke Events
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Beyond everyday gifting, our atelier crafts sculptural floral installations for intimate weddings, editorial productions, and architectural dining spaces.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/70 text-xs">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  Weekend Botanical Workshops
                </span>
                <span className="text-stone-500">
                  Every Saturday 10:00 AM · Learn the Japanese art of Ikebana balance & conditioning.
                </span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/70 text-xs">
                <span className="font-semibold text-stone-900 block mb-0.5">
                  Weekly Floral Subscriptions
                </span>
                <span className="text-stone-500">
                  Fresh rotation delivered to your residence or creative studio every Tuesday morning.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
