/**
 * /src/components/Loader/Loader.js
 * @module Loader/Loader
 *
 * Компонент индикатор загрузки данных
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Loader.css';

const Loader = ({message}) => (
	<section className="loader">
		<span className="loader__message">{message} ....</span>
		<span className="loader__icon"/>
	</section>
);

Loader.propTypes = {
	message: PropTypes.string.isRequired,
};

export default Loader;