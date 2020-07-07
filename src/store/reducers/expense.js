import * as actionTypes from '../actions/actionTypes';
 
import { v4 as uuidv4 } from 'uuid';

const initialState= {
    expenseList: [
        // {'id': uuidv4(), 'expense': 'rent','amount': 10},
        // {'id': uuidv4(), 'expense': 'rent2','amount': 20},
        // {'id': uuidv4(), 'expense': 'rent3','amount': 40},        
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

// const deleteExpense = (state, action) => {
//         console.log('action.deleteItem =',action.deleteItem);

//         // let tempArray= state.expenseList.filter(i=> i.id !== action.deleteItem);
//         // console.log(tempArray);
//         // return {
//         //     ...state,
//         //     //loading:true,
//         //     expenseList : [...tempArray]
//         // }

// };

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
const addExpenseStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
};

const addexpenseSuccess = (state, action) => {
    console.log('addexpenseSuccess');
    const newList= [...state.expenseList,action.expenseItem];
    return {
        ...state,
        expenseList:newList,
        loading:false, 
        error: null
    }; 
};

const fetchexpenseStart = (state, action) => {
    console.log('fetchexpenseStart');
    return {
        ...state,
        loading:true, 
        error: null
    }; 
};

const fetchexpenseSuccess = (state, action) => {
    console.log('fetchexpenseSuccess');
    const newList= [...action.newExpenses];
    return {
        ...state,
        loading:false, 
        error: null,
        expenseList:newList
    }; 
};

const fetchexpenseFailed = (state, action) => {
    console.log('fetchexpenseFailed');
    return {
        ...state,
        loading:false, 
        error: action.error,
    }; 
};
 


const deleteExpenseSuccess = (state, action) => {
    console.log('deletdexpenseSuccess');
    ///const newList= [...action.newExpenses];
    const oldList= [...state.expenseList];
    const newList= oldList.filter(exp => exp.id!==action.deletedExpense);
    return {
        ...state,
        loading:false, 
        error: null,
        expenseList:newList
    }; 
};

const deleteExpenseFailed = (state, action) => {
    console.log('deletdexpenseFailed');
    return {
        ...state,
        loading:false, 
        error: action.error,
    }; 
};
 
const editExpenseSuccess = (state, action) => {
    console.log('editExpenseSuccess');
    ///const newList= [...action.newExpenses];
    const oldList= [...state.expenseList];
    const newList= oldList.filter(exp => exp.id!==action.editedItem.id);
    newList.push(action.editedItem);

    return {
        ...state,
        loading:false, 
        error: null,
        expenseList:newList
    }; 
};

const editExpenseFailed = (state, action) => {
    console.log('editExpenseFailed');
    return {
        ...state,
        loading:false, 
        error: action.error,
    }; 
};


const fetchStatisticsExpenseStart = (state, action) => {
    console.log('fetchStatisticsExpenseStart');
    return {
        ...state,
        loading:true, 
        error: null
    }; 
};

const fetchStatisticsExpenseSuccess = (state, action) => {
    console.log('fetchStatisticsExpenseSuccess');
    const newList= [...action.newExpenses];
    return {
        ...state,
        loading:false, 
        error: null,
        statsExpenseList: newList
        // expenseList:newList
    }; 
};

const fetcheStatisticsEpenseFailed = (state, action) => {
    console.log('fetcheStatisticsEpenseFailed');
    return {
        ...state,
        loading:false, 
        error: action.error,
    }; 
};

const reducer = (state= initialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_EXPENSE:
            return addExpense(state,action);
        // case actionTypes.ADD_EXPENSE_SUCCESS:
        //     return addSuccess(state,action);
        case actionTypes.ADD_EXPENSE_FAILED:
            return addFail(state,action); 

        // case actionTypes.DELETE_EXPENSE:
        //     return deleteExpense(state,action); 
        case actionTypes.EDIT_EXPENSE:
            return editExpense(state,action); 
                
        case actionTypes.ADD_EXPENSE_START:
            return addExpenseStart(state,action);
        case actionTypes.ADD_EXPENSE_SUCCESS:
            return addexpenseSuccess(state,action); 
       
        case actionTypes.FETCH_EXPENSE_START:
            return fetchexpenseStart(state,action);                     
        case actionTypes.FETCH_EXPENSE_SUCCESS:
                return fetchexpenseSuccess(state,action); 
        case actionTypes.FETCH_EXPENSE_FAILED:
            return fetchexpenseFailed(state,action); 

        case actionTypes.DELETE_EXPENSE_SUCCESS:
            return deleteExpenseSuccess(state,action); 
        case actionTypes.DELETE_EXPENSE_FAILED:
            return deleteExpenseFailed(state,action); 

        case actionTypes.EDIT_EXPENSE_SUCCESS:
            return editExpenseSuccess(state,action); 
        case actionTypes.EDIT_EXPENSE_FAILED:
            return editExpenseFailed(state,action); 

        case actionTypes.FETCH_STATISTICS_EXPENSE_START:
            return fetchStatisticsExpenseStart(state,action);                     
        case actionTypes.FETCH_STATISTICS_EXPENSE_SUCCESS:
                return fetchStatisticsExpenseSuccess(state,action); 
        case actionTypes.FETCH_STATISTICS_EXPENSE_FAILED:
            return fetcheStatisticsEpenseFailed(state,action); 
    
        default: return state;

    }
}

export default reducer;