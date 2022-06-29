import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContex';
import undoIcon from '../images/icons8-reply-arrow-50.png';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import xIcon from '../images/x.png';
import openBoxIcon from '../images/icons8-box-128.png';
import minusIcon from '../images/minus.png';
import plusIcon from '../images/add.png';
import '../styles/cart.css';

function Cart() {
  const [cartList, setCartList] = useContext(CartContext);

  // fetch functions

  function fetchLocalStorage() {
    const result = JSON.parse(localStorage.getItem('cartList'));
    const localStorageCartList = result || [];
    setCartList(localStorageCartList);
  }

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  // handle input functions

  function removeItem(event) {
    const editCartList = [...cartList];
    editCartList.splice(event.target.parentElement.value, 1);

    localStorage.setItem('cartList', JSON.stringify(editCartList));
    setCartList(editCartList);
  }

  function increaseQuantity(event) {
    const editCartList = [...cartList];
    editCartList[event.target.parentElement.value].quantity += 1;

    localStorage.setItem('cartList', JSON.stringify(editCartList));
    setCartList(editCartList);
  }

  function decreaseQuantity(event) {
    const editCartList = [...cartList];
    editCartList[event.target.parentElement.value].quantity -= 1;

    localStorage.setItem('cartList', JSON.stringify(editCartList));
    setCartList(editCartList);
  }

  function total() {
    const totalSum = cartList.reduce((acc, curr) => {
      acc += (curr.price * curr.quantity);
      return acc;
    }, 0);
    return `R$${totalSum.toFixed(2)}`;
  }

  return (
    <div id="cart">
      <header>
        <Link to="/">
          <img src={ undoIcon } alt="undoIcon" />
        </Link>
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
              <div id="cart-products-title">
                <img src={ cartIcon } alt="cartIcon" />
                <h2>Carrinho de Compras:</h2>
              </div>
              { cartList.map((product, index) => (
                <div className="product-card" key={ product.id }>
                  <div className="product-card-btn">
                    <button
                      type="button"
                      value={ index }
                      onClick={ (event) => removeItem(event) }
                    >
                      <img src={ xIcon } alt="x" height="30px" />
                    </button>
                  </div>
                  <div className="product-card-img">
                    <img src={ product.img } alt={ product.name } />
                  </div>
                  <div className="product-card-title">
                    <h4 data-testid="shopping-cart-product-name">{ product.name }</h4>
                  </div>
                  <div className="product-card-quantity">
                    <button
                      type="button"
                      value={ index }
                      onClick={ (event) => decreaseQuantity(event) }
                    >
                      <img src={ minusIcon } alt="minus" height="20px" />
                    </button>
                    <h3 data-testid="product-card-quantity">
                      { product.quantity }
                    </h3>
                    <button
                      type="button"
                      value={ index }
                      onClick={ (event) => increaseQuantity(event) }
                    >
                      <img src={ plusIcon } alt="plus" height="20px" />
                    </button>
                  </div>
                  <div className="product-card-price">
                    <h4>
                      { `R$ ${Number(product.price * product.quantity).toFixed(2)}` }
                    </h4>
                  </div>
                </div>
              ))}
              <div id="total">
                <div id="total-valor">
                  <p>Valor Total da Compra:</p>
                  <p>{total()}</p>
                </div>
              </div>
            </div>)}
      </main>
    </div>
  );
}

export default Cart;
