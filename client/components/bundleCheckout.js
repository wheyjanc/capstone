import React, {Component} from 'react'
import {connect} from 'react-redux'

class BundleCheckout extends Component {
    constructor() {
        super()
        //handleclick
    }

    render () {
        const campaigns = this.props.campaigns
        return (
            <div>
                <h1>Campaigns in Your Bundle</h1>
                {campaigns && campaigns.length ? (
                    <div>
                        <ul>
                            {campaigns.map(campaign => {
                                return (
                                    <li>{campaign.name}</li>
                                )
                            })}
                        </ul>
                        <button onClick = {() => this.handleSubmit()}>Deploy Bundle</button>
                        </div>) : 
                    (<h2>No Campaigns In Your Bundle</h2>
                )}
            </div>
        )
    }
}

const mapState = state => {
    return {
        capaigns: this.state.campaigns.campaignsInBudle
    }
}

const mapDispatch = dispatch => {
    return {
        getCampaigns: bundleId => dispatch(getCampaigns(bundleId))

    }
}