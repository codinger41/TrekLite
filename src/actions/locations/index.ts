export const setDestination = (dispatch: Function, location: any) => {
  console.log('action fired')
  if(location) {
    return dispatch({
      type: 'SET_DESTINATION',
      location
    })
  }
}
