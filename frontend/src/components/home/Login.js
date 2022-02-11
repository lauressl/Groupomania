import axios from 'axios';
import { useState } from 'react';
import '../../styles/home.scss';


const Login = () => {
    //Connect server
    const ipServ = process.env.REACT_APP_IP_SERVER;

    //Init states
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    //Login request
    const connectUser = async () => {
        try {
            await axios.post(ipServ + '/api/home/login',{
                email : userEmail,
                password : userPassword
            })
            .then ((res) => {
                window.localStorage.setItem("token", res.data.token)
                alert ("Content de vous revoir");
                window.location.replace("/feed");
            });
        } catch (error) {
            if(!userPassword || !userEmail){
                alert("veuillez entrer vos identifiants")
            }
            console.log(error.response.request._response);
        }
    };
    return(
        <div className='home-login'>
            <h2>Déjà membre ?</h2>
            <form>
                <label>
                    Email :
                    <input type="email" label="email" onChange={(e) => {setUserEmail(e.target.value)}}></input>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" label="Mot de passe" onChange={(e) => {setUserPassword(e.target.value)}}></input>
                </label>
            </form>
            <button onClick ={(e) => connectUser(e)}> Se connecter</button>
        </div>
    )
};
export default Login;