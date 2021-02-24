import React, { useState } from 'react';
import CountryDetail from './CountryDetail';

const CountryItem = ({ country }) => {
	const [shown, setShown] = useState(false);

	return (
		<div>{country.name}
			<button onClick={() => setShown(!shown)}>show</button>
			{shown ? <CountryDetail country={country} /> : ''}
		</div>
	);
};

export default CountryItem;