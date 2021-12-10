import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './RecommendedSection.css';

const images = [
	'https://i.pinimg.com/originals/f7/d7/b4/f7d7b40d4b07ac82625bab743c8f0d03.png',
	'https://ezipod.my/wp-content/uploads/2019/05/Shops-Laundries-Laundry-Service-Self-Service-Laundry.jpg',
	'https://i.pinimg.com/originals/64/70/37/64703703487c193d4d855e88f8193fac.jpg',
	'https://lirp.cdn-website.com/e216b197/dms3rep/multi/opt/3206380e99fd5ed4f71511482be797a0-640w.jpg',
	'https://discoverormoccity.files.wordpress.com/2017/03/img_2154.jpg?w=900'
]
const names = [
	'w😲w LAUNDRY !',
	'Secret Sauce - Laundry',
	'Naruto Laundry',
	'Lightning Washing ⚡',
	'青空ランドリー',
]
const descs = [
	'信じられないほど速い、信じられないほどきれい、信じられないほど安い!!',
	'専用の自家製洗剤を使ったランドリー。 汚れは私たちの洗浄力に耐えることができません!',
	'螺旋丸の力で洗う！',
	'帯電した水で洗い、バクテリアを取り除きます⚡⚡！',
	'シンプル。高速。Tran Xuan Phuc様の大好きなランドリーショップ。',
]
function getShop() {
	let shops = []
	for (let i = 0; i < names.length; i++) {
		shops.push(
			{
				name: names[i],
				description: descs[i],
				imgsrc: images[i],
				shop_id: i+1,
			}
		)
	}
	return shops;
}

function Recommendation({shop}) {
	const {name, description, imgsrc, shop_id} = shop;
	let history = useHistory();
	const onCardClick = (e) => {
		let path = '/shop/';
		history.push({
			pathname: path+shop_id,
		})
	}

	return (
		<Card onClick={onCardClick} style={{ 'maxHeight': '20vh', 'overflow': 'hidden', 'cursor': 'pointer' }}>
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
						<Col md={idx === 0 ? 8 : -1} key={`rcm-sc-cn-${idx}`}>
							<Recommendation shop={shop}/>
						</Col>
					)} 
				</Row>
				<div className='see-more-box'>
					<a href='https://example.org/'>See more...</a>
				</div>
			</Card.Body>
		</Card>
	);
}
export default RecommendedSection;