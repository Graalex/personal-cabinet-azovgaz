import React, {PureComponent} from 'react';

import Anchor from '../Anchor/Anchor';

import './Nav.css';

class Nav extends PureComponent {
	constructor() {
		super();
		
		this.state = {
			anchors: [
				{key: 0, name: 'account', text: 'Лицевой счет'},
				{key: 1, name: 'allocations', text: 'Начисления'},
				{key: 2, name: 'payments', text: 'Платежи'},
				{key: 3, name: 'subsidies', text: 'Субсидии'},
			],
			currentAnchor: 0,
		};
	}
	
	anchorClick = key => {
		this.setState({currentAnchor: key});
	};
	
	render() {
		const {anchors, currentAnchor} = this.state;
		
		return (
			<nav className="nav">
				<ul className="nav__menu">
					{
						anchors.map(anchor => (
							<Anchor name={anchor.name}
							        key={anchor.key}
							        active={anchor.key === currentAnchor}
							        onClick={() => this.anchorClick(anchor.key)}
							>
								{anchor.text}
							</Anchor>
						))
					}
				</ul>
			</nav>
		);
	}
}

export default Nav;