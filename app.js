var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var staticPath = path.join(__dirname, 'public');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(staticPath));

app.use('/', function (req, resp, next) {
  if (req.originalUrl === '/') {
    resp.sendFile(path.join(staticPath, 'html/index.html'));
  } else {
    resp.sendStatus(404);
  }
});

module.exports = app;
