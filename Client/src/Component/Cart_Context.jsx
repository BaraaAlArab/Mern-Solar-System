import {createContext, useContext, useState} from "react";

const CartContext = createContext();

export function CartProvider({children}) {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart, addItemToCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
