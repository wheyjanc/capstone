import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import AdsGridList from './AdsGridList'
import AdsAccordion from './AdsAccordion'
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
    fontWeight: 'bolder'
  }
})

class AllAds extends Component {
  render() {
    const { classes } = this.props
    const ads = this.props.allAds
    const campaigns = this.props.allCampaigns
    console.log(campaigns)

    const loading = this.props.isLoading
    console.log(ads)

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
                  {/* <div className={classes.caption}>
                  <Typography variant="body2">
                    Get inspired and find products for your home. We have a huge
                    range of products in different styles, from vintage dressing
                    tables to modern kitchens. We also take care of those little
                    details that make all the difference - that’s why our home
                    accessories range includes rugs, candles and photo frames to
                    give the final touch to your décor.
                  </Typography>
                  <hr className={classes.divider} />
                </div> */}
                </Grid>
                <Grid item xs={5}>
                  <AdsAccordion campaigns={campaigns} />
                </Grid>
                <Grid item xs={7}>
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
