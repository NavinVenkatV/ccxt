// // #### 1. *Install CCXT for Node.js*

// // First, you need to install the *CCXT* library in your Node.js environment.

// // bash
// // npm install ccxt


// // #### 2. *Set Up Your Exchange API Keys*

// // Next, you need to set up your exchange credentials. For example, if you want to track *Binance*, you'll use your *API Key* and *API Secret*.

// // javascript

// const ccxt = require('ccxt');

// // Initialize Binance with your API credentials
// const exchange = new ccxt.binance({
//     apiKey: 'xxxx',
//     secret: 'xxxx',
// });


// // #### 3. *Track Trading Data*

// // Using the *fetch_my_trades* method, you can fetch recent trade data for a specific market (e.g., BTC/USDT). This will give you the trade details including the price, amount, and type (buy/sell).

// // javascript
// const symbol = 'BTC/USDT'; // Symbol for the market
// const limit = 100; // Limit the number of trades to fetch

// async function getTrades() {
//     try {
//         const trades = await exchange.fetchMyTrades(symbol, undefined, limit);
        
//         // Log trade data
//         trades.forEach(trade => {
//             console.log(`Trade ID: ${trade.id}, Price: ${trade.price}, Amount: ${trade.amount}, Side: ${trade.side}, Date: ${new Date(trade.timestamp)}`);
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

// getTrades();


// // #### 4. *Calculate Profit and Loss (PnL)*

// // Once you have the trade data, you need to calculate the *PnL* by comparing the *buy* and *sell* prices of each trade.

// // In the case of a buy/sell transaction pair, the formula for *PnL* is:

// // PnL = (sell_price - buy_price) * amount


// // Let’s implement that logic:

// // javascript
// async function calculatePnL() {
//     try {
//         const trades = await exchange.fetchMyTrades(symbol, undefined, limit);
        
//         let totalPnL = 0;
//         let buyTrade = null; // To track the buy trade
        
//         // Iterate over trades and calculate PnL
//         trades.forEach(trade => {
//             if (trade.side === 'buy') {
//                 buyTrade = trade; // Store the buy trade
//             } else if (trade.side === 'sell' && buyTrade) {
//                 // Calculate PnL when a matching sell trade is found
//                 const sellPrice = parseFloat(trade.price);
//                 const buyPrice = parseFloat(buyTrade.price);
//                 const amount = parseFloat(trade.amount);

//                 // Calculate profit or loss
//                 const pnl = (sellPrice - buyPrice) * amount;
//                 totalPnL += pnl;

//                 console.log(`PnL for trade ${buyTrade.id} (Buy) and ${trade.id} (Sell): ${pnl.toFixed(2)} USDT`);

//                 // Reset buy trade for the next buy/sell pair
//                 buyTrade = null;
//             }
//         });

//         console.log(`Total PnL: ${totalPnL.toFixed(2)} USDT`);
//     } catch (error) {
//         console.error(error);
//     }
// }

// calculatePnL();


// // In this code:
// // - We store a *buy trade* and look for the corresponding *sell trade*.
// // - The *PnL* is calculated each time a matching buy/sell pair is found.
// // - We sum the *PnL* for all trades to get the total profit or loss.

// // #### 5. *Calculate Win Rate*

// // The *Win Rate* can be calculated by counting the number of profitable trades (PnL > 0) and dividing it by the total number of trades.

// // Here’s how to calculate it:

// // javascript

// async function calculateWinRate() {
//     try {
//         const trades = await exchange.fetchMyTrades(symbol, undefined, limit);
        
//         let wins = 0;
//         let losses = 0;
//         let totalTrades = 0;
        
//         let buyTrade = null;

//         // Iterate over trades to calculate PnL and count wins and losses
//         trades.forEach(trade => {
//             if (trade.side === 'buy') {
//                 buyTrade = trade; // Store the buy trade
//             } else if (trade.side === 'sell' && buyTrade) {
//                 // Calculate PnL
//                 const sellPrice = parseFloat(trade.price);
//                 const buyPrice = parseFloat(buyTrade.price);
//                 const amount = parseFloat(trade.amount);
//                 const pnl = (sellPrice - buyPrice) * amount;
                
//                 // Count wins and losses
//                 if (pnl > 0) {
//                     wins++;
//                 } else {
//                     losses++;
//                 }

//                 totalTrades++;

//                 // Reset buy trade for the next buy/sell pair
//                 buyTrade = null;
//             }
//         });

//         // Calculate Win Rate
//         const winRate = (wins / totalTrades) * 100;
//         console.log(`Win Rate: ${winRate.toFixed(2)}%`);
//     } catch (error) {
//         console.error(error);
//     }
// }

// calculateWinRate();


// // In this code:
// // - We loop over the trades, calculate *PnL* for each buy/sell pair, and count the number of wins and losses.
// // - *Win Rate* is calculated as:
// //   javascript
// //   Win Rate = (number of wins / total trades) * 100
  

// // #### 6. *Create Filters for Profitable Wallets*

// // Now that you have the PnL and win rate, you can apply filters to find profitable wallets.

// // For example, if you want to find wallets with *PnL > 1000 USDT* and **Win Rate > 60%**:

// // javascript

// async function filterProfitableWallets() {
//     const pnlThreshold = 1000;
//     const winRateThreshold = 60;

//     // Example data for wallets (you can dynamically track multiple wallets)
//     const wallets = [
//         { walletId: 'wallet1', pnl: 2000, winRate: 75 },
//         { walletId: 'wallet2', pnl: -500, winRate: 40 },
//         { walletId: 'wallet3', pnl: 1500, winRate: 80 },
//     ];

//     // Filter wallets based on PnL and Win Rate
//     const profitableWallets = wallets.filter(wallet => wallet.pnl > pnlThreshold && wallet.winRate > winRateThreshold);

//     // Log profitable wallets
//     profitableWallets.forEach(wallet => {
//         console.log(`Profitable Wallet ID: ${wallet.walletId}, PnL: ${wallet.pnl}, Win Rate: ${wallet.winRate}%`);
//     });
// }

// filterProfitableWallets();

const ccxt = require("ccxt")

let binance = new ccxt.binance();

async function BTCTRades(){
    let trades = await binance.fetchTrades("BTC/USDT")
    const sellers = trades.filter(trade => trade.side === "sell");
    const buyers  = trades.filter(trade => trade.side === "buy");
    //If the bitcoin price is 'price = 86263.72' and the amount of bitcoin user sells is 'amount = 0.0015' and the total cost user get is price * amount\
    // console.log("----------Seller Details--------")
    // sellers.forEach(info => {
    //     console.log("Price of 1 BTC:", info.price);
    //     console.log("Amount of Bitcoin sold:", info.amount);
    //     console.log("Total cost of seller (USDT):", info.cost.toFixed(2));
    //     console.log("----------------------------");
    // });

    console.log("xxx Buyer Details xxx")
    buyers.forEach(info =>{
        console.log("Price of 1 BTC:", info.price);
        console.log("Amount of Bitcoin Bought:", info.amount);
        console.log("Total cost (USDT):", info.cost.toFixed(2));
        console.log("----------------------------");
    })
}

async function SLNTrades(){
    let trades = await binance.fetchTrades('SOL/USDT');
    console.log(trades)
}

async function BTCOrderBooks() {
    let order_books = await binance.fetch_order_book('BTC/USDT');
    console.log(order_books);
}

async function priceBTC(){
    setInterval(async ()=>{
        let price = await binance.fetchTicker('BTC/USDT');
        console.log(price.info.lastPrice)
    }, 1000)
}

BTCTRades();
// SLNTrades();
// BTCOrderBooks();
// priceBTC();