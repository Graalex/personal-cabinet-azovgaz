/**
 * /src/components/Payments/Payments.js
 * @module Payments/Payments
 * Компонент отображает платежи по месяцам
 */
import React from 'react';
import PropTypes from 'prop-types';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

const Payments = ({payments}) => {
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
	
	return (
		<section className="cabinet-section">
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
};

Payments.propTypes = {
	payments: PropTypes.array.isRequired,
};

export default Payments;