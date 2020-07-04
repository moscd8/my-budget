import React , {useEffect} from 'react';
import './App.css';
import Expense from './components/Expense/Expense';
import {connect} from 'react-redux';
import {Route, Switch ,Redirect,BrowserRouter} from 'react-router-dom';
import Auth from './components/Auth/auth';
import Navigation from './components/Navigation/Navigation ';
import * as actions from './store/actions/auth';
import Logout  from './components/Auth/Logout/Logout'

import Statistics from './components/Expense/Statistics/Statistics';

const App = (props) =>{

  useEffect(() => {
    props.onTryAutoSignup();
  }, [props.onTryAutoSignup])

 let routes= (
  <Switch>
    
    <Route path="/auth" exact render={ (props)=> <Auth {...props}/> }/>    
    <Route path="/" exact render={ (props)=> <Auth {...props}/> }/>
    {/* Logout */}
    <Redirect to="/"/> 
  </Switch>
);

if(props.isAuthenticated){
  routes= (
    <Switch>
      
      <Route path="/auth" exact render={ (props)=> <Auth {...props}/> }/>    
      <Route path="/expense" exact render={ (props)=> <Expense {...props}/> }/>
      <Route path="/logout" exact render={ (props)=> <Logout {...props}/> }/>
      <Route path="/statistics" exact render={ (props)=> <Statistics {...props}/> }/>
      <Route path="/history" exact render={ (props)=> <Logout {...props}/> }/>
      <Route path="/" exact render={ (props)=> <Expense {...props}/> }/>
      {/*  */}
      <Redirect to="/"/> 
    </Switch>
  );
}
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation/>
      <hr/>
      {routes}
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return { 
    expenseList: state.expense.expenseList,
    isAuthenticated : state.auth.token!=null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

 

export default connect(mapStateToProps,mapDispatchToProps)(App);
