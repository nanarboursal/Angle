import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ratings from "./Pages/Ratings/Ratings";
import Profile from "./Pages/Profile/Profile";
import Library from "./Pages/Library/Library";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

export default function Routes(props) {
  //Add new routes in this array
  const routes = [
    {
      path: "/",
      component: Library
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/ratings",
      component: Ratings
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/signup",
      component: SignUp
    }
  ];
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
