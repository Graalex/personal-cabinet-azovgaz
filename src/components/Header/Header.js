import React from 'react';
import PropTypes from 'prop-types';

import NavButton from '../NavButton/NavButton';
import Logo from '../Logo/Logo';

import './Header.css';

const Header = () => (
	<header className="page-header">
		<div className="page-header__nav-button">
			<NavButton handleClick={alert('Click')}/>
		</div>
		<div className="page-header__logo">
			<Logo/>
		</div>
		<h1 className="page-header-caption">
			<p className="page-header-caption__title">ООО "АЗОВГАЗ"</p>
			<p className="page-header-caption__subtitle">Личный кабинет абонента</p>
		</h1>
	</header>
);

export default Header;
