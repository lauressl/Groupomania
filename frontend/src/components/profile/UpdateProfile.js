import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../images/logo-user.png'
import UploadImg from './UploadImg';

import '../../styles/profile.scss';
import { dateParser } from '../utils';


const UpdateProfile = () => {
    //Dispatch user infos
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='profile-container'>
            <h1>{userData.username}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    {(userData.attachement)
                        ? <img src={userData.attachement} alt="user-pic" />
                        : <img src={logo} alt="user-pic" />
                    }
                    <UploadImg
                        email={userData.email}
                        username={userData.username}
                    />
                </div>
                <div className='right-part'>
                    <h3>Infos du profil</h3>
                    <div className='email-update'>
                        <p>email: {userData.email}</p>
                    </div>
                    <h3>Membre depuis le :</h3>
                    {dateParser(userData.createdAt)}
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;