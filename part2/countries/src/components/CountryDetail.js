import React, { useState, useEffect} from 'react';
import Weather from './Weather';
import axios from 'axios';

const CountryDetail = ({ country }) => {
	const [weather, setWeather] = useState({
		weather_icons: []
	});
	const api_key = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
		.then(res => {
			setWeather(res.data.current);
		});
	}, [api_key, country.capital]);

	return (
		<div>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>languages</h3>
			<ul>
				{country.languages.map(lan =>
					<li key={lan.name}>{lan.name}</li>
				)}
			</ul>
			<p>
				<img src={country.flag} alt="flag" />
			</p>
			<h3>Weather in {country.capital}</h3>
			<Weather weather={weather} />
		</div>
	);
};

export default CountryDetail;