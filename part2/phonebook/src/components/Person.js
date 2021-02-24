import React from 'react';

const Person = ({ person, handleDelClick }) => {
	return (
		<p>{person.name} {person.number} 
		<button onClick={handleDelClick}>delete</button>
	</p>
	);
};

export default Person;