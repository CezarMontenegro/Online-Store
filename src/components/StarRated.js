import React from 'react';
import '../styles/starRated.css';

function starRated(props) {
  return (
    <div className="ul-starRated">
      <button
        type="button"
        id="1"
        className={ props.rate === '1' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="2"
        className={ props.rate === '2' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="3"
        className={ props.rate === '3' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="4"
        className={ props.rate === '4' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="5"
        className={ props.rate === '5' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
    </div>
  );
}

export default starRated;
