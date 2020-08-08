import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import LandingPage from './LandingPage';
import './public/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/main" component={App} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
