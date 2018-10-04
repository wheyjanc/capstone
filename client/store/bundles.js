import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CAMPAIGNS = 'GOT_CAMPAIGNS'
const GOT_ADVERTISEMENTS = 'GOT_ADVERTISEMENTS'
const ADDED_TO_BUNDLE = 'ADD_TO_BUNDLE'
/**
 * INITIAL STATE
 */
const initialState = {
  campaigns: [],
  advertisements: [],
  bundle: []
}

/**
 * ACTION CREATORS
 */
export const gotCampaigns = campaigns => ({ type: GOT_CAMPAIGNS, campaigns })
export const gotAdvertisements = advertisements => ({
  type: GOT_ADVERTISEMENTS,
  advertisements
})
export const addedToBundle = campaign => ({ type: ADDED_TO_BUNDLE, campaign })

/**
 * THUNK CREATORS
 */
export function addToBundle(campaign, bundleid) {
  return async dispatch => {
    const bundleUpdated = await axios.put(`/api/bundles/${bundleid}`)
    const action = addedToBundle(bundleUpdated.data)
    dispatch(action)
  }
}
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

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_TO_BUNDLE: {
      const stateCopy = { ...initialState }
      return { ...stateCopy, bundle: [...stateCopy.bundle, action.campaign] }
    }
    case GOT_CAMPAIGNS:
      return { ...state, campaigns: action.campaigns }
    case GOT_ADVERTISEMENTS:
      console.log('in advertisements reducer')
      return { ...state, advertisements: action.advertisements }
    default:
      return state
  }
}
