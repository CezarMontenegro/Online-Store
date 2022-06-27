import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext([]);

export function CartContextProvider({ children }) {
  const [cartList, setCartList] = useState([]);
  return (
    <CartContext.Provider value={ [cartList, setCartList] }>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
