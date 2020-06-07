import * as actionTypes from './actionTypes';

export const addexpense = (expenseItem) => {
    console.log('addexpense');
    let tempItem= {'id': expenseItem.id, 'expense': expenseItem.expense,'amount': expenseItem.amount};
    console.log(tempItem);
    return{
        type: actionTypes.ADD_EXPENSE,
        expenseItem: tempItem
    };
}

export const deleteExpense = (expenseItemIdToDelete) => {
    console.log('deleteexpense');
    console.log(expenseItemIdToDelete);
    return{
        type: actionTypes.DELETE_EXPENSE,
        deleteItem: expenseItemIdToDelete
    };
}

export const editExpense = (editItem) => {
    console.log('editExpense : ',editItem);
    return{
        type: actionTypes.EDIT_EXPENSE,
        editItem: editItem
    };

}