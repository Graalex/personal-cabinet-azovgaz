import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

const Sidebar = ({open, children}) => (
	<aside className={open ? 'page-sidebar open' : 'page-sidebar'}>
		{children}
	</aside>
);

Sidebar.propTypes = {
	open: PropTypes.bool.isRequired,
	children: PropTypes.any,
};

export default Sidebar;
