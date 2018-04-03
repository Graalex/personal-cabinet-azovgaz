import React from 'react';
import PropTypes from 'prop-types';

import './NavButton.css';

const NavButton = ({handleClick}) => (
	<a className="nav-button"
	   title="Показать меню"
	   onClick={handleClick}
	>
		<i className="nav-button__bars"/>
	</a>
);

NavButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
};

export default NavButton;
