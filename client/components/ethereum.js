import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    console.log('create block', createBlock)
    const lastBlockIndex = blocks.length - 1
    const firstContract = fundsTransfer(blocks[lastBlockIndex])
    const actualFirstContract = fundsTransfer(blocks[0])
    console.log('actual first contract', actualFirstContract)
    console.log('first contract', firstContract)
    console.log('first contract hash', firstContract._address)
    const balanceInAccountOne = await web3.eth.getBalance(
      '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
    )

    console.log(
      'balance in account 1 before depositing into contract',
      balanceInAccountOne
    )
    const depositFunds = await firstContract.methods.deposit().send({
      gas: 5000000,
      value: 1000000000000000000,
      //from: accounts[1]
      from: '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
    })
    const getBalance = await firstContract.methods.getBalance().call()
    console.log('balance in contract after deposit', getBalance)
    console.log(
      'balance in account 1 after deposit',
      // await web3.eth.getBalance(accounts[1])
      await web3.eth.getBalance('0x0d1d4e623d10f9fba5db95830f7d3839406c6af2')
    )
    const balanceInAccountThreeBefore = await web3.eth.getBalance(accounts[3])
    console.log(
      'balance in account three before receiving funds',
      balanceInAccountThreeBefore
    )
    const withdrawFunds = await firstContract.methods
      .withdraw(accounts[3], accounts[1])
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
