import { useState } from "react";
import './ProfileInformation.css'

import { Button } from "react-bootstrap";
import { Card, Form, Row, Col } from "react-bootstrap";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

const infor = {
  email: "11@gmail.com",
  name: "1",
  address: "1",
  birthday: "2021-10-07",
  phoneNum: "",
};
function ProfileInformation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  return (
    <Card className="user-information-container">
      <Card.Header>
        <Card.Title>情報</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className="user-information-form">
          <Row>
            <Col xs={3}>
              <Form.Label>メールアドレス</Form.Label>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="email"
                defaultValue={infor.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                defaultValue={infor.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                defaultValue={infor.address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
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
                defaultValue={infor.birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>電話番号</Form.Label>
            </Col>
            <Col xs={9}>
              <PhoneInput
                defaultCountry="vn"
                placeholder="Enter your Phone Number"
                value={infor.phoneNum}
                onChange={setPhoneNum}
              />
              {/* <Form.Control
                type="tel"
                defaultValue={infor.phoneNum}
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              ></Form.Control> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="form-submit-btn" type="submit">変更</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileInformation;
