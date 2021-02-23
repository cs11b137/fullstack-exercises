import React from 'react';

const Header = ({ name }) => (
	<h1>{name}</h1>
);

const Part = ({ part }) => (
	<p>{part.name} {part.exercises}</p>
);

const Content = ({ parts }) => (
	<div>
		{parts.map(part => 
			<Part key={part.id} part={part} />
		)}
	</div>
);

const Total = ({ parts }) => (
	<p>
		<strong>total of {
		parts.map(part => part.exercises).reduce((acc, cur) => (acc + cur))
		} exercises
		</strong>
	</p>
);

const Course = ({ course }) => (
	<div>
		<Header name={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

export default Course;