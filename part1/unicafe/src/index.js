import React, {
	useState
} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	if ((good + neutral + bad) > 0) {
		return (
			<table>
				<tbody>
					<Statistic text="good" value={good} />
					<Statistic text="neutral" value={neutral} />
					<Statistic text="bad" value={bad} />
					<Statistic text="all" value={good + neutral + bad} />
					<Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
					<Statistic text="positive" value={good / (good + neutral + bad)} />
				</tbody>
			</table>
		);
	}

	return (
		<div>
			<p>No feedback given</p>
		</div>
	);
};

const Button = ({ text, handleClick }) => (
	<button onClick={handleClick}>{text}</button>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<p>
				<Button text="good" handleClick={() => setGood(good + 1)}/>
				<Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
				<Button text="bad" handleClick={() => setBad(bad + 1)}/>
			</p>
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));