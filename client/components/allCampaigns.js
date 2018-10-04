import React, {Component} from 'react'
import {getAllCampaigns} from '../store'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import DisplayManyCampaigns from './displayManyCampaigns'

class AllCampaigns extends Component {
    async componentDidMount () {
        await this.props.getAllCampaigns()
    }
    render() {
        const campaigns = this.props.campaigns
        return (
            <div>
            <h2>All Campaigns</h2>
            <DisplayManyCampaigns campaigns = {campaigns}/>
            </div>
        )
    }
}

const mapState = state =>  {
    return {
       campaigns: state.campaigns.allCampaigns,
       //bundle: state.bundle.bundle
    }
}

const mapDispatch = dispatch => {
    return {
        getAllCampaigns: () => dispatch(getAllCampaigns())
    }
}

export default withRouter(
    connect(mapState, mapDispatch)(AllCampaigns)
    )