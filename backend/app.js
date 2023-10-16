var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require("dotenv").config();

var orderRouter = require('./routes/order');
var fleetRouter = require('./routes/fleet');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/order', orderRouter);
app.use('/fleet', fleetRouter);

(async () => {
    const {sequelize} = require('./database');
 
    try 
    {
        console.log(await sequelize.sync());
    } 
    catch (error) 
    {
        server.close();
    }
})();

module.exports = app;