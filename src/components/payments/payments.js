import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import Error from '../error/error';
import Fetch from '../fetch/fetch';

import {getPayments} from '../../redux/actions';

class Payments extends PureComponent {
	componentDidMount() {
		const {ls, token, onPayments} = this.props;
		onPayments(ls, token);
	}
	
	render() {
		const {isFetch, isError, error, payments} = this.props;
		const renderContent = (
			<section>
				<header>
					<h3>Платежи по лицевому счету</h3>
				</header>
				{
					payments && payments.length > 0 && (
						<table>
							<thead>
								<tr>
									<th>Год</th>
									<th>Месяц</th>
									<th>Сумма, грн</th>
								</tr>
							</thead>
							<tbody>
								{
									payments.map((payment, index) => (
										<tr key={index}>
											<td>{payment.year}</td>
											<td>{payment.month}</td>
											<td>{payment.amount}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					)
				}
			</section>
		);
		const renderError = (
			<Error title="Ошибка получения данных"
			       subtitle="Произошла ошибка при получении данных о платежах"
			       message={error.message}
			/>
		);
		const renderFetch = (
			<Fetch message="Загрузка данных ..."/>
		);
		
		if (isError)
			return renderError;
		else if (isFetch)
			return renderFetch;
		else
			return renderContent;
	}
}

export default connect(
	state => ({
		ls: state.cabinet.authenticate.ls,
		token: state.cabinet.authenticate.token,
		payments: state.cabinet.abonent.payment.payments,
		isFetch: state.cabinet.abonent.payment.isFetching,
		isError: state.cabinet.abonent.payment.isError,
		error: state.cabinet.abonent.payment.error,
	}),
	dispatch => ({
		onPayments: (ls, token) => dispatch(getPayments(ls, token)),
	})
)(Payments);