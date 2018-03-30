import {
	EQUIPMENTS_UPLOAD,
	EQUIPMENTS_FAILURE,
	EQUIPMENTS_SUSSES,
} from './constants';

import {API_ENDPOINT} from '../constants';

export const getEquipments = (ls, token) => {
	return async dispatch => {
		dispatch({type: EQUIPMENTS_UPLOAD});
		
		try {
			const res = await fetch(`${API_ENDPOINT}/equipments/${ls}`,
				{headers: new Headers({'Authorization': `Bearer ${token}`, 'Content_Type': 'application/json',}),}
			);
			
			const json = await res.json();
			const equipments = json.data;
			dispatch({type: EQUIPMENTS_SUSSES, equipments});
		}
		
		catch (error) {
			dispatch({type: EQUIPMENTS_FAILURE, error});
		}
	};
};