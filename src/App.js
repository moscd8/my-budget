import React from 'react';
import './App.css';
import Expense from './components/Expense/Expense';
import {connect} from 'react-redux';
import {Route, Switch ,Redirect,BrowserRouter} from 'react-router-dom';
import Auth from './components/Auth/auth';

const App = (props) =>{

 let routes= (
  <Switch>
    
    <Route path="/auth" exact render={ (props)=> <Auth {...props}/> }/>    
    <Route path="/expense" exact render={ (props)=> <Expense {...props}/> }/>
    <Route path="/" exact render={ (props)=> <Auth {...props}/> }/>
  </Switch>
);

  return (
    <div className="App">
      <BrowserRouter>
      {routes}
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return { 
    expenseList: state.expense.expenseList
  }
};

 

export default connect(mapStateToProps)(App);
