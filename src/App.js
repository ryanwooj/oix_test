import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Planets from './components/Planets';
import Ships from './components/Ships';
import Films from './components/Films';
import Layout from './components/Layout';
import './App.scss';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const middleware = applyMiddleware(thunkMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middleware));

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Layout>
          <Switch>
            <Route path='/planets' component={Planets} />
            <Route path='/ships' component={Ships} />
            <Route path='/' exact component={Films} />
          </Switch>
        </Layout>
      </div>
    </Provider>
  );
};

export default withRouter(App);
