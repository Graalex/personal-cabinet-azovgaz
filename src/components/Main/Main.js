import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Account} from '../Account';
import Allocations from '../Allocations/Allocations';
import Payments from '../Payments/Payments';
import Subsidies from '../Subsidies/Subsidies';
import {Popup} from '../Popup';
import {Loader} from '../Loader';

import {
	getAccount,
	getAllocations,
	getPayments,
	getSubsidies,
} from '../../redux/actions';

class Main extends PureComponent {
	componentDidMount() {
		const {
			ls,
			token,
			onAccount,
			onAllocation,
			onPayment,
			onSubsidie,
		} = this.props;
		
		onAccount(ls, token);
		onAllocation(ls, token);
		onPayment(ls, token);
		onSubsidie(ls, token);
	}
	
	render() {
		const {
			abonent,
			allocation,
			payment,
			subsidie,
		} = this.props;
		
		return (
			<React.Fragment>
				{
					abonent.isFetching ? <Loader message="Загрузка данных о лицевом счете"/> : (
						abonent.isError ? <Popup caption="Ошибка!" message={abonent.error.message}/> :
							<Account account={abonent.account}/>
					)
				}
				
				{
					allocation.isFetch ? <Loader message="Загрузка данных о начислениях"/> : (
						allocation.isError ? <Popup caption="Ошибка!" message={allocation.error.message}/> :
							<Allocations allocations={allocation.allocations} corrections={allocation.corrections}/>
					)
				}
				
				{
					payment.isFetch ? <Loader message="Загрузка данных о платежах"/> : (
						payment.isError ? <Popup caption="Ошибка!" message={payment.error.message}/> :
							<Payments payments={payment.payments}/>
					)
				}
				
				{
					subsidie.isFetch ? <Loader message="Загрузка данных о субсидиях"/> : (
						subsidie.isError ? <Popup caption="Ошибка!" message={subsidie.error.message}/> :
							<Subsidies subsidies={subsidie.subsidies}/>
					)
				}
				
			</React.Fragment>
		);
	}
}

export default connect(
	state => ({
		ls: state.cabinet.authenticate.ls,
		token: state.cabinet.authenticate.token,
		abonent: state.cabinet.abonent,
		allocation: state.cabinet.abonent.allocation,
		payment: state.cabinet.abonent.payment,
		subsidie: state.cabinet.abonent.subsidie,
	}),
	dispatch => ({
		onAccount: (ls, token) => dispatch(getAccount(ls, token)),
		onAllocation: (ls, token) => dispatch(getAllocations(ls, token)),
		onPayment: (ls, token) => dispatch(getPayments(ls, token)),
		onSubsidie: (ls, token) => dispatch(getSubsidies(ls, token)),
	})
)(Main);