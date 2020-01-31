import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./components/Header";
import BubblePage from "./components/BubblePage";
import Colorlist from "./components/ColorList";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import NoMatch from "./components/NoMatch";

import "./styles.scss";

import { axiosWithAuth } from "./utils/axiosWithAuth";

const App = () => {
  // const [bubbles, setBubbles] = useState([])

  // const [isLoading, setIsLoading] = useState()

  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      // .then(setIsLoading(true))
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <ProtectedRoute exact path="/private" component={BubblePage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
