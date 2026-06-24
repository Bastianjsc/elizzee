// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ProductoBase {
  id: number;
  category: string;
  stock: number;

  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description?: string;

  line?: string;
  colorFamily?: string;
  finish?: string;
  size?: string;
  type?: string;
  quantity?: string;
  includes?: string[];
  details?: Record<string, string>;
}

export interface CartItem extends ProductoBase {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  addToCart: (product: ProductoBase) => void;

  removeFromCart: (productId: number) => void;
  removeItem: (productId: number) => void;

  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;

  clearCart: () => void;

  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product: ProductoBase) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.cartQuantity >= product.stock) {
        alert(`Solo tenemos ${product.stock} unidades en stock de este producto.`);
        return;
      }
    } else {
      if (product.stock <= 0) {
        alert("Este producto está agotado.");
        return;
      }
    }

    setCartItems((prevItems) => {
      const itemInPrev = prevItems.find((item) => item.id === product.id);

      if (itemInPrev) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, cartQuantity: 1 }];
    });

    openCart();
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const removeItem = (productId: number) => {
    removeFromCart(productId);
  };

  const increaseQuantity = (productId: number) => {
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem && existingItem.cartQuantity >= existingItem.stock) {
      alert(`Stock máximo alcanzado (${existingItem.stock} unidades).`);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const currentPrice = item.discountPrice || item.price;
    return acc + currentPrice * item.cartQuantity;
  }, 0);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.cartQuantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
}