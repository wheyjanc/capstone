import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGNS = 'GET_CAMPAIGNS'

/**
 * INITIAL STATE
 */
const initialState = {
  campaigns: []
}

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({ type: GET_CAMPAIGNS, campaigns })

/**
 * THUNK CREATORS
 */
// export const getCampaigns = campaigns => {
//waiting on route
// return async dispatch=>{
//const campaigns = await axios.get(campaigns where user id = curent id....)
// }
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return { ...state, campaigns: action.campaigns }
    default:
      return state
  }
}
