import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import NavButton from '../NavButton/NavButton';
import Logo from '../Logo/Logo';
import {toggleSidebar} from '../../redux/actions';

import './Header.css';

const Header = ({onToggleSidebar}) => (
	<header className="page-header">
		<div className="page-header__nav-button">
			<NavButton handleClick={onToggleSidebar}/>
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

Header.propTypes = {
	onToogleSidebar: PropTypes.func,
};

export default connect(
	null,
	dispatch => ({onToggleSidebar: () => dispatch(toggleSidebar()),})
)(Header);
