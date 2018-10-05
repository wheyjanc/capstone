import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'
import AccountDetails from '../account/AccountDetails'

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
]

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: '600px',
    maxHeight: 435
  }
})

class CreateCampaignDialog extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: props.value
    }
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.value)
  }

  handleOk = () => {
    this.props.onClose(this.state.value)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value, ...other } = this.props

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="600px"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <AccountDetails />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

CreateCampaignDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string
}

export default CreateCampaignDialog
