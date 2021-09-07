import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ratings from "./Pages/Ratings/Ratings";
import Profile from "./Pages/Profile/Profile";
import Library from "./Pages/Library/Library";

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
