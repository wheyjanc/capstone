import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x4a5cd58b24e3BF04360B06bFEaF45A39aA8035b6'
)
export default instance
