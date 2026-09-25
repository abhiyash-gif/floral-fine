import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl text-stone-100 tracking-tight block">
              Flora Atelier
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Artisanal floral studio and botanical laboratory. Cultivating quiet moments of beauty through seasonal flowers, sustainable hand-ties, and local farm relationships.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-2">
              <p>418 Bloom Street, Floral District</p>
              <p>Tuesday – Sunday: 8:00 AM – 6:00 PM</p>
              <p>Direct Atelier Line: (555) 234-8901</p>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Seasonal Fresh Bouquets
                </a>
              </li>
              <li>
                <a href="#builder" className="hover:text-white transition-colors">
                  Stem Bar & Custom Studio
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Florist Care Rituals
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Farm Partners & Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Seasonal Blossom Gazette
            </h4>
            <p className="text-xs text-stone-400 font-light">
              Receive dawn harvest updates, rare peony arrivals, and invitations to our weekend Ikebana workshops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-100 hover:bg-white text-stone-900 font-medium text-xs rounded transition-colors flex items-center justify-center"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-800" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  Welcome to the Gazette! A 10% welcome coupon has been recorded.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© {new Date().getFullYear()} Flora Atelier Botanical Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Hand-delivered in chilled vans</span>
            <span aria-hidden="true">·</span>
            <span>Compostable paper packaging</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
