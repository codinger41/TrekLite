export const setTrip = (dispatch: Function, payload: any) => {
  if (payload) {
    return dispatch({
      type: 'SET_TRIPS',
      payload
    })
  }
}
