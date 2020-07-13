import React , {useState,useEffect} from 'react';
import classes from './Statistics.module.css';
import {createMuiTheme} from "@material-ui/core";
import {MyResponsivePie  } from '../../Chart/Chart';
import {MyResponsiveLine  } from '../../Chart/ChartBar';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import SlideView from '../../SlideView/SlideView';

const Statistics = (props) => {

    const [temp_data2_data2, setTemp_data2_data] = useState ('');
    let temp_data2= null;
    useEffect( ()  => {
        props.onFetchStatisticsExpenses(props.token,props.userId);
    },[]);


    useEffect( ()  => {
        clac_func();
    },[props.statsExpenseList, temp_data2]);


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
    let colors= ["rgb(209, 9, 9)","rgb(83, 36, 128)","rgb(34, 131, 138)","rgb(23, 184, 90)","rgb(14, 82, 184)","rgb(177, 33, 88)"];
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
      temp_data2= 
    [
        {
          "id": "My Data ",
          "color": "hsl(24, 70%, 50%)",
        //   "data": [
        //     // {
        //     //   "x": "skateboard",
        //     //   "y": 72
        //     // }
        //   ]
        }
      ];

    let temp_data2_data = [];
    const expense_by_months_array_Bar= 
    [
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
    
    


    let i=0; 
    //let colors= ["hsl(174, 70%, 50%)","hsl(180, 70%, 50%)","hsl(190, 70%, 50%)","hsl(200, 70%, 50%)","hsl(210, 70%, 50%)","hsl(100, 70%, 50%)"];
    
    
    if(props.statsExpenseList){ //All months
        console.log('Statistics: fetched statistics list \n',props.statsExpenseList);
        props.statsExpenseList.map((month , index) => { //each month
            console.log('statistics expense month render:', month);
            if(month.count>0){
                let sum=0;
                console.log('month=',month);
                console.log('parseInt(index)=',parseInt(index));
                
                month.expenses.map(exp=>{ //loop each expense in every month
                    sum += exp.amount;
                    expense_by_months_array[parseInt(index)].push(
                        { 
                                    'id': exp.expense,
                                    'label': exp.expense,
                                    'value': exp.amount,
                                    'color': colors[Math.random(Math.random() * 10)] 
                        });                   
                console.log('expense_by_months_array[parseInt(index)]= ',expense_by_months_array[parseInt(index)]);      
                
                });
                 
                sum_expense_by_months_array[parseInt(index)].push(sum);
               
                // expense_by_months_array_Bar[parseInt(index)].push(
                //     {
                //         "x": index,
                //         "y": sum
                //     }
                // );

                // // console.log('te_Data',te_Data);
                // // for(let temp in te_Data){
                // //     console.log("temp " , temp);
                // //     if(parseInt(temp)===index){
                // //         te_Data[temp].push({"y" : sum});

                // //     }
                // // }
                // te_Data.map(o=> {
                //     console.log("o " , o);
                //     if(parseInt(o)===index){
                //         te_Data.data.o.push({"y" : sum});
                //     }
                // });
               

                }});
 
    }

    let month_slideViews= [];
    let month_slideViews2= null;
    
    if(expense_by_months_array){
        // if(expense_by_months_array)
        let temp_sum=0;
        console.log('expense_by_months_array ', expense_by_months_array);
        expense_by_months_array.map((month,index,data)=> {
            if(expense_by_months_array[index].length>0){     
                console.log('expense_by_months_array map() month,data', month,data);
                temp_sum+=month.value;
                let calc_sum= sum_expense_by_months_array[index] ?  sum_expense_by_months_array[index]: 0;
                month_slideViews.push(
                    <div key={index}>                    
                        <div className={classes.Graph}>
                            <h1>Month {index}</h1>
                            <MyResponsivePie data={month} />
                            <p>Total {calc_sum} $</p>
                        </div>
                    </div>                 
                    );


                    //
                    if(sum_expense_by_months_array[parseInt(index)]>0){
                        let obj= {
                            "x": parseInt(index),
                            "y": sum_expense_by_months_array[parseInt(index)][0]
                        };
                        console.log('obj',obj);
                        
                        temp_data2_data.push(obj);
                        console.log('temp_data2_data temp print',temp_data2_data);
                        //setTemp_data2_data(temp_data2_data);
                        


                    }
            }
            }
            );
 
            

        // if(expense_by_months_array_Bar){
        //     let temp= expense_by_months_array_Bar[0].data;
        
            // // if(temp_data2 && temp_data2_data){
            // //     console.log('temp_data2,temp_data2_data ',temp_data2, temp_data2_data);
                

                
            // //     temp_data2.push(temp_data2_data);
            // //     let j=1;
            // //         month_slideViews2.push(
            // //         <div key={j++}>                    
            // //         <div className={classes.Graph}>
            // //             <h1>Graph {j}</h1>
            // //             <MyResponsiveLine data={temp_data2} />
            // //         </div>
            // //     </div>                 
            // //        )

            // //  //   }
            // // }

        };

    let temp_data= 
    [
        {
          "id": "japan",
          "color": "hsl(44, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 94
            },
            {
              "x": "helicopter",
              "y": 141
            },
            {
              "x": "boat",
              "y": 229
            },
            {
              "x": "train",
              "y": 195
            },
            {
              "x": "subway",
              "y": 199
            },
            {
              "x": "bus",
              "y": 279
            },
            {
              "x": "car",
              "y": 294
            },
            {
              "x": "moto",
              "y": 141
            },
            {
              "x": "bicycle",
              "y": 179
            },
            {
              "x": "horse",
              "y": 251
            },
            {
              "x": "skateboard",
              "y": 177
            },
            {
              "x": "others",
              "y": 44
            }
          ]
        },
        {
          "id": "france",
          "color": "hsl(24, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 13
            },
            {
              "x": "helicopter",
              "y": 104
            },
            {
              "x": "boat",
              "y": 218
            },
            {
              "x": "train",
              "y": 84
            },
            {
              "x": "subway",
              "y": 194
            },
            {
              "x": "bus",
              "y": 37
            },
            {
              "x": "car",
              "y": 80
            },
            {
              "x": "moto",
              "y": 187
            },
            {
              "x": "bicycle",
              "y": 163
            },
            {
              "x": "horse",
              "y": 290
            },
            {
              "x": "skateboard",
              "y": 72
            },
            {
              "x": "others",
              "y": 110
            }
          ]
        },
        {
          "id": "us",
          "color": "hsl(134, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 282
            },
            {
              "x": "helicopter",
              "y": 225
            },
            {
              "x": "boat",
              "y": 201
            },
            {
              "x": "train",
              "y": 26
            },
            {
              "x": "subway",
              "y": 124
            },
            {
              "x": "bus",
              "y": 231
            },
            {
              "x": "car",
              "y": 207
            },
            {
              "x": "moto",
              "y": 127
            },
            {
              "x": "bicycle",
              "y": 137
            },
            {
              "x": "horse",
              "y": 69
            },
            {
              "x": "skateboard",
              "y": 19
            },
            {
              "x": "others",
              "y": 21
            }
          ]
        },
        {
          "id": "germany",
          "color": "hsl(337, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 156
            },
            {
              "x": "helicopter",
              "y": 219
            },
            {
              "x": "boat",
              "y": 285
            },
            {
              "x": "train",
              "y": 191
            },
            {
              "x": "subway",
              "y": 48
            },
            {
              "x": "bus",
              "y": 194
            },
            {
              "x": "car",
              "y": 30
            },
            {
              "x": "moto",
              "y": 56
            },
            {
              "x": "bicycle",
              "y": 284
            },
            {
              "x": "horse",
              "y": 294
            },
            {
              "x": "skateboard",
              "y": 178
            },
            {
              "x": "others",
              "y": 166
            }
          ]
        },
        {
          "id": "norway",
          "color": "hsl(127, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 156
            },
            {
              "x": "helicopter",
              "y": 273
            },
            {
              "x": "boat",
              "y": 189
            },
            {
              "x": "train",
              "y": 86
            },
            {
              "x": "subway",
              "y": 83
            },
            {
              "x": "bus",
              "y": 195
            },
            {
              "x": "car",
              "y": 267
            },
            {
              "x": "moto",
              "y": 249
            },
            {
              "x": "bicycle",
              "y": 130
            },
            {
              "x": "horse",
              "y": 25
            },
            {
              "x": "skateboard",
              "y": 4
            },
            {
              "x": "others",
              "y": 22
            }
          ]
        }
      ]
    ;

   // if(expense_by_months_array_Bar){
   //     let temp= expense_by_months_array_Bar[0].data;
   
    // // if(temp_data2 && temp_data2_data){
    // //     console.log('temp_data2,temp_data2_data ',temp_data2, temp_data2_data);
        

        
    // //     temp_data2.push(temp_data2_data);
    // //     let j=1;
    // //         month_slideViews2.push(
    // //         <div key={j++}>                    
    // //         <div className={classes.Graph}>
    // //             <h1>Graph {j}</h1>
    // //             <MyResponsiveLine data={temp_data2} />
    // //         </div>
    // //     </div>                 
    // //        )

    // //  //   }
    // // }

    const clac_func= () => {
        console.log("clac_func");
        //temp_data2_data

           if(temp_data2 && temp_data2_data){
                console.log('temp_data2,temp_data2_data ',temp_data2, temp_data2_data);
                

                // temp_data2= {
                //     ...temp_data2,
                //     "data" :temp_data2_data
                // };

                // temp_data2= {
                //     "id": "france",
                //     "color": "hsl(24, 70%, 50%)",
                //     "data" :temp_data2_data
                // };


                temp_data2= [
                    {
                        "id": "france2",
                        "color": "hsl(24, 70%, 50%)",
                        "data" : temp_data2_data
                    }

                ]
                // [
                //     {
                //       "id": "france",
                //       "color": "hsl(24, 70%, 50%)",
                //       "data": [

                //temp_data2.push(temp_data2_data);
                
                console.log('original ',temp_data);
                console.log('temp_data2,temp_data2_data ',temp_data2);                
                
                month_slideViews2= [];
                let j=1;
                month_slideViews2.push(
                <div key={j++}>                    
                    <div className={classes.Graph}>
                        <h1>Graph {j}</h1>
                        <MyResponsiveLine data={temp_data2[0]} />
                    </div>
                </div>                 
                )

                   

             //   }
             console.log('month_slideViews2 ',month_slideViews2[0].props);                
                
            }
    } 

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
               <div className={classes.Graph_container}>
                <SlideView>
                  {month_slideViews.length >0 ?  (month_slideViews) : (<p>Sorry , no history records was found. <br></br> You need to add Expenses first</p>)}
              </SlideView>

               </div>
               
              {month_slideViews2 ? (<div className={classes.Graph_container}>
                <SlideView>
                {month_slideViews2 ?  month_slideViews2: (<p>Sorry , no history records was found. <br></br> You need to add Expenses first</p>)}
              </SlideView>              
               </div>) : (<p>Sorry , no history records was found. <br></br> You need to add Expenses first</p>)}
               


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