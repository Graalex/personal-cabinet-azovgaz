import {
	EQUIPMENTS_UPLOAD,
	EQUIPMENTS_FAILURE,
	EQUIPMENTS_SUSSES,
} from './constants';

export const equipments = (state = {}, action) => {
	switch (action.type) {
		case EQUIPMENTS_UPLOAD:
			const uploading = true;
			return {uploading};
			
		case EQUIPMENTS_FAILURE:
			const error = action.error;
			return {...error};
			
		case EQUIPMENTS_SUSSES:
			const equipments = action.equipments;
			return {list: [...equipments]};
			
		default:
			return state;
	}
};