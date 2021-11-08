import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Card, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OrderItemInner } from "../../components/order-item/order-item";

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
      order_details: {
        ...JSON.parse(localStorage.getItem(ITEM_IN_CART)),
      }
    };
    console.log(newdata);

    const sendOrder = async () => {
      try {
        // console.log("Payment", data)
        const response = await CommandOrder.list(newdata);
        if (response) {
          alert("ご注文でありがとうございました。ショップがemailと電話番号でご連絡いたします。");
        }
      } catch (error) {
        alert("ご注文を登録に失敗しました…管理者に連絡してください。");
        console.log("Send Order Failed");
      }
    };

    sendOrder();
  };

  return (
    <div className="">
      <Card className="payment-container">
        <Card.Header>
          <Card.Title>注文確認：</Card.Title>
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
                  placeholder="お客様の名前を教えてください"
                  defaultValue={userInformation.name}
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
                  placeholder="お客様の住所を教えてください"
                  defaultValue={userInformation.address && (userInformation.address.string || '')}
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
                  placeholder="連絡のための電話番号を入力してください"
                  defaultValue={userInformation.phone_number}
                  // value={phoneNum}
                  // onChange={setPhoneNum}
                  {...register("phone_number")}
                ></Form.Control>
              </Col>
            </Row>
            <br/>
            <div className="order-item" style={{"border":"1px solid black"}}>
              <h5 style={{"margin":"auto", "paddingLeft":"5px"}}>注文</h5>
              <hr/>
              <OrderItemInner closeNextButton={true} />
            </div>
            <br/>
            <Row className="memo-row">
              <Col xs={3}>
                <Form.Label>注文メモ</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="text"
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
