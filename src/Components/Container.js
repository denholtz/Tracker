import React from 'react';
import { connect } from 'react-redux';

import ControlPanel from './ControlPanel';
import Track from './Track';
import DragTarget from './DragTarget';

import { clearGameState } from '../Redux/actions'

let dragTargetRef = React.createRef();

const mapStateToProps = (state, ownProps) => ({
  gameState: state.gameState
});

const mapDispatchToProps = ({
});

class Container extends React.Component {
    // This is only used for dragging stuff now I believe...
    state = {
        dragTargetState: {
            top: 0,
            left: 0,
            display: 'none',
            value: 0
        }
    }

    handleDragTargetUpdate = (e, value) => {
        console.log('update');
        this.setState({...this.state, dragTargetState: {
            top: e.pageY,
            left: e.pageX,
            display: 'block',
            value
        }})
    }

    handleDragTargetHide = () => {
        console.log('hide')
        this.setState({...this.state, dragTargetState: {...this.state.dragTargetState, display: 'none'}});
    }

    render = () => {
        return (
            <React.Fragment>
                <DragTarget dragTargetState={this.state.dragTargetState}/>
                <div id='control-panel'>
                    <ControlPanel />
                </div>

                <Track
                    start={30}
                    end={1}
                    innerProps={{gridContainerClassName: 'positive-track'}}
                    // addPiece={this.addPiece}
                    // gameState={this.state.gameState}
                    // movePiece={this.movePiece}
                    dragTargetRef={dragTargetRef}
                    handleDragTargetUpdate={this.handleDragTargetUpdate}
                    handleDragTargetHide={this.handleDragTargetHide}
                />

                <Track
                    start={0}
                    end={-20}
                    innerProps={{gridContainerClassName: 'positive-track'}}
                    // addPiece={this.addPiece}
                    // movePiece={this.movePiece}
                    // gameState={t/his.state.gameState}
                    dragTargetRef={dragTargetRef}
                    handleDragTargetUpdate={this.handleDragTargetUpdate}
                    handleDragTargetHide={this.handleDragTargetHide}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
