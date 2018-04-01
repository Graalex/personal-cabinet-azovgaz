import {API_ENDPOINT} from '../constants';
import {
	ACCOUNT_UPLOAD,
	ACCOUNT_FAILURE,
	ACCOUNT_SUSSES,
} from './constants';

export const getAccount = (ls, token) => {
	return async dispatch => {
		try {
			dispatch({type: ACCOUNT_UPLOAD});
			const res = await fetch(`${API_ENDPOINT}/accounts/${ls}`,
				{headers: new Headers({'Authorization': `Bearer ${token}`,	'Content_Type': 'application/json',}),}
			);
			
			const json = await res.json();
			const account = json.data;
			dispatch({type: ACCOUNT_SUSSES, account});
		}
		
		catch (err) {
			dispatch({type: ACCOUNT_FAILURE, error: err});
		}
	}
};