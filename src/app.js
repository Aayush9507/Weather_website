const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicdirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// console.log(__dirname)

app.use(express.static(publicdirPath))

app.get('',  (req,res)  => {
    res.render('index',{
        title:'Weather Application',
        name:'Aayush Goyal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Aayush Goyal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helptext:'Helpful Test example',
        title: 'Help',
        name:'Aayush Goyal'
        
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    else{
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) =>  {

            if (error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error){
                    return res.send({
                        error:{error}
                    })
                }
                res.send({
                    forecast: forecastdata,
                    location: location,
                    address: req.query.address
                })
              })
        })
        
    }
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Aayush Goyal',
        errorText: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Aayush Goyal',
        errorText: 'Error 404 Page'
    })
})


app.listen(port,() => {
    console.log('Server is up on port 3000')
})

