import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import axios from 'axios'
import { getCampaigns, getAdvertisements, getAdScript } from '../store/bundles'

class BundleCheckout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    console.log('hello we are here')
    await this.props.getCampaigns(1)
    await this.props.getAdvertisements(1)
  }
  async handleSubmit() {
    let accounts = await web3.eth.getAccounts(console.log)

    this.props.campaigns.forEach(async campaign => {
      const newBlock = await factory.methods.createBlock(campaign.price).send({
        gas: 3000000,
        from: accounts[0]
      })
      const newContract = fundsTransfer(newBlock)
      console.log('newContract', newContract)

      const sendEmail = (name, email, message) => {
        axios({
          method: 'POST',
          url: 'http://localhost:8080/api/send',
          data: {
            name: name,
            email: email,
            message: message
          }
        }).then(response => {
          if (response.data.msg === 'success') {
            this.props.history.push({
              pathname: '/scriptTag',
              bundleId: 1
            })

            //this.props.getAdScript(1)
            alert('Message Sent')
          } else if (response.data.msg === 'fail') {
            alert('Message failed to send.')
          }
        })
      }
      sendEmail('Tricia', 'tricia.lobo@gmail.com', 'test')
    })
  }

  render() {
    //const campaigns = this.state.campaigns
    console.log('state', this.state)
    const props = this.props
    console.log('props', props)
    const campaigns = this.props.campaigns
    console.log('props', campaigns)
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
  console.log('state', state)
  return {
    campaigns: state.bundles.campaigns
  }
}

const mapDispatch = dispatch => {
  return {
    getCampaigns: bundleId => dispatch(getCampaigns(bundleId)),
    getAdvertisements: id => dispatch(getAdvertisements(id)),
    getAdScript: id => dispatch(getAdScript(id))
  }
}
export default connect(mapState, mapDispatch)(BundleCheckout)
