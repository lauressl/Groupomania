import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import '../styles/profile.scss'
import logo from '../images/logo-user.png';

function Profile () {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    //Init states
    const [data, setData] = useState([]);

    //useEffects
    useEffect(() => {
        getProfile()
    }, [])

    //Post request
    const getProfile = async () => {
        try {
            await axios.get(ipServ + '/api/profile/me',{
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                setData(res.data)
            });
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <div className='profile'>
            <h1 className='profile-title'>Profil</h1>
                <div className='profile-container'>
                    <img src={logo} className="profile-logo" alt="logo" />
                    <h2 className='profile-subtitle'>Nom d'utilisateur :</h2>
                    <p>{data.username}</p>
                    <h2 className='profile-subtitle'>Email:</h2>
                    <p>{data.email}</p>
                    <button className='profile-btn-disconnect' onClick={(e) => {window.localStorage.clear(e); window.location.replace("/home");}}>Deconnexion</button>
                </div>
        </div> 
    )
}

export default Profile;
