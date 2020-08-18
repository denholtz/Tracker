import React from 'react';
import TrackStep from './TrackStep';

const Track = (props) => {
    const { start, end, innerProps } = props;
    let steps = [];
    for(let i = start; i > end; i--){
        steps.push(i);
    }

    return (
        <div 
            className={innerProps.gridContainerClassName}>
            {steps.map((e, i) => (
                <React.Fragment>
                    <TrackStep 
                        initiative={e} 
                        acted={false} 
                        addPiece={props.addPiece}
                        movePiece={props.movePiece}
                        gameState={props.gameState}
                        key={i + 1}
                        onDragEnter={(event) => props.handleDragTargetUpdate(event, e)}
                        onDragLeave={props.handleDragTargetHide}                           
                    />
                    <div key={(i + 1) * 2}>{e % 2 === 0 ? e : ''}</div>
                    <TrackStep 
                        key={(i + 1) * 3}
                        initiative={e} 
                        acted={true} 
                        addPiece={props.addPiece}
                        movePiece={props.movePiece}
                        gameState={props.gameState}
                        onDragEnter={(event) => props.handleDragTargetUpdate(event, e)}
                        onDragLeave={props.handleDragTargetHide}
                    />
                </React.Fragment>                    
            ))}
        </div>
    )
}

export default Track;