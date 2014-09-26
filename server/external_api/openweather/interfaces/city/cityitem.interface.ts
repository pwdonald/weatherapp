/// <reference path="../openweather.interfaces.ts" />


interface ICityItem {
    id: number;
    name: string;
    coord: ICoordinate;
    main: IMain;
    dt: number;
    wind: IWind;
    sys: ISys;
    clouds: ICloud;
    weather: Array<IWeather>;
}
