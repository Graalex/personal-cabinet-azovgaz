import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {account} from './account/reducer';
import {equipments} from './equipments/reducer';
import {beneficiaries} from './beneficiaries/reducer';
import {accruals} from './accruals/reducer';
import {payments} from './payments/reducer';
import {subsidies} from './subsidies/reducer';
import {auth} from './auth/reducer';

export default combineReducers({
	auth,
	account,
	equipments,
	beneficiaries,
	accruals,
	payments,
	subsidies,
	form: formReducer
});
