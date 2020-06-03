import React  , {useState} from 'react';
import ExpenseForm from './ExpenseForm/ExpenseForm';

import ExpenseList from './ExpenseList/ExpenseList';
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Expense = (props) => {
    const initialState= [
        {'id': uuidv4(), 'expense': 'rent','amount': 100},
        {'id': uuidv4(), 'expense': 'rent2','amount': 120},
        {'id': uuidv4(), 'expense': 'rent3','amount': 140},        
    ];
    const [amount1,setAmount1] = useState('');
    const [expense1,setExpense1] = useState('');
    ///const [expenseList,setExpenseList] = useState();
    const [editMode,seteditMode] = useState(false);
    const [tempEditItemId,settempEditItemId] = useState('');
//    const [shouldCancel,setshouldCancel] = useState(false);    

    const resetAllSetters = () => {
        seteditMode(false);
        setExpense1('');
        setAmount1('');
        settempEditItemId('');
      //  setshouldCancel(false);
    }

    const submitForm = (expense,amount) => {
        console.log(amount1);        
        console.log(expense1);
        console.log(tempEditItemId);
///        if(shouldCancel) return;

        let NewItem =null;
        if(editMode)
        {
             NewItem = {
                'id': tempEditItemId, 
                'expense': expense,
                'amount': amount
            };
            console.log("submit:: edit: tempEditItem= ",NewItem);
            props.editExpense(NewItem);            
        }
        else
        {  
            NewItem = {
                'id': uuidv4(), 
                'expense': expense,
                'amount': amount
            };
            props.addexpense(NewItem);
        }

        resetAllSetters();
    }

    
    const deleteItem = (id) => { 
        console.log("deleteItem: id is : ",id);
        props.deleteExpense(id);
        resetAllSetters();
    }

    const editItem = (idEdit,expenseEdit,amountEdit) => {
         let editItem = {
            'id': idEdit, 
            'expense': expenseEdit,
            'amount': amountEdit
        };   
        console.log("editItem: item is : ",editItem);
        setExpense1(editItem.expense);
        setAmount1(editItem.amount);        
        settempEditItemId(editItem.id);
        seteditMode(true);

    }

    const cancelForm = (canceled) =>{
        console.log('CancelForm:  canceled = ',canceled);
        //setshouldCancel(canceled);
        // seteditMode(false);
        // setExpense1('');
        // setAmount1('');
        // settempEditItemId('');

        if(canceled)
            resetAllSetters();

    }

    return (
    <div>
        <p>Expense</p>
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
      expenseList: state.expense.expenseList
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
        addexpense : (expenseItem) => dispatch(actions.addexpense(expenseItem)),
        editExpense : (editItem) => dispatch(actions.editExpense(editItem)),
        deleteExpense : (expenseItemId) => dispatch(actions.deleteExpense(expenseItemId)),
       };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Expense);