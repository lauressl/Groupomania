import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../action/user.actions';

const UploadImg = ({ email, username }) => {
    const [file, setfile] = useState('');
    const [userPic, setuserPic] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = () => {

        const data = new FormData();
        data.append('email', email);
        data.append('username', username);
        data.append('file', file);
        data.append('attachement', userPic)

        dispatch(uploadPicture(data));
    }

    return (
        <form action="" onSubmit={handlePicture} className='upload-pic'>
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                id="file"
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setuserPic(e.target.files[0])}
            />
            <br />
            <input
                type="submit"
                value="Envoyer"
            />
        </form>
    );
};

export default UploadImg;