/// <reference path="../_references.ts" />

import mongoose = require('mongoose');
import fs = require('fs');
import config = require('../config/config');

var configure = () => {
    'use strict';

    // Start connection
    mongoose.connect(config.db);

    var models = __dirname + '/../models',
        isJSExt = /\.js$/gm;

    // recursively walk through and require models
    var walk = (path: string) => {
        fs.readdirSync(path).forEach((file: string) => {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile() && isJSExt.test(newPath)) {
                require(newPath);
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
    };

    walk(models);
};

export = configure;
