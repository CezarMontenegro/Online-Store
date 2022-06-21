import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import undoIcon from '../images/icons8-reply-arrow-50.png';
import Loading from '../components/Loading';
import { getProductsDetails } from '../services/api';
import '../styles/detailsProduct.css';
import { CartContext } from '../context/CartContex';

function DetailedProduct() {
  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
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

  return (
    <div id="details-product">
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
        <div>
          <Loading />
        </div>)
        : (
          <div>
            <div data-testid="product-detail-name">
              <h3>{`${details.title} - R$${Number(details.price).toFixed(2)}`}</h3>
              <img src={ details.thumbnail } alt={ details.title } />
              <button
                id={ details.id }
                type="button"
                onClick={ (event) => handleAddToCartButton(event) }
                data-testid="product-detail-add-to-cart"
              >
                Add to Cart
              </button>
            </div>
            <div>
              <h4>Especificações Técnicas:</h4>
              <ul>
                { attributes && attributes.map((attribute) => (
                  <li key={ attribute.id }>
                    {`${attribute.name}: ${attribute.value_name}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>)}

    </div>
  );
}

export default DetailedProduct;
