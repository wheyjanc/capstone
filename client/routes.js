import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  SignUp,
  UserHome,
  Home,
  AdvertiserDashboard,
  AllAds,
  BundleCheckout,
  ScriptTag,
  Payment,
  AllCampaigns,
  AllBundles,
  AccountMenu,
  LoadingScreen,
  AdvertiserCampaigns,
  SingleCampaign,
  EditCampaign
} from './components'
import Ethereum from './components/ethereum'
import {
  me,
  getAllCampaigns,
  fetchAllDemographics,
  fetchAllAds,
  fetchSingleCampaign,
  fetchAllUserCampaigns
} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.loadAllAds()
    // await this.props.loadAllUserCampaigns(this.props.currentUser.id)
    await this.props.loadAllDemographics()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/ethereum" component={Ethereum} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkout" component={BundleCheckout} />
        <Route path="/scriptTag" component={ScriptTag} />
        <Route path="/allcampaigns" component={AllCampaigns} />
        <Route path="/allbundles" component={AllBundles} />
        <Route path="/payment" component={Payment} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            <Route
              path="/advertiser-dashboard"
              component={AdvertiserDashboard}
            />
            <Route path="/account" component={AccountMenu} />
            <Route exact path="/ads" component={AllAds} />
            <Route
              exact
              path="/campaigns/user/:userId"
              component={AdvertiserCampaigns}
            />
            <Route
              exact
              path="/campaigns/campaign/:campaignId"
              component={SingleCampaign}
            />
            <Route
              exact
              path="/campaign/campaign/:campaignId/edit"
              component={EditCampaign}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={LoadingScreen} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.currentUser.id,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadAllAds: () => dispatch(fetchAllAds()),
    loadAllUserCampaigns: userId => dispatch(fetchAllUserCampaigns(userId)),
    loadAllDemographics: () => dispatch(fetchAllDemographics())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
