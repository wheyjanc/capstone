//import web3 from './web3'
//import fundsTransfer from './build/fundsTransfer.json'
const fundsTransfer = require('./build/fundsTransfer.json')
const web3 = require('./web3')

module.exports = address => {
  return new web3.eth.Contract(JSON.parse(fundsTransfer.interface), address)
}
// export default address => {
//   return new web3.eth.Contract(JSON.parse(fundsTransfer.interface), address)
// }
