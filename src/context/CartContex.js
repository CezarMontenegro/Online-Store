import React, { createContext, useState } from 'react';

export const CartContext = createContext([]);

export function CartContextProvider({children}) {
  const [cartList, setCartList] = useState([]);
  return (
    <CartContext.Provider value={ [cartList, setCartList] }>
      {children}
    </CartContext.Provider>
  );
}
