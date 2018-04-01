import {
	PAYMENTS_UPLOAD,
	PAYMENTS_FAILURE,
	PAYMENTS_SUSSES,
} from './constants';
import {API_ENDPOINT} from '../constants';

export const getPayments = (ls, token) => {
	return async dispatch => {
		try {
			dispatch({type: PAYMENTS_UPLOAD});
			const res = await fetch(
				`${API_ENDPOINT}/payments/${ls}`, {
					headers: new Headers({
						'Authorization': `Bearer ${token}`,
						'Content_Type': 'application/json',
					}),
				}
			);
			
			const json = await res.json();
			const payments = json.data;
			dispatch({type: PAYMENTS_SUSSES, payments});
		}
		
		catch (error) {
			dispatch({type: PAYMENTS_FAILURE, error});
		}
	}
};