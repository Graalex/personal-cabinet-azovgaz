/**
 * /src/components/Payments/Payments.js
 * @module Payments/Payments
 * Компонент отображает платежи по месяцам
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Error from '../Error/Error';
import Fetch from '../Fetch/Fetch';
import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

import {getPayments} from '../../redux/actions';

import './Payments.css';

class Payments extends PureComponent {
	componentDidMount() {
		const {ls, token, onPayments} = this.props;
		onPayments(ls, token);
	}
	
	render() {
		const {isFetch, isError, error, payments} = this.props;
		const payHeader = [
			'Год',
			'Месяц',
			'Сумма, грн',
		];
		let payData;
		if (payments) {
			payData = payments.map(item => ([
				item.year,
				item.month,
				new Intl.NumberFormat('ru', {style: 'currency',	currency: 'UAH'}).format(item.amount),
			]));
		}
		const renderContent = (
			<section className="payments">
				<a name="payments">
					<HeaderPartion title="Платежи по лицевому счету (свод по месяцам)"/>
				</a>
				{
					payments && payments.length > 0 && (
						<AccountTable headers={payHeader}
						              data={payData}
						/>
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

Payments.propTypes = {
	payments: PropTypes.array.isRequired,
};

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