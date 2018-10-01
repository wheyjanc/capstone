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
    console.log('factory', factory)
    const blocks = await factory.methods.getDeployedBlocks().call()
    console.log('blocks', blocks)
    let accounts = await web3.eth.getAccounts(console.log)
    const createBlock = await factory.methods
      .createBlock(1000000000000000000)
      .send({
        gas: 3000000,
        from: accounts[0]
      })
    const lastBlockIndex = blocks.length - 1
    const firstContract = fundsTransfer(blocks[lastBlockIndex])
    console.log('first contract', firstContract)
    const balanceInAccountOne = await web3.eth.getBalance(accounts[1])
    console.log(
      'balance in account 1 before depositing into contract',
      balanceInAccountOne
    )
    const depositFunds = await firstContract.methods.deposit().send({
      gas: 5000000,
      value: 1000000000000000000,
      from: accounts[1]
    })
    const getBalance = await firstContract.methods.getBalance().call()
    console.log('balance in contract after deposit', getBalance)
    console.log(
      'balance in account 1 after deposit',
      await web3.eth.getBalance(accounts[1])
    )
    const balanceInAccountThreeBefore = await web3.eth.getBalance(accounts[3])
    console.log(
      'balance in account three before receiving funds',
      balanceInAccountThreeBefore
    )
    const withdrawFunds = await firstContract.methods
      .withdraw(accounts[3])
      .send({
        gas: 3000000,
        from: accounts[1]
      })
    console.log(
      'balance in account three after receiving funds',
      await web3.eth.getBalance(accounts[3])
    )
    console.log(
      'balance in account one after withdrawing funds',
      await web3.eth.getBalance(accounts[1])
    )
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
