import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DayPage from './Components/Pages/DayPage';
import NavHeader from './Components/NavHeader';
import NavFooter from './Components/NavFooter';
import { configure } from 'mobx';

configure({
  enforceActions: 'never'
});

export enum Routes {
  day = '/day',
  month = '/month',
  year = '/year',
  edit = '/day/edit'
}

function App() {

  return (
    <>
      <NavHeader/>
      <Switch>
        <Route exact path={Routes.day}>
          <DayPage/>
        </Route>
        <Route exact path={Routes.month}/>
        <Route exact path={Routes.year}/>
        <Redirect from="/" to={Routes.day} exact/>
      </Switch>
      <NavFooter/>
    </>
  );
}

export default App;
