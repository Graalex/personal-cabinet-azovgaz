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

import './Main.css';

const Main = () => (
	<main className="page-main">
		<h2>PAGE MAIN</h2>
	</main>
);

export default Main;

/*
class Main extends PureComponent {
	componentDidMount() {
		const {
			ls,
			token,
			uploadAccount,
			uploadAccruals,
			uploadPayments,
			uploadSubsidies,
			uploadEquipments,
			uploadBeneficiaries,
		} = this.props;
		
		uploadEquipments(ls, token);
		uploadAccount(ls, token);
		uploadBeneficiaries(ls, token);
		uploadAccruals(ls, token);
		uploadPayments(ls, token);
		uploadSubsidies(ls, token);
	}
	
	render() {
		const {
			account,
			equipments,
			beneficiaries,
			accruals,
			payments,
			subsidies,
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
							payments.list && <Payments payments={payments.list}/>
					)
				}
				
				{
					subsidies.uploading ? <Loader message="Загрузка данных о субсидиях"/> : (
						subsidies.isError ? <Popup caption="Ошибка!" message={subsidies.error.message}/> :
							subsidies.list &&	subsidies.list.length > 0 && <Subsidies subsidies={subsidies.list}/>
					)
				}
				
			</React.Fragment>
		);
	}
}

export default connect(
	state => ({
		ls: state.auth.ls,
		token: state.auth.token,
		account: {...state.account},
		equipments: {...state.equipments},
		beneficiaries: {...state.beneficiaries},
		accruals: {...state.accruals},
		payments: {...state.payments},
		subsidies: {...state.subsidies},
	}),
	dispatch => ({
		uploadAccount: (ls, token) => dispatch(getAccount(ls, token)),
		uploadAccruals: (ls, token) => dispatch(getAccruals(ls, token)),
		uploadPayments: (ls, token) => dispatch(getPayments(ls, token)),
		uploadSubsidies: (ls, token) => dispatch(getSubsidies(ls, token)),
		uploadEquipments: (ls, token) => dispatch(getEquipments(ls, token)),
		uploadBeneficiaries: (ls, token) => dispatch(getBeneficiaries(ls, token)),
	})
)(Main);
*/