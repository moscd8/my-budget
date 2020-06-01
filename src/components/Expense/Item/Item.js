import React  , {useState} from 'react'; 

const Item = (props) => {

    
    return (
    <div>
        <p>Expense: {props.expense} </p>
        <p>amount: {props.amount} </p>          
        <button onClick={() => props.handleDelete(props.id)}>Delete </button>
        <button onClick={() => props.handleEdit(props.id,props.expense,props.amount)}>Edit </button>

    </div>
    );
};


export default Item;