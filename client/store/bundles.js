import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CAMPAIGNS = 'GOT_CAMPAIGNS'
const GOT_ADVERTISEMENTS = 'GOT_ADVERTISEMENTS'
const AD_SCRIPT = 'AD_SCRIPT'
/**
 * INITIAL STATE
 */
const initialState = {
  campaigns: [],
  advertisements: [],
  adScript: {}
}

/**
 * ACTION CREATORS
 */
export const gotCampaigns = campaigns => ({ type: GOT_CAMPAIGNS, campaigns })
export const gotAdvertisements = advertisements => ({
  type: GOT_ADVERTISEMENTS,
  advertisements
})
export const gotAdScript = adscript => ({
  type: AD_SCRIPT,
  adscript
})

/**
 * THUNK CREATORS
 */
export function getCampaigns(id) {
  return async dispatch => {
    const bundle = await axios.get(`/api/bundles/${id}`)

    dispatch(gotCampaigns(bundle.data.campaigns))
  }
}

export function getAdvertisements(id) {
  return async dispatch => {
    const advertisements = await axios.get(`/api/dev/bundle/${id}`)
    dispatch(gotAdvertisements(advertisements.data))
  }
}

export function getAdScript(bundleid) {
  return async dispatch => {
    const adScript = await axios.get(`/api/dev/bundle/${bundleid}/adscript`)
    dispatch(gotAdScript(adScript))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMPAIGNS:
      return { ...state, campaigns: action.campaigns }
    case GOT_ADVERTISEMENTS:
      console.log('in advertisements reducer')
      return { ...state, advertisements: action.advertisements }
    default:
      return state
  }
}
