import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import searchIcon from '../images/icons8-pesquisar-64.png';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { CartContext } from '../context/CartContex';
import '../styles/home.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [firstSearchWasMade, setFirstSearchWasMade] = useState(false);
  const [cartList, setCartList] = useContext(CartContext);

  async function fetchCategories() {
    const result = await getCategories();
    setCategories(result);
  }

  async function fetchProducts(categoryId, query) {
    const result = await getProductsFromCategoryAndQuery(categoryId, query);
    setProducts(result.results);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleRadioCategory(event) {
    fetchProducts(event.target.id, '');
    setCategoryValue(event.target.id);
    setFirstSearchWasMade(true);
  }

  function handleButton() {
    fetchProducts(categoryValue, inputValue);
    setFirstSearchWasMade(true);
  }

  function handleAddToCartButton(event) {
    const productDoesNotExistInTheContext = -1;
    const editCartList = [...cartList];
    const index = cartList.findIndex((product) => product.id === event.target.id);

    if (index !== productDoesNotExistInTheContext) {
      editCartList[index].quantity += 1;
      setCartList(editCartList);
    } else {
      setCartList([...editCartList, { id: event.target.id, quantity: 1 }]);
    }
  }

  function renderMain() {
    if (!firstSearchWasMade) {
      return (
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      );
    }
    if (firstSearchWasMade && products.length) {
      return (
        <div id="card-div">
          { products.map((product) => (
            <div key={ product.id }>
              <Link
                to={ `detailed/${product.id}` }
                data-testid="product-detail-link"
              >
                <div data-testid="product" id="card-div-div">
                  <h4>{ product.title }</h4>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <h5>{`R$ ${product.price.toFixed(2)}`}</h5>
                </div>
              </Link>
              <div>
                <button
                  id={ product.id }
                  type="button"
                  onClick={ (event) => handleAddToCartButton(event) }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (firstSearchWasMade && !products.length) {
      return (
        <h1>
          Nenhum produto foi encontrado
        </h1>
      );
    }
  }

  return (
    <div id="home">
      <nav>
        <h3>Categorias:</h3>
        { categories.map((category) => (
          <label
            htmlFor={ category.id }
            key={ category.name }
            data-testid="category"
          >
            <input
              id={ category.id }
              type="radio"
              name="categories"
              onClick={ (event) => handleRadioCategory(event) }
            />
            { category.name }
          </label>))}
      </nav>
      <main id="home-main">
        <div>
          <input
            type="text"
            data-testid="query-input"
            onChange={ (event) => setInputValue(event.target.value) }
          />
          <a
            href
            type="button"
            data-testid="query-button"
            onClick={ handleButton }
          >
            <img src={ searchIcon } alt="query-button" />
          </a>
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
        { renderMain() }
      </main>
    </div>
  );
}

export default Home;
