import FrontPage from "./pages/front-page/FrontPage";
import Shop from "./pages/shop/shop";
import { Footer, Topbar } from "./components/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfilePage from "pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import "./styles/misc.css";
import InfoPage from "pages/info/InfoPage";

function App() {
  return (
    <>
      <Router>
        <Topbar />

        <div className="upmost-container">
          {/* <Link to="/profile">Profile</Link>
            <Link to="/">Home</Link> */}
          <Switch>
            <Route exact path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route exact path="/" exact>
              <FrontPage />
            </Route>
            <Route path="/not-found" exact>
              <NotFoundPage />
            </Route>
            <Route path="/shop" exact>
              <Shop />
            </Route>
            <Route path="/info" exact>
              <InfoPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
