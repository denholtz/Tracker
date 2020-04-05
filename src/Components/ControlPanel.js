import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRecycle} from '@fortawesome/free-solid-svg-icons';

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
                <br></br>
                {
                    props.name &&
                    <span 
                        draggable={true}
                        onDragStart={handleDragStart}
                        title={props.name} 
                        style={{color: props.color, borderColor: props.color}}
                        className='piece'
                    >
                        {props.name[0].toUpperCase()}
                    </span>
                }
            </div>

            <div className='control-panel-component' onDragOver={onDragOver} onDrop={handleDrop}>
                <FontAwesomeIcon title='Drag a Piece Here to Delete It' className='control-panel-icon' icon={faTrash}/>
            </div>

            <div className='control-panel-component'>
                <button onClick={props.clearGameState}>
                    <FontAwesomeIcon title='Drag a Piece Here to Delete It' className='control-panel-icon' icon={faRecycle}/>
                </button>
            </div>
        </React.Fragment>
    )
}

export default ControlPanel;