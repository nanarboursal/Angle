import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ratings from "./Pages/Ratings/Ratings";
import Playlists from "./Pages/Playlists/Playlists";
import Library from "./Pages/Library/Library";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import AddMedia from "./Pages/AddMedia/AddMedia";
import AddPlaylist from "./Pages/AddPlaylist/AddPlaylist";
import { InspectMedia } from "./Pages/InspectMedia/InspectMedia";
import { InspectPlaylist } from "./Pages/InspectPlaylist/InspectPlaylist";

export default function Routes(props) {
  //Add new routes in this array
  const routes = [
    {
      path: "/",
      component: Library
    },
    {
      path: "/playlists",
      component: Playlists
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
    },
    {
      path: "/addmedia",
      component: AddMedia
    },
    {
      path: "/addplaylist",
      component: AddPlaylist
    },
    {
      path: "/inspectmedia/:mediaType/:mediaID/:notes/:rating",
      component: InspectMedia
    },
    {
      path: "/inspectplaylist/:playlistName",
      component: InspectPlaylist
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
