import React , {useState, useEffect} from 'react'; 
import {MdSend} from 'react-icons/md'; 
import classes from './ExpenseForm.module.css';

const ExpenseForm = (props) => {

    const [Localexpense,setLocalExpense] = useState(props.expense);
    const [Localamount,setLocalAmount] = useState(props.amount);
    const [Localmonth,setLocalMonth] = useState(props.month);

    // useEffect(() => {
    //     setLocalExpense(props.expense);
    //     setLocalAmount(props.amount);
    // },[props.expense,props.amount]);

    const submitForm = (e) => {
        e.preventDefault();
        if(Localamount ==="" || !Localamount.trim() || Localexpense==="" || !Localexpense.trim() || Localmonth==="" || !Localmonth.trim()){           
            console.log('cannot submit Invalid input');
            return;
        }

        props.submited(Localexpense,Localamount,Localmonth);
        setLocalExpense('');
        setLocalAmount('');
    }

    const resetForm = (e) => {
        setLocalExpense('');
        setLocalAmount('');
        setLocalMonth('');
        props.cancel(true);
    }
    

    const selectionPrint = (e) => { 
        console.log('selectionPrint Value: ',e.target.value);        
        setLocalMonth(e.target.value);

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
            <div className={classes.Input}>
                <label htmlFor="date"> Month </label> 
                {/* <input type="number" name="date" id="date" placeholder="e.g 100" value={Localamount ? Localamount : props.amount} onChange={event => setLocalAmount(event.target.value)} />                  */}
            
                <select id="date" name="date" onChange={event => selectionPrint(event)}>
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
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