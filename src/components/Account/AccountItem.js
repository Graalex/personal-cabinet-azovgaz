/**
 * /src/components/Account/AccountItem.js
 * @module Account/AccountItem
 * Компонент для представления строки данных о лицевом счете.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './AccountItem.css';

const AccountItem = ({label, value, children}) => (
	<div className="account-item">
		<span className="account-item__label">{label}</span>
		<span className="account-item__value">{value}{children}</span>
	</div>
);

AccountItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.any,
};

export default AccountItem;
