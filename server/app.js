var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config(); 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');

var app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', usersRouter);


app.listen(3001,() => {
    console.log("Started on PORT 3001");
})

module.exports = app;
