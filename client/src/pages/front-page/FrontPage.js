import { Container } from 'react-bootstrap';
import './FrontPage.css';
import RecommendedSection from './subcomponent/RecommendedSection';
import PickSection from './subcomponent/PickSection';

function FrontPage() {
	return (
		<Container className='page-container'>
			<RecommendedSection/>
			<PickSection/>
		</Container>
	);
}
export default FrontPage;