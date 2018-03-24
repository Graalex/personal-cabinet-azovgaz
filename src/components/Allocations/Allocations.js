import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

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
		const renderContent = (
			<section className="allocations">
				<a name="allocations">
					<header className="allocations-header">
						<h3 className="allocations-header__title">Начисления по лицевому счету (свод по месяцам)</h3>
					</header>
				</a>
				{
					allocations && allocations.length > 0 && (
						<table className="allocations-table">
							<thead>
								<tr className="allocations-table__head">
									<th>Год</th>
									<th>Месяц</th>
									<th>Начисленно, м<sup>3</sup></th>
									<th>Сумма, грн</th>
								</tr>
							</thead>
							<tbody>
								{
									allocations.map((item, index) => (
									<tr className="allocations-table__data" key={index}>
										<td>{item.year}</td>
										<td>{item.month}</td>
										<td>
											{
												new Intl.NumberFormat('ru')
													.format(item.volume)
											}
											</td>
										<td>
											{
												new Intl.NumberFormat('ru', {
													style: 'currency',
													currency: 'UAH'
												})
													.format(item.total)
											}
											</td>
									</tr>
									))
								}
							</tbody>
						</table>
					)
				}
				
				{
					corrections && corrections.length > 0 && (
						<section>
							<header className="allocations-header">
								<h3 className="allocations-header__title">Корректировки по лицевому счету (свод по месяцам)</h3>
							</header>
							<table className="allocations-table">
								<thead>
									<tr className="allocations-table__head">
										<th>Год</th>
										<th>Месяц</th>
										<th>Объем, м<sup>3</sup></th>
										<th>Сумма, грн</th>
									</tr>
								</thead>
								<tbody>
									{
										corrections.map((item, index) => (
											<tr className="allocations-table__data" key={index}>
												<td>{item.year}</td>
												<td>{item.month}</td>
												<td>
													{
														new Intl.NumberFormat('ru')
															.format(item.volume)
													}
												</td>
												<td>
													{
														new Intl.NumberFormat('ru', {
															style: 'currency',
															currency: 'UAH'
														})
															.format(item.amount)
													}
												</td>
											</tr>
										))
									}
								</tbody>
							</table>
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