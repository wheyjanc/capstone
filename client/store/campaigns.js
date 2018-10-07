import axios from 'axios'

//action types

const GOT_ALL_CAMPAIGNS = 'GOT_ALL_CAMPAIGNS'
const SET_SINGLE_CAMPAIGN = 'SET_SINGLE_CAMPAIGN'
const SET_CAMPAIGN = 'SET_CAMPAIGN'
const SET_CAMPAIGN_LOADING_STATUS = 'SET_CAMPAIGN_LOADING_STATUS'
const SET_CAMPAIGN_ERROR_STATUS = 'SET_CAMPAIGN_ERROR_STATUS'
const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'

//initial state

const initialState = {
  allCampaigns: [],
  singleCampaign: {},
  isLoading: {},
  isError: {}
}

//action creators

export const gotAllCampaigns = campaigns => ({
  type: GOT_ALL_CAMPAIGNS,
  campaigns
})

export const setSingleCampaign = campaign => ({
  type: SET_SINGLE_CAMPAIGN,
  campaign
})

export const setCampaign = campaign => ({
  type: SET_CAMPAIGN,
  campaign
})

export const createCampaign = campaign => ({
  type: CREATE_CAMPAIGN,
  campaign
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
      console.error(error)
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export const fetchSingleCampaign = campaignId => {
  return async dispatch => {
    try {
      dispatch(setCampaignLoadingStatus(true))
      const { data: campaign } = await axios.get(`/api/campaigns/${campaignId}`)
      dispatch(setSingleCampaign(campaign))
      dispatch(setCampaignLoadingStatus(false))
    } catch (error) {
      dispatch(setCampaignLoadingStatus(false))
      console.error(error)
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export const postCampaign = campaign => {
  return async dispatch => {
    try {
      const { data: newCampaign } = await axios.post('/api/campaigns', campaign)
      dispatch(createCampaign(newCampaign))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.campaigns }
    case SET_SINGLE_CAMPAIGN:
      return { ...state, singleCampaign: action.campaign }
    case SET_CAMPAIGN: {
      return { ...state, singleCampaign: action.campaign }
    }
    case CREATE_CAMPAIGN:
      return {
        ...state,
        allCampaigns: [...state.allCampaigns, action.campaign]
      }
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
