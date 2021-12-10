import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import './Register.css';

import {callSignUp} from 'api/account/sign-up';
import {MdOutlineMarkEmailRead} from 'react-icons/md';

function Register({handleClose, onLoginClick, onPwRsClick, onMailConfClick}) {
    const [formData, setFormData] = useState({nickname:'', email:'', password:'', confirm_password:''})
    const [signUpBtnClick, setSignUpBtnClick] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setSignUpBtnClick(true);
        await __onSubmitHandler();
    }

    const __onSubmitHandler = async () => {
        const {nickname, email, password, confirm_password} = formData
        if ( nickname.length * email.length * password.length * confirm_password.length === 0) {
            setSignUpBtnClick(false);
            alert('サインアップに失敗しました…\nHINT: Fieldが全部入力してください')
            return false;
        }
        if (password !== confirm_password) {
            setSignUpBtnClick(false);
            alert('サインアップに失敗しました…\nHINT: PasswordとConfirm Passwordが異なります')
            return false;
        }

        const succeed = await callSignUp({...formData, username: nickname});
        // const res = await callSignUp(formData);
        if (succeed) {
            setSignUpBtnClick(false);
            alert("サインアップに成功しました!\nサインイン前に、Mail介してアカウントを確認してください")
            // onMailConfClick(); // 
            return true;
        } else {
            setSignUpBtnClick(false);
            alert('サインアップに失敗しました…\nサーバーがリクエストを拒否しました...管理者に連絡してください。')
            return false;
        }
    }

    return (
        <div>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className='login-modal-body'>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="formBasicNickname" className='modal-field'>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="text" placeholder="Username" 
                                onChange={(e)=>setFormData({...formData, nickname: e.target.value})}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='modal-field'>
                            <Form.Label>Mail Address</Form.Label>
                            <Form.Control type="text" placeholder="Email"
                                onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='modal-field'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordAgain" className='modal-field'>
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e)=>setFormData({...formData, confirm_password: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicButton" className='modal-field button-panel'>
							<Button className="login-button" variant="primary" type="submit">
                                Sign Up  
                            {signUpBtnClick && <span>  <Spinner animation="border" style={{"display":"inline-block", "height":"15px", "width":"15px"}}/></span>}
							</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onLoginClick}>Sign In Here</Button>
                    <Button onClick={onPwRsClick}>Password Reset Here</Button>
                    {/* <Button className="login-button" onClick={onMailConfClick} variant="primary">
                        <MdOutlineMarkEmailRead/>
                    </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Register;