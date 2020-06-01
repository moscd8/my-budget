import React , {useState} from 'react';
import Item from '../Item/Item';


const ExpenseList = (props) => {


    const [total,setTotal] = useState(0);
    let tempArray= [];
    let i=0;
    let total2=0;
    let listToRender= null;
    if(props.items){
        for(let k in props.items){
            tempArray[i]= props.items[k];      
            console.log(tempArray[i]);
            
            total2 += +tempArray[i].amount;
            i++;
        }

        listToRender= (
            tempArray.map(item => (
                <div key={item.id}>
                    <Item  expense={item.expense} amount={item.amount} id={item.id} handleDelete={props.deleteditem} handleEdit={props.editItem}/>                    
                </div>
            ))
        )        
    }

    return (
    <div>
        <p>ExpenseList</p>
        {listToRender ? listToRender : null}
        {total2>0 ? (<p> Total: {total2}</p>) : null}        
    </div>
    );
};


export default ExpenseList;