import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";

import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import NoMatch from "./components/NoMatch";

import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/protected" component={BubblePage} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
