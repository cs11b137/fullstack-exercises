import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchStr, setSearchStr] = useState('');

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchStrChange = (event) => {
		setSearchStr(event.target.value);
		const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(event.target.value) === true);
		setPersons(filteredPersons);
	};

	const addPerson = (event) => {
		event.preventDefault();

		if (!newName) {
			alert('The value is required!');
			return;
		}

		if (persons.map(p => p.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber
		};
		setPersons(persons.concat(personObject));
		setNewName('');
		setNewNumber('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchStr={searchStr} handleSearchStrChange={handleSearchStrChange} />
			<h2>add a new</h2>
			<PersonForm 
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
		  	<Persons persons={persons} />
		</div>
	)
};

export default App;