import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Select,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core'

class EditCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      price: props.price
    }
  }
}

const mapState = state => {
  return {
    selectedCampaign: state.campaigns.singleCampaign
  }
}

export default withStyles(styles)(connect(mapState)(EditCampaign))
