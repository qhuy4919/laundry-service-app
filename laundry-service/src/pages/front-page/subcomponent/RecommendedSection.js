import { Card, Row, Col } from 'react-bootstrap';
import './RecommendedSection.css';

const images = [
	'https://i.pinimg.com/originals/f7/d7/b4/f7d7b40d4b07ac82625bab743c8f0d03.png',
	'https://ezipod.my/wp-content/uploads/2019/05/Shops-Laundries-Laundry-Service-Self-Service-Laundry.jpg',
	'https://i.pinimg.com/originals/64/70/37/64703703487c193d4d855e88f8193fac.jpg',
	'https://lirp.cdn-website.com/e216b197/dms3rep/multi/opt/3206380e99fd5ed4f71511482be797a0-640w.jpg',
	'https://discoverormoccity.files.wordpress.com/2017/03/img_2154.jpg?w=900'
]
const names = [
	'Tiệm giặt ủi siêu tốc',
	'ABC Laundry Shop',
	'Naruto Laundry',
	'Lightning Washing',
	'Wash Now Shop',
]
const descs = [
	'Ai cần giặt ủi gọi tôi ngay...',
	'Giặt combo siêu khủng khiếp, combo bột giặt omo + aba siêu mạnh,...',
	'Giặt với sức mạnh khủng khiếp như Rasengan, đánh bay vết bẩn',
	'Giặt siêu tốc, giặt sấm sét!',
	'Trần Xuân Phúc\' favorite washing shop'
]
function getShop() {
	let shops = []
	for (let i = 0; i < names.length; i++) {
		shops.push(
			{
				name: names[i],
				description: descs[i],
				imgsrc: images[i],
			}
		)
	}
	return shops;
}

function Recommendation({shop}) {
	const {name, description, imgsrc} = shop;
	return (
		<Card style={{ 'max-height': '20vh', 'overflow': 'hidden' }}>
			<Card.Img variant="top" src={imgsrc}/>
			<Card.ImgOverlay>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{description}
				</Card.Text>
			</Card.ImgOverlay>
		</Card>
	);
}

function RecommendedSection() {
	const shops = getShop();
	return (
		<Card className='recommended-section-container'>
			<Card.Header>人気の店舗</Card.Header>
			<Card.Body id='scroll-bar-style'>
				<Row xs={2} md={3} className="g-4">
					{ shops.map((shop, idx) => 
						<Col md={idx === 0 ? 8 : -1}>
							<Recommendation shop={shop}/>
						</Col>
					)} 
				</Row>
				<div className='see-more-box'>
					<a href='#'>See more...</a>
				</div>
			</Card.Body>
		</Card>
	);
}
export default RecommendedSection;