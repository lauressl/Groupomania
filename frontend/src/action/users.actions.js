import axios from "axios";

//USERS
export const GET_USERS = "GET_USERS";

const ipServ=process.env.REACT_APP_IP_SERVER;

export const getUsers = () => {
    return (dispatch) => {
        return axios.get(ipServ + '/api/profile/all',{
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then ((res) => {
            dispatch({ type: GET_USERS, payload: res.data.users})
        })
        .catch((err) => console.log(err));
    };
};