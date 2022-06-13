import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import searchIcon from '../images/icons8-pesquisar-64.png';
import { getCategories } from '../services/api';
import '../styles/home.css';

function Home() {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const result = await getCategories();
    setCategories(result);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <nav>
        <h3>Categorias:</h3>
        { categories.map((category) => (
          <label
            htmlFor={ category.name }
            key={ category.name }
            data-testid="category"
          >
            <input
              id={ category.name }
              type="radio"
            />
            { category.name }
          </label>))}
      </nav>
      <main>
        <div>
          <input
            type="text"
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
          >
            <img src={ searchIcon } alt="query-button" />
          </button>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img
              src={ cartIcon }
              alt="Aponta para Shopping Cart"
            />
          </Link>
        </div>
        <div>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
