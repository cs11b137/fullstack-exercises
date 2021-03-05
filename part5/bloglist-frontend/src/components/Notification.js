import React from 'react';

const Notification = ({ message, status }) => {
	if (message === null) {
		return null;
	}

	switch (status) {
		case 'success':
			return <div className="msg msg--success">{message}</div>;

		case 'error':
			return <div className="msg msg--error">{message}</div>;
	
		default:
			break;
	}
};

export default Notification;