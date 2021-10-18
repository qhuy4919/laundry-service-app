import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import './Topbar.css';

import ModalButton from './modal/ModalButton';

function Topbar() {
	return (
		<Navbar bg="light" expand="lg">
		<Container>
			<Navbar.Brand href="#home">Online Laundry</Navbar.Brand>
			<Nav className="me-auto">
				<Form className="d-flex navBarSearchForm">
				<FormControl
					type="search"
					placeholder="Search"
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