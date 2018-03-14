import React from 'react';
import './Layout.css';

import Nav from '../Nav/Nav';
import Main from '../Main/Main';

const Layout = () => (
	<div className="page-layout">
		<aside className="page-menu"><Nav/></aside>
		<main className="page-main"><Main/></main>
	</div>
);

export default Layout;