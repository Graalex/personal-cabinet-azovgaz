import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {
	AUTH_FAILURE,
	AUTH_FETCHING,
	AUTH_SUSSES, LOGOUT,
	PAYMENTS_FAILURE,
	PAYMENTS_FETCHING,
	PAYMENTS_SUSSES,
	SUBSIDIES_FAILURE,
	SUBSIDIES_FETCHING,
	SUBSIDIES_SUSSES,
} from "./constants";

import {account} from './account/reducer';
import {equipments} from './equipments/reducer';
import {beneficiaries} from './beneficiaries/reducer';
import {accruals} from './accruals/reducer';

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
			
		case PAYMENTS_FETCHING:
			const abnPayFet = {...state.abonent};
			const payFet = {...state.abonent.payment};
			payFet.isFetching = true;
			payFet.isError = false;
			abnPayFet.payment = payFet;
			return {...state, abonent: abnPayFet};
		
		case PAYMENTS_FAILURE:
			const abnPayFal = {...state.abonent};
			const payFal = {...state.abonent.payment};
			payFal.isFetching = false;
			payFal.isError = true;
			payFal.error = action.error;
			abnPayFal.payment = payFal;
			return {...state, abonent: abnPayFal};
		
		case PAYMENTS_SUSSES:
			const abnPaySus = {...state.abonent};
			const paySus = {...state.abonent.payment};
			paySus.isFetching = false;
			paySus.isError = false;
			paySus.payments = action.payments;
			abnPaySus.payment = paySus;
			return {...state, abonent: abnPaySus};
		
		case SUBSIDIES_FETCHING:
			const abnSubFet = {...state.abonent};
			const subFet = {...state.abonent.subsidie};
			subFet.isFetching = true;
			subFet.isError = false;
			abnSubFet.subsidie = subFet;
			return {...state, abonent: abnSubFet};
		
		case SUBSIDIES_FAILURE:
			const abnSubFal = {...state.abonent};
			const subFal = {...state.abonent.subsidie};
			subFal.isFetching = false;
			subFal.isError = true;
			subFal.error = action.error;
			abnSubFal.subsidie = subFal;
			return {...state, abonent: abnSubFal};
		
		case SUBSIDIES_SUSSES:
			const abnSubSus = {...state.abonent};
			const subSus = {...state.abonent.subsidie};
			subSus.isFetching = false;
			subSus.isError = false;
			subSus.error = {};
			subSus.subsidies = action.subsidies;
			abnSubSus.subsidie = subSus;
			return {...state, abonent: abnSubSus};
			
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
	form: formReducer
});