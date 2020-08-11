import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import LandingPage from './LandingPage';
import '../public/styles.scss';

import { getCookieValue } from './util';

const access_token = getCookieValue('access_token');
const refresh_token = getCookieValue('refresh_token');

const authenticatePath = access_token
  ? '/main'
  : refresh_token
  ? '/spotify/auth/refresh_token'
  : '/spotify/auth/login';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/main" component={App} />
        <Route
          path="/"
          component={() => {
            return <LandingPage rerouteLink={authenticatePath} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
