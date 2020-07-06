import React from 'react';
import Part from './Part';

const Content = props => {
    return (
        <div>
            <Part data={props.parts[0]} />
            <Part data={props.parts[1]} />
            <Part data={props.parts[2]} />
        </div>
    )
}

export default Content