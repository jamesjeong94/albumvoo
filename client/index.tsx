import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import LandingPage from './LandingPage';
import './public/styles.scss';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/main" component={App} />
      </Provider>
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);
