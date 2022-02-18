import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils';

const CardComments = ({post, postComment}) => {
    console.log(postComment)
    const [text, settext] = useState("")
    const dispatch = useDispatch();

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const handleComment = () => {};

  return (
    <div className='comment-container'>
        {postComment.map((comment) => {
            return(
            <div className={comment.userId === userData.id ? "comment-container-client" : "comment-container"} key={comment.id}>
                <div className='left-part'>
                    <img 
                        src={
                            !isEmpty(usersData[0]) &&
                                usersData
                                .map((user) => {
                                    if(user.id === comment.userId) return user.attachement;
                                }).join('')
                        } 
                        alt="userpost-pic"/>
                </div>
                <div className='right-part'>
                    <p>{comment.content}</p>
                </div>
            </div>
            )
        })
        }
    </div>
  );
};

export default CardComments;