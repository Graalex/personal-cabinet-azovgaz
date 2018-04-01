import {
	SUBSIDIES_UPLOAD,
	SUBSIDIES_FAILURE,
	SUBSIDIES_SUSSES,
} from './constants';

export const subsidies = (state = {}, action) => {
	switch (action.type) {
		case SUBSIDIES_UPLOAD:
			return {uploading: true};
			
		case SUBSIDIES_FAILURE:
			const {error} = action;
			return {isError: true, error: {...error}};
			
		case SUBSIDIES_SUSSES:
			const {subsidies} = action;
			return {list: [...subsidies]};
			
		default:
			return state;
	}
};
