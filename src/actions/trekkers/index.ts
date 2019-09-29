export const setTrekkers = (dispatch: Function, payload: any) => {
  if (payload) {
    return dispatch({
      type: 'SET_TREKKERS',
      payload
    })
  }
}
