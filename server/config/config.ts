/// <reference path="../_references.ts" />

import path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var cfg = require('./env/' + process.env.NODE_ENV + '.json') || {},
    tokenCfg = require('../../apitokens.json');

export var root: string = path.normalize(__dirname + '/../..');
export var port: number = process.env.PORT || 3000;
export var db: string = process.env.MONGOHQ_URL || cfg.db;
export var weatherapi: string = tokenCfg.openweatherapi.token;
