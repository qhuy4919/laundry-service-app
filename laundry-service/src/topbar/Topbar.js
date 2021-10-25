import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import './Topbar.css';
import logo from 'icon/logo-trans.png'
import ModalButton from './modal/ModalButton';
import { Link } from 'react-router-dom';

function Topbar() {
	return (
		<Navbar bg="light" expand="lg">
		<Container>
			<Navbar.Brand>
				<Link to="/">
					<img src={logo} alt="Logo"/>
					Online Laundry
				</Link>
			</Navbar.Brand>
			<Nav className="me-auto">
				<Form className="d-flex navBarSearchForm">
				<FormControl
					type="search"
					placeholder=""
					className="mr-2 navbarInputSearch"
					aria-label="Search"
				/>
				<Button variant="outline-success">🔎</Button>
				</Form>
			</Nav>

			<ModalButton/>
			{/* <Navbar.Text>
			<a href="#login">Sign In</a>
			</Navbar.Text> */}

		</Container>
		</Navbar>
	);
}
export default Topbar;