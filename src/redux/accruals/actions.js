import {
	ACCRUALS_UPLOAD,
	ACCRUALS_FAILURE,
	ACCRUALS_SUSSES,
} from './constants';
import {API_ENDPOINT} from '../constants';

export const getAccruals = (ls, token) => {
	return async dispatch => {
		try {
			dispatch({type: ACCRUALS_UPLOAD});
			const res = await fetch(
				`${API_ENDPOINT}/allocations/${ls}`, {
					headers: new Headers({
						'Authorization': `Bearer ${token}`,
						'Content_Type': 'application/json',
					}),
				}
			);
			
			const json = await res.json();
			const accruals = json.data;
			dispatch({type: ACCRUALS_SUSSES, accruals});
		}
		
		catch (error) {
			dispatch({type: ACCRUALS_FAILURE}, error);
		}
	}
};
