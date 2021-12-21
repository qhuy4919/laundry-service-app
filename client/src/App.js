import { Footer, Topbar } from "./component/index";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import FrontPage from "./pages/front-page/FrontPage";
import Shop from "./pages/shop/shop";
import ProfilePage from "pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import InfoPage from "pages/info/InfoPage";
import Paymemt from "pages/payment/payment";
import AdminPage from "./pages/admin/admin";
import { SIGNED_IN_USER } from "const/local-storage-key";
// import QuanLyPage from "pages/quanly/QuanLyPage";
import "./styles/misc.css";
import "./App.css";

function UserPage() {
  return (
    <>
      <Router>
        <Topbar />

        <div className="upmost-container">
          <Switch>
            <Route path="/" exact>
              <FrontPage />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
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
            <Route path="/not-found" exact>
              <NotFoundPage />
            </Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

function App() {
  const userCred = localStorage.getItem(SIGNED_IN_USER) ? JSON.parse(localStorage.getItem(SIGNED_IN_USER)).data.user : {role: 'guest'};

  // console.log(userCred)

  return (
    <>
      <Router>
          <Switch>
            {
              userCred.role && userCred.role.toLowerCase() === 'admin' && <Route path="/admin" exact> <AdminPage /> </Route>
            }
            <Route path="/not-found" exact>
              <NotFoundPage />
            </Route>
            <Route path="/" >
              <UserPage/>
            </Route>
            <Redirect to="/not-found"></Redirect>
         </Switch>
      </Router>
    </>
  );
}

export default App;
