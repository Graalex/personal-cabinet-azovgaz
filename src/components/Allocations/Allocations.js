/**
 * /src/components/Allocations/Allocations.js
 * @module Allocations/Allocations
 * Компонент отображающий начисления и корректировки по месяцам
 */
import React from 'react';
import PropTypes from 'prop-types';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

const Allocations = ({allocations, corrections}) => {
	let allocs;
	let corrects;
	
	const allocHeader = [
		'Год',
		'Месяц',
		'Начисленно, куб. м',
		'Сумма, грн'
	];
	
	if (allocations) {
		allocs = allocations.map(item => ([
			item.year,
			item.month,
			new Intl.NumberFormat('ru').format(item.volume),
			new Intl.NumberFormat('ru', {style: 'currency', currency: 'UAH'}).format(item.total),
		]));
	}
		
	const correctHeader = [
		'Год',
		'Месяц',
		'Объем, куб. м',
		'Сумма, грн'
	];
	
	if (corrections) {
		corrects= corrections.map(item => ([
			item.year,
			item.month,
			new Intl.NumberFormat('ru').format(item.volume),
			new Intl.NumberFormat('ru', {style: 'currency', currency: 'UAH'}).format(item.amount),
		]));
	}
	
	return (
		<section className="cabinet-section">
			<a name="allocations">
				<HeaderPartion title="Начисления по лицевому счету (свод по месяцам)"/>
			</a>
			{allocations && allocations.length > 0 && (
				<AccountTable headers={allocHeader}
				              data={allocs}
				/>
			)}
			
			{
				corrections && corrections.length > 0 && (
					<section>
						<HeaderPartion title="Корректировки по лицевому счету (свод по месяцам)"
						               level={3}
						/>
						<AccountTable headers={correctHeader}
						              data={corrects}
						/>
					</section>
				)
			}
		</section>
	);
};

Allocations.propTypes = {
	allocations: PropTypes.array,
	corrections: PropTypes.array,
};

export default Allocations;