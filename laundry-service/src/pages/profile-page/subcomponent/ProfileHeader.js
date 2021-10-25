import './ProfileHeader.css'

import { Card, Container, Col, Row } from "react-bootstrap";

const profile = {
  name: "Ông tổ giặt ủi",
  img: "https://picsum.photos/200/200",
};

const orderIcon = process.env.PUBLIC_URL + "/images/store.png";
const followShopIcon = process.env.PUBLIC_URL + "images/follow.png";
const ORDER_COUNT = 5;
const followShopNum = 5;

function ProfilePicture() {
  return (
    <Card className='profile-pic clear-fix'>
      <Card.Img src={profile.img} />
      <Card.Title>{profile.name}</Card.Title>
    </Card>
  );
}

function Order({orderCount}) {
  return (
    <Card className='order-count-section'>
      <Card.Body className='order-count-text h1'>{orderCount} 📦</Card.Body>
      <Card.Title className='order-count-title'>総注文数</Card.Title>
    </Card>
  );
}

function FollowShop() {
  return (
    <Card className='shop-follow-count-section'>
      <Card.Body className='shop-follow-count-text h1'>{followShopNum} 🏪</Card.Body>
      <Card.Title className='shop-follow-title'>フォローしている店舗数</Card.Title>
    </Card>
  );
}

function ProfileHeader() {
  return (
    <Card className='profile-header-container'>
      <Card.Body className='profile-header'>
          <ProfilePicture />
          <Order orderCount={ORDER_COUNT}/>
          <FollowShop />
      </Card.Body>
    </Card>
  );
}

export default ProfileHeader;