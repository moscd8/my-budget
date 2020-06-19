import React  , {useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import classes from './Auth.module.css';

const Auth =  (props) => {

    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');  
    const [isSignup,setIsSignup]=useState(false);

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
            loadingSpinner= <Spinner /> 
            console.log('loading')       
    }
     let errorMsgRender= null;
     console.log('error: ')
//    console.log(props.auth.error)   
    if(props.auth)
        if(props.auth.error){
         errorMsgRender=props.auth.error;
    };

    let authredirect= null;
    if(props.isAuthenticated){
        console.log("isAuthenticated")
        authredirect= <Redirect to='/expense'/>
    }

    return (
            <div className={classes.AuthMain}>
            <div >
                <p> {isSignup ? 'SIGNUP' : 'LOGIN'} </p>
                <label className={classes.Switch}>
                    <input  className={!isSignup ?  classes.Login : classes.Register} type="checkbox" value={isSignup ?  'Regiter' : 'Login'} onClick={() => setIsSignup(!isSignup)}/>       
                    <span className={classes.Sliderround}></span>
                </label>
            </div>

            {authredirect}
            {errorMsgRender  ? ( <p> {errorMsgRender}</p>) : null}
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

            
            {/* <Backdrop show={showBackdropFunc() } >
            {loadingSpinner}
            </Backdrop>   */}
            {loadingSpinner}
        </form>
        </div>
        
    )    
}
const mapStateToProps = state => {
    return { 
      isAuthenticated: state.auth.token!=null,
      loading: state.auth.loading,
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