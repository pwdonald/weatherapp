/// <reference path="../../typings/tsd.d.ts" />

import utils = require('../../utils/utils');
import BaseApi = require('../base.api');

class OpenWeatherApi extends BaseApi {
    baseUri = 'http://api.openweathermap.org/data/';

    // make these configurable
    measurementsUnit = 'Imperial';
    apiVersion = '2.5';
    mode = 'json';

    get (methodName: string, qs: any, token: string): Thenable<any> {
        this.baseUri += this.apiVersion + '/' + methodName + '?';

        if (utils.isNull(qs.units)) {
            qs.units = this.measurementsUnit;
        }

        if (utils.isNull(qs.mode)) {
            qs.mode = this.mode;
        }

        return BaseApi.getApiCall(this.baseUri, qs, token);
    }
}

export = OpenWeatherApi;
