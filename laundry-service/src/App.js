import Topbar from "./topbar/Topbar";
import FrontPage from "./pages/front-page/FrontPage";

import React from "react";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Footer from "./components/footer/Footer";
import ProfilePage from "pages/profile-page/ProfilePage";

import NotFoundPage from "./pages/NotFoundPage"
import "./styles/misc.css"

function App() {
  return (
    <>
      <Topbar/>

      <div className="upmost-container">
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
            <Route path="/">
              <NotFoundPage/>
            </Route>
          </Switch>
        </Router>
      </div>

      <Footer/>
    </>
  );
}

export default App;
