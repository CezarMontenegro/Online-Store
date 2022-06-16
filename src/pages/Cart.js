import React, { useContext } from 'react';
import { CartContext } from '../context/CartContex';

function Cart() {
  const [cartContext] = useContext(CartContext);
  return (
    <div>
      <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      {console.log(cartContext)}
    </div>
  );
}

export default Cart;
