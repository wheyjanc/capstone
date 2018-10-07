import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import { fetchContract } from '../store/contracts'
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
    console.log('blocks', blocks)
    const thecurr = blocks.filter(
      block => block === this.props.contract.contract.contractHash
    )
    //come back to this
    console.log('thecurr', thecurr)
    const currentBlock = fundsTransfer(blocks[0])
    let accounts = await web3.eth.getAccounts(console.log)
    let address = document.getElementById('address').value
    const depositFunds = await currentBlock.methods.deposit().send({
      gas: 5999999,
      value: 1000000000000000000,
      from: address
    })
  }
  async componentDidMount() {
    await this.props.fetchContract(this.props.user.currentUser.id)
  }
  render() {
    // const contract = await this.props.fetchContract(this.props.user.currentUser.id)
    //console.log('contract', contract)
    console.log('contract', this.props.contract)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <h3> Payment </h3>
            <p> Contract Balance: {this.props.contract.contract.balance} ETH</p>
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

const mapState = state => {
  return {
    user: state.user,
    contract: state.contracts.currentUserContract
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContract: userId => dispatch(fetchContract(userId))
  }
}
export default connect(mapState, mapDispatch)(Payment)
