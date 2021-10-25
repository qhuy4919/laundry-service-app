import Topbar from "./topbar/Topbar";
import FrontPage from "./pages/front-page/FrontPage";

import React from "react";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Footer from "./foooter/Footer";
import ProfilePage from "pages/profile-page/ProfilePage";

function App() {
  return (
    <>
      <Topbar/>
    
      <Router>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>
        <Switch>
          <Route exact path="/profile">
            <ProfilePage/>
          </Route>
          <Route exact path="/">
            <FrontPage/>
          </Route>
        </Switch>
      </Router>
      <Footer/>
      <Footer/>
    </>
  );
}

export default App;
