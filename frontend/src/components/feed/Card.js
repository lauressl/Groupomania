import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/_card.scss'
import { dateParser, isEmpty } from '../utils';

const Card = ({post}) => {
    const [isLoading, setisLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();


    useEffect(() => {
      !isEmpty(usersData[0]) && setisLoading(false);
    }, [usersData])
    

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
                        <img src='../images/message1.svg' alt="comment-pic"/>
                        <span>{}</span>
                    </div>
                </div>
            </>
        )}
    </li>
  );
};

export default Card;