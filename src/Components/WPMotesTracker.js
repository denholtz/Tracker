import React from 'react';

const WPMotesTracker = (props) => {
  return (
    <span>
      <input type="number" className="wpmCounter" max="999" /> m <input type="number" className="wpmCounter" max="999" /> wp
    </span>
  )
}

export default WPMotesTracker;
