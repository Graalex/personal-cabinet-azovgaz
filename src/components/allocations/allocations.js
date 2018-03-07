import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import Error from '../error/error';
import Fetch from '../fetch/fetch';

import {getAllocations} from '../../redux/actions';

class Allocations extends PureComponent {
	componentDidMount() {
		const {ls, token, onAllocations} = this.props;
		onAllocations(ls,token);
	}
	
	render() {
		const {allocations, isFetch, isError, error} = this.props;
		const renderContent = (
			<section>
				<header>
					<h3>Начисления по лицевому счету</h3>
				</header>
				{
					allocations && allocations.length > 0 && (
						<table>
							<thead>
								<tr>
									<th>Год</th>
									<th>Месяц</th>
									<th>Начисленно, м<sup>3</sup></th>
									<th>Сумма, грн</th>
								</tr>
							</thead>
							<tbody>
								{
									allocations.map((item, index) => (
									<tr key={index}>
										<td>{item.year}</td>
										<td>{item.month}</td>
										<td>{item.volume}</td>
										<td>{item.total}</td>
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
		isFetch: state.cabinet.abonent.allocation.isFetching,
		isError: state.cabinet.abonent.allocation.isError,
		error: state.cabinet.abonent.allocation.error,
	}),
	dispatch => ({
		onAllocations: (ls, token) => dispatch(getAllocations(ls, token)),
	})
)(Allocations);