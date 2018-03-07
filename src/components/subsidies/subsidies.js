import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import Error from '../error/error';
import Fetch from '../fetch/fetch';

import {getSubsidies} from '../../redux/actions';

class Subsidies extends PureComponent {
	componentDidMount() {
		const {ls, token, onSubsidies} = this.props;
		onSubsidies(ls, token);
	}
	
	render() {
		const {isFetch, isError, error, subsidies} = this.props;
		const renderContent = (
			<section>
				<header>
					<h3>Субсидии по лицевому счету</h3>
				</header>
				{
					subsidies && subsidies.length > 0 && (
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
								subsidies.map((subsidie, index) => (
									<tr key={index}>
										<td>{subsidie.year}</td>
										<td>{subsidie.month}</td>
										<td>{subsidie.sum}</td>
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
			       subtitle="Произошла ошибка при получении данных о субсидиях"
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
		subsidies: state.cabinet.abonent.subsidie.subsidies,
		isFetch: state.cabinet.abonent.subsidie.isFetching,
		isError: state.cabinet.abonent.subsidie.isError,
		error: state.cabinet.abonent.subsidie.error,
	}),
	dispatch => ({
		onSubsidies: (ls, token) => dispatch(getSubsidies(ls, token)),
	})
)(Subsidies);