import React, {PureComponent} from 'react';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';

import {Loader} from '../Loader';
import {Popup} from '../Popup';

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
		const {pending, isError, error} = this.props;
		
		return (
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
						<button className="button" type="button" onClick={this.handleClick}>Найти лицевой счет</button>
					</div>
					{pending && <Loader message="Проверка лицевого счета"/>}
				</form>
				{isError &&
					<Popup caption="Ошибка!"
					       message={error.message}
					       appElement={document.getElementById('cabinet')}
					/>
				}
			</section>
		);
	}
}

const AuthContainer = connect(
	state => ({
		abonent: getFormValues('authentification')(state),
		pending: state.auth.pending,
		error: {...state.auth.error},
		isError: state.auth.isError,
	}),
	dispatch => ({onLogin: (ls, family) => dispatch(login(ls, family))})
)(Auth);

export default  reduxForm({
	form: 'authentification',
})(AuthContainer);