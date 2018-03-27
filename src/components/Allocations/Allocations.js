/**
 * /src/components/Allocations/Allocations.js
 * @module Allocations/Allocations
 * Компонент отображающий начисления и корректировки по месяцам
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

import './Allocations.css';

class Allocations extends PureComponent {
		render() {
		const {
			allocations,
			corrections,
		} = this.props;
		
		const allocHeader = [
			'Год',
			'Месяц',
			'Начисленно, куб. м',
			'Сумма, грн'
		];
		const allocData = allocations.map(item => ([
			item.year,
			item.month,
			new Intl.NumberFormat('ru').format(item.volume),
			new Intl.NumberFormat('ru', {style: 'currency', currency: 'UAH'}).format(item.total),
		]));
		
		const correctHeader = [
			'Год',
			'Месяц',
			'Объем, куб. м',
			'Сумма, грн'
		];
		let correctData;
		if (corrections) {
			correctData = corrections.map(item => ([
				item.year,
				item.month,
				new Intl.NumberFormat('ru').format(item.volume),
				new Intl.NumberFormat('ru', {style: 'currency', currency: 'UAH'}).format(item.amount),
			]));
		}
		
		return (
			<section className="allocations">
				<a name="allocations">
					<HeaderPartion title="Начисления по лицевому счету (свод по месяцам)"/>
				</a>
				{allocations && allocations.length > 0 && (
					<AccountTable headers={allocHeader}
					              data={allocData}
					/>
				)}
				
				{
					corrections && corrections.length > 0 && (
						<section>
							<HeaderPartion title="Корректировки по лицевому счету (свод по месяцам)"
							               level={3}
							/>
							<AccountTable headers={correctHeader}
							              data={correctData}
							/>
						</section>
					)
				}
			</section>
		);
	}
}

Allocations.propTypes = {
	allocations: PropTypes.array,
	corrections: PropTypes.array,
};

export default Allocations;