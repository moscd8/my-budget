import * as actionTypes from './actionTypes';
import  axios from '../../axios-prj';

export const addexpense = (expenseItem,token) => {
    console.log('addexpense');
    let tempItem= {'id': expenseItem.id, 'expense': expenseItem.expense,'amount': expenseItem.amount};
    console.log(tempItem);
    // return{
    //     type: actionTypes.ADD_EXPENSE,
    //     expenseItem: tempItem
    // };
    return dispatch => {
        dispatch(addexpenseStart());
        let config = {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        axios.post('/expenses/', expenseItem, {headers:config.headers})
        .then(result => {
            console.log('Add Response: ',result);
            if(result.status===201)
            {
                let createdId= result.data.createdExpense._id;
                expenseItem.id=createdId;
                console.log('Add Response: newId ',createdId);
                dispatch(addexpenseSuccess(expenseItem));
            }
        })
        .catch(error=> {
            console.log(error);
        })
    }
}

export const fetcExpenses = (token,userId) => {
    console.log('fetcExpenses');
    return dispatch => {
        dispatch(fetcExpensesStart());
        let config = {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        axios.get('/expenses',{headers:config.headers})
        .then(result=> {
            if(result.status===200)
            {
                console.log(result);
                let expenses_array= result.data.expense;
                console.log('fetc Response: expenses_array ',expenses_array);
                let newArray= expenses_array.filter(exp=>exp.userId===userId);
                console.log('fetc Response: newArray ',newArray);
                if(newArray)
                    dispatch(fetcExpensesSuccess(newArray));
            }
        })
        .catch(error=> {
            console.log(error);
            dispatch(fetcExpensesFailed(error));
        })
    }
};

export const addexpenseStart = () => {
    return {
        type: actionTypes.ADD_EXPENSE_START
    };
};

export const addexpenseSuccess = (expenseItem)=> { //V
    console.log('addexpenseSuccess');
    return{
        type: actionTypes.ADD_EXPENSE_SUCCESS,
        expenseItem: expenseItem
    };
}
export const fetcExpensesStart = ()=> { //V
    console.log('fetcExpensesStart');
    return{
        type: actionTypes.FETCH_EXPENSE_START
    };
}
export const fetcExpensesSuccess = (ExpensesFromServer)=> { //V
    console.log('fetcExpensesSuccess');
    return{
        type: actionTypes.FETCH_EXPENSE_SUCCESS,
        newExpenses: ExpensesFromServer
    };
}
export const fetcExpensesFailed = (error)=> { //V
    console.log('fetcExpensesFailed');
    return{
        type: actionTypes.FETCH_EXPENSE_FAILED,
        error: error
    };
}

export const deleteExpense = (expenseItemIdToDelete, token) => {
    console.log('deleteexpense');
    console.log(expenseItemIdToDelete);
    // return{
    //     type: actionTypes.DELETE_EXPENSE,
    //     deleteItem: expenseItemIdToDelete,
    //     token:token
    // };

    return dispatch => {
        //dispatch(addexpenseStart());
        let headers = { 
              Authorization: "Bearer " + token            
        }        
        let url = '/expenses/'+expenseItemIdToDelete;
        axios.delete(url, {headers:headers})
        .then(result => {
            console.log('deleteExpense Response: ',result);
            if(result.status===200)
            {
                 dispatch(deleteExpenseSuccess(expenseItemIdToDelete));
            }
        })
        .catch(error=> {
            console.log(error);
            dispatch(deleteExpenseFailed(error));
        })
    }
}


export const deleteExpenseSuccess = (deletedExpense)=> { //V
    console.log('deleteExpenseSuccess');
    return{
        type: actionTypes.DELETE_EXPENSE_SUCCESS,
        deletedExpense: deletedExpense
    };
}
export const deleteExpenseFailed = (error)=> { //V
    console.log('deleteExpenseFailed');
    return{
        type: actionTypes.DELETE_EXPENSE_FAILED,
        error: error
    };
}

export const editExpense = (editItem, token) => {
    console.log('editExpense : ',editItem);
    // return{
    //     type: actionTypes.EDIT_EXPENSE,
    //     editItem: editItem
    // };

    return dispatch => {
        //dispatch(addexpenseStart());
        let headers = { 
              Authorization: "Bearer " + token            
        }        
        let url = '/expenses/'+editItem.id;
        // let formatedReq= [
        //     {
        //         "propName": editItem.expense, "value": "UPDATED"
        //     }
        // ]
        axios.patch(url, editItem,{headers:headers})
        .then(result => {
            console.log('editExpense Response: ',result);
            if(result.status===200)
            {
                dispatch(editExpenseSuccess(editItem));
            }
        })
        .catch(error=> {
            console.log(error);
            dispatch(editExpenseFailed(error));
        })
    }
}

export const editExpenseSuccess = (editedItem)=> { //V
    console.log('editExpenseSuccess');
    return{
        type: actionTypes.EDIT_EXPENSE_SUCCESS,
        editedItem: editedItem
    };
}
export const editExpenseFailed = (error)=> { //V
    console.log('editExpenseFailed');
    return{
        type: actionTypes.EDIT_EXPENSE_FAILED,
        error: error
    };
}
