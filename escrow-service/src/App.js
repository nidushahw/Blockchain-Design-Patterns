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
