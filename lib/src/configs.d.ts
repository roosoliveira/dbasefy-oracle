import { Converter, Data } from 'dbasefy/lib/core';
export declare type Binds = {
    [key: string]: any;
};
export interface OracleConfig {
    user: string;
    password: string;
    connectionString: string;
}
export declare class OracleData implements Data {
    [key: string]: any;
    convertTo<T>(converter: new () => Converter<T>): T;
}
