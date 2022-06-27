import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import searchIcon from '../images/icons8-pesquisar-64.png';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductsDetails }
  from '../services/api';
import { CartContext } from '../context/CartContex';
import '../styles/home.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [firstSearchWasMade, setFirstSearchWasMade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useContext(CartContext);

  async function fetchCategories() {
    const result = await getCategories();
    setCategories(result);
  }

  async function fetchProducts(categoryId, query) {
    setLoading(true);
    const result = await getProductsFromCategoryAndQuery(categoryId, query);
    setProducts(result.results);
    setLoading(false);
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
  }

  async function handleAddToCartButton(event) {
    const productDoesNotExistInTheContext = -1;
    const editCartList = [...cartList];
    const index = cartList.findIndex((product) => product.id === event.target.id);

    if (index !== productDoesNotExistInTheContext) {
      editCartList[index].quantity += 1;

      setCartList(editCartList);
    } else {
      const productData = await getProductsDetails(event.target.id);
      const productInfo = {
        id: productData.id,
        img: productData.thumbnail,
        name: productData.title,
        price: productData.price,
        quantity: 1 };

      setCartList([...editCartList, productInfo]);
    }
  }

  function renderMain() {
    if (loading && firstSearchWasMade) {
      return (
        <div id="loading">
          <h1>
            Loading...
          </h1>
        </div>
      );
    }
    if (!firstSearchWasMade) {
      return (
        <div id="start-container">
          <h1>
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </div>
      );
    }
    if (firstSearchWasMade && products.length && !loading) {
      return (
        <div id="cards-container">
          { products.map((product) => (
            <div className="card" key={ product.id }>
              <Link
                to={ `detailed/${product.id}` }
                data-testid="product-detail-link"
              >
                <div data-testid="product" className="card-link">
                  <div className="card-title">
                    <h4>{ product.title }</h4>
                  </div>
                  <img src={ product.thumbnail } alt={ product.title } />
                </div>
              </Link>
              <div className="card-price">
                <h4>{`R$ ${product.price.toFixed(2)}`}</h4>
                <button
                  id={ product.id }
                  type="button"
                  onClick={ (event) => handleAddToCartButton(event) }
                  data-testid="product-add-to-cart"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (firstSearchWasMade && !products.length && !loading) {
      return (
        <div id="product-not-found">
          <h1>
            Nenhum produto foi encontrado
          </h1>
        </div>
      );
    }
  }

  return (
    <div id="home">
      {console.log('loading', loading)}
      <aside>
        <h3>Categorias:</h3>
        <div id="galleries">
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
              <span>{ category.name }</span>
            </label>))}
        </div>
      </aside>
      <main>
        <header>
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
        </header>
        { renderMain() }
      </main>
    </div>
  );
}

export default Home;
