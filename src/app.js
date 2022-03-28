const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
require('dotenv').config();  //for deployment on heroku
const port = process.env.PORT || 3000; 

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const app = express();
app.use(express.json());
//set up handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
  res.render('index', {
    title: "Weather App",
    name: "Yossra"
  });
});


app.get('/help',(req,res)=>{
  res.render('help', {
    title: "Help",
    sentence: "I will help you :)",
    name: "Yossra"
  });
});

app.get('/about',(req,res)=>{
  res.render('about', {
    title: "About Me",
    name: "Yossra"
  })
});

app.get('/weather', (req,res)=>{
  if(!req.query.address){
    return res.send({
      error: "You must provide an address"
    });
  }

  console.log(req.body);

  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({
        error
      });
    }
    //return console.log(error);
  
    forecast(req.query.address ,latitude, longitude, (error, forecastData)=>{
        if(error){
          return res.send({
            error
          });
        }
        //return console.log(error);
       res.send({
         location,
         forecast: forecastData,
         address: req.query.address
       });
        /*console.log(location);
        console.log(forecastData);*/
    })
  });

  /*res.send({
   forecast: "It is cloudy",
   location: req.query.address
  });*/

});



app.get('/products', (req, res)=>{
  if(!req.query.search){
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
   products: []
  });
});

app.get('*',(req,res)=>{
  res.render('notfound', {
    message: "Page not found"
  })
});

app.listen(port, ()=>{
  console.log("Server is up at port 3000.");
});