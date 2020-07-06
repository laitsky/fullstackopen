import React from 'react';

const Statistics = ({ data }) => {
    return (
        <div>
            <h1>statistics</h1>
            <p>good {data.good}</p>
            <p>neutral {data.neutral}</p>
            <p>bad {data.bad}</p>
        </div>
    )
}

export default Statistics;