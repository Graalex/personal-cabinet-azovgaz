import React from 'react';
import './Layout.css';

import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Aside from '../Aside/Aside';

const Layout = () => (
	<React.Fragment>
		<Header/>
		<Aside/>
		<Main/>
		<Footer/>
	</React.Fragment>
	/*
	<div className="page-layout">
		<aside className="page-menu"><Nav/></aside>
		<main className="page-main"><Main/></main>
	</div>
	*/
);

export default Layout;