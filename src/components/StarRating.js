import React from 'react';
import '../styles/starRating.css';

function StarRating(props) {
  function avaliation(event) {
    props.rating(event.target.parentElement.id);
    const stars = document.querySelectorAll('.star-icon');
    const classStar = event.target.parentElement.classList.value;
    const selectedElement = event.target.parentElement;
    if (!classStar.includes('ativo')) {
      stars.forEach((star) => {
        star.classList.remove('ativo');
      });
      selectedElement.classList.add('ativo');
    }
  }

  return (
    <div className="ul-starRating">
      <button
        type="button"
        id="1"
        className="star-icon ativo"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        id="2"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        id="3"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        id="4"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        id="5"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
    </div>
  );
}

export default StarRating;
