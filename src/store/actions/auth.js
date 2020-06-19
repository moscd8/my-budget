import * as actionTypes from './actionTypes';
import  axios from '../../axios-prj';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    if(token){
        return {
            type: actionTypes.AUTH_SUCCESS,
            token: token,
        };
    }
    else{
        return {
            type: actionTypes.AUTH_SUCCESS
        };
    }
};

export const authFail = (error, isSignUp) => {
    if(isSignUp){
        return {
            type: actionTypes.SIGNUP_FAILED,
            error: error
        };
    }
    else{        
        return {
            type: actionTypes.LOGIN_FAILED,
            error: error
        };    
    }
};


export const signup = (userToLogin) => {
    return dispatch => {
        console.log('signup');
        let tempUser= {'email': userToLogin.email, 'password': userToLogin.password};
        console.log(tempUser);
        
        dispatch(authStart());
        axios.post('/user/signup', userToLogin)
             .then( response => {
                   console.log(response);
                    if(response.status===200)
                    {
                        dispatch(authSuccess(null));
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch(authFail(error.response.data.message,true) );
                });
        }
}


export const login = (userToLogin) => {
    return dispatch => {
        console.log('login');
        let tempUser= {'email': userToLogin.email, 'password': userToLogin.password};
        console.log(tempUser);
        
        dispatch(authStart());
        axios.post('/user/login', userToLogin)
             .then( response => {
                   console.log(response);
                    if(response.status===200)
                    {
                        let token= response.data.token;
                        dispatch(authSuccess(token));                           
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch(authFail(error.response.data.message,false) );
                });
        }
}
