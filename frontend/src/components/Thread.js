import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../action/post.actions';
import Card from './feed/Card';
import { isEmpty } from './utils';

const Thread = () => {

    const [loadPost, setloadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
      if (loadPost) {
        dispatch(getPosts());
        setloadPost(false)
      }
    }, [loadPost, dispatch])
    
  return (
    <div className='thread-container'>
        <ul>
            {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Card post={post} key={post.id}/>;
                })
            }
        </ul>
    </div>
  );
};

export default Thread;