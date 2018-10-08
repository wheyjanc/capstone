import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import { fetchContract } from '../store/contracts'
import { Link } from 'react-router-dom'
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
    let accounts = await web3.eth.getAccounts(console.log)
    const blocks = await factory.methods.getDeployedBlocks().call()
    console.log('blocks', blocks)
    await this.props.fetchContract(this.props.user.currentUser.id)
    const contractHash = this.props.contract[this.props.contract.length - 1]
      .contract.contractHash

    const thecurr = blocks.indexOf(contractHash)
    console.log('index', thecurr)
    const contractthecurr = fundsTransfer(blocks[thecurr])
    console.log('contractthecurr', contractthecurr)
    contractthecurr.options.address = `${contractHash}`
    let address = document.getElementById('address').value
    console.log('address', address)
    const depositFunds = await contractthecurr.methods.deposit().send({
      gas: 6000000,
      value: 1000000000000000000,
      from: address
    })

    //come back to this
    // const currentBlock = fundsTransfer(blocks[0])
    // let accounts = await web3.eth.getAccounts(console.log)
    // let address = document.getElementById('address').value
    // const depositFunds = await currentBlock.methods.deposit().send({
    //   gas: 5999999,
    //   value: 1000000000000000000,
    //   from: address
    // })
  }
  async componentDidMount() {
    // let accounts = await web3.eth.getAccounts(console.log)
    await this.props.fetchContract(this.props.user.currentUser.id)
    // const contractHash = this.props.contract[2].contract.contractHash
    // const blocks = await factory.methods.getDeployedBlocks().call()
    // console.log('blocks', blocks)
    // const thecurr = blocks.indexOf(contractHash)
    // console.log('index', thecurr)
    // const contractthecurr = fundsTransfer(blocks[44])
    // console.log('thecurr', contractthecurr)
    // contractthecurr.options.address = contractHash
    // const depositFunds = await contractthecurr.methods.deposit().send({
    //   gas: 5999999,
    //   value: 1000000000000000000,
    //   from: accounts[0]
    // })
  }
  render() {
    // let contractMap = this.props.contract.contract.map(contract => (
    //   <p> Contract Balance: ${contract.balance} ETH </p>
    // ))
    console.log('contract', this.props.contract)
    let contractMap = this.props.contract.map(elem => (
      <p key={elem.contractId}>
        //come back to this, put contracts into separate pages
        <Link to={`/payment/${elem.contractId}`}>
          Contract ID: ${elem.contract.contractHash} Balance Owed: ${
            elem.contract.balance
          }
        </Link>
      </p>
    ))
    console.log('contractMap', contractMap)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <h3> Payment </h3>
            {contractMap}
            {/* <p> Contract Balance: {this.props.contract.contract.balance} ETH</p> */}
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
