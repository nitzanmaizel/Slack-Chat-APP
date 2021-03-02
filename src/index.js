import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Root = ()=>(
  <Router>
    <Switch>
      <Route  path='/' component={App}/>
    </Switch>
  </Router>
)


ReactDOM.render(
    <Root />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
