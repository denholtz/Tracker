import React from 'react';
import WPMotesTracker from './WPMotesTracker';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const DetailsPanel = (props) => {
    const updateNotes = (e) => {
        let newNote = e.target.value;
        let changedPieceID = e.target.name.split('$')[0];
        props.updatePiece(changedPieceID, 'notes', newNote)
    }

    let parts = props.gameState.pieces.map((piece, i) => {
      let name = `${piece.id}$notes`
      let notes = piece.notes ? piece.notes : '';
      return <div key={i}>
                 [{piece.initiative}] {piece.name} <WPMotesTracker piece={piece} updatePiece={props.updatePiece}
/>
                 <br />
                 <textarea value={notes} type='textarea'  onChange={updateNotes} name={name}/>
             </div>;
    })
    return (
      <div>
        <span>Details Panel!</span>
        {parts}
      </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPanel);