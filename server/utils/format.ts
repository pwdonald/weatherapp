/// <reference path="../_references.ts" />

import utils = require('./utils');

export var response = (err?: any, data?: any): IFormattedResponse => {
    if (utils.isObject(err)) {
        if (err instanceof Error && !utils.isObject(err.errors)) {
            return {
                status: 500,
                body: {
                    status: 'error',
                    message: err.message,
                    data: err
                }
            };
        }

        return {
            status: 400,
            body: {
                status: 'fail',
                data: err
            }
        };
    }

    return {
        status: 200,
        body: {
            status: 'success',
            data: data
        }
    };
};
