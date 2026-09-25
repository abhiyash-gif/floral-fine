export interface FlowerSize {
  name: string;
  price: number;
  stems: number;
  description: string;
}

export interface FlowerProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'romantic' | 'wildflower' | 'minimalist' | 'dried' | 'all';
  basePrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  stemsCount: number;
  flowers: string[];
  scentProfile: 'Subtle & Fresh' | 'Sweet & Floral' | 'Citrus & Herbaceous' | 'Warm & Honeyed';
  occasion: string[];
  description: string;
  careTips: string;
  inStock: boolean;
  featured?: boolean;
  sizes: FlowerSize[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  sizeName: string;
  stemsCount: number;
  price: number;
  quantity: number;
  hasVase: boolean;
  giftMessage?: string;
  recipientName?: string;
  deliveryDate?: string;
  isCustom?: boolean;
  customDetails?: {
    greens: string[];
    focal: string[];
    accents: string[];
    wrap: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  recipientName: string;
  senderName: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  cardMessage: string;
  status: 'Confirmed' | 'Assembling' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}
