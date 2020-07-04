import React , {useEffect} from 'react';
import classes from './Statistics.module.css';
import {createMuiTheme} from "@material-ui/core";
import {MyResponsivePie  } from '../../Chart/Chart';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

const Statistics = (props) => {
    useEffect( ()  => {
        props.onFetchExpenses(props.token,props.userId);
    },[]);

    const data = [
        // {
        //     id: "css",
        //     label: "css",
        //     value: 313,
        //     color: "hsl(174, 70%, 50%)"
        //   },
        //   {
        //     id: "make",
        //     label: "make",
        //     value: 375,
        //     color: "hsl(207, 70%, 50%)"
        //   }
        ];

    let fetchedData= null;
    let i=0;
    let sum=0;
    let colors= ["hsl(174, 70%, 50%)","hsl(180, 70%, 50%)","hsl(190, 70%, 50%)","hsl(200, 70%, 50%)","hsl(210, 70%, 50%)","hsl(100, 70%, 50%)"];
    if(props.expenseList){
        props.expenseList.map(exp=> {
            console.log('statistics expense render:', exp);
            sum+=exp.amount;
            data.push({
                'id': exp.expense,
                'label': exp.expense,
                'value': exp.amount,
                'color': colors[i++] 
            })
            // <div key={item.id}>        
            //         <Item  expense={item.expense} amount={item.amount} id={item.id} handleDelete={props.deleteditem} handleEdit={props.editItem}/>                    
            //     </div>
        })
    }

    return (
        <div className={classes.Statistics_Container}>
             <p> Statistics</p>
             <p> In This Section you can see you history of expenses </p>
             <div className={classes.Graph}>
                 <MyResponsivePie data={data} />
                <p>Total {sum} $</p>
             </div>
             <div className={classes.Table}>

            </div>
        </div>
    );
} 

const mapStateToProps = state => {
    return { 
      expenseList: state.expense.expenseList,
      loading: state.expense.loading,
      token: state.auth.token,
      userId: state.auth.userId
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
        addexpense : (expenseItem,token) => dispatch(actions.addexpense(expenseItem,token)),
        editExpense : (editItem,token) => dispatch(actions.editExpense(editItem,token)),
        deleteExpense : (expenseItemId,token) => dispatch(actions.deleteExpense(expenseItemId,token)),
        onFetchExpenses : (token,userId) => dispatch(actions.fetcExpenses(token,userId))
       };
  };
 
export default connect(mapStateToProps,mapDispatchToProps)(Statistics);