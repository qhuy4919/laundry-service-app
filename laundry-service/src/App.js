import FrontPage from "./pages/front-page/FrontPage";
import Shop from "./pages/shop/shop";
import { Footer, Topbar } from "./components/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfilePage from "pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import InfoPage from "pages/info/InfoPage";
import QuanLyPage from "pages/quanly/QuanLyPage";
import Paymemt from "pages/payment/payment";
import "./styles/misc.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Topbar />

        <div className="upmost-container">
          <Switch>
            <Route exact path="/" exact>
              <FrontPage />
            </Route>
            <Route exact path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route path="/not-found" exact>
              <NotFoundPage />
            </Route>
            <Route path="/shop/:id" exact>
              <Shop />
            </Route>
            <Route path="/payment/:shopName" exact>
              <Paymemt />
            </Route>
            <Route path="/info" exact>
              <InfoPage />
            </Route>
            <Route path="/quanly" exact>
              <QuanLyPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
