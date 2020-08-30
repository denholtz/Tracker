import React from 'react';
import { connect } from 'react-redux';
import { updatePiece, setNumberSelectModalTarget} from "../Redux/actions";

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = ({
  updatePiece,
  setNumberSelectModalTarget
});

const WPMotesTracker = (props) => {
  // const moteChange = (e) => {
  //   let motesValue = e.target.value * 1;
  //   props.updatePiece(props.piece.id, 'motes', motesValue)
  // }
  // const wpChange = (e) => {
  //   let wpValue = e.target.value * 1;
  //   props.updatePiece(props.piece.id, 'wp', wpValue)
  // }
  const notesChange = (e) => {
    let notesValue = e.target.value;
    props.updatePiece(props.piece.id, 'notes', notesValue)
  }

  return (
    <div>
      {/* <span>
        <input type="number"
               value={props.piece.motes}
               className="wpmCounter"
               max="999"
               onChange={() => {}}
               /> m
        <input type="number"
               value={props.piece.wp}
               className="wpmCounter"
               max="999"
               onChange={() => {}}
              /> wp
      </span> */}
      <div
        className='wpm-counter-input'
        onClick={() => props.setNumberSelectModalTarget(props.piece.id, 'personalMotes')}
      >
        {props.piece.personalMotes} m
        <span className='wpm-counter-detail'> (personal) </span>
      </div>
      <div
        className='wpm-counter-input'
        onClick={() => props.setNumberSelectModalTarget(props.piece.id, 'peripheralMotes')}
      >
        {props.piece.peripheralMotes} m
        <span className='wpm-counter-detail'> (peripheral) </span>
      </div>

      <div
        className='wpm-counter-input'
        onClick={() => props.setNumberSelectModalTarget(props.piece.id, 'wp')}
      >
        {props.piece.wp} wp
      </div>
      <textarea value={props.piece.notes} type='textarea' onChange={notesChange} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WPMotesTracker);
