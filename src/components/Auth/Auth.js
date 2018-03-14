import React, {PureComponent} from 'react';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';

import Fetch from '../Fetch/Fetch';
import Error from '../Error/Error';

import {login} from '../../redux/actions';

import './Auth.css';

const required = value => (value ? undefined : 'Заполните это поле');
const numeric = value => (value && isNaN(Number(value)) ? 'Должно быть числом' : undefined);
const alpha = value => (value && /^[А-Я]$/i.test(value) ? undefined : 'Только символы');

const RenderField = ({
	input,
	type,
	label,
	placeholder,
	meta: {error, touched}
}) => (
	<div className="auth-form-row">
		<input className="auth-form__input" {...input} type={type}/>
		{touched && (error && <span className="auth-form__error">{error}</span>)}
		<label className="auth-form__label">{label}</label>
	</div>
);


class Auth extends PureComponent {
	handleClick = () => {
		const {abonent, onLogin} = this.props;
		const {ls, family} = abonent;
		
		onLogin(ls, family);
	};
	
	render() {
		const {isFetching, isError, error} = this.props;
		
		return (
			<React.Fragment>
				<section className="auth">
					<header className="auth-header">
						<h2 className="auth-header__title">Вход в личный кабинет</h2>
					</header>
					<form className="auth-form">
						<Field component={RenderField}
						       type="number"
						       name="ls"
						       label="Лицевой счет"
						       validate={[required, numeric]}
						/>
						<Field component={RenderField}
						       type="text"
						       name="family"
						       label="Фамилия"
						       validate={[required, alpha]}
						/>
						<div className="auth-form-row auth-form-row--right">
							<button className="auth-form__button" type="button" onClick={this.handleClick}>Найти лицевой счет</button>
						</div>
					</form>
				</section>
				{isFetching && <Fetch message="Проверка лицевого счета ..."/>}
				{
					isError && <Error title="Ошибка"
					                  subtitle="Ошибка при поиске лицевого счета"
					                  message={error.message}
					/>
				}
			</React.Fragment>
		);
	}
}

const AuthContainer = connect(
	state => ({
		abonent: getFormValues('authentification')(state),
		isFetching: state.cabinet.authenticate.isFetching,
		error: state.cabinet.authenticate.error,
		isError: state.cabinet.authenticate.isError,
	}),
	dispatch => ({onLogin: (ls, family) => dispatch(login(ls, family))})
)(Auth);

export default  reduxForm({
	form: 'authentification',
})(AuthContainer);