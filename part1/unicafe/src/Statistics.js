import React from 'react';

const Statistics = ({ data }) => {
    const allFeedbacks = Object.values(data).reduce((a, b) => a + b);
    const avgFeedbacks = (data.good - data.bad) / allFeedbacks;
    const positiveFeedbacks = data.good / allFeedbacks;
    
    return (
        <div>
            <h1>statistics</h1>
            <p>good {data.good}</p>
            <p>neutral {data.neutral}</p>
            <p>bad {data.bad}</p>
            <p>all {allFeedbacks}</p>
            <p>average {avgFeedbacks}</p>
            {(!isNaN(positiveFeedbacks)) && <p>positive {positiveFeedbacks}%</p>}
        </div>
    )
}

export default Statistics;