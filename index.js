const { getWeatherData, getGeoData, sampleState } = require('./sample.js')
const init = async () => {
  await Promise.resolve(getWeatherData())
  await Promise.resolve(getGeoData())
  return sampleState
}

init().then(() => {
  console.log('sampleState', sampleState)
})