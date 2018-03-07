import React from 'react';
import {connect} from 'react-redux';

const Account = ({account}) => (
	<section>
		<header>
			<h2>Лицевой счет №{account.ls}</h2>
			<p>по состоянию на {account.currentDate}</p>
		</header>
		<div>
			<p><span>Абонент:</span><span>{account.family} {account.name} {account.patronymic}</span></p>
			<p><span>Адрес:</span><span>{account.address}</span></p>
			<p><span>Персональный код (EIC):</span><span>{account.eic}</span></p>
			<p><span>К-во зарегистрированных лиц:</span><span>{account.registeredPersons}</span></p>
			{account.benefitsPersons !== 0 && <p><span>Льготы:</span><span>{account.benefitsKind}% {account.benefitsPersons} чел.</span></p>}
			{account.meter && account.meter.length > 0 && <p><span>Счетчик газовый:</span><span>{account.meter} зав. №{account.meterNumb}</span></p>}
			<p><span>Газовые приборы:</span><span>{account.equipments}</span></p>
			<p><span>Площадь отопления:</span><span>{account.heatedArea}</span></p>
			<p><span>Группа потребления:</span><span>{account.group} ({account.groupName})</span></p>
			<section>
				<header>
					<h3>Плановое потребление по месяцам</h3>
				</header>
				{account.powers &&
					<table>
						<thead>
							<tr>
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
							<tr>
								{
									account.powers.map((power, index) => (
										<td key={index}>{power}</td>
									))
								}
							</tr>
						</tbody>
					</table>
				}
			</section>
		</div>
		<footer>
			<p><strong>Проверте Ваши данные на абонентском участке</strong></p>
		</footer>
	</section>
);

export default connect(state => ({
	account: state.cabinet.abonent.account
}))(Account);
