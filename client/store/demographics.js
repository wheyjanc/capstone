import axios from 'axios'

// ACTION TYPES
const SET_ALL_DEMOGRAPHICS = 'SET_ALL_DEMOGRAPHICS'
const SET_SELECTED_DEMOGRAPHICS = 'SET_SELECTED_DEMOGRAPHICS'
const DELETE_DEMOGRAPHIC = 'DELETE_DEMOGRAPHIC'

// ACTION CREATORS
export const setAllDemographics = demographics => {
  return {
    type: SET_ALL_DEMOGRAPHICS,
    demographics
  }
}

// THUNKS
export const fetchAllDemographics = () => {
  return async dispatch => {
    try {
      const { data: demographics } = await axios.get('/api/demographics')
      dispatch(setAllDemographics(demographics))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  allDemographics: [],
  selectedDemographics: [],
  isLoading: true,
  isError: {}
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_DEMOGRAPHICS:
      return {
        ...state,
        allDemographics: action.demographics
      }
    default:
      return state
  }
}
