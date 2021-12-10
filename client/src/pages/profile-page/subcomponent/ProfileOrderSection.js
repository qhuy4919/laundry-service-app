import './ProfileOrderSection.css'
import { Card, Table } from "react-bootstrap";

function ProfileOrder({ order }) {
  const { id, order_time, total_cost, order_status } = order;
  return (
    <tr>
      <td>{id}</td>
      <td>{(new Date(order_time)).toLocaleString()}</td>
      <td>{total_cost}</td>
      <td>{order_status}</td>
    </tr>
  );
}

function ProfileOrderSection({ orders }) {
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
            {
              orders.length > 0 
                ?
              orders.map((order, idx) => (
                <ProfileOrder key={`profile-order-${idx}`} order={order} />
              ))
                :
              <tr>
                <td colSpan={4}> このユーザーには現在注文がありません </td>
              </tr>
            }
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
