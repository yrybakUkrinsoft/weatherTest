'use strict'

exports.isValidJson = data => {
  try {
    let parsedData = JSON.parse(data)
    return typeof parsedData === 'object' && !!Object.keys(parsedData).length
  } catch (e) {
    return false
  }
}
