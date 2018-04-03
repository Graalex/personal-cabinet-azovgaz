import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Layout.css';

import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({isAuth, openSidebar}) => (
	<React.Fragment>
		<Header/>
		<Sidebar open={openSidebar}/>
		<Main/>
		<Footer/>
	</React.Fragment>
);

Layout.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	openSidebar: PropTypes.bool.isRequired,
};

export default connect(state => ({
	isAuth: state.auth.isAuth,
	openSidebar: state.widgets.openedSidebar,
}))(Layout);