//import web3 from './web3'

//import BlockFactory from './build/BlockFactory.json'
const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc'
)
module.exports = instance
//export default instance
