import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import Account from '../account/account';
import Allocations from '../allocations/allocations';
import Payments from '../payments/payments';
import Subsidies from '../subsidies/subsidies';
import Error from '../error/error';
import Fetch from '../fetch/fetch';

import {getAccount} from '../../redux/actions';

class Main extends PureComponent {
	componentDidMount() {
		const {ls, token, onAccount} = this.props;
		
		onAccount(ls, token);
	}
	
	render() {
		const {isFetch, isError, error} = this.props;
		const renderFetch = (
			<Fetch message="Загрузка данных ..."/>
		);
		
		const renderError = (
			<Error title="Ошибка"
			       subtitle="Ошибка при загрузке данных о лицевом счете"
			       message={error.message}
			/>
		);
		
		const renderContent = (
			<React.Fragment>
				<Account/>
				<Allocations/>
				<Payments/>
				<Subsidies/>
			</React.Fragment>
		);
		
		if (isFetch)
			return renderFetch;
		else if (isError)
			return renderError;
		else
			return renderContent;
	}
}

export default connect(
	state => ({
		ls: state.cabinet.authenticate.ls,
		token: state.cabinet.authenticate.token,
		isFetch: state.cabinet.abonent.isFetching,
		isError: state.cabinet.abonent.isError,
		error: state.cabinet.abonent.error,
	}),
	dispatch => ({
		onAccount: (ls, token) => dispatch(getAccount(ls, token)),
	})
)(Main);