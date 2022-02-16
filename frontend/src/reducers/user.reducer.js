import { GET_USER, UPLOAD_PICTURE } from "../action/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload;
        
        case UPLOAD_PICTURE:
            return {
                ...state,
                attachement: action.payload,
            };

        default:
        return state;
    }
}