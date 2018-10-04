import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  adTile: {
    background: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bolder',
    fontSize: '4em',
    textAlign: 'left',
    color: '#000'
  }
})

const AdsGridList = props => {
  const { classes } = props
  const ads = props.ads
  return (
    <div>
      <GridList cellHeight={300} spacing={8} cols={4}>
        {ads.map(ad => (
          <GridListTile className={classes.adTile} key={ad.id}>
            <img src={ad.image} alt={ad.name} />
            <a href={`products/${ad.id}`}>
              <GridListTileBar title={ad.name} />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(AdsGridList)
