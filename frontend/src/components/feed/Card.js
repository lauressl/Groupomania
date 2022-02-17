import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/card.scss'
import { dateParser, isEmpty } from '../utils';
import commentLogo from '../../images/message1.svg';
import axios from 'axios';
import LikeButton from './LikeButton';

const Card = ({post}) => {
    const [isLoading, setisLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);


    useEffect(() => {
      !isEmpty(usersData[0]) && setisLoading(false);
    }, [usersData])

    /****COUNTCOMMENTS****/
    const ipServ=process.env.REACT_APP_IP_SERVER;

    const [numComment, setnumComment] = useState('');

    const getComments = async (post) => {
        try {
            await axios.get(ipServ + `/api/feed/post/comment/${post.id}`,
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res.data.comments);
                setnumComment(res.data.comments)
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getComments(post)
    }, [post])
    
    

  return (
    <li className='card-container' key={post.id}>
        {isLoading ? (
            <i className='fas fa-spinner fa-spin'></i>
        ): (
            <>
                <div className='card-left'>
                    <img 
                        src={
                            !isEmpty(usersData[0]) &&
                                usersData
                                .map((user) => {
                                    if(user.id === post.userId) return user.attachement;
                                }).join('')
                        } 
                        alt="userpost-pic"/>
                </div>
                <div className='card-right'>
                    <div className='card-header'>
                        <div className='username'>
                            <p>
                            {
                                !isEmpty(usersData[0]) &&
                                    usersData
                                    .map((user) => {
                                        if(user.id === post.userId) return user.username;
                                    })
                            }   
                            </p>
                        </div>
                        <span>{dateParser(post.createdAt)}</span>   
                    </div>
                    <p>{post.content}</p>
                        {post.attachement &&
                            <img src={post.attachement} alt="card-pic" className='card-pic'/>
                        }
                </div>
                <div className='card-footer'>
                    <div className='comment-icon'>
                        <img src={commentLogo} alt="comment-pic"/>
                        <span>{numComment.count}</span>
                    </div>
                    <LikeButton
                        post={post}
                    />
                </div>
            </>
        )}
    </li>
  );
};

export default Card;