import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Routes from './components/Routes';
import Root from './root';
import reducer from './reducers';
import Clock from './components/clock';
import Alarms from './components/Alarm';

import * as localStorage from "./localStorage";



let store = createStore(reducer, localStorage.getLocalStore())

store.subscribe(() => {
    localStorage.setLocalStore(store.getState())
})


ReactDOM.render(<Root store={store} />, document.getElementById('app'));
//ReactDOM.render(<Routes />, document.getElementById('app'));