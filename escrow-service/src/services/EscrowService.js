import Web3 from 'web3';
import { ESCROW_CONTRACT_ABI, ESCROW_CONTRACT_ADDRESS } from './escrowServiceContract';

let web3, contract, accounts;

let EscrowService = {
    init: async () => {
        web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(ESCROW_CONTRACT_ABI, ESCROW_CONTRACT_ADDRESS);
        web3.eth.defaultAccount = accounts[0];
        console.log("Contract initialized");
    },

    getAccounts: () => accounts,

    getEscrowCount: async () => {
        return await contract.methods.getEscrowCountForBuyer().call({ from: accounts[0] });
    },

    getEscrowByTrnxId: async (buyer, trnxId) => {
        return await contract.methods.getEscrowByTrnxId(buyer, trnxId).call({ from: accounts[0] });
    },

    addEscrow: async (seller, agent, amount) => {
        const amountToSend = web3.utils.toWei(amount, "ether");
        await contract.methods.addEscrow(seller, agent).send({ from: accounts[0], value: amountToSend });
    },

    confirmDelivery: async (trnxId) => {
        await contract.methods.confirmDelivery(trnxId).send({ from: accounts[0] });
    },

    setEscrowFee: async (fee) => {
        return await contract.methods.setEscrowFee(web3.utils.toBN(fee)).send({ from: accounts[0] });
    },

    getEscrowFee: async () => {
        return await contract.methods.escrowFee(accounts[0]).call();
    },

    getTransactionCount: async () => {
        return await contract.methods.getTransactionsCountForAgent().call({ from: accounts[0] });
    },

    getTransactionByIndex: async (index) => {
        return await contract.methods.getTransactionByIndex(index).call({ from: accounts[0] });
    },

    releasePayment: async (buyer, trnxId) => {
        await contract.methods.releasePayment(buyer, trnxId).send({ from: accounts[0] });
    },

    refundPayment: async (buyer, trnxId) => {
        await contract.methods.refundPayment(buyer, trnxId).send({ from: accounts[0] });
    },

    toEther: (amount) => {
        return web3.utils.fromWei(amount, 'ether');
    }
}

export default EscrowService;
