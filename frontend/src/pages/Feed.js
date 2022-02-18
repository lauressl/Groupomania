import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';

import PostFeed from '../components/feed/PostFeed';
import PublishPost from '../components/feed/PublishPost';

function Feed () {
    //token
    const getToken = window.localStorage.getItem("token")

    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    /******PUBLISH POST*******/
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachement, setAttachement] = useState('');



    const publishPost = async () => {
        try {
            await axios.post(ipServ + '/api/feed/post/publish',{
                title : title,
                content : content,
                attachement : attachement
            },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                console.log(res);
                getPosts();
            });
        } catch (error) {
            console.log(error);
        }
    };


    /******GET FEED***********/
    const [data, setData] = useState([]);
    console.log(data)

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        try {
            await axios.get(ipServ + '/api/feed/post/all',{
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then ((res) => {
                setData(res.data.posts)
            });
        } catch (error) {
            console.log(error);
        }
    };

    

    /******RENDER***********/
    return(
        <div className='feed'>
            {getToken &&
                <div className='feed-publish'>
                    <h2>Publier un post :</h2>
                    <form >
                        <label className='feed-publish-title'>
                            <input type="text" label="title" onChange={(e) => {setTitle(e.target.value); console.log(title)}}></input>
                        </label>
                        <label className='feed-publish-content'>
                            <textarea label="content" onChange={(e) => {setContent(e.target.value)}}></textarea>
                        </label>  
                    </form> 
                    <button className='feed-publish-btn' onClick={(e) => {publishPost(e)}}>Publier</button>
                </div>
            }
            <PostFeed 
                updateFeed ={data}
            />
        </div>
    )
}
export default Feed;