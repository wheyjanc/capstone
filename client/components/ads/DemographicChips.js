import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import { fetchAllDemographics } from '../../store'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
})

class DemographicChips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDemographics: props.demographics,
      selectedDemographics: [],
      selectedDemographic: ''
    }
  }

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.allDemographics]
      const chipToDelete = chipData.indexOf(data)
      chipData.splice(chipToDelete, 1)
      return { chipData }
    })
  }

  handleClick = event => {
    console.log(event.target.value)
    // this.setState(state => {
    //   const chipData = [...state.selectedDemographics]
    //   //   chipData.push(event.target.value)
    //   return { chipData }
    // })
    this.setState({ selectedDemographic: event.target.value })
    console.log(this.state.selectedDemographics)
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        {this.state.allDemographics.map(data => {
          let icon = null
          return (
            <Chip
              key={data.id}
              icon={icon}
              label={data.name}
              value={data.name}
              onClick={this.handleClick}
              className={classes.chip}
            />
          )
        })}
      </Paper>
    )
  }
}

DemographicChips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DemographicChips)
