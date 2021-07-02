import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './REDUX/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	// </React.StrictMode>,
	document.getElementById('root')
);
