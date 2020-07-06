import React from 'react';
//for commit 1.8 (unicafe step 3)
//statistics component already used since exercises 1.6
const Statistics = ({ data }) => {
    const allFeedbacks = Object.values(data).reduce((a, b) => a + b);
    const avgFeedbacks = (data.good - data.bad) / allFeedbacks;
    const positiveFeedbacks = data.good / allFeedbacks;

    if (allFeedbacks) {
        return (
            <div>
                <h1>statistics</h1>
                <p>good {data.good}</p>
                <p>neutral {data.neutral}</p>
                <p>bad {data.bad}</p>
                <p>all {allFeedbacks}</p>
                {(!isNaN(avgFeedbacks)) && <p>average {avgFeedbacks}</p>}
                {(!isNaN(positiveFeedbacks)) && <p>positive {positiveFeedbacks}%</p>}
            </div>
        )
    } else {
        return <p>No feedback given</p>
    }
}

export default Statistics;