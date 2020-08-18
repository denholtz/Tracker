import React from 'react';
import { connect } from 'react-redux';

import TrackStep from './TrackStep';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const CrashedTrack = (props) => {
    let steps = [];
    for(let i = 0; i > -21; i--){
        steps.push(i);
    }

    return (
        <React.Fragment>
            <table className='tracker-table'>
                <tbody>
                    {steps.map((e, i) => (
                        <tr key={e} className='tracker-table-row'>
                            <td>
                                <TrackStep 
                                    initiative={e} 
                                    acted={false} 
                                    addPiece={props.addPiece}
                                    movePiece={props.movePiece}
                                    gameState={props.gameState}
                                />
                            </td>
                            <td className='tracker-section'>{e % 2 === 0 ? e : ''}</td>
                            <td>
                                <TrackStep 
                                    initiative={e} 
                                    acted={true} 
                                    addPiece={props.addPiece}
                                    movePiece={props.movePiece}
                                    gameState={props.gameState}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CrashedTrack);