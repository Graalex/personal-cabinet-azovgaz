import React, {PureComponent} from 'react';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';

import {login} from '../../redux/actions';

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
	<div>
		<label>{label}</label>
		<input {...input} type={type} placeholder={placeholder}/>
		{touched && (error && <span>{error}</span>)}
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
				<section>
					<header>
						<h2>Вход в личный кабинет</h2>
						<form>
							<Field component={RenderField}
							       type="number"
							       name="ls"
							       label="Лицевой счет"
							       placeholder="Введите номер лицевого счета"
							       validate={[required, numeric]}
							/>
							<Field component={RenderField}
							       type="text"
							       name="family"
							       label="Фамилия"
							       placeholder="Введите фамилию"
							       validate={[required, alpha]}
							/>
							<div>
								<button type="button" onClick={this.handleClick}>Найти лицевой счет</button>
							</div>
						</form>
					</header>
				</section>
				{isFetching && <section>Проверка лицевого счета ...</section>}
				{isError && <section>{error.message}</section>}
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