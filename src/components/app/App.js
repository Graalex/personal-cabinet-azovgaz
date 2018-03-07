import React from 'react';
import {connect} from 'react-redux';

import Auth from '../auth/auth';
import Layout from '../layout/layout';

const App = ({isAuth}) => (
	isAuth ? <Layout/> : <Auth handleSubmit={this.login}/>
);

export default connect(
  state => ({isAuth: state.cabinet.authenticate.isAuth})
)(App);
