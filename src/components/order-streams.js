import React, {Fragment} from 'react';  
import logo from "../logo.svg";

function OrderStreams(props) {

  if(props.orders.length < 1){
    return <img src={logo} className="App-logo" alt="loading" />
  }
  return (
    <Fragment>
       <h1> {props.currencyPair} {props.orders.length } </h1>
        <table>
         
          <th>Time</th>
          <th>Price</th>
          <th>amount</th> 
          
          <tbody>
          {props.orders.map((item,index)=>{
            return (
            <tr key={index}>
          <td>{item.microtimestamp}</td>
          <td>{item.price}</td>
              <td>{item.amount}</td> 
            </tr>
            );
          })}

          </tbody>
        </table>
    </Fragment>
  );
}

export default OrderStreams;
