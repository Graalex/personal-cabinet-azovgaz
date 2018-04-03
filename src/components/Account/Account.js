/**
 * /src/components/Account/Account.js
 * @module Account/Account
 * Компонент выводящий общую информацию о лицевом счете
 */
import React from 'react';
import PropTypes from 'prop-types';

import AccountItem from './AccountItem';
import {HeaderPartion} from '../HeaderPartion';
import {AccountTable} from '../AccountTable';

const Account = ({account, equipments, beneficiaries}) => {
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
		'В работе',
	];
	
	let benefData;
	if (beneficiaries && beneficiaries.list) {
		benefData = beneficiaries.list.map(item => ([
			`${item.family} ${item.name} ${item.patronymic}`,
			item.type,
			`${item.percent}%`,
			item.quantity,
			item.inn,
		]));
	}
	
	let equipData;
	if (equipments.list) {
		equipData = equipments.list.map(item => ([
			item.type,
			item.name,
			item.quantity,
			item.cutOff ? 'Нет' : 'Да',
		]));
	}
	
	return (
		<section className="cabinet-section">
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
		
		{beneficiaries.list && beneficiaries.list.length > 0 && (
			<section>
				<HeaderPartion title="Льготы" level={3}/>
				<AccountTable headers={benefHeader} data={benefData}/>
			</section>
		)}
		
		{equipments.list && equipments.list.length > 0 ?
				<section>
					<HeaderPartion title="Газовые приборы" level={3}/>
					<AccountTable headers={equipHeader} data={equipData}/>
				</section>
			:
				<section>
					<AccountItem label="Газопотребляющее оборудование:" value="Загрузка данных ..."/>
				</section>
		}
	</section>
	);
};

Account.propTypes = {
	account: PropTypes.object.isRequired,
	equipments: PropTypes.object,
	beneficiaries: PropTypes.object,
	
};

export default Account;
