import Topbar from "./topbar/Topbar";
import FrontPage from "./pages/front-page/FrontPage";

import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import Footer from "./foooter/Footer";
import ProfilePage from "pages/profile-page/ProfilePage";

function App() {
  return (
    <>
      <Topbar/>
    
      <FrontPage/>
      <Footer/>

      {/* <ProfilePage/> */}
      {/* <FrontPage/> */}
      <Footer/>

    </>
  );
}

export default App;
