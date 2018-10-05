import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'

class Payment extends Component {
  constructor() {
    super()
    this.state = {
      address: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    const blocks = await factory.methods.getDeployedBlocks().call()
    const currentBlock = fundsTransfer(blocks[0])
    let accounts = await web3.eth.getAccounts(console.log)
    let address = document.getElementById('address').value
    const depositFunds = await currentBlock.methods.deposit().send({
      gas: 5999999,
      value: 1000000000000000000,
      from: address
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <h3> Payment </h3>

            <p>Enter your Ethereum Address:</p>
            <input
              name="address"
              type="string"
              id="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default Payment
