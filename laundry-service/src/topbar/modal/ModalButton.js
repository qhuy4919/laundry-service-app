import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import Login from './login/Login';
import Register from './register/Register';
import PasswordReset from './password-reset/PasswordReset'

function ModalButton() {
    //for Modal
    const [mode, setMode] = useState(0);
    const onModalClose = () => setMode(0);
    const onSigninOpen = () => setMode(1); 
    const onSignupOpen = () => setMode(2); 
    const onPwForgotOpen = () => setMode(3);

    return (
        <>
            <Button variant="light" style={{lineheight: '1.5'}} onClick={onSigninOpen}>Sign-in</Button>
			{/* { <modeModalMapping[mode] handleClose={onModalClose}/> } */}
            { mode === 1 ? <Login handleClose={onModalClose} onRegisClick={onSignupOpen} onPwRsClick={onPwForgotOpen}/> : <></> }
            { mode === 2 ? <Register handleClose={onModalClose} onLoginClick={onSigninOpen} onPwRsClick={onPwForgotOpen}/> : <></> }
            { mode === 3 ? <PasswordReset handleClose={onModalClose} onLoginClick={onSigninOpen} onRegisClick={onSignupOpen}/> : <></> }
        </>
    );
}

export default ModalButton;