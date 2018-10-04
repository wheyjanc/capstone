import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import Grid from '@material-ui/core/Grid'
import AllAds from '../ads/AllAds'

const styles = theme => ({
  sideMenu: {
    width: '100%',
    maxWidth: 178,
    backgroundColor: theme.palette.background.paper
  },
  logoutButton: {
    color: '#d33300'
  },
  listSubHead: {
    color: '#000',
    fontSize: '26px',
    fontWeight: 'bold'
  }
})

class AdvertiserDashboard extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container spacing={0}>
        <Grid className={classes.sideMenu} item xs={1}>
          <List
            component="nav"
            subheader={
              <ListSubheader className={classes.listSubHead} component="div">
                Menu
              </ListSubheader>
            }
          >
            <ListItem button component={Link} to="/ads">
              Ads
            </ListItem>
            <ListItem button component={Link} to="/campaigns">
              Campaigns
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={11}>
          <AllAds />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(
  connect(null, mapDispatch)(AdvertiserDashboard)
)
