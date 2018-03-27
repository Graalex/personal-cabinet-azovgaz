/**
 * /src/components/Subsidies/Subsidies.js
 * @module Subsidies/Subsidies
 * Компонент отображает субсидии по месяцам
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from "../AccountTable";

import './Subsidies.css';


class Subsidies extends PureComponent {
	render() {
		const {subsidies} = this.props;
		const subsHeader = [
			'Год',
			'Месяц',
			'Сумма, грн',
		];
		let subsData;
		if (subsidies) {
			subsData = subsidies.map(item => ([
				item.year,
				item.month,
				new Intl.NumberFormat('ru', {style: 'currency',	currency: 'UAH'}).format(item.sum),
			]));
		}
		
		return (
			<section className="subsidies">
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
	}
}

Subsidies.propTypes = {
	subsidies: PropTypes.array.isRequired,
};

export default Subsidies;