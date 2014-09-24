/// <reference path="../_references.ts" />

import path = require('path');
import express = require('express');
import router = require('./routes');
import utils = require('../utils/utils');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    logger = require('morgan');

var configure = (app: express.Application) => {
    'use strict';

    app.use(compress({
        filter: (req: express.Request, res: express.Response) => {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app
        .set('views', path.join(__dirname, '../views'))
        .set('view engine', 'ejs')
        .use(logger('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }))
        .use(cookieParser())
        .use(express.static(path.join(__dirname, '../../public')))
        .use(router);

    app.use((req: express.Request, res: express.Response, next: Function) => {
        var err = new Error('Not Found');
        (<any>err).status = 404;
        next(err);
    });

    // production error handler
    // no stacktraces leaked to user
    app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
        if (utils.isString(err.message)) {
            if (!utils.isNumber(err.status) &&
                (<string>err.toString()).toLowerCase().indexOf('not found') > -1) {
                err.status = 404;
            }

            res.status(err.status || 500);
            res.render('error', {
                error: err
            });
        }
    });
};

export = configure;
