import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  logoutButton: {
    color: '#d33300'
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
      <div className={classes.root}>
        <List component="nav">
          <ListItemIcon />
        </List>
      </div>
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
