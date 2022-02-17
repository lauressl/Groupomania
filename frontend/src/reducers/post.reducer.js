import { DELETE_POSTS, GET_POSTS, UPDATE_POSTS } from "../action/post.actions";

const initialState =  {};

export default function postReducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case UPDATE_POSTS:
            return state.map((post) => {
                if(post.id === action.payload.postId){
                    return {
                        ...post,
                        content: action.payload.content
                    }
                } else return post;
            });
        case DELETE_POSTS:
            return state.filter((post) => post.id !== action.payload.postId);
        default:
            return state;
    }
}