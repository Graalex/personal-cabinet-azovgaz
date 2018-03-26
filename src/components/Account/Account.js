/**
 * /src/components/Account/Account.js
 * @module Account/Account
 * Компонент выводящий общую информацию о лицевом счете
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AccountItem from './AccountItem';

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
		<AccountItem label="Абонент:" value={`${account.family} ${account.name} ${account.patronymic}`}/>
		<AccountItem label="Адрес:" value={account.address}/>
		<AccountItem label="Персональный код (EIC):" value={account.eic}/>
		{account.registeredPersons && <AccountItem label="К-во зарегистрированных лиц:" value={account.registeredPersons}/>}
		{ account.benefits && account.benefits.length > 0 && (
			<section className="account-benefits">
				<header className="account-benefits-header">
					<h3 className="account-benefits-header__title">Льготы</h3>
				</header>
				<table className="account-benefits-table">
					<thead>
						<tr className="account-benefits-table__head">
							<th>Льготник</th>
							<th>Вид льготы</th>
							<th>Процент</th>
							<th>К-во</th>
							<th>ИНН</th>
						</tr>
					</thead>
					<tbody>
						{
							account.benefits.map((item, index) => (
								<tr className="account-benefits-table__data" key={index}>
									<td>
										{item.family} {item.name} {item.patronymic}
									</td>
									<td>{item.type}</td>
									<td>{item.percent}</td>
									<td>{item.quantity}</td>
									<td>{item.inn}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</section>
			)
		}
		{
			account.meter && account.meter.length > 0 && (
				<AccountItem label="Счетчик газовый:" value={`${account.meter} зав. №${account.meterNumb}`}/>
			)
		}
		
		{ account.equipments && (
			<section className="account-equipments">
				<header className="account-equipments-header">
					<h3 className="account-equipments-header__title">Газовые приборы</h3>
				</header>
				<table className="account-equipments-table">
					<thead>
						<tr className="account-equipments-table__head">
							<th>Тип</th>
							<th>Наименование</th>
							<th>Ко-во</th>
							<th>По норме</th>
							<th>В работе</th>
						</tr>
					</thead>
					<tbody>
						{
							account.equipments.map((item, index) => (
								<tr className="account-equipments-table__data" key={index}>
									<td>{item.type}</td>
									<td>{item.name}</td>
									<td>{item.quantity}</td>
									<td>{item.byNorma ? 'Да' : 'Нет'}</td>
									<td>{item.cutOff ? 'Нет' : 'Да'}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</section>
		)}
		
		{
			account.heatedArea && account.heatedArea > 0 &&
				<AccountItem label="Площадь отопления:" value={account.heatedArea}> м<sup>2</sup></AccountItem>
		}
		<AccountItem label="Группа потребления:" value={`${account.group} (${account.groupName})`}/>
		
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

Account.propTypes = {
	account: PropTypes.object.isRequired,
};

export default connect(state => ({
	account: state.cabinet.abonent.account,
}))(Account);
