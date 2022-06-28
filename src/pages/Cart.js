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
      <header>
        <img src={ cartIcon } alt="cartIcon" />
        <h2>Carrinho de Compras</h2>
      </header>
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
                <div className="product-card" key={ product.id }>
                  <div className="product-card-btn">
                    <button type="button">
                      X
                    </button>
                  </div>
                  <div className="product-card-img">
                    <img src={ product.img } alt={ product.name } />
                  </div>
                  <div className="product-card-title">
                    <h4 data-testid="shopping-cart-product-name">{ product.name }</h4>
                  </div>
                  <div className="product-card-quantity">
                    <h4>-</h4>
                    <h3 data-testid="product-card-quantity">
                      { product.quantity }
                    </h3>
                    <h4>+</h4>
                  </div>
                  <div className="product-card-price">
                    <h4>
                      { Number(product.price).toFixed(2) }
                    </h4>
                  </div>
                </div>
              ))}
            </div>)}
      </main>
    </div>
  );
}

export default Cart;
