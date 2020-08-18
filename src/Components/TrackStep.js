import React from 'react';

import Piece from './Piece';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

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
    let piecesToAct = pieces.filter(e => !e.acted);
    let maxInitiative = Math.max(...piecesToAct.map((e) => e.initiative));
    let nextToAct = (!props.acted && props.initiative === maxInitiative);

    // Filter just the pieces that belong here and make the content out of them
    let ourPieces = pieces.filter((e) => e.initiative === props.initiative && e.acted === props.acted);
    let content = ourPieces.length ? ourPieces.map((e, i) => <Piece gameState={props.gameState}
                                                                    key={i}
                                                                    piece={e}
                                                                    nextToAct={nextToAct}/>) : '';

    return (
        <div 
            // onDragEnter={props.onDragEnter} 
            onDragOver={onDragOver} 
            onDrop={handleDrop} 
            style={{textAlign: props.acted ? 'left' : 'right'}}
        >
            {content}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackStep);
