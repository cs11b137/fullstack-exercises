import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => (
	<h1>{name}</h1>
);

const Part = ({ name, exersices }) => (
	<p>{name} {exersices}</p>
);

const Content = ({ parts }) => (
	<div>
		{
			parts.map(part => (
				<Part name={part.name} exersices={part.exersices} />
			))
		}
		
	</div>
);

const Total = ({ parts }) => {
	let total = 0;
	parts.forEach(part => total += part.exersices);

	return (
		<p>Number of exercises {total}</p>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exersices: 10
			},
			{
				name: 'Using props to pass data',
				exersices: 7
			},
			{
				name: 'State of a component',
				exersices: 14
			}
		]
	};

	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));