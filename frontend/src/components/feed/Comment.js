import axios from 'axios';

import { useState, useEffect, Fragment } from 'react';
import '../../styles/home.scss';
import moment from 'moment';

const Comment = ({postId}) => {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    //******GET COMMENTS*********/
    const [getComment, setGetComment]= useState([]);
    console.log(getComment)

    useEffect(() => {
        getComments()
    }, [postId])

    const getComments = async () => {
        try {
            await axios.get(ipServ + `/api/feed/post/comment/${postId}`,{
                postId :postId
            },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                setGetComment(res.data)
            });
        } catch (error) {
            console.log(error);
        }
    };

    //*****PUBLISH COMMENT*********/
    const [content, setContent] = useState('')

    const publishComment = async () => {
        try {
            await axios.post(ipServ + '/api/feed/post/comment',{
                postId : postId,
                content : content
            },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res);
                setContent(res.data)
            });
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className='feed-comment'>
            <h2>Commentaires :</h2>
            <div className='feed-comment-publish'>
                <form >
                    <label className='feed-comment-publish-content'>
                        <textarea label="content" onChange={(e) => {setContent(e.target.value)}}></textarea>
                    </label>  
                </form> 
                <button className='feed-comment-publish-btn' onClick={(e) => {publishComment(e)}}>Publier</button>
            </div>
            {getComment.map((comments, index) => (
                <Fragment key={"comment" + index}>
                    <div className='feed-comment-get'>
                        <div className='feed-comment-get-head'>
                            <p className='feed-comment-get-head-id'>{comments.id}</p>
                            <p className='feed-comment-get-head-time'>{moment(comments.createdAt).startOf('day').fromNow()}</p>
                        </div>
                        <div className='feed-comment-get-content'>
                            <p>{comments.content}</p>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
};
export default Comment;