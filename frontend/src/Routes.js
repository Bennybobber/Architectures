import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import NotFound from "./Views/NotFound";
import Requests from "./Views/Requests";
import MakeRequest from "./Views/MakeRequest";
import Login from "./Views/Login";
import Register from "./Views/Register"
import ManageAccounts from "./Views/ManageAccounts";
import CreateAccount from "./Views/CreateAccount";
import CompletedRequests from "./Views/completedRequests";

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
      <Route exact path ="/admin/users">
        <ManageAccounts />
      </Route>
      <Route exact path ="/makeRequest">
        <MakeRequest />
      </Route>
      <Route exact path ="/account/create">
        <CreateAccount /> 
      </Route>
      <Route exact path ="/requests/approved">
        <CompletedRequests/>
      </Route>
      <Route>
        <NotFound />
        </Route>
    </Switch>
  );
}
