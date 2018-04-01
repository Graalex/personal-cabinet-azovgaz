import {
	ACCOUNT_UPLOAD,
	ACCOUNT_FAILURE,
	ACCOUNT_SUSSES,
} from './constants';

export const account = (state = {}, action) => {
	switch (action.type) {
		case ACCOUNT_UPLOAD:
			const uploading = true;
			return {uploading};
		
		case ACCOUNT_FAILURE:
			const error = action.error;
			return {error: {...error}};
		
		case ACCOUNT_SUSSES:
			const account = action.account;
			return {...account};
			
		default:
			return state;
	}
};