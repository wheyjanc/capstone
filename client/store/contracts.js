import axios from 'axios'
const GET_CONTRACT_FOR_USER = 'GET_CONTRACT_FOR_USER'

export const getContract = contract => {
  return {
    type: GET_CONTRACT_FOR_USER,
    contract
  }
}

export const fetchContract = userId => {
  return async dispatch => {
    try {
      const contract = await axios.get(`/contracts/${userId}/user`)
      dispatch(getContract(contract))
    } catch (error) {
      console.error(error)
    }
  }
}
const initialState = {
  currentUserContract: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACT_FOR_USER:
      return {
        ...state,
        currentUserContract: action.contract
      }
    default:
      return state
  }
}
