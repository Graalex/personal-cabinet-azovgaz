/**
 * /src/components/AccountTable/AccountTable.js
 * @module AccountTable/AccountTable
 * Компонент для представления табличных данных лицевого счета
 */
import React from 'react';
import PropTypes from 'prop-types';

import './AccountTable.css';

const AccountTable = ({headers, data}) => (
	<table className="account-table">
		<thead>
			<tr className="account-table__header">
				{
					headers.map((item, index) => (
						<th key={index}>{item}</th>
					))
				}
			</tr>
		</thead>
		<tbody>
			{
				data.map((item, index) => (
					<tr className="account-table__data" key={index}>
						{
							item.map((val, idx) => (
								<td key={idx}>{val}</td>
							))
						}
					</tr>
				))
			}
		</tbody>
	</table>
);

AccountTable.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.array.isRequired,
};

export default AccountTable;