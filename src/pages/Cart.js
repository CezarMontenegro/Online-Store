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
        { !cartList.length
          ? (
            <div id="empty-cart">
              <img src={ openBoxIcon } alt="openBoxIcon" />
              <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
            </div>)
          : (
            <div id="cart-products">
              { cartList.map((product) => (
                <div key={ product.id }>
                  <button type="button">
                    X
                  </button>
                  <img src={ product.img } alt={ product.name } />
                  <h4 data-testid="shopping-cart-product-name">{ product.name }</h4>
                  <h4>-</h4>
                  <h3 data-testid="shopping-cart-product-quantity">{ product.quantity }</h3>
                  <h4>+</h4>
                  <h4>
                    { Number(product.price).toFixed(2) }
                  </h4>
                </div>
              ))}
            </div>)}
      </main>
    </div>
  );
}

export default Cart;
