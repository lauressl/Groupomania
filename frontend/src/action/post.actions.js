import axios from "axios";

//POSTS
export const GET_POSTS = "GET_POSTS";
export const GET_COMMENTS = "GET_COMMENTS";


const ipServ=process.env.REACT_APP_IP_SERVER;

export const getPosts = (num) => { 
    return (dispatch) => {
        return axios.get(ipServ + '/api/feed/post/all',{
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then ((res) => {
            const array = res.data.posts.slice(0, num)
            dispatch({ type: GET_POSTS, payload: array})
        })
        .catch((err) => console.log(err));
    };
};

export const getComments = () => { 
    return (dispatch) => {
        return axios.get(ipServ + '/api/feed/post/comment',{
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then ((res) => {
            dispatch({ type: GET_COMMENTS, payload: res.data.comments})
        })
        .catch((err) => console.log(err));
    };
};
