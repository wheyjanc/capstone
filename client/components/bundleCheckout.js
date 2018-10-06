import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import axios from 'axios'
import {
  getCampaignsInBundle,
  getAdvertisements,
  getAdScript
} from '../store/bundles'
import { withRouter } from 'react-router-dom'
class BundleCheckout extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }
  async componentDidMount() {
    // await this.props.getCampaigns(1)
    await this.props.getAdvertisements(1)
    await this.props.getCampaignsInBundle(1)
  }
  async handleSubmit() {
    let contractsarr = []
    let accounts = await web3.eth.getAccounts(console.log)

    this.props.campaigns.forEach(async campaign => {
      const newBlock = await factory.methods.createBlock(campaign.price).send({
        gas: 3000000,
        from: accounts[0]
      })
      const newContract = fundsTransfer(newBlock)
      console.log('newContract', newContract.options.blockHash)
      console.log('campaign', campaign)
      //this is where database call for contract goes
      // await axios.post('http://localhost:8080/api/contracts', {
      //   campaignId: campaign.id,
      //   bundleId: 1,
      //   contractHash: newContract.options.blockHash,
      //   balance: campaign.price,
      //   advertiserId: campaign.advertiser.id,
      //   devId: this.props.devId
      // })

      const createContract = () => {
        axios({
          method: 'POST',
          url: 'http://localhost:8080/api/contracts',
          data: {
            campaignId: campaign.id,
            bundleId: 1,
            contractHash: newContract.options.blockHash,
            balance: campaign.price,
            advertiserId: campaign.advertiser.id,
            devId: this.props.devId
          }
        }).then(response => {
          console.log('response', response)
          contractsarr.push(response.data.contractHash)
          // this.setState({
          //   contracts: [response.data.contractHash]
          // })
        })

        // console.log('response', response)
        // console.log('state', this.state)
      }
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
            //this.props.getAdScript(1)
            alert('Message Sent')
          } else if (response.data.msg === 'fail') {
            alert('Message failed to send.')
          }
        })
      }
      axios
        .all([createContract(), sendEmail()])
        .then(
          axios.spread(function(contract, email) {
            //
          })
        )
        .then(() =>
          this.props.history.push({
            pathname: '/scriptTag',
            bundleId: 1,
            state: { contractsArray: contractsarr }
          })
        )

      //sendEmail('Tricia', 'tricia.lobo@gmail.com', 'test')
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
                return <li key={campaign.id}>{campaign.name}</li>
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
    campaigns: state.bundles.campaignsInBundle,
    devId: state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    // getCampaigns: bundleId => dispatch(getCampaigns(bundleId)),
    getAdvertisements: id => dispatch(getAdvertisements(id)),
    getAdScript: id => dispatch(getAdScript(id)),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId))
  }
}
export default connect(mapState, mapDispatch)(BundleCheckout)
