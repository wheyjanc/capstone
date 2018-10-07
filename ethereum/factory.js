import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xA9F8FeF0B3DF9159F1443427dAa79210fCEB009C'
)
export default instance
