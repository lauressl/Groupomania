import axios from 'axios';
import { useState } from 'react';

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
                    console.log(res.data.message)
                    setErrorMessage(JSON.stringify(res.data.message))
                }
            })
            .catch((res) => {
                console.log(res)
            })
    };
    return (
        <div className='home-signup'>
            <form>
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
            </form>
            <p>{errorMessage}</p>
            <button onClick={(e) => { registerUser(e) }}> S'enregistrer</button>
        </div>
    )
};
export default Signup;