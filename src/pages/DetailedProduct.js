import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import cartIcon from '../images/icons8-shopping-cart-50.png';
import undoIcon from '../images/icons8-reply-arrow-50.png';
import Loading from '../components/Loading';
import '../styles/detailsProduct.css';

function DetailedProduct() {
  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { attributes } = details;

  async function fetchProductDetails() {
    setLoading(true);
    const data = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const result = await data.json();
    setDetails(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div id="details-product">
      {console.log(details.price)}
      <header>
        <Link
          to="/"
          data-testid="shopping-cart-button"
        >
          <img
            src={ undoIcon }
            alt="It heads to the cart"
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
