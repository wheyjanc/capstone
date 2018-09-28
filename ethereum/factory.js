import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xd1b691E3DE533f72c25aD88a2aDf8296744BB738'
)
export default instance
