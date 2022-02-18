import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../utils';
import deleteLogo from '../../images/trash.svg';


const CardComments = ({post, postComment}) => {
    console.log(postComment)
    const ipServ=process.env.REACT_APP_IP_SERVER;

    const dispatch = useDispatch();

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isDeleted, setisDeleted] = useState(false)
    //*****DELETE COMMENT*****/
    const deleteComment = async () => {
        let postId = post.id
        try {
            await axios.delete(ipServ + `/api/feed/post/comment/${postId}`,
            { 
                data: {
                    postId : postId
                },
            
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res.data);
                setisDeleted(true);
            });
        } catch (error) {
            console.log(error);
        }
    };
    

  return (
    <div className="comments-container">
        {postComment.map((comment) => {
            return(
            <div className={isDeleted ? "comment-container deleted" : "comment-container"} key={comment.id}>
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
                    <div className='comment-header'>
                        <div className='pseudo'>
                            <p>{!isEmpty(usersData[0]) &&
                                usersData
                                .map((user) => {
                                    if(user.id === comment.userId) return user.username;
                                }).join('')}
                            </p>

                        </div>
                        <span>{timestampParser(comment.createdAt)}</span>       
                    </div>
                    <p>{comment.content}</p>
                </div>
                {(userData.id === comment.userId || userData.isAdmin === true) &&
                    <div className='btn-container'>
                        <div onClick={(e) => {
                            if(window.confirm("Voulez-vous supprimer cet article ?")){
                                e.preventDefault(); 
                                deleteComment(e);
                            }
                            }}
                        >
                            <img src={deleteLogo} alt="delete-icon"/>
                        </div>
                    </div>
                }
            </div>
            )
        })
        }
    </div>
  );
};

export default CardComments;