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
                    <img src={userData.attachement} alt="user-pic" />
                    <UploadImg
                        email={userData.email}
                        username={userData.username}
                    />
                </div>
                <div className='right-part'>
                    <h3>Infos du profil</h3>
                    <div className='email-update'>
                        <p><b>Email:</b> {userData.email}</p>
                        <p><b>Membre depuis le :</b> {dateParser(userData.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;