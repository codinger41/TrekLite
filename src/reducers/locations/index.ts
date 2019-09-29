import initialState from '../initialState'

type actionType = {
  type: string
  location: object
}

const LocationReducer = (state: any = initialState, action: actionType) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        ...action.location
      }
    case 'SET_DESTINATION':
      return { ...state, destination: action.location }
    case 'SET_NEW_COORDINATE':
      return {
        ...state,
        passedCoordinates: state.passedCoordinates.concat(action.location)
      }
    default:
      return state
  }
}

export default LocationReducer
