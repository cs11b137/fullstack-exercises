import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchStr, setSearchStr] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(res => {
			setPersons(res.data);
		});
	}, []);

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