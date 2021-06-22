import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { configure } from 'mobx';

import DayView from './Components/DayView/DayView';
import NavHeader from './Components/Navigation/NavHeader';
import NavFooter from './Components/Navigation/NavFooter';
import NavigationViewModel from './ViewModels/NavigationViewModel';
import DayViewModel from './ViewModels/Day/DayViewModel';
import { useActivitiesStore } from './Stores/ActivitiesStore';
import AddToHomeScreen from './Components/PWA/AddToHomeScreen';
import SWConfig from './swConfig';
import UpdatePrompt from './Components/PWA/UpdatePrompt';

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

type AppProps = {
  swConfig: SWConfig
}

function App({ swConfig }: AppProps) {

  const store = useActivitiesStore();
  const navVM = new NavigationViewModel();

  const [isUpdatePending, setUpdatePending] = useState(false);

  swConfig.updateReady = () => setUpdatePending(true);

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
      {isUpdatePending? <UpdatePrompt/> : null}
    </>
  );
}

export default App;
