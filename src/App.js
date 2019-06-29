import React, { Suspense } from "react";
import logo from "./logo.svg";
import CurrencyPairDropdown from "./components/currency-pair-dropdown";
import OrderStreams from "./components/order-streams";
import Orderbook from "./service/services";
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyPair: "btcusd",
      orders: []
    };
  }

  componentDidMount() {
    const orderbook = new Orderbook();
    orderbook.streamSubscription(this.state.currencyPair, "subscribe");
    var currentData = this.state.orders;
    var addMessage =  msg => {
      
      this.setState({
        orders: msg
       });
    }
    orderbook.ws.onmessage = function(evt) {
      var response = JSON.parse(evt.data); 
    
      // eslint-disable-next-line default-case
      switch (response.event) {
        case "trade": {
          currentData.push(response.data); 
          addMessage(currentData)
          break;
        }
        case "bts:request_reconnect": {
          console.log("an error occured");
          break;
        }
      }
    };

  }

  render() {
    return (
      <div className="App">
        <div className="side">
          <CurrencyPairDropdown
            setCurrencyPair={pair => {
              new Orderbook().streamSubscription(this.state.currencyPair, "unsubscribe");
               
              this.setState({
                orders: [],
                currencyPair: pair
               });

            }}
          />
        </div>
        <div className="main">
          <Suspense fallback={<img src={logo} alt="loading" />}>
            <OrderStreams currencyPair={this.state.currencyPair} orders={this.state.orders} />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
