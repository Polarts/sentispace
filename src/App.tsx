import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DayView from './Components/DayView/DayView';
import NavHeader from './Components/Navigation/NavHeader';
import NavFooter from './Components/Navigation/NavFooter';
import { configure } from 'mobx';
import NavHeaderViewModel from './ViewModels/NavHeaderViewModel';
import DayViewModel from './ViewModels/Day/DayViewModel';
import { useActivitiesStore } from './Stores/ActivitiesStore';

configure({
  enforceActions: 'never'
});

export enum Routes {
  login = '/login',
  day = '/view/day',
  week = '/view/week',
  month = '/view/month',
  settings = '/menu/settings',
  about = '/menu/about'
}

function App() {

  const store = useActivitiesStore();
  const navHeaderVM = new NavHeaderViewModel();

  return (
    <>
      <NavHeader vm={navHeaderVM}/>
      <Switch>
        <Route exact path={Routes.day}>
          <DayView vm={new DayViewModel(store, navHeaderVM)}/>
        </Route>
        <Route exact path={Routes.week}/>
        <Route exact path={Routes.month}/>
        <Redirect from="/" to={Routes.day} exact/>
      </Switch>
      <NavFooter/>
    </>
  );
}

export default App;
