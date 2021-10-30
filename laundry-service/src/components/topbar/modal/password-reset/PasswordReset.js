import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './PasswordReset.css';

import {callPasswordReset} from 'api/account/password-reset';

function PasswordReset({handleClose, onLoginClick, onRegisClick}) {
    const [email, setEmail] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (email === '') {
            alert('Please Input your Email')
            return false;
        }

        const succeed = await callPasswordReset({email});
        console.log(succeed);
        if (succeed) {
            handleClose();
            return true;
        } else {
            return false;
        }
    }


    return (
        <div>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body className='login-modal-body'>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="formBasicEmail" className='modal-field'>
                            <Form.Label>Mail Address</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicButton" className='modal-field'>
							<Button className="login-button" variant="primary" type="submit">
                                Password Reset
							</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onLoginClick}>Sign In Here</Button>
                    <Button onClick={onRegisClick}>Sign Up Here</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default PasswordReset;