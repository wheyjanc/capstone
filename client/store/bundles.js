import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CAMPAIGNS_IN_BUNDLE = 'GOT_CAMPAIGNS_IN_BUNDLE'
const GOT_ALL_BUNDLES = 'GOT_ALL_BUNDLES'
const SET_BUNDLE = 'SET_BUNDLE'

/**
 * INITIAL STATE
 */
const initialState = {
  campaignsInBundle: [],
  allBundles: [],
  bundle: {}
  
}

/**
 * ACTION CREATORS
 */
export const gotCampaignsInBundle = campaigns => ({ type: GOT_CAMPAIGNS_IN_BUNDLE, campaigns })

export const gotAllBundles = bundles => (
  {
    type: GOT_ALL_BUNDLES,
    bundles
  }
)

export const setBundleId = bundle => ({
  type: SET_BUNDLE,
  bundle
})



/**
 * THUNK CREATORS
 */
export function getCampaignsInBundle(id) {
  return async dispatch => {
    const bundle = await axios.get(`/api/bundles/${id}`)

    dispatch(gotCampaignsInBundle(bundle.data.campaigns))
  }
}

export function getAllBundles(userId) {
  return async dispatch => {
    const bundles = await axios.get(`/api/bundles/${userId}`)
    dispatch(gotAllBundles(bundles))
  }
}



export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMPAIGNS_IN_BUNDLE:
      console.log('in campaigns reducer')
      return { ...state, campaignsInBundle: action.campaigns }
      case GOT_ALL_BUNDLES: 
      return {...state, allBundles: action.bundles}
      case SET_BUNDLE:
      return {...state, bundle: action.bundle}
    default:
      return state
  }
}
