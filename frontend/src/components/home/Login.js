import axios from 'axios';
import { useState } from 'react';
import validator from 'validator';


const Login = () => {
    //Connect server
    const ipServ = process.env.REACT_APP_IP_SERVER;

    //Init states
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    //Login request
    const connectUser = async () => {
        try {
            await axios.post(ipServ + '/api/home/login', {
                email: userEmail,
                password: userPassword
            })
                .then((res) => {
                    if (res.status === 201) {
                        window.localStorage.setItem("token", res.data.token);
                        window.localStorage.setItem("uid", res.data.userId);

                        alert("Content de vous revoir");
                        window.location.replace("/FeedHome");
                    }

                })
                .catch((err) => {
                    let validateMail = validator.isEmail(userEmail)
                    let validatePwd = validator.isStrongPassword(userPassword)
                    if (!validateMail && validatePwd) {
                        setErrorMessage("Veuillez entrer une adresse email correcte")
                    }
                    else if (validateMail && !validatePwd) {
                        setErrorMessage("Le mot de passe est incorrect")
                    }
                    else if (!validateMail && !validatePwd) {
                        setErrorMessage("Email et mot de passe incorrects")
                    }
                })
                ;
        }
        catch (err) {
            setErrorMessage("Veuillez entrer vos identifiants")
        }
    };
    return (
        <div className='home-login'>
            <form onClick={(e) => connectUser(e)}>
                <label>
                    Email :
                    <input type="email" label="email" onChange={(e) => { setUserEmail(e.target.value) }}></input>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" label="Mot de passe" onChange={(e) => { setUserPassword(e.target.value) }}></input>
                </label>
                <input
                    type="button"
                    value="Se connecter"
                />
            </form>
            <p>{errorMessage}</p>
        </div>
    )
};
export default Login;