import React from 'react';

const Piece = (props) => {
    //
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', JSON.stringify({type: 'move', piece: props.piece}));
    }

    return (
        <span 
            draggable={true}
            onDragStart={handleDragStart}
            title={props.piece.name} 
            style={{color: props.piece.color}}
            className='piece'
        >
            {props.piece.name[0].toUpperCase()}
        </span>
    )
}

export default Piece;