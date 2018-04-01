import {
	SUBSIDIES_UPLOAD,
	SUBSIDIES_FAILURE,
	SUBSIDIES_SUSSES,
} from './constants';
import {API_ENDPOINT} from '../constants';

export const getSubsidies = (ls, token) => {
	return async dispatch => {
		try {
			dispatch({type: SUBSIDIES_UPLOAD});
			const res = await fetch(
				`${API_ENDPOINT}/subsidies/${ls}`, {
					headers: new Headers({
						'Authorization': `Bearer ${token}`,
						'Content_Type': 'application/json',
					}),
				}
			);
			
			const json = await res.json();
			const subsidies = json.data;
			dispatch({type: SUBSIDIES_SUSSES, subsidies});
		}
		
		catch (error) {
			dispatch({type: SUBSIDIES_FAILURE, error});
		}
	}
};
