//the view for devs - previous projects
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPreviousContracts } from '../store/contracts'

class PreviousProjects extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.getPreviousContracts(this.props.currentUser.id)
  }
  render() {
    let previousContracts = this.props.previousContracts.data
    console.log('previouscontracts', previousContracts)
    // let contractsmap = previousContracts.map(contract => (
    //   <ul>
    //     <li>{contract.contractHash} </li>
    //     <li>{contract.balance} </li>
    //     <li>{contract.clickCount} </li>
    //     {/* <li>{contract.campaign.name}</li> */}
    //   </ul>
    // ))
    return 'hello, we are here'
  }
}

const mapState = state => {
  return {
    previousContracts: state.contracts.previousContracts,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    getPreviousContracts: currentUserId =>
      dispatch(getPreviousContracts(currentUserId))
  }
}

export default connect(mapState, mapDispatch)(PreviousProjects)
