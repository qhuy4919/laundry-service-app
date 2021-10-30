import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './MailConfirm.css';

import {callMailConfirm} from 'api/account/mail-confirm';

function MailConfirm({handleClose}) {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (code === '' || email === '') {
            alert('Please Input all required Fields')
            return false;
        }

        const succeed = await callMailConfirm({email, token: code});
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
                    <Modal.Title>Email Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className='login-modal-body'>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="formBasicEmail" className='modal-field'>
                            <Form.Label>Mail Address</Form.Label>
                            <Form.Control type="mail" placeholder="Email" value={email}
                                onChange={(e)=>setEmail(e.target.value)} required/>

                            <Form.Label>Confirmation Code</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={code}
                                onChange={(e)=>setCode(e.target.value)} required/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicButton" className='modal-field'>
							<Button className="login-button" variant="primary" type="submit">
                                Confirm
							</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                {/* <Modal.Footer>
                    <Button onClick={onLoginClick}>Sign In Here</Button>
                    <Button onClick={onRegisClick}>Sign Up Here</Button>
                </Modal.Footer> */}
            </Modal>

        </div>
    );
}

export default MailConfirm;