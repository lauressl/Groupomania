import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import '../../styles/home.scss';
import moment from 'moment';

const PublishPost = () => {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    /******PUBLISH POST*******/
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachement, setAttachement] = useState('');



    const publishPost = async () => {
        try {
            await axios.post(ipServ + '/api/feed/post/publish',{
                title : title,
                content : content,
                attachement : attachement
            },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res)
            });
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className='feed-publish'>
            <form >
                <label className='feed-publish-title'>
                    <input type="text" label="title" placeholder="Titre de la publication" onChange={(e) => {setTitle(e.target.value); console.log(title)}}></input>
                </label>
                <label className='feed-publish-content'>
                    <textarea label="content" placeholder="Contenu de la publication" onChange={(e) => {setContent(e.target.value)}}></textarea>
                </label>  
            </form> 
            <button className='feed-publish-btn' onClick={(e) => {publishPost(e)}}>Publier</button>
        </div>
    )
};
export default PublishPost;