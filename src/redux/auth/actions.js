import {
	AUTH_PENDING,
	AUTH_FAILURE,
	AUTH_SUSSES,
	LOGOUT,
} from './constants';
import {API_ENDPOINT, APP_KEY} from '../constants';

export const login = (ls, family, key = APP_KEY) => {
	return async dispatch => {
		// авторизация
		try {
			dispatch({type: AUTH_PENDING});
			const res = await fetch(
				`${API_ENDPOINT}/auth`,
				{
					method: 'POST',
					body: JSON.stringify({ls, family, key}),
					headers: new Headers({'Content-Type': 'application/json'}),
				}
			);
			const json = await res.json();
			if (json.status !== 200) throw json;
			
			const token = json.data;
			dispatch({type: AUTH_SUSSES, ls, token});
		}
		
		catch (error) {
			dispatch({type: AUTH_FAILURE, error})
		}
	};
};

export const logout = () => ({type: LOGOUT});
