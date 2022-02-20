import axios from "axios";

//COMMENTS
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENTS = "DELETE_COMMENTS";



const ipServ = process.env.REACT_APP_IP_SERVER;

export const getComments = (postId) => {
    return (dispatch) => {
        return axios.get(ipServ + `/api/feed/post/comment/${postId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                const array = res.data.comments
                dispatch({ type: GET_COMMENTS, payload: array })
            })
            .catch((err) => console.log(err));
    };
};

export const deleteComment = (id) => {

    return (dispatch) => {
        return axios.delete(ipServ + `/api/feed/post/comment/${id}`, {
            data: {
                id: id
            },

            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENTS, payload: { id } })
            })
            .catch((err) => console.log(err));
    };
};
