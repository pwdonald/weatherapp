/// <reference path="../openweather.interfaces.ts" />

interface IForecastList {
    cod?: string;
    message?: number;
    city?: ICityItem;
    cnt?: number;
    list: Array<IForecastItem>;
}
