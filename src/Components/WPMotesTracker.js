import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const WPMotesTracker = (props) => {
  const moteChange = (e) => {
    let motesValue = e.target.value * 1;
    props.updatePiece(props.piece.id, 'motes', motesValue)
  }
  const wpChange = (e) => {
    let wpValue = e.target.value * 1;
    props.updatePiece(props.piece.id, 'wp', wpValue)
  }

  return (
    <span>
      <input type="number"
             value={props.piece.motes}
             className="wpmCounter"
             max="999"
             onChange={moteChange}/> m
      <input type="number"
             value={props.piece.wp}
             className="wpmCounter"
             max="999"
             onChange={wpChange} /> wp
    </span>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WPMotesTracker);