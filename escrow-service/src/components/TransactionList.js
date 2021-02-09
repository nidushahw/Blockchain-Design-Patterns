import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EscrowService from '../services/EscrowService';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    populateTransactions = async () => {
        const count = await EscrowService.getTransactionCount();
        let transactions = [];
        for (let i = 0; i < count; i++) {
            const purchase = await EscrowService.getTransactionByIndex(i);
            transactions.push(purchase);
        }
        this.setState({
            transactions: transactions
        });
    }

    componentDidMount = async () => {
        this.populateTransactions();
    }

    componentWillReceiveProps = async (nextProps) => {
        this.populateTransactions();
    }

    getEscrowStatus = (state) => {
        let status;
        switch (state) {
            case '0':
                status = 'Payment Sent';
                break;
            case '1':
                status = 'Delivery Confirmed';
                break;
            case '2':
                status = 'Payment Released';
                break;
            case '3':
                status = 'Payment Refunded';
                break;
            default:
                status = 'Unknown';
        }
        return status;
    }

    handleRefundClick = async (buyer, trnxId) => {
        await EscrowService.refundPayment(buyer, trnxId);
        this.populateTransactions();
    }

    handleReleaseClick = async (buyer, trnxId) => {
        await EscrowService.releasePayment(buyer, trnxId);
        this.populateTransactions();
    }

    render() {
        return (
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Amount (ETH)</th>
                        <th>Fee</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transactions.map((transaction, i) =>
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{transaction['1']}</td>
                            <td>{transaction['2']}</td>
                            <td>{EscrowService.toEther(transaction['4'])}</td>
                            <td>{transaction['5']}%</td>
                            <td>{this.getEscrowStatus(transaction['6'])}</td>
                            {
                                transaction['6'] === '0' ? <td><Button onClick={() => this.handleRefundClick(transaction['1'], transaction['0'])} variant="primary">Refund&nbsp;Payment</Button></td> : ''
                            }
                            {
                                transaction['6'] === '1' ? <td><Button onClick={() => this.handleReleaseClick(transaction['1'], transaction['0'])} variant="primary">Release&nbsp;Payment</Button></td> : ''
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default TransactionList;