import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../utils';
import commentLogo from '../../images/message1.svg';
import editLogo from '../../images/edit.svg';
import axios from 'axios';
import LikeButton from './LikeButton';
import { updatePost } from '../../action/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({ post }) => {
    const [isLoading, setisLoading] = useState(true);
    const [isUpdated, setisUpdated] = useState(false);
    const [textUpdate, settextUpdate] = useState(null);
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

    useEffect(() => {
        !isEmpty(usersData[0]) && setisLoading(false);
    }, [usersData])

    /****COUNTCOMMENTS****/
    const ipServ = process.env.REACT_APP_IP_SERVER;

    const [postComment, setpostComment] = useState('');

    const getComments = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/comment/${post.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    console.log(res.data.comments);
                    setpostComment(res.data.comments);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getComments(post)
    }, [post, text])

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
                        console.log(res);
                        settext(res.data[0])
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
                            <span>{postComment.count}</span>
                        </div>
                        <LikeButton
                            post={post}
                            userId={userData.id}
                        />
                    </div>
                    {showComments &&
                        <>
                            <div className="comments-container">
                                <CardComments
                                    post={post}
                                    postComment={postComment.rows}
                                />
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