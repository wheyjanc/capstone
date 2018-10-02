import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import emailCreator from './email'

export default class BundleCheckout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentWillMount(){
      
  }
  async handleSubmit() {
    let accounts = await web3.eth.getAccounts(console.log)

    this.props.campaigns.forEach(async campaign => {
      const newBlock = await factory.methods.createBlock(campaign.price).send({
        gas: 3000000,
        from: accounts[0]
      })
      const newContract = fundsTransfer(newBlock)

      emailCreator(
        campaign.email,
        campaign.price,
        newContract.setProvider._address
      )
    })
  }

  render() {
    //const campaigns = this.state.campaigns
    console.log('state', this.state)
    return (
      <div>
        <h1>Campaigns in Your Bundle</h1>
        {campaigns && campaigns.length ? (
          <div>
            <ul>
              {campaigns.map(campaign => {
                return <li>{campaign.name}</li>
              })}
            </ul>
            <button onClick={() => this.handleSubmit()}>Deploy Bundle</button>
          </div>
        ) : (
          <h2>No Campaigns In Your Bundle</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    campaigns: this.state.campaigns.campaignsInBudle
  }
}

const mapDispatch = dispatch => {
  return {
    getCampaigns: bundleId => dispatch(getCampaigns(bundleId))
  }
}
