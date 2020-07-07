import { REGISTRATION_SUCCESSFUL, REGISTRATION_FAILED, 
    GET_USER, LOGIN_SUCCESSFUL, LOGIN_FAILED, SIGN_OFF } from '../../types';

export default (state, action) => {
    switch(action.type){
        case REGISTRATION_SUCCESSFUL:
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return{
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        case SIGN_OFF:
        case LOGIN_FAILED:
        case REGISTRATION_FAILED:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }

        default:
            return state;
    }
}