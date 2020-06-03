import React , {useState} from 'react'; 

const ExpenseForm = (props) => {

    const [Localexpense,setLocalExpense] = useState('');
    const [Localamount,setLocalAmount] = useState('');

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
    <div>
        <p>ExpenseForm</p>
        <form onSubmit={submitForm}>
            
            <label htmlFor="expense"> charge </label>             
            <input type="text" name="expense" id="expense" placeholder="e.g rent" value={Localexpense ?Localexpense : props.expense} onChange={event => setLocalExpense(event.target.value)} />

            <label htmlFor="amount"> amount </label> 
            <input type="number" name="amount" id="amount" placeholder="e.g 100" value={Localamount ? Localamount : props.amount} onChange={event => setLocalAmount(event.target.value)} />

            <button  type="submit" >Submit </button>
            <button type="reset" value="Reset" onClick={resetForm}>Reset</button>
        </form>
    </div>
    );
};
  
 
export default ExpenseForm;