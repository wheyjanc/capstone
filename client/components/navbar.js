import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 60
  },
  grow: {
    flexGrow: 1
  },
  buttonPadding: {
    bottomPadding: 3
  },
  navLinks: {
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'none'
  }
})

class Navbar extends Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="display1" color="inherit">
            <Link to="/home">
              <img src="/images/logo-4.png" width={55} />
            </Link>
          </Typography>
          {this.props.isLoggedIn ? (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {/* The navbar will show these links after you log in */}
              <Button
                className="hvr-underline-from-center"
                color="inherit"
                onClick={this.props.handleClick}
              >
                <Link className={classes.navLinks} to="/home">
                  Logout
                </Link>
              </Button>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {/* The navbar will show these links before you log in */}
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/signup">
                  Sign Up
                </Link>
              </Button>
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/login">
                  Login
                </Link>
              </Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
