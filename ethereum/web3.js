import Web3 from 'web3'
const HDWalletProvider = require('truffle-hdwallet-provider')
const provider = new HDWalletProvider(
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  'HTTP://127.0.0.1:9545',
  0,
  10
)
const web3 = new Web3(provider)
export default web3

// import Web3 from 'web3'

// let web3

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // We are in the browser and metamask is running.
//   web3 = new Web3(window.web3.currentProvider)
// } else {
//   // We are on the server *OR* the user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
//   )
//   web3 = new Web3(provider)
// }

// export default web3
