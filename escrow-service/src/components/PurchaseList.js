import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EscrowService from '../services/EscrowService';

class PurchaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: []
        }
    }

    populatePurchases = async () => {
        const account = EscrowService.getAccounts()[0];
        const count = await EscrowService.getEscrowCount();
        let purchases = [];
        for (let i = 0; i < count; i++) {
            const purchase = await EscrowService.getEscrowByTrnxId(account, i);
            purchases.push(purchase);
        }
        this.setState({
            purchases: purchases
        });
    }

    componentDidMount = async () => {
        this.populatePurchases();
    }

    componentWillReceiveProps = async (nextProps) => {
        this.populatePurchases();
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

    handleClick = async (trnxId) => {
        await EscrowService.confirmDelivery(trnxId);
        this.populatePurchases();
    }

    render() {
        return (
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Seller</th>
                        <th>Agent</th>
                        <th>Amount (ETH)</th>
                        <th>Fee</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.purchases.map((purchase, i) =>
                        <tr key={i}>
                            <td>{purchase['0']}</td>
                            <td>{purchase['2']}</td>
                            <td>{purchase['3']}</td>
                            <td>{EscrowService.toEther(purchase['4'])}</td>
                            <td>{purchase['5']}%</td>
                            <td>{this.getEscrowStatus(purchase['6'])}</td>
                            <td>{purchase['6'] === '0' ? <Button onClick={() => this.handleClick(i)} variant="primary">Confirm&nbsp;Delivery</Button> : ''}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default PurchaseList;