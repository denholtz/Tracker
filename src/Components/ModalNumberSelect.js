import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    modalNumberSelectTargetPiece: state.modalNumberSelectTargetPiece,
    modalNumberSelectTargetProperty: state.modalNumberSelectTargetProperty
})

const mapDispatchToProps = {

}

const styles = (theme) => ({

});

const ModalNumberSelect = (props) => {
    const { modalNumberSelectTargetPiece, modalNumberSelectTargetProperty } = props;

    return (
        <React.Fragment>
            <div className='ui-blocker' style={modalNumberSelectTargetPiece ? {display: 'none'} : {}}>
                <div id='modal-number-select'>
                    {new Array(60).fill(0).map((e, i) => (
                        <div className='modal-number-select-number' key={i}>
                            {i}
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNumberSelect);