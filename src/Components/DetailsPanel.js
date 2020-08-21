import React from 'react';
import { connect } from 'react-redux';
import { updatePiece } from "../Redux/actions";
import WPMotesTracker from './WPMotesTracker';

const mapStateToProps = (state, ownProps) => {
  return {
    gameState: state.gameState,
  };
};

const mapDispatchToProps = ({
  updatePiece
});

const DetailsPanel = (props) => {
    console.log('DetailsPanel rerendering');
    console.log(props);
    const updateNotes = (e) => {
        let newNote = e.target.value;
        let changedPieceID = e.target.name.split('$')[0];
        props.updatePiece(changedPieceID, 'notes', newNote)
    }

    let parts = props.gameState.pieces.map((piece, i) => {
      let name = `${piece.id}$notes`
      let notes = piece.notes ? piece.notes : '';
      return <div key={i}>
                 [{piece.initiative}] {piece.name}
                 <WPMotesTracker piece={piece}/>

             </div>;
    })
    return (
      <div>
        <span>Details Panel!</span>
        {parts}
      </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);
