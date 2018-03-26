/**
 * /src/components/Account/Account.js
 * @module Account/Account
 * Компонент выводящий общую информацию о лицевом счете
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AccountItem from './AccountItem';
import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

import './Account.css';

const Account = ({account}) => {
	const benefHeader = [
		'Льготник',
		'Вид льготы',
		'Процент',
		'К-во',
		'ИНН',
	];
	const equipHeader = [
		'Тип',
		'Наименование',
		'Ко-во',
		'По норме',
		'В работе',
	];
	const planHeader = [
		'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
	];
	
	let benefData;
	if (account && account.benefits) {
		benefData = account.benefits.map(item => ([
			`${item.family} ${item.name} ${item.patronymic}`,
			item.type,
			`${item.percent}%`,
			item.quantity,
			item.inn,
		]));
	}
	
	let equipData;
	if (account && account.equipments) {
		equipData = account.equipments.map(item => ([
			item.type,
			item.name,
			item.quantity,
			item.byNorma ? 'Да' : 'Нет',
			item.cutOff ? 'Нет' : 'Да',
		]));
	}
	
	let planData;
	if (account && account.powers) {
		planData = [account.powers];
	}
	
	return (
		<section className="account">
		<a name="account">
			<HeaderPartion title={`Лицевой счет № ${account.ls}`}
			               subtitle={`по состоянию на ${account.currentDate  }`}
			/>
		</a>
		<AccountItem label="Абонент:" value={`${account.family} ${account.name} ${account.patronymic}`}/>
		<AccountItem label="Адрес:" value={account.address}/>
		<AccountItem label="Персональный код (EIC):" value={account.eic}/>
		{account.registeredPersons && <AccountItem label="К-во зарегистрированных лиц:" value={account.registeredPersons}/>}
		
		{account.heatedArea && account.heatedArea > 0 &&
		<AccountItem label="Площадь отопления:" value={account.heatedArea}> м<sup>2</sup></AccountItem>
		}
		<AccountItem label="Группа потребления:" value={`${account.group} (${account.groupName})`}/>
		
		{account.meter && account.meter.length > 0 && (
			<AccountItem label="Счетчик газовый:" value={`${account.meter} зав. №${account.meterNumb}`}/>
		)}
		
		{account.benefits && account.benefits.length > 0 && (
			<section className="account-benefits">
				<HeaderPartion title="Льготы" level={3}/>
				<AccountTable headers={benefHeader} data={benefData}/>
			</section>
		)}
		
		{account.equipments && (
			<section className="account-equipments">
				<HeaderPartion title="Газовые приборы" level={3}/>
				<AccountTable headers={equipHeader} data={equipData}/>
			</section>
		)}
		
		{account.powers &&
		<section className="account-plan">
			<HeaderPartion title="Плановое потребление природного газа по месяцам" level={3}/>
			<AccountTable headers={planHeader} data={planData}/>
		</section>
		}
	</section>
	);
};

Account.propTypes = {
	account: PropTypes.object.isRequired,
};

export default connect(state => ({
	account: state.cabinet.abonent.account,
}))(Account);
