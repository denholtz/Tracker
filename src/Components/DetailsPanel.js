import React from 'react';


const DefaultPanel = (props) => {
    console.log(props.gameState);
    let parts = props.gameState.pieces.map((piece, i) => {
      let name = `${piece.id}$notes`
      let notes = piece.notes ? piece.notes : '';
      return <div key={i}>
                 [{piece.initiative}] {piece.name}
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

export default DefaultPanel;
