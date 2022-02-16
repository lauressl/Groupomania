import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../action/user.actions';

const UploadImg = () => {
    const [file, setfile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('userId', userData.id);
        data.append('file', file);

        dispatch(uploadPicture(data, userData.id));
    }

  return (
    <form action="" onSubmit={handlePicture} className='upload-pic'>
        <label htmlFor="file">Changer d'image</label>
        <input 
            type="file" 
            id="file" 
            accept='.jpg, .jpeg, .png' 
            onChange={(e) => setfile (e.target.files[0])}
        />
        <br/>
        <input 
            type="submit"
            value="Envoyer"
        />
    </form>
  );
};

export default UploadImg;