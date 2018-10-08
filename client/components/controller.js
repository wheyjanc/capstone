const factory = require('../../ethereum/factory')
const fundsTransfer = require('../../ethereum/fundsTransfer')
//const web3 = require('../../ethereum/web3')

const getDeployedBlocks = async () => {
  const blocks = await factory.methods.getDeployedBlocks().call()
  return blocks
}
const withdraw = async (contract, account1, account2, account3) => {
  await contract.methods.withdraw(account1, account2).send({
    gas: 3000000,
    from: account3
  })
}

module.exports = {
  getDeployedBlocks,
  withdraw
}
