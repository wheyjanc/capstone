import axios from 'axios'

const GET_CONTRACT_FOR_USER = 'GET_CONTRACT_FOR_USER'
const initialState = {
  currentUserContract: {}
}

const getContract = contract => {
  return {
    type: GET_CONTRACT_FOR_USER,
    contract
  }
}

export const fetchContract = userId => {
  console.log('IN THUNK')
  return async dispatch => {
    try {
      const contractuser = await axios.get(`/api/contracts/${userId}/user`)
      console.log('contract', contractuser.data)
      dispatch(getContract(contractuser.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACT_FOR_USER:
      console.log('action', action)
      return { ...state, currentUserContract: action.contract }

    default:
      return state
  }
}
