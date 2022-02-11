import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import '../../styles/home.scss';

const Post = () => {
    //Connect server
    const ipServ=process.env.REACT_APP_IP_SERVER;

    //Init states
    const [data, setData] = useState([]);

    //useEffects
    useEffect(() => {
        getPosts()
    }, [])

    //Post request
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

    return(
        <div className='feed-container'>
            {data.map((posts, index) => (
                <Fragment key={"post" + index}>
                    <div className='feed-post'>
                        <h3>{posts.title}</h3>
                        <p>{posts.content}</p>
                    </div>
                </Fragment>
            ))}
        </div>
    )
};
export default Post;