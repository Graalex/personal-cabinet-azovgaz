/**
 * /src/components/HeaderPartion/HeaderPartion.js
 * @module HeaderPartion/HeaderPartion
 * Компонент заголовка для секций с данными о лицевом счете.
 */
import React from 'react';
import PropTypes from 'prop-types';

import './HeaderPartion.css';

const HeaderPartion = ({level = 2, title, subtitle}) => {
	return (
		<header className="header-partion">
		{
			level === 2 ?
				<h2 className="header-partion__title">{title}</h2> :
				<h3 className="header-partion__title">{title}</h3>
		}
		{subtitle && (<p className="header-partion__subtitle">{subtitle}</p>)}
	</header>
	)
};

HeaderPartion.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	level: PropTypes.number,
};

export default HeaderPartion;