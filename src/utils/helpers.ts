type Deltas = {
  latitudeDelta: number
  longitudeDelta: number
}

export const getDelta = (
  lat: number,
  lng: number,
  distance: number
): Deltas => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
  const longitudeDelta =
    distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)))

  return {
    latitudeDelta,
    longitudeDelta
  }
}
