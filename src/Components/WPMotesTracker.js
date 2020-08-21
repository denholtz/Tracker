import React from 'react';
import { connect } from 'react-redux';
import { updatePiece } from "../Redux/actions";

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = ({
  updatePiece
});

const WPMotesTracker = (props) => {
  console.log('WPMotesTracker rerendering');
  const moteChange = (e) => {
    let motesValue = e.target.value * 1;
    props.updatePiece(props.piece.id, 'motes', motesValue)
  }
  const wpChange = (e) => {
    let wpValue = e.target.value * 1;
    props.updatePiece(props.piece.id, 'wp', wpValue)
  }
  const notesChange = (e) => {
    let notesValue = e.target.value;
    props.updatePiece(props.piece.id, 'notes', notesValue)
  }

  return (
    <div>
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
      <textarea value={props.piece.notes} type='textarea' onChange={notesChange} />
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(WPMotesTracker);
