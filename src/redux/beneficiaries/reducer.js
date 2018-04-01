import {
	BENEFICIARIES_UPLOAD,
	BENEFICIARIES_SUSSES,
	BENEFICIARIES_FAILURE,
} from './constants';

export const beneficiaries = (state = {}, action) => {
	switch (action.type) {
		case BENEFICIARIES_UPLOAD:
			const uploading = true;
			return {uploading};
			
		case BENEFICIARIES_FAILURE:
			const error = action.error;
			return {...error};
			
		case BENEFICIARIES_SUSSES:
			const list = action.beneficiaries;
			return {list: [...list]};
			
		default:
			return state;
	}
};