import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Buyer from "./components/Buyer";
import Agent from "./components/Agent";
import EscrowService from "./services/EscrowService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await EscrowService.init();
    let accounts = EscrowService.getAccounts();

    // const fee = await EscrowService.getEscrowFee();
    // console.log("escfserefee>>", fee);
    console.log(accounts[1], accounts[2]);
    // let tx = await EscrowService.addEscrow("0x0e35AaAcf8884B2eBf271B5A60b68adbb7c53780", "0xeeBF3ef1FB4421752C7803A96774ba70e0b2f975", "0.001");
    //  console.log('last transaction>>>>>', JSON.stringify(tx));

    let count = await EscrowService.getEscrowCount();
    console.log(accounts[0], ">>>>>>>>>>>>>>>>", count);
    // let escrow = await EscrowService.getEscrowByTrnxId(accounts[0], count - 1);
    // console.log(escrow, JSON.stringify(escrow));
  }

  render() {
    return (
      <BrowserRouter history={History}>
        <Container>
          <br/>
          <Navigation />
          <br/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/buyer" component={Buyer} />
            <Route path="/agent" component={Agent} />
            <Route component={Home} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
