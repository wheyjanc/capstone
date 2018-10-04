import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {getAllCampaigns} from '../store'

const bundle = {
    name: 'Bundle1'
}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });

 class DisplayManyCampaigns extends Component {
     constructor () {
         super()
         //bind handleclick
     }

     render() {
         const campaigns = this.props.campaigns
         const {classes}= this.props
         return (
            (campaigns && campaigns.length) ? 
             <div>
            <GridList cellHeight = {100} className = {classes.gridList}>
                <GridListTile key="Subheader" cols = {1} style = {{height: 'auto'}}>
                    <ListSubheader component = 'div'>Browse Campaigns for Project {this.props.bundle.projectName}</ListSubheader>
                </GridListTile>    
                {campaigns.map(campaign => (
                    <GridListTile key = {campaign.id}>
                    <img src = {campaign.img} alt = {campaign.title} />
                    <GridListTileBar
                    key= {campaign.id}
                    title = {campaign.name}
                    subtitle = {<span> price: {campaign.price}</span>}
                    actionIcon = {
                        <IconButton className = {classes.icon}/>
                    }
                    />
                    </GridListTile>
                ))}
            </GridList>
            </div> : null
         )
     }
 }

DisplayManyCampaigns.propTypes = {
    classes: PropTypes.object.isRequired
}

 const mapState = state =>  {
     return {
        //campaigns: state.campaigns.allCampaigns,
        bundle: state.bundles.bundle
     }
 }

//  const mapDispatch = dispatch => {
//      return {
//          getAllCampaigns: () => dispatch(getAllCampaigns())
//      }
//  }

 const component = withRouter(connect(mapState)(DisplayManyCampaigns))

 export default withStyles(styles)(component)