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
	<section class="loader">
		<span class="loader__message">{message} ....</span>
		<span class="loader__icon"/>
	</section>
);

Loader.propTypes = {
	message: PropTypes.string.isRequired,
};

export default Loader;