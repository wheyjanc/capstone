import web3 from './web3'
import BlockFactory from './build/BlockFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x1858cCeC051049Fa1269E958da2d33bCA27c6Db8'
)
export default instance
