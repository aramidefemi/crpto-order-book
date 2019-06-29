import React, {useState, useEffect} from 'react'; 
import Orderbook  from '../service/services';


function CurrencyPairDropdown(props) { 
  const [currencyPairs, setCurrencyPairs] = useState([]);

  useEffect(()=>{
    const orderbook = new Orderbook();
    orderbook.getOrderPairs()
        .then((res)=>{
            var data  =  res.data;
            setCurrencyPairs(data);
        })
        .catch((err)=>console.log(err))
  })

  return (
    <div  className="dropdown">
        <label> select currency pairs </label>
        
        <select onChange={(e)=>props.setCurrencyPair(e.target.value)}> 
        <option>click here to see options</option>
            {
                currencyPairs.map((item,index)=> <option key={index} value={item.url_symbol} >{item.description}</option>)
            }  
        </select> 
    </div>
  );
}

export default CurrencyPairDropdown;
