import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRecycle} from '@fortawesome/free-solid-svg-icons';

import DetailsPanel from './DetailsPanel';
import { connect } from 'socket.io-client';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const ControlPanel = (props) => {

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', JSON.stringify({type: 'add'}));
    }

    const handleDrop = (e) => {
        e.preventDefault(); // On Firefox, not doing this reloads the page at about:blank

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

            <button onClick={props.clearGameState}>
                Clear Game
            </button>

            <button onClick={props.topOfTheRound}>
                Top of the Round ({props.round})
            </button>

            <button onClick={props.decrementRound}>
                Go Back In Time
            </button>

            <div id='details-panel'>
                <DetailsPanel
                    gameState={props.gameState}
                    handleNotesChange={props.handleNotesChange}
                />
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);