const factory = require('../../ethereum/factory')
const fundsTransfer = require('../../ethereum/fundsTransfer')
//const web3 = require('../../ethereum/web3')

const getDeployedBlocks = async () => {
  const blocks = await factory.methods.getDeployedBlocks().call()
  return blocks
}

module.exports = {
  getDeployedBlocks
}
