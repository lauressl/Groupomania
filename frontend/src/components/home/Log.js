import React from 'react'
import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

const Log = () => {
    const [signupModal, setsignupModal] = useState(true);
    const [loginModal, setloginModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register"){
            setsignupModal(true)
            setloginModal(false)
        } else if (e.target.id === "login") {
            setsignupModal(false)
            setloginModal(true)
        }
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleModals} id="register" className={signupModal ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={loginModal ? "active-btn" : null}>Se connecter</li>
                </ul>
                {signupModal && <Signup/>}
                {loginModal && <Login/>}
            </div>
        </div>
    )
}

export default Log