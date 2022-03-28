const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d8b74402a466df44e7553508104ee8de&query=' + address;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.location===undefined) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: response.body.location.name + " " + response.body.location.region + " " + response.body.location.country
            })
        }
    })
}

module.exports = geocode