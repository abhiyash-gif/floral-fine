import { Scissors, Droplets, Sun, Sparkles } from 'lucide-react';

export function CareGuide() {
  const rituals = [
    {
      step: '01',
      icon: Scissors,
      title: 'The 45-Degree Stem Cut',
      description:
        'Trim 1-2 inches from the bottom of each stem at a sharp 45-degree angle using sharp shears or floral snips under cool running water. This prevents air bubbles from blocking water uptake.',
    },
    {
      step: '02',
      icon: Droplets,
      title: 'Chilled Water & Clean Vessels',
      description:
        'Always use a squeaky clean vase washed with mild soap. Fill with fresh, cold tap water and dissolve our complimentary botanical flower food packet. Change the water completely every 48 hours.',
    },
    {
      step: '03',
      icon: Sun,
      title: 'Indirect Light & Fruit Isolation',
      description:
        'Keep blossoms away from direct baking sunlight, radiator vents, and air conditioners. Crucially, never place blooms near ripening fruit bowls, which emit ethylene gas that accelerates petal drop.',
    },
  ];

  return (
    <section id="care" className="bg-[#FCFBF9] py-16 border-t border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
            Florist Wisdom
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal">
            The Botanical Care Rituals
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            With three mindful practices, your fresh hand-tied stems will flourish gracefully for 7 to 12 days in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rituals.map((ritual) => {
            const Icon = ritual.icon;
            return (
              <div
                key={ritual.step}
                className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-lg text-stone-400 font-semibold">
                      {ritual.step}.
                    </span>
                    <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {ritual.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {ritual.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pro Florist Tip</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
