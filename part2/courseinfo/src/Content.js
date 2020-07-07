import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({parts}) => {
    const totalExercises = parts.reduce((total, part) => part.exercises + total, 0);
    return (
        <div>
            {parts.map((part, i) => <Part key={part.id} data={parts[i]} />)}
            <Total total={totalExercises} />
        </div>
    )
}

export default Content;