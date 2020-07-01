import React  , {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Auth.module.css';

const Auth =  (props) => {

    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');  
    const [isSignup,setIsSignup]=useState(false);

    // useEffect( ()  => {
    //     props.onFetchExpenses(props.token,props.userId);
    // },[]);

    const showBackdropFunc = ()=> {
        if(props.auth)
            return (props.auth.loading);

        return false;
    }

    const SignIn= (event) => {
        event.preventDefault ();
        const user = {
            email: email,
            password: password            
        }
        if(isSignup){
            props.onSignup(user);
        }else{
            props.onLogin(user);
        }
    }

    let loadingSpinner = null;
    if(props.auth)
        if(props.auth.loading){
            loadingSpinner= (<p> Loading ...<Spinner /> </p>); 
            console.log('loading')       
        }else{
            console.log('dont loading');
        }

     let errorMsgRender= null;
     
     if(props.auth)
        if(props.auth.error){
            console.log('error: ')
            errorMsgRender= (<p>props.auth.error</p>);
    };
  
    return (
            <div className={classes.AuthMain}>
                
            <div >
                <p> {isSignup ? 'SIGNUP' : 'LOGIN'} </p>
                <label className={classes.Switch}>
                    <input  className={!isSignup ?  classes.Login : classes.Register} type="checkbox" value={isSignup ?  'Regiter' : 'Login'} onClick={() => setIsSignup(!isSignup)}/>       
                    <span className={classes.Sliderround}></span>
                </label>
                {errorMsgRender  ? ( <p> {errorMsgRender}</p>) : null}
            </div>

            {/* {authredirect} */}
            
             <form onSubmit={SignIn} className={classes.Form}>
            <label className={classes.Label}>
                Name:
            <input className={classes.Input} type="text" name="email" value={email} onChange={event => Setemail(event.target.value)}/>
            </label>
            
            <label className={classes.Label}>
                Password:
            <input  className={classes.Input} type="text" name="password" value={password}  onChange={event => Setpassword(event.target.value)}/>
            </label>
            
            <input  className={classes.Submit} type="submit" value="Submit" />

            
            <Backdrop show={showBackdropFunc() } >
            {loadingSpinner}
            </Backdrop>  
            {loadingSpinner}
        </form>
        </div>
        
    )    
}
const mapStateToProps = state => {
    return { 
      auth: state.auth,
      isAuthenticated: state.auth.token!=null,
    //   loading: state.auth.loading,
      error: state.auth.error
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
        onSignup : (userToLogin) => dispatch(actions.signup(userToLogin)),
        onLogin : (userToLogin) => dispatch(actions.login(userToLogin))
       };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Auth);;