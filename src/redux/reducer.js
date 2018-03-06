
import {
	ACCOUNT_FAILURE,
	ACCOUNT_FETCHING,
	ACCOUNT_SUSSES,
	ALLOCATIONS_FAILURE,
	ALLOCATIONS_FETCHING,
	ALLOCATIONS_SUSSES,
	AUTH_FAILURE,
	AUTH_FETCHING,
	AUTH_SUSSES, LOGOUT,
	PAYMENTS_FAILURE,
	PAYMENTS_FETCHING,
	PAYMENTS_SUSSES,
	SUBSIDIES_FAILURE,
	SUBSIDIES_FETCHING,
	SUBSIDIES_SUSSES
} from "./constants";

const initialState = {
	authenticate: {
		isAuth: false,
		isFetching: false,
		error: {},
		token: '',
		ls: 0,
	},
	abonent: {
		isFetching: false,
		error: {},
		account: {},
		allocation: {
			isFetching: false,
			error: {},
			allocations: [],
		},
		payment: {
			isFetching: false,
			error: {},
			payments: [],
		},
		subsidie: {
			isFetching: false,
			error: {},
			subsidies: [],
		},
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_FETCHING:
			const authFet = {...state.authenticate};
			authFet.isFetching = true;
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
			authErr.error = action.error;
			return {...state, authenticate: authErr};
			
		
		case ACCOUNT_FETCHING:
			const abnFet = {...state.abonent};
			abnFet.isFetching = true;
			return {...state, abonent: abnFet};
			
		case ACCOUNT_FAILURE:
			const abnErr = {...state.abonent};
			abnErr.isFetching = false;
			abnErr.error = action.error;
			return {...state, abonent: abnErr};
			
		case ACCOUNT_SUSSES:
			const abnSus = {...state.abonent};
			abnSus.isFetching = false;
			abnSus.error = {};
			abnSus.account = action.account;
			return {...state, abonent: abnSus};
			
			
		case ALLOCATIONS_FETCHING:
			const allocFet = {...state.abonent.allocation};
			const abnAllocFet = {...state.abonent};
			allocFet.isFetching = true;
			abnAllocFet.allocation = allocFet;
			return {...state, abonent: abnAllocFet};
			
		case ALLOCATIONS_FAILURE:
			const allocFal = {...state.abonent.allocation};
			const abnAllocFal = {...state.abonent};
			allocFal.isFetching = false;
			allocFal.error = action.error;
			abnAllocFal.allocation = allocFal;
			return {...state, abonent: abnAllocFal};
			
		case ALLOCATIONS_SUSSES:
			const allocSus = {...state.abonent.allocation};
			const abnAllocSus = {...state.abonent};
			allocSus.isFetching = false;
			allocSus.error = {};
			allocSus.allocations = action.allocations;
			abnAllocSus.allocation = allocSus;
			return {...state, abonent: abnAllocSus};
		
		
		case PAYMENTS_FETCHING:
			const abnPayFet = {...state.abonent};
			const payFet = {...state.abonent.payment};
			payFet.isFetching = true;
			abnPayFet.payment = payFet;
			return {...state, abonent: abnPayFet};
		
		case PAYMENTS_FAILURE:
			const abnPayFal = {...state.abonent};
			const payFal = {...state.abonent.payment};
			payFal.isFetching = false;
			payFal.error = action.error;
			abnPayFal.payment = payFal;
			return {...state, abonent: abnPayFal};
		
		case PAYMENTS_SUSSES:
			const abnPaySus = {...state.abonent};
			const paySus = {...state.abonent.payment};
			paySus.isFetching = false;
			paySus.payments = action.payments;
			abnPaySus.payment = paySus;
			return {...state, abonent: abnPaySus};
		
		case SUBSIDIES_FETCHING:
			const abnSubFet = {...state.abonent};
			const subFet = {...state.abonent.subsidie};
			subFet.isFetching = true;
			abnSubFet.subsidie = subFet;
			return {...state, abonent: abnSubFet};
		
		case SUBSIDIES_FAILURE:
			const abnSubFal = {...state.abonent};
			const subFal = {...state.abonent.subsidie};
			subFal.isFetching = false;
			subFal.error = action.error;
			abnSubFal.subsidie = subFal;
			return {...state, abonent: abnSubFal};
		
		case SUBSIDIES_SUSSES:
			const abnSubSus = {...state.abonent};
			const subSus = {...state.abonent.subsidie};
			subSus.isFetching = false;
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