/**
 * /src/components/Allocations/Allocations.js
 * @module Allocations/Allocations
 * Компонент отображающий начисления и корректировки по месяцам
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

import './Allocations.css';

import Error from '../Error/Error';
import Fetch from '../Fetch/Fetch';

import {getAllocations} from '../../redux/actions';

class Allocations extends PureComponent {
	componentDidMount() {
		const {ls, token, onAllocations} = this.props;
		onAllocations(ls,token);
	}
	
	render() {
		const {
			allocations,
			corrections,
			isFetch,
			isError,
			error
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
		
		const renderContent = (
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
		const renderError = (
			<Error title="Ошибка зарузки"
			       subtitle="Произошла ошибка при загрузки данных о начислениях"
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

Allocations.propTypes = {
	allocations: PropTypes.array,
	corrections: PropTypes.array,
};

export default connect(
	state => ({
		ls: state.cabinet.authenticate.ls,
		token: state.cabinet.authenticate.token,
		allocations: state.cabinet.abonent.allocation.allocations,
		corrections: state.cabinet.abonent.allocation.corrections,
		isFetch: state.cabinet.abonent.allocation.isFetching,
		isError: state.cabinet.abonent.allocation.isError,
		error: state.cabinet.abonent.allocation.error,
	}),
	dispatch => ({
		onAllocations: (ls, token) => dispatch(getAllocations(ls, token)),
	})
)(Allocations);