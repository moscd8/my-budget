import * as actionTypes from '../actions/actionTypes';
 
import { v4 as uuidv4 } from 'uuid';

const initialState= {
    expenseList: [
        {'id': uuidv4(), 'expense': 'rent','amount': 10},
        {'id': uuidv4(), 'expense': 'rent2','amount': 20},
        {'id': uuidv4(), 'expense': 'rent3','amount': 40},        
    ], 
    loading: false
};

const addExpense = (state, action) => {
//    return dispatch => {
        //addStart();
        console.log('action.expenseItem =',action.expenseItem);
        return {
            ...state,
            //loading:true,
            expenseList : [...state.expenseList, action.expenseItem]
        }

//    }

}

const addStart = (state, action) => {
    return {
        ...state,
        loading:true
    }

} 
const  addSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading:false,
        userId: action.userId,
        token: action.token
    }
}

const  addFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading:false
    }
}

const deleteExpense = (state, action) => {
        console.log('action.deleteItem =',action.deleteItem);

        let tempArray= state.expenseList.filter(i=> i.id !== action.deleteItem);
        console.log(tempArray);
        return {
            ...state,
            //loading:true,
            expenseList : [...tempArray]
        }
};

const editExpense = (state, action) => {
    console.log('action.editItem = ',action.editItem);
    let editItemFromArray= state.expenseList.filter(i=> i.id === action.editItem.id);
    console.log(editItemFromArray);    
    editItemFromArray.expense=action.editItem.expense;
    editItemFromArray.amount=action.editItem.amount;

    let updatedArray= state.expenseList.filter(i=> i.id !== action.editItem.id);
    updatedArray.push(editItemFromArray);
    return {
        ...state,
        //loading:true,
        expenseList : [...updatedArray]
    }
};

 

const reducer = (state= initialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_EXPENSE:
            return addExpense(state,action);
        case actionTypes.ADD_EXPENSE_SUCCESS:
            return addSuccess(state,action);
        case actionTypes.ADD_EXPENSE_FAILED:
            return addFail(state,action); 

        case actionTypes.DELETE_EXPENSE:
            return deleteExpense(state,action); 
        case actionTypes.EDIT_EXPENSE:
            return editExpense(state,action); 
                
            
        default: return state;

    }
}

export default reducer;