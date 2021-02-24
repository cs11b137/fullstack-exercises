import React from 'react';

const Weather = ({ weather }) => {
	return (
		<div>
			<p><strong>temperature:</strong> {weather.temperature} Celcius</p>
			<p>
				<img src={weather.weather_icons[0]} alt="weather icon" />
			</p>
			<p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
		</div>
	);
};

export default Weather;