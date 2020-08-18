import React from 'react';

const DragTarget = (props) => {
    const { value, top, left, display } = props.dragTargetState;

    return (
        <div 
            id='drag-target'
            style={{
                position: 'absolute',
                top,
                left,
                display
            }}
        >
            {value}
        </div>
    )
}

export default DragTarget;
