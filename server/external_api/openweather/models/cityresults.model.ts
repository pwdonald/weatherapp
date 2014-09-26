export interface CityResults {
    message: string;
    cod: string;
    count: number;
    list: Array<CityItem>;
}

export interface CityItem {
    id: number;
    name: string;
    coord: {
        lon: number;
        lat: number;
    };
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
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
    weather: Array<CityWeather>;
}

export interface CityWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}