import {
	BENEFICIARIES_SUSSES,
	BENEFICIARIES_UPLOAD,
	BENEFICIARIES_FAILURE,
} from './constants';
import {API_ENDPOINT} from '../constants';

export const getBeneficiaries = (ls, token) => {
	return async dispatch => {
		dispatch({type: BENEFICIARIES_UPLOAD});
		try {
			const res = await fetch(
				`${API_ENDPOINT}/beneficiaries/${ls}`, {
					headers: new Headers({
						'Authorization': `Bearer ${token}`,
						'Content_Type': 'application/json',
					}),
				}
			);
			
			const json = await res.json();
			const beneficiaries = json.data;
			dispatch({type: BENEFICIARIES_SUSSES, beneficiaries});
		}
		
		catch (error) {
			dispatch({type: BENEFICIARIES_FAILURE, error});
		}
	};
};