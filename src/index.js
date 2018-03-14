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

const loger = createLogger();
const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk, loger),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('cabinet')
);
