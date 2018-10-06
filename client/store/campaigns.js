import axios from 'axios'

//action types

const GOT_ALL_CAMPAIGNS = 'GOT_ALL_CAMPAIGNS'
const SET_CAMPAIGN_LOADING_STATUS = 'SET_CAMPAIGN_LOADING_STATUS'
const SET_CAMPAIGN_ERROR_STATUS = 'SET_CAMPAIGN_ERROR_STATUS'

//initial state

const initialState = {
  allCampaigns: [],
  isLoading: {},
  isError: {}
}

//action creators

export const gotAllCampaigns = campaigns => ({
  type: GOT_ALL_CAMPAIGNS,
  campaigns
})

export const setCampaignLoadingStatus = status => {
  return {
    type: SET_CAMPAIGN_LOADING_STATUS,
    status
  }
}

export const setCampaignErrorStatus = status => {
  return {
    type: SET_CAMPAIGN_ERROR_STATUS,
    status
  }
}

//thunks

export function getAllCampaigns() {
  return async dispatch => {
    try {
      dispatch(setCampaignLoadingStatus(true))
      const campaigns = await axios.get('/api/campaigns')
      dispatch(gotAllCampaigns(campaigns.data))
      dispatch(setCampaignLoadingStatus(false))
    } catch (error) {
      dispatch(setCampaignLoadingStatus(false))
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.campaigns }
    case SET_CAMPAIGN_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status
      }
    case SET_CAMPAIGN_ERROR_STATUS:
      return {
        ...state,
        isError: action.status
      }
    default:
      return state
  }
}
