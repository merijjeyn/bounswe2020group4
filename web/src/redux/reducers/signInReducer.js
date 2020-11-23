import { SET_LOGIN_STATE } from '../actions/types';

const INITIAL_STATE = {
    isLoggedIn: false,
    userId: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_LOGIN_STATE:
            console.log(action.payload)
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            }
        default:
            return state;
    }
}