import React from 'react';
import {connect} from 'react-redux';

import './Account.css';

const Account = ({account}) => (
	<section className="account">
		<a name="account">
			<header className="account-header">
				<h2 className="account-header__title">Лицевой счет № {account.ls}</h2>
				<p className="account-header__subtitle">
					по состоянию на {
					account.currentDate
				}
				</p>
			</header>
		</a>
		<p className="account-item">
			<span className="account-item__label">Абонент:</span>
			<span className="account-item__value">{account.family} {account.name} {account.patronymic}</span>
		</p>
		<p className="account-item">
			<span className="account-item__label">Адрес:</span>
			<span className="account-item__value">{account.address}</span>
		</p>
		<p className="account-item">
			<span className="account-item__label">Персональный код (EIC):</span>
			<span className="account-item__value">{account.eic}</span>
		</p>
		<p className="account-item">
			<span className="account-item__label">К-во зарегистрированных лиц:</span>
			<span className="account-item__value">{account.registeredPersons}</span>
		</p>
		{
			account.benefitsPersons !== 0 && (
				<p className="account-item">
					<span className="account-item__label">Льготы:</span>
					<span className="account-item__value">{account.benefitsKind}% {account.benefitsPersons} чел.</span>
				</p>
			)
		}
		{
			account.meter && account.meter.length > 0 && (
				<p className="account-item">
					<span className="account-item__label">Счетчик газовый:</span>
					<span className="account-item__value">{account.meter} зав. №{account.meterNumb}</span>
				</p>
			)
		}
		<p className="account-item">
			<span className="account-item__label">Газовые приборы:</span>
			<span className="account-item__value">{account.equipments}</span>
		</p>
		<p className="account-item">
			<span className="account-item__label">Площадь отопления:</span>
			<span className="account-item__value">{account.heatedArea} м<sup>2</sup></span>
		</p>
		<p className="account-item">
			<span className="account-item__label">Группа потребления:</span>
			<span className="account-item__value">{account.group} ({account.groupName})</span>
		</p>
		
		<section className="account-plan">
			<header className="account-plan-header">
				<h3 className="account-plan-header__title">Плановое потребление природного газа по месяцам</h3>
			</header>
			{account.powers &&
				<table className="account-plan-table">
					<thead>
						<tr className="account-plan-table__head">
							<th>I</th>
							<th>II</th>
							<th>III</th>
							<th>IV</th>
							<th>V</th>
							<th>VI</th>
							<th>VII</th>
							<th>VIII</th>
							<th>IX</th>
							<th>X</th>
							<th>XI</th>
							<th>XII</th>
						</tr>
					</thead>
					<tbody>
						<tr className="account-plan-table__data">
							{
								account.powers.map((power, index) => (
									<td key={index}>{new Intl.NumberFormat('ru', {minimumFractionDigits: 2}).format(power)}</td>
								))
							}
						</tr>
					</tbody>
				</table>
			}
		</section>
	</section>
);

export default connect(state => ({
	account: state.cabinet.abonent.account
}))(Account);
