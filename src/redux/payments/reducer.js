import {
	PAYMENTS_UPLOAD,
	PAYMENTS_FAILURE,
	PAYMENTS_SUSSES,
} from './constants';

export const payments = (state = {}, action) => {
	switch (action.type) {
		case PAYMENTS_UPLOAD:
			const uploading = true;
			return {uploading};
			
		case PAYMENTS_FAILURE:
			const error = action.error;
			return {isError: true, error: {...error}};
			
		case PAYMENTS_SUSSES:
			const payments = action.payments;
			return {list: [...payments]};
			
		default:
			return state;
	}
};
