import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { updateUserOnServer } from '../../store/user'
import {
  Select,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core'

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

class CreateCampaignForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      demographics: []
    }
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
              New Campaign
            </Typography>
            <TextField
              id="standard-name"
              label="Campaign Name"
              name="name"
              className={classes.textField}
              value={user.firstName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Price"
              name="price"
              className={classes.textField}
              value={user.lastName}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.formTitle} variant="title">
              Demographics
            </Typography>
          </Grid>
        </Grid>
        <Button type="submit">Save</Button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updatedData) =>
      dispatch(updateUserOnServer(userId, updatedData))
  }
}

CreateCampaignForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(null, mapDispatch)(CreateCampaignForm)
)
