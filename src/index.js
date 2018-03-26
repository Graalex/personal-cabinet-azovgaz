import React from 'react';
import ReactDOM from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose,
} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App/App';
import reducer from './redux/reducer';

let store;
let loger;
// eslint-disable-next-line
const DEBUG = process.env.REACT_APP_DEVEL == 1;

if (DEBUG) {
	loger = createLogger();
	store = createStore(
		reducer,
		compose(
			applyMiddleware(thunk, loger),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}
else {
	store = createStore(
		reducer,
		applyMiddleware(thunk)
	);
}

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('cabinet')
);
