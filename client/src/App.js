import { Footer, Topbar } from "./component/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./pages/front-page/FrontPage";
import Shop from "./pages/shop/shop";
import ProfilePage from "pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import InfoPage from "pages/info/InfoPage";
import Paymemt from "pages/payment/payment";
import Admin  from "./pages/admin/admin";
import QuanLyPage from "pages/quanly/QuanLyPage";
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
            <Route path="/payment/" exact>
              <Paymemt />
            </Route>
            <Route path="/info" exact>
              <InfoPage />
            </Route>
            <Route path="/quanly" exact>
              <QuanLyPage />
            </Route>
            <Route path="/admin" exact>
              <Admin />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
