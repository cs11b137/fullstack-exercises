import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import FilteredCountries from './components/FilteredCountries';

const App = () => {
	const [searchStr, setSearchStr] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then(res => {
			setCountries(res.data);
		});
	}, []);

	const handleSearchStrChange = (event) => {
		setSearchStr(event.target.value);
		const filteredCountries = countries.filter(c => 
			c.name.toLowerCase().includes(event.target.value.toLowerCase()) === true
		);

		setCountries(filteredCountries);
	};

	return (
		<div>
			<Filter searchStr={searchStr} handleSearchStrChange={handleSearchStrChange} />
			<FilteredCountries filteredCountries={countries} />
		</div>
	);
};

export default App;