import initialState from '../initialState'

type actionType = {
  type: string
  payload: any
}

const TripReducer = (state: any = initialState, action: actionType) => {
  switch (action.type) {
    case 'SET_TRIPS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default TripReducer
