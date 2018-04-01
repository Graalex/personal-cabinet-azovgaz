import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {
	AUTH_FAILURE,
	AUTH_FETCHING,
	AUTH_SUSSES, LOGOUT,
} from "./constants";

import {account} from './account/reducer';
import {equipments} from './equipments/reducer';
import {beneficiaries} from './beneficiaries/reducer';
import {accruals} from './accruals/reducer';
import {payments} from './payments/reducer';
import {subsidies} from './subsidies/reducer';

const initialState = {
	authenticate: {
		isAuth: false,
		isFetching: false,
		isError: false,
		error: {},
		token: '',
		ls: 0,
	},
	abonent: {
		isFetching: false,
		isError: false,
		error: {},
		account: {},
		allocation: {
			isFetching: false,
			isError: false,
			error: {},
			allocations: [],
		},
		payment: {
			isFetching: false,
			isError: false,
			error: {},
			payments: [],
		},
		subsidie: {
			isFetching: false,
			isError: false,
			error: {},
			subsidies: [],
		},
	},
};

const cabinet = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_FETCHING:
			const authFet = {...state.authenticate};
			authFet.isFetching = true;
			authFet.isError = false;
			return {...state, authenticate: authFet};
			
		case AUTH_SUSSES:
			const authSus = {...state.authenticate};
			authSus.isAuth = true;
			authSus.isFetching = false;
			authSus.token = action.payload.token;
			authSus.ls = action.payload.ls;
			authSus.error = {};
			return {...state, authenticate: authSus};
			
		case AUTH_FAILURE:
			const authErr = {...state.authenticate};
			authErr.isFetching = false;
			authErr.isError = true;
			authErr.error = action.error;
			return {...state, authenticate: authErr};
			
		case LOGOUT:
			return {...initialState};
			
		default:
			return state;
	}
};

export default combineReducers({
	cabinet,
	account,
	equipments,
	beneficiaries,
	accruals,
	payments,
	subsidies,
	form: formReducer
});