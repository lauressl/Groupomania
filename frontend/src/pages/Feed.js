import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';

import PostFeed from '../components/feed/PostFeed';
import '../styles/feed.scss'

function Feed () {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    /******PUBLISH POST*******/
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachement, setAttachement] = useState('');

    const publishPost = async () => {
        try {
            await axios.post(ipServ + '/api/feed/post/publish',{
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                },
                params:{
                    title:title,
                    content:content,
                    attachement:attachement
                }
            })
            .then ((res) => {
                console.log(res)
            });
        } catch (error) {
            console.log(error);
        }
    };

    /******GET FEED***********/
    const [data, setData] = useState([]);

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
            <form className='feed-publish'>
                <label className='feed-publish-title'>
                    <input type="text" label="title" onChange={(e) => {setTitle(e.target.value); console.log(title)}}></input>
                </label>
                <label className='feed-publish-content'>
                    <input type="textarea" label="content" onChange={(e) => {setContent(e.target.value)}}></input>
                </label>
                <button className='feed-publish-btn' onClick={(e) => {publishPost(e)}}>Publier</button>
            </form>
            <PostFeed 
                updateFeed ={data}
            />
        </div>
    )
}
export default Feed;