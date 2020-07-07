import React , {useEffect} from 'react';
import classes from './Statistics.module.css';
import {createMuiTheme} from "@material-ui/core";
import {MyResponsivePie  } from '../../Chart/Chart';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import SlideView from '../../SlideView/SlideView';

const Statistics = (props) => {
    useEffect( ()  => {
        props.onFetchStatisticsExpenses(props.token,props.userId);
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
    const data_1= [];
    const data_2= [];
    const data_3= [];
    const data_4= [];
    const data_5= [];
    const data_6= [];
    const data_7= [];
    const data_8= [];
    const data_9= [];
    const data_10= [];
    const data_11= [];
    const data_12= [];

    const expense_by_months_array= [        
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    const sum_expense_by_months_array= [        
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    let fetchedData= null;
    let i=0;
    let sum=0;
    let colors= ["hsl(174, 70%, 50%)","hsl(180, 70%, 50%)","hsl(190, 70%, 50%)","hsl(200, 70%, 50%)","hsl(210, 70%, 50%)","hsl(100, 70%, 50%)"];
    if(props.statsExpenseList){
        console.log('Statistics: fetched statistics list \n',props.statsExpenseList);
        props.statsExpenseList.map((month , index) => {
            console.log('statistics expense month render:', month);
            if(month.count>0){
                let sum=0;
                console.log('month=',month);
                console.log('parseInt(index)=',parseInt(index));
                
                month.expenses.map(exp=>{
                    sum += exp.amount;
                    expense_by_months_array[parseInt(index)].push(
                        {
                            // 'data':{
                                    'id': exp.expense,
                                    'label': exp.expense,
                                    'value': exp.amount,
                                    'color': colors[i++]
                            //         },
                            // 'sum':sum
                        });
                   
                        console.log('expense_by_months_array[parseInt(index)]= ',expense_by_months_array[parseInt(index)]);                
                });
                // expense_by_months_array[parseInt(index)].push({'sum':sum});
                sum_expense_by_months_array[parseInt(index)].push(sum);
            }

            // sum+=exp.amount;
            // data.push({
            //     'id': exp.expense,
            //     'label': exp.expense,
            //     'value': exp.amount,
            //     'color': colors[i++] 
            // })
        });

        // props.expenseList.map(exp=> {
        //     console.log('statistics expense render:', exp);
            
        //     sum+=exp.amount;
        //     data.push({
        //         'id': exp.expense,
        //         'label': exp.expense,
        //         'value': exp.amount,
        //         'color': colors[i++] 
        //     })
        // })
    }

    let month_slideViews= [];
    if(expense_by_months_array){
        // if(expense_by_months_array)
        let temp_sum=0;
        console.log('expense_by_months_array ', expense_by_months_array);
        expense_by_months_array.map((month,index)=> {
            if(expense_by_months_array[index].length>0){     
                console.log('expense_by_months_array map() month', month);
                temp_sum+=month.value;
                let t= sum_expense_by_months_array[index] ?  sum_expense_by_months_array[index]: 0;
                month_slideViews.push(
                    <div key={index}>
                    
                        <div className={classes.Graph}>
                            <h1>Month {index}</h1>
                            <MyResponsivePie data={month} />
                            <p>Total {t} $</p>
                        </div>
                    </div>                 
                    );
            }
            }
            );
        };

    console.log('expense_by_months_array pre renbder',expense_by_months_array);
    return (
        <div className={classes.Statistics_Container}>
              <p> Statistics</p>
             <p> In This Section you can see you history of expenses </p>
 
               {/* <SlideView> 
                <div className={classes.Graph}>
                    <MyResponsivePie data={expense_by_months_array[1]} />
                     <p>Total {sum} $</p>
                </div>
                </SlideView>  */}

             {/*   <div className={classes.Graph}>
                    <MyResponsivePie data={data} />
                     <p>Total {sum} $</p>
                </div> 
               </SlideView>  */}
               <SlideView>
            {month_slideViews? month_slideViews: <p>Empty</p>}
            </SlideView>
             {/* <p> Statistics</p>
             <p> In This Section you can see you history of expenses </p>
 
             <div className={classes.Graph}>
                 <MyResponsivePie data={data} />
                <p>Total {sum} $</p>
             </div>
             <div className={classes.Table}>
            </div> */}
        </div>
    );
} 

const mapStateToProps = state => {
    return { 
      expenseList: state.expense.expenseList,
      statsExpenseList: state.expense.statsExpenseList,
      loading: state.expense.loading,
      token: state.auth.token,
      userId: state.auth.userId
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
        // onFetchExpenses : (token,userId) => dispatch(actions.fetcExpenses(token,userId)),
        onFetchStatisticsExpenses : (token,userId) => dispatch(actions.fetcStatisticsExpenses(token,userId))
       };
  };
 
export default connect(mapStateToProps,mapDispatchToProps)(Statistics);