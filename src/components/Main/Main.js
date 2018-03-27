import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Account} from '../Account';
import Allocations from '../Allocations/Allocations';
import Payments from '../Payments/Payments';
import Subsidies from '../Subsidies/Subsidies';
import Error from '../Error/Error';
import Fetch from '../Loader/Loader';

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