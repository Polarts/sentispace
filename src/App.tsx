import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DayPage from './Components/Pages/DayPage';
import NavHeader from './Components/NavHeader';
import Routes from './RoutesEnum';
import NavFooter from './Components/NavFooter';

function App() {
  return (
    <Router>
      <NavHeader/>
      <Switch>
        <Route path={Routes.day} component={DayPage}/>
        <Route path={Routes.month}/>
        <Route path={Routes.year}/>
        <Redirect from="/" to={Routes.day} exact/>
      </Switch>
      <NavFooter/>
    </Router>
  );
}

export default App;
