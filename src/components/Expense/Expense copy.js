import React  , {useState} from 'react';
import ExpenseForm from './ExpenseForm/ExpenseForm';

import ExpenseList from './ExpenseList/ExpenseList';
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';


const Expense = () => {
    const initialState= [
        {'id': uuidv4(), 'expense': 'rent','amount': 100},
        {'id': uuidv4(), 'expense': 'rent2','amount': 120},
        {'id': uuidv4(), 'expense': 'rent3','amount': 140},        
    ];
    const [amount1,setAmount1] = useState('');
    const [expense1,setExpense1] = useState('');
    const [expenseList,setExpenseList] = useState(initialState);
    const [editMode,seteditMode] = useState(false);
    const [tempEditItem,settempEditItem] = useState('');    

    const submitForm = (amount, expense ) => {
        console.log(amount);        
        console.log(expense);
        console.log(tempEditItem[0]);

        
        let NewItem =null;
        if(editMode){             
//            NewItem= {...tempEditItem[0]};
            expenseList.map(item => {
                return item.id === tempEditItem[0].id ? { ...item, expense1, amount1 } : ({
                    'id': uuidv4(), 
                    'expense': expense1,
                    'amount': amount1
                } 
                );
              });
            // NewItem = {
            //     'id': tempEditItem[0] ? tempEditItem[0].id: uuidv4(), 
            //     'expense': expense,
            //     'amount': amount
            // };
        }else{  
            NewItem = {
                'id': uuidv4(), 
                'expense': expense,
                'amount': amount
            };
        }

        let cp = [...expenseList, NewItem];
        setExpenseList(cp);    
        seteditMode(false);


        setExpense1('');
        setAmount1('');
        
        settempEditItem('');

    }

    
    const deleteItem = (id) => {
        let oldArray = [...expenseList];
        console.log("id is :");
        console.log(id);
        
        let tempArray= oldArray.filter(i=> i.id !== id);
        console.log(tempArray);
        setExpenseList(tempArray);
    }

    const editItem = (id,expense,amount) => {
        let oldArray = [...expenseList];
        console.log("id is :");
        console.log(id);
        
        let editItem= oldArray.filter(i=> i.id === id);

        console.log(editItem[0]);
        setExpense1(editItem[0].expense);
        setAmount1(editItem[0].amount);        
        settempEditItem(editItem[0].id);
        seteditMode(true);
        //submitForm(editItem[0].expense,editItem[0].amount);
        //editItem.expense=
        //setExpenseList(tempArray);
    }

    return (
    <div>
        <p>Expense</p>
        <div >
            <ExpenseForm amount={amount1} expense={expense1} submited={(a, b) => submitForm(a, b)}/>
        </div>
        <div >
            <ExpenseList items={expenseList} deleteditem= {deleteItem} editItem={editItem}/>
        </div>        
    </div>
    );
};

const mapStateToProps = state => {
    return { 
      expenseList: state.expenseList
    }
  };
export default connect(mapStateToProps)(Expense);