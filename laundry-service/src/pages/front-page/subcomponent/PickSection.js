import { Card, Row } from 'react-bootstrap';
import './PickSection.css';

const locations = [
	{name: 'Liên Chiểu', count: 30},
	{name: 'Hải Châu', count: 50},
	{name: 'Hòa Vang', count: 30},
	{name: 'Ngũ Hành Sơn', count: 20},
	{name: 'Sơn Trà', count: 20},
	{name: 'Thanh Khê', count: 10},
	{name: 'Cẩm Lệ', count: 5},
]

function Choice({loc}) {
	const {name, count} = loc;
	return (
		<div className='pick-choice'>
			<span className='choice-name'>{name}</span>
			<span className='shop-count'>{count} 店舗</span>
		</div>
	)
}

function PickSection() {
	return (
		<Card className='pick-section-container'>
			<Card.Header>場所から選ぶ</Card.Header>
			<Card.Body id='scroll-bar-style'>
				<div className='pick-choice-wrapper'>
					<Row xs={5} md={2} className="g-4">
						{
							locations.map((loc, idx) => (
								<Choice loc={loc}/>
							))
						} 
					</Row>
				</div>
			</Card.Body>
		</Card>
	);
}
export default PickSection;