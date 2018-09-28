import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x9eFec315E368e8812025B85b399a69513Cd0e716'
)
export default instance
