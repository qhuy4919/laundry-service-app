import { useState, useEffect } from "react";
import "./ProfileHeader.css";
import { Card, Form, Button } from "react-bootstrap";
import { CommandProfile } from "../../../api/account/profile";

function ProfilePicture() {
  return (
    <Card className="profile-pic clear-fix">
      <Card.Img src={profile.img} />
      <Card.Title>{profile.name}</Card.Title>
    </Card>
  );
}

function Order({ orderCount }) {
  return (
    <Card className="order-count-section">
      <Card.Body className="order-count-text h1 bg-light">
        {orderCount} 📦
      </Card.Body>
      <Card.Title className="order-count-title">総注文数</Card.Title>
    </Card>
  );
}

function FollowShop() {
  return (
    <Card className="shop-follow-count-section ">
      <Card.Body className="shop-follow-count-text h1 bg-light">
        {followShopNum} 🏪
      </Card.Body>
      <Card.Title className="shop-follow-title">
        フォローしている店舗数
      </Card.Title>
    </Card>
  );
}

function ProfileHeader(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(profile.img);
  const [selectFile, setSelectFile] = useState(null);

  const onChangeUploadFile = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append("profile_pic", selectFile);
    const updateAvatar = async () => {
      const response = await CommandProfile.Avatar(formData);
      if (response) {
        console.log(response);
        setAvatar(response.data);
        setSelectFile(null);
        window.location.reload();
      }
    };
    updateAvatar();
  };

  return (
    <Card className="profile-header-container">
      <Card.Body className="profile-header">
        <Card className="profile-pic clear-fix">
          <Form>
            <Card.Img src={avatar} />
            {selectFile ? (
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleUploadFile()}
              >
                Submit
              </Button>
            ) : (
              <label for="apply" className="avatar-btn">
                <input
                  type="file"
                  name=""
                  id="apply"
                  accept="image/*,.pdf"
                  onClick={(e) => onChangeUploadFile(e)}
                />
                Upload
              </label>
            )}
          </Form>

          <Card.Title>{user.info.nickname}</Card.Title>
        </Card>
        <Card className="order-count-section">
          <Card.Body className="order-count-text h1 bg-light">
            {user.order.length}📦
          </Card.Body>
          <Card.Title className="order-count-title">総注文数</Card.Title>
        </Card>
        <Card className="shop-follow-count-section ">
          <Card.Body className="shop-follow-count-text h1 bg-light">
            {user.following.length} 🏪
          </Card.Body>
          <Card.Title className="shop-follow-title">
            フォローしている店舗数
          </Card.Title>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default ProfileHeader;

const orderIcon = process.env.PUBLIC_URL + "/images/store.png";
// const followShopIcon = process.env.PUBLIC_URL + "images/follow.png";
const ORDER_COUNT = 5;
const followShopNum = 5;

const profile = {
  name: "Ông tổ giặt ủi",
  // img: "https://picsum.photos/200/200",
  img: "https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-512.png",
};
