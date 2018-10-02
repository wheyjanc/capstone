import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CAMPAIGNS = 'GOT_CAMPAIGNS'
/**
 * INITIAL STATE
 */
const initialState = {
  campaigns: []
}

/**
 * ACTION CREATORS
 */
export const gotCampaigns = campaigns => ({ type: GOT_CAMPAIGNS, campaigns })

/**
 * THUNK CREATORS
 */
export function getCampaigns(id) {
  return async dispatch => {
    const bundle = await axios.get(`/api/bundles/${id}`)

    dispatch(gotCampaigns(bundle.data.campaigns))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMPAIGNS:
      console.log('in campaigns reducer')
      return { ...state, campaigns: action.campaigns }
    default:
      return state
  }
}
