import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LoadingScreen from '../LoadingScreen'
import CampaignExpansionPanel from './CampaignExpansionPanel'
import CreateCampaignDialog from './CreateCampaignDialog'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

class CampaignsAccordionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expanded: null
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = value => {
    this.setState({ value, open: false })
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state
    const campaigns = this.props.campaigns
    console.log('campaigns', campaigns)
    let panelIndex = 1
    return (
      campaigns && (
        <div className={classes.root}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="title">Campaigns</Typography>
            </Grid>
            <Grid item xs={12}>
              {campaigns &&
                campaigns.length &&
                campaigns.map(campaign => {
                  const index = panelIndex
                  panelIndex++
                  return (
                    <ExpansionPanel
                      expanded={expanded === `panel${index}`}
                      onChange={this.handleChange(`panel${index}`)}
                      key={campaign.id}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          {campaign.name}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <CampaignExpansionPanel campaign={campaign} />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
            </Grid>
            <Button onClick={this.handleOpen}>Create a campaign</Button>
            <CreateCampaignDialog
              open={this.state.open}
              onClose={this.handleClose}
              campaigns={campaigns}
            />
          </Grid>
        </div>
      )
    )
  }
}

CampaignsAccordionModal.propTypes = {
  classes: PropTypes.object.isRequired
}

// We need an intermediary variable for handling the recursive nesting.
const CampaignsAccordion = withStyles(styles)(CampaignsAccordionModal)

export default withStyles(styles)(CampaignsAccordion)
