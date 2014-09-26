/// <reference path="cityweather.interface.ts" />

interface ICityItem {
    id: number;
    name: string;
    coord: {
        lon: number;
        lat: number;
    };
    main: IMain;
    dt: number;
    wind: {
        speed: number;
        deg: number;
        var_beg: number;
        var_end: number;
    };
    sys: {
        country: string;
    };
    clouds: {
        all: number;
    };
    weather: Array<ICityWeather>;
}
