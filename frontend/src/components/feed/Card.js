import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../utils';
import commentLogo from '../../images/message1.svg';
import editLogo from '../../images/edit.svg';
import logoPicture from "../../images/picture.svg";
import axios from 'axios';
import LikeButton from './LikeButton';
import { updatePost, getPosts } from '../../action/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({ post }) => {
    const [isLoading, setisLoading] = useState(true);
    const [isUpdated, setisUpdated] = useState(false);
    const [textUpdate, settextUpdate] = useState(null);
    const [postPicture, setpostPicture] = useState(null);
    const [showComments, setshowComments] = useState(false);
    const [text, settext] = useState("")

    const dispatch = useDispatch();

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setisUpdated(false);
    }
    /* const updateItem = async () => {
        if (textUpdate || postPicture) {
            const data = new FormData();
            data.append('content', textUpdate);
            if (file) data.append("file", file);
            data.append('attachement', postPicture);
            data.append('postId', post.id)

            await dispatch(updatePost(post.id, data));
            dispatch(getPosts());
            setisUpdated(false);
        }
    }; */
    const handlePicture = (e) => {
        console.log("e.target.files[0]", e.target.files[0])
        setpostPicture(e.target.files[0]);
    };
    useEffect(() => {
        !isEmpty(usersData[0]) && setisLoading(false);
    }, [usersData])

    /****COUNTCOMMENTS****/
    const ipServ = process.env.REACT_APP_IP_SERVER;

    const [commentCount, setcommentCount] = useState('');

    const getComments = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/comment/${post.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setcommentCount(res.data.comments.count);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getComments(post)
    }, [post, text, showComments])

    //******POST COMMENT****/

    const handleComment = async (e) => {
        e.preventDefault();

        if (text) {
            try {
                await axios.post(ipServ + '/api/feed/post/comment', {
                    postId: post.id,
                    content: text
                },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("token")}`
                        }
                    })
                    .then((res) => {
                        settext('')
                        dispatch(getPosts(5))
                    });

            } catch (error) {
                console.log(error);
            }
        };
    };

    return (
        <div className='card-container' key={post.id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className='card-header'>
                        <div className="user">
                            <div className='user-picture'>
                                <img
                                    src={
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user.id === post.userId) return user.attachement;
                                            }).join('')
                                    }
                                    alt="userpost-pic" />
                            </div>
                            <div className='user-name'>
                                <p>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user.id === post.userId) return user.username;
                                            })
                                    }
                                </p>
                            </div>
                        </div>
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                    <div className='card-content'>
                        {isUpdated === false && <p>{post.content}</p>}
                        {isUpdated && (
                            <div className='update-post'>
                                <textarea
                                    defaultValue={post.content}
                                    onChange={(e) => settextUpdate(e.target.value)}
                                />
                                <div>
                                    <div className="icon">
                                        <img src={logoPicture} alt="img" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept="jpg jpeg png"
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </div>
                                    <button onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.attachement &&
                            <div className='pic-container'>
                                <img src={post.attachement} alt="card-pic" className='card-pic' />
                            </div>
                        }

                        {(userData.id === post.userId || userData.isAdmin === true) &&
                            <div className='btn-container'>
                                <div onClick={() => setisUpdated(!isUpdated)}>
                                    <img src={editLogo} alt='edit-logo' />
                                </div>
                                <DeleteCard
                                    id={post.id}
                                />
                            </div>
                        }
                    </div>
                    <div className='card-footer'>
                        <div className='comment-icon'>
                            <img
                                src={commentLogo}
                                onClick={() => setshowComments(!showComments)}
                                alt="comment-pic"
                            />
                            <span>{commentCount}</span>
                        </div>
                        <LikeButton
                            post={post}
                            userId={userData.id}
                        />
                    </div>
                    {showComments &&
                        <>
                            <div className="comments-container">
                                {showComments && <CardComments
                                    post={post}
                                />}

                                {userData.id && (
                                    <form className='comment-form' onSubmit={handleComment} action="">
                                        <input
                                            type="text"
                                            name="text"
                                            onChange={(e) => settext(e.target.value)}
                                            value={text}
                                            placeholder='laisser un commentaire'
                                        />
                                        <br />
                                        <input type="submit" value="Envoyer" />
                                    </form>
                                )}
                            </div>
                        </>
                    }
                </>
            )}
        </div>
    );
};

export default Card;