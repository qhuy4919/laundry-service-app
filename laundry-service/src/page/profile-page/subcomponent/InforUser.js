import { useState } from "react";
import './InforUser.css'

const { default: Button } = require("@restart/ui/esm/Button");
const { Card, Form, Row, Col } = require("react-bootstrap");

const infor = {
  email: "11@gmail.com",
  name: "1",
  address: "1",
  birthday: "2021-10-07",
  phoneNum: "115",
};
function InforUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  return (
    <Card>
      <Card.Header>
        <Card.Title>情報</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
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
                type="Text"
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
                type="Text"
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
              <Form.Control
                type="tel"
                defaultValue={infor.phoneNum}
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs={11}></Col>
            <Col xs={1}>
              <Button type="reset">変更</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InforUser;
