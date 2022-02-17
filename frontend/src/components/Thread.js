import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../action/post.actions';
import Card from './feed/Card';
import { isEmpty } from './utils';

const Thread = () => {

    const [loadPost, setloadPost] = useState(true);
    const [count, setcount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setloadPost(true);
            setcount(count + 5);
        }
    };

    useEffect(() => {
      if (loadPost) {
        dispatch(getPosts(count));
        setloadPost(false)
      }

      window.addEventListener('scroll', loadMore);
      return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count])
    
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