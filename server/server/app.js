const express = require('express');

//set app
const app = express();

//set port
app.set('port', process.env.PORT || 4000);

module.exports = app;