import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
	<h1>{props.course}</h1>
);

const Part = (props) => (
	<p>{props.part} {props.exersice}</p>
);

const Content = (props) => (
	<div>
		<Part part={props.part1} exersice={props.exersices1} />
		<Part part={props.part2} exersice={props.exersices2} />
		<Part part={props.part3} exersice={props.exersices3} />
	</div>
);

const Total = (props) => (
	<p>
		Number of exercises 
		{props.exersices1 + props.exersices2 + props.exersices3}
	</p>
);

const App = () => {
	const course = 'Half Stack application development',
		part1 = 'Fundamentals of React',
		exersices1 = 10,
		part2 = 'Using props to pass data',
		exersices2 = 7,
		part3 = 'State of a component',
		exersices3 = 14;
	
	return (
		<div>
			<Header course={course} />
			<Content 
				part1={part1}
				part2={part2}
				part3={part3}
				exersices1={exersices1} 
				exersices2={exersices2} 
				exersices3={exersices3}
			/>
			<Total 
				exersices1={exersices1} 
				exersices2={exersices2} 
				exersices3={exersices3} 
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));