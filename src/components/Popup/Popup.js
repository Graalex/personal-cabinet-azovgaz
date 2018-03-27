import React, {PureComponent} from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import './Popup.css';

class Popup extends PureComponent {
	constructor() {
		super();
		this.state = {
			display: true,
		};
	}
	
	handleClick = () => {
		this.setState({
			display: false,
		})
	};
	
	render() {
		const {caption, message, ...rest} = this.props;
		const {display} = this.state;
		
		return (
			<ReactModal isOpen={display}
			            className="popup"
			            overlayClassName="popup-overlay"
			            {...rest}
			>
				<header className="popup-header">
					<h3 className="popup-header__title">{caption}</h3>
				</header>
				<div className="popup-content">{message}</div>
				<footer className="popup-footer">
					<button className="button" onClick={this.handleClick}>OK</button>
				</footer>
			</ReactModal>
		);
	}
}


Popup.propTypes = {
	caption: PropTypes.string.isRequired,
	message: PropTypes.any.isRequired,
};

export default Popup;