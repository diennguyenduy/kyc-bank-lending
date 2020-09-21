import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';
import Admin from 'layouts/Admin';
import 'assets/css/material-dashboard-react.css?v=1.8.0';
const hist = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/' component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
