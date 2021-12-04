import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import NotFound from "./Views/NotFound";
import Stuff from "./Views/Stuff";
import Contact from "./Views/Contact";
import Login from "./Views/Login"; 


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
    </Route>
      <Route>
        <NotFound />
        </Route>
    </Switch>
  );
}
