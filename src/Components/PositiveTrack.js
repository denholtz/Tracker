import React from 'react';
import { connect } from 'react-redux';
import TrackStep from './TrackStep';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

const PositiveTrack = (props) => {
    let steps = [];
    for(let i = 30; i > 0; i--){
        steps.push(i);
    }

    return (
        <div className='tracker-table-wrapper'>
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
        </div>
    )
}

// Not used anywhere?
//export default connect(mapStateToProps, mapDispatchToProps)(PositiveTrack);
