import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button
} from '@material-ui/core'
import AdsGridList from './AdsGridList'
import CampaignsAccordion from './CampaignsAccordion'
import LoadingScreen from '../LoadingScreen'
import { postAd } from '../../store'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: 275
  },
  content: {
    paddingTop: 45
  }
})

class AllAds extends Component {
  handleSubmit(evt) {
    evt.preventDefault()
    const name = evt.target.name.value
    const advertiserId = this.props.currentUser.id
    const image = evt.target.image.value
    const url = evt.target.url.value
    const newAd = {
      advertiserId: advertiserId,
      name: name,
      image: image,
      url: url
    }
    this.props.createAd(newAd)
  }
  render() {
    const { classes, ads, handleSubmit } = this.props
    return (
      <div className="container">
        {ads &&
          ads.length && (
            <Grid container justify="center">
              <Grid item xs={10}>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <Button>
                        <Link
                          to={{
                            pathname: '/ads/new',
                            handleSubmit: handleSubmit
                          }}
                        >
                          New Advertisement
                        </Link>
                      </Button>
                    }
                    title="Advertisements"
                  />
                  <CardContent className={classes.content}>
                    <AdsGridList ads={ads} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    ads: state.ads.allAds,
    allCampaigns: state.campaigns.allCampaigns
  }
}

const mapDispatch = dispatch => {
  return {
    createAd: newAd => dispatch(postAd(newAd))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AllAds))
