import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { configure } from 'mobx';
import { AnimatePresence } from 'framer-motion';

import DayView from './Components/Pages/DayView/DayView';
import NavHeader from './Components/Navigation/NavHeader';
import NavFooter from './Components/Navigation/NavFooter';
import NavigationViewModel from './Data/ViewModels/NavigationViewModel';
import DayViewModel from './Data/ViewModels/Day/DayViewModel';
import AddToHomeScreen from './Components/PWA/AddToHomeScreen';
import ActivitiesStore from './Data/Stores/ActivitiesStore';
import Database from './Data/Database';
import TagsStore from './Data/Stores/TagsStore';
import NewActivityPage from './Components/Pages/DayView/NewActivityPage';
import ActivityFormViewModel from './Data/ViewModels/Day/ActivityFormViewModel';

configure({
  enforceActions: 'never'
});

export enum Routes {
  day = '/view/day',
  week = '/view/week',
  month = '/view/month',
  details = '/activity/details',
  add = '/activity/add',
  settings = '/menu/settings',
  about = '/menu/about'
}
function App() {

  const db = new Database();
  const tagStore = TagsStore.instance; tagStore.init(db);
  const actStore = ActivitiesStore.instance; actStore.init(db, tagStore);
  const navVM = new NavigationViewModel();

  const dayVM = new DayViewModel(actStore, navVM);

  const location = useLocation();

  return (
    <>
      <NavHeader vm={navVM}/>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location}>
          <Redirect from="/" to={Routes.day} exact/>

          <Route exact path={Routes.day}>
            <DayView vm={dayVM}/>
          </Route>
          <Route exact path={Routes.details}>
            
          </Route>
          <Route exact path={Routes.add}>
            <NewActivityPage vm={new ActivityFormViewModel(actStore, dayVM.currentlyEditing)} dayVM={dayVM}/>
          </Route>

          <Route exact path={Routes.week}/>
          <Route exact path={Routes.month}/>
          
        </Switch>
      </AnimatePresence>
      <NavFooter vm={navVM}/>
      <AddToHomeScreen/>
    </>
  );
}

export default App;
