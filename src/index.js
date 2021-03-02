import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { firebase } from "./firebase";
import App from "./components/App.js";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(() => {}, composeWithDevTools());

const Root = (props) => {
  const isUserLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        props.history.push("/");
      }
    });
  };

  useEffect(() => {
    isUserLogin();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
