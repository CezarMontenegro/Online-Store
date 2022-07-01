import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContex';
import { getProductsDetails } from '../services/api';
import StarRating from '../components/StarRating';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import undoIcon from '../images/icons8-reply-arrow-50.png';
import minusIcon from '../images/minus.png';
import plusIcon from '../images/add.png';
import '../styles/detailedProduct.css';

function DetailedProduct() {
  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartList, setCartList] = useContext(CartContext);
  const { attributes } = details;

  async function fetchProductDetails() {
    setLoading(true);
    const result = await getProductsDetails(productId);
    setDetails(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  async function handleAddToCartButton(event) {
    const productDoesNotExistInTheContext = -1;
    const editCartList = [...cartList];
    const index = cartList.findIndex((product) => product.id === event.target.id);

    if (index !== productDoesNotExistInTheContext) {
      editCartList[index].quantity += quantity;

      localStorage.setItem('cartList', JSON.stringify(editCartList));
      setCartList(editCartList);
    } else {
      const productData = await getProductsDetails(event.target.id);
      const productInfo = {
        id: productData.id,
        img: productData.thumbnail,
        name: productData.title,
        price: productData.price,
        quantity };

      const newCartList = [...editCartList, productInfo];
      localStorage.setItem('cartList', JSON.stringify(newCartList));
      setCartList(newCartList);
    }
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 0) setQuantity(quantity - 1);
  }

  function avaliation() {

  }

  return (
    <div id="detailed-product">
      {console.log(quantity)}
      <header>
        <Link
          to="/"
        >
          <img
            src={ undoIcon }
            alt="It heads to home"
          />
        </Link>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img
            src={ cartIcon }
            alt="It heads to the cart"
          />
        </Link>
      </header>
      { loading ? (
        <div id="loading">
          <h1>Loading...</h1>
        </div>)
        : (
          <main>
            <h2>{`${details.title} - R$${Number(details.price).toFixed(2)}`}</h2>
            <div id="product-data">
              <div id="product-info">
                <img src={ details.thumbnail } alt={ details.title } />
                <h2>Quantidade</h2>
                <div id="product-info-quantity">
                  <button
                    className="quantity-button"
                    type="button"
                    onClick={ decreaseQuantity }
                  >
                    <img src={ minusIcon } alt="minus" height="20px" />
                  </button>
                  <h3>{quantity}</h3>
                  <button
                    className="quantity-button"
                    type="button"
                    onClick={ increaseQuantity }
                  >
                    <img src={ plusIcon } alt="plus" height="20px" />
                  </button>
                </div>
                <button
                  className="add-button"
                  id={ details.id }
                  type="button"
                  onClick={ (event) => handleAddToCartButton(event) }
                  data-testid="product-detail-add-to-cart"
                >
                  Add to Cart
                </button>
              </div>
              <div id="product-details">
                <h3>Especificações Técnicas:</h3>
                <ul>
                  { attributes && attributes.map((attribute) => (
                    <li key={ attribute.id }>
                      {`${attribute.name}: ${attribute.value_name}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2>Avaliações</h2>
              <form>
                <div id="first-line-form">
                  <input
                    type="email"
                    placeholder="E-mail"
                  />
                  <StarRating />
                </div>
              </form>
            </div>
          </main>)}
    </div>
  );
}

export default DetailedProduct;
