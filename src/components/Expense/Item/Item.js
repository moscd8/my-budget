import React from 'react'; 
import {MdDelete,MdEdit} from 'react-icons/md';
import classes from './Item.module.css';

const Item = (props) => {

    console.log('Item: props.id,props.expense,props.amount',props.id,props.expense,props.amount);
    return (
    <div className={classes.Item}>
        <div className={classes.Item_Container}>
        <span className={classes.Expense}> {props.expense} </span>
        {/* <p>Expense: {props.expense}</p> */}
        {/* <p>Amount: {props.amount} </p>           */}
        <span className={classes.Amount}> {props.amount}$ </span>
        </div>

        <button className={classes.Btn_Delete} onClick={() => props.handleDelete(props.id)}> <MdDelete /> Delete </button>
        <button className={classes.Btn_Edit} onClick={() => props.handleEdit(props.id,props.expense,props.amount)}> <MdEdit/> Edit </button>

    </div>
    );
};


export default Item;