import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part, i) => <Part key={part.id} data={parts[i]} />)}
        </div>
    )
}

export default Content