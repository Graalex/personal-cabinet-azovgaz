import React from 'react';

import Nav from '../nav/nav';
import Main from '../main/main';

const Layout = () => (
	<React.Fragment>
		<aside><Nav/></aside>
		<main><Main/></main>
	</React.Fragment>
);

export default Layout;