import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '../data/products';

export interface CartItem {
  id: string; // unique item id: productId or `${productId}__${variantId}`
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  deliveryMethod: 'pickup' | 'mail';
  pickupDay: 'day1' | 'day2' | 'both';
  address: string;
  notes: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  lastOrder: { cart: CartItem[]; customerInfo: CustomerInfo; orderId: string; date: string } | null;
  setLastOrder: React.Dispatch<React.SetStateAction<{ cart: CartItem[]; customerInfo: CustomerInfo; orderId: string; date: string } | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CUSTOMER_INFO: CustomerInfo = {
  name: '',
  email: '',
  phone: '',
  deliveryMethod: 'pickup',
  pickupDay: 'day1',
  address: '',
  notes: ''
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hlk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem('hlk_customer_info');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_INFO;
    } catch {
      return INITIAL_CUSTOMER_INFO;
    }
  });

  const [lastOrder, setLastOrder] = useState<{ cart: CartItem[]; customerInfo: CustomerInfo; orderId: string; date: string } | null>(() => {
    try {
      const saved = localStorage.getItem('hlk_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('hlk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hlk_customer_info', JSON.stringify(customerInfo));
  }, [customerInfo]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('hlk_last_order', JSON.stringify(lastOrder));
    }
  }, [lastOrder]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: ProductVariant) => {
    const itemId = selectedVariant ? `${product.id}__${selectedVariant.id}` : product.id;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { id: itemId, product, selectedVariant, quantity }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        customerInfo,
        setCustomerInfo,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
