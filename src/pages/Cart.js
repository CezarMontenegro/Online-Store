import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContex';
import undoIcon from '../images/icons8-reply-arrow-50.png';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import openBoxIcon from '../images/icons8-box-128.png';
import '../styles/cart.css';

function Cart() {
  const [cartList] = useContext(CartContext);

  return (
    <div id="cart">
      {console.log(cartList)}
      <div>
        <Link to="/">
          <img src={ undoIcon } alt="undoIcon" />
        </Link>
      </div>
      <div>
        <img src={ cartIcon } alt="cartIcon" />
        <h2>Carrinho de Compras</h2>
      </div>
      <main>
        <div>
          <img src={ openBoxIcon } alt="openBoxIcon" />
          <h2>Seu Carrinho Está Vazio</h2>
        </div>
      </main>
    </div>
  );
}

export default Cart;
