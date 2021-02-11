
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import './index.css';
import middleware from './middleware/index';
import reducer from './reducers/index';


const store = createStore(reducer, middleware)

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));