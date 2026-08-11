import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
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
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
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
    const saved = localStorage.getItem('hlk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    const saved = localStorage.getItem('hlk_customer_info');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_INFO;
  });

  const [lastOrder, setLastOrder] = useState<{ cart: CartItem[]; customerInfo: CustomerInfo; orderId: string; date: string } | null>(() => {
    const saved = localStorage.getItem('hlk_last_order');
    return saved ? JSON.parse(saved) : null;
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

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
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
