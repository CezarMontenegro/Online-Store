import React from 'react';
import { Link } from 'react-router-dom';
import img from '../images/icons8-shopping-cart-50.png';

function Home() {
  return (
    <body>
      <div>
        <input
          type="text"
        />
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img
            src={ img }
            alt="Aponta para Shopping Cart"
          />
        </Link>
      </div>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </body>
  );
}

export default Home;
