import axios from 'axios'

//action types

const GOT_ALL_CAMPAIGNS = 'GOT_ALL_CAMPAIGNS'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
const SET_ERROR_STATUS = 'SET_ERROR_STATUS'

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

export const setLoadingStatus = status => {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}

export const setErrorStatus = status => {
  return {
    type: SET_ERROR_STATUS,
    status
  }
}
//thunks

export function getAllCampaigns() {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const campaigns = await axios.get('/api/campaigns')
      dispatch(gotAllCampaigns(campaigns.data))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.campaigns }
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status
      }
    case SET_ERROR_STATUS:
      return {
        ...state,
        isError: action.status
      }
    default:
      return state
  }
}
