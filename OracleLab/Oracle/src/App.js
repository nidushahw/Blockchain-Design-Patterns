
import './App.css';
import Web3 from 'web3';
import React from 'react';
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quotecontract'

class App extends React.Component {
  stockQuote;
  web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  accounts;

  constructor(props) {
    super(props);
    this.state = { symbol: '', price: 0, volume: 0 };
  }

  componentDidMount = async () => {
    this.accounts = await this.web3.eth.getAccounts();
    console.log("Account 0 = ", this.accounts[0]);
    this.stockQuote = new this.web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
    let retval = await this.stockQuote.methods.getStockPrice(this.web3.utils.fromAscii("IBM")).call();
    console.log(retval);
  }

  clickHandler = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:8000/${this.state.symbol}`);
    let json = await result.json();
    this.setState({
      price: json.price,
      volume: json.volume
    });
    console.log(`Price: ${json.price}​​​​​​​`);
    let retval = await this.stockQuote.methods.setStock(this.web3.utils.fromAscii(this.state.symbol), parseInt(json.price), json.volume)
      .send({ from: this.accounts[0] })
      .on('reciept', () => {
        console.log("Done");
      });
    console.log(retval);
  };

  handleSymbolChange = (e) => {
    this.setState({ symbol: e.target.value });
  }

  render() {
    return (
      <div className="setStock">
        <form>
          <div>
            <label htmlFor="symbol">
              Symbol:
            </label>
            <input type="text" name="symbol" onChange={this.handleSymbolChange} />
          </div>
          <div>
            <label>Price: {this.state.price}</label>
          </div>
          <div>
            <label>Volume: {this.state.volume}</label>
          </div>
          <div>
            <input type="submit" onClick={this.clickHandler} value="setStock" />
          </div>

        </form>
      </div>
    );
  }
}

export default App;
