import { setDestination, setCurrentLocation, setPassedCoordinates } from './locations'
import { setTrip } from './trips'

export default (dispatch: Function) => {
  return {
    setDestination: setDestination.bind(null, dispatch),
    setCurrentLocation: setCurrentLocation.bind(null, dispatch),
    setPassedCoordinates: setPassedCoordinates.bind(null, dispatch),
    setTrip: setTrip.bind(null, dispatch)
  }
}
