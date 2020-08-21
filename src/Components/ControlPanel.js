import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { setName, setColor, deletePiece, newRound, prevRound } from '../Redux/actions';
import DetailsPanel from './DetailsPanel';

const mapStateToProps = (state, ownProps) => ({
  name: state.name,
  color: state.color,
  round: state.gameState.round,
});

const mapDispatchToProps = ({
  setName,
  setColor,
  deletePiece,
  newRound,
  prevRound
});

const ControlPanel = (props) => {

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      console.log('setting name to', e.target.value);
      props.setName(e.target.value);
    } else if (e.target.name === 'color') {
      props.setColor(e.target.value);
    }
  }

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
                  <input value={props.name} type='text' onChange={handleChange} name='name'/>
                  <input value={props.color} type='color' onChange={handleChange} name='color'/>
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

          <button onClick={props.newRound}>
              Top of the Round ({props.round})
          </button>

          <button onClick={props.prevRound}>
              Go Back In Time
          </button>

          <div id='details-panel'>
              <DetailsPanel />
          </div>
      </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
