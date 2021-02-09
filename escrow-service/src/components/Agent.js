
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Account from './Account';
import TransactionList from './TransactionList';
import EscrowService from "../services/EscrowService";

class Agent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fee: 0
        }
    }

    componentDidMount = async () => {
        const fee = await EscrowService.getEscrowFee();
        this.setState({ fee: fee });
    }

    handleFeeChange = (event) => {
        this.setState({ fee: event.target.value })
    };

    handleAccountSelect = (account) => {
        console.log("In Agent", account);
    }

    handleClick = async () => {
        await EscrowService.setEscrowFee(this.state.fee);
    }

    render() {
        return (
            <div>
                <Account accounts={EscrowService.getAccounts()} onSelect={this.handleAccountSelect} />
                <br />

                <div>
                    <Form inline>
                        <Form.Label>Escrow Fee :</Form.Label>
                        <Form.Group as={Col} md="3">
                            <Form.Control type="number" min="0" max="100" value={this.state.fee} onChange={this.handleFeeChange} />
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleClick}>Update Escrow Fee</Button>
                    </Form>
                </div>


                <br />
                <br />
                <TransactionList />
            </div>
        );
    }
}

export default Agent;