import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import { isLoggedIn } from "./Functions/Authentication";

import Ratings from "./Pages/Ratings/Ratings";
import Playlists from "./Pages/Playlists/Playlists";
import Library from "./Pages/Library/Library";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import AddBook from "./Pages/AddBook/AddBook";
import AddMovie from "./Pages/AddMovie/AddMovie";

export default function Routes(props) {
  //Add new routes in this array
  const privateRoutes = [
    {
      path: "/playlists",
      component: Playlists
    },
    {
      path: "/ratings",
      component: Ratings
    },
    {
      path: "/addbook",
      component: AddBook
    },
    {
      path: "/addmovie",
      component: AddMovie
    }
  ];

  const publicRoutes = [
    {
      path: "/",
      component: Library
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
        {publicRoutes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={publicRoutes.path}
              component={publicRoutes.component}
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          return (
            <PrivateRoute
              exact
              isloggedin={isLoggedIn()}
              path={privateRoutes.path}
              component={privateRoutes.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
