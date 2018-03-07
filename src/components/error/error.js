import React from 'react';

const Error = ({title, subtitle, message}) => (
	<div>
		<header>
			<h3>{title}</h3>
			<p>{subtitle}</p>
		</header>
		<div>{message}</div>
	</div>
);

export default Error;
