import React from 'react';
import { connect } from 'react-redux';
import { updatePiece } from "../Redux/actions";
import WPMotesTracker from './WPMotesTracker';

const mapStateToProps = (state, ownProps) => {
  return {
    gameState: state.gameState,
  };
};

const mapDispatchToProps = ({
  updatePiece
});

const DetailsPanel = (props) => {
    let parts = props.gameState.pieces.map((piece, i) => {
      return <div key={i}  className='wp-motes-tracker'>
                 [{piece.initiative}] {piece.name}
                 <WPMotesTracker piece={piece}/>

             </div>;
    })
    return (
      <div>
        <span>Details Panel!</span>
        {parts}
      </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);
