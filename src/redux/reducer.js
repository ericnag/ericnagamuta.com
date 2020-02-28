import { SET_POSTS } from './actions';

function postsReducer(state = {}, action) {
    switch (action.type) {
        case SET_POSTS:
            state = JSON.parse(JSON.stringify(action.payload));
            return state;
        default:
            return state
    }
}

export { postsReducer };