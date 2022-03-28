const request = require('request');

const forecast = (address,longitude,altitude, callback)=>{
    //https://api.mapbox.com/geocoding/v5/mapbox.places/30.4570481,31.0403273.json?country=eg&types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoieW9zdTExIiwiYSI6ImNsMHRzczluMTAwY2czb2xka2poZWp0bTIifQ.0IeqvkIMIDCJ632WvUCXeQ
    const url = 'http://api.weatherstack.com/current?access_key=d8b74402a466df44e7553508104ee8de&lat=' + altitude + '&lon=' + longitude + '&query=' + address;
    request({url:url, json:true}, (error,response)=>{
       if(error){
           callback("Cannot connect to the network",undefined);
       }
       else if(response.body.location === undefined){
           callback("Unable to find location. Try another search",undefined);
       }
       else{
           callback(undefined, "It is currently " + response.body.current.weather_descriptions[0] + " and the temperature now is " +response.body.current.temperature);
       }
    });

}


module.exports = forecast;