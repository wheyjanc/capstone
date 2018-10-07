import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core'
import AdsGridList from '../ads/AdsGridList'
import CampaignsAccordion from '../ads/CampaignsAccordion'
import LoadingScreen from '../LoadingScreen'
import CampaignsList from './CampaignsList'
import SingleCampaign from './SingleCampaign'
import { fetchSingleCampaign, setCampaign, getAllCampaigns } from '../../store'
import history from '../../history'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  heading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  caption: {
    textAlign: 'left',
    width: 475,
    padding: 20,
    margin: 'auto'
  },
  divider: {
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  titleText: {
    color: '#000',
    fontSize: '28px',
    fontWeight: 'bolder'
  }
})

class AdvertiserCampaigns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      selectedCampaign: props.allCampaigns[0]
    }

    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  handleListItemClick = (event, index, campaign) => {
    this.setState({ selectedIndex: index })
    this.props.loadSingleCampaign(campaign.id)
    history.push(`/campaigns/${campaign.id}`)
  }

  render() {
    const { classes, allCampaigns, allAds, loadSingleCampaign } = this.props
    const selectedCampaign = this.state.selectedCampaign
    console.log(this.state.selectedCampaign)
    return (
      <div className="container">
        {allCampaigns &&
          allCampaigns.length && (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <CampaignsList
                    campaigns={allCampaigns}
                    loadSingleCampaign={loadSingleCampaign}
                    handleListItemClick={this.handleListItemClick}
                    selectedIndex={this.state.selectedIndex}
                  />
                </Grid>
                <Grid item xs={9}>
                  <h1>selected campaign placeholder</h1>
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allAds: state.ads.allAds,
    allCampaigns: state.campaigns.allCampaigns,
    selectedCampaign: state.campaigns.allCampaigns[0]
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllCampaigns: () => {
      dispatch(getAllCampaigns())
    },
    loadSingleCampaign: campaignId => {
      dispatch(fetchSingleCampaign(campaignId))
    },
    fetchCampaign: campaign => {
      dispatch(setCampaign(campaign))
    }
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(AdvertiserCampaigns)
)
