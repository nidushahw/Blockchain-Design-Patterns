let express = require('express');
let router = express.Router();
const Web3 = require('web3');
const fetch = require('node-fetch');
let Tx = require('ethereumjs-tx').Transaction;


let contractAddr = '0x510a7C7b72479B078B5582C1bf137A74c800b1a7';
let abi = [{
  "inputs": [
    {
      "internalType": "bytes4",
      "name": "symbol",
      "type": "bytes4"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "volume",
      "type": "uint256"
    }
  ],
  "name": "setStock",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "inputs": [
    {
      "internalType": "bytes4",
      "name": "symbol",
      "type": "bytes4"
    }
  ],
  "name": "getStockPrice",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes4",
      "name": "symbol",
      "type": "bytes4"
    }
  ],
  "name": "getStockVolume",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
];

let getStockData = async () => {
  let stock = {};
  const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`);
  const rawstocks = await response.json();
  stock.price = parseInt(rawstocks['Global Quote']['05. price']);
  stock.volume = rawstocks['Global Quote']['06. volume'];
  return stock;
}

let init = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  web3.eth.getAccounts(console.log);
  let contractInstance = new web3.eth.Contract(abi, contractAddr);
  console.log("contractInstance");

  const account = '0xeeBF3ef1FB4421752C7803A96774ba70e0b2f975';
  const privateKey = Buffer.from('2a3edfe38a12c22508af77b9b44654c02eb4a273ed219729eab1ee0e1f68f46c', 'hex');
 
  let stock = await getStockData();
  const _data1 = contractInstance.methods.setStock(web3.utils.fromAscii("IBM"), stock.price, stock.volume).encodeABI();
  console.log(_data1);
  signAndSendTransaction(web3, account, _data1, privateKey);

  //const _data2 = contractInstance.methods.getStockPrice(web3.utils.fromAscii("IBM")).encodeABI();
  //signAndSendTransaction(web3, account, _data2, privateKey);
}

function signAndSendTransaction(web3, account, _data, privateKey) {
  web3.eth.getTransactionCount(account).then(nonce => {
    let rawTx = {
      nonce: nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x41409',
      to: contractAddr,
      value: 0,
      data: _data
    };

    let tx = new Tx(rawTx);
    tx.sign(privateKey);
    let serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .on('receipt', console.log);
  });
}


/* GET home page. */
router.get('/', function (req, res, next) {
  init();
  res.render('index', { title: 'Express' });
});

module.exports = router;



