/// <reference path="../openweather.interfaces.ts" />

interface IForecastItem {
    dt?: number;
    temp: ITemp;
    main?: IMain;
    weather?: IWeather;
    clouds?: ICloud;
    wind?: IWind;
    sys?: ISys;
    dt_txt?: string;
} 