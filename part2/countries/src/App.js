import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

		if (filteredCountries.length > 10) {

		}

		if (filteredCountries.length === 1) {

		}

		setCountries(filteredCountries);
	};

	return (
		<div>
			<div>
				find countries <input value={searchStr} onChange={handleSearchStrChange} />
			</div>
			<div></div>
		</div>
	);
};

export default App;