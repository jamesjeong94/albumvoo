import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import LandingPage from './LandingPage';
import './public/styles.scss';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/main" component={App} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);
