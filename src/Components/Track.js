import React from 'react';
import { connect } from 'react-redux';
import TrackStep from './TrackStep';

const mapStateToProps = null;
const mapDispatchToProps = null;

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
                <React.Fragment key={i}>
                    <TrackStep
                        initiative={e}
                        acted={false}
                        addPiece={props.addPiece}
                        movePiece={props.movePiece}
                        gameState={props.gameState}
                        onDragEnter={(event) => props.handleDragTargetUpdate(event, e)}
                        onDragLeave={props.handleDragTargetHide}
                    />
                    <div >{e % 2 === 0 ? e : ''}</div>
                    <TrackStep
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

export default connect(mapStateToProps, mapDispatchToProps)(Track);
