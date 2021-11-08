import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Card, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OrderItem } from "../../components/order-item/order-item";
import { itemListSelector } from "store/itemSlice";
import { ITEM_IN_CART, SIGNED_IN_USER } from "../../const/local-storage-key";
import { CommandOrder } from "../../api/order/index";
import "./payment.scss";
import { useSelector } from "react-redux";

export default function Payment() {
  const { register, handleSubmit } = useForm();
  const [userInformation, setUserInformation] = useState({});
  const shopState = useSelector(itemListSelector);
  const [shopName, setShopName] = useState(shopState.shopName || "利用不可");

  useEffect(() => {
    setUserInformation(
      JSON.parse(localStorage.getItem(SIGNED_IN_USER)).data.user
    );
  }, [JSON.stringify(userInformation)]);
  const onSubmit = (data) => {
    let newdata = {
      ...data,
      ...JSON.parse(localStorage.getItem(ITEM_IN_CART)),
    };
    console.log(newdata);

    const sendOrder = async () => {
      try {
        const response = await CommandOrder.list(data);
        if (response) {
          alert("thank you");
        }
      } catch (error) {
        console.log("Put profile fail");
      }
    };
    sendOrder();
  };

  return (
    <div className="">
      <Card className="payment-container">
        <Card.Header>
          <Card.Title>注文詳細</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="payment-form">
            <Row>
              <Col xs={3}>
                <Form.Label>ショップ名</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  defaultValue={shopName}
                  readOnly
                  // onChange={(e) => {
                  //   setUsername(e.target.value);
                  // }}
                  {...register("shop_name")}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Form.Label>顧客名</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  defaultValue={userInformation.nickname}
                  {...register("username")}
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
                  defaultValue={userInformation.address}
                  // onChange={(e) => {
                  //   setBirthday(e.target.value);
                  // }}
                  {...register("address")}
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
                  defaultValue={userInformation.phone_number}
                  // value={phoneNum}
                  // onChange={setPhoneNum}
                  {...register("phone_number")}
                ></Form.Control>
              </Col>
            </Row>
            <div className="order-item">
              <OrderItem closeNextButton={true} />
            </div>
            <Row className="memo-row">
              <Col xs={3}>
                <Form.Label>注文メモ</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  placeholder="..."
                  // value={phoneNum}
                  // onChange={setPhoneNum}
                  {...register("note")}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="submit-btn-col">
                <Button
                  variant="secondary"
                  className="form-submit-btn"
                  type="submit"
                >
                  完了
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
