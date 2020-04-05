import React from 'react';

const Piece = (props) => {
    //
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', JSON.stringify({type: 'move', piece: props.piece}));
    }

    let classes;
    if (props.nextToAct) {
      classes = 'piece nextToAct';
    } else {
      classes = 'piece';
    }

    let title = props.piece.name;
    if (props.piece.mostRecentCrash && props.piece.initiative <= 0) {
      let roundsCrashed = props.gameState.round - props.piece.mostRecentCrash;
      if (props.piece.acted) {
        roundsCrashed++;
      }
      if (props.piece.hadActedAtCrash) {
        roundsCrashed--;
      }

      title += `\n  Crashed for ${roundsCrashed} (Crashed in ${props.piece.mostRecentCrash})`
    }
    if (props.piece.mostRecentCrashRecovery && props.piece.initiative > 0) {
      let eligibility = 'Eligible';
      if (props.gameState.round - props.piece.mostRecentCrashRecovery <= 1) {
        eligibility = 'Not eligible';
      }
      title += `\n  Recovered from crash in ${props.piece.mostRecentCrashRecovery} (${eligibility} for Break)`
    }

    return (
        <span
            draggable={true}
            onDragStart={handleDragStart}
            title={title}
            style={{color: props.piece.color}}
            className={classes}
        >
            {props.piece.name[0].toUpperCase()}
        </span>
    )
}

export default Piece;
