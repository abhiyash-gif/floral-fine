import { useState, useEffect } from 'react';
import { FlowerProduct, FlowerSize, CartItem, Order } from './types.ts';
import { PRODUCTS } from './data/products.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { BouquetBuilder } from './components/BouquetBuilder.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { OrderTrackerModal } from './components/OrderTrackerModal.tsx';
import { CareGuide } from './components/CareGuide.tsx';
import { Story } from './components/Story.tsx';
import { Footer } from './components/Footer.tsx';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Default initial lovely bouquet in the bag so patrons can see checkout immediately
    return [
      {
        id: 'init-verona',
        productId: 'verona-reverie',
        name: 'The Verona Reverie',
        image: PRODUCTS[0].image,
        sizeName: 'Signature',
        stemsCount: 22,
        price: 88,
        quantity: 1,
        hasVase: true,
        recipientName: 'Genevieve Miller',
        giftMessage: 'Wishing you radiant days filled with joy and blossoms.',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Existing demo orders for testing the tracker
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'FL-4920',
      items: [
        {
          id: 'prev-1',
          productId: 'provence-meadow',
          name: 'Provence Meadow Song',
          image: PRODUCTS[1].image,
          sizeName: 'Signature',
          stemsCount: 26,
          price: 76,
          quantity: 1,
          hasVase: false,
          recipientName: 'Clara Oswald',
        },
      ],
      subtotal: 76,
      deliveryFee: 12,
      discount: 0,
      total: 88,
      recipientName: 'Clara Oswald',
      senderName: 'Arthur Vance',
      deliveryAddress: '742 Evergreen Terrace, Botanical District',
      deliveryDate: 'Today (Before 6 PM)',
      deliveryTimeSlot: 'Chilled Courier',
      cardMessage: 'To bright beginnings and fragrant mornings.',
      status: 'Assembling',
      createdAt: '08:45 AM',
    },
  ]);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart actions
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleQuickAdd = (product: FlowerProduct) => {
    const signatureSize = product.sizes[1] || product.sizes[0];
    const existingIndex = cartItems.findIndex(
      (it) => it.productId === product.id && it.sizeName === signatureSize.name && !it.hasVase
    );

    if (existingIndex > -1) {
      setCartItems((prev) => {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        sizeName: signatureSize.name,
        stemsCount: signatureSize.stems,
        price: signatureSize.price,
        quantity: 1,
        hasVase: false,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added "${product.name}" to shopping bag`);
  };

  const handleAddFromModal = (
    product: FlowerProduct,
    selectedSize: FlowerSize,
    hasVase: boolean,
    giftMessage: string,
    recipientName: string
  ) => {
    const unitPrice = selectedSize.price + (hasVase ? 24 : 0);
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      sizeName: selectedSize.name,
      stemsCount: selectedSize.stems,
      price: unitPrice,
      quantity: 1,
      hasVase,
      giftMessage: giftMessage || undefined,
      recipientName: recipientName || undefined,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added "${product.name}" (${selectedSize.name}) to bag`);
  };

  const handleAddCustomBouquet = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    showToast('Custom Florist Bouquet added to bag');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Item removed from shopping bag');
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    setIsCartOpen(false);
    setConfirmedOrder(newOrder);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (Zone 1: Wordmark, Zone 2: Nav links, Zone 3: Actions) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onOpenBuilder={() => handleNavigateSection('builder')}
        />

        {/* Catalog Section */}
        <ProductCatalog
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Interactive Custom Bouquet Builder */}
        <BouquetBuilder onAddCustomBouquet={handleAddCustomBouquet} />

        {/* Care Rituals Section */}
        <CareGuide />

        {/* Philosophy & Atelier Story Section */}
        <Story />
      </main>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddFromModal}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
