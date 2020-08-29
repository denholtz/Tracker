import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setNumberSelectModalTarget, updatePiece } from '../Redux/actions';

const mapStateToProps = (state, ownProps) => ({
    numberSelectModalTarget: state.numberSelectModalTarget
})

const mapDispatchToProps = {
    setNumberSelectModalTarget, 
    updatePiece
}

const ModalNumberSelect = (props) => {
    const { numberSelectModalTarget, setNumberSelectModalTarget, updatePiece } = props;

    if(!numberSelectModalTarget || !numberSelectModalTarget.pieceID) return '';

    const { pieceID, attribute } = numberSelectModalTarget;

    return (
        <React.Fragment>
            <div className={`ui-blocker ${numberSelectModalTarget ? '' : 'display-none'}`} onClick={() => setNumberSelectModalTarget(null)}>
                <div id='modal-number-select'>
                    {new Array(60).fill(0).map((e, i) => (
                        <div className='modal-number-select-number' key={i} onClick={() => updatePiece(pieceID, attribute, i)}>
                            <span style={{display:'block'}}>{i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNumberSelect);