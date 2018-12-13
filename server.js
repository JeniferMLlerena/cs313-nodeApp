const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '908d84ab33ac4de4474fecfff8ce13ea';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {
        weather: null,
        error: null
    });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                });
            } else {
                let nameText = `${weather.name}`;
                let nameText = `${weather.name}`;
                let weatherText = `It's ${weather.main.temp}&deg;F degrees in ${weather.name}!`;
                res.render('index', {
                    name: nameText,
                    weather: weatherText,
                    error: null
                });
            }
        }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
