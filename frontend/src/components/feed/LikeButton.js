import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import likeLogo from '../../images/heart.svg';

const LikeButton = ({post}) => {
    const [liked, setliked] = useState(false);
    const uid = window.localStorage.getItem("uid");

    /*****GET LIKES********/
    const ipServ=process.env.REACT_APP_IP_SERVER;
    const [likes, setLikes] = useState([]);
    const getLikes = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/like/${post.id}`,
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res.data.likes.rows);
                setLikes(res.data.likes.rows)
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLikes(post)
    }, [post])
    
    /****SET LIKES*****/
    const checkLikes = () =>{
        for(let elem of likes) {
            console.log(elem.userId)
            if(elem.userId === parseInt(uid)) setliked(true);
        }
    }
    useEffect((likes) => {
        checkLikes(likes)
    }, [uid, liked])

    console.log(liked)
    
  return (
    <div className='like-container'>
        {uid && liked === false && (
        <img src={likeLogo} /* onClick={like}  */alt="like" />
      )}

    </div>
  )
}

export default LikeButton;