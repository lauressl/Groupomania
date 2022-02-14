import { useState, useEffect, Fragment } from 'react';
import '../../styles/home.scss';
import moment from 'moment';

const PostFeed = ({updateFeed}) => {
    const [getFeed, setGetFeed]= useState([]);
    console.log(getFeed)

    useEffect(() => {
        setGetFeed(updateFeed)
    }, [updateFeed])

    return(
        <div className='feed-container'>
            {getFeed.map((posts, index) => (
                <Fragment key={"post" + index}>
                    <div className='feed-post'>
                        <div className='feed-post-head'>
                            <p className='feed-post-head-user'>{posts.username}</p>
                            <h2>{posts.title}</h2>
                            <p>{moment(posts.createdAt).startOf('day').fromNow()}</p>
                        </div>
                        <div className='feed-post-content'>
                            {(posts.content) &&
                                <p>{posts.content}</p>
                            }
                            {(posts.attachement) &&
                                <img src={posts.attachement} className="feed-post-attachement" alt="post attachement" />
                            }
                            
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
};
export default PostFeed;