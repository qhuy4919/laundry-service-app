const { Card, Container, Col, Row } = require("react-bootstrap");

const profile = {
  name: "Ông tổ giặt ủi",
  img: "https://picsum.photos/200/200",
};

const orderIcon = process.env.PUBLIC_URL + "/images/store.png";
const followShopIcon = process.env.PUBLIC_URL + "images/follow.png";

const orderNum = 5;
const followShopNum = 5;

function Profile() {
  return (
    <Card>
      <Card.Img src={profile.img} width={200} height={200} />
      <Card.Title>{profile.name}</Card.Title>
    </Card>
  );
}

function Order() {
  return (
    <Card>
      <Card.Img src={orderIcon} width={200} height={200} />
      <Card.Title>総注文数: {orderNum}</Card.Title>
    </Card>
  );
}

function FollowShop() {
  return (
    <Card>
      <Card.Img src={followShopIcon} width={200} height={200} />
      <Card.Title>総注文数: {followShopNum}</Card.Title>
    </Card>
  );
}

function ProfileHeader() {
  return (
    <Container>
      <Row>
        <Col>
          <Profile />
        </Col>
        <Col>
          <Order />
        </Col>
        <Col>
          <FollowShop />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileHeader;
