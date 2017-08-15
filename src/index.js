import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import history from './history'

import 'semantic-ui-css/semantic.min.css'
import './stylesheets/index.css'
import App from './App'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'));
