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

  const addGoodFeedback = () => setGood(good + 1);
  const addNeutralFeedback = () => setNeutral(neutral + 1);
  const addBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGoodFeedback} text="good" />
      <Button handleClick={addNeutralFeedback} text="neutral" />
      <Button handleClick={addBadFeedback} text="bad" />
      <Statistics data={feedbackValues} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))