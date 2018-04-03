import {TOGGLE_SIDEBAR} from './constants';

export const widgets = (state = {openedSidebar: false}, action) => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			const {openedSidebar} = state;
			return {openedSidebar: !openedSidebar};
			
		default:
			return state;
	}
};
