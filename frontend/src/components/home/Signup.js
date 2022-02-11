import axios from 'axios';
import { useState } from 'react';
import '../../styles/home.scss';

const Signup = () => {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    //Init states
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    //Signup request
    const registerUser = async () => {
        if(userName && userEmail && userPassword)
        try {
            await axios.post(ipServ + '/api/home/signup',{
                username : userName,
                email : userEmail,
                password : userPassword
            })
            .then ((res) => {
                console.log(res)
                alert ("Bienvenue sur notre forum")
            });
        } catch (error) {
            console.log(error.response.request._response);
        }
    };
    return(
        <div className='home-signup'>
            <h2>Nouveau ici ?</h2>
            <form>
                <label>
                    Nom d'utilisateur :
                    <input type="text" label="Nom d'utilisateur" onChange={(e) => {setUserName(e.target.value); console.log(userName)}}></input>
                </label>
                <label>
                    Email :
                    <input type="email" label="email" onChange={(e) => {setUserEmail(e.target.value)}}></input>
                </label>
                <label>
                    Mot de passe :
                    <input type="password" label="Mot de passe" onChange={(e) => {setUserPassword(e.target.value)}}></input>
                </label>
            </form>
            <button onClick ={(e) => registerUser(e)}> S'enregistrer</button>
        </div>
    )
};
export default Signup;