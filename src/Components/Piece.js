import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            style={{color: props.piece.color, borderColor: props.piece.color}}
            className='piece'
        >
            {props.piece.name[0].toUpperCase()}
        </span>
    )
}

export default Piece;