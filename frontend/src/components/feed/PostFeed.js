import { useState, useEffect, Fragment } from 'react';
import '../../styles/feed.scss';
import moment from 'moment';

import Comment from './Comment';

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
                            <p className='feed-post-head-time'>{moment(posts.createdAt).startOf('day').fromNow()}</p>
                        </div>
                        <div className='feed-post-content'>
                            <h2>{posts.title}</h2>
                            {(posts.content) &&
                                <p>{posts.content}</p>
                            }
                            {(posts.attachement) &&
                                <img src={posts.attachement} className="feed-post-attachement" alt="post attachement" />
                            }
                            
                        </div>
                        <Comment 
                            postId = {posts.id}
                        />
                    </div>
                    
                </Fragment>
            ))}
        </div>
    )
};
export default PostFeed;