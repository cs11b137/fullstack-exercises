import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchStr, setSearchStr] = useState('');
	const [successMsg, setSuccessMsg] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		personService.getAll().then(persons => setPersons(persons));
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

	const handleDelClick = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			const currentPerson = persons.find(p => p.id === id);

			personService.remove(id, currentPerson).then(() => {
				setPersons(persons.filter(p => p.id !== currentPerson.id));
			});
		}
	};

	const addPerson = (event) => {
		event.preventDefault();

		if (!newName) {
			alert('The value is required!');
			return;
		}

		if (persons.map(p => p.name).includes(newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one`)) {
				const person = persons.find(p => p.name === newName);
				const changedPerson = {
					...person,
					number: newNumber
				};

				personService.update(changedPerson.id, changedPerson).then(returnedPerson => {
					setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson));
					setNewName('');
					setNewNumber('');
					setSuccessMsg(`${returnedPerson.name} updated`);
					setTimeout(() => {
						setSuccessMsg(null);
					}, 3000);
				}).catch(error => {
					setErrorMsg(`the ${person.name} was already deleted from server`);
					setTimeout(() => {
						setErrorMsg(null);
					}, 3000);
					setPersons(persons.filter(p => p.id !== person.id));
				});
			}
            return;
		}

		const personObject = {
			name: newName,
			number: newNumber
		};

		personService.create(personObject).then(person => {
			setPersons(persons.concat(person));
			setNewName('');
			setNewNumber('');
			setSuccessMsg(`${person.name} added`);
			setTimeout(() => {
				setSuccessMsg(null);
			}, 3000);
		});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMsg} status="success" />
			<Notification message={errorMsg} status="error" />
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
		  	{persons.map(p => 
				<Person key={p.id} person={p} handleDelClick={() => handleDelClick(p.id, p.name)} />
			)}
		</div>
	)
};

export default App;