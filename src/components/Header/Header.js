import React from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import bars from './bars.svg';
import './Header.css';

const Header = () => (
	<header className="page-header">
		<div className="page-header-logo">
			<i className="bars"/>
		</div>
		<h1 className="page-header-caption">
			<p className="page-header-caption__title">ООО "АЗОВГАЗ"</p>
			<p className="page-header-caption__subtitle">Личный кабинет абонента</p>
		</h1>
	</header>
);

export default Header;
