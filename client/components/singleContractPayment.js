import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'

export default class SingleContractPayment extends Component {
  //   constructor() {
  //     super()
  //     this.state = {
  //       address: ''
  //     }
  //     this.handleSubmit = this.handleSubmit.bind(this)
  //     this.handleChange = this.handleChange.bind(this)
  //   }
  //   handleChange(evt) {
  //     this.setState({
  //       [evt.target.name]: evt.target.value
  //     })
  //   }
  //   async handleSubmit(evt) {
  //     evt.preventDefault()
  //     let accounts = await web3.eth.getAccounts(console.log)
  //     const blocks = await factory.methods.getDeployedBlocks().call()
  //     console.log('blocks', blocks)
  //     await this.props.fetchContract(this.props.user.currentUser.id)
  //     const contractHash = this.props.contract[this.props.contract.length - 1]
  //       .contract.contractHash

  //     const thecurr = blocks.indexOf(contractHash)
  //     console.log('index', thecurr)
  //     const contractthecurr = fundsTransfer(blocks[thecurr])
  //     console.log('contractthecurr', contractthecurr)
  //     contractthecurr.options.address = `${contractHash}`
  //     let address = document.getElementById('address').value
  //     console.log('address', address)
  //     const depositFunds = await contractthecurr.methods.deposit().send({
  //       gas: 6000000,
  //       value: 1000000000000000000,
  //       from: address
  //     })
  //   }
  render() {
    console.log('hello, in single contract payment page!')
    return 'HIIII'
    //   <form onSubmit={this.handleSubmit}>
    //     <div>
    //       <div>
    //         <h3> Payment </h3>
    //         {contractMap}
    //         {/* <p> Contract Balance: {this.props.contract.contract.balance} ETH</p> */}
    //         <p>Enter your Ethereum Address:</p>
    //         <input
    //           name="address"
    //           type="string"
    //           id="address"
    //           onChange={this.handleChange}
    //           value={this.state.address}
    //         />
    //       </div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
  }
}
