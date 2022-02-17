
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
//UTILS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

//DEVTOOLS
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { getUser } from './action/user.actions';
import { getUsers } from './action/users.actions';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUser());
store.dispatch(getUsers());

ReactDOM.render(
   <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
