import React from 'react';

const Filter = ({ searchStr, handleSearchStrChange }) => (
	<div>
		filter shown with: <input value={searchStr} onChange={handleSearchStrChange} />
	</div>
);

export default Filter;