import web3 from './web3'
import fundsTransfer from './build/fundsTransfer.json'

export default address => {
  return new web3.eth.Contract(JSON.parse(fundsTransfer.interface), address)
}
