import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import DayPage from './Components/Pages/DayPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/day" component={DayPage}/>
        <Route path="/month"/>
        <Route path="/year"/>
        <Redirect from="/" to="/day" exact/>
      </Switch>
    </Router>
  );
}

export default App;
