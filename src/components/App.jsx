import React, { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOption/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export default function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = option => {
    setFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
}

// class oldApp extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleFeedback = option => {
//     this.setState(prevState => ({
//       [option]: prevState[option] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     const total = this.countTotalFeedback();
//     return total ? Math.round((good / total) * 100) : 0;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <>
//         <Section title="Please leave your feedback">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.handleFeedback}
//           />
//         </Section>

//         <Section title="Statistics">
//           {total === 0 ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           )}
//         </Section>
//       </>
//     );
//   }
// }

// export default App;
