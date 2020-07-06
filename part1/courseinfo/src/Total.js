import React from 'react';

const Total = props => {
    const exercisesArray = props.parts.map(part => part.exercises)
    return <p>Total of exercises: {exercisesArray.reduce((a, b) => a + b, 0)}</p>
}

export default Total;