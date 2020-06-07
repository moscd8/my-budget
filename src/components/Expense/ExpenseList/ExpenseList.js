import React  from 'react';
import Item from '../Item/Item';

import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
 
    let tempArray= [];
    let i=0;
    let totalAmount=0;
    let listToRender= null;
    if(props.items){
        for(let k in props.items){
            tempArray[i]= props.items[k];      
            console.log(tempArray[i]);
            totalAmount += +tempArray[i].amount;
            i++;
        }

        listToRender= (
            tempArray.map(item => (
                <div key={item.id}>
                    <Item  expense={item.expense} amount={item.amount} id={item.id} handleDelete={props.deleteditem} handleEdit={props.editItem}/>                    
                </div>
            ))
        )        
    }

    return (
    <div className={classes.ExpenseList}>
        <p>Expense List</p>
        {listToRender ? listToRender : null}
        {totalAmount>0 ? (<p> Total: <strong>{totalAmount} $</strong></p>) : (<p> Total: <strong>0 $</strong></p>)}        
    </div>
    );
};
 
export default ExpenseList;