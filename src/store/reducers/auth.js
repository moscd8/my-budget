import * as actionTypes from '../actions/actionTypes';
 import  axios from '../../axios-prj';
//import  axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const initialState= {
    loading: false
};

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
};

const authSuccess = (state, action) => {
    if(action.token){
        return {
            ...state,
            loading: false,
            error: null,
            token: action.token,
            userId: action.userId
        }
    }else{ 
        return {
            ...state,
            loading: false,
            error: null,
            token: null,
            userId: null
        }
    }
};

// const signupFailed = (state, action) => {
//     return {
//         ...state,
//         loading: false,
//         error: action.error
//     }
// };

const authFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
};
  
const logoff = (state, action) => {
    return {
        ...state,
        loading: false,
        token: null
    }
};
  

const reducer = (state= initialState,action) => {
    switch (action.type) {
        
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);     
        // case actionTypes.SIGNUP_FAILED:
        //     return signupFailed(state,action);  
        case actionTypes.AUTH_FAILED:
            return authFailed(state,action);                  
        case actionTypes.AUTH_LOGOUT:
            return logoff(state,action);      
    
               
        default: return state;

    }
}

export default reducer;