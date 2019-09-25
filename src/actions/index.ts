import { setDestination } from './locations'


export default (dispatch: Function) => {
  return {
    setDestination: setDestination.bind(null, dispatch)
  }
}
