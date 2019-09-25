import initialState from '../initialState'


type actionType = {
  type: string
  location: object
}

const LocationReducer = (state: object = initialState, action: actionType) => {
  console.log({
    text: 'reducer received',
    action
  })
  console.log({ state })
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.location }
    case 'SET_DESTINATION':
      return { ...state, destination: action.location }
    default:
      return state
  }
}

export default LocationReducer
