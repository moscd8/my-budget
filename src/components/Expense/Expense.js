import React  , {useState,useEffect} from 'react';
import ExpenseForm from './ExpenseForm/ExpenseForm';

import ExpenseList from './ExpenseList/ExpenseList';
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Expense.module.css';


const Expense = (props) => { 

    const [amount1,setAmount1] = useState('');
    const [expense1,setExpense1] = useState('');
    const [editMode,seteditMode] = useState(false);
    const [tempEditItemId,settempEditItemId] = useState('');

    useEffect( ()  => {
        props.onFetchExpenses(props.token,props.userId);
    },[]);

    const resetAllSetters = () => {
        seteditMode(false);
        setExpense1('');
        setAmount1('');
        settempEditItemId('');
    }

    const submitForm = (expense,amount) => {
        console.log(amount1);        
        console.log(expense1);
        console.log(tempEditItemId);

        let NewItem =null;
        if(editMode)
        {
             NewItem = {
                'id': tempEditItemId, 
                'expense': expense,
                'amount': amount
            };
            console.log("submit:: edit: tempEditItem= ",NewItem);
            props.editExpense(NewItem, props.token);            
        }
        else
        {  
            NewItem = {
                'id': uuidv4(), 
                'expense': expense,
                'amount': amount,
                'userId': props.userId
            };
            props.addexpense(NewItem,props.token);
        }

        resetAllSetters();
    }

    
    const deleteItem = (id) => { 
        console.log("deleteItem: id is : ",id);
        props.deleteExpense(id,props.token);
        resetAllSetters();
    }

    const editItem = (idEdit,expenseEdit,amountEdit) => {
         let editItem = {
            'id': idEdit, 
            'expense': expenseEdit,
            'amount': amountEdit
        };   
        console.log("Expense: editItem: item is : ",editItem);
        setExpense1(editItem.expense);
        setAmount1(editItem.amount);        
        settempEditItemId(editItem.id);
        seteditMode(true);

    }

    const cancelForm = (canceled) =>{
        console.log('CancelForm:  ShouldCanceled = ',canceled);
        if(canceled)
            resetAllSetters();

    }

    return (
    <div className={classes.Expense}>
        <p>Budget Calculator</p>
        {props.test}
        <div >
            <ExpenseForm amount={amount1} expense={expense1} submited={(a_expense, b_amount) => submitForm(a_expense, b_amount)} cancel={cancelForm}/> 
        </div>
        <div >
            <ExpenseList items={props.expenseList} deleteditem= {deleteItem} editItem={editItem}/>
        </div>       
    </div>
    );
};

const mapStateToProps = state => {
    return { 
      expenseList: state.expense.expenseList,
      loading: state.expense.loading,
      token: state.auth.token,
      userId: state.auth.userId
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
        addexpense : (expenseItem,token) => dispatch(actions.addexpense(expenseItem,token)),
        editExpense : (editItem,token) => dispatch(actions.editExpense(editItem,token)),
        deleteExpense : (expenseItemId,token) => dispatch(actions.deleteExpense(expenseItemId,token)),
        onFetchExpenses : (token,userId) => dispatch(actions.fetcExpenses(token,userId))
       };
  };
 
export default connect(mapStateToProps,mapDispatchToProps)(Expense);