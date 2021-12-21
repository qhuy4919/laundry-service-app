import {Card} from "react-bootstrap";
import "./Stats.scss"

export function Stats() {
	return (
	
	<div className="stats-wrapper">
		<h2>Statistics</h2>
		<hr></hr>
		<div className="stats-container">
			<Card className="count-section">
			<Card.Body className="count-text h1 bg-light">
				9999+ 👤
			</Card.Body>
			<Card.Title className="count-title">ユーザー数</Card.Title>
			</Card>
			{/*  */}
			<Card className="count-section ">
			<Card.Body className="count-text h1 bg-light">
				999+ 🏪
			</Card.Body>
			<Card.Title className="count-title">店舗数 </Card.Title>
			</Card>
			{/*  */}
			<Card className="order count-section ">
			<Card.Body className="count-text h1 bg-light">
				999999+ 📦
			</Card.Body>
			<Card.Title className="count-title">注文数 </Card.Title>
			</Card>
			{/*  */}
			<Card className="income count-section ">
			<Card.Body className="count-text h1 bg-light">
				999M+ 💰
			</Card.Body>
			<Card.Title className="count-title">総収入 </Card.Title>
			</Card>
		</div>
	</div>
	);
}