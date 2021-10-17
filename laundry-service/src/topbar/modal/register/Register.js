// import React, { `useState, useEffect `} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Register.css';

function Register({handleClose, onLoginClick, onPwRsClick}) {
    return (
        <div>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className='login-modal-body'>
                    <Form>
                        <Form.Group controlId="formBasicNickname" className='modal-field'>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="text" placeholder="Username" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='modal-field'>
                            <Form.Label>Mail Address</Form.Label>
                            <Form.Control type="text" placeholder="Email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='modal-field'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordAgain" className='modal-field'>
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButton" className='modal-field'>
							<Button className="login-button" variant="primary" type="submit">
                                Sign Up
							</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onLoginClick}>Sign In Here</Button>
                    <Button onClick={onPwRsClick}>Password Reset Here</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Register;