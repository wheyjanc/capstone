import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

const styles = theme => ({
  campaignTile: {
    background: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bolder',
    fontSize: '4em',
    textAlign: 'left',
    color: '#000'
  }
})

const CampaignGridList = props => {
  const { classes } = props
  const campaigns = props.campaigns
  return (
    <div>
      <GridList cellHeight={300} spacing={8} cols={4}>
        {campaigns.map(campaign => (
          <GridListTile className={classes.campaignTile} key={campaign.id}>
            <a href={`campaign/${campaign.id}`}>
              <GridListTileBar title={campaign.name} />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(CampaignGridList)
