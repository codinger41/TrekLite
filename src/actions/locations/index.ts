export const setDestination = (dispatch: Function, location: any) => {
  if (location) {
    return dispatch({
      type: 'SET_DESTINATION',
      location
    })
  }
}

export const setCurrentLocation = (dispatch: Function, location: any) => {
  if (location) {
    return dispatch({
      type: 'SET_CURRENT_LOCATION',
      location
    })
  }
}

export const setPassedCoordinates = (dispatch: Function, location: any) => {
  if (location) {
    return dispatch({
      type: 'SET_CURRENT_LOCATION',
      location
    })
  }
}
