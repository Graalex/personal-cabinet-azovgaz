import React from 'react';

import './Anchor.css';

const Anchor = ({
	name,
	children,
	active,
	onClick,
}) => (
	active ?
		(<li className="anchor-item anchor-item--active">{children}</li>) :
		(<li className="anchor-item"><a href={`/#${name}`} onClick={onClick}>{children}</a></li>)
);

export default Anchor;