import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import SWConfig from './swConfig';
import reportWebVitals from './reportWebVitals';

import './Styles/imports/reset.css';
import './Styles/imports/fontawesome.css';
import './Styles/main.css';

document.addEventListener('contextmenu', e => {
  e.preventDefault();
  return false;
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
serviceWorkerRegistration.register(new SWConfig());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
