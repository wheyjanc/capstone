import React, {Component} from 'react'
import {connect} from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
// let ganache = require('ganache-cli')
// web3.setProvider(ganache.provider())

class Ethereum extends Component {
  constructor() {
    super()
    this.state = {
      blocks: []
    }
  }
  async componentDidMount() {
    const blocks = await factory.methods.getDeployedBlocks().call()
    console.log('blocks', blocks)
    const accounts = await web3.eth.getAccounts(console.log)

    const createBlock = await factory.methods.createBlock(1).send({
      gas: 1000000,
      from: accounts[0]
    })
    const firstBlock = blocks[0]
    const firstContract = fundsTransfer(firstBlock)
    console.log('firstContract', firstContract)
    console.log('accounts', accounts)
    console.log('default account', web3.eth.defaultAccount)
    // const depositFunds = await firstContract.methods.deposit().send({
    //   gas: 1000000,
    //   value: 1,
    //   from: accounts[0]
    // })
    // const getBalance = await firstContract.methods.balance({
    //   from: accounts[0]
    // })
    // console.log('balance', getBalance)
  }

  render() {
    return (
      <div>
        <h3>Welcome</h3>
        <p>Ethereum </p>
      </div>
    )
  }
}
module.exports = Ethereum
