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
  Payment
  AllCampaigns,
  AllBundles,
} from './components'
import { fetchAllAds } from './store/ads'
import Ethereum from './components/ethereum'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.loadAllAds()
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

        <Route path="/payment" component={Payment} />


        <Route path = "/allcampaigns" component = {AllCampaigns} />
        <Route path = "/allbundles" component = {AllBundles}  />


        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            <Route
              path="/advertiser-dashboard"
              component={AdvertiserDashboard}
            />
            <Route exact path="/ads" component={AllAds} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
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
    isLoggedIn: !!state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadAllAds: () => dispatch(fetchAllAds())
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
