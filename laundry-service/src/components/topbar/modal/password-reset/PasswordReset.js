import { useState } from 'react';
import { Spinner, Button, Form, Modal } from 'react-bootstrap';

import './PasswordReset.css';

import {callPasswordReset} from 'api/account/password-reset';

function PasswordReset({handleClose, onLoginClick, onRegisClick}) {
    const [email, setEmail] = useState('')
    const [resetBtnClick, setResetBtnClick] = useState(false)


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setResetBtnClick(true)
        await __onSubmitHandler();
    }

    const __onSubmitHandler = async () => {
        if (email === '') {
            setResetBtnClick(false)
            alert('パスワードリセットに失敗しました...\nHINT: おmailを入力してください')
            return false;
        }

        const succeed = await callPasswordReset({email});
        setResetBtnClick(false)
        if (succeed) {
            alert('パスワードリセットに成功しました!\nMailにチェックしてください')
            handleClose();
            return true;
        } else {
            alert('パスワードリセットに失敗しました...\nサーバーがリクエストを拒否しました...管理者に連絡してください。')
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
                                {resetBtnClick && <span>  <Spinner animation="border" style={{"display":"inline-block", "height":"15px", "width":"15px"}}/></span>}
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