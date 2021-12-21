import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import { MdOutlineChangeCircle } from "react-icons/md";
import { CommandProfile } from "../../../api/account/profile";

export function DefaultAdmin() {
	return (
		<>
          <Card className="count-section">
            <Card.Body className="count-text h1 bg-light">
              {9999999} 👤
            </Card.Body>
            <Card.Title className="count-title">ユーザー数</Card.Title>
          </Card>
          {/*  */}
          <Card className="count-section ">
            <Card.Body className="count-text h1 bg-light">
              {100000} 🏪
            </Card.Body>
            <Card.Title className="count-title">店舗数 </Card.Title>
          </Card>
          {/*  */}
          <Card className="order count-section ">
            <Card.Body className="count-text h1 bg-light">
              {100000} 📦
            </Card.Body>
            <Card.Title className="count-title">注文数 </Card.Title>
          </Card>
          {/*  */}
          <Card className="income count-section ">
            <Card.Body className="count-text h1 bg-light">
              {100000} 💰
            </Card.Body>
            <Card.Title className="count-title">総収入 </Card.Title>
          </Card>
		</>
	);
}
