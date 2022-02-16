
import { useState, useEffect, Fragment } from 'react';
import '../styles/profile.scss';
import { useSelector } from 'react-redux';
import UpdateProfile from '../components/profile/UpdateProfile';

function Profile () {
    
    //Dispatch user infos
    const userData = useSelector((state) => state.userReducer);

    return(
        <div className='profile'>
            <UpdateProfile/>
            {/* <h1 className='profile-title'>Profil</h1>
                <div className='profile-container'>
                    <img src={logo} className="profile-logo" alt="logo" />
                    <div className='profile-subtitle'>
                        <h2>Nom d'utilisateur :</h2>
                        <p>{userData.username}</p>
                    </div>
                    <div className='profile-subtitle'>
                        <h2>Email:</h2>
                        <p>{userData.email}</p>
                    </div>
                    <button className='profile-btn-disconnect' onClick={(e) => {window.localStorage.clear(e); window.location.replace("/home");}}>Deconnexion</button>
                </div> */}
        </div> 
    )
}

export default Profile;
