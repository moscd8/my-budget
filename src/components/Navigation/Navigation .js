import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../shered/Constants/routes';
import classes from './Navigation.module.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';  

const Navigation  = (props)=> { 

    console.log('props.isAuthenticated');
    console.log(props.isAuthenticated);
    let authLinks= (
      <ul >
        <li>
          <Link to={ROUTES.LOGOUT}>LOGOUT</Link>
        </li>
        <li>
          <Link to={ROUTES.EXPENSE}>EXPENSE</Link>
        </li>
        <li>
          <Link to={ROUTES.STATISTICS}>STATISTICS</Link>
        </li>
        <li>
          <Link to={ROUTES.HISTORY}>HISTORY</Link>
        </li>         
      </ul>
    );

    let unAuthLinks= (
    <ul >
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>        
    </ul>

    );

    let userDetail= props.userName ? (
      <div className={classes.UserName}>         
        Hello {props.userName}          
      </div>
    ): null;
    
    return(
        <div className={classes.Navigation}> 
          {props.isAuthenticated ? authLinks: unAuthLinks}
        </div>
    )
};
const mapStateToProps = state =>{
  return {
      isAuthenticated: state.auth.token !== null
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//       getUserName : (userId) => dispatch(actions.getUserName(userId))
//     };
// };

export default connect(mapStateToProps)(Navigation) ;