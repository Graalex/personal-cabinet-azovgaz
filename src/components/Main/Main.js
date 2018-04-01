import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Account} from '../Account';
import Allocations from '../Accruals/Accruals';
import Payments from '../Payments/Payments';
import Subsidies from '../Subsidies/Subsidies';
import {Popup} from '../Popup';
import {Loader} from '../Loader';

import {
	getAccount,
	getAccruals,
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
			uploadAccruals,
			uploadPayments,
			onSubsidie,
			uploadEquipments,
			uploadBeneficiaries,
		} = this.props;
		
		uploadEquipments(ls, token);
		uploadAccount(ls, token);
		uploadBeneficiaries(ls, token);
		uploadAccruals(ls, token);
		uploadPayments(ls, token);
		onSubsidie(ls, token);
	}
	
	render() {
		const {
			account,
			equipments,
			beneficiaries,
			accruals,
			payments,
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
					accruals.uploading ? <Loader message="Загрузка данных о начислениях"/> : (
						accruals.isError ? <Popup caption="Ошибка!" message={accruals.error.message}/> :
							<Allocations allocations={accruals.allocations}
							             corrections={accruals.corrections}
							             price={accruals.price}
							             balance={accruals.balance}
							/>
					)
				}
				
				{
					payments.uploading ? <Loader message="Загрузка данных о платежах"/> : (
						payments.isError ? <Popup caption="Ошибка!" message={payments.error.message}/> :
							<Payments payments={payments.list}/>
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
		accruals: {...state.accruals},
		payments: {...state.payments},
		subsidie: state.cabinet.abonent.subsidie,
	}),
	dispatch => ({
		uploadAccount: (ls, token) => dispatch(getAccount(ls, token)),
		uploadAccruals: (ls, token) => dispatch(getAccruals(ls, token)),
		uploadPayments: (ls, token) => dispatch(getPayments(ls, token)),
		onSubsidie: (ls, token) => dispatch(getSubsidies(ls, token)),
		uploadEquipments: (ls, token) => dispatch(getEquipments(ls, token)),
		uploadBeneficiaries: (ls, token) => dispatch(getBeneficiaries(ls, token)),
	})
)(Main);