import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { updateUserOnServer } from '../../store/user'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

class AccountDetails extends Component {
  //   state = {
  //     firstName: this.props.currentUser.firstName,
  //     lastName: this.props.currentUser.lastName
  //   }
  constructor(props) {
    super(props)
    this.state = props.currentUser
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.state.id, this.state)
  }

  render() {
    const { classes } = this.props
    const user = this.state

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Grid container direction="row" spacing={40}>
          <Grid item xs={3} className={classes.accountDetails}>
            <Typography className={classes.formTitle} variant="title">
              Details
            </Typography>
            <TextField
              id="standard-name"
              label="First Name"
              name="firstName"
              className={classes.textField}
              value={user.firstName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Last Name"
              name="lastName"
              className={classes.textField}
              value={user.lastName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Email"
              name="email"
              className={classes.textField}
              value={user.email}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              name="password"
              className={classes.textField}
              type="password"
              value={user.password}
              autoComplete="current-password"
              margin="normal"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.formTitle} variant="title">
              Details
            </Typography>
            <TextField
              id="standard-firstName"
              label="First Name"
              name="firstName"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-lastName"
              label="Last Name"
              name="lastName"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-email"
              label="Email"
              name="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              name="password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button type="submit">Save</Button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updatedData) =>
      dispatch(updateUserOnServer(userId, updatedData))
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(AccountDetails)
)
