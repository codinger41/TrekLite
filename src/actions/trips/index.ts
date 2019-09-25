export const setTrip = (dispatch: Function, payload: any) => {
  if(payload) {
    return dispatch({
      type: 'SET_NEW_TRIP',
      payload
    })
  }
}
