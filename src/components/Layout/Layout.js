import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Layout.css';

import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import Auth from '../Auth/Auth';
import Cabinet from '../Cabinet/Cabinet';

const Layout = ({isAuth, openSidebar}) => (
	<React.Fragment>
		<Header/>
		<Sidebar open={openSidebar}
		         display={isAuth}
		>
			<Nav/>
		</Sidebar>
		<Main>{isAuth ? <Cabinet/> : <Auth/>}</Main>
		<Footer>2017-2018&copy;ООО АЗОВГАЗ</Footer>
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