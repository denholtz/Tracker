import React from 'react';

import Piece from './Piece';

const TrackStep = (props) => {

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();   // On Firefox, failing to do this reloads the page at about:blank

        let dragInfo = JSON.parse(e.dataTransfer.getData('text'));

        if(dragInfo.type === 'add'){
            props.addPiece({
                initiative: props.initiative,
                acted: props.acted
            })
        }

        else if(dragInfo.type === 'move') {
            props.movePiece({
                ...dragInfo.piece,
                initiative: props.initiative,
                acted: props.acted
            });
        }
    }

    let pieces = props.gameState.pieces;


    // Determine whether our pieces are next to act
    let maxInitiative = Math.max(...pieces.map((e) => e.initiative));
    let nextToAct = (!props.acted && props.initiative === maxInitiative);

    // Filter just the pieces that belong here and make the content out of them
    let ourPieces = pieces.filter((e) => e.initiative === props.initiative && e.acted === props.acted);
    let content = ourPieces.length ? ourPieces.map((e, i) => <Piece key={i} piece={e} nextToAct={nextToAct}/>) : '';

    return (
        <div className='track-step' onDragOver={onDragOver} onDrop={handleDrop}>
            {content}
        </div>
    )
}

export default TrackStep;
