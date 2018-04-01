import {
	AUTH_PENDING,
	AUTH_FAILURE,
	AUTH_SUSSES,
	LOGOUT,
} from './constants';

export const auth = (state = {isAuth: false}, action) => {
	switch (action.type) {
		case AUTH_PENDING:
			return {...state, pending: true};
			
		case AUTH_FAILURE:
			const {error} = action;
			return {isAuth: false, isError: true, error: {...error}};
			
		case AUTH_SUSSES:
			const ls =action.ls;
			const token = action.token;
			return {isAuth: true, ls, token};
			
		case LOGOUT:
			return {isAuth: false};
			
		default:
			return state;
	}
};
