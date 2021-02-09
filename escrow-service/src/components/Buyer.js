import React from 'react';
import Account from './Account';
import PurchaseList from './PurchaseList';
import Button from 'react-bootstrap/Button';
import EscrowService from "../services/EscrowService";
import AddEscrow from './AddEscrow';

class Buyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            toggle: false
        };
    }

    handleAccountSelect = (account) => {
        console.log("In buyer", account);
    }

    setModalShow = (isShow) => {
        this.setState({
            modalShow: isShow
        })
    }

    reloadList = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    onAddEscrow = async () => {
        this.setModalShow(false);
        this.reloadList();
    }

    render() {
        return (
            <div>
                <Account accounts={EscrowService.getAccounts()} onSelect={this.handleAccountSelect} />
                <br />
                <Button variant="primary" onClick={() => this.setModalShow(true)}>Add Escrow</Button>
                <br />
                <br />
                <PurchaseList toggle={this.state.toggle} />
                <AddEscrow
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    onAdd={this.onAddEscrow}
                />
            </div>
        );
    }
}

export default Buyer;