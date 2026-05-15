import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { recipeData } from '../data/recipeData';

export interface CartItem {
  name: string;
  price: number;
  category: string;
  image: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string) => void;
  removeFromCart: (idx: number) => void;
  changeQty: (idx: number, delta: number) => void;
  clearCart: () => void;
  checkout: (onSuccess: () => void) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('recipehub_cart') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('recipehub_cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (name: string) => {
    const d = recipeData[name];
    if (!d) return;
    setCart(prev => {
      const idx = prev.findIndex(i => i.name === name);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return updated;
      }
      return [...prev, { name, price: d.price, category: d.tag, image: d.image, qty: 1 }];
    });
  };

  const removeFromCart = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const changeQty = (idx: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], qty: Math.max(1, updated[idx].qty + delta) };
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  const checkout = (onSuccess: () => void) => {
    setCart([]);
    onSuccess();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, checkout, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}