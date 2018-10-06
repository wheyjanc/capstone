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
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'
import CreateCampaignForm from './CreateCampaignForm'

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
  },
  dialogButtons: {
    justifyContent: 'center'
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
    const { value, classes, ...other } = this.props

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">New Campaign</DialogTitle>
        <Grid container direction="column">
          <Grid item xs={12}>
            <DialogContent>
              <CreateCampaignForm />
            </DialogContent>
          </Grid>
          <Grid>
            <DialogActions className={classes.dialogButtons}>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleOk} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

CreateCampaignDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string
}

export default withStyles(styles)(CreateCampaignDialog)
