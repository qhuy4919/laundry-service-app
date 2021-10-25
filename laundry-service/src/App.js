import Topbar from "./topbar/Topbar";
import FrontPage from "./pages/front-page/FrontPage";
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import Footer from "./foooter/Footer";

function App() {
  return (
    <>
      <Topbar/>
      <FrontPage/>
      <Footer/>
    </>
  );
}

export default App;
