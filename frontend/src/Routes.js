import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import NotFound from "./Views/NotFound";
import Requests from "./Views/Requests";
import Contact from "./Views/Contact";
import Login from "./Views/Login";
import Register from "./Views/Register"


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/requests">
        <Requests />
      </Route>
      <Route>
        <NotFound />
        </Route>
    </Switch>
  );
}
