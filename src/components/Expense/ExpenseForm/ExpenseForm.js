import React , {useState, useEffect} from 'react'; 
import {MdSend} from 'react-icons/md'; 
import classes from './ExpenseForm.module.css';

const ExpenseForm = (props) => {

    const [Localexpense,setLocalExpense] = useState(props.expense);
    const [Localamount,setLocalAmount] = useState(props.amount);

    // useEffect(() => {
    //     setLocalExpense(props.expense);
    //     setLocalAmount(props.amount);
    // },[props.expense,props.amount]);

    const submitForm = (e) => {
        e.preventDefault();
        if(Localamount ==="" || !Localamount.trim() || Localexpense==="" || !Localexpense.trim()){           
            console.log('cannot submit Invalid input');
            return;
        }

        props.submited(Localexpense,Localamount);
        setLocalExpense('');
        setLocalAmount('');
    }

    const resetForm = (e) => {
        setLocalExpense('');
        setLocalAmount('');
        props.cancel(true);
    }
    


    return (
    <div className={classes.ExpenseForm}>
        {/* <p>Add Expense</p> */}
        <form onSubmit={submitForm} className={classes.ExpenseForm_container}>
            <p>Add Expense</p>
            <div className={classes.Input}>
                <label htmlFor="expense"> Charge </label>             
                <input type="text" name="expense" id="expense" placeholder="e.g rent" value={Localexpense ?Localexpense : props.expense} onChange={event => setLocalExpense(event.target.value)} />     
            </div>
            <div className={classes.Input}>
                <label htmlFor="amount"> Amount </label> 
                <input type="number" name="amount" id="amount" placeholder="e.g 100" value={Localamount ? Localamount : props.amount} onChange={event => setLocalAmount(event.target.value)} />                 
            </div>
            

            <br/>
            <div className={classes.Input_BTn}>
                <button className={classes.Btn_Submit} type="submit" > Submit <MdSend className={classes.Icon}/>  </button>
                <button className={classes.Btn_Reset}  type="reset" value="Reset" onClick={resetForm}>Reset <MdSend  className={classes.Icon}/></button>
                {/* <button className={classes.Btn_Submit} type="submit" > Submit <MdSend className={classes.Icon}/>  </button>
                <button className={classes.Btn_Reset} type="reset" value="Reset" onClick={resetForm}>Reset <MdSend  className={classes.Icon}/></button> */}
            </div>

        </form>
    </div>
    );
};
  
 
export default ExpenseForm;