import {
	ACCRUALS_UPLOAD,
	ACCRUALS_FAILURE,
	ACCRUALS_SUSSES,
} from './constants';

export const accruals = (state = {}, action) => {
	switch (action.type) {
		case ACCRUALS_UPLOAD:
			const uploading = true;
			return {uploading};
			
		case ACCRUALS_FAILURE:
			const error = action.error;
			return {isError: true, error: {...error}};
			
		case ACCRUALS_SUSSES:
			const accruals = action.accruals;
			return {...accruals};
			
		default:
			return state;
	}
};
