import React from 'react';
import CountryItem from './CountryItem';
import CountryDetail from './CountryDetail';

const FilteredCountries = ({ filteredCountries }) => {
	if (filteredCountries.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		);
	}

	if (filteredCountries.length === 1) {
		return (
			<CountryDetail country={filteredCountries[0]} />
		);
	}

	return (
		<div>
			{filteredCountries.map(c => 
				<CountryItem key={c.name} country={c} />
			)}
		</div>
	);
};

export default FilteredCountries;