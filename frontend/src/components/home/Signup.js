import axios from 'axios';
import { useState } from 'react';
import validator from 'validator';

const Signup = () => {
    //Connect server
    const ipServ = process.env.REACT_APP_IP_SERVER;

    //Init states
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //Signup request
    const registerUser = async () => {
        await axios.post(ipServ + '/api/home/signup', {
            username: userName,
            email: userEmail,
            password: userPassword
        })
            .then((res) => {
                console.log(res.data.message)
                if (res.status === 201) {
                    alert("Bienvenue sur le forum");
                    window.location.replace("/home");
                }
                else {
                    setErrorMessage(JSON.stringify(res.data.message))
                }
            })
            .catch((err) => {
                console.log(err)
                let validateMail = validator.isEmail(userEmail)
                let validatePwd = validator.isStrongPassword(userPassword)
                if (userName && validatePwd && !validateMail) {
                    setErrorMessage("Veuillez entrer une adresse email correcte")
                }
                else if (userName && validateMail && !validatePwd) {
                    setErrorMessage("Le mot de passe doit contenir au minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 caractère spécial et 1 chiffre")
                }
                else if (userName && !validateMail && !validatePwd) {
                    setErrorMessage("Email et mot de passe incorrects")
                }
                else if (!validateMail && !validatePwd && !userName) {
                    setErrorMessage("Veuillez remplir tous les champs")
                }

            })
    };
    return (
        <div className='home-signup'>
            <form onClick={(e) => { registerUser(e) }} onSubmit={(e) => { registerUser(e) }}>
                <label>
                    Nom d'utilisateur :
                    <input type="text" label="Nom d'utilisateur" onChange={(e) => { setUserName(e.target.value) }}></input>
                </label>
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
                    value="Envoyer"
                />
            </form>
            <p>{errorMessage}</p>
        </div>
    )
};
export default Signup;