import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import * as serviceWorker from './serviceWorker';
=======
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'assets/css/material-dashboard-react.css?v=1.8.0';
>>>>>>> 4bfb6650ff82b22e01a4cde7928a271c569bcc5d

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
