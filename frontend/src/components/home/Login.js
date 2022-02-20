import axios from 'axios';
import { useState } from 'react';


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
                    console.log(res)
                    if (res.status === 201) {
                        window.localStorage.setItem("token", res.data.token);
                        window.localStorage.setItem("uid", res.data.userId);

                        alert("Content de vous revoir");
                        window.location.replace("/FeedHome");
                    }
                    else {
                        setErrorMessage("Email ou mot de passe incorrect")
                    }
                });
        } catch (error) {
            setErrorMessage("Email ou mot de passe incorrect");
        }
    };
    return (
        <div className='home-login'>
            <form>
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
            <button onClick={(e) => connectUser(e)}> Se connecter</button>
        </div>
    )
};
export default Login;