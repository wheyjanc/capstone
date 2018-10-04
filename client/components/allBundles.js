import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllBundles, setBundle, me} from '../store'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

class Bundles extends Component {
    state = {
        selectedIndex: 0,
      };
    
      handleListItemClick = (event, index, bundle) => {
        console.log('CLICK index', index)
        this.setState({ selectedIndex: index });
        this.props.setBundle(bundle)
      };

      async componentDidMount() {
          console.log('PROPS', this.props)
          await this.props.me()
          await this.props.getAllBundles(this.props.user.id)
          await this.props.setBundle(this.props.bundles[0])
      }

      render() {
        const { classes } = this.props;
        let index = 0
        return (
            this.props.bundles && this.props.bundles.length ?
          <div className={classes.root}>
            <List component="nav">
            {this.props.bundles.map(bundle => {
                const indexValue = index
                index++
                return (
                    <ListItem
                    key = {bundle.id}
                    button
                    selected={this.state.selectedIndex === indexValue}
                    // value = {bundle}
                    onClick={event => this.handleListItemClick(event, indexValue, bundle)}
                  >
                    <ListItemText primary={bundle.projectName} />
                  </ListItem> 
                )
            })}
            </List>
        </div> : null
        )}

}

const mapState = state => {
    console.log('STATE.user', state.user)
    return {
        user: state.user.currentUser,
        bundles: state.bundles.allBundles,
        selectedBundle: state.bundles.bundle
    }
}

const mapDispatch = dispatch => {
    return {
        getAllBundles: userId => dispatch(getAllBundles(userId)),
        setBundle: bundle => dispatch(setBundle(bundle)),
        me: () => dispatch(me())
    }
}

Bundles.propTypes = {
    classes: PropTypes.object.isRequired
}

const Bundlewrapped = withRouter(connect(mapState, mapDispatch)(Bundles))

export default withStyles(styles)(Bundlewrapped)