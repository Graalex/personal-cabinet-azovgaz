/**
 * /src/components/Subsidies/Subsidies.js
 * @module Subsidies/Subsidies
 * Компонент отображает субсидии по месяцам
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Error from '../Error/Error';
import Fetch from '../Loader/Loader';
import {HeaderPartion} from '../HeaderPartion';

import {getSubsidies} from '../../redux/actions';

import './Subsidies.css';
import AccountTable from "../AccountTable/AccountTable";

class Subsidies extends PureComponent {
	componentDidMount() {
		const {ls, token, onSubsidies} = this.props;
		onSubsidies(ls, token);
	}
	
	render() {
		const {isFetch, isError, error, subsidies} = this.props;
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
		const renderContent = (
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

Subsidies.propTypes = {
	subsidies: PropTypes.array.isRequired,
};

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