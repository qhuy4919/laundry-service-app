import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import Login from './login/Login';
import Register from './register/Register';
import PasswordReset from './password-reset/PasswordReset'

import {SIGNED_IN_USER} from 'const/local-storage-key';

function ModalButton() {
    //for Modal
    const [mode, setMode] = useState(0);
    const onModalClose = () => setMode(0);
    const onSigninOpen = () => setMode(1); 
    const onSignupOpen = () => setMode(2); 
    const onPwForgotOpen = () => setMode(3);

    let signed_in_user_cred = localStorage.getItem(SIGNED_IN_USER) || undefined;
    if (signed_in_user_cred !== undefined)
        signed_in_user_cred = JSON.parse(signed_in_user_cred).data

    return (
        signed_in_user_cred === undefined
            ?
        <>
            <Button variant="light" style={{lineheight: '1.5'}} onClick={onSigninOpen}>Sign-in</Button>
            {/* { <modeModalMapping[mode] handleClose={onModalClose}/> } */}
            { mode === 1 ? <Login handleClose={onModalClose} onRegisClick={onSignupOpen} onPwRsClick={onPwForgotOpen}/> : <></> }
            { mode === 2 ? <Register handleClose={onModalClose} onLoginClick={onSigninOpen} onPwRsClick={onPwForgotOpen}/> : <></> }
            { mode === 3 ? <PasswordReset handleClose={onModalClose} onLoginClick={onSigninOpen} onRegisClick={onSignupOpen}/> : <></> }
        </>
            :
        <>
            <Button variant="light" style={{lineheight: '1.5'}} disabled>Hello {`${
                signed_in_user_cred.nickname
            }!`}</Button>
            <Button variant="light" style={{lineheight: '1.5'}} onClick={()=>{
                signed_in_user_cred=undefined; localStorage.removeItem(SIGNED_IN_USER);
            }}> Sign-Out</Button>
        </>
    );
}

export default ModalButton;