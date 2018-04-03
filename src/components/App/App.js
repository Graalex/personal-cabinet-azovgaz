import React from 'react';
import {connect} from 'react-redux';

import Auth from '../Auth/Auth';
import Layout from '../Layout/Layout';
import MenuSwitch from '../NavButton/NavButton';

import './App.css';

const App = ({isAuth}) => (
	<Layout/>
	/*
	<React.Fragment>
		<header className="page-header">
			<div className="page-header-logo">
				<img className="page-header-logo__img" src={logo} alt="Личный кабинет ООО АЗОВГАЗ"/>
				<NavButton/>
			</div>
			<h1 className="page-header-caption">
				<p className="page-header-caption__title">ООО "АЗОВГАЗ"</p>
				<p className="page-header-caption__subtitle">Личный кабинет абонента</p>
			</h1>
		</header>
		{isAuth ? <Layout/> : <Auth/>}
		<footer className="page-footer">ООО "АЗОВГАЗ"</footer>
	</React.Fragment>
	*/
);

export default connect(
  state => ({isAuth: state.auth.isAuth})
)(App);
