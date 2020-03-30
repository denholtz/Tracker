import React from 'react';

import Piece from './Piece';

const TrackStep = (props) => {

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
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

    let pieces = props.gameState.pieces.filter((e) => e.initiative === props.initiative && e.acted === props.acted);
    
    let content = pieces.length ? pieces.map((e, i) => <Piece key={i} piece={e}/>) : '';

    return (
        <div className='track-step' onDragOver={onDragOver} onDrop={handleDrop}>
            {content}
        </div>
    )
}

export default TrackStep;