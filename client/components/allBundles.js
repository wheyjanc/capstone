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
        selectedIndex: 1,
      };
    
      handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
        this.props.setBundle(event.value)
      };

      async componentDidMount() {
          await this.props.me()
          await this.props.getAllBundles(this.props.user.id)
      }

      render() {
        const { classes } = this.props;
        let index = -1
        return (
            this.props.bundles && this.props.bundles.length ?
          <div className={classes.root}>
            <List component="nav">
            {this.props.bundles.map(bundle => {
                index++
                return (
                    <ListItem
                    key = {bundle.id}
                    button
                    selected={this.state.selectedIndex === index}
                    value = {bundle}
                    onClick={event => this.handleListItemClick(event, index)}
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
        user: state.user,
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