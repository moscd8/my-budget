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
    return {
        ...state,
        loading: false,
        error: null,
        token: action.token
    }
};

const signupFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
};
  

const reducer = (state= initialState,action) => {
    switch (action.type) {
        
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);     
        case actionTypes.SIGNUP_FAILED:
            return signupFailed(state,action);      
            
        default: return state;

    }
}

export default reducer;