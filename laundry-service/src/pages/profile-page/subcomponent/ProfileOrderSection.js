import './ProfileOrderSection.css'
import { Card, Table } from "react-bootstrap";

function ProfileOrder({ order }) {
  const { id, time, cost, status } = order;
  return (
    <tr>
      <td>{id}</td>
      <td>{time}</td>
      <td>{cost}</td>
      <td>{status}</td>
    </tr>
  );
}

function ProfileOrderSection() {
  return (
    <Card className="profile-order-container">
      <Card.Header>
        <Card.Title>注文</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>時間</th>
              <th>合計金額</th>
              <th>注文状態</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <ProfileOrder order={order} />
            ))}
          </tbody>
        </Table>
        <div className='see-more-box'>
					<a href='https://example.org/'>もっと見る</a>
				</div>
      </Card.Body>
    </Card>
  );
}
export default ProfileOrderSection;

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
