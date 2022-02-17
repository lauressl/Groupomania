import { GET_POSTS, UPDATE_POSTS } from "../action/post.actions";

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
            })
        default:
            return state;
    }
}