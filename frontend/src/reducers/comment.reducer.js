import { GET_COMMENTS, DELETE_COMMENTS } from "../action/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case DELETE_COMMENTS:
            return state.filter((comment) => comment.id !== action.payload.id);
        default:
            return state;
    }
}