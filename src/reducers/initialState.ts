const initialState: object = {
  locations: {
    currentLocation: null,
    currentAddress: null,
    destination: null,
    passedCoordinates: []
  },
  trips: {
    distance: null,
    estimatedTime: null,
    started: false,
    currentTrip: null
  }
}

export default initialState
