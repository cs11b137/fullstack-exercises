import React from 'react';

const Filter = ({ searchStr, handleSearchStrChange }) => (
	<div>
		find countries <input value={searchStr} onChange={handleSearchStrChange} />
	</div>
);

export default Filter;