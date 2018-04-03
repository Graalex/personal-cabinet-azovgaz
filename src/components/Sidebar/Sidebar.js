import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

const Sidebar = ({display, open, children}) => (
	<aside className={display ? (open ? 'page-sidebar open' : 'page-sidebar') : 'page-sidebar hidden'}>
		{children}
	</aside>
);

Sidebar.propTypes = {
	open: PropTypes.bool.isRequired,
	display: PropTypes.bool.isRequired,
	children: PropTypes.any,
};

export default Sidebar;
