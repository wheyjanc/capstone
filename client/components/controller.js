const factory = require('../../ethereum/factory')

const getDeployedBlocks = async () => {
  const blocks = await factory.methods.getDeployedBlocks().call()
  return blocks
}

module.exports = {
  getDeployedBlocks
}
