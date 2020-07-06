import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Statistics from './Statistics';


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackValues = {
    good,
    neutral,
    bad
  }

  const allFeedbacks = Object.values(feedbackValues).reduce((a, b) => a + b);
  const avgFeedbacks = (feedbackValues.good - feedbackValues.bad) / allFeedbacks;
  const positiveFeedbacks = (feedbackValues.good / allFeedbacks) * 100;

  const addGoodFeedback = () => setGood(good + 1);
  const addNeutralFeedback = () => setNeutral(neutral + 1);
  const addBadFeedback = () => setBad(bad + 1);

  if (allFeedbacks) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={addGoodFeedback} text="good" />
        <Button handleClick={addNeutralFeedback} text="neutral" />
        <Button handleClick={addBadFeedback} text="bad" />
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistics value={good} text="good" />
            <Statistics value={neutral} text="neutral" />
            <Statistics value={bad} text="bad" />
            <Statistics value={allFeedbacks} text="all" />
            {(!isNaN(avgFeedbacks)) && <Statistics value={avgFeedbacks} text="average" />}
            {(!isNaN(positiveFeedbacks)) && <Statistics value={positiveFeedbacks} text="positive" />}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={addGoodFeedback} text="good" />
        <Button handleClick={addNeutralFeedback} text="neutral" />
        <Button handleClick={addBadFeedback} text="bad" />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))