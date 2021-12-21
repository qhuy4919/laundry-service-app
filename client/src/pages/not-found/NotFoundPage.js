import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./NotFoundPage.css"

function NotFoundPage() {
	return (
		<Container className='page-container not-found'>
			<div className="notfound">
				<div className="notfound-404">
				<h1>404</h1>
				</div>
				<h2>Oops, The Page you are looking for can't be found!</h2>
				<Link to='/'>Home</Link>
			</div>
		</Container>
	)
}

export default NotFoundPage;