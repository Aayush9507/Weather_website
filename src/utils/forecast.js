const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/b59f9d1950a204d4281cc96daf56251a/'+latitude+','+longitude+'?units=si'

    request({ url,json:true}, (error,response) => {
        if (error){
            callback('Unable to connect to location services',)
        }
        else if (response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,
                response.body.daily.data[0].summary+"It is currently "+response.body.currently.temperature+" out there."+" There is "+ response.body.currently.precipProbability+"% chances of rain"    
            )
        }
    })

}

module.exports = forecast