import React from 'react';
import '../styles/starRated.css';

function starRated(props) {
  const { rate } = props;
  return (
    <div className="ul-starRated">
      <button
        type="button"
        id="1"
        className={ rate === '1' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="2"
        className={ rate === '2' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="3"
        className={ rate === '3' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="4"
        className={ rate === '4' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
      <button
        type="button"
        id="5"
        className={ rate === '5' ? 'started-icon activated' : 'started-icon' }
      >
        <div />
      </button>
    </div>
  );
}

export default starRated;
