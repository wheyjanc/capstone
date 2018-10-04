import axios from 'axios'

// ACTION TYPES
const SET_ALL_ADS = 'SET_ALL_ADS'
const SET_SELECTED_AD = 'SET_SELECTED_AD'
const CREATE_NEW_AD = 'CREATE_NEW_AD'
const UPDATE_AD = 'UPDATE_AD'
const DELETE_AD = 'DELETE_AD'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
const SET_ERROR_STATUS = 'SET_ERROR_STATUS'

// ACTION CREATORS
export const setAllAds = ads => {
  return {
    type: SET_ALL_ADS,
    ads
  }
}

export const setSelectedAd = ad => {
  return {
    tyoe: SET_SELECTED_AD,
    ad
  }
}

export const createNewAd = ad => {
  return {
    type: CREATE_NEW_AD,
    ad
  }
}

export const updateAd = ad => {
  return {
    type: UPDATE_AD,
    ad
  }
}

export const deleteAd = ad => {
  return {
    type: DELETE_AD,
    ad
  }
}

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

// THUNK CREATORS
export const fetchAllAds = () => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: ads } = await axios.get('/api/ads')
      dispatch(setAllAds(ads))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const fetchSelectedAd = adId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: ad } = await axios.get(`/api/ads/${adId}`)
      dispatch(setSelectedAd(ad))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const postAd = ad => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: newAd } = await axios.post('/api/ads', ad)
      dispatch(createNewAd(ad))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const removeAd = adId => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: ad } = await axios.delete(`/api/ads/${adId}`)
      dispatch(deleteAd(ad))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

export const editAd = (adId, newAdData) => {
  return async dispatch => {
    try {
      dispatch(setLoadingStatus(true))
      const { data: ad } = await axios.put(`/api/ads/${adId}`, newAdData)
      dispatch(updateAd(ad))
      dispatch(setLoadingStatus(false))
    } catch (error) {
      dispatch(setLoadingStatus(false))
      dispatch(setErrorStatus(true))
    }
  }
}

const initialState = {
  isLoading: true,
  allAds: [],
  selectedAd: {},
  isError: {}
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ADS:
      return {
        ...state,
        allAds: action.ads
      }
    case SET_SELECTED_AD:
      return {
        ...state,
        selectedAd: action.ad
      }
    case CREATE_NEW_AD:
      return {
        ...state,
        allAds: [...state.allAds, action.ad]
      }

    case UPDATE_AD:
      return {
        state,
        selectedAd: action.ad,
        allAds: state.allAds.map(ad => {
          if (ad.id === action.id) {
            console.log('UPDATED!')
            ad = action.ad
            return ad
          } else {
            return ad
          }
        })
      }
    case DELETE_AD:
      return {
        ...state,
        allAds: state.allAds.filter(ad => ad.id !== action.adId)
      }

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
