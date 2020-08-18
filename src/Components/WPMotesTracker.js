import React from 'react';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const WPMotesTracker = (props) => {
  return (
    <span>
      <input type="number" className="wpmCounter" max="999" /> m <input type="number" className="wpmCounter" max="999" /> wp
    </span>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WPMotesTracker);