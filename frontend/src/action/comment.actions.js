import axios from "axios";

//COMMENTS
export const GET_COMMENTS = "GET_COMMENTS";


const ipServ=process.env.REACT_APP_IP_SERVER;

export const getComments = (postId) => { 
    return (dispatch) => {
        return axios.get(ipServ + `/api/feed/post/comment/${postId}`,{
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

