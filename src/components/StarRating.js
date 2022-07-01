import React from 'react';
import '../styles/starRating.css';

function StarRating() {
  function avaliation(event) {
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
    <div id="ul-starRating">
      <button
        type="button"
        className="star-icon ativo"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
      <button
        type="button"
        className="star-icon"
        onClick={ (event) => avaliation(event) }
      >
        <div />
      </button>
    </div>
  );
}

export default StarRating;
