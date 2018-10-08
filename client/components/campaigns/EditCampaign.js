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

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: 275
  },
  content: {
    paddingTop: 45
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    justifyContent: 'start'
  }
}

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
