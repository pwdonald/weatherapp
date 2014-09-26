/// <reference path="../main/main.interface.ts" />

export interface ICurrentWeather {
    coord: {
        lon: number;
        lat: number;
    };
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
    base: string;
    main: IMain;
}


