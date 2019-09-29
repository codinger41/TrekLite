import {
  setDestination,
  setCurrentLocation,
  setPassedCoordinates
} from './locations'
import { setTrip } from './trips'
import { setTrekkers } from './trekkers'

export default (dispatch: Function) => {
  return {
    setDestination: setDestination.bind(null, dispatch),
    setCurrentLocation: setCurrentLocation.bind(null, dispatch),
    setPassedCoordinates: setPassedCoordinates.bind(null, dispatch),
    setTrip: setTrip.bind(null, dispatch),
    setTrekkers: setTrekkers.bind(null, dispatch)
  }
}
