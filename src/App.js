import React from 'react';
import './App.css';
import Expense from './components/Expense/Expense';
import {connect} from 'react-redux';

function App() {
  return (
    <div className="App">
      <Expense />
    </div>
  );
}

const mapStateToProps = state => {
  return { 
    expenseList: state.expense.expenseList
  }
};

 

export default connect(mapStateToProps)(App);
