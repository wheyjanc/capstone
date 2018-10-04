import axios from 'axios'

//action types

const GOT_ALL_CAMPAIGNS = 'GOT_ALL_CAMPAIGNS'

//initial state

const initialState = {
    allCampaigns: []
}

//action creators

export const gotAllCampaigns = campaigns => ({
    type: GOT_ALL_CAMPAIGNS,
    campaigns
  })

  //thunks

  export function getAllCampaigns () {
    return async dispatch => {
      const campaigns = await axios.get('/api/campaigns')
      dispatch(gotAllCampaigns(campaigns.data))
    }
  }

  export default function(state = initialState, action) {
      switch(action.type) {
        case GOT_ALL_CAMPAIGNS:
        return {...state, allCampaigns: action.campaigns}
        default:
        return state
      }
  }