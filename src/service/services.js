import axois from "axios";

export default class Orderbook {

    constructor () {
        this.pair = null;
        this.orders = null;
        this.ws = new WebSocket("wss://ws.bitstamp.net");
    }

    getOrderPairs  ()   {
        var link = "https://www.bitstamp.net/api/v2/trading-pairs-info/";
        return axois.get(link);
    }

    streamSubscription ( pair, status) {
        pair  = pair || "btcusd";
        status = status || "unsubscribe";
        this.ws.onopen =  function (ev){         
            this.send(JSON.stringify({
                "event": `bts:${status}`,
                "data": {
                    "channel": `live_trades_${pair}`
                }
            }));
        }
    }
}