/// <reference path="cityitem.interface.ts" />

interface ICityResults {
    message: string;
    cod: string;
    count: number;
    list: Array<ICityItem>;
}
