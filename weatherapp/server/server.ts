/// <reference path="./_references.ts" />

import express = require('express');
import config = require('./config/config');
import configureDb = require('./db/connection');
import configureExpress = require('./config/express');

configureDb();

var app = express();

configureExpress(app);

var server = app.listen(config.port, () => {
	console.log('Listening on address %d.', server.address().port);
});

export = app;
