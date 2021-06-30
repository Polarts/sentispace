import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { configure } from 'mobx';

import DayView from './Components/Pages/DayView/DayView';
import NavHeader from './Components/Navigation/NavHeader';
import NavFooter from './Components/Navigation/NavFooter';
import NavigationViewModel from './ViewModels/NavigationViewModel';
import DayViewModel from './ViewModels/Day/DayViewModel';
import { useActivitiesStore } from './Data/Stores/ActivitiesStore';
import AddToHomeScreen from './Components/PWA/AddToHomeScreen';

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
  const navVM = new NavigationViewModel();

  return (
    <>
      <NavHeader vm={navVM}/>
      <Switch>
        <Route exact path={Routes.day}>
          <DayView vm={new DayViewModel(store, navVM)}/>
        </Route>
        <Route exact path={Routes.week}/>
        <Route exact path={Routes.month}/>
        <Redirect from="/" to={Routes.day} exact/>
      </Switch>
      <NavFooter vm={navVM}/>
      <AddToHomeScreen/>
    </>
  );
}

export default App;
