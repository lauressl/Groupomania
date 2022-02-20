import axios from "axios";

export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

const ipServ = process.env.REACT_APP_IP_SERVER;

export const getUser = () => {
    return (dispatch) => {
        return axios.get(ipServ + '/api/profile/me', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data) => {
    return (dispatch) => {
        return axios
            .put(ipServ + '/api/profile/me', data, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                return axios
                    .get(ipServ + '/api/profile/me', data, {
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.attachement });
                    });
            })
            .catch((err) => console.log(err))
    };
};
export const deletedUser = (userId) => {
    return dispatch => {
        return axios.delete(ipServ + `/api/profile/me/${userId}`,
            {
                data: {
                    id: userId
                },

                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                dispatch({ type: DELETE_USER, payload: { userId } })
            })
            .catch((err) => console.log(err));
    }
};
