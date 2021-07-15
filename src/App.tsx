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
import NavigationViewModel from './Data/ViewModels/NavigationViewModel';
import DayViewModel from './Data/ViewModels/Day/DayViewModel';
import AddToHomeScreen from './Components/PWA/AddToHomeScreen';
import ActivitiesStore from './Data/Stores/ActivitiesStore';
import Database from './Data/Database';
import TagsStore from './Data/Stores/TagsStore';

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

  const db = new Database();
  const tagStore = TagsStore.instance; tagStore.init(db);
  const actStore = ActivitiesStore.instance; actStore.init(db, tagStore);
  const navVM = new NavigationViewModel();

  return (
    <>
      <NavHeader vm={navVM}/>
      <Switch>
        <Route exact path={Routes.day}>
          <DayView vm={new DayViewModel(actStore, navVM)}/>
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
