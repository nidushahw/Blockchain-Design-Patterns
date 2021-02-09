import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EscrowService from '../services/EscrowService';

class AddEscrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: "",
            agent: "",
            amount: ""
        }
    }

    handleClick = async () => {
        await EscrowService.addEscrow(this.state.seller, this.state.agent, this.state.amount);
        this.props.onAdd();
    }

    handleSellerChange = (event) => {
        this.setState({ seller: event.target.value })
    };

    handleAgentChange = (event) => {
        this.setState({ agent: event.target.value })
    };

    handleAmountChange = (event) => {
        this.setState({ amount: event.target.value })
    };

    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Escrow
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Enter following details to add an escrow.</h6>
                    <br />
                    <Form.Group>
                        <Form.Label>Seller</Form.Label>
                        <Form.Control type="text" placeholder="Seller Address" onChange={this.handleSellerChange} />
                        <br />
                        <Form.Label>Agent</Form.Label>
                        <Form.Control type="text" placeholder="Agent Address" onChange={this.handleAgentChange} />
                        <br />
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="Amount in Ether" onChange={this.handleAmountChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClick}>Add</Button>
                    <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddEscrow;