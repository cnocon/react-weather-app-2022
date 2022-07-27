require('dotenv').config()
// const sampleWeatherDataStatic = require('./sampleWeatherData.js')
// const sampleGeoDataStatic = require('./sampleGeoData.js')
const axios = require('axios')
const lon = 12.09
const lat = 38.8
const sampleState = {
  units: 'imperial',
  lat: null,
  lon: null,
  weatherEndpoint: null,
  weatherData: null,
  geoEndpoint: null,
  geoData: null,
  selectedLanguage: 'en',
  query: 'Lake Oswego',
  stateInput: 'Oregon',
  country: 'US'
}

/**
* sampleWeatherEndpoint should look like:
* https://api.openweathermap.org/data/3.0/onecalllat=38.8&lon=12.09&exclude=minutely&appid=<APPID>&lang=${sampleState.selectedLanguage}&units=imperial
*/
const sampleBaseUrl = 'https://api.openweathermap.org/data/3.0'
/*
response {
  status: 200,
  statusText: 'OK',
  headers: {
    server: 'openresty',
    date: 'Wed, 27 Jul 2022 09:19:35 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '17215',
    connection: 'close',
    'x-cache-key': '/data/3.0/onecall?exclude=minutely&lang=en&lat=38.8&lon=12.09&units=imperial',
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-methods': 'GET, POST'
  },


*/



const queryString = `?lat=${lat}&lon=${lon}&exclude=minutely&limit=7&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=${encodeURIComponent(sampleState.units)}&lang=${sampleState.selectedLanguage}`
sampleState.weatherEndpoint = `${sampleBaseUrl}/onecall${queryString}`
const getWeatherData = async () => {
  // NOTE: API Response Field Definitions at https://openweathermap.org/api/one-call-3#parameter
  await axios.get(sampleState.weatherEndpoint).then((response) => {
    try {
      sampleState.weatherData = response.data
    } catch(error) {
      console.error('ERROR: Unable to set state with weather response data', error)
    }
  }).catch((error) => {
    console.error('ERROR: Weather API Request Failure\n', error)
  })
}





/*
Get Lat & Lon with Query String
*/
// http://api.openweathermap.org/geo/1.0/direct?q=Dhaka&limit=5&appid=<APPID>
sampleState.geoEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(sampleState.query)}&lang=${sampleState.selectedLanguage}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`

const getGeoData = async () => {
  await axios.get(sampleState.geoEndpoint).then((response) => {
    try {
      sampleState.geoData = response.data
    } catch(error) {
      console.error('ERROR: Unable to set state with geo response data', error)
  }
  }).catch((error) => {
    console.error('ERROR: Weather API Request Failure\n', error)
  })
}
getGeoData()

module.exports = {
  lat,
  lon,
  sampleBaseUrl,
  getWeatherData,
  getGeoData,
  sampleState,
}






/*
********************************************************************************
* HOW TO GET WEATHER ICON URL
********************************************************************************
* See a full list of codes at:
* https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
*
* Ex: For code 500 - light rain icon = "10d", the endpoint would be:
* http://openweathermap.org/img/wn/10d@2x.png or at
* https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
*
* Sample data for Weather Icon URL creation:
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10n"
    }
  ]*/


/*******************************************************************************
* Translate Weather Condition Codes into Icons paths ***************************
********************************************************************************
* API Response Field Definitions at:
* https://openweathermap.org/api/one-call-3#parameter */


/*******************************************************************************
* List of Weather Condition Codes and Icons ************************************
********************************************************************************
* For weather icons and weather condition codes, visit OpenWeather's Docs at
* https://openweathermap.org/api/one-call-3#list1
*
* Sample Response from API:
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10n"
    }
  ]*/



/*******************************************************************************
 * Callback Fn for JS Code *****************************************************
********************************************************************************
 *
 * URI: https://openweathermap.org/api/one-call-3#callback=testCallback
 *
 * @TODO [IMPORTANT]
 * DECODE URI COMPONENTS BACK INTO NORMAL STRINGS w/THIS CALLBACK PARAMETER */