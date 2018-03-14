import React from 'react';

import './Error.css';

const Error = ({title, subtitle, message}) => (
	<div className="error__holder">
		<section className="error-dialog">
			<header className="error-dialog-header">
				<h3 className="error-dialog-header__title">{title}</h3>
				<p className="error-dialog-header__subtitle">{subtitle}</p>
			</header>
			<div className="error-dialog__message">{message}</div>
		</section>
	</div>
);

export default Error;
