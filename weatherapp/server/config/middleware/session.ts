/// <reference path="../../_references.ts" />

import express = require('express');
import config = require('../config');
import utils = require('../../utils/utils');
import session = require('express-session');

var mongoStore = require('connect-mongo')({ session: session });

// express/mongo session storage
var expressSession = session({
        secret: '][D][][V][][D',
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    });

var populateSession = (req: express.Request, res: express.Response, next: Function) => {
    expressSession(req, res, next);
};

export = populateSession;
