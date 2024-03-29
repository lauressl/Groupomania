import axios from 'axios';
import React, { useEffect, useState } from 'react';
import likeLogo from '../../images/heart.svg';
import likeLogoFilled from '../../images/heart-filled.svg'

const LikeButton = ({ post }) => {
    const [liked, setliked] = useState(false);
    const uid = window.localStorage.getItem("uid");

    /*****GET LIKES********/
    const ipServ = process.env.REACT_APP_IP_SERVER;
    const [likes, setLikes] = useState([]);
    const [countLike, setcountLike] = useState(0);
    const getLikes = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/like/${post.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setLikes(res.data.likes.rows);
                    setcountLike(res.data.likes.count);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLikes(post)
    }, [post, liked])

    /*****LIKE******/
    const likePost = async () => {
        let postId = post.id
        try {
            await axios.post(ipServ + `/api/feed/post/like`,
                {
                    postId: postId
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setliked(true);
                });
        } catch (error) {
            console.log(error);
        }
    };

    /*****UNLIKE******/
    const unlikePost = async () => {
        let postId = post.id
        try {
            await axios.delete(ipServ + `/api/feed/post/unlike/${postId}`,
                {
                    data: {
                        postId: postId
                    },

                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setliked(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    /****SET LIKES*****/
    const checkLikes = (likes) => {
        for (let elem of likes) {
            if (elem.userId === parseInt(uid)) setliked(true);
            else setliked(false);
        }
    }

    useEffect(() => {
        checkLikes(likes)
    }, [uid, countLike, post])

    return (
        <div className='like-container'>
            {uid && liked === false && (
                <>
                    <img src={likeLogo} onClick={likePost} alt="unliked" />
                    <span>{countLike}</span>
                </>
            )}
            {uid && liked && (
                <>
                    <img src={likeLogoFilled} onClick={unlikePost} alt="liked" />
                    <span>{countLike}</span>
                </>
            )}

        </div>
    )
}

export default LikeButton;