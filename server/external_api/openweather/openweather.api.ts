/// <reference path="../../typings/tsd.d.ts" />

import request = require('request');
import https = require('https');
import PromiseStatic = require('es6-promise');
import qs = require('querystring');
import utils = require('../../utils/utils');
import BaseApi = require('../base.api');

var Promise = PromiseStatic.Promise;

class OpenWeatherApi extends BaseApi {
    baseUri = 'http://api.openweathermap.org/data/';

    // make these configurable
    measurementsUnit = 'Imperial';
    apiVersion = '2.5';
    mode = 'json';

    get = (methodName: string, qs: Object, token: string): Thenable<any> => {
        this.baseUri += this.apiVersion + '/' + methodName + '?';

        if (utils.isNull(qs['units'])) {
            qs['units'] = this.measurementsUnit;
        }

        if (utils.isNull(qs['mode'])) {
            qs['mode'] = this.mode;
        }

        return BaseApi.getApiCall(this.baseUri, qs, token);
    };
}

export = OpenWeatherApi;
