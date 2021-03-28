import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import DayPage from './Components/Pages/DayPage';
import NavHeader from './Components/NavHeader';
import NavFooter from './Components/NavFooter';
import { configure } from 'mobx';
import ActivityForm from './Components/ActivityForm';

configure({
  enforceActions: "never"
});

export enum Routes {
  day = '/day',
  month = '/month',
  year = '/year',
  edit = '/day/edit'
}

export interface LocationState {
  background: any
}

function App() {

  const location = useLocation<LocationState>();

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
