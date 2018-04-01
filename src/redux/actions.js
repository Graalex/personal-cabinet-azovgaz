import {
	AUTH_FAILURE,
	AUTH_FETCHING,
	AUTH_SUSSES, LOGOUT,
} from "./constants";

const APP_KEY = process.env.REACT_APP_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const login = (ls, family, key = APP_KEY) => {
	return async dispatch => {
		// авторизация
		try {
			dispatch({type: AUTH_FETCHING});
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
			dispatch({type: AUTH_SUSSES, payload:{ls, token}});
		}
		
		catch (err) {
			dispatch({type: AUTH_FAILURE, error: err})
		}
	};
};

export const logout = () => ({type: LOGOUT});

export * from './account/actions';
export * from './equipments/actions';
export * from './beneficiaries/actions';
export * from './accruals/actions';
export * from './payments/actions';
export * from './subsidies/actions';
