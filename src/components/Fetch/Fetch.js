import React from 'react';
import './Fetch.css';

const Fetch = ({message}) => (
	<div className="fetch__hoder">
		<p className="fetch__message">{message}</p>
		<div className="fetch__preloader">
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
		</div>
	</div>
);

export default Fetch;