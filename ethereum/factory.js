import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xbbE595Df857805ab3734f15BE990f9A30CBB89F3'
)
export default instance
