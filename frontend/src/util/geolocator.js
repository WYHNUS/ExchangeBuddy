export function geoListener(callback) {
  return navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => callback(coords),
    (err) => console.log('Unable to find position - ' + err.message),
    {
      enableHighAccuracy: true,
      timeout: 15000
    }
  )
}
