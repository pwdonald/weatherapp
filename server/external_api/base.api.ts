/// <reference path="../typings/tsd.d.ts" />

import request = require('request');
import PromiseStatic = require('es6-promise');
import qs = require('querystring');
import utils = require('../utils/utils');

/*
 * All API calls should go through this module to prevent too many calls being made per minute.
 */
var callCount = 0,
    Promise = PromiseStatic.Promise,
    requestQueue: Array<Promise<any>> = [];

class BaseApi {
    static getApiCall = (url: string, querystr?: Object, token?: string): Thenable<any> => {
        if (callCount < 3000) {
            return BaseApi.get(url, querystr, token);
        } else {
            requestQueue.push(BaseApi.get.bind(null, url, querystr, token));

            return new Promise((resolve) => {
                setTimeout(() => {
                    callCount = 0;
                    resolve();
                }, 60000);
            }).then(() => {
                return Promise.all(requestQueue);
            });
        }
    };

    static get = (url: string, querystr?: Object, token?: string): Thenable<any> => {
        (<any>querystr).APPID = (!utils.isNull(token) ? token : null);
        url += qs.stringify(querystr);
        console.log(url);
        return new Promise((resolve, reject) => {
            request.get(url, (err, res, body) => {
                if (utils.isObject(err)) {
                    return reject(err);
                }
                resolve(body);
            });
        });
    };
}

export = BaseApi;
