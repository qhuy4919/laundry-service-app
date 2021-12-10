import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Login.css";

import { callSignIn } from "api/account/sign-in";

function Login({ handleClose, onRegisClick, onPwRsClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email==="") {
      alert("サインインは失敗しました💦\nHINT: Emailを入力してください");
      return false;
    }
    if (password==="") {
      alert("サインインは失敗しました💦\nHINT: Passwordを入力してください");
      return false;
    }

    const succeed = await callSignIn({ email, password });
    if (succeed) {
      handleClose();
    } else {
      alert("サインインは失敗しました💦\nHINT: EmailをNicknameと間違えましたか？");
    }
  };

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-modal-body">
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="formBasicEmail" className="modal-field">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="modal-field">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicButton" className="modal-field">
              <Button className="login-button" variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onRegisClick}>Sign Up Here</Button>
          <Button onClick={onPwRsClick}>Password Reset Here</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
