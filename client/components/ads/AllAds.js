import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core'
import AdsGridList from './AdsGridList'
import CampaignsAccordion from './CampaignsAccordion'
import LoadingScreen from '../LoadingScreen'

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

class AllAds extends Component {
  render() {
    const { classes } = this.props
    const ads = this.props.allAds
    const campaigns = this.props.allCampaigns
    return (
      <div className="container">
        {ads &&
          ads.length && (
            <div>
              <Grid container spacing={24}>
                <Grid className={classes.heading} item xs={12}>
                  <Typography className={classes.titleText} variant="display2">
                    Advertisements
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {/* <CampaignsAccordion campaigns={campaigns} /> */}
                </Grid>
                <Grid item xs={9}>
                  <AdsGridList ads={ads} />
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
    allCampaigns: state.campaigns.allCampaigns
  }
}

export default withStyles(styles)(connect(mapState)(AllAds))
