import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DayPage from './Components/Pages/DayPage';
import TopNavBar from './Components/NavHeader';
import Routes from './RoutesEnum';

function App() {
  return (
    <Router>
      <TopNavBar/>
      <Switch>
        <Route path={Routes.day} component={DayPage}/>
        <Route path={Routes.month}/>
        <Route path={Routes.year}/>
        <Redirect from="/" to={Routes.day} exact/>
      </Switch>
    </Router>
  );
}

export default App;
