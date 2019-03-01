'use strict'

const request = require('request')
const {apiKey} = require('./config/openWeatherMap')
const {isValidJson} = require('./helpers/validator')

const locationData = ['portland', '97035']

const getWeather = async () => {
  try {
    const [city, zipCode] = locationData
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&zip=${zipCode}&appid=${apiKey}`
    const weatherData = await getDataFromOpenWeatherMap(url)
    return weatherData
  } catch (err) {
    throw err
  }
}

const getDataFromOpenWeatherMap = url => {
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if (err) return reject(new Error(err))
      const isValidBody = isValidJson(body)
      if (!isValidBody) return reject(new Error('Data from openweathermap service in not valid.'))
      return resolve(body)
    })
  })
}

getWeather()
  .then(weather => {
    console.log(weather)
  })
  .catch(err => {
    console.error(err)
  })
