import React from 'react';
import WPMotesTracker from './WPMotesTracker';

const DetailsPanel = (props) => {
    console.log(props.gameState);
    let parts = props.gameState.pieces.map((piece, i) => {
      let name = `${piece.id}$notes`
      let notes = piece.notes ? piece.notes : '';
      return <div key={i}>
                 [{piece.initiative}] {piece.name} <WPMotesTracker piece={piece} updatePiece={props.updatePiece}
/>
                 <br />
                 <textarea value={notes} type='textarea'  onChange={props.handleNotesChange} name={name}/>
             </div>;
    })
    return (
      <div>
        <span>Details Panel!</span>
        {parts}
      </div>
    )
}

export default DetailsPanel;
