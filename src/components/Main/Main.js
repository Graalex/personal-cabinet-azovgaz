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
	getEquipments,
	getBeneficiaries,
} from '../../redux/actions';

class Main extends PureComponent {
	componentDidMount() {
		const {
			ls,
			token,
			uploadAccount,
			onAllocation,
			onPayment,
			onSubsidie,
			uploadEquipments,
			uploadBeneficiaries,
		} = this.props;
		
		uploadEquipments(ls, token);
		uploadAccount(ls, token);
		uploadBeneficiaries(ls, token);
		onAllocation(ls, token);
		onPayment(ls, token);
		onSubsidie(ls, token);
	}
	
	render() {
		const {
			account,
			equipments,
			beneficiaries,
			allocation,
			payment,
			subsidie,
		} = this.props;
		
		return (
			<React.Fragment>
				{
					account.uploading ? <Loader message="Загрузка данных о лицевом счете"/> : (
						account.error ? <Popup caption="Ошибка!" message={account.error.message}/> :
							<Account account={account}
							         equipments={equipments}
							         beneficiaries={beneficiaries}
							/>
					)
				}
				
				{
					allocation.isFetch ? <Loader message="Загрузка данных о начислениях"/> : (
						allocation.isError ? <Popup caption="Ошибка!" message={allocation.error.message}/> :
							<Allocations allocations={allocation.allocations}
							             corrections={allocation.corrections}
							             price={allocation.price}
							             balance={allocation.balance}
							/>
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
							subsidie.subsidies.length > 0 && <Subsidies subsidies={subsidie.subsidies}/>
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
		account: {...state.account},
		equipments: {...state.equipments},
		beneficiaries: {...state.beneficiaries},
		allocation: state.cabinet.abonent.allocation,
		payment: state.cabinet.abonent.payment,
		subsidie: state.cabinet.abonent.subsidie,
	}),
	dispatch => ({
		uploadAccount: (ls, token) => dispatch(getAccount(ls, token)),
		onAllocation: (ls, token) => dispatch(getAllocations(ls, token)),
		onPayment: (ls, token) => dispatch(getPayments(ls, token)),
		onSubsidie: (ls, token) => dispatch(getSubsidies(ls, token)),
		uploadEquipments: (ls, token) => dispatch(getEquipments(ls, token)),
		uploadBeneficiaries: (ls, token) => dispatch(getBeneficiaries(ls, token)),
	})
)(Main);