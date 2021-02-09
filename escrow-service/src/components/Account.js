import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: props.accounts[0]
        }
    }

    handleSelect = (e) => {
        this.setState({
            selectedAccount: e
        });
        this.props.onSelect(e);
    }

    render() {
        return (
            <DropdownButton onSelect={this.handleSelect}
                menuAlign="right"
                title={this.state.selectedAccount}>
                {this.props.accounts.map((account, i) =>
                    <Dropdown.Item key={i} eventKey={account}>{account}</Dropdown.Item>
                )}
            </DropdownButton>
        );
    }
}

export default Account;