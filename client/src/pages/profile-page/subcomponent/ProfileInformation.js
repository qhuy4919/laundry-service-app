import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ProfileInformation.css";

import { Button } from "react-bootstrap";
import { Card, Form, Row, Col } from "react-bootstrap";

import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { CommandProfile } from "../../../api/account/profile";
import { useForm } from "react-hook-form";

function ProfileInformation(props) {
  const { user, handleUpdateProfile } = props;
  const userInfor = user.info;
  // console.log(userInfor);
  let history = useHistory();

  const [email, setEmail] = useState(userInfor.email || null);
  const [name, setName] = useState(userInfor.name || null);
  const [address, setAddress] = useState(userInfor.address || null);
  const [birthday, setBirthday] = useState(userInfor.birthday || null);
  const [phoneNum, setPhoneNum] = useState(userInfor.phone_number || null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const updateProfile = async () => {
      try {
        const response = await CommandProfile.profile(data);
        if (response) {
          handleUpdateProfile(response.data);
        }
      } catch (error) {
        console.log("Put profile fail");
      }
    };
    updateProfile();
    // history.push('/profile')
    window.location.href='/profile';
  };

  return (
    <Card className="user-information-container">
      <Card.Header>
        <Card.Title>情報</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="user-information-form"
        >
          <Row>
            <Col xs={3}>
              <Form.Label>メールアドレス</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="email"
                defaultValue={email}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                {...register("email")}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>名前</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                defaultValue={name}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
                {...register("name")}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>住所</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                defaultValue={address}
                // onChange={(e) => {
                //   setAddress(e.target.value);
                // }}
                {...register("address")}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>生年月日</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="date"
                defaultValue={birthday}
                // onChange={(e) => {
                //   setBirthday(e.target.value);
                // }}
                {...register("birthday")}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>電話番号</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                placeholder="Enter your Phone Number"
                defaultValue={phoneNum}
                // value={phoneNum}
                // onChange={setPhoneNum}
                {...register("phone_number")}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="form-submit-btn" type="submit">
                変更
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileInformation;
