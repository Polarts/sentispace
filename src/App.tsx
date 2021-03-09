import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/day"/>
        <Route path="/month"/>
        <Route path="/year"/>
      </Switch>
    </Router>
  );
}

export default App;
