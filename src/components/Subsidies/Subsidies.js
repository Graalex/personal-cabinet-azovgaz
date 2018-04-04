/**
 * /src/components/Subsidies/Subsidies.js
 * @module Subsidies/Subsidies
 * Компонент отображает субсидии по месяцам
 */
import React from 'react';
import PropTypes from 'prop-types';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from "../AccountTable";

const Subsidies = ({subsidies}) => {
	const subsHeader = [
		'Год',
		'Месяц',
		'Сумма, грн',
		'Обязательный платеж, грн',
	];
	
	let subsData;
	if (subsidies) {
		subsData = subsidies.map(item => ([
			item.year,
			item.month,
			new Intl.NumberFormat('ru', {style: 'currency',	currency: 'UAH'}).format(item.sum),
			new Intl.NumberFormat('ru', {style: 'currency',	currency: 'UAH'}).format(item.mandatory),
		]));
	}
	
	return (
		<section className="cabinet-section">
			<a name="subsidies">
				<HeaderPartion title="Субсидии по лицевому счету (свод по месяцам)"/>
			</a>
			{
				subsidies && subsidies.length > 0 && (
					<AccountTable headers={subsHeader}
					              data={subsData}
					/>
				)
			}
		</section>
	);
};

Subsidies.propTypes = {
	subsidies: PropTypes.array.isRequired,
};

export default Subsidies;