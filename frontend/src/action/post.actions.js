import axios from "axios";

//POSTS
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POSTS = "UPDATE_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";


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

export const updatePost = (postId, content) => {
    return dispatch => {
        return axios.put(ipServ + `/api/feed/post/${postId}`,{
                
                content : content,
                postId: postId
            },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
        .then ((res) => {
            dispatch({ type: UPDATE_POSTS, payload: { content, postId}})
        })
        .catch((err) => console.log(err));
    }
};

export const deletePost = (postId, userId) => {
    return dispatch => {
        return axios.delete(ipServ + `/api/feed/post/${postId}`,
            {postId : postId, userId: userId },
            {
                headers:{
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
        .then ((res) => {
            dispatch({ type: DELETE_POSTS, payload: {postId, userId}})
        })
        .catch((err) => console.log(err));
    }
};


