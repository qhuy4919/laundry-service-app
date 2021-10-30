import './ProfileOrderSection.css'

const { Card, Row, Col } = require("react-bootstrap");
const orders = [
  {
    id: "1",
    time: "00:00:00",
    cost: "1",
    status: "1",
  },
  {
    id: "2",
    time: "00:00:00",
    cost: "2",
    status: "1",
  },
  {
    id: "3",
    time: "00:00:00",
    cost: "3",
    status: "1",
  },
];

function ProfileOrder({ order }) {
  const { id, time, cost, status } = order;
  return (
    <Row>
      <Col>{id}</Col>
      <Col>{time}</Col>
      <Col>{cost}</Col>
      <Col>{status}</Col>
    </Row>
  );
}

function ProfileOrderSection() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>注文</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Card.Title>ID</Card.Title>
              </Col>
              <Col>
                <Card.Title>時間</Card.Title>
              </Col>
              <Col>
                <Card.Title>合計金額</Card.Title>
              </Col>
              <Col>
                <Card.Title>注文状態</Card.Title>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {orders.map((order) => (
              <ProfileOrder order={order} />
            ))}
          </Card.Body>
        </Card>
        <div className='see-more-box'>
					<a href='https://example.org/'>もっと見る</a>
				</div>
      </Card.Body>
    </Card>
  );
}
export default ProfileOrderSection;
