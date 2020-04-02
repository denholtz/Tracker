import React from 'react';

const ControlPanel = (props) => {

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', JSON.stringify({type: 'add'}));
    }

    const handleDrop = (e) => {
        let dragInfo = JSON.parse(e.dataTransfer.getData('text'));

        props.deletePiece(dragInfo.piece);
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    return(
        <React.Fragment>
            <div className='control-panel-component' draggable={true}>
                <form>
                    <input value={props.name} type='text' onChange={props.handleChange} name='name'/>
                    <input value={props.color} type='color' onChange={props.handleChange} name='color'/>
                </form>
                <span draggable={true} onDragStart={handleDragStart}>Add</span>
            </div>

            <div className='control-panel-component' onDragOver={onDragOver} onDrop={handleDrop}>
                Trash
            </div>

            <button onClick={props.clearGameState}>
                Clear Game
            </button>

            <button onClick={props.topOfTheRound}>
                Top of the Round ({props.round})
            </button>

            <button onClick={props.decrementRound}>
                Go Back In Time
            </button>
        </React.Fragment>
    )
}

export default ControlPanel;
