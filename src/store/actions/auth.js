import * as actionTypes from './actionTypes';
import  axios from '../../axios-prj';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    if(token){
        return {
            type: actionTypes.AUTH_SUCCESS,
            token: token,
            userId:userId
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
            type: actionTypes.AUTH_FAILED,
            error: error
        };
    }
    else{        
        return {
            type: actionTypes.AUTH_FAILED,
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
                        let expiresIn =response.data.expiresIn ?(response.data.expiresIn) :(new Date().getDate()+3600);
                        console.log('let expiresIn',expiresIn)
                        const expirationDate= new Date(expiresIn); 
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('expirationDate', expirationDate);
                        localStorage.setItem('userId', response.data.userId); 
                        
                        dispatch(authSuccess(response.data.token,response.data.userId));        
                        // dispatch(checkAuthTimeout(response.data.expiresIn ? response.data.expiresIn : new Date(new Date().getDate() + 3600)));
                        dispatch(checkAuthTimeout(expiresIn));
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch(authFail(error.message,false) );
                });
        }
}

export const logout = (userId, idToken)=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    console.log('logout')

    return{
        type: actionTypes.AUTH_LOGOUT,
        token: idToken,
        userId: userId
    }
};

export const checkAuthTimeout = (expiresInTime) => {
    console.log('expiresInTime=');
    console.log(expiresInTime);
    return dispatch=> {
        setTimeout(() => {
           dispatch(logout()); 
        }, expiresInTime*1000);
    }
};

export const authCheckState = () => {
    console.log('authCheckState=');
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            console.log('no token');
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date().getDate()){
                 dispatch(logout())
                console.log('expirationDate is expiared ');
            }
            else{
                const userId = localStorage.getItem('userId');
                //
                console.log('expirationDate is not expiared ');

                dispatch(authSuccess(token,userId));
                // dispatch(checkAuthTimeout(( Math.abs(expirationDate.getTime()- new Date().getTime())/1000)));
                dispatch(checkAuthTimeout(60*60));
            }
        }
    }

}