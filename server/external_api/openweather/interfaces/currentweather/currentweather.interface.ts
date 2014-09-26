/// <reference path="../openweather.interfaces.ts" />

export interface ICurrentWeather {
    coord: ICoordinate;
    sys: ISys;
    weather: Array<IWeather>;
    base: string;
    main: IMain;
    wind: IWind;
    clouds: ICloud;
    dt: number;
    id: number;
    name: string;
    cod: number;
}
